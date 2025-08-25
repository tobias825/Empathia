'use server';
import { genkitNextHandler } from '@genkit-ai/next';
import '@/ai/flows/emotional-support-chat';
import '@/ai/flows/sentiment-analysis';

export const { GET, POST } = genkitNextHandler();
