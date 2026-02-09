import { prisma } from '@/lib/db';
import { formatDistanceToNow } from 'date-fns';
import { DeleteGameButton } from '@/components/delete-game-button';

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
      <h1 className="text-2xl md:text-3xl font-bold text-[#f5f5f5] mb-4 md:mb-6 mt-2 md:mt-0">Recent Games</h1>

      {games.length === 0 ? (
        <p className="text-[#a3a3a3]">No games recorded yet.</p>
      ) : (
        <div className="space-y-3 md:space-y-4">
          {games.map((game: GameWithRelations) => {
            const team1Won = game.team1Score > game.team2Score;

            return (
              <div
                key={game.id}
                className="p-4 md:p-6 bg-[#1a1a1a] rounded-lg border border-gray-800"
              >
                <div className="flex items-center justify-between mb-3 md:mb-4">
                  <p className="text-xs md:text-sm text-[#737373]">
                    {formatDistanceToNow(new Date(game.createdAt), { addSuffix: true })}
                  </p>
                  <DeleteGameButton gameId={game.id} />
                </div>

                <div className="grid grid-cols-3 gap-2 md:gap-4 items-center">
                  {/* Team 1 */}
                  <div className={`${team1Won ? 'opacity-100' : 'opacity-50'}`}>
                    <div className="flex items-center gap-1 md:gap-2 mb-1 md:mb-2">
                      <h3 className="text-sm md:text-base font-semibold text-[#f5f5f5]">Team 1</h3>
                      {team1Won && <span className="text-[#10b981] text-xs md:text-base">✓</span>}
                    </div>
                    <p className="text-xs md:text-base text-[#a3a3a3] truncate">{game.team1Player1.name}</p>
                    <p className="text-xs md:text-base text-[#a3a3a3] truncate">{game.team1Player2.name}</p>
                    <p className="text-xl md:text-2xl font-bold text-[#f5f5f5] mt-1 md:mt-2 font-mono">
                      {game.team1Score}
                    </p>
                  </div>

                  {/* VS */}
                  <div className="text-center">
                    <p className="text-[#737373] font-semibold text-sm md:text-base">VS</p>
                  </div>

                  {/* Team 2 */}
                  <div className={`${!team1Won ? 'opacity-100' : 'opacity-50'}`}>
                    <div className="flex items-center gap-1 md:gap-2 mb-1 md:mb-2">
                      <h3 className="text-sm md:text-base font-semibold text-[#f5f5f5]">Team 2</h3>
                      {!team1Won && <span className="text-[#10b981] text-xs md:text-base">✓</span>}
                    </div>
                    <p className="text-xs md:text-base text-[#a3a3a3] truncate">{game.team2Player1.name}</p>
                    <p className="text-xs md:text-base text-[#a3a3a3] truncate">{game.team2Player2.name}</p>
                    <p className="text-xl md:text-2xl font-bold text-[#f5f5f5] mt-1 md:mt-2 font-mono">
                      {game.team2Score}
                    </p>
                  </div>
                </div>

                {/* ELO Changes */}
                <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-gray-800">
                  <p className="text-xs md:text-sm text-[#737373] mb-2">ELO Changes:</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-1.5 md:gap-2 text-xs md:text-sm">
                    {game.eloHistory.map((history: GameWithRelations['eloHistory'][0]) => {
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
