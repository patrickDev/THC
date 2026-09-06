'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function adminLogin(fd: FormData): Promise<void> {
  const password = String(fd.get('password') ?? '');
  const secret = process.env.ADMIN_SECRET;

  if (!secret || password !== secret) {
    redirect('/admin/login?error=invalid');
  }

  (await cookies()).set('admin_token', secret, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  redirect('/admin/leads');
}

export async function adminLogout(): Promise<void> {
  (await cookies()).delete('admin_token');
  redirect('/admin/login');
}
