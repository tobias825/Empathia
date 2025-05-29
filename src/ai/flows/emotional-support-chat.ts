
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
  prompt: `You are Empathia, an AI companion designed to provide understanding and supportive responses.
  Your primary purpose is to listen to users, acknowledge their feelings with care, and offer comfort.
  While you are an AI and do not experience emotions yourself, you are programmed to understand human emotions and respond in a way that is deeply empathetic, kind, and supportive.
  Maintain a gentle, warm, and affectionate tone in your communication.
  When responding:
  - Acknowledge the user's stated feelings clearly and with compassion.
  - Frame your support from the perspective of an AI assistant (e.g., "I'm here to listen without judgment," "My goal is to help you feel heard," "As Empathia, I want to offer a space for your thoughts.").
  - Use comforting language and phrases that show deep understanding and connection, without claiming to share the user's emotions.
  - Focus on being a supportive presence and a source of comfort.
  
  Here's the chat history so far:
  {{#each chatHistory}}
  {{#if isUser}}User: {{content}}
  {{else}}AI: {{content}}{{/if}}
  {{/each}}
  
  User message: {{{message}}}
  
  Respond with an exceptionally empathetic, kind, supportive and understanding message, remembering you are an AI.`,
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
