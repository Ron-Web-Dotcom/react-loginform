import { useState, useEffect } from 'react';
import { useAgent, useBlinkAuth, Agent } from '@blinkdotnew/react';
import { MessageCircle, X, Send, User, Bot, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { Input } from './ui/input';
import { blink } from '../lib/blink';

const supportAgent = new Agent({
  model: 'google/gemini-3-flash',
  system: `You are a helpful AI assistant for the React Login Lite application.
Help users with login issues, password security questions, and app navigation.
Be friendly, concise, and professional.`,
});

export const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated } = useBlinkAuth();
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useAgent({
    agent: supportAgent,
  });

  if (!isAuthenticated) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen ? (
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-14 h-14 shadow-glow bg-primary hover:bg-primary/90 transition-all duration-300 scale-100 hover:scale-110"
        >
          <Sparkles className="w-6 h-6 text-white animate-pulse" />
        </Button>
      ) : (
        <Card className="w-80 sm:w-96 h-[500px] flex flex-col glass animate-in overflow-hidden border-primary/20 shadow-2xl">
          <div className="p-4 bg-primary text-white flex items-center justify-between shadow-md">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5" />
              <span className="font-semibold text-sm">AI Support</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 text-white rounded-full h-8 w-8"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          <ScrollArea className="flex-1 p-4 space-y-4">
            {messages.length === 0 && (
              <div className="text-center text-muted-foreground mt-20">
                <Sparkles className="w-8 h-8 mx-auto mb-2 opacity-20" />
                <p className="text-sm">How can I help you today?</p>
              </div>
            )}
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-3 mb-4 ${
                  m.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                }`}
              >
                <div className={`p-1 rounded-full h-8 w-8 flex items-center justify-center shrink-0 ${
                  m.role === 'user' ? 'bg-primary/10' : 'bg-accent/10'
                }`}>
                  {m.role === 'user' ? <User className="w-4 h-4 text-primary" /> : <Bot className="w-4 h-4 text-accent" />}
                </div>
                <div
                  className={`p-3 rounded-2xl text-sm max-w-[80%] shadow-sm ${
                    m.role === 'user'
                      ? 'bg-primary text-white rounded-tr-none'
                      : 'bg-white border border-border/50 text-foreground rounded-tl-none'
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3 mb-4">
                <div className="p-1 rounded-full h-8 w-8 bg-accent/10 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-accent" />
                </div>
                <div className="bg-white border border-border/50 p-3 rounded-2xl rounded-tl-none shadow-sm flex gap-1">
                  <div className="w-1.5 h-1.5 bg-accent/40 rounded-full animate-bounce" />
                  <div className="w-1.5 h-1.5 bg-accent/40 rounded-full animate-bounce delay-100" />
                  <div className="w-1.5 h-1.5 bg-accent/40 rounded-full animate-bounce delay-200" />
                </div>
              </div>
            )}
          </ScrollArea>

          <form
            onSubmit={handleSubmit}
            className="p-4 border-t border-border/50 bg-white/50 flex gap-2"
          >
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Ask anything..."
              className="flex-1 bg-white border-border/50 focus:border-primary/50 text-sm h-10"
              disabled={isLoading}
            />
            <Button
              type="submit"
              size="icon"
              disabled={isLoading || !input.trim()}
              className="h-10 w-10 shrink-0 shadow-sm"
            >
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </Card>
      )}
    </div>
  );
};
