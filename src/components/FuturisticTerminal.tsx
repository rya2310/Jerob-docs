import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Copy, Check, Activity, ShieldCheck } from 'lucide-react';

interface TerminalTab {
  id: string;
  label: string;
  command: string;
  output: {
    type: 'input' | 'system' | 'success' | 'warn' | 'info' | 'code' | 'prompt';
    text: string;
    delay?: number;
  }[];
}

export const FuturisticTerminal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('agent');
  const [copied, setCopied] = useState<boolean>(false);
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(true);

  const tabs: TerminalTab[] = [
    {
      id: 'agent',
      label: '1. Agent',
      command: 'jerob jet',
      output: [
        { type: 'input', text: '$ jerob jet' },
        { type: 'system', text: '✨ Welcome to Jerob — Personal AI Operator' },
        { type: 'prompt', text: '? Choose mode: 🤖 Agent' },
        { type: 'prompt', text: '? What is your goal: "fix hydration mismatch in header"' },
        { type: 'system', text: '⠋ Spawning gVisor sandbox container (v1.4.2)...' },
        { type: 'info', text: 'ℹ Scanning project directory for layout files...' },
        { type: 'info', text: '✔ Found mismatch in src/components/Header.tsx:L42' },
        { type: 'code', text: `<<<< EXISTING
  const [time, setTime] = useState(new Date().toLocaleTimeString());
==== PROPOSED
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    setTime(new Date().toLocaleTimeString());
  }, []);
>>>> FIXED` },
        { type: 'prompt', text: '? Approve diff and write changes? (Y/n): Y' },
        { type: 'system', text: '⠋ Executing file write & running TypeScript check...' },
        { type: 'success', text: '✔ Vite compile check: Passed (410ms)' },
        { type: 'success', text: '✔ Hydration checks: 0 warnings, 0 errors' },
        { type: 'success', text: '🎉 Workspace synced. Git branch "jerob/fix-hydration" successfully created.' }
      ]
    },
    {
      id: 'planner',
      label: '2. Plan',
      command: 'jerob jet',
      output: [
        { type: 'input', text: '$ jerob jet' },
        { type: 'system', text: '✨ Welcome to Jerob — Personal AI Operator' },
        { type: 'prompt', text: '? Choose mode: 🧭 Plan' },
        { type: 'prompt', text: '? What is your goal: "deploy db migrations & auth service"' },
        { type: 'system', text: '🧠 Constructing multi-step plan graph...' },
        { type: 'info', text: 'Generated 3 sequential nodes:' },
        { type: 'info', text: '  ├─ [1] Database: Execute Prisma migration deploy' },
        { type: 'info', text: '  ├─ [2] Secrets: Provision keys in Supabase Vault' },
        { type: 'info', text: '  └─ [3] Deploy: Trigger Fly.io cluster build (depends on 1 & 2)' },
        { type: 'prompt', text: '? Hand off to Agent Mode for execution? (Y/n): Y' },
        { type: 'success', text: '🚀 Launching Agent loop. Run "jerob plan status" to audit logs.' }
      ]
    },
    {
      id: 'browser',
      label: '3. Browser Agent',
      command: 'jerob jet',
      output: [
        { type: 'input', text: '$ jerob jet' },
        { type: 'system', text: '✨ Welcome to Jerob — Personal AI Operator' },
        { type: 'prompt', text: '? Choose mode: 🌐 Browser Agent' },
        { type: 'prompt', text: '? Enter goal: "scrape competitor pricing page"' },
        { type: 'system', text: '🕸️  Opening headless Chrome session (using Brave profile)...' },
        { type: 'info', text: 'ℹ Navigating to: https://competitor-store.io/pricing' },
        { type: 'info', text: 'ℹ Simulating user mouse scroll to trigger lazy elements...' },
        { type: 'info', text: 'ℹ Clicking element: button.pricing-toggle-annual' },
        { type: 'info', text: '⚡ Injecting selector query and parsing plan cards...' },
        { type: 'code', text: `Parsed Data:
{
  "pro_tier": "$49/mo (billed annually)",
  "team_tier": "$149/mo (billed annually)",
  "enterprise": "Contact sales"
}` },
        { type: 'success', text: '✔ Saved scrape result to scratch/pricing_data.json' },
        { type: 'success', text: '🎉 Browser closed safely.' }
      ]
    },
    {
      id: 'ask',
      label: '4. Ask',
      command: 'jerob jet',
      output: [
        { type: 'input', text: '$ jerob jet' },
        { type: 'system', text: '✨ Welcome to Jerob — Personal AI Operator' },
        { type: 'prompt', text: '? Choose mode: ❓ Ask' },
        { type: 'prompt', text: '? Ask Jerob: "why is docker build caching failing"' },
        { type: 'system', text: '🔍 Analyzing active environment context...' },
        { type: 'info', text: 'ℹ Found failed log in logs/docker-build-2026.log:' },
        { type: 'warn', text: '  "Error: failed to solve: rpc error: code = Unknown desc = failed to compute cache"' },
        { type: 'info', text: '💡 Analysis:' },
        { type: 'info', text: '  The build cache is corrupted due to an ungraceful system termination.' },
        { type: 'code', text: `To fix, clear your builder cache with:
$ docker builder prune -af` },
        { type: 'success', text: '✔ Checked workspace files. Read-only session completed.' }
      ]
    },
    {
      id: 'scheduler',
      label: '5. Scheduler',
      command: 'jerob jet',
      output: [
        { type: 'input', text: '$ jerob jet' },
        { type: 'system', text: '✨ Welcome to Jerob — Personal AI Operator' },
        { type: 'prompt', text: '? Choose mode: ⏰ Scheduler' },
        { type: 'prompt', text: '? Enter task: "Every Monday, crawl competitor pricing and send changes"' },
        { type: 'system', text: '📅 Registering serverless CRON trigger...' },
        { type: 'info', text: 'ℹ Cron schedule: 0 9 * * 1 (Every Monday at 09:00 UTC)' },
        { type: 'info', text: 'ℹ Syncing environment keys to Supabase Vault...' },
        { type: 'success', text: '✔ Supabase Edge Function deployed.' },
        { type: 'success', text: '✔ Credentials encrypted and locked in database tables.' },
        { type: 'info', text: 'Run "jerob scheduler-debug" to test connection.' }
      ]
    }
  ];

  const currentTab = tabs.find(t => t.id === activeTab) || tabs[0];

  // Reset lines and run typing simulation whenever tab changes
  useEffect(() => {
    setIsRunning(true);
    setVisibleLines(0);
    const intervals: any[] = [];
    
    // Simulate typing/revealing lines sequentially
    currentTab.output.forEach((_, idx) => {
      const timeout = setTimeout(() => {
        setVisibleLines(prev => prev + 1);
        if (idx === currentTab.output.length - 1) {
          setIsRunning(false);
        }
      }, (idx + 1) * 350); // delay per line
      intervals.push(timeout);
    });

    return () => {
      intervals.forEach(clearTimeout);
    };
  }, [activeTab]);

  const handleCopy = () => {
    navigator.clipboard.writeText(currentTab.command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto glass-panel glass-panel-glow rounded-2xl overflow-hidden shadow-2xl border border-white/5 relative">
      {/* Top Bar / Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-background-card/80 border-b border-white/5">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500/80" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <span className="w-3 h-3 rounded-full bg-green-500/80" />
          <span className="text-xs font-mono text-slate-500 ml-2 select-none">jerob@sandbox:~</span>
        </div>

        {/* Command Display */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-black/40 rounded-lg border border-white/5 max-w-[400px]">
          <Terminal className="w-3.5 h-3.5 text-primary-cyan animate-pulse" />
          <span className="text-[11px] font-mono text-slate-400 truncate">{currentTab.command}</span>
        </div>

        {/* Action Button */}
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-2.5 py-1 rounded-md border border-white/5"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-emerald-400" />
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Main Terminal Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 min-h-[360px] bg-black/60 backdrop-blur-md">
        {/* Terminal Sidebar Modes */}
        <div className="flex md:flex-col border-b md:border-b-0 md:border-r border-white/5 p-2 gap-1 overflow-x-auto md:overflow-x-visible select-none bg-background-card/25">
          <div className="hidden md:block text-[9px] font-mono font-bold tracking-widest text-slate-500 px-3 py-1.5 uppercase">
            OPERATOR MODES
          </div>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-mono transition-all text-left whitespace-nowrap md:w-full ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-primary-blue/10 to-primary-violet/10 border border-primary-blue/30 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${
                activeTab === tab.id ? 'bg-cyan-400 animate-pulse' : 'bg-slate-600'
              }`} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Console Log Screen */}
        <div className="col-span-3 p-4 md:p-6 font-mono text-[13px] leading-relaxed overflow-y-auto max-h-[380px] min-h-[300px]">
          <div className="flex flex-col gap-2">
            <AnimatePresence mode="popLayout">
              {currentTab.output.slice(0, visibleLines).map((line, index) => {
                let colorClass = 'text-slate-300';
                if (line.type === 'input') colorClass = 'text-cyan-400 font-bold';
                else if (line.type === 'system') colorClass = 'text-slate-500';
                else if (line.type === 'success') colorClass = 'text-emerald-400';
                else if (line.type === 'warn') colorClass = 'text-amber-400';
                else if (line.type === 'info') colorClass = 'text-blue-400';
                else if (line.type === 'prompt') colorClass = 'text-violet-400 font-bold';
                else if (line.type === 'code') colorClass = 'text-slate-400 bg-white/[0.02] p-2.5 rounded-lg border border-white/5 block overflow-x-auto text-[11px] whitespace-pre';

                return (
                  <motion.div
                    key={`${activeTab}-line-${index}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className={colorClass}
                  >
                    {line.type === 'code' ? (
                      <code className="block">{line.text}</code>
                    ) : (
                      line.text
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {/* Typing Indicator */}
            {isRunning && (
              <div className="flex items-center gap-1 text-slate-500 text-xs mt-1 animate-pulse">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                <span>Jerob execution trace active...</span>
              </div>
            )}

            {/* Static command prompt with blinking cursor */}
            {!isRunning && (
              <div className="flex items-center gap-1.5 text-cyan-400 mt-2">
                <span>$</span>
                <span className="w-2 h-4 bg-cyan-400 animate-pulse" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Terminal Footer Status Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-background-card/50 border-t border-white/5 text-[10px] font-mono text-slate-500">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <Activity className="w-3 h-3 text-cyan-400" />
            CPU: 1.2%
          </span>
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            SECURE EXECUTION
          </span>
        </div>
        <span>v1.2.2</span>
      </div>
    </div>
  );
};
