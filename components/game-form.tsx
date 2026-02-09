'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { recordGame } from '@/lib/actions/games';

interface Player {
  id: string;
  name: string;
}

interface GameFormProps {
  players: Player[];
}

export function GameForm({ players }: GameFormProps) {
  const [team1Player1, setTeam1Player1] = useState('');
  const [team1Player2, setTeam1Player2] = useState('');
  const [team2Player1, setTeam2Player1] = useState('');
  const [team2Player2, setTeam2Player2] = useState('');
  const [team1Score, setTeam1Score] = useState('');
  const [team2Score, setTeam2Score] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const selectedPlayers = [team1Player1, team1Player2, team2Player1, team2Player2].filter(Boolean);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await recordGame({
      team1Player1Id: team1Player1,
      team1Player2Id: team1Player2,
      team2Player1Id: team2Player1,
      team2Player2Id: team2Player2,
      team1Score: parseInt(team1Score),
      team2Score: parseInt(team2Score),
    });

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6 max-w-2xl">
      <div className="p-4 md:p-6 bg-[#1a1a1a] rounded-lg border border-gray-800">
        <h2 className="text-lg md:text-xl font-semibold text-[#f5f5f5] mb-3 md:mb-4">Team 1</h2>
        <div className="space-y-3 md:space-y-4">
          <div>
            <label className="block text-sm text-[#a3a3a3] mb-2">Player 1</label>
            <Select value={team1Player1} onValueChange={setTeam1Player1} required>
              <SelectTrigger className="bg-[#0a0a0a] border-gray-700 text-[#f5f5f5]">
                <SelectValue placeholder="Select player" />
              </SelectTrigger>
              <SelectContent className="bg-[#1a1a1a] border-gray-700">
                {players
                  .filter((p) => !selectedPlayers.includes(p.id) || p.id === team1Player1)
                  .map((player) => (
                    <SelectItem key={player.id} value={player.id}>
                      {player.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm text-[#a3a3a3] mb-2">Player 2</label>
            <Select value={team1Player2} onValueChange={setTeam1Player2} required>
              <SelectTrigger className="bg-[#0a0a0a] border-gray-700 text-[#f5f5f5]">
                <SelectValue placeholder="Select player" />
              </SelectTrigger>
              <SelectContent className="bg-[#1a1a1a] border-gray-700">
                {players
                  .filter((p) => !selectedPlayers.includes(p.id) || p.id === team1Player2)
                  .map((player) => (
                    <SelectItem key={player.id} value={player.id}>
                      {player.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm text-[#a3a3a3] mb-2">Score</label>
            <Input
              type="number"
              value={team1Score}
              onChange={(e) => setTeam1Score(e.target.value)}
              min="0"
              max="3000"
              required
              className="bg-[#0a0a0a] border-gray-700 text-[#f5f5f5]"
            />
          </div>
        </div>
      </div>

      <div className="p-4 md:p-6 bg-[#1a1a1a] rounded-lg border border-gray-800">
        <h2 className="text-lg md:text-xl font-semibold text-[#f5f5f5] mb-3 md:mb-4">Team 2</h2>
        <div className="space-y-3 md:space-y-4">
          <div>
            <label className="block text-sm text-[#a3a3a3] mb-2">Player 1</label>
            <Select value={team2Player1} onValueChange={setTeam2Player1} required>
              <SelectTrigger className="bg-[#0a0a0a] border-gray-700 text-[#f5f5f5]">
                <SelectValue placeholder="Select player" />
              </SelectTrigger>
              <SelectContent className="bg-[#1a1a1a] border-gray-700">
                {players
                  .filter((p) => !selectedPlayers.includes(p.id) || p.id === team2Player1)
                  .map((player) => (
                    <SelectItem key={player.id} value={player.id}>
                      {player.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm text-[#a3a3a3] mb-2">Player 2</label>
            <Select value={team2Player2} onValueChange={setTeam2Player2} required>
              <SelectTrigger className="bg-[#0a0a0a] border-gray-700 text-[#f5f5f5]">
                <SelectValue placeholder="Select player" />
              </SelectTrigger>
              <SelectContent className="bg-[#1a1a1a] border-gray-700">
                {players
                  .filter((p) => !selectedPlayers.includes(p.id) || p.id === team2Player2)
                  .map((player) => (
                    <SelectItem key={player.id} value={player.id}>
                      {player.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm text-[#a3a3a3] mb-2">Score</label>
            <Input
              type="number"
              value={team2Score}
              onChange={(e) => setTeam2Score(e.target.value)}
              min="0"
              max="3000"
              required
              className="bg-[#0a0a0a] border-gray-700 text-[#f5f5f5]"
            />
          </div>
        </div>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? 'Recording...' : 'Record Game'}
      </Button>
    </form>
  );
}
