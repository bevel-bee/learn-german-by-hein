
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import ChatMessage from "@/components/ChatMessage";
import ChatHeader from "@/components/ChatHeader";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const Index = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user message to chat
    const userMessage = { role: 'user' as const, content: input };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // This is a mock API call - in a real app, this would connect to your backend
      // const response = await fetch("https://your-backend-url/chat", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ message: input })
      // });
      // const data = await response.json();

      // Mock response while we don't have a real backend
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockResponses = [
        "That's a great question! I'd be happy to help you learn German.",
        "In German, you would say: Hallo, wie geht es dir? (Hello, how are you?)",
        "Let me teach you a useful German phrase: 'Ich möchte Deutsch lernen' means 'I want to learn German'.",
        "In German grammar, remember that nouns are always capitalized, unlike in English."
      ];
      
      const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];
      const aiResponse = { role: 'assistant' as const, content: randomResponse };
      
      setMessages(prevMessages => [...prevMessages, aiResponse]);
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <ChatHeader />
      
      <div className="flex-1 overflow-y-auto px-4 py-4 md:px-8 lg:px-24 xl:px-32">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center space-y-3 max-w-md">
              <h2 className="text-2xl font-bold text-gray-700">Welcome to Learn German by Hein</h2>
              <p className="text-gray-500">
                Ask me anything about German language and I'll help you learn.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {messages.map((message, index) => (
              <ChatMessage 
                key={index}
                role={message.role}
                content={message.content}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>
      
      <div className="border-t bg-white p-4 md:p-6">
        <form onSubmit={handleSendMessage} className="max-w-3xl mx-auto flex space-x-2">
          <Input
            className="flex-1"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading || !input.trim()}>
            {isLoading ? "Sending..." : "Send"}
          </Button>
        </form>
        <div className="text-center mt-3">
          <p className="text-xs text-gray-400">
            Powered by Together AI • Qwen/Qwen3-235B-A22B-fp8-tput
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
