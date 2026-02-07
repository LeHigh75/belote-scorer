'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { deletePlayer, updatePlayer } from '@/lib/actions/players';

interface PlayerCardProps {
  player: {
    id: string;
    name: string;
    currentElo: number;
  };
}

export function PlayerCard({ player }: PlayerCardProps) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(player.name);
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    const result = await updatePlayer(player.id, name);

    if (result.error) {
      setError(result.error);
      return;
    }

    setEditing(false);
    router.refresh();
  }

  async function handleDelete() {
    if (!confirm(`Are you sure you want to delete ${player.name}?`)) {
      return;
    }

    const result = await deletePlayer(player.id);

    if (result.error) {
      alert(result.error);
      return;
    }

    router.refresh();
  }

  if (editing) {
    return (
      <div className="p-4 bg-[#1a1a1a] rounded-lg border border-gray-800">
        <form onSubmit={handleUpdate} className="space-y-2">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 bg-[#0a0a0a] border border-gray-700 rounded-md text-[#f5f5f5]"
            required
            minLength={2}
            maxLength={50}
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
          <div className="flex gap-2">
            <Button type="submit" size="sm">Save</Button>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => {
                setEditing(false);
                setName(player.name);
                setError('');
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="p-4 bg-[#1a1a1a] rounded-lg border border-gray-800 hover:bg-[#252525] transition-colors">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-[#f5f5f5]">{player.name}</h3>
          <p className="text-sm text-[#a3a3a3]">
            ELO: <span className="font-mono text-[#3b82f6]">{player.currentElo}</span>
          </p>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => setEditing(true)}>
            Edit
          </Button>
          <Button size="sm" variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
