// app/admin/layout.js
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { ReactNode } from 'react';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const isAuth = localStorage.getItem('admin-auth');
    if (isAuth !== 'true') {
      router.push('/login');
    } else {
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-cream">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-pistachio"></div>
      </div>
    );
  }

  return <>{children}</>;
}
