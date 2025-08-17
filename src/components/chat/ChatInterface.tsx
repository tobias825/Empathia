
"use client";

import type { ChatMessage as ChatMessageType } from '@/types';
import type { EmotionalSupportChatInput } from '@/ai/flows/emotional-support-chat';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChatMessage } from './ChatMessage';
import { SendHorizonal, Loader2, Mic, Square } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import React, { useState, useEffect, useRef, useCallback } from 'react';

const CHAT_HISTORY_KEY = 'empathia_ai_chat_history';

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
  const { language, t } = useLanguage();

  const [isRecording, setIsRecording] = useState(false);
  const [speechApiSupported, setSpeechApiSupported] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const animationFrameIdRef = useRef<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);

  const [animatingMessageId, setAnimatingMessageId] = useState<string | null>(null);
  
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
      const welcomeMsgId = 'ai-welcome';
      setMessages([
        {
          id: welcomeMsgId,
          role: 'assistant',
          content: t(translations.welcomeMessage),
          timestamp: new Date(),
        },
      ]);
      // Optionally animate the welcome message too, though user asked for AI "responses"
      // setAnimatingMessageId(welcomeMsgId); 
    }
  }, [t]); // Ensure t is a dependency if translations change with language

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

  useEffect(() => {
    if (animatingMessageId) {
      const timer = setTimeout(() => {
        setAnimatingMessageId(null);
      }, 700); // Adjusted from 500ms to 700ms
      return () => clearTimeout(timer);
    }
  }, [animatingMessageId]);

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

      const requestBody = {
        input: {
          message: newUserMessage.content,
          chatHistory: chatHistoryForAI,
          language: language,
        }
      };

      const response = await fetch('/api/genkit/emotionalSupportChatFlow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const aiResponse = await response.json();

      const newAiMessage: ChatMessageType = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: aiResponse.response, 
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, newAiMessage]);
      setAnimatingMessageId(newAiMessage.id); // Trigger animation for this new AI message
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
      setAnimatingMessageId(errorAiMessage.id); // Also animate error messages from AI
    } finally {
      setIsLoading(false);
    }
  };

  const drawVisualizer = useCallback(() => {
    if (!analyserRef.current || !canvasRef.current || !dataArrayRef.current || !isRecording) {
      if (animationFrameIdRef.current) cancelAnimationFrame(animationFrameIdRef.current);
      return;
    }
    animationFrameIdRef.current = requestAnimationFrame(drawVisualizer);

    const canvas = canvasRef.current;
    const canvasCtx = canvas.getContext('2d');
    if (!canvasCtx) return;

    analyserRef.current.getByteTimeDomainData(dataArrayRef.current);

    let bgColor = 'hsl(30 80% 97%)'; // Light mode card background
    let lineColor = 'hsl(20 85% 75%)'; // Light mode primary color
    
    if (document.documentElement.classList.contains('dark')) {
        bgColor = 'hsl(220 30% 18%)'; // Dark mode card background
        lineColor = 'hsl(200 80% 65%)'; // Dark mode primary color
    }
    
    canvasCtx.fillStyle = bgColor;
    canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

    canvasCtx.lineWidth = 2;
    canvasCtx.strokeStyle = lineColor;
    canvasCtx.beginPath();

    const bufferLength = analyserRef.current.frequencyBinCount;
    const sliceWidth = (canvas.width * 1.0) / bufferLength;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
      const v = dataArrayRef.current[i] / 128.0;
      const y = (v * canvas.height) / 2;

      if (i === 0) {
        canvasCtx.moveTo(x, y);
      } else {
        canvasCtx.lineTo(x, y);
      }
      x += sliceWidth;
    }

    canvasCtx.lineTo(canvas.width, canvas.height / 2);
    canvasCtx.stroke();
  }, [isRecording]);


  useEffect(() => {
    if (isRecording && canvasRef.current) {
      drawVisualizer();
    } else {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
        animationFrameIdRef.current = null;
      }
      const canvas = canvasRef.current;
      if (canvas) {
          const canvasCtx = canvas.getContext('2d');
          if (canvasCtx) {
            let bgColor = 'hsl(30 80% 97%)'; // Light mode card background
            if (document.documentElement.classList.contains('dark')) {
                bgColor = 'hsl(220 30% 18%)'; // Dark mode card background
            }
            canvasCtx.fillStyle = bgColor;
            canvasCtx.fillRect(0, 0, canvas.width, canvas.height);
          }
      }
    }
    // Cleanup function for audio context and media stream
    return () => {
        if (animationFrameIdRef.current) cancelAnimationFrame(animationFrameIdRef.current);
        mediaStreamRef.current?.getTracks().forEach(track => track.stop());
        if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
          audioContextRef.current.close().catch(console.error);
        }
    };
  }, [isRecording, drawVisualizer]);


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
      // Visualizer and audio context cleanup is handled by the useEffect [isRecording]
      return;
    }

    try {
      // Ensure previous audio context is closed before creating a new one
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
          await audioContextRef.current.close().catch(e => console.warn("Pre-close audio context error:", e));
      }
      audioContextRef.current = null;
      mediaStreamRef.current?.getTracks().forEach(track => track.stop()); // Stop previous tracks

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;
      
      const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognitionAPI();
      recognitionRef.current.continuous = false; 
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = language;

      audioContextRef.current = new AudioContext();
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 2048;
      const bufferLength = analyserRef.current.frequencyBinCount;
      dataArrayRef.current = new Uint8Array(bufferLength);
      
      sourceRef.current = audioContextRef.current.createMediaStreamSource(stream);
      sourceRef.current.connect(analyserRef.current);

      let finalTranscriptAccumulator = input; 

      recognitionRef.current.onstart = () => {
        setIsRecording(true);
        finalTranscriptAccumulator = input; 
      };

      recognitionRef.current.onresult = (event) => {
        let interimTranscript = '';
        let currentFinal = finalTranscriptAccumulator;
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            currentFinal += event.results[i][0].transcript + ' '; 
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }
        finalTranscriptAccumulator = currentFinal; 
        setInput(finalTranscriptAccumulator.trimStart() + interimTranscript);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        let errorMsg = t(translations.speechError);
        if (event.error === 'no-speech') errorMsg = t(translations.noSpeechDetected);
        else if (event.error === 'audio-capture') errorMsg = t(translations.audioCaptureError);
        else if (event.error === 'not-allowed') errorMsg = t(translations.micPermissionDenied);
        toast({ title: t(translations.errorTitle), description: errorMsg, variant: 'destructive' });
        // setIsRecording(false) is handled by onend
      };

      recognitionRef.current.onend = () => {
        setIsRecording(false); // This will trigger the useEffect for cleanup
        // sourceRef.current?.disconnect(); // Disconnected in useEffect
        // audioContextRef.current?.close(); // Closed in useEffect
        // mediaStreamRef.current?.getTracks().forEach(track => track.stop()); // Stopped in useEffect
        setInput(prev => finalTranscriptAccumulator.trim() || prev.trim());
      };
      
      recognitionRef.current.start();

    } catch (err) {
      console.error('Error requesting microphone permission or starting recognition:', err);
      toast({ title: t(translations.errorTitle), description: t(translations.micPermissionDenied), variant: 'destructive' });
      setIsRecording(false); // Ensure state is reset on error
      // Ensure cleanup on error as well
      mediaStreamRef.current?.getTracks().forEach(track => track.stop());
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close().catch(e => console.error("Error closing audio context on error:", e));
      }
      mediaStreamRef.current = null;
      audioContextRef.current = null;
    }
  }, [isRecording, speechApiSupported, language, t, toast, input]);


  return (
    <div className="flex flex-col h-[calc(100vh-120px)] md:h-[calc(100vh-80px)] max-h-[800px] bg-card rounded-lg shadow-xl border">
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((msg) => (
            <ChatMessage 
              key={msg.id} 
              message={msg} 
              isAnimating={msg.id === animatingMessageId && msg.role === 'assistant'}
            />
          ))}
        </div>
      </ScrollArea>
      <div className="border-t p-4 bg-background/50 rounded-b-lg">
        {isRecording && (
          <div className="mb-2 h-16 w-full rounded-md border bg-card/50 dark:bg-card/30 p-1 overflow-hidden">
            <canvas ref={canvasRef} width="600" height="60" className="h-full w-full object-contain"></canvas>
          </div>
        )}
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
            disabled={isLoading || isRecording}
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
