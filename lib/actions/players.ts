'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '../db';

export async function createPlayer(name: string) {
  if (!name || name.trim().length < 2 || name.trim().length > 50) {
    return { error: 'Name must be between 2 and 50 characters' };
  }

  const existing = await prisma.player.findUnique({ where: { name: name.trim() } });
  if (existing) {
    return { error: 'Player already exists' };
  }

  const player = await prisma.player.create({
    data: { name: name.trim(), currentElo: 1000 },
  });

  revalidatePath('/players');
  revalidatePath('/rankings');
  return { success: true, player };
}

export async function updatePlayer(id: string, name: string) {
  if (!name || name.trim().length < 2 || name.trim().length > 50) {
    return { error: 'Name must be between 2 and 50 characters' };
  }

  const existing = await prisma.player.findUnique({ where: { name: name.trim() } });
  if (existing && existing.id !== id) {
    return { error: 'Another player with this name already exists' };
  }

  await prisma.player.update({
    where: { id },
    data: { name: name.trim() },
  });

  revalidatePath('/players');
  revalidatePath('/rankings');
  return { success: true };
}

export async function deletePlayer(id: string) {
  const gamesCount = await prisma.game.count({
    where: {
      OR: [
        { team1Player1Id: id },
        { team1Player2Id: id },
        { team2Player1Id: id },
        { team2Player2Id: id },
      ],
    },
  });

  if (gamesCount > 0) {
    return { error: 'Cannot delete player with game history' };
  }

  await prisma.player.delete({ where: { id } });

  revalidatePath('/players');
  revalidatePath('/rankings');
  return { success: true };
}
