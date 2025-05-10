import Image from 'next/image';
import Link from 'next/link';

function Navbar() {
  return (
    <nav className="bg-cream p-4 flex justify-between items-center gap-4">
      <Link href="/" className="flex items-center">
        <Image src="/logo2.png" alt="Logo" width={96} height={96} />
      </Link>
      <ul className="flex space-x-8 text-peach mt-2 text-3xl text-right font-league-spartan font-bold">
        <li className="hover:text-persimmon">
          <Link href="/">About</Link>
        </li>
        <li className="hover:text-persimmon">
          <Link href="/team">Team</Link>
        </li>
        <li className="hover:text-persimmon">
          <Link href="/blog">Blog</Link>
        </li>
        <li className="hover:text-persimmon">
          <Link href="/contact">Contact</Link>
        </li>
      </ul>
    </nav>
  );
}
export default Navbar;
