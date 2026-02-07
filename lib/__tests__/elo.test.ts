import { describe, it, expect } from 'vitest';
import { calculateEloChanges } from '../elo';

describe('ELO Calculation', () => {
  it('calculates correct ELO changes for evenly matched teams', () => {
    const players = [
      { id: '1', currentElo: 1000 },
      { id: '2', currentElo: 1000 },
      { id: '3', currentElo: 1000 },
      { id: '4', currentElo: 1000 },
    ];

    const gameData = {
      team1Player1Id: '1',
      team1Player2Id: '2',
      team2Player1Id: '3',
      team2Player2Id: '4',
      team1Score: 162,
      team2Score: 0,
    };

    const changes = calculateEloChanges(players, true, gameData);

    expect(changes[0].delta).toBe(16);
    expect(changes[1].delta).toBe(16);
    expect(changes[2].delta).toBe(-16);
    expect(changes[3].delta).toBe(-16);
    expect(changes[0].newElo).toBe(1016);
    expect(changes[2].newElo).toBe(984);
  });

  it('gives smaller changes when favorite wins', () => {
    const players = [
      { id: '1', currentElo: 1200 },
      { id: '2', currentElo: 1200 },
      { id: '3', currentElo: 800 },
      { id: '4', currentElo: 800 },
    ];

    const gameData = {
      team1Player1Id: '1',
      team1Player2Id: '2',
      team2Player1Id: '3',
      team2Player2Id: '4',
      team1Score: 162,
      team2Score: 0,
    };

    const changes = calculateEloChanges(players, true, gameData);

    expect(changes[0].delta).toBeLessThan(16);
    expect(changes[0].delta).toBeGreaterThan(0);
  });

  it('gives larger changes when underdog wins', () => {
    const players = [
      { id: '1', currentElo: 800 },
      { id: '2', currentElo: 800 },
      { id: '3', currentElo: 1200 },
      { id: '4', currentElo: 1200 },
    ];

    const gameData = {
      team1Player1Id: '1',
      team1Player2Id: '2',
      team2Player1Id: '3',
      team2Player2Id: '4',
      team1Score: 162,
      team2Score: 0,
    };

    const changes = calculateEloChanges(players, true, gameData);

    expect(changes[0].delta).toBeGreaterThan(16);
  });
});
