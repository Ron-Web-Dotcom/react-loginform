import { useState, useEffect } from 'react';
import { Shield, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';
import { blink } from '../lib/blink';

export const PasswordIntelligence = ({ password }) => {
  const [analysis, setAnalysis] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const analyzePassword = async () => {
      if (!password || password.length < 4) {
        setAnalysis(null);
        return;
      }

      setIsLoading(true);
      try {
        const { object } = await blink.ai.generateObject({
          prompt: `Analyze the security of this password: "${password}". 
          Provide a score from 0-100, a level (Weak, Medium, Strong), and 3 bullet points of security advice.`,
          schema: {
            type: "object",
            properties: {
              score: { type: "number" },
              level: { type: "string" },
              advice: { type: "array", items: { type: "string" } }
            },
            required: ["score", "level", "advice"]
          }
        });
        setAnalysis(object);
      } catch (error) {
        console.error('Password analysis failed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const timer = setTimeout(analyzePassword, 800);
    return () => clearTimeout(timer);
  }, [password]);

  if (!password || password.length < 4) return null;

  return (
    <div className="mt-4 p-5 rounded-3xl bg-white/40 dark:bg-white/5 border border-primary/10 backdrop-blur-md animate-in space-y-4 group shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-500 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 blur-3xl -z-10 animate-pulse" />
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          {isLoading ? (
            <Sparkles className="w-4 h-4 text-primary animate-spin" />
          ) : (
            <div className={`p-1.5 rounded-xl ${analysis?.score > 70 ? 'bg-green-500/10' : analysis?.score > 40 ? 'bg-amber-500/10' : 'bg-rose-500/10'}`}>
              <Shield className={`w-4 h-4 ${analysis?.score > 70 ? 'text-green-500' : analysis?.score > 40 ? 'text-amber-500' : 'text-rose-500'}`} />
            </div>
          )}
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Neural Audit</span>
            <span className="text-[8px] font-bold text-primary/60 uppercase tracking-widest">AI Core Active</span>
          </div>
        </div>
        {!isLoading && analysis && (
          <div className="flex flex-col items-end">
            <span className={`text-[10px] font-black px-2.5 py-1 rounded-lg ${
              analysis.score > 70 ? 'bg-green-500/10 text-green-600' : 
              analysis.score > 40 ? 'bg-amber-500/10 text-amber-600' : 'bg-rose-500/10 text-rose-600'
            }`}>
              {analysis.level.toUpperCase()}
            </span>
            <span className="text-[9px] font-bold text-muted-foreground mt-1">{analysis.score}% Integrity</span>
          </div>
        )}
      </div>

      {!isLoading && analysis && (
        <>
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-1000 ease-out ${
                analysis.score > 70 ? 'bg-green-500' : 
                analysis.score > 40 ? 'bg-amber-500' : 'bg-rose-500'
              }`}
              style={{ width: `${analysis.score}%` }}
            />
          </div>
          <div className="space-y-1">
            {analysis.advice.map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-[10px] text-muted-foreground leading-tight">
                {analysis.score > 70 ? (
                  <CheckCircle2 className="w-3 h-3 text-green-500 mt-0.5 shrink-0" />
                ) : (
                  <AlertCircle className="w-3 h-3 text-amber-500 mt-0.5 shrink-0" />
                )}
                <span>{item}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};