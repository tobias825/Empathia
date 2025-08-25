
import {NextResponse} from 'next/server';
import {
  analyzeSentimentFlow,
  type AnalyzeSentimentInput,
} from '@/ai/flows/sentiment-analysis';

export async function POST(req: Request) {
  try {
    const body: AnalyzeSentimentInput = await req.json();
    const result = await analyzeSentimentFlow(body);
    return NextResponse.json(result);
  } catch (e: any) {
    console.error(e);
    return NextResponse.json({error: e.message || 'An unexpected error occurred.'}, {status: 500});
  }
}

    