
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { SidebarProvider } from '@/components/ui/sidebar';
import { LanguageProvider } from '@/contexts/LanguageContext';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

// Metadata will be static, but titles within pages can be dynamic
export const metadata: Metadata = {
  title: 'Sereno AI',
  description: 'Tu compañero IA empático para apoyo emocional. Your empathetic AI companion for emotional support.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // lang attribute will be updated by LanguageProvider effect
    <html lang="es"> 
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <LanguageProvider>
          <SidebarProvider>
            {children}
          </SidebarProvider>
        </LanguageProvider>
        <Toaster />
      </body>
    </html>
  );
}
