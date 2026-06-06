import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Newspaper, Bell, Search, Mail, CheckCircle2, AlertTriangle, Terminal } from 'lucide-react';

interface AutomationExample {
  id: string;
  name: string;
  schedule: string;
  icon: React.ReactNode;
  color: string;
  description: string;
  steps: string[];
  outputLogs: {
    time: string;
    level: 'info' | 'success' | 'warn';
    msg: string;
  }[];
}

export const AutomationsShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('news');

  const automations: AutomationExample[] = [
    {
      id: 'news',
      name: 'Daily AI News Digest',
      schedule: '0 9 * * * (Every morning at 9am)',
      icon: <Newspaper className="w-4 h-4" />,
      color: 'from-pink-500 to-rose-400',
      description: 'Crawls scientific repositories and developer forums to compile, filter, and draft summaries of breaking developments in AI.',
      steps: ['Crawl arXiv & HackerNews APIs', 'Filter keywords: "LLM agent", "webassembly"', 'Generate bullet-point summaries', 'Email digest to team roster'],
      outputLogs: [
        { time: '09:00:00', level: 'info', msg: 'Cron trigger fired. Booting worker container...' },
        { time: '09:00:02', level: 'info', msg: 'Fetching arXiv preprints for keyword: "agentic compute"...' },
        { time: '09:00:04', level: 'info', msg: 'Retrieved 8 new papers. Triggering summaries on Claude-3-5-Sonnet...' },
        { time: '09:00:09', level: 'success', msg: 'HTML summary formatted. Dispatching email via Resend SMTP...' },
        { time: '09:00:11', level: 'success', msg: 'Workflow execution successfully completed. Uptime audit logged.' }
      ]
    },
    {
      id: 'competitor',
      name: 'Weekly Pricing Auditor',
      schedule: '0 12 * * 1 (Every Monday at 12pm)',
      icon: <Bell className="w-4 h-4" />,
      color: 'from-cyan-400 to-blue-500',
      description: 'Spawns a headless browser session to capture competitor SaaS plan prices, parse HTML layout shifts, and alert on pricing adjustments.',
      steps: ['Launch Playwright Chrome browser', 'Navigate competitor billing screens', 'Diff pricing selectors with db storage', 'Dispatch Slack alert on delta'],
      outputLogs: [
        { time: '12:00:00', level: 'info', msg: 'Weekly schedule activated. Provisioning Playwright node...' },
        { time: '12:00:03', level: 'info', msg: 'Opening Chrome window to target: https://competitor.io/pricing...' },
        { time: '12:00:07', level: 'info', msg: 'Reading element selector text: "div.billing-grid-card-price"...' },
        { time: '12:00:09', level: 'warn', msg: 'Delta detected: Professional Tier shifted from $49 to $39/mo.' },
        { time: '12:00:10', level: 'success', msg: 'Posting Slack Webhook notification payload to channel #growth-intel...' },
        { time: '12:00:11', level: 'success', msg: 'Pricing diff synced in db. Closing headless sandbox.' }
      ]
    },
    {
      id: 'research',
      name: 'Patent & Drug Research Scraper',
      schedule: '0 0 * * * (Every midnight)',
      icon: <Search className="w-4 h-4" />,
      color: 'from-violet-500 to-fuchsia-500',
      description: 'Checks clinical registry journals and regulatory approvals to align targeted proteins with compound structures.',
      steps: ['Scan OpenFDA drug approval logs', 'Map approved targets in UniProt database', 'Trigger Foldseek structure alignments', 'Save PDB models to project workspace'],
      outputLogs: [
        { time: '00:00:00', level: 'info', msg: 'Midnight check initiated. Connecting to E-Utilities API...' },
        { time: '00:00:02', level: 'info', msg: 'Scanned 14 newly approved molecular targets. Querying UniProt mapping...' },
        { time: '00:00:05', level: 'info', msg: 'Aligning structural mutations with Foldseek domain models...' },
        { time: '00:00:08', level: 'success', msg: 'Generated analysis schema: workspace/docs/research/target_map.json' },
        { time: '00:00:09', level: 'success', msg: 'Cron cycle resolved. VM memory garbage collection completed.' }
      ]
    },
    {
      id: 'email',
      name: 'Client Retention Follow-ups',
      schedule: '0 17 * * * (Every evening at 5pm)',
      icon: <Mail className="w-4 h-4" />,
      color: 'from-emerald-400 to-teal-500',
      description: 'Checks customer onboarding activity in databases, identifies dropping usage, and drafts personalized emails to prompt engagement.',
      steps: ['Query PostgreSQL inactive user list', 'Evaluate email history logs', 'Use Gemini to write outreach emails', 'Push draft templates to Gmail queue'],
      outputLogs: [
        { time: '17:00:00', level: 'info', msg: 'Accessing user metrics database...' },
        { time: '17:00:02', level: 'info', msg: 'Identified 28 accounts inactive for 3+ consecutive days.' },
        { time: '17:00:04', level: 'info', msg: 'Drafting emails using model override: gpt-4o-mini...' },
        { time: '17:00:07', level: 'success', msg: '28 message templates generated and queued in Gmail API.' },
        { time: '17:00:08', level: 'success', msg: 'Client database session closed safely. Active process resolved.' }
      ]
    }
  ];

  const currentAuto = automations.find(a => a.id === activeTab) || automations[0];

  return (
    <div className="space-y-12">
      <div className="text-center space-y-2 max-w-xl mx-auto">
        <span className="text-xs font-mono font-bold tracking-widest text-slate-500 uppercase">Automation Use Cases</span>
        <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">Write once. Run continuously.</h2>
        <p className="text-sm text-slate-400 leading-relaxed">
          Define agent tasks in plain English. Jerob deploys them onto secure Supabase serverless micro-VMs to execute schedules.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Side Tab Selector */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          {automations.map((a) => {
            const isActive = a.id === activeTab;
            return (
              <button
                key={a.id}
                onClick={() => setActiveTab(a.id)}
                className={`flex items-start gap-4 p-4 rounded-2xl border transition-all text-left relative overflow-hidden ${
                  isActive
                    ? 'bg-black/50 border-white/10 shadow-lg'
                    : 'bg-transparent border-transparent hover:bg-white/[0.02]'
                }`}
              >
                {/* Visual bar */}
                {isActive && (
                  <motion.div
                    layoutId="auto-indicator"
                    className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${a.color}`}
                  />
                )}

                <div className={`p-2.5 rounded-xl ${
                  isActive ? `bg-gradient-to-br ${a.color} text-white` : 'bg-white/5 text-slate-400'
                }`}>
                  {a.icon}
                </div>

                <div>
                  <span className={`text-sm font-semibold block transition-colors ${
                    isActive ? 'text-white font-bold' : 'text-slate-400'
                  }`}>
                    {a.name}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500 mt-1 block">
                    Cron: {a.schedule}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Side Workflow Canvas */}
        <div className="lg:col-span-7 flex flex-col bg-black/60 rounded-2xl border border-white/5 overflow-hidden">
          {/* Header tab */}
          <div className="px-4 py-3 bg-background-card/80 border-b border-white/5 flex items-center justify-between text-xs font-mono text-slate-400 select-none">
            <span className="flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              workflow_agent --mode scheduler
            </span>
            <span className="text-[10px] text-slate-500 uppercase tracking-widest">Execution Trace</span>
          </div>

          <div className="p-6 flex-1 flex flex-col justify-between min-h-[300px]">
            {/* Steps & Description */}
            <div className="space-y-4">
              <p className="text-xs text-slate-300 leading-relaxed font-sans border-b border-white/5 pb-4">
                {currentAuto.description}
              </p>

              <div className="space-y-2.5">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-bold block">
                  Workflow Execution Tree
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 font-mono text-[10px]">
                  {currentAuto.steps.map((step, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2 rounded bg-white/[0.02] border border-white/5 text-slate-300">
                      <span className="w-4 h-4 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center font-bold">
                        {idx + 1}
                      </span>
                      <span className="truncate">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Simulated Live Console Logs */}
            <div className="mt-6 pt-4 border-t border-white/5 space-y-2 font-mono text-[10px] leading-relaxed">
              <span className="text-[9px] text-slate-500 uppercase tracking-widest font-bold block mb-1">
                Recent Serverless Log Outputs
              </span>
              <div className="space-y-1.5 max-h-[110px] overflow-y-auto pr-1">
                <AnimatePresence mode="wait">
                  {currentAuto.outputLogs.map((log, idx) => (
                    <motion.div
                      key={`${currentAuto.id}-log-${idx}`}
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-start gap-2"
                    >
                      <span className="text-slate-500 flex-shrink-0">[{log.time}]</span>
                      {log.level === 'success' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />}
                      {log.level === 'warn' && <AlertTriangle className="w-3.5 h-3.5 text-amber-400 mt-0.5 flex-shrink-0" />}
                      {log.level === 'info' && <span className="text-slate-500 flex-shrink-0">&gt;</span>}
                      <span className={log.level === 'success' ? 'text-emerald-300' : log.level === 'warn' ? 'text-amber-300' : 'text-slate-300'}>
                        {log.msg}
                      </span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
