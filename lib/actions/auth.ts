'use server';

import { redirect } from 'next/navigation';
import { login as loginUser } from '../auth';

export async function loginAction(formData: FormData) {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  if (!username || !password) {
    return { error: 'Username and password are required' };
  }

  const result = await loginUser(username, password);

  if (!result.success) {
    return { error: result.error };
  }

  redirect('/rankings');
}
