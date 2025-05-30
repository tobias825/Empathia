
"use client";
import { ChatInterface } from '@/components/chat/ChatInterface';
import { useLanguage } from '@/contexts/LanguageContext';
import { FloatingShapes } from '@/components/decorative/FloatingShapes';

export default function ChatPage() {
  const { t } = useLanguage();

  const pageText = {
    title: {
      es: "Chatea con Empathia",
      en: "Chat with Empathia"
    },
    description: {
      es: "Comparte tus pensamientos y sentimientos. Empathia está aquí para escucharte y apoyarte.",
      en: "Share your thoughts and feelings. Empathia is here to listen and support you."
    }
  };

  return (
    <div className="container mx-auto max-w-3xl py-4 relative">
      <FloatingShapes variant="chat" className="z-0" />
      <div className="relative z-10">
        <h1 className="text-3xl font-bold mb-2 text-center text-foreground relative">
            {t(pageText.title)}
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
              <svg width="90" height="12" viewBox="0 0 90 12" xmlns="http://www.w3.org/2000/svg" className="text-primary/50 dark:text-primary/40">
                <path d="M5 7 Q 25 1, 45 7 T 85 7" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
              </svg>
            </span>
        </h1>
        <p className="text-muted-foreground text-center mb-8 pt-2 relative">
            {t(pageText.description)}
            <span className="absolute top-0 right-[15%] opacity-70 group-hover:opacity-100 transition-opacity duration-300">
              <svg width="60" height="8" viewBox="0 0 60 8" xmlns="http://www.w3.org/2000/svg" className="text-muted-foreground/40 dark:text-muted-foreground/30">
                <path d="M2 4.5 C 15 2, 30 5, 45 3.5 S 58 5.5, 58 5.5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
              </svg>
            </span>
        </p>
        <ChatInterface />
      </div>
    </div>
  );
}
