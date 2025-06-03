import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Home | InspiredSK',
  description: 'View our resources/announcements.',
  icons: {
    icon: '/favicon.jpg',
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
