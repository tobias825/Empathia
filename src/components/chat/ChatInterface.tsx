
"use client";

import type { ChatMessage as ChatMessageType } from '@/types';
import { emotionalSupportChat, type EmotionalSupportChatInput } from '@/ai/flows/emotional-support-chat';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChatMessage } from './ChatMessage';
import { SendHorizonal, Loader2, Mic, Square } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import React, { useState, useEffect, useRef, useCallback } from 'react';

const CHAT_HISTORY_KEY = 'sereno_ai_chat_history';

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

  // Refs for audio visualizer
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const animationFrameIdRef = useRef<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);


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
  }, [t]);

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

    let bgColor = 'hsl(30 80% 97%)'; // Default light card
    let lineColor = 'hsl(20 85% 75%)'; // Default light primary
    if (document.documentElement.classList.contains('dark')) {
        bgColor = 'hsl(25 15% 12%)'; // Default dark card
        lineColor = 'hsl(20 70% 60%)'; // Default dark primary
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
            let bgColor = 'hsl(30 80% 97%)';
            if (document.documentElement.classList.contains('dark')) {
                bgColor = 'hsl(25 15% 12%)';
            }
            canvasCtx.fillStyle = bgColor;
            canvasCtx.fillRect(0, 0, canvas.width, canvas.height);
          }
      }
    }
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
      recognitionRef.current.stop(); // This will trigger onend where cleanup happens
      return;
    }

    try {
      // Ensure existing stream/context are cleaned up if any remained unexpectedly
      mediaStreamRef.current?.getTracks().forEach(track => track.stop());
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
          await audioContextRef.current.close().catch(e => console.warn("Pre-close audio context error:", e));
      }
      audioContextRef.current = null; // Reset for new setup

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
        finalTranscriptAccumulator = currentFinal; // Persist final part
        setInput(finalTranscriptAccumulator.trimStart() + interimTranscript);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        let errorMsg = t(translations.speechError);
        if (event.error === 'no-speech') errorMsg = t(translations.noSpeechDetected);
        else if (event.error === 'audio-capture') errorMsg = t(translations.audioCaptureError);
        else if (event.error === 'not-allowed') errorMsg = t(translations.micPermissionDenied);
        toast({ title: t(translations.errorTitle), description: errorMsg, variant: 'destructive' });
        setIsRecording(false); 
      };

      recognitionRef.current.onend = () => {
        setIsRecording(false); 
        sourceRef.current?.disconnect();
        sourceRef.current = null;
        // analyserRef.current does not need disconnect if source is gone
        
        if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
            audioContextRef.current.close().catch(e => console.error("Error closing audio context:", e));
        }
        audioContextRef.current = null;
        
        mediaStreamRef.current?.getTracks().forEach(track => track.stop());
        mediaStreamRef.current = null;

        setInput(prev => finalTranscriptAccumulator.trim() || prev.trim());
      };
      
      recognitionRef.current.start();

    } catch (err) {
      console.error('Error requesting microphone permission or starting recognition:', err);
      toast({ title: t(translations.errorTitle), description: t(translations.micPermissionDenied), variant: 'destructive' });
      setIsRecording(false);
      mediaStreamRef.current?.getTracks().forEach(track => track.stop());
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close().catch(e => console.error("Error closing audio context on error:", e));
      }
      mediaStreamRef.current = null;
      audioContextRef.current = null;
    }
  }, [isRecording, speechApiSupported, language, t, toast, input, drawVisualizer]);


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

