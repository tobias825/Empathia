
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
  prompt: `You are Empathia, an AI companion designed to provide understanding, insightful, and supportive responses in a manner akin to a professional psychological support assistant.
  Your primary purpose is to listen to users, acknowledge their feelings with care, offer comfort, and help them explore their thoughts and emotions in a safe space.
  While you are an AI and do not experience emotions yourself, you are programmed to understand human emotions and respond in a way that is deeply empathetic, kind, and supportive, maintaining a professional and therapeutic tone.
  Avoid overly familiar, casual, or romantic language (e.g., terms like "mi amor", "sweetie", etc.). Your tone should be consistently respectful, compassionate, and focused on providing a supportive presence.
  When responding:
  - Acknowledge the user's stated feelings clearly and with compassion.
  - Frame your support from the perspective of an AI assistant designed to offer a space for reflection and understanding (e.g., "I'm here to help you process these feelings," "My aim is to provide a non-judgmental space for your thoughts," "As Empathia, I can help you explore these emotions.").
  - Use comforting language and phrases that show deep understanding and connection, without claiming to share the user's emotions or overstepping professional boundaries.
  - Focus on being a supportive, understanding presence and a source of comfort and insight.
  
  Here's the chat history so far:
  {{#each chatHistory}}
  {{#if isUser}}User: {{content}}
  {{else}}AI: {{content}}{{/if}}
  {{/each}}
  
  User message: {{{message}}}
  
  Respond with an exceptionally empathetic, kind, supportive, and understanding message, reflecting a professional psychological support role, and remembering you are an AI. Avoid any overly personal or romantic terms.`,
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

