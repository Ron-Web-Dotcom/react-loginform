import { useState, useEffect } from "react";
import { useBlinkAuth } from "@blinkdotnew/react";
import { Mail, Lock, Sparkles, ArrowRight, Loader2, UserPlus, Fingerprint } from "lucide-react";
import { blink } from "./lib/blink";
import { PasswordIntelligence } from "./components/PasswordIntelligence";
import { AIAssistant } from "./components/AIAssistant";
import { Dashboard } from "./components/Dashboard";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { toast } from "sonner";

/**
 * App Component
 * 
 * The main entry point for the authentication flow. It handles:
 * - Authentication state checking via useBlinkAuth
 * - Login/Signup form rendering and submission
 * - Layout orchestration between Auth, Dashboard, and AI Assistant
 */
const App = () => {
  const { isAuthenticated, isLoading: authLoading, user } = useBlinkAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  // Show loading spinner while authentication state is being determined
  if (authLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  // Redirect to Dashboard if already authenticated
  if (isAuthenticated) {
    return (
      <>
        <Dashboard />
        <AIAssistant />
      </>
    );
  }

  /**
   * handleAuth
   * 
   * Orchestrates the email/password authentication flow.
   * Supports both sign-up and sign-in based on the current mode.
   */
  const handleAuth = async (e) => {
    e.preventDefault();
    if (!email || !password) return;
    
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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-background relative overflow-hidden selection:bg-primary/20">
      {/* Dynamic Background Elements - Animated blur circles for visual depth */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/20 rounded-full blur-[120px] animate-pulse delay-1000" />
        <div className="absolute top-[30%] left-[60%] w-[30%] h-[30%] bg-indigo-500/10 rounded-full blur-[100px] animate-bounce duration-[10s]" />
      </div>

      <div className="w-full max-w-md relative z-10 animate-in">
        {/* Branding Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-[0.2em] mb-6 border border-primary/20 shadow-sm backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5" />
            Next-Gen AI Security
          </div>
          <h1 className="text-5xl font-black tracking-tight text-foreground mb-4">
            Identity <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent italic px-2">Lite</span>
          </h1>
          <p className="text-muted-foreground text-sm font-medium max-w-[280px] mx-auto leading-relaxed">
            Experience the fusion of artificial intelligence and ultra-secure authentication.
          </p>
        </div>

        {/* Auth Container Card */}
        <div className="glass-card p-10 relative overflow-hidden group">
          {/* Top border beam animation */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] animate-border-beam opacity-50" />
          
          <div className="space-y-8">
            <form onSubmit={handleAuth} className="space-y-6">
              <div className="space-y-4">
                {/* Email input field with icon */}
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
                {/* Password input field with icon and AI strength meter */}
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
                  {/* Dynamic password analysis component */}
                  <PasswordIntelligence password={password} />
                </div>
              </div>

              {!isSignUp && (
                <div className="flex justify-end">
                  <button type="button" className="text-xs font-semibold text-primary hover:underline transition-all">
                    Forgot password?
                  </button>
                </div>
              )}

              {/* Main action button */}
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

              {/* Divider for Social Login */}
              <div className="relative flex items-center gap-4 px-2">
                <div className="h-px w-full bg-border/40" />
                <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest whitespace-nowrap">Neural Bridge</span>
                <div className="h-px w-full bg-border/40" />
              </div>

              {/* Social Login Buttons */}
              <div className="grid grid-cols-2 gap-4">
                <Button 
                  type="button"
                  variant="outline"
                  onClick={() => blink.auth.signInWithGoogle()}
                  className="h-14 rounded-2xl bg-white/40 dark:bg-white/5 border-white/40 hover:bg-white/60 dark:hover:bg-white/10 transition-all flex items-center justify-center gap-3 font-bold text-xs"
                >
                  <img src="/google.svg" alt="Google" className="w-5 h-5" />
                  GOOGLE
                </Button>
                <Button 
                  type="button"
                  variant="outline"
                  onClick={() => blink.auth.signInWithApple()}
                  className="h-14 rounded-2xl bg-white/40 dark:bg-white/5 border-white/40 hover:bg-white/60 dark:hover:bg-white/10 transition-all flex items-center justify-center gap-3 font-bold text-xs"
                >
                  <img src="/apple.svg" alt="Apple" className="w-5 h-5 dark:invert" />
                  APPLE
                </Button>
              </div>
            </form>

            {/* View switcher between login and registration */}
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
