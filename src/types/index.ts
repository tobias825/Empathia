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
  title: string;
  description: string;
  link?: string;
  phone?: string;
  icon: React.ElementType; // Lucide icon component
}
