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
        title: 'No Chat History',
        description: 'Please chat with Sereno AI first to analyze sentiment.',
        variant: 'destructive',
      });
      setIsLoading(false);
      return;
    }

    const chatMessages: ChatMessage[] = JSON.parse(storedChatHistory);
    if (chatMessages.length === 0) {
        toast({
            title: 'Empty Chat History',
            description: 'Your chat history is empty. Please chat with Sereno AI first.',
            variant: 'destructive',
        });
        setIsLoading(false);
        return;
    }

    const fullChatText = chatMessages.map(msg => `${msg.role}: ${msg.content}`).join('\n');
    // Create a summary of chat for display (e.g. first and last message)
    const summary = chatMessages.length > 1 
        ? `From: "${chatMessages[0].content.substring(0,50)}..." to "${chatMessages[chatMessages.length - 1].content.substring(0,50)}..."`
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
        title: 'Sentiment Analyzed',
        description: 'Successfully analyzed chat sentiment.',
      });
    } catch (error) {
      console.error('Error analyzing sentiment:', error);
      toast({
        title: 'Analysis Error',
        description: 'Could not analyze sentiment. Please try again.',
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
      title: "History Cleared",
      description: "Your sentiment analysis history has been cleared.",
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
            Current Sentiment Analysis
          </CardTitle>
          <CardDescription>
            Analyze the sentiment of your recent conversation with Sereno AI. Press the button below to start.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isLoading && (
            <div className="flex items-center justify-center p-6">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="ml-2 text-muted-foreground">Analyzing...</p>
            </div>
          )}
          {!isLoading && analysisResult && (
            <div className="space-y-3 p-4 bg-secondary/30 rounded-lg">
              <p className="text-sm text-muted-foreground">
                Analysis of chat ({new Date(analysisResult.timestamp).toLocaleString()}): <span className="italic">{chatSummaryForDisplay}</span>
              </p>
              <h3 className="text-xl font-semibold">
                Overall Sentiment: <span className={getSentimentColor(analysisResult.sentimentScore)}>{analysisResult.sentimentLabel} ({analysisResult.sentimentScore.toFixed(2)})</span>
              </h3>
              <div>
                <h4 className="font-medium">Key Topics:</h4>
                <p className="text-muted-foreground">{analysisResult.keyTopics}</p>
              </div>
              <div>
                <h4 className="font-medium">Summary of Emotional State:</h4>
                <p className="text-muted-foreground">{analysisResult.summary}</p>
              </div>
            </div>
          )}
          {!isLoading && !analysisResult && (
            <p className="text-center text-muted-foreground py-4">
              No analysis performed yet for the current session, or no history item selected. Click "Analyze Current Chat" to begin.
            </p>
          )}
        </CardContent>
        <CardFooter>
          <Button onClick={handleAnalyzeSentiment} disabled={isLoading} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing...
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" /> Analyze Current Chat
              </>
            )}
          </Button>
        </CardFooter>
      </Card>

      {analysisHistory.length > 0 && (
        <Card className="shadow-lg rounded-xl">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl">Analysis History</CardTitle>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size="sm">
                    <Trash2 className="mr-2 h-4 w-4" /> Clear History
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete your sentiment analysis history.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={clearAnalysisHistory}>
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
            <CardDescription>View your past sentiment analyses. Click an item to see details.</CardDescription>
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
                        <span className="text-xs text-muted-foreground">{new Date(item.timestamp).toLocaleDateString()} {new Date(item.timestamp).toLocaleTimeString()}</span>
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
