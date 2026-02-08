'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { deleteGame } from '@/lib/actions/games';

export function DeleteGameButton({ gameId }: { gameId: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    if (!confirm('Are you sure you want to delete this game? ELO changes will be reverted.')) {
      return;
    }

    setLoading(true);
    const result = await deleteGame(gameId);

    if (result?.error) {
      alert(result.error);
      setLoading(false);
      return;
    }

    router.refresh();
  }

  return (
    <Button
      size="sm"
      variant="destructive"
      onClick={handleDelete}
      disabled={loading}
    >
      {loading ? 'Deleting...' : 'Delete'}
    </Button>
  );
}
