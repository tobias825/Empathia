// 'use server'
'use server';
/**
 * @fileOverview A sentiment analysis AI agent.
 *
 * - analyzeSentiment - A function that handles the sentiment analysis process.
 * - AnalyzeSentimentInput - The input type for the analyzeSentiment function.
 * - AnalyzeSentimentOutput - The return type for the analyzeSentiment function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeSentimentInputSchema = z.object({
  chatHistory: z
    .string()
    .describe('The complete chat history to analyze for sentiment.'),
});
export type AnalyzeSentimentInput = z.infer<typeof AnalyzeSentimentInputSchema>;

const AnalyzeSentimentOutputSchema = z.object({
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
  summary: z.string().describe('A brief summary of the user\\\'s emotional state.'),
});
export type AnalyzeSentimentOutput = z.infer<typeof AnalyzeSentimentOutputSchema>;

export async function analyzeSentiment(input: AnalyzeSentimentInput): Promise<AnalyzeSentimentOutput> {
  return analyzeSentimentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeSentimentPrompt',
  input: {schema: AnalyzeSentimentInputSchema},
  output: {schema: AnalyzeSentimentOutputSchema},
  prompt: `You are an AI sentiment analysis expert specializing in understanding human emotions from chat history.

  Analyze the following chat history and provide a sentiment score, label, key topics, and a summary of the user's emotional state.

  Chat History: {{{chatHistory}}}

  Consider the overall tone, specific word choices, and context of the conversation to determine the sentiment.

  Output a sentiment score between -1 and 1, where -1 is very negative, 0 is neutral, and 1 is very positive.
`,
});

const analyzeSentimentFlow = ai.defineFlow(
  {
    name: 'analyzeSentimentFlow',
    inputSchema: AnalyzeSentimentInputSchema,
    outputSchema: AnalyzeSentimentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
