import { useState, useEffect } from "react";
import { useBlinkAuth } from "@blinkdotnew/react";
import { Mail, Lock, Sparkles, Chrome, Apple, ArrowRight, Loader2, UserPlus, Fingerprint, Globe } from "lucide-react";
import { blink } from "./lib/blink";
import { PasswordIntelligence } from "./components/PasswordIntelligence";
import { AIAssistant } from "./components/AIAssistant";
import { Dashboard } from "./components/Dashboard";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Card } from "./components/ui/card";
import { toast } from "sonner";
import { isValidDomain } from "./lib/utils";

const App = () => {
  const { isAuthenticated, isLoading: authLoading, user } = useBlinkAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [domain, setDomain] = useState("");
  const [domainError, setDomainError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  if (authLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  if (isAuthenticated) {
    return (
      <>
        <Dashboard />
        <AIAssistant />
      </>
    );
  }

  const handleAuth = async (e) => {
    e.preventDefault();
    if (!email || !password) return;
    
    if (domain && !isValidDomain(domain)) {
      setDomainError("Invalid workspace domain format");
      return;
    } else {
      setDomainError("");
    }
    
    setIsSubmitting(true);
    try {
      if (isSignUp) {
        await blink.auth.signUp({ email, password });
        toast.success("Account created successfully!");
      } else {
        await blink.auth.signInWithEmail(email, password);
        toast.success("Welcome back!");
      }
    } catch (error) {
      toast.error(error.message || "Authentication failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSocialLogin = (provider) => {
    try {
      if (provider === 'google') blink.auth.signInWithGoogle();
      if (provider === 'apple') blink.auth.signInWithApple();
    } catch (error) {
      toast.error(`Social login failed: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-background relative overflow-hidden selection:bg-primary/20">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/20 rounded-full blur-[120px] animate-pulse delay-1000" />
        <div className="absolute top-[30%] left-[60%] w-[30%] h-[30%] bg-indigo-500/10 rounded-full blur-[100px] animate-bounce duration-[10s]" />
      </div>

      <div className="w-full max-w-md relative z-10 animate-in">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-[0.2em] mb-6 border border-primary/20 shadow-sm backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5" />
            Next-Gen AI Security
          </div>
          <h1 className="text-5xl font-black tracking-tight text-foreground mb-4">
            Identity <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent italic">Lite</span>
          </h1>
          <p className="text-muted-foreground text-sm font-medium max-w-[280px] mx-auto leading-relaxed">
            Experience the fusion of artificial intelligence and ultra-secure authentication.
          </p>
        </div>

        <div className="glass-card p-10 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] animate-border-beam opacity-50" />
          
          <div className="space-y-8">
            <div className="grid grid-cols-2 gap-4">
              <Button 
                variant="outline" 
                onClick={() => handleSocialLogin('google')}
                className="h-14 gap-3 bg-white/40 dark:bg-white/5 border-white/50 hover:bg-white dark:hover:bg-white/10 hover:border-primary/50 transition-all duration-500 rounded-2xl shadow-sm group"
              >
                <Chrome className="w-5 h-5 text-rose-500 group-hover:rotate-12 transition-transform" />
                <span className="text-xs font-bold tracking-tight">Google</span>
              </Button>
              <Button 
                variant="outline"
                onClick={() => handleSocialLogin('apple')}
                className="h-14 gap-3 bg-white/40 dark:bg-white/5 border-white/50 hover:bg-white dark:hover:bg-white/10 hover:border-primary/50 transition-all duration-500 rounded-2xl shadow-sm group"
              >
                <Apple className="w-5 h-5 group-hover:-rotate-12 transition-transform" />
                <span className="text-xs font-bold tracking-tight">Apple</span>
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-muted-foreground/10" />
              </div>
              <div className="relative flex justify-center text-[10px] uppercase tracking-widest">
                <span className="bg-transparent px-4 text-muted-foreground/60 font-bold backdrop-blur-sm">Neural Engine Auth</span>
              </div>
            </div>

            <form onSubmit={handleAuth} className="space-y-6">
              <div className="space-y-4">
                <div className="relative group">
                  <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
                  <Input
                    type="text"
                    placeholder="Workspace Domain (optional)"
                    value={domain}
                    onChange={(e) => {
                      setDomain(e.target.value);
                      if (domainError) setDomainError("");
                    }}
                    className={`pl-12 h-14 bg-white/40 dark:bg-white/5 border-white/40 focus:bg-white dark:focus:bg-white/10 focus:ring-primary/20 transition-all rounded-2xl text-sm font-medium ${domainError ? 'border-destructive/50 ring-destructive/20' : ''}`}
                  />
                  {domainError && <p className="text-[10px] text-destructive font-bold mt-1.5 ml-4 uppercase tracking-wider">{domainError}</p>}
                </div>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
                  <Input
                    type="email"
                    placeholder="Email Identifier"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-12 h-14 bg-white/40 dark:bg-white/5 border-white/40 focus:bg-white dark:focus:bg-white/10 focus:ring-primary/20 transition-all rounded-2xl text-sm font-medium"
                    required
                  />
                </div>
                <div className="space-y-3">
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
                    <Input
                      type="password"
                      placeholder="Access Key"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-12 h-14 bg-white/40 dark:bg-white/5 border-white/40 focus:bg-white dark:focus:bg-white/10 focus:ring-primary/20 transition-all rounded-2xl text-sm font-medium"
                      required
                    />
                  </div>
                  <PasswordIntelligence password={password} />
                </div>
              </div>

              {!isSignUp && (
                <div className="flex justify-end">
                  <button type="button" className="text-xs font-semibold text-primary hover:underline">
                    Forgot password?
                  </button>
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full h-14 rounded-2xl text-sm font-black tracking-wide shadow-glow hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 gap-2 bg-gradient-to-r from-primary to-accent border-none"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <Fingerprint className="w-5 h-5" />
                    {isSignUp ? "INITIALIZE IDENTITY" : "AUTHORIZE ACCESS"}
                    <ArrowRight className="w-5 h-5 ml-1" />
                  </>
                )}
              </Button>
            </form>

            <div className="text-center pt-2">
              <button 
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-[11px] font-bold text-muted-foreground hover:text-primary transition-colors flex items-center justify-center gap-1.5 mx-auto group"
              >
                {isSignUp ? (
                  <>Already registered? <span className="text-primary group-hover:underline">Sign in to profile</span></>
                ) : (
                  <>New to Identity Lite? <span className="text-primary group-hover:underline font-black">Begin onboarding</span> <UserPlus className="w-3.5 h-3.5" /></>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      <AIAssistant />
    </div>
  );
};

export default App;
