import type { Metadata } from 'next';
import './globals.css';
import { inter } from '@/fonts';
import Footer from '@/ui/footer';
import Header from '@/ui/header';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: 'Movie Watchlist',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} flex min-h-[100vh] flex-col antialiased`}
      >
        <Toaster position="bottom-right" />
        <Header />
        <main className="mb-unit-lg pl-[10dvw] pr-[10dvw]">{children}</main>
        <div className="mt-auto">
          <Footer />
        </div>
      </body>
    </html>
  );
}
