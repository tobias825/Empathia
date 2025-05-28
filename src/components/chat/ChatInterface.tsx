
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
import { useLanguage } from '@/contexts/LanguageContext';

const CHAT_HISTORY_KEY = 'sereno_ai_chat_history';

export function ChatInterface() {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const { t } = useLanguage();

  const translations = {
    welcomeMessage: {
      es: "¡Hola! Soy Empathia, tu compañero IA. ¿Cómo te sientes hoy? Siéntete libre de compartir cualquier cosa que tengas en mente.",
      en: "Hello! I'm Empathia, your AI companion. How are you feeling today? Feel free to share anything on your mind."
    },
    errorTitle: { es: 'Error', en: 'Error' },
    errorMessageAI: {
      es: 'No se pudo obtener una respuesta de la IA. Por favor, inténtalo de nuevo.',
      en: 'Could not get a response from the AI. Please try again.'
    },
    aiConnectionError: {
        es: "Estoy teniendo un pequeño problema para conectarme en este momento. Por favor, intenta enviar tu mensaje de nuevo en un momento.",
        en: "I'm having a little trouble connecting right now. Please try sending your message again in a moment."
    },
    inputPlaceholder: { es: "Escribe tu mensaje aquí...", en: "Type your message here..." },
    sendSrOnly: { es: "Enviar mensaje", en: "Send message" },
  };

  useEffect(() => {
    const storedHistory = localStorage.getItem(CHAT_HISTORY_KEY);
    if (storedHistory) {
      setMessages(JSON.parse(storedHistory));
    } else {
      setMessages([
        {
          id: 'ai-welcome',
          role: 'assistant',
          content: t(translations.welcomeMessage),
          timestamp: new Date(),
        },
      ]);
    }
  }, [t]); // Depend on t to re-render if language changes and history is empty

  useEffect(() => {
    if (messages.length > 0) {
        localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(messages));
    }
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
        .slice(-10) // Use last 10 messages for context
        .map((msg) => ({ 
          role: msg.role, 
          content: msg.content,
          isUser: msg.role === 'user' // Ensure isUser is populated for the AI flow
        }));


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
        title: t(translations.errorTitle),
        description: t(translations.errorMessageAI),
        variant: 'destructive',
      });
      const errorAiMessage: ChatMessageType = {
        id: `ai-error-${Date.now()}`,
        role: 'assistant',
        content: t(translations.aiConnectionError),
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
            placeholder={t(translations.inputPlaceholder)}
            className="flex-1 rounded-full px-4 py-2 focus-visible:ring-primary"
            disabled={isLoading}
          />
          <Button type="submit" size="icon" className="rounded-full" disabled={isLoading}>
            {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <SendHorizonal className="h-5 w-5" />}
            <span className="sr-only">{t(translations.sendSrOnly)}</span>
          </Button>
        </form>
      </div>
    </div>
  );
}
