
import type { Metadata } from 'next';
import { Comfortaa } from 'next/font/google'; // Changed from Quicksand
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { SidebarProvider } from '@/components/ui/sidebar';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { ThemeProvider } from '@/contexts/ThemeContext';

const comfortaa = Comfortaa({ // Changed from quicksand
  variable: '--font-comfortaa', // Changed variable name
  subsets: ['latin'],
  weight: ['400', '700'], // Loading regular and bold weights
});

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
    <html lang="es" className="light">
      <body className={`${comfortaa.variable} antialiased`}> {/* Use Comfortaa variable */}
        <ThemeProvider>
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
