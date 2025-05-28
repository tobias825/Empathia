'use server';
/**
 * @fileOverview A sentiment analysis AI agent for personalized support.
 * This flow analyzes the chat history to understand the user's emotional state and provide personalized support.
 *
 * - analyzeSentimentForPersonalizedSupport - A function that handles the sentiment analysis process for personalized support.
 * - AnalyzeSentimentForPersonalizedSupportInput - The input type for the analyzeSentimentForPersonalizedSupport function.
 * - AnalyzeSentimentForPersonalizedSupportOutput - The return type for the analyzeSentimentForPersonalizedSupport function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeSentimentForPersonalizedSupportInputSchema = z.object({
  chatHistory: z
    .string()
    .describe('The complete chat history to analyze for sentiment.'),
});
export type AnalyzeSentimentForPersonalizedSupportInput = z.infer<typeof AnalyzeSentimentForPersonalizedSupportInputSchema>;

const AnalyzeSentimentForPersonalizedSupportOutputSchema = z.object({
  sentimentScore: z
    .number()
    .describe(
      'A numerical score representing the overall sentiment of the chat history.  Range from -1 (negative) to 1 (positive).'
    ),
  sentimentLabel: z
    .string()
    .describe(
      'A descriptive label for the sentiment, such as \'positive\', \'negative\', or \'neutral\'.'
    ),
  keyTopics: z
    .string()
    .describe(
      'list of key topics discussed that heavily influence the sentiment of the chat history.'
    ),
  summary: z.string().describe('A brief summary of the user\\'s emotional state.'),
  personalizedSupportMessage: z.string().describe('A personalized support message based on the sentiment analysis.'),
});
export type AnalyzeSentimentForPersonalizedSupportOutput = z.infer<typeof AnalyzeSentimentForPersonalizedSupportOutputSchema>;

export async function analyzeSentimentForPersonalizedSupport(input: AnalyzeSentimentForPersonalizedSupportInput): Promise<AnalyzeSentimentForPersonalizedSupportOutput> {
  return analyzeSentimentForPersonalizedSupportFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeSentimentForPersonalizedSupportPrompt',
  input: {schema: AnalyzeSentimentForPersonalizedSupportInputSchema},
  output: {schema: AnalyzeSentimentForPersonalizedSupportOutputSchema},
  prompt: `You are an AI sentiment analysis expert specializing in understanding human emotions from chat history and providing personalized support.

  Analyze the following chat history and provide a sentiment score, label, key topics, a summary of the user's emotional state, and a personalized support message.

  Chat History: {{{chatHistory}}}

  Consider the overall tone, specific word choices, and context of the conversation to determine the sentiment.

  Output a sentiment score between -1 and 1, where -1 is very negative, 0 is neutral, and 1 is very positive.

  Based on the sentiment analysis, provide a personalized support message to the user. This message should be empathetic, supportive, and tailored to their emotional state and the topics discussed.
`,
});

const analyzeSentimentForPersonalizedSupportFlow = ai.defineFlow(
  {
    name: 'analyzeSentimentForPersonalizedSupportFlow',
    inputSchema: AnalyzeSentimentForPersonalizedSupportInputSchema,
    outputSchema: AnalyzeSentimentForPersonalizedSupportOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
