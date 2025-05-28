"use client";

import { useState, useEffect, useRef } from 'react';
import type { ChatMessage as ChatMessageType } from '@/types';
import { emotionalSupportChat, type EmotionalSupportChatInput } from '@/ai/flows/emotional-support-chat';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChatMessage } from './ChatMessage';
import { SendHorizonal, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const CHAT_HISTORY_KEY = 'sereno_ai_chat_history';

export function ChatInterface() {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Load chat history from localStorage
    const storedHistory = localStorage.getItem(CHAT_HISTORY_KEY);
    if (storedHistory) {
      setMessages(JSON.parse(storedHistory));
    } else {
       // Initial welcome message from AI
      setMessages([
        {
          id: 'ai-welcome',
          role: 'assistant',
          content: "¡Hola! Soy Sereno, tu compañero IA. ¿Cómo te sientes hoy? Siéntete libre de compartir cualquier cosa que tengas en mente.",
          timestamp: new Date(),
        },
      ]);
    }
  }, []);

  useEffect(() => {
    // Save chat history to localStorage whenever it changes
    if (messages.length > 0) {
        localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(messages));
    }
    // Auto-scroll to bottom
    if (scrollAreaRef.current) {
      const scrollViewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
      if (scrollViewport) {
        scrollViewport.scrollTop = scrollViewport.scrollHeight;
      }
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (input.trim() === '' || isLoading) return;

    const newUserMessage: ChatMessageType = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const chatHistoryForAI: EmotionalSupportChatInput['chatHistory'] = messages
        .slice(-10) // Send last 10 messages as context
        .map((msg) => ({ role: msg.role, content: msg.content }));

      const aiResponse = await emotionalSupportChat({
        message: newUserMessage.content,
        chatHistory: chatHistoryForAI,
      });

      const newAiMessage: ChatMessageType = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: aiResponse.response,
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, newAiMessage]);
    } catch (error) {
      console.error('Error al obtener respuesta de IA:', error);
      toast({
        title: 'Error',
        description: 'No se pudo obtener una respuesta de la IA. Por favor, inténtalo de nuevo.',
        variant: 'destructive',
      });
      // Optionally add a message to chat indicating error
       const errorAiMessage: ChatMessageType = {
        id: `ai-error-${Date.now()}`,
        role: 'assistant',
        content: "Estoy teniendo un pequeño problema para conectarme en este momento. Por favor, intenta enviar tu mensaje de nuevo en un momento.",
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, errorAiMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] md:h-[calc(100vh-80px)] max-h-[800px] bg-card rounded-lg shadow-xl border">
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
        </div>
      </ScrollArea>
      <div className="border-t p-4 bg-background/50 rounded-b-lg">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe tu mensaje aquí..."
            className="flex-1 rounded-full px-4 py-2 focus-visible:ring-primary"
            disabled={isLoading}
          />
          <Button type="submit" size="icon" className="rounded-full" disabled={isLoading}>
            {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <SendHorizonal className="h-5 w-5" />}
            <span className="sr-only">Enviar mensaje</span>
          </Button>
        </form>
      </div>
    </div>
  );
}
