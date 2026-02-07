'use server';

import { redirect } from 'next/navigation';
import { logout as logoutUser } from '../auth';

export async function logoutAction() {
  await logoutUser();
  redirect('/login');
}
