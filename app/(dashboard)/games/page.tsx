import { prisma } from '@/lib/db';
import { formatDistanceToNow } from 'date-fns';

export default async function GamesPage() {
  const games = await prisma.game.findMany({
    orderBy: { createdAt: 'desc' },
    take: 50,
    include: {
      team1Player1: true,
      team1Player2: true,
      team2Player1: true,
      team2Player2: true,
      eloHistory: {
        orderBy: { playerId: 'asc' },
      },
    },
  });

  type GameWithRelations = typeof games[0];

  return (
    <div>
      <h1 className="text-3xl font-bold text-[#f5f5f5] mb-6">Recent Games</h1>

      {games.length === 0 ? (
        <p className="text-[#a3a3a3]">No games recorded yet.</p>
      ) : (
        <div className="space-y-4">
          {games.map((game: GameWithRelations) => {
            const team1Won = game.team1Score > game.team2Score;

            return (
              <div
                key={game.id}
                className="p-6 bg-[#1a1a1a] rounded-lg border border-gray-800"
              >
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm text-[#737373]">
                    {formatDistanceToNow(new Date(game.createdAt), { addSuffix: true })}
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-4 items-center">
                  {/* Team 1 */}
                  <div className={`${team1Won ? 'opacity-100' : 'opacity-50'}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-[#f5f5f5]">Team 1</h3>
                      {team1Won && <span className="text-[#10b981]">✓ Win</span>}
                    </div>
                    <p className="text-[#a3a3a3]">{game.team1Player1.name}</p>
                    <p className="text-[#a3a3a3]">{game.team1Player2.name}</p>
                    <p className="text-2xl font-bold text-[#f5f5f5] mt-2 font-mono">
                      {game.team1Score}
                    </p>
                  </div>

                  {/* VS */}
                  <div className="text-center">
                    <p className="text-[#737373] font-semibold">VS</p>
                  </div>

                  {/* Team 2 */}
                  <div className={`${!team1Won ? 'opacity-100' : 'opacity-50'}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-[#f5f5f5]">Team 2</h3>
                      {!team1Won && <span className="text-[#10b981]">✓ Win</span>}
                    </div>
                    <p className="text-[#a3a3a3]">{game.team2Player1.name}</p>
                    <p className="text-[#a3a3a3]">{game.team2Player2.name}</p>
                    <p className="text-2xl font-bold text-[#f5f5f5] mt-2 font-mono">
                      {game.team2Score}
                    </p>
                  </div>
                </div>

                {/* ELO Changes */}
                <div className="mt-4 pt-4 border-t border-gray-800">
                  <p className="text-sm text-[#737373] mb-2">ELO Changes:</p>
                  <div className="grid grid-cols-4 gap-2 text-sm">
                    {game.eloHistory.map((history) => {
                      const player = [
                        game.team1Player1,
                        game.team1Player2,
                        game.team2Player1,
                        game.team2Player2,
                      ].find((p) => p.id === history.playerId);

                      return (
                        <div key={history.id}>
                          <span className="text-[#a3a3a3]">{player?.name}: </span>
                          <span
                            className={`font-semibold ${
                              history.change > 0 ? 'text-[#10b981]' : 'text-[#ef4444]'
                            }`}
                          >
                            {history.change > 0 ? '+' : ''}
                            {history.change}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
