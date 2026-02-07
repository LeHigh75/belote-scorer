'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '../db';
import { calculateEloChanges } from '../elo';

export async function recordGame(data: {
  team1Player1Id: string;
  team1Player2Id: string;
  team2Player1Id: string;
  team2Player2Id: string;
  team1Score: number;
  team2Score: number;
}) {
  // Validate unique players
  const playerIds = [
    data.team1Player1Id,
    data.team1Player2Id,
    data.team2Player1Id,
    data.team2Player2Id,
  ];

  if (new Set(playerIds).size !== 4) {
    return { error: 'All players must be unique' };
  }

  // Validate scores
  if (data.team1Score < 0 || data.team2Score < 0) {
    return { error: 'Scores cannot be negative' };
  }

  if (data.team1Score > 3000 || data.team2Score > 3000) {
    return { error: 'Scores cannot exceed 3000' };
  }

  if (data.team1Score === data.team2Score) {
    return { error: 'Scores cannot be equal (no ties in belote)' };
  }

  // Create game and update ELOs in transaction
  try {
    await prisma.$transaction(async (tx: Parameters<Parameters<typeof prisma.$transaction>[0]>[0]) => {
      const game = await tx.game.create({ data });

      // Fetch all players
      const players = await tx.player.findMany({
        where: { id: { in: playerIds } },
      });

      if (players.length !== 4) {
        throw new Error('One or more players not found');
      }

      const team1Won = data.team1Score > data.team2Score;
      const eloChanges = calculateEloChanges(players, team1Won, data);

      // Update player ELOs and create history
      for (const change of eloChanges) {
        await tx.player.update({
          where: { id: change.playerId },
          data: { currentElo: change.newElo },
        });

        await tx.eloHistory.create({
          data: {
            playerId: change.playerId,
            gameId: game.id,
            eloBefore: change.oldElo,
            eloAfter: change.newElo,
            change: change.delta,
          },
        });
      }
    });

    revalidatePath('/games');
    revalidatePath('/rankings');
    revalidatePath('/players');
  } catch (error) {
    console.error('Error recording game:', error);
    return { error: 'Failed to record game' };
  }

  redirect('/games');
}
