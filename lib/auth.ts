import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import bcrypt from 'bcrypt';
import { prisma } from './db';
import { sessionOptions, SessionData, defaultSession } from './session';

export async function getSession() {
  const cookieStore = await cookies();
  return getIronSession<SessionData>(cookieStore, sessionOptions);
}

export async function login(username: string, password: string) {
  const user = await prisma.user.findUnique({ where: { username } });

  if (!user) {
    return { success: false, error: 'Invalid credentials' };
  }

  const passwordMatch = await bcrypt.compare(password, user.passwordHash);

  if (!passwordMatch) {
    return { success: false, error: 'Invalid credentials' };
  }

  const session = await getSession();
  session.userId = user.id;
  session.isLoggedIn = true;
  await session.save();

  return { success: true };
}

export async function logout() {
  const session = await getSession();
  session.destroy();
}

export async function isAuthenticated() {
  const session = await getSession();
  return session.isLoggedIn === true;
}
