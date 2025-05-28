
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { SidebarProvider } from '@/components/ui/sidebar';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { ThemeProvider } from '@/contexts/ThemeContext'; // Import ThemeProvider

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
  title: 'Empathia',
  description: 'Tu compañero IA empático para apoyo emocional. Your empathetic AI companion for emotional support.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // lang attribute will be updated by LanguageProvider effect
    // Defaulting to 'light' class to prevent FOUC if JS is slow or disabled, ThemeProvider will adjust
    <html lang="es" className="light"> 
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider> {/* Wrap with ThemeProvider */}
          <LanguageProvider>
            <SidebarProvider>
              {children}
            </SidebarProvider>
          </LanguageProvider>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
