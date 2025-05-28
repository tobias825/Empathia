import { ChatInterface } from '@/components/chat/ChatInterface';

export default function ChatPage() {
  return (
    <div className="container mx-auto max-w-3xl py-4">
        <h1 className="text-3xl font-bold mb-6 text-center text-foreground">
            Chatea con Sereno AI
        </h1>
        <p className="text-muted-foreground text-center mb-8">
            Comparte tus pensamientos y sentimientos. Sereno está aquí para escucharte y apoyarte.
        </p>
      <ChatInterface />
    </div>
  );
}
