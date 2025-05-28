
"use client";
import { SentimentAnalyzer } from '@/components/sentiment/SentimentAnalyzer';
import { useLanguage } from '@/contexts/LanguageContext';

export default function SentimentPage() {
  const { t } = useLanguage();

  const pageText = {
    title: {
      es: "Comprende Tus Emociones",
      en: "Understand Your Emotions"
    },
    description: {
      es: "Empathia puede ayudarte a obtener información sobre tus sentimientos analizando tus conversaciones de chat. Esta es una herramienta privada para tu reflexión.",
      en: "Empathia can help you gain insights into your feelings by analyzing your chat conversations. This is a private tool for your reflection."
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
      <SentimentAnalyzer />
    </div>
  );
}
