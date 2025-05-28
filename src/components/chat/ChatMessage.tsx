
import type { ChatMessage as ChatMessageType } from '@/types';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  message: ChatMessageType;
  isAnimating?: boolean;
}

export function ChatMessage({ message, isAnimating }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <div
      className={cn(
        'flex items-start gap-3 py-3',
        isUser ? 'justify-end' : 'justify-start',
        isAnimating && 'animate-message-appear'
      )}
    >
      {!isUser && (
        <Avatar className="h-8 w-8 border border-primary/50">
          <AvatarFallback className="bg-primary/20 text-primary">
            <Bot size={20} />
          </AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          'max-w-[70%] rounded-xl px-4 py-3 shadow-md',
          isUser
            ? 'bg-primary text-primary-foreground rounded-br-none'
            : 'bg-card text-card-foreground rounded-bl-none border'
        )}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
        <p
          className={cn(
            'mt-1 text-xs',
            isUser ? 'text-primary-foreground/70 text-right' : 'text-muted-foreground text-left'
          )}
        >
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
      {isUser && (
         <Avatar className="h-8 w-8 border border-accent/50">
          <AvatarFallback className="bg-accent/20 text-accent">
            <User size={20} />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
