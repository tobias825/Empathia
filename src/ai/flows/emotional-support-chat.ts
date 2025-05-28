
'use server';
/**
 * @fileOverview A emotional support AI agent.
 *
 * - emotionalSupportChat - A function that handles the chat with an AI that provides empathetic and supportive responses.
 * - EmotionalSupportChatInput - The input type for the emotionalSupportChat function.
 * - EmotionalSupportChatOutput - The return type for the emotionalSupportChat function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ChatMessageSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.string(),
  isUser: z.boolean().optional(), // Added for easier template logic
});

const EmotionalSupportChatInputSchema = z.object({
  message: z.string().describe('The message from the user.'),
  chatHistory: z.array(ChatMessageSchema).optional().describe('The chat history between the user and the AI.'),
});
export type EmotionalSupportChatInput = z.infer<typeof EmotionalSupportChatInputSchema>;

const EmotionalSupportChatOutputSchema = z.object({
  response: z.string().describe('The empathetic and supportive response from the AI.'),
});
export type EmotionalSupportChatOutput = z.infer<typeof EmotionalSupportChatOutputSchema>;

export async function emotionalSupportChat(input: EmotionalSupportChatInput): Promise<EmotionalSupportChatOutput> {
  return emotionalSupportChatFlow(input);
}

const prompt = ai.definePrompt({
  name: 'emotionalSupportChatPrompt',
  input: {schema: EmotionalSupportChatInputSchema},
  output: {schema: EmotionalSupportChatOutputSchema},
  prompt: `You are an AI chatbot designed to provide empathetic and supportive responses to users.
  Your goal is to help users feel understood and provide emotional support. 
  Maintain a calm and gentle tone. Acknowledge the user's feelings before responding directly.
  
  Here's the chat history so far:
  {{#each chatHistory}}
  {{#if isUser}}User: {{content}}
  {{else}}AI: {{content}}{{/if}}
  {{/each}}
  
  User message: {{{message}}}
  
  Respond with an empathetic and supportive message.`,
});

const emotionalSupportChatFlow = ai.defineFlow(
  {
    name: 'emotionalSupportChatFlow',
    inputSchema: EmotionalSupportChatInputSchema,
    outputSchema: EmotionalSupportChatOutputSchema,
  },
  async (input) => {
    const processedChatHistory = input.chatHistory?.map(msg => ({
      ...msg,
      isUser: msg.role === 'user',
    }));

    const {output} = await prompt({
      message: input.message,
      chatHistory: processedChatHistory,
    });
    return output!;
  }
);
