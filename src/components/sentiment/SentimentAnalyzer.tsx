"use client";

import { useState, useEffect } from 'react';
import type { SentimentResult, ChatMessage } from '@/types';
import { analyzeSentiment } from '@/ai/flows/sentiment-analysis';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { Loader2, BarChart3, Trash2, RefreshCw } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const CHAT_HISTORY_KEY = 'sereno_ai_chat_history';
const SENTIMENT_HISTORY_KEY = 'sereno_ai_sentiment_history';

export function SentimentAnalyzer() {
  const [analysisResult, setAnalysisResult] = useState<SentimentResult | null>(null);
  const [analysisHistory, setAnalysisHistory] = useState<SentimentResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [chatSummaryForDisplay, setChatSummaryForDisplay] = useState<string>("");
  const { toast } = useToast();

  useEffect(() => {
    const storedSentimentHistory = localStorage.getItem(SENTIMENT_HISTORY_KEY);
    if (storedSentimentHistory) {
      setAnalysisHistory(JSON.parse(storedSentimentHistory));
    }
  }, []);

  const saveAnalysisToHistory = (result: SentimentResult) => {
    const updatedHistory = [result, ...analysisHistory.slice(0, 9)]; // Keep last 10 analyses
    setAnalysisHistory(updatedHistory);
    localStorage.setItem(SENTIMENT_HISTORY_KEY, JSON.stringify(updatedHistory));
  };

  const handleAnalyzeSentiment = async () => {
    setIsLoading(true);
    setAnalysisResult(null); // Clear previous result

    const storedChatHistory = localStorage.getItem(CHAT_HISTORY_KEY);
    if (!storedChatHistory) {
      toast({
        title: 'No Hay Historial de Chat',
        description: 'Por favor, chatea con Sereno AI primero para analizar el sentimiento.',
        variant: 'destructive',
      });
      setIsLoading(false);
      return;
    }

    const chatMessages: ChatMessage[] = JSON.parse(storedChatHistory);
    if (chatMessages.length === 0) {
        toast({
            title: 'Historial de Chat Vacío',
            description: 'Tu historial de chat está vacío. Por favor, chatea con Sereno AI primero.',
            variant: 'destructive',
        });
        setIsLoading(false);
        return;
    }

    const fullChatText = chatMessages.map(msg => `${msg.role}: ${msg.content}`).join('\n');
    // Create a summary of chat for display (e.g. first and last message)
    const summary = chatMessages.length > 1 
        ? `De: "${chatMessages[0].content.substring(0,50)}..." a "${chatMessages[chatMessages.length - 1].content.substring(0,50)}..."`
        : `"${chatMessages[0].content.substring(0,100)}..."`;
    setChatSummaryForDisplay(summary);


    try {
      const result = await analyzeSentiment({ chatHistory: fullChatText });
      const newAnalysis: SentimentResult = {
        id: `sentiment-${Date.now()}`,
        timestamp: new Date(),
        chatHistorySummary: summary,
        ...result,
      };
      setAnalysisResult(newAnalysis);
      saveAnalysisToHistory(newAnalysis);
      toast({
        title: 'Sentimiento Analizado',
        description: 'Se analizó con éxito el sentimiento del chat.',
      });
    } catch (error) {
      console.error('Error al analizar sentimiento:', error);
      toast({
        title: 'Error de Análisis',
        description: 'No se pudo analizar el sentimiento. Por favor, inténtalo de nuevo.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const clearAnalysisHistory = () => {
    setAnalysisHistory([]);
    localStorage.removeItem(SENTIMENT_HISTORY_KEY);
    setAnalysisResult(null); // Also clear current display if it's from history
    toast({
      title: "Historial Borrado",
      description: "Tu historial de análisis de sentimiento ha sido borrado.",
    });
  };
  
  const loadAnalysisFromHistory = (result: SentimentResult) => {
    setAnalysisResult(result);
    setChatSummaryForDisplay(result.chatHistorySummary);
  };


  const getSentimentColor = (score: number) => {
    if (score > 0.3) return 'text-green-600';
    if (score < -0.3) return 'text-red-600';
    return 'text-yellow-600';
  };


  return (
    <div className="space-y-6">
      <Card className="shadow-lg rounded-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <BarChart3 className="text-primary" />
            Análisis de Sentimiento Actual
          </CardTitle>
          <CardDescription>
            Analiza el sentimiento de tu conversación reciente con Sereno AI. Presiona el botón de abajo para comenzar.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isLoading && (
            <div className="flex items-center justify-center p-6">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="ml-2 text-muted-foreground">Analizando...</p>
            </div>
          )}
          {!isLoading && analysisResult && (
            <div className="space-y-3 p-4 bg-secondary/30 rounded-lg">
              <p className="text-sm text-muted-foreground">
                Análisis de chat ({new Date(analysisResult.timestamp).toLocaleString('es')}): <span className="italic">{chatSummaryForDisplay}</span>
              </p>
              <h3 className="text-xl font-semibold">
                Sentimiento General: <span className={getSentimentColor(analysisResult.sentimentScore)}>{analysisResult.sentimentLabel} ({analysisResult.sentimentScore.toFixed(2)})</span>
              </h3>
              <div>
                <h4 className="font-medium">Temas Clave:</h4>
                <p className="text-muted-foreground">{analysisResult.keyTopics}</p>
              </div>
              <div>
                <h4 className="font-medium">Resumen del Estado Emocional:</h4>
                <p className="text-muted-foreground">{analysisResult.summary}</p>
              </div>
            </div>
          )}
          {!isLoading && !analysisResult && (
            <p className="text-center text-muted-foreground py-4">
              Aún no se ha realizado ningún análisis para la sesión actual o no se ha seleccionado ningún elemento del historial. Haz clic en "Analizar Chat Actual" para comenzar.
            </p>
          )}
        </CardContent>
        <CardFooter>
          <Button onClick={handleAnalyzeSentiment} disabled={isLoading} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analizando...
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" /> Analizar Chat Actual
              </>
            )}
          </Button>
        </CardFooter>
      </Card>

      {analysisHistory.length > 0 && (
        <Card className="shadow-lg rounded-xl">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl">Historial de Análisis</CardTitle>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size="sm">
                    <Trash2 className="mr-2 h-4 w-4" /> Borrar Historial
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>¿Estás seguro/a?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Esta acción no se puede deshacer. Esto eliminará permanentemente tu historial de análisis de sentimiento.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={clearAnalysisHistory}>
                      Continuar
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
            <CardDescription>Visualiza tus análisis de sentimiento pasados. Haz clic en un elemento para ver los detalles.</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px] pr-3">
              <ul className="space-y-3">
                {analysisHistory.map((item) => (
                  <li key={item.id}
                      onClick={() => loadAnalysisFromHistory(item)}
                      className="p-3 border rounded-lg hover:bg-accent/50 cursor-pointer transition-colors"
                  >
                    <div className="flex justify-between items-center">
                        <span className={`font-semibold ${getSentimentColor(item.sentimentScore)}`}>{item.sentimentLabel} ({item.sentimentScore.toFixed(2)})</span>
                        <span className="text-xs text-muted-foreground">{new Date(item.timestamp).toLocaleDateString('es')} {new Date(item.timestamp).toLocaleTimeString('es')}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 italic truncate" title={item.chatHistorySummary}>
                        Chat: {item.chatHistorySummary}
                    </p>
                  </li>
                ))}
              </ul>
            </ScrollArea>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
