
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface SentimentResult {
  id: string;
  timestamp: Date;
  sentimentScore: number;
  sentimentLabel: string;
  keyTopics: string;
  summary: string;
  chatHistorySummary: string; // e.g., first few messages or a summary of the analyzed portion
}

export interface ResourceItem {
  id: string;
  title: { es: string; en: string };
  description: { es: string; en: string };
  link?: string;
  phone?: string;
  icon: React.ElementType; // Lucide icon component
}

export interface MotivationalQuote {
  id: string;
  text: { es: string; en: string };
  author?: { es: string; en: string };
}

export interface QuoteCategory {
  id: string;
  title: { es: string; en: string };
  description?: { es: string; en: string }; // Optional description for the category
  icon?: React.ElementType;
  quotes: MotivationalQuote[];
}
