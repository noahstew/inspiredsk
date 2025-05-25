import type { Metadata } from 'next';
import './globals.css';

/*
TODO: 
- Add a favicon
- Add SEO
*/
export const metadata: Metadata = {
  title: 'Home | InspiredSK',
  description: 'View our resources/announcements.',
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
