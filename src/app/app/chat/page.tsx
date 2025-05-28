import { ChatInterface } from '@/components/chat/ChatInterface';

export default function ChatPage() {
  return (
    <div className="container mx-auto max-w-3xl py-4">
        <h1 className="text-3xl font-bold mb-6 text-center text-foreground">
            Chat with Sereno AI
        </h1>
        <p className="text-muted-foreground text-center mb-8">
            Share your thoughts and feelings. Sereno is here to listen and support you.
        </p>
      <ChatInterface />
    </div>
  );
}
