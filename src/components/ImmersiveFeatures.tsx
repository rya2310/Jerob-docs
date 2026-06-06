import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, ListChecks, Compass, MessageSquare, Calendar, ChevronRight, Eye, GitBranch, ArrowRight } from 'lucide-react';

interface FeatureItem {
  id: string;
  title: string;
  tagline: string;
  badge: string;
  icon: React.ReactNode;
  color: string;
  glow: string;
  details: string[];
}

export const ImmersiveFeatures: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState<string>('agent');

  const features: FeatureItem[] = [
    {
      id: 'agent',
      title: '🤖 Agent Mode',
      tagline: 'Autonomous file/code operations with diff review and approval constraints.',
      badge: 'Code Mutation',
      icon: <Cpu className="w-5 h-5" />,
      color: 'from-blue-600 via-cyan-500 to-teal-400',
      glow: 'rgba(59, 130, 246, 0.2)',
      details: [
        'Plans file-writing steps in a secure sandbox workspace',
        'Generates code diff outputs and holds execution for manual sign-off',
        'Wipes credentials automatically after task termination',
        'Auto-compiles project configurations to check syntax'
      ]
    },
    {
      id: 'planner',
      title: '🧭 Plan Mode',
      tagline: 'Construct structured multi-step plans to hand off or reference.',
      badge: 'Logic Graph',
      icon: <ListChecks className="w-5 h-5" />,
      color: 'from-violet-600 via-indigo-500 to-purple-500',
      glow: 'rgba(139, 92, 246, 0.2)',
      details: [
        'Deconstructs target goals into sequential code blocks',
        'Allows manual review and toggling of individual steps',
        'Hands completed trees off to Agent Mode for auto-writing',
        'Autodetects dependencies to resolve migration conflicts'
      ]
    },
    {
      id: 'browser',
      title: '🌐 Browser Agent',
      tagline: 'Playwright-based browser automation driven by Gemini DOM engines.',
      badge: 'Gemini Automation',
      icon: <Compass className="w-5 h-5" />,
      color: 'from-cyan-400 via-teal-400 to-emerald-400',
      glow: 'rgba(6, 182, 212, 0.2)',
      details: [
        'Uses your existing Brave/Chrome browser profile securely',
        'Requires zero site credentials stored in the automation',
        'Leverages Gemini API for dynamic DOM selector parsing',
        'Iteratively refines mouse actions until page tasks succeed'
      ]
    },
    {
      id: 'ask',
      title: '❓ Ask Mode',
      tagline: 'Conversational assistant with workspace index, web search, and Gmail links.',
      badge: 'Read-Only QA',
      icon: <MessageSquare className="w-5 h-5" />,
      color: 'from-blue-500 via-violet-500 to-fuchsia-500',
      glow: 'rgba(0, 102, 255, 0.2)',
      details: [
        'Enforces strict read-only parameters: never mutates local code',
        'Performs live Google queries and scrapes page data using Firecrawl',
        'Interfaces with Gmail API for automated email audits',
        'Retains session context and thread history within runs'
      ]
    },
    {
      id: 'scheduler',
      title: '⏰ Scheduler Mode',
      tagline: 'Define serverless tasks in plain English to run 24/7 in Supabase Edge Functions.',
      badge: 'Supabase Edge Crons',
      icon: <Calendar className="w-5 h-5" />,
      color: 'from-fuchsia-500 via-pink-500 to-rose-400',
      glow: 'rgba(236, 72, 153, 0.2)',
      details: [
        'Runs recurring tasks on Supabase crons — even when your PC is off',
        'One-time automated setup wizard provisions Edge Tables',
        'Stores OAuth tokens encrypted with AES-256 in Supabase vault',
        'Executes browser scrapes, market scans, and newsletter emails'
      ]
    }
  ];

  // Auto transition features slowly if no hover interaction occurs
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveFeature((prev) => {
        const currentIndex = features.findIndex((f) => f.id === prev);
        const nextIndex = (currentIndex + 1) % features.length;
        return features[nextIndex].id;
      });
    }, 9000);
    return () => clearInterval(timer);
  }, []);

  const activeData = features.find((f) => f.id === activeFeature) || features[0];

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative overflow-visible">
      {/* Sticky Dock Navigation (left side) */}
      <div className="lg:col-span-5 flex flex-col gap-3 lg:sticky lg:top-24">
        <div className="text-xs font-mono font-bold tracking-widest text-slate-500 uppercase px-2">
          OPERATIONAL CAPABILITIES
        </div>
        
        {features.map((feat) => {
          const isSelected = activeFeature === feat.id;
          return (
            <button
              key={feat.id}
              onClick={() => setActiveFeature(feat.id)}
              className={`group flex items-start gap-4 p-4 rounded-2xl border transition-all text-left relative overflow-hidden ${
                isSelected
                  ? 'bg-background-card border-white/10 shadow-lg'
                  : 'bg-transparent border-transparent hover:bg-white/[0.02]'
              }`}
            >
              {/* Highlight bar */}
              {isSelected && (
                <motion.div
                  layoutId="accent-bar"
                  className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${feat.color}`}
                />
              )}

              <div className={`p-2.5 rounded-xl transition-all duration-300 ${
                isSelected
                  ? `bg-gradient-to-br ${feat.color} text-white`
                  : 'bg-white/5 text-slate-400 group-hover:text-slate-200'
              }`}>
                {feat.icon}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className={`text-[15px] font-bold transition-colors ${
                    isSelected ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'
                  }`}>
                    {feat.title}
                  </span>
                  {isSelected && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 text-slate-300 border border-white/5">
                      {feat.badge}
                    </span>
                  )}
                </div>
                <p className={`text-xs mt-1.5 leading-relaxed transition-colors ${
                  isSelected ? 'text-slate-300' : 'text-slate-500'
                }`}>
                  {feat.tagline}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Cinematic Showcase Pane (right side) */}
      <div className="lg:col-span-7 h-[460px] md:h-[500px] w-full rounded-2xl glass-panel overflow-hidden border border-white/5 relative flex flex-col">
        {/* Dynamic Glow backing */}
        <div 
          className="absolute inset-0 transition-opacity duration-1000 opacity-20 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 70% 30%, ${activeData.glow} 0%, transparent 60%)`
          }}
        />

        {/* Dynamic Frame Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-black/40 border-b border-white/5 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>jerob://visualizer/{activeFeature}</span>
          </div>
          <span className="text-[10px] text-slate-500 uppercase tracking-widest">interactive sandbox</span>
        </div>

        {/* Content Showcase Area */}
        <div className="flex-1 p-5 md:p-6 overflow-hidden relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFeature}
              initial={{ opacity: 0, scale: 0.97, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: -10 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="w-full h-full flex flex-col justify-between"
            >
              {/* Top part: details list */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <div className="text-[11px] font-mono uppercase tracking-widest text-cyan-400 font-semibold">
                    Capabilities
                  </div>
                  <ul className="flex flex-col gap-2.5">
                    {activeData.details.map((detail, index) => (
                      <li key={index} className="flex items-start gap-2 text-xs text-slate-300">
                        <ChevronRight className="w-3.5 h-3.5 mt-0.5 text-slate-500 flex-shrink-0" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right text box */}
                <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 flex flex-col justify-between min-h-[120px] md:min-h-0">
                  <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                    Operational Status
                  </div>
                  <div className="text-xl font-bold tracking-tight text-white mt-1 leading-snug">
                    Seamless local execution.
                  </div>
                  <div className="text-[11px] text-slate-400 mt-2 leading-relaxed">
                    Designed to work with clean sandboxed containers, protecting database files and repository branches.
                  </div>
                </div>
              </div>

              {/* Bottom part: Live Mode Simulation */}
              <div className="w-full mt-6 h-[200px] md:h-[240px] bg-black/50 border border-white/5 rounded-xl overflow-hidden relative flex flex-col font-mono text-xs shadow-inner">
                {/* Mode Simulations */}
                {activeFeature === 'agent' && (
                  <div className="flex-1 flex flex-col p-4">
                    {/* Simulated Code Editor */}
                    <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] px-1.5 py-0.5 bg-blue-500/10 text-blue-400 rounded border border-blue-500/20 font-bold">MUTATION</span>
                        <span className="text-slate-400">src/utils/payment.ts</span>
                      </div>
                      <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                        <GitBranch className="w-3 h-3" /> synced
                      </span>
                    </div>
                    <pre className="text-[11px] leading-relaxed text-slate-400 overflow-x-auto">
                      <span className="text-emerald-500">+ export async function processStripeInvoice(userId: string) &#123;</span><br />
                      <span className="text-emerald-500">+   const user = await db.user.findUnique(&#123; where: &#123; id: userId &#125; &#125;);</span><br />
                      <span className="text-emerald-500">+   if (!user?.stripeCustomerId) throw new Error("Missing ID");</span><br />
                      <span className="text-slate-500">    return stripe.invoices.create(&#123; customer: user.stripeCustomerId &#125;);</span><br />
                      <span className="text-slate-400">&#125;</span>
                    </pre>
                    <div className="mt-auto pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-500">
                      <span>Prisma Schema Synced</span>
                      <span className="animate-pulse text-cyan-400">writing file...</span>
                    </div>
                  </div>
                )}

                {activeFeature === 'planner' && (
                  <div className="flex-1 flex flex-col p-4 justify-center">
                    {/* Workflow Diagram */}
                    <div className="flex flex-col md:flex-row items-center justify-center gap-3">
                      <div className="px-3 py-2 bg-blue-500/10 rounded-lg border border-blue-500/20 text-center w-full md:w-32">
                        <span className="block text-[9px] text-slate-500 uppercase">Task 1</span>
                        <span className="font-bold text-blue-400 text-xs">Run Migrations</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-600 hidden md:block" />
                      <div className="px-3 py-2 bg-violet-500/10 rounded-lg border border-violet-500/20 text-center w-full md:w-32 relative">
                        <span className="absolute -top-1.5 -right-1.5 w-3 h-3 rounded-full bg-cyan-400 animate-ping" />
                        <span className="absolute -top-1.5 -right-1.5 w-3 h-3 rounded-full bg-cyan-400" />
                        <span className="block text-[9px] text-slate-500 uppercase">Task 2 (Active)</span>
                        <span className="font-bold text-violet-400 text-xs">Update API Secrets</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-600 hidden md:block" />
                      <div className="px-3 py-2 bg-slate-900 rounded-lg border border-white/5 text-center w-full md:w-32 opacity-55">
                        <span className="block text-[9px] text-slate-500 uppercase">Task 3</span>
                        <span className="font-bold text-slate-400 text-xs">Deploy Cluster</span>
                      </div>
                    </div>
                    <div className="mt-6 text-center text-[10px] text-slate-500">
                      Auto-correct plan: Database connection verified. Secrets injection complete.
                    </div>
                  </div>
                )}

                {activeFeature === 'browser' && (
                  <div className="flex-1 flex flex-col p-2.5">
                    {/* Headless Browser UI */}
                    <div className="bg-background-card rounded-lg border border-white/10 flex-1 overflow-hidden flex flex-col">
                      <div className="px-3 py-1.5 bg-black/40 border-b border-white/10 flex items-center gap-2">
                        <div className="flex gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                        </div>
                        <div className="flex-1 bg-black/40 rounded px-2 py-0.5 text-[9px] text-slate-500 truncate flex items-center justify-between">
                          <span>https://stripe.com/sessions/pricing</span>
                          <Eye className="w-2.5 h-2.5 text-cyan-400" />
                        </div>
                      </div>
                      <div className="flex-1 p-3 flex flex-col gap-2 relative">
                        {/* Highlights element clicked */}
                        <div className="absolute inset-0 bg-cyan-400/5 border border-cyan-400/20 animate-pulse pointer-events-none rounded" />
                        
                        <div className="flex justify-between items-center bg-white/[0.02] p-2 rounded border border-white/5">
                          <div className="flex flex-col">
                            <span className="text-[10px] text-slate-400">Querying DOM element</span>
                            <span className="font-bold text-white text-[11px]">.pricing-grid-card</span>
                          </div>
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-cyan-400/10 text-cyan-400 border border-cyan-400/20">Scraped</span>
                        </div>
                        <div className="text-[10px] text-slate-500">
                          &gt; click(&quot;.pricing-toggle-annual&quot;) : success (210ms)
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeFeature === 'ask' && (
                  <div className="flex-1 flex flex-col p-3.5 justify-between">
                    {/* Conversation bubbles */}
                    <div className="flex flex-col gap-2">
                      <div className="flex gap-2 items-start">
                        <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center border border-white/10 flex-shrink-0 text-[10px] font-bold">
                          U
                        </div>
                        <div className="bg-white/5 rounded-xl px-3 py-2 text-[11px] text-slate-300 max-w-[85%]">
                          Why is my database client connection failing locally?
                        </div>
                      </div>

                      <div className="flex gap-2 items-start">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-blue-500 to-violet-500 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-white">
                          J
                        </div>
                        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl px-3 py-2 text-[11px] text-slate-200 max-w-[85%]">
                          Your <code className="text-cyan-400">.env</code> is missing the <code className="text-cyan-400">DATABASE_URL</code> parameter. I can write the Prisma template configuration now.
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeFeature === 'scheduler' && (
                  <div className="flex-1 flex flex-col p-3 justify-center">
                    {/* Recurring Automations UI */}
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between items-center p-2 rounded bg-white/[0.02] border border-white/5">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span className="font-bold text-xs">daily-competitor-audit</span>
                        </div>
                        <span className="text-[9px] font-mono text-slate-500">09:00 UTC (Mon-Fri)</span>
                      </div>
                      <div className="flex justify-between items-center p-2 rounded bg-white/[0.02] border border-white/5">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                          <span className="font-bold text-xs text-slate-400">slack-newsletter-summarizer</span>
                        </div>
                        <span className="text-[9px] font-mono text-slate-500">18:00 UTC (Daily)</span>
                      </div>
                    </div>
                    <div className="mt-3 text-[10px] text-slate-500 text-center">
                      Next execution in: 4h 12m (daily-competitor-audit)
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
