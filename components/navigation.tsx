'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { logoutAction } from '@/lib/actions/logout';
import { useState } from 'react';

const navItems = [
  { href: '/rankings', label: 'Rankings', icon: '🏆' },
  { href: '/players', label: 'Players', icon: '👥' },
  { href: '/games/new', label: 'New', icon: '➕' },
  { href: '/games', label: 'Games', icon: '📋' },
];

export function Navigation() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Desktop sidebar - hidden on mobile */}
      <nav className="hidden md:flex md:flex-col w-64 min-h-screen bg-[#1a1a1a] border-r border-gray-800 p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#f5f5f5]">Belote Scorer</h1>
          <p className="text-sm text-[#737373] mt-1">Track your games</p>
        </div>

        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`block px-4 py-2 rounded-md transition-colors ${
                  pathname === item.href
                    ? 'bg-[#252525] text-[#f5f5f5]'
                    : 'text-[#a3a3a3] hover:bg-[#252525] hover:text-[#f5f5f5]'
                }`}
              >
                {item.icon} {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-8 space-y-2">
          <Link
            href="/profile"
            className={`block px-4 py-2 rounded-md transition-colors ${
              pathname === '/profile'
                ? 'bg-[#252525] text-[#f5f5f5]'
                : 'text-[#a3a3a3] hover:bg-[#252525] hover:text-[#f5f5f5]'
            }`}
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

      {/* Mobile top header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-[#1a1a1a] border-b border-gray-800 px-4 py-3 flex items-center justify-between">
        <h1 className="text-lg font-bold text-[#f5f5f5]">Belote Scorer</h1>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-[#a3a3a3] hover:text-[#f5f5f5] transition-colors"
          aria-label="Menu"
        >
          {mobileMenuOpen ? '✕' : '⚙️'}
        </button>
      </div>

      {/* Mobile dropdown menu (for profile/logout) */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-[52px] right-0 z-50 bg-[#1a1a1a] border border-gray-800 rounded-bl-lg shadow-lg min-w-[180px]">
          <Link
            href="/profile"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-3 text-[#a3a3a3] hover:bg-[#252525] hover:text-[#f5f5f5] transition-colors"
          >
            ⚙️ Profil
          </Link>
          <form action={logoutAction}>
            <button
              type="submit"
              className="w-full text-left px-4 py-3 text-[#a3a3a3] hover:bg-[#252525] hover:text-[#f5f5f5] transition-colors border-t border-gray-800"
            >
              🚪 Logout
            </button>
          </form>
        </div>
      )}

      {/* Mobile overlay to close menu */}
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 z-30"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile bottom tab bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#1a1a1a] border-t border-gray-800">
        <div className="grid grid-cols-4 pb-[env(safe-area-inset-bottom)]">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center py-2 px-1 transition-colors ${
                pathname === item.href
                  ? 'text-[#3b82f6]'
                  : 'text-[#737373] active:text-[#a3a3a3]'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-[10px] mt-0.5 leading-tight">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}
