
import {NextResponse} from 'next/server';
import {
  emotionalSupportChatFlow,
  type EmotionalSupportChatInput,
} from '@/ai/flows/emotional-support-chat';

export async function POST(req: Request) {
  try {
    const body: EmotionalSupportChatInput = await req.json();
    const result = await emotionalSupportChatFlow(body);
    return NextResponse.json(result);
  } catch (e: any) {
    console.error(e);
    return NextResponse.json({error: e.message || 'An unexpected error occurred.'}, {status: 500});
  }
}

    