'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import supabase from '@/utils/supabase/supabaseClient';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [monthlyInitiative, setMonthlyInitiative] =
    useState<string>('It is...');
  const currentMonth = new Date().toLocaleString('default', {
    month: 'long',
  });

  // Fetch monthly initiative from Supabase
  useEffect(() => {
    async function fetchInitiative() {
      const { data, error } = await supabase
        .from('site_settings')
        .select('value')
        .eq('key', 'monthly_initiative')
        .single();

      if (error || !data) {
        setMonthlyInitiative('Not set');
      } else {
        setMonthlyInitiative(data.value);
      }
    }
    fetchInitiative();
  }, []);

  // Close menu when Escape key is pressed
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleEsc);

    // Prevent body scrolling when menu is open
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="w-full bg-cream p-4 flex justify-between items-center font-league-spartan">
      {/* Left: Logo */}
      <div className="flex items-center ml-4 z-20 group">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Logo"
            width={96}
            height={96}
            className="transition-transform duration-200 group-hover:scale-110"
          />
        </Link>
      </div>

      {/* Center: Nav links and Monthly Initiative (side by side) */}
      <div className="hidden md:flex items-center space-x-6">
        <ul className="flex space-x-8 text-peach text-2xl font-league-spartan font-bold">
          <li className="group relative">
            <Link
              href="/about"
              className="hover:text-persimmon transition-colors duration-200"
            >
              About
              <span className="pointer-events-none absolute left-1/2 bottom-0 w-0 group-hover:w-full h-[2px] bg-persimmon transition-all duration-300 ease-in-out -translate-x-1/2 origin-center"></span>
            </Link>
          </li>
          <li className="group relative">
            <Link
              href="/team"
              className="hover:text-persimmon transition-colors duration-200"
            >
              Team
              <span className="pointer-events-none absolute left-1/2 bottom-0 w-0 group-hover:w-full h-[2px] bg-persimmon transition-all duration-300 ease-in-out -translate-x-1/2 origin-center"></span>
            </Link>
          </li>
          <li className="group relative">
            <Link
              href="/blog"
              className="hover:text-persimmon transition-colors duration-200"
            >
              Blog
              <span className="pointer-events-none absolute left-1/2 bottom-0 w-0 group-hover:w-full h-[2px] bg-persimmon transition-all duration-300 ease-in-out -translate-x-1/2 origin-center"></span>
            </Link>
          </li>
          <li className="group relative">
            <Link
              href="/contact"
              className="hover:text-persimmon transition-colors duration-200"
            >
              Contact
              <span className="pointer-events-none absolute left-1/2 bottom-0 w-0 group-hover:w-full h-[2px] bg-persimmon transition-all duration-300 ease-in-out -translate-x-1/2 origin-center"></span>
            </Link>
          </li>
        </ul>
        {/* Monthly Initiative (Desktop only, right beside links) */}
        <span className="bg-white rounded-full px-6 py-2 text-lg shadow border border-pistachio ml-6 flex items-center">
          <span className="font-bold text-olive mr-2">{currentMonth}</span>
          <span className="font-normal text-pistachio">
            {monthlyInitiative}
          </span>
        </span>
      </div>

      {/* Hamburger button */}
      <button
        className="md:hidden z-20 p-2 text-peach focus:outline-none"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <svg
          className="w-8 h-8"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          {isMenuOpen ? (
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 111.414 1.414L11.414 10l4.293 4.293a1 1 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 01-1.414-1.414L8.586 10 4.293 5.707a1 1 010-1.414z"
            />
          ) : (
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            />
          )}
        </svg>
      </button>

      {/* Overlay for mobile menu */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 transition-opacity duration-300"
          onClick={toggleMenu}
          aria-label="Close menu overlay"
        />
      )}

      {/* Mobile slide-in menu */}
      <div
        className={`fixed top-0 right-0 w-2/3 sm:w-1/2 max-w-sm h-full flex justify-between bg-cream z-40 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } flex flex-col p-8`}
      >
        <button
          className="absolute top-8 right-8 text-pistachio text-6xl font-league-spartan font-semibold"
          onClick={toggleMenu}
          aria-label="Close menu"
        >
          &times;
        </button>
        {/* Mobile menu items */}
        <ul className="flex flex-col items-end space-y-8 text-peach text-4xl font-league-spartan font-bold mt-24">
          <li className="group relative">
            <Link
              href="/about"
              onClick={toggleMenu}
              className="hover:text-persimmon transition-colors duration-200"
            >
              About
              <span className="pointer-events-none absolute left-1/2 bottom-0 w-0 group-hover:w-full h-[2px] bg-persimmon transition-all duration-300 ease-in-out -translate-x-1/2 origin-center"></span>
            </Link>
          </li>
          <li className="group relative">
            <Link
              href="/team"
              onClick={toggleMenu}
              className="hover:text-persimmon transition-colors duration-200"
            >
              Team
              <span className="pointer-events-none absolute left-1/2 bottom-0 w-0 group-hover:w-full h-[2px] bg-persimmon transition-all duration-300 ease-in-out -translate-x-1/2 origin-center"></span>
            </Link>
          </li>
          <li className="group relative">
            <Link
              href="/blog"
              onClick={toggleMenu}
              className="hover:text-persimmon transition-colors duration-200"
            >
              Blog
              <span className="pointer-events-none absolute left-1/2 bottom-0 w-0 group-hover:w-full h-[2px] bg-persimmon transition-all duration-300 ease-in-out -translate-x-1/2 origin-center"></span>
            </Link>
          </li>
          <li className="group relative">
            <Link
              href="/contact"
              onClick={toggleMenu}
              className="hover:text-persimmon transition-colors duration-200"
            >
              Contact
              <span className="pointer-events-none absolute left-1/2 bottom-0 w-0 group-hover:w-full h-[2px] bg-persimmon transition-all duration-300 ease-in-out -translate-x-1/2 origin-center"></span>
            </Link>
          </li>
        </ul>
        {/* Monthly Initiative (Mobile only, above logo, with gap) */}
        <div className="flex flex-col items-end w-full mb-10">
          <span className="bg-white rounded-full px-5 py-2 text-lg shadow border border-pistachio mb-6 text-right leading-tight">
            <span className="block font-bold text-olive">{currentMonth}</span>
            <span className="block font-normal text-pistachio">
              {monthlyInitiative}
            </span>
          </span>
          <Link href="/" className="flex items-center z-20 group">
            <Image
              src="/logo.png"
              alt="Logo"
              width={164}
              height={164}
              className="transition-transform duration-200 group-hover:scale-110"
            />
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
