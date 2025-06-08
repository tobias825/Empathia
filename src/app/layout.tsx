
import type { Metadata } from 'next';
import { Quicksand } from 'next/font/google'; // Changed from Geist
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { SidebarProvider } from '@/components/ui/sidebar';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { ThemeProvider } from '@/contexts/ThemeContext';

const quicksand = Quicksand({ // Changed from geistSans and geistMono
  variable: '--font-quicksand',
  subsets: ['latin'],
  weight: ['700'], // For Bold
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
      <body className={`${quicksand.variable} antialiased`}> {/* Use Quicksand variable */}
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
