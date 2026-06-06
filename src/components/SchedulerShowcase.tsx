import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, TrendingUp, Mail, Newspaper, Play, Clock, CheckCircle2 } from 'lucide-react';

interface ScheduleJob {
  id: string;
  name: string;
  time: string;
  icon: React.ReactNode;
  status: 'idle' | 'running' | 'completed';
  logs: string[];
  color: string;
}

export const SchedulerShowcase: React.FC = () => {
  const [activeJobIdx, setActiveJobIdx] = useState<number>(0);

  const jobs: ScheduleJob[] = [
    {
      id: 'research',
      name: 'Daily AI Research & Paper Crawl',
      time: '09:00 UTC',
      icon: <Search className="w-5 h-5" />,
      status: 'idle',
      color: 'from-pink-500 to-rose-400',
      logs: [
        'Checking arXiv & bioRxiv endpoints for "agentic framework" preprints...',
        'Retrieved 12 candidate papers; indexing metadata...',
        'Running LLM summary pipeline on abstracts...',
        'Saved summaries to workspace: docs/research/digest_2026-06-06.md'
      ]
    },
    {
      id: 'competitor',
      name: 'Competitor Pricing Monitor',
      time: '12:30 UTC',
      icon: <TrendingUp className="w-5 h-5" />,
      status: 'idle',
      color: 'from-cyan-400 to-blue-500',
      logs: [
        'Booting Headless Chrome container...',
        'Navigating to competitor pricing dashboards...',
        'Parsing DOM: detected subscription price drop from $49 to $39.',
        'Triggered webhook: posting diff alert to slack #growth-leads.'
      ]
    },
    {
      id: 'market',
      name: 'Market Intelligence Aggregator',
      time: '15:00 UTC',
      icon: <Clock className="w-5 h-5" />,
      status: 'idle',
      color: 'from-violet-500 to-fuchsia-500',
      logs: [
        'Pulling drug approval logs from OpenFDA database...',
        'Checking clinical trial completions for oncology targets...',
        'Cross-referencing target genes with OpenTargets database...',
        'Generated market research report: reports/oncology_q2.pdf'
      ]
    },
    {
      id: 'email',
      name: 'Automated Client Follow-ups',
      time: '17:00 UTC',
      icon: <Mail className="w-5 h-5" />,
      status: 'idle',
      color: 'from-emerald-400 to-teal-500',
      logs: [
        'Querying PostgreSQL database: retrieving user onboarding drop-offs...',
        'Identified 42 accounts inactive for 3 days...',
        'Generating personalized emails using context templates...',
        'Scheduled 42 emails via Resend API queue.'
      ]
    },
    {
      id: 'news',
      name: 'Team News Summarizer',
      time: '20:00 UTC',
      icon: <Newspaper className="w-5 h-5" />,
      status: 'idle',
      color: 'from-amber-400 to-orange-500',
      logs: [
        'Reading RSS feeds & Hacker News frontpage API...',
        'Clustering top stories related to LLMs, Edge compute, and WebAssembly...',
        'Drafting markdown post for internal wiki...',
        'Dispatched daily team briefing newsletter.'
      ]
    }
  ];

  // Cycle through jobs automatically in a loop
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveJobIdx((prev) => (prev + 1) % jobs.length);
    }, 8500);
    return () => clearInterval(timer);
  }, []);

  const activeJob = jobs[activeJobIdx];

  return (
    <div className="w-full bg-background-card/40 border border-white/5 rounded-3xl p-6 md:p-8 relative overflow-hidden">
      {/* Background aurora blurs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 aurora-blur-2 pointer-events-none opacity-25" />

      {/* Header bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/5 pb-6 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-fuchsia-500/10 text-fuchsia-400 border border-fuchsia-500/20 text-xs font-mono mb-3">
            <Clock className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
            <span>24/7 BACKGROUND EXECUTION</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white leading-tight">
            Deploy Workflows that Run Forever
          </h3>
          <p className="text-sm text-slate-400 mt-2 max-w-xl">
            Jerob runs continuous serverless crons. Set complex workflows to run in isolated micro-vms without maintaining servers.
          </p>
        </div>

        {/* Visual cluster stats */}
        <div className="flex gap-4 select-none">
          <div className="px-4 py-3 bg-black/40 rounded-xl border border-white/5 text-center">
            <span className="block text-[10px] font-mono text-slate-500 uppercase">Active Crons</span>
            <span className="text-xl font-bold font-mono text-fuchsia-400">14</span>
          </div>
          <div className="px-4 py-3 bg-black/40 rounded-xl border border-white/5 text-center">
            <span className="block text-[10px] font-mono text-slate-500 uppercase">Uptime</span>
            <span className="text-xl font-bold font-mono text-emerald-400">100.0%</span>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Side: Timeline selector */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          {jobs.map((job, idx) => {
            const isActive = idx === activeJobIdx;
            return (
              <button
                key={job.id}
                onClick={() => setActiveJobIdx(idx)}
                className={`flex items-center justify-between p-4 rounded-2xl border transition-all text-left ${
                  isActive
                    ? 'bg-black/50 border-fuchsia-500/30 shadow-lg'
                    : 'bg-transparent border-transparent hover:bg-white/[0.02]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl ${
                    isActive ? `bg-gradient-to-br ${job.color} text-white` : 'bg-white/5 text-slate-400'
                  }`}>
                    {job.icon}
                  </div>
                  <div>
                    <span className={`text-sm font-semibold transition-colors block ${
                      isActive ? 'text-white font-bold' : 'text-slate-400'
                    }`}>
                      {job.name}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500 mt-0.5 block">
                      Trigger: {job.time}
                    </span>
                  </div>
                </div>

                {isActive && (
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="w-2 h-2 rounded-full bg-fuchsia-400"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Right Side: Log visualizer */}
        <div className="lg:col-span-7 flex flex-col bg-black/60 rounded-2xl border border-white/5 overflow-hidden">
          {/* Panel tab header */}
          <div className="px-4 py-3 bg-background-card/80 border-b border-white/5 flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400 flex items-center gap-1.5">
              <Play className="w-3.5 h-3.5 text-fuchsia-400 fill-fuchsia-400/20" />
              Running execution loop...
            </span>
            <span className="text-[10px] text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> SECURED
            </span>
          </div>

          {/* Running Terminal Console */}
          <div className="flex-1 p-5 md:p-6 font-mono text-[11px] md:text-xs leading-relaxed overflow-y-auto min-h-[260px] flex flex-col justify-between">
            <div className="flex flex-col gap-3">
              <div className="text-slate-500">
                [SYSTEM] Triggering workflow &quot;{activeJob.id}&quot; at {activeJob.time}...
              </div>
              
              <AnimatePresence mode="popLayout">
                {activeJob.logs.map((log, lidx) => (
                  <motion.div
                    key={`${activeJob.id}-log-${lidx}`}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: lidx * 0.4 }}
                    className="text-slate-300 flex items-start gap-2"
                  >
                    <span className="text-fuchsia-400 select-none">&gt;</span>
                    <span>{log}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Micro progress status */}
            <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-500">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                Container VM online
              </span>
              <span>Next cycle in 5 seconds</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
