
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
import { useLanguage } from '@/contexts/LanguageContext';

const CHAT_HISTORY_KEY = 'sereno_ai_chat_history'; // Keeping key for compatibility if users have old data
const SENTIMENT_HISTORY_KEY = 'empathia_ai_sentiment_history'; // New key for new name

export function SentimentAnalyzer() {
  const [analysisResult, setAnalysisResult] = useState<SentimentResult | null>(null);
  const [analysisHistory, setAnalysisHistory] = useState<SentimentResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [chatSummaryForDisplay, setChatSummaryForDisplay] = useState<string>("");
  const { toast } = useToast();
  const { t } = useLanguage();

  const translations = {
    noChatHistoryTitle: { es: 'No Hay Historial de Chat', en: 'No Chat History' },
    noChatHistoryDesc: { es: 'Por favor, chatea con Empathia primero para analizar el sentimiento.', en: 'Please chat with Empathia first to analyze sentiment.' },
    emptyChatHistoryTitle: { es: 'Historial de Chat Vacío', en: 'Empty Chat History' },
    emptyChatHistoryDesc: { es: 'Tu historial de chat está vacío. Por favor, chatea con Empathia primero.', en: 'Your chat history is empty. Please chat with Empathia first.' },
    analysisCompleteTitle: { es: 'Sentimiento Analizado', en: 'Sentiment Analyzed' },
    analysisCompleteDesc: { es: 'Se analizó con éxito el sentimiento del chat.', en: 'Chat sentiment analyzed successfully.' },
    analysisErrorTitle: { es: 'Error de Análisis', en: 'Analysis Error' },
    analysisErrorDesc: { es: 'No se pudo analizar el sentimiento. Por favor, inténtalo de nuevo.', en: 'Could not analyze sentiment. Please try again.' },
    historyClearedTitle: { es: 'Historial Borrado', en: 'History Cleared' },
    historyClearedDesc: { es: 'Tu historial de análisis de sentimiento ha sido borrado.', en: 'Your sentiment analysis history has been cleared.' },
    currentAnalysisTitle: { es: 'Análisis de Sentimiento Actual', en: 'Current Sentiment Analysis' },
    currentAnalysisDesc: { es: 'Analiza el sentimiento de tu conversación reciente con Empathia. Presiona el botón de abajo para comenzar.', en: 'Analyze the sentiment of your recent conversation with Empathia. Press the button below to begin.' },
    analyzing: { es: 'Analizando...', en: 'Analyzing...' },
    analysisOfChat: { es: 'Análisis de chat', en: 'Analysis of chat' },
    overallSentiment: { es: 'Sentimiento General', en: 'Overall Sentiment' },
    keyTopics: { es: 'Temas Clave', en: 'Key Topics' },
    emotionalStateSummary: { es: 'Resumen del Estado Emocional', en: 'Emotional State Summary' },
    noAnalysisYet: { es: 'Aún no se ha realizado ningún análisis para la sesión actual o no se ha seleccionado ningún elemento del historial. Haz clic en "Analizar Chat Actual" para comenzar.', en: 'No analysis has been performed for the current session yet, or no item selected from history. Click "Analyze Current Chat" to begin.' },
    analyzeCurrentChat: { es: 'Analizar Chat Actual', en: 'Analyze Current Chat' },
    analysisHistoryTitle: { es: 'Historial de Análisis', en: 'Analysis History' },
    clearHistory: { es: 'Borrar Historial', en: 'Clear History' },
    confirmClearTitle: { es: '¿Estás seguro/a?', en: 'Are you sure?' },
    confirmClearDesc: { es: 'Esta acción no se puede deshacer. Esto eliminará permanentemente tu historial de análisis de sentimiento.', en: 'This action cannot be undone. This will permanently delete your sentiment analysis history.' },
    cancel: { es: 'Cancelar', en: 'Cancel' },
    continue: { es: 'Continuar', en: 'Continue' },
    viewPastAnalysis: { es: 'Visualiza tus análisis de sentimiento pasados. Haz clic en un elemento para ver los detalles.', en: 'View your past sentiment analyses. Click on an item to see details.' },
    chatLabel: { es: 'Chat', en: 'Chat' }
  };

  useEffect(() => {
    const storedSentimentHistory = localStorage.getItem(SENTIMENT_HISTORY_KEY);
    if (storedSentimentHistory) {
      setAnalysisHistory(JSON.parse(storedSentimentHistory));
    }
  }, []);

  const saveAnalysisToHistory = (result: SentimentResult) => {
    const updatedHistory = [result, ...analysisHistory.slice(0, 9)]; 
    setAnalysisHistory(updatedHistory);
    localStorage.setItem(SENTIMENT_HISTORY_KEY, JSON.stringify(updatedHistory));
  };

  const handleAnalyzeSentiment = async () => {
    setIsLoading(true);
    setAnalysisResult(null); 

    const storedChatHistory = localStorage.getItem(CHAT_HISTORY_KEY);
    if (!storedChatHistory) {
      toast({
        title: t(translations.noChatHistoryTitle),
        description: t(translations.noChatHistoryDesc),
        variant: 'destructive',
      });
      setIsLoading(false);
      return;
    }

    const chatMessages: ChatMessage[] = JSON.parse(storedChatHistory);
    if (chatMessages.length === 0) {
        toast({
            title: t(translations.emptyChatHistoryTitle),
            description: t(translations.emptyChatHistoryDesc),
            variant: 'destructive',
        });
        setIsLoading(false);
        return;
    }

    const fullChatText = chatMessages.map(msg => `${msg.role}: ${msg.content}`).join('\n');
    const summary = chatMessages.length > 1 
        ? `${t({es: 'De', en: 'From'})}: "${chatMessages[0].content.substring(0,50)}..." ${t({es: 'a', en: 'to'})} "${chatMessages[chatMessages.length - 1].content.substring(0,50)}..."`
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
        title: t(translations.analysisCompleteTitle),
        description: t(translations.analysisCompleteDesc),
      });
    } catch (error) {
      console.error('Error al analizar sentimiento:', error);
      toast({
        title: t(translations.analysisErrorTitle),
        description: t(translations.analysisErrorDesc),
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const clearAnalysisHistory = () => {
    setAnalysisHistory([]);
    localStorage.removeItem(SENTIMENT_HISTORY_KEY);
    setAnalysisResult(null); 
    toast({
      title: t(translations.historyClearedTitle),
      description: t(translations.historyClearedDesc),
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
            {t(translations.currentAnalysisTitle)}
          </CardTitle>
          <CardDescription>
            {t(translations.currentAnalysisDesc)}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isLoading && (
            <div className="flex items-center justify-center p-6">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="ml-2 text-muted-foreground">{t(translations.analyzing)}</p>
            </div>
          )}
          {!isLoading && analysisResult && (
            <div className="space-y-3 p-4 bg-secondary/30 rounded-lg">
              <p className="text-sm text-muted-foreground">
                {t(translations.analysisOfChat)} ({new Date(analysisResult.timestamp).toLocaleString(language)}): <span className="italic">{chatSummaryForDisplay}</span>
              </p>
              <h3 className="text-xl font-semibold">
                {t(translations.overallSentiment)}: <span className={getSentimentColor(analysisResult.sentimentScore)}>{analysisResult.sentimentLabel} ({analysisResult.sentimentScore.toFixed(2)})</span>
              </h3>
              <div>
                <h4 className="font-medium">{t(translations.keyTopics)}:</h4>
                <p className="text-muted-foreground">{analysisResult.keyTopics}</p>
              </div>
              <div>
                <h4 className="font-medium">{t(translations.emotionalStateSummary)}:</h4>
                <p className="text-muted-foreground">{analysisResult.summary}</p>
              </div>
            </div>
          )}
          {!isLoading && !analysisResult && (
            <p className="text-center text-muted-foreground py-4">
              {t(translations.noAnalysisYet)}
            </p>
          )}
        </CardContent>
        <CardFooter>
          <Button onClick={handleAnalyzeSentiment} disabled={isLoading} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> {t(translations.analyzing)}
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" /> {t(translations.analyzeCurrentChat)}
              </>
            )}
          </Button>
        </CardFooter>
      </Card>

      {analysisHistory.length > 0 && (
        <Card className="shadow-lg rounded-xl">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl">{t(translations.analysisHistoryTitle)}</CardTitle>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size="sm">
                    <Trash2 className="mr-2 h-4 w-4" /> {t(translations.clearHistory)}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>{t(translations.confirmClearTitle)}</AlertDialogTitle>
                    <AlertDialogDescription>
                      {t(translations.confirmClearDesc)}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>{t(translations.cancel)}</AlertDialogCancel>
                    <AlertDialogAction onClick={clearAnalysisHistory}>
                      {t(translations.continue)}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
            <CardDescription>{t(translations.viewPastAnalysis)}</CardDescription>
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
                        <span className="text-xs text-muted-foreground">{new Date(item.timestamp).toLocaleDateString(language)} {new Date(item.timestamp).toLocaleTimeString(language)}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 italic truncate" title={item.chatHistorySummary}>
                        {t(translations.chatLabel)}: {item.chatHistorySummary}
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
