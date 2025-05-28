
"use client";

import type { ChatMessage as ChatMessageType } from '@/types';
import { emotionalSupportChat, type EmotionalSupportChatInput } from '@/ai/flows/emotional-support-chat';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChatMessage } from './ChatMessage';
import { SendHorizonal, Loader2, Mic, Square } from 'lucide-react'; // Added Mic and Square
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import React, { useState, useEffect, useRef, useCallback } from 'react'; // Added React for types if needed

const CHAT_HISTORY_KEY = 'sereno_ai_chat_history';

// Declare SpeechRecognition types for broader compatibility
declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
}

export function ChatInterface() {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const { language, t } = useLanguage(); // Get language for speech recognition

  const [isRecording, setIsRecording] = useState(false);
  const [speechApiSupported, setSpeechApiSupported] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

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
    recordAudio: { es: "Grabar audio", en: "Record audio" },
    stopRecording: { es: "Detener grabación", en: "Stop recording" },
    speechNotSupported: { es: "La API de reconocimiento de voz no es compatible con este navegador.", en: "Speech recognition API not supported in this browser." },
    micPermissionDenied: { es: "Permiso de micrófono denegado. Habilítalo en la configuración de tu navegador.", en: "Microphone permission denied. Please enable it in your browser settings." },
    speechError: { es: "Error de reconocimiento de voz", en: "Speech recognition error" },
    noSpeechDetected: { es: "No se detectó voz. Inténtalo de nuevo.", en: "No speech detected. Please try again." },
    audioCaptureError: { es: "Error al capturar audio.", en: "Error capturing audio." },
  };
  
  useEffect(() => {
    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognitionAPI) {
      setSpeechApiSupported(true);
    } else {
      setSpeechApiSupported(false);
      console.warn("Speech Recognition API not supported.");
    }
  }, []);

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
  }, [t]); // Depend on t for welcome message

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
        .slice(-10) 
        .map((msg) => ({ 
          role: msg.role, 
          content: msg.content,
          isUser: msg.role === 'user'
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

  const handleToggleRecording = useCallback(async () => {
    if (!speechApiSupported) {
      toast({
        title: t(translations.errorTitle),
        description: t(translations.speechNotSupported),
        variant: 'destructive',
      });
      return;
    }

    if (isRecording && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
      return;
    }

    try {
      // Request microphone permission
      await navigator.mediaDevices.getUserMedia({ audio: true });

      const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognitionAPI();
      recognitionRef.current.continuous = true; // Keep listening
      recognitionRef.current.interimResults = true; // Get results as they come
      recognitionRef.current.lang = language;

      let finalTranscript = '';
      let interimTranscript = '';

      recognitionRef.current.onstart = () => {
        setIsRecording(true);
        finalTranscript = input; // Start with current input content
      };

      recognitionRef.current.onresult = (event) => {
        interimTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }
        setInput(finalTranscript + interimTranscript);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        let errorMsg = t(translations.speechError);
        if (event.error === 'no-speech') {
          errorMsg = t(translations.noSpeechDetected);
        } else if (event.error === 'audio-capture') {
          errorMsg = t(translations.audioCaptureError);
        } else if (event.error === 'not-allowed') {
          errorMsg = t(translations.micPermissionDenied);
        }
        toast({
          title: t(translations.errorTitle),
          description: errorMsg,
          variant: 'destructive',
        });
        setIsRecording(false);
      };

      recognitionRef.current.onend = () => {
        setIsRecording(false);
        // Ensure final transcript is set if onend is called before last result
        if (finalTranscript.trim() || interimTranscript.trim()) {
             setInput(prev => {
                // This logic ensures we don't lose user's typed text
                // if speech recognition ends without adding anything new
                // or if there's a slight mismatch in how finalTranscript was updated.
                // The goal is to have the input field reflect the spoken words
                // combined with what might have been typed.
                // Let's refine this: onresult handles appending, onend just ensures state is clean.
                // The finalTranscript in onresult should build upon the existing input.
                // Let's adjust onresult to be:
                // setInput(initialInputFromBeforeRecording + finalTranscriptFromSpeech + interimTranscriptFromSpeech);
                // This needs careful handling of `initialInputFromBeforeRecording`.
                // A simpler way for `onresult`:
                // setInput(currentInputBeforeThisResult + newTranscriptChunk);
                // The current `setInput(finalTranscript + interimTranscript)` inside `onresult` effectively
                // rebuilds the input field content. `finalTranscript` is initialized with `input` at `onstart`.
                return prev; // The input is already updated by onresult
             });
        }
      };
      
      recognitionRef.current.start();

    } catch (err) {
      console.error('Error requesting microphone permission or starting recognition:', err);
      toast({
        title: t(translations.errorTitle),
        description: t(translations.micPermissionDenied),
        variant: 'destructive',
      });
      setIsRecording(false);
    }
  }, [isRecording, speechApiSupported, language, t, toast, input]);


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
            disabled={isLoading || isRecording} // Disable input while recording if preferred, or allow typing
          />
          {speechApiSupported && (
            <Button 
              type="button" 
              size="icon" 
              variant={isRecording ? "destructive" : "outline"}
              className="rounded-full" 
              onClick={handleToggleRecording}
              disabled={isLoading}
              title={isRecording ? t(translations.stopRecording) : t(translations.recordAudio)}
            >
              {isRecording ? <Square className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
              <span className="sr-only">{isRecording ? t(translations.stopRecording) : t(translations.recordAudio)}</span>
            </Button>
          )}
          <Button type="submit" size="icon" className="rounded-full" disabled={isLoading || input.trim() === ''}>
            {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <SendHorizonal className="h-5 w-5" />}
            <span className="sr-only">{t(translations.sendSrOnly)}</span>
          </Button>
        </form>
      </div>
    </div>
  );
}
