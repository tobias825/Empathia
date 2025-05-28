import { SentimentAnalyzer } from '@/components/sentiment/SentimentAnalyzer';

export default function SentimentPage() {
  return (
    <div className="container mx-auto max-w-3xl py-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-foreground">
        Understand Your Emotions
      </h1>
      <p className="text-muted-foreground text-center mb-8">
        Sereno AI can help you gain insights into your feelings by analyzing your chat conversations. 
        This is a private tool for your reflection.
      </p>
      <SentimentAnalyzer />
    </div>
  );
}
