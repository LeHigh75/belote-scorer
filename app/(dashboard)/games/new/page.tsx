import { prisma } from '@/lib/db';
import { GameForm } from '@/components/game-form';

export default async function NewGamePage() {
  const players = await prisma.player.findMany({
    orderBy: { name: 'asc' },
    select: { id: true, name: true },
  });

  if (players.length < 4) {
    return (
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-[#f5f5f5] mb-4 md:mb-6 mt-2 md:mt-0">New Game</h1>
        <p className="text-[#a3a3a3]">
          You need at least 4 players to record a game. Please add more players first.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold text-[#f5f5f5] mb-4 md:mb-6 mt-2 md:mt-0">New Game</h1>
      <GameForm players={players} />
    </div>
  );
}
