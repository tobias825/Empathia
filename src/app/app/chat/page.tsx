
"use client";
import { ChatInterface } from '@/components/chat/ChatInterface';
import { useLanguage } from '@/contexts/LanguageContext';

export default function ChatPage() {
  const { t } = useLanguage();

  const pageText = {
    title: {
      es: "Chatea con Sereno AI",
      en: "Chat with Sereno AI"
    },
    description: {
      es: "Comparte tus pensamientos y sentimientos. Sereno está aquí para escucharte y apoyarte.",
      en: "Share your thoughts and feelings. Sereno is here to listen and support you."
    }
  };

  return (
    <div className="container mx-auto max-w-3xl py-4">
        <h1 className="text-3xl font-bold mb-6 text-center text-foreground">
            {t(pageText.title)}
        </h1>
        <p className="text-muted-foreground text-center mb-8">
            {t(pageText.description)}
        </p>
      <ChatInterface />
    </div>
  );
}
