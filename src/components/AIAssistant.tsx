import { useState, useEffect } from 'react';
import { useAgent, useBlinkAuth, Agent } from '@blinkdotnew/react';
import { MessageCircle, X, Send, User, Bot, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { Input } from './ui/input';
import { blink } from '../lib/blink';

/**
 * supportAgent
 * 
 * Defines the AI agent's configuration, including the model and system instructions.
 * The agent is tailored to assist users within the Identity Lite context.
 */
const supportAgent = new Agent({
  model: 'google/gemini-3-flash',
  system: `You are a helpful AI assistant for the React Login Lite application.
Help users with login issues, password security questions, and app navigation.
Be friendly, concise, and professional.`,
});

/**
 * AIAssistant Component
 * 
 * A floating chat assistant that provides real-time support to authenticated users.
 * Leverages the useAgent hook for managing message history and AI interactions.
 */
export const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated } = useBlinkAuth();
  
  // Initialize the agentic chat interface
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useAgent({
    agent: supportAgent,
  });

  // Only render the assistant if the user is logged in
  if (!isAuthenticated) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen ? (
        /* Floating Toggle Button */
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-14 h-14 shadow-glow bg-primary hover:bg-primary/90 transition-all duration-300 scale-100 hover:scale-110"
        >
          <Sparkles className="w-6 h-6 text-white animate-pulse" />
        </Button>
      ) : (
        /* Expanded Chat Interface */
        <Card className="w-80 sm:w-96 h-[500px] flex flex-col glass animate-in overflow-hidden border-primary/20 shadow-2xl rounded-[2rem]">
          {/* Header */}
          <div className="p-5 bg-gradient-to-r from-primary to-accent text-white flex items-center justify-between shadow-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm pointer-events-none" />
            <div className="flex items-center gap-3 relative z-10">
              <div className="p-2 bg-white/20 rounded-xl">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="block font-black text-xs tracking-tighter uppercase">Neural Support</span>
                <span className="block text-[9px] font-bold text-white/70 uppercase tracking-widest">Assistant Online</span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 text-white rounded-full h-9 w-9 relative z-10 transition-all active:scale-90"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Message List Area */}
          <ScrollArea className="flex-1 p-5 space-y-6 bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-xl">
            {messages.length === 0 && (
              /* Empty State Message */
              <div className="text-center text-muted-foreground mt-24">
                <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-primary/10">
                  <Sparkles className="w-8 h-8 text-primary/30 animate-pulse" />
                </div>
                <h3 className="text-sm font-black text-foreground uppercase tracking-tight mb-1">Quantum Interface Active</h3>
                <p className="text-[10px] font-medium opacity-60">I'm ready to assist with your neural onboarding.</p>
              </div>
            )}
            {messages.map((m) => (
              /* Chat Bubbles */
              <div
                key={m.id}
                className={`flex gap-3 mb-4 ${
                  m.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                }`}
              >
                <div className={`p-1.5 rounded-xl h-9 w-9 flex items-center justify-center shrink-0 shadow-sm border ${
                  m.role === 'user' ? 'bg-primary text-white border-primary/20' : 'bg-white dark:bg-slate-800 border-border/50 text-accent'
                }`}>
                  {m.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                </div>
                <div
                  className={`p-4 rounded-2xl text-[13px] font-medium max-w-[85%] shadow-sm leading-relaxed ${
                    m.role === 'user'
                      ? 'bg-primary text-white rounded-tr-none'
                      : 'bg-white dark:bg-slate-800 border border-border/50 text-foreground rounded-tl-none'
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {isLoading && (
              /* AI Typing Indicator */
              <div className="flex gap-3 mb-4">
                <div className="p-1.5 rounded-xl h-9 w-9 bg-white dark:bg-slate-800 border border-border/50 text-accent flex items-center justify-center shadow-sm">
                  <Bot className="w-5 h-5" />
                </div>
                <div className="bg-white dark:bg-slate-800 border border-border/50 p-4 rounded-2xl rounded-tl-none shadow-sm flex gap-1 text-[13px] font-medium leading-relaxed">
                  <div className="w-1.5 h-1.5 bg-accent/40 rounded-full animate-bounce" />
                  <div className="w-1.5 h-1.5 bg-accent/40 rounded-full animate-bounce delay-100" />
                  <div className="w-1.5 h-1.5 bg-accent/40 rounded-full animate-bounce delay-200" />
                </div>
              </div>
            )}
          </ScrollArea>

          {/* Input Area */}
          <form
            onSubmit={handleSubmit}
            className="p-5 border-t border-border/50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl flex gap-3"
          >
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Query neural network..."
              className="flex-1 bg-white/50 dark:bg-white/5 border-border/50 focus:border-primary/50 text-xs h-12 rounded-2xl px-5 font-medium shadow-sm transition-all focus:bg-white"
              disabled={isLoading}
            />
            <Button
              type="submit"
              size="icon"
              disabled={isLoading || !input.trim()}
              className="h-12 w-12 shrink-0 shadow-lg rounded-2xl bg-primary hover:bg-primary/90 transition-all active:scale-95"
            >
              <Send className="w-5 h-5" />
            </Button>
          </form>
        </Card>
      )}
    </div>
  );
};
