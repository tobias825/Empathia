import { SentimentAnalyzer } from '@/components/sentiment/SentimentAnalyzer';

export default function SentimentPage() {
  return (
    <div className="container mx-auto max-w-3xl py-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-foreground">
        Comprende Tus Emociones
      </h1>
      <p className="text-muted-foreground text-center mb-8">
        Sereno AI puede ayudarte a obtener información sobre tus sentimientos analizando tus conversaciones de chat.
        Esta es una herramienta privada para tu reflexión.
      </p>
      <SentimentAnalyzer />
    </div>
  );
}
