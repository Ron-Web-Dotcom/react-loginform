import { useState, useEffect } from "react";
import { useBlinkAuth } from "@blinkdotnew/react";
import { Mail, Lock, Sparkles, Chrome, Apple, ArrowRight, Loader2, UserPlus } from "lucide-react";
import { blink } from "./lib/blink";
import { PasswordIntelligence } from "./components/PasswordIntelligence";
import { AIAssistant } from "./components/AIAssistant";
import { Dashboard } from "./components/Dashboard";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Card } from "./components/ui/card";
import { toast } from "sonner";

const App = () => {
  const { isAuthenticated, isLoading: authLoading } = useBlinkAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-50 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      <div className="w-full max-w-md relative z-10 animate-in">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4 border border-primary/20 shadow-sm">
            <Sparkles className="w-3 h-3" />
            AI-Enhanced Security
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 mb-2">
            Login Lite <span className="text-primary italic">AI</span>
          </h1>
          <p className="text-slate-500 text-sm">
            The future of secure, intelligent authentication.
          </p>
        </div>

        <Card className="glass p-8 border-white/50 shadow-2xl rounded-3xl overflow-hidden">
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-3">
              <Button 
                variant="outline" 
                onClick={() => handleSocialLogin('google')}
                className="h-12 gap-2 bg-white/50 border-slate-200 hover:bg-white hover:border-primary/30 transition-all duration-300"
              >
                <Chrome className="w-4 h-4 text-rose-500" />
                <span className="text-xs font-semibold">Google</span>
              </Button>
              <Button 
                variant="outline"
                onClick={() => handleSocialLogin('apple')}
                className="h-12 gap-2 bg-white/50 border-slate-200 hover:bg-white hover:border-primary/30 transition-all duration-300"
              >
                <Apple className="w-4 h-4" />
                <span className="text-xs font-semibold">Apple</span>
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-transparent px-2 text-slate-400 font-medium">or continue with email</span>
              </div>
            </div>

            <form onSubmit={handleAuth} className="space-y-4">
              <div className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 transition-colors group-focus-within:text-primary" />
                  <Input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-12 bg-white/50 border-slate-200 focus:bg-white focus:ring-primary/20 transition-all rounded-xl"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 transition-colors" />
                    <Input
                      type="password"
                      placeholder="Secure Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 h-12 bg-white/50 border-slate-200 focus:bg-white focus:ring-primary/20 transition-all rounded-xl"
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
                className="w-full h-12 rounded-xl text-sm font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300 gap-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    {isSignUp ? "Create Intelligence Account" : "Access Identity"}
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            </form>

            <div className="text-center pt-4">
              <button 
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-xs font-semibold text-slate-500 hover:text-primary transition-colors flex items-center justify-center gap-1 mx-auto"
              >
                {isSignUp ? (
                  <>Already have an account? <span className="text-primary">Log in</span></>
                ) : (
                  <>Don&apos;t have an account? <span className="text-primary font-bold">Sign up</span> <UserPlus className="w-3 h-3 ml-1" /></>
                )}
              </button>
            </div>
          </div>
        </Card>
      </div>
      <AIAssistant />
    </div>
  );
};

export default App;
