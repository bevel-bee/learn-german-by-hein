
import React from 'react';
import { MessageCircle } from 'lucide-react';

const ChatHeader: React.FC = () => {
  return (
    <header className="bg-white border-b shadow-sm py-4">
      <div className="container mx-auto px-4 flex items-center">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center mr-2">
            <MessageCircle size={18} className="text-white" />
          </div>
          <h1 className="text-xl font-bold">Together AI Chat</h1>
        </div>
        <div className="ml-auto text-sm text-gray-500">
          Powered by Qwen/Qwen3-235B
        </div>
      </div>
    </header>
  );
};

export default ChatHeader;
