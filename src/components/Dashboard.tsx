import { useState, useEffect } from 'react';
import { useBlinkAuth, useAgent, Agent } from '@blinkdotnew/react';
import { User, LogOut, Settings, Sparkles, UserCircle, Wand2, ShieldCheck, RefreshCw, Zap } from 'lucide-react';
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
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [isGeneratingAvatar, setIsGeneratingAvatar] = useState(false);

  const generateAvatar = async (personaName) => {
    if (!personaName) return;
    setIsGeneratingAvatar(true);
    try {
      const { data } = await blink.ai.generateImage({
        prompt: `A futuristic, high-tech AI avatar for a character named ${personaName}. Minimalist, sleek design, cinematic lighting, neon accents, highly detailed, 3D render style.`,
        model: 'fal-ai/nano-banana-pro',
        size: '1024x1024'
      });
      if (data?.[0]?.url) {
        setAvatarUrl(data[0].url);
      }
    } catch (error) {
      console.error('Avatar generation failed:', error);
    } finally {
      setIsGeneratingAvatar(false);
    }
  };

  const generatePersona = async () => {
    if (!user?.email) return;
    setIsGenerating(true);
    try {
      const { object } = await blink.ai.generateObject({
        prompt: `Create a unique AI persona for a user with the email: ${user.email}. Make it creative, futuristic, and tech-focused.`,
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
      await generateAvatar(object.name);
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
    <div className="min-h-screen bg-background p-6 sm:p-12 animate-in selection:bg-primary/20">
      <div className="max-w-6xl mx-auto space-y-10">
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-2xl shadow-sm border border-primary/20 backdrop-blur-sm">
              <Sparkles className="w-7 h-7 text-primary animate-pulse" />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tighter">AI Identity <span className="text-primary">Hub</span></h1>
              <p className="text-sm text-muted-foreground font-medium">Neural interface active • Session encrypted</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
             <Button variant="ghost" className="rounded-2xl h-12 px-6 font-bold text-xs gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </Button>
            <Button variant="outline" onClick={signOut} className="h-12 px-6 rounded-2xl gap-2 font-bold text-xs border-muted-foreground/20 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition-all">
              <LogOut className="w-4 h-4" />
              Terminate Session
            </Button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <Card className="lg:col-span-1 border-none shadow-2xl glass-card overflow-hidden group">
            <div className="h-40 bg-gradient-to-br from-primary via-accent to-primary bg-[length:200%_100%] animate-gradient relative">
               <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-32 h-32 rounded-[2rem] bg-background p-1.5 shadow-2xl overflow-hidden group-hover:scale-105 transition-transform duration-500">
                {isGenerating || isGeneratingAvatar ? (
                  <div className="w-full h-full rounded-[1.7rem] bg-slate-100 flex items-center justify-center relative overflow-hidden">
                    <Skeleton className="w-full h-full absolute inset-0" />
                    <RefreshCw className="w-8 h-8 text-primary animate-spin relative z-10" />
                  </div>
                ) : avatarUrl ? (
                  <img src={avatarUrl} alt="AI Avatar" className="w-full h-full rounded-[1.7rem] object-cover animate-in" />
                ) : (
                  <div className="w-full h-full rounded-[1.7rem] bg-slate-100 flex items-center justify-center">
                    <UserCircle className="w-16 h-16 text-slate-300" />
                  </div>
                )}
               </div>
            </div>
            <CardContent className="pt-20 pb-10 text-center space-y-6">
              {isGenerating ? (
                <div className="space-y-4 px-4">
                  <Skeleton className="h-8 w-3/4 mx-auto rounded-lg" />
                  <Skeleton className="h-4 w-1/2 mx-auto rounded-lg" />
                  <Skeleton className="h-12 w-full mx-auto rounded-xl" />
                </div>
              ) : (
                <div className="px-6 space-y-6">
                  <div>
                    <h2 className="text-2xl font-black text-foreground tracking-tight">{persona?.name || 'Authorized User'}</h2>
                    <p className="text-xs font-bold text-primary uppercase tracking-[0.2em] mt-1">{persona?.title || 'Identity Verified'}</p>
                  </div>
                  
                  <div className="py-2.5 px-5 rounded-2xl bg-primary/5 border border-primary/10 inline-flex items-center gap-2">
                    <Zap className="w-3.5 h-3.5 text-primary" />
                    <p className="text-[10px] font-black font-mono text-primary/80 tracking-wider uppercase">{user?.email}</p>
                  </div>

                  <div className="relative py-4">
                    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
                    <p className="text-sm text-muted-foreground italic leading-relaxed font-medium pt-4">
                      &ldquo;{persona?.catchphrase}&rdquo;
                    </p>
                    <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
                  </div>

                  <Button 
                    onClick={generatePersona} 
                    variant="outline" 
                    size="sm" 
                    className="w-full h-12 rounded-2xl gap-3 text-xs font-black tracking-tight border-primary/20 hover:bg-primary/5 hover:border-primary/40 transition-all group"
                    disabled={isGenerating || isGeneratingAvatar}
                  >
                    <Wand2 className="w-4 h-4 text-primary group-hover:rotate-12 transition-transform" />
                    REGENERATE NEURAL IDENTITY
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="lg:col-span-2 space-y-8">
            <Card className="border-none shadow-lg glass-card p-8 space-y-6">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <ShieldCheck className="w-5 h-5 text-green-500" />
                <h3 className="font-semibold text-lg">Security & Integrity Layer</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { label: 'Auth Status', value: 'Verified', color: 'text-green-500' },
                  { label: 'Encryption', value: 'AES-256', color: 'text-primary' },
                  { label: 'AI Protection', value: 'Active', color: 'text-accent' },
                ].map((stat, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-white border border-slate-100 shadow-sm backdrop-blur-sm">
                    <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
                    <p className={`font-bold ${stat.color}`}>{stat.value}</p>
                  </div>
                ))}
              </div>
              <div className="space-y-4">
                <h4 className="text-sm font-semibold">AI Core Directives</h4>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {persona?.description || 'Synchronizing with your unique digital fingerprint. Our AI models are analyzing your interaction patterns to optimize your experience and ensure seamless integration.'}
                </p>
              </div>
            </Card>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <Card className="border-none shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer bg-white glass-card">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-indigo-50 rounded-xl text-indigo-600 shadow-sm">
                    <Settings className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">System Tuning</h4>
                    <p className="text-xs text-muted-foreground">Adjust AI sensitivity and parameters</p>
                  </div>
                </div>
               </Card>
               <Card className="border-none shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer bg-white glass-card">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-pink-50 rounded-xl text-pink-600 shadow-sm">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">User Analytics</h4>
                    <p className="text-xs text-muted-foreground">View behavior insights and trends</p>
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
