import React from 'react';
import { Cpu, Zap, Eye, RefreshCw, Layers } from 'lucide-react';

interface ProviderCard {
  name: string;
  defaultModel: string;
  usedFor: string;
  badge: string;
  badgeColor: string;
  icon: React.ReactNode;
}

export const AIProvidersSection: React.FC = () => {
  const providers: ProviderCard[] = [
    {
      name: 'OpenRouter (free)',
      defaultModel: 'openrouter/free',
      usedFor: 'Agent, Plan, Ask (General fallback)',
      badge: 'Free Tier',
      badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      icon: <Zap className="w-5 h-5 text-emerald-400" />,
    },
    {
      name: 'Anthropic Claude',
      defaultModel: 'claude-3-5-sonnet-20241022',
      usedFor: 'Precision coding & code diff checks',
      badge: 'High Precision',
      badgeColor: 'text-violet-400 bg-violet-500/10 border-violet-500/20',
      icon: <Cpu className="w-5 h-5 text-violet-400" />,
    },
    {
      name: 'Google Gemini',
      defaultModel: 'gemini-2.5-flash',
      usedFor: 'Browser Agent (DOM selector parsing)',
      badge: 'Vision Native',
      badgeColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
      icon: <Eye className="w-5 h-5 text-cyan-400" />,
    },
    {
      name: 'OpenAI',
      defaultModel: 'gpt-4o-mini',
      usedFor: 'General tasks & rapid structured outputs',
      badge: 'Balanced Speed',
      badgeColor: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
      icon: <Layers className="w-5 h-5 text-blue-400" />,
    },
    {
      name: 'Groq',
      defaultModel: 'llama-3.3-70b-versatile',
      usedFor: 'Supabase Scheduler background run processing',
      badge: 'Ultra Fast',
      badgeColor: 'text-pink-400 bg-pink-500/10 border-pink-500/20',
      icon: <RefreshCw className="w-5 h-5 text-pink-400" />,
    },
  ];

  return (
    <div className="space-y-12">
      <div className="text-center space-y-2 max-w-xl mx-auto">
        <span className="text-xs font-mono font-bold tracking-widest text-slate-500 uppercase">Provider Integrations</span>
        <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">Flexible provider mapping</h2>
        <p className="text-sm text-slate-400 leading-relaxed">
          Configure fallback connections to prevent API outages. Set primary providers during setup and let Jerob manage task handoffs.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {providers.map((p, idx) => (
          <div 
            key={idx}
            className="group relative rounded-xl border border-white/5 bg-background-card/20 p-5 hover:border-white/10 transition-all duration-300 flex flex-col justify-between"
          >
            {/* Soft highlight gradient on hover */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.01] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl" />

            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div className="p-2 rounded-lg bg-white/5 border border-white/5 text-slate-300">
                  {p.icon}
                </div>
                <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full border ${p.badgeColor}`}>
                  {p.badge}
                </span>
              </div>

              <div>
                <h4 className="text-sm font-bold text-white font-mono tracking-tight">
                  {p.name}
                </h4>
                <div className="mt-2 space-y-1">
                  <span className="text-[10px] font-mono text-slate-500 block uppercase">Default Model</span>
                  <code className="text-[10px] font-mono text-cyan-400 bg-black/40 px-1.5 py-0.5 rounded border border-white/5 block truncate">
                    {p.defaultModel}
                  </code>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-white/5">
              <span className="text-[9px] font-mono text-slate-500 block uppercase">Primary Use</span>
              <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                {p.usedFor}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
