'use server';

import { redirect } from 'next/navigation';
import { login as loginUser } from '../auth';

export async function loginAction(formData: FormData) {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  if (!username || !password) {
    redirect('/login?error=credentials');
  }

  const result = await loginUser(username, password);

  if (!result.success) {
    redirect('/login?error=invalid');
  }

  redirect('/rankings');
}
