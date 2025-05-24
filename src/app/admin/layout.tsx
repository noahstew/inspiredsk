import { ReactNode } from 'react';
import AuthGuard from '@/components/auth/AuthGuard';

export const metadata = {
  title: 'Admin Dashboard',
  description: 'Admin dashboard for managing content and settings.',
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  // AuthGuard is a client component, but can be used here
  return <AuthGuard>{children}</AuthGuard>;
}
