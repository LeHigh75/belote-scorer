'use client';

import { useState } from 'react';
import { changePasswordAction } from '@/lib/actions/profile';

export default function ProfilePage() {
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setMessage(null);

    const result = await changePasswordAction(formData);

    if (result.success) {
      setMessage({ type: 'success', text: 'Mot de passe modifié avec succès' });
      // Reset form
      const form = document.getElementById('password-form') as HTMLFormElement;
      form?.reset();
    } else {
      setMessage({ type: 'error', text: result.error || 'Une erreur est survenue' });
    }

    setLoading(false);
  }

  return (
    <div className="max-w-md">
      <h1 className="text-3xl font-bold text-[#f5f5f5] mb-8">Profil</h1>

      <div className="bg-[#1a1a1a] rounded-lg border border-gray-800 p-6">
        <h2 className="text-xl font-semibold text-[#f5f5f5] mb-6">Changer le mot de passe</h2>

        {message && (
          <div
            className={`mb-4 p-3 rounded-md text-sm ${
              message.type === 'success'
                ? 'bg-green-900/30 text-green-400 border border-green-800'
                : 'bg-red-900/30 text-red-400 border border-red-800'
            }`}
          >
            {message.text}
          </div>
        )}

        <form id="password-form" action={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="currentPassword" className="block text-sm font-medium text-[#a3a3a3] mb-2">
              Mot de passe actuel
            </label>
            <input
              type="password"
              id="currentPassword"
              name="currentPassword"
              required
              className="w-full px-4 py-2 bg-[#0a0a0a] border border-gray-700 rounded-md text-[#f5f5f5] focus:outline-none focus:ring-2 focus:ring-[#3b82f6]"
              autoComplete="current-password"
            />
          </div>

          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-[#a3a3a3] mb-2">
              Nouveau mot de passe
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              required
              minLength={6}
              className="w-full px-4 py-2 bg-[#0a0a0a] border border-gray-700 rounded-md text-[#f5f5f5] focus:outline-none focus:ring-2 focus:ring-[#3b82f6]"
              autoComplete="new-password"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#a3a3a3] mb-2">
              Confirmer le nouveau mot de passe
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              required
              minLength={6}
              className="w-full px-4 py-2 bg-[#0a0a0a] border border-gray-700 rounded-md text-[#f5f5f5] focus:outline-none focus:ring-2 focus:ring-[#3b82f6]"
              autoComplete="new-password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-[#3b82f6] hover:bg-[#2563eb] disabled:opacity-50 text-white font-medium rounded-md transition-colors"
          >
            {loading ? 'Modification...' : 'Modifier le mot de passe'}
          </button>
        </form>
      </div>
    </div>
  );
}
