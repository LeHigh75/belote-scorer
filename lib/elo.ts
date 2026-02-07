const K_FACTOR = 32;

export interface Player {
  id: string;
  currentElo: number;
}

export interface GameData {
  team1Player1Id: string;
  team1Player2Id: string;
  team2Player1Id: string;
  team2Player2Id: string;
  team1Score: number;
  team2Score: number;
}

export interface EloChange {
  playerId: string;
  oldElo: number;
  newElo: number;
  delta: number;
}

export function calculateEloChanges(
  players: Player[],
  team1Won: boolean,
  gameData: GameData
): EloChange[] {
  const team1Players = players.filter(
    (p) => p.id === gameData.team1Player1Id || p.id === gameData.team1Player2Id
  );
  const team2Players = players.filter(
    (p) => p.id === gameData.team2Player1Id || p.id === gameData.team2Player2Id
  );

  const team1AvgElo = (team1Players[0].currentElo + team1Players[1].currentElo) / 2;
  const team2AvgElo = (team2Players[0].currentElo + team2Players[1].currentElo) / 2;

  const expectedTeam1 = 1 / (1 + Math.pow(10, (team2AvgElo - team1AvgElo) / 400));

  const actualTeam1 = team1Won ? 1 : 0;

  const team1Change = Math.round(K_FACTOR * (actualTeam1 - expectedTeam1));
  const team2Change = -team1Change;

  return [
    {
      playerId: team1Players[0].id,
      oldElo: team1Players[0].currentElo,
      newElo: team1Players[0].currentElo + team1Change,
      delta: team1Change,
    },
    {
      playerId: team1Players[1].id,
      oldElo: team1Players[1].currentElo,
      newElo: team1Players[1].currentElo + team1Change,
      delta: team1Change,
    },
    {
      playerId: team2Players[0].id,
      oldElo: team2Players[0].currentElo,
      newElo: team2Players[0].currentElo + team2Change,
      delta: team2Change,
    },
    {
      playerId: team2Players[1].id,
      oldElo: team2Players[1].currentElo,
      newElo: team2Players[1].currentElo + team2Change,
      delta: team2Change,
    },
  ];
}
