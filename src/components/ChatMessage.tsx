
import React from 'react';
import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ role, content }) => {
  const isUser = role === 'user';
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex ${isUser ? 'flex-row-reverse' : 'flex-row'} max-w-[80%] items-start gap-2`}>
        <Avatar className={`${isUser ? 'bg-blue-600' : 'bg-violet-600'} h-8 w-8`}>
          <span className="text-xs text-white font-semibold">
            {isUser ? 'U' : 'AI'}
          </span>
        </Avatar>
        <Card className={`p-3 ${isUser ? 'bg-blue-500 text-white' : 'bg-white'}`}>
          <p className="whitespace-pre-wrap">{content}</p>
        </Card>
      </div>
    </div>
  );
};

export default ChatMessage;
