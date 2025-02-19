import type { Metadata } from 'next';
import { Geist_Mono, Noto_Sans } from 'next/font/google';

import './globals.css';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

import { AppSidebar } from './app-side-bar';

const notoSans = Noto_Sans({
  variable: '--font-noto-sans',
  subsets: ['latin'],
  weight: ['400', '700'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Stream Wave',
  description: 'Stream Wave',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${notoSans.variable} ${geistMono.variable} antialiased`}>
        <SidebarProvider>
          <AppSidebar />

          <SidebarTrigger />
          {children}
        </SidebarProvider>
      </body>
    </html>
  );
}
