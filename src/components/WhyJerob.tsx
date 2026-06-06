import React from 'react';
import { Terminal, Shield, Cpu, RefreshCw, Layers, KeyRound } from 'lucide-react';

interface GridItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  tag: string;
}

export const WhyJerob: React.FC = () => {
  const items: GridItem[] = [
    {
      title: 'Unified CLI Experience',
      description: 'Run five powerful AI operators under a single console. Transition smoothly between autonomous coding, plans, browser tasks, Q&A, and background crons.',
      icon: <Terminal className="w-5 h-5 text-blue-400" />,
      tag: 'One CLI',
    },
    {
      title: 'Multi-Model Fallbacks',
      description: 'Never get rate-limited. Jerob maps queries dynamically across OpenRouter, Anthropic, Gemini, OpenAI, and Groq, with auto-fallback to free providers.',
      icon: <Cpu className="w-5 h-5 text-violet-400" />,
      tag: 'Resilient LLMs',
    },
    {
      title: 'Vision-Driven Automation',
      description: 'Playwright automation that reads websites like a human. Powered by Gemini vision engines to resolve complex selector paths, bypass anti-bot, and scrape data.',
      icon: <Layers className="w-5 h-5 text-cyan-400" />,
      tag: 'Playwright + Gemini',
    },
    {
      title: 'Approval-Gate Diff Audits',
      description: 'Zero automated write access without your consent. Jerob executes plan codes in isolated sandbox workspaces and requests your visual Git-style diff confirmation.',
      icon: <Shield className="w-5 h-5 text-emerald-400" />,
      tag: 'Sandboxed Writes',
    },
    {
      title: 'Serverless Background Cycles',
      description: 'Deploy workflows that run infinitely. Sync your tasks to Supabase Edge Functions with a single command to execute schedules even when your computer is shut down.',
      icon: <RefreshCw className="w-5 h-5 text-pink-400" />,
      tag: '24/7 Edge Functions',
    },
    {
      title: 'Zero-Trust Local Security',
      description: 'Your secrets stay yours. Credentials are encrypted locally using AES-256 and salted passwords verified with bcrypt. Vault configurations are locked behind RLS rules.',
      icon: <KeyRound className="w-5 h-5 text-amber-400" />,
      tag: 'AES-256 Crypt',
    },
  ];

  return (
    <div className="space-y-12">
      <div className="text-center space-y-2 max-w-xl mx-auto">
        <span className="text-xs font-mono font-bold tracking-widest text-slate-500 uppercase">Architecture Advantage</span>
        <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">Built for production workloads</h2>
        <p className="text-sm text-slate-400 leading-relaxed">
          An open-source terminal system that blends speed, multi-model redundancy, security, and headless scheduling.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, index) => (
          <div 
            key={index} 
            className="group relative rounded-2xl border border-white/5 bg-background-card/20 p-6 hover:border-white/10 transition-all duration-300 overflow-hidden flex flex-col justify-between"
          >
            {/* Hover glow backing */}
            <div className="absolute -inset-px bg-gradient-to-tr from-white/[0.02] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-slate-300 group-hover:text-white transition-all">
                  {item.icon}
                </div>
                <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest bg-white/[0.02] px-2 py-0.5 rounded border border-white/5">
                  {item.tag}
                </span>
              </div>

              <h3 className="text-base font-bold text-white tracking-tight group-hover:text-cyan-400 transition-colors">
                {item.title}
              </h3>
              
              <p className="text-xs text-slate-400 leading-relaxed mt-2.5">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
