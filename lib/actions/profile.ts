'use server';

import bcrypt from 'bcrypt';
import { prisma } from '../db';
import { getSession } from '../auth';

export async function changePasswordAction(formData: FormData) {
  const session = await getSession();

  if (!session.isLoggedIn || !session.userId) {
    return { success: false, error: 'Non authentifié' };
  }

  const currentPassword = formData.get('currentPassword') as string;
  const newPassword = formData.get('newPassword') as string;
  const confirmPassword = formData.get('confirmPassword') as string;

  if (!currentPassword || !newPassword || !confirmPassword) {
    return { success: false, error: 'Tous les champs sont requis' };
  }

  if (newPassword.length < 6) {
    return { success: false, error: 'Le nouveau mot de passe doit faire au moins 6 caractères' };
  }

  if (newPassword !== confirmPassword) {
    return { success: false, error: 'Les mots de passe ne correspondent pas' };
  }

  const user = await prisma.user.findUnique({ where: { id: session.userId } });

  if (!user) {
    return { success: false, error: 'Utilisateur introuvable' };
  }

  const passwordMatch = await bcrypt.compare(currentPassword, user.passwordHash);

  if (!passwordMatch) {
    return { success: false, error: 'Mot de passe actuel incorrect' };
  }

  const newPasswordHash = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: { id: session.userId },
    data: { passwordHash: newPasswordHash },
  });

  return { success: true };
}
