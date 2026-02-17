import { useState, useEffect } from 'react';
import { useBlinkAuth, useAgent, Agent } from '@blinkdotnew/react';
import { User, LogOut, Settings, Sparkles, UserCircle, Wand2, ShieldCheck } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from './ui/card';
import { Skeleton } from './ui/skeleton';
import { blink } from '../lib/blink';

const personaAgent = new Agent({
  model: 'google/gemini-3-flash',
  system: 'You are a creative persona generator. Based on a user email, suggest a unique AI identity, catchphrase, and description.',
});

export const Dashboard = () => {
  const { user, signOut } = useBlinkAuth();
  const [persona, setPersona] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePersona = async () => {
    if (!user?.email) return;
    setIsGenerating(true);
    try {
      const { object } = await blink.ai.generateObject({
        prompt: `Create an AI persona for a user with the email: ${user.email}. Make it creative and futuristic.`,
        schema: {
          type: "object",
          properties: {
            name: { type: "string" },
            title: { type: "string" },
            description: { type: "string" },
            catchphrase: { type: "string" },
            color: { type: "string" }
          },
          required: ["name", "title", "description", "catchphrase", "color"]
        }
      });
      setPersona(object);
    } catch (error) {
      console.error('Persona generation failed:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    generatePersona();
  }, [user]);

  return (
    <div className="min-h-screen bg-slate-50/50 p-6 sm:p-12 animate-in">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-xl">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">AI Identity</h1>
              <p className="text-sm text-muted-foreground">Manage your intelligent workspace</p>
            </div>
          </div>
          <Button variant="outline" onClick={signOut} className="gap-2 shadow-sm">
            <LogOut className="w-4 h-4" />
            Sign Out
          </Button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-1 border-none shadow-xl glass overflow-hidden">
            <div className="h-32 bg-gradient-to-br from-primary to-accent relative">
               <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-24 h-24 rounded-2xl bg-white p-1 shadow-lg overflow-hidden">
                {isGenerating ? (
                  <Skeleton className="w-full h-full rounded-xl" />
                ) : (
                  <div className="w-full h-full rounded-xl bg-slate-100 flex items-center justify-center">
                    <UserCircle className="w-12 h-12 text-slate-300" />
                  </div>
                )}
               </div>
            </div>
            <CardContent className="pt-16 pb-8 text-center space-y-4">
              {isGenerating ? (
                <div className="space-y-2">
                  <Skeleton className="h-6 w-3/4 mx-auto" />
                  <Skeleton className="h-4 w-1/2 mx-auto" />
                </div>
              ) : (
                <>
                  <div>
                    <h2 className="text-xl font-bold text-foreground">{persona?.name || 'Anonymous User'}</h2>
                    <p className="text-sm font-medium text-primary">{persona?.title || 'System Explorer'}</p>
                  </div>
                  <div className="py-2 px-4 rounded-full bg-slate-50 border border-slate-100 inline-block">
                    <p className="text-[10px] font-mono text-muted-foreground">{user?.email}</p>
                  </div>
                  <p className="text-sm text-muted-foreground italic">&ldquo;{persona?.catchphrase}&rdquo;</p>
                  <Button onClick={generatePersona} variant="ghost" size="sm" className="w-full mt-4 gap-2 text-xs">
                    <Wand2 className="w-3 h-3" />
                    Regenerate Persona
                  </Button>
                </>
              )}
            </CardContent>
          </Card>

          <div className="lg:col-span-2 space-y-8">
            <Card className="border-none shadow-lg glass p-8 space-y-6">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <ShieldCheck className="w-5 h-5 text-green-500" />
                <h3 className="font-semibold">Security Integrity</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { label: 'Auth Status', value: 'Verified', color: 'text-green-500' },
                  { label: 'Encryption', value: 'AES-256', color: 'text-primary' },
                  { label: 'AI Protection', value: 'Active', color: 'text-accent' },
                ].map((stat, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-white border border-slate-100 shadow-sm">
                    <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
                    <p className={`font-bold ${stat.color}`}>{stat.value}</p>
                  </div>
                ))}
              </div>
              <div className="space-y-4">
                <h4 className="text-sm font-semibold">AI Observations</h4>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {persona?.description || 'Synchronizing with your unique digital fingerprint. Our AI models are analyzing your interaction patterns to optimize your experience.'}
                </p>
              </div>
            </Card>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <Card className="border-none shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer bg-white">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-indigo-50 rounded-xl text-indigo-600">
                    <Settings className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">System Tuning</h4>
                    <p className="text-xs text-muted-foreground">Adjust AI sensitivity</p>
                  </div>
                </div>
               </Card>
               <Card className="border-none shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer bg-white">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-pink-50 rounded-xl text-pink-600">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">User Analytics</h4>
                    <p className="text-xs text-muted-foreground">View behavior insights</p>
                  </div>
                </div>
               </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
