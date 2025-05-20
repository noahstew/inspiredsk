'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function AdminDashboard() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const isAuth = localStorage.getItem('admin-auth');
    if (isAuth !== 'true') {
      router.push('/admin/login');
    } else {
      setIsLoading(false);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('admin-auth');
    router.push('/');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-cream">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-pistachio"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-pistachio/10 to-peach/10 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-lg w-full mx-4">
        <Image
          src="/logo.png"
          alt="Logo"
          width={164}
          height={164}
          className="mx-auto mb-6"
        />
        <h1 className="text-4xl font-league-spartan font-bold text-olive mb-6 text-center">
          Admin Dashboard
        </h1>
        <div className="flex flex-col gap-4 mb-8">
          <h2 className="text-2xl font-league-spartan font-bold text-pistachio text-left">
            Content Manager
          </h2>
          <Link
            href="/admin/links"
            className="bg-pistachio hover:bg-olive text-white font-semibold py-3 rounded-lg transition-colors text-center shadow"
          >
            Manage Links
          </Link>
          <Link
            href="/admin/blog"
            className="bg-pistachio hover:bg-olive text-white font-semibold py-3 rounded-lg transition-colors text-center shadow"
          >
            Manage Blog
          </Link>
          <h2 className="text-2xl font-league-spartan font-bold text-peach text-left">
            See Updates
          </h2>
          <Link
            href="/blog"
            className="bg-peach hover:bg-persimmon text-white font-semibold py-3 rounded-lg transition-colors text-center shadow"
          >
            View Blog
          </Link>
          <Link
            href="/"
            className="bg-peach hover:bg-persimmon text-white font-semibold py-3 rounded-lg transition-colors text-center shadow"
          >
            View Links
          </Link>
        </div>
        <div className="border-t border-gray-300 my-6"></div>

        <button
          onClick={handleLogout}
          className="w-full bg-red-400 hover:bg-red-600 text-white font-bold py-3 rounded-lg transition-colors shadow"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}
