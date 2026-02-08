import Link from 'next/link';
import { logoutAction } from '@/lib/actions/logout';

export function Navigation() {
  return (
    <nav className="w-64 min-h-screen bg-[#1a1a1a] border-r border-gray-800 p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#f5f5f5]">Belote Scorer</h1>
        <p className="text-sm text-[#737373] mt-1">Track your games</p>
      </div>

      <ul className="space-y-2">
        <li>
          <Link
            href="/rankings"
            className="block px-4 py-2 rounded-md text-[#a3a3a3] hover:bg-[#252525] hover:text-[#f5f5f5] transition-colors"
          >
            🏆 Rankings
          </Link>
        </li>
        <li>
          <Link
            href="/players"
            className="block px-4 py-2 rounded-md text-[#a3a3a3] hover:bg-[#252525] hover:text-[#f5f5f5] transition-colors"
          >
            👥 Players
          </Link>
        </li>
        <li>
          <Link
            href="/games/new"
            className="block px-4 py-2 rounded-md text-[#a3a3a3] hover:bg-[#252525] hover:text-[#f5f5f5] transition-colors"
          >
            ➕ New Game
          </Link>
        </li>
        <li>
          <Link
            href="/games"
            className="block px-4 py-2 rounded-md text-[#a3a3a3] hover:bg-[#252525] hover:text-[#f5f5f5] transition-colors"
          >
            📋 Recent Games
          </Link>
        </li>
      </ul>

      <div className="mt-auto pt-8 space-y-2">
        <Link
          href="/profile"
          className="block px-4 py-2 rounded-md text-[#a3a3a3] hover:bg-[#252525] hover:text-[#f5f5f5] transition-colors"
        >
          ⚙️ Profil
        </Link>
        <form action={logoutAction}>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-[#252525] hover:bg-[#303030] text-[#a3a3a3] rounded-md transition-colors"
          >
            🚪 Logout
          </button>
        </form>
      </div>
    </nav>
  );
}
