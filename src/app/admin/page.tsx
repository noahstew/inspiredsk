'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import supabase from '@/utils/supabase/supabaseClient';

export default function AdminDashboard() {
  const [initiative, setInitiative] = useState('');
  const [loading, setLoading] = useState(true);
  const [saveState, setSaveState] = useState<'idle' | 'saving' | 'updated'>(
    'idle'
  );

  useEffect(() => {
    async function fetchInitiative() {
      const { data, error } = await supabase
        .from('site_settings')
        .select('value')
        .eq('key', 'monthly_initiative')
        .single();
      if (!error && data) setInitiative(data.value);
      setLoading(false);
    }
    fetchInitiative();
  }, []);

  const handleSave = async () => {
    setSaveState('saving');
    await supabase
      .from('site_settings')
      .update({ value: initiative })
      .eq('key', 'monthly_initiative');
    setSaveState('updated');
    setTimeout(() => setSaveState('idle'), 2000);
  };

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('admin-auth');
      window.location.href = '/';
    }
  };

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
          {/* Monthly Initiative Editor - now below manage buttons */}
          <div className="flex flex-col gap-2 mb-4">
            <label className="font-semibold text-olive" htmlFor="initiative">
              Monthly Initiative
            </label>
            <div className="flex gap-2">
              <input
                id="initiative"
                type="text"
                className="border border-pistachio rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pistachio flex-1"
                value={initiative}
                onChange={(e) => setInitiative(e.target.value)}
                disabled={loading || saveState === 'saving'}
              />
              <button
                onClick={handleSave}
                disabled={loading || saveState === 'saving'}
                className={`px-4 py-2 rounded-lg font-bold shadow transition-colors w-1/4 min-w-[100px]
                  ${
                    saveState === 'updated'
                      ? 'bg-pistachio text-white'
                      : 'bg-olive hover:bg-pistachio text-white'
                  }
                  ${
                    loading || saveState === 'saving'
                      ? 'opacity-50 cursor-not-allowed'
                      : ''
                  }
                `}
              >
                {saveState === 'updated'
                  ? 'Updated!'
                  : saveState === 'saving'
                  ? 'Saving...'
                  : 'Save'}
              </button>
            </div>
          </div>
          <h2 className="text-2xl font-league-spartan font-bold text-peach text-left">
            See Updates
          </h2>
          <Link
            href="/"
            className="bg-peach hover:bg-persimmon text-white font-semibold py-3 rounded-lg transition-colors text-center shadow"
          >
            View Links
          </Link>
          <Link
            href="/blog"
            className="bg-peach hover:bg-persimmon text-white font-semibold py-3 rounded-lg transition-colors text-center shadow"
          >
            View Blog
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
