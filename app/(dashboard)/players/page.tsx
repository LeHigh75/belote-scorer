import { prisma } from '@/lib/db';
import { AddPlayerDialog } from '@/components/add-player-dialog';
import { PlayerCard } from '@/components/player-card';

export default async function PlayersPage() {
  const players = await prisma.player.findMany({
    orderBy: { name: 'asc' },
  });

  type PlayerType = typeof players[0];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-[#f5f5f5]">Players</h1>
        <AddPlayerDialog />
      </div>

      {players.length === 0 ? (
        <p className="text-[#a3a3a3]">No players yet. Add your first player to get started!</p>
      ) : (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {players.map((player: PlayerType) => (
            <PlayerCard key={player.id} player={player} />
          ))}
        </div>
      )}
    </div>
  );
}
