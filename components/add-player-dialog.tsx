'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { createPlayer } from '@/lib/actions/players';

export function AddPlayerDialog() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await createPlayer(name);

    if (result.error) {
      setError(result.error);
      setLoading(false);
      return;
    }

    setName('');
    setOpen(false);
    setLoading(false);
    router.refresh();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Player</Button>
      </DialogTrigger>
      <DialogContent className="bg-[#1a1a1a] border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-[#f5f5f5]">Add New Player</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="text"
              placeholder="Player name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              minLength={2}
              maxLength={50}
              className="bg-[#0a0a0a] border-gray-700 text-[#f5f5f5]"
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Adding...' : 'Add Player'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
