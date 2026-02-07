import { loginAction } from '@/lib/actions/auth';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
      <div className="w-full max-w-md p-8 bg-[#1a1a1a] rounded-lg shadow-lg border border-gray-800">
        <h1 className="text-3xl font-bold text-center mb-8 text-[#f5f5f5]">
          Belote Scorer
        </h1>

        <form action={loginAction} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-[#a3a3a3] mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              required
              className="w-full px-4 py-2 bg-[#0a0a0a] border border-gray-700 rounded-md text-[#f5f5f5] focus:outline-none focus:ring-2 focus:ring-[#3b82f6]"
              autoComplete="username"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[#a3a3a3] mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="w-full px-4 py-2 bg-[#0a0a0a] border border-gray-700 rounded-md text-[#f5f5f5] focus:outline-none focus:ring-2 focus:ring-[#3b82f6]"
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-[#3b82f6] hover:bg-[#2563eb] text-white font-medium rounded-md transition-colors"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
