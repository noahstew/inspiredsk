import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Home | InspiredSK',
  description: 'View our resources/announcements.',
  keywords: [
    'InspiredSK',
    'Inspired SK',
    'Inspired Sask',
    'Inspired Saskatchewan',
    'education',
    'Saskatchewan',
    'resources',
    'announcements',
    'blog',
    'team',
    'contact',
    'inspired',
    'learning',
    'community',
    'volunteer',
    'partnership',
    'education resources',
    'community engagement',
    'organization',
    'non-profit',
  ],
  icons: {
    icon: '/favicon.jpg',
  },
  verification: {
    google: [
      'xqUvnM1kpG7FINWAmbCCW4pH-dxekkHeAt9UEun_mmk',
      'ZU3yhmsiXEcrNt29AGuEiRy3csWbceuNkGFYbAG0TXE',
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-cream font-league-spartan">{children}</body>
    </html>
  );
}
