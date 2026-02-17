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
    <div className="mt-3 p-3 rounded-xl bg-white/50 border border-primary/10 animate-in space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {isLoading ? (
            <Sparkles className="w-4 h-4 text-primary animate-spin" />
          ) : (
            <Shield className={`w-4 h-4 ${analysis?.score > 70 ? 'text-green-500' : 'text-amber-500'}`} />
          )}
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">AI Security Score</span>
        </div>
        {!isLoading && analysis && (
          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
            analysis.score > 70 ? 'bg-green-100 text-green-700' : 
            analysis.score > 40 ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'
          }`}>
            {analysis.score}%
          </span>
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
