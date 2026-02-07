import { prisma } from '@/lib/db';

export default async function RankingsPage() {
  const players = await prisma.player.findMany({
    orderBy: { currentElo: 'desc' },
    include: {
      _count: {
        select: {
          team1Player1Games: true,
          team1Player2Games: true,
          team2Player1Games: true,
          team2Player2Games: true,
        },
      },
      team1Player1Games: {
        select: {
          team1Score: true,
          team2Score: true,
        },
      },
      team1Player2Games: {
        select: {
          team1Score: true,
          team2Score: true,
        },
      },
      team2Player1Games: {
        select: {
          team1Score: true,
          team2Score: true,
        },
      },
      team2Player2Games: {
        select: {
          team1Score: true,
          team2Score: true,
        },
      },
    },
  });

  type PlayerWithRelations = typeof players[0];

  const playersWithStats = players.map((player: PlayerWithRelations, index: number) => {
    const totalGames =
      player._count.team1Player1Games +
      player._count.team1Player2Games +
      player._count.team2Player1Games +
      player._count.team2Player2Games;

    let wins = 0;

    type GameScore = { team1Score: number; team2Score: number };

    // Count wins from team1 games (player was on team 1)
    player.team1Player1Games.forEach((game: GameScore) => {
      if (game.team1Score > game.team2Score) wins++;
    });
    player.team1Player2Games.forEach((game: GameScore) => {
      if (game.team1Score > game.team2Score) wins++;
    });

    // Count wins from team2 games (player was on team 2)
    player.team2Player1Games.forEach((game: GameScore) => {
      if (game.team2Score > game.team1Score) wins++;
    });
    player.team2Player2Games.forEach((game: GameScore) => {
      if (game.team2Score > game.team1Score) wins++;
    });

    const winRate = totalGames > 0 ? (wins / totalGames) * 100 : 0;

    return {
      rank: index + 1,
      id: player.id,
      name: player.name,
      elo: player.currentElo,
      gamesPlayed: totalGames,
      winRate: winRate.toFixed(1),
    };
  });

  return (
    <div>
      <h1 className="text-3xl font-bold text-[#f5f5f5] mb-6">ELO Rankings</h1>

      {playersWithStats.length === 0 ? (
        <p className="text-[#a3a3a3]">No players yet.</p>
      ) : (
        <div className="bg-[#1a1a1a] rounded-lg border border-gray-800 overflow-hidden">
          <table className="w-full">
            <thead className="bg-[#252525]">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-[#f5f5f5]">Rank</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-[#f5f5f5]">Player</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-[#f5f5f5]">ELO</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-[#f5f5f5]">Games</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-[#f5f5f5]">Win Rate</th>
              </tr>
            </thead>
            <tbody>
              {playersWithStats.map((player) => (
                <tr
                  key={player.id}
                  className="border-t border-gray-800 hover:bg-[#252525] transition-colors"
                >
                  <td className="px-6 py-4">
                    <span
                      className={`font-bold ${
                        player.rank === 1
                          ? 'text-yellow-500'
                          : player.rank === 2
                          ? 'text-gray-400'
                          : player.rank === 3
                          ? 'text-orange-600'
                          : 'text-[#a3a3a3]'
                      }`}
                    >
                      {player.rank === 1 ? '🥇' : player.rank === 2 ? '🥈' : player.rank === 3 ? '🥉' : player.rank}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[#f5f5f5] font-medium">{player.name}</td>
                  <td className="px-6 py-4">
                    <span className="font-mono text-[#3b82f6] font-semibold">{player.elo}</span>
                  </td>
                  <td className="px-6 py-4 text-[#a3a3a3]">{player.gamesPlayed}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`${
                        parseFloat(player.winRate) >= 50 ? 'text-[#10b981]' : 'text-[#ef4444]'
                      }`}
                    >
                      {player.winRate}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
