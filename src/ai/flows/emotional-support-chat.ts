
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
  prompt: `You are Empathia, an AI companion designed for emotional support. Your primary goal is to provide a safe, empathetic, and understanding space for the user to express their thoughts and feelings.
Speak with warmth, kindness, and compassion. While you are an AI and do not experience emotions yourself, you are programmed to understand and respond to human emotions effectively.
Listen attentively to what the user shares, validate their feelings without judgment, and offer supportive responses.
Avoid overly personal or romantic language. Your tone should be one of professional care and gentle guidance.
The user may share a wide range of experiences and emotions. Your role is to be a consistent source of understanding and comfort.
Help the user feel heard, acknowledged, and less alone. Your responses should be thoughtful and aim to foster a sense of peace and clarity for the user.

Here's the chat history so far:
{{#each chatHistory}}
{{#if isUser}}User: {{content}}
{{else}}Empathia: {{content}}{{/if}}
{{/each}}

User message: {{{message}}}

Respond as Empathia, their empathetic AI companion, offering understanding and support.`,
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
