'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';

const ADMIN_PASSWORD = 'password';

export default function AdminLogin() {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    if (input === ADMIN_PASSWORD) {
      localStorage.setItem('admin-auth', 'true');
      router.push('/admin');
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <div className="flex justify-center mb-6">
          <Image src="/logo.png" alt="InspirED Logo" width={120} height={120} />
        </div>

        <h1 className="text-3xl font-league-spartan font-bold text-pistachio text-center mb-8">
          Admin Login
        </h1>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-charcoal mb-1"
            >
              Passcode
            </label>
            <input
              id="password"
              type="password"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                if (error) setError('');
              }}
              onKeyPress={handleKeyPress}
              placeholder="Enter admin passcode"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pistachio"
            />
          </div>

          {error && <p className="text-persimmon text-sm">{error}</p>}

          <button
            onClick={handleLogin}
            className="w-full bg-pistachio hover:bg-olive text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out"
          >
            Login
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Accessible only by the InspirED team.
          </p>
        </div>
      </div>
    </div>
  );
}
