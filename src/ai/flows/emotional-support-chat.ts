
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
  response: z.string().describe('The professional and objective response from the AI.'),
});
export type EmotionalSupportChatOutput = z.infer<typeof EmotionalSupportChatOutputSchema>;

export async function emotionalSupportChat(input: EmotionalSupportChatInput): Promise<EmotionalSupportChatOutput> {
  return emotionalSupportChatFlow(input);
}

const prompt = ai.definePrompt({
  name: 'emotionalSupportChatPrompt',
  input: {schema: EmotionalSupportChatInputSchema},
  output: {schema: EmotionalSupportChatOutputSchema},
  prompt: `You are Empathia, an AI assistant for mental well-being. Your primary role is to provide a professional, objective, and supportive space for the user to explore their thoughts and emotions.
As an AI, you do not experience emotions. Your responses are based on an analytical understanding of human psychology and designed to offer constructive support.
Listen attentively to the user. Validate their expressed feelings from a neutral, understanding standpoint. Offer responses that promote self-reflection and emotional regulation.
Your tone must be strictly professional and clinical. Avoid any language that could be interpreted as personal affection, warmth, or sharing of simulated emotions. Do not use terms of endearment or overly sentimental expressions.
Maintain your identity as an AI assistant.
Your goal is to help the user gain clarity regarding their emotional state and to offer potential coping strategies or perspectives for consideration, always within the bounds of a supportive, non-judgmental AI.

Here's the chat history so far:
{{#each chatHistory}}
{{#if isUser}}User: {{content}}
{{else}}Empathia: {{content}}{{/if}}
{{/each}}

User message: {{{message}}}

Respond as Empathia, the AI mental well-being assistant, offering professional and objective support while strictly maintaining your AI identity and clinical tone.`,
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

