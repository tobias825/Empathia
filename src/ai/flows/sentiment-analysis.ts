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
  language: z.enum(['es', 'en']).describe('The language code for the output (e.g., "es" for Spanish, "en" for English).'),
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

// Schema for the prompt's direct input, including the resolved language name
const InternalPromptInputSchema = z.object({
  chatHistory: z.string(),
  outputLanguageName: z.string().describe('The full name of the language for AI output, e.g., "Spanish".'),
});

const prompt = ai.definePrompt({
  name: 'analyzeSentimentPrompt',
  input: {schema: InternalPromptInputSchema}, // Uses the internal schema
  output: {schema: AnalyzeSentimentOutputSchema},
  prompt: `You are an AI sentiment analysis expert specializing in understanding human emotions from chat history.

  Analyze the following chat history and provide a sentiment score, label, key topics, and a summary of the user's emotional state.

  Chat History: {{{chatHistory}}}

  Consider the overall tone, specific word choices, and context of the conversation to determine the sentiment.

  Output a sentiment score between -1 and 1, where -1 is very negative, 0 is neutral, and 1 is very positive.

  IMPORTANT: Generate the 'sentimentLabel', 'keyTopics', and 'summary' fields in {{{outputLanguageName}}}.
`,
});

export const analyzeSentimentFlow = ai.defineFlow(
  {
    name: 'analyzeSentimentFlow',
    inputSchema: AnalyzeSentimentInputSchema, // Flow input remains the same
    outputSchema: AnalyzeSentimentOutputSchema,
  },
  async (input: AnalyzeSentimentInput) => { // Explicitly type flow input
    const outputLanguageName = input.language === 'es' ? 'Spanish' : 'English';
    
    const promptPayload = {
      chatHistory: input.chatHistory,
      outputLanguageName: outputLanguageName,
    };
    
    const {output} = await prompt(promptPayload);
    return output!;
  }
);
