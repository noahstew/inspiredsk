'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminDashboard() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true); // new

  useEffect(() => {
    const isAuth = localStorage.getItem('admin-auth');
    if (isAuth !== 'true') {
      router.push('/admin/login');
    } else {
      setIsLoading(false); // allow rendering once verified
    }
  }, [router]);

  if (isLoading) {
    return null; // or a loading spinner
  }

  return (
    <div>
      <h1>Welcome to the admin dashboard</h1>
      {/* Your admin content here */}
      <Link href="/admin/links">Manage Links</Link>
      <Link href="/admin/blog">Manage Blog</Link>
    </div>
  );
}
