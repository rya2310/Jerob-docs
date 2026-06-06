import React, { useState } from 'react';
import { Copy, Check, GitBranch } from 'lucide-react';

interface Step {
  num: string;
  title: string;
  desc: string;
  command: string;
  subcommand?: string;
  sublabel?: string;
}

export const InstallationSection: React.FC = () => {
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);
  const [installTab, setInstallTab] = useState<'npm' | 'git'>('npm');

  const handleCopy = (text: string, index: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const npmSteps: Step[] = [
    {
      num: '01',
      title: 'Install Bun Runtime',
      desc: 'Jerob relies on Bun for high-speed JS engine parsing and container scripting.',
      command: 'curl -fsSL https://bun.sh/install | bash',
      subcommand: 'powershell -c "irm bun.sh/install.ps1 | iex"',
      sublabel: 'Windows (PowerShell)',
    },
    {
      num: '02',
      title: 'Install Jerob Globally',
      desc: 'Install the package globally using the Node Package Manager in your terminal.',
      command: 'npm install -g jerob',
    },
    {
      num: '03',
      title: 'Run Wizard Launcher',
      desc: 'Starts the encrypted credentials manager and checks local database sync profiles.',
      command: 'jerob jet',
    },
  ];

  const gitSteps: Step[] = [
    {
      num: '01',
      title: 'Clone Repository',
      desc: 'Fetch the source code directly from our public GitHub workspace.',
      command: 'git clone https://github.com/ABHI-Theq/Jerob-Personal_AI_Operator.git',
    },
    {
      num: '02',
      title: 'Install Local Dependencies',
      desc: 'Navigate into the folder and link the bin triggers via Bun compiler.',
      command: 'cd Jerob-Personal_AI_Operator && bun install',
      subcommand: 'bun link',
      sublabel: 'Register CLI',
    },
    {
      num: '03',
      title: 'Launch Jerob Shell',
      desc: 'Run the freshly linked CLI binary directly in developer mode.',
      command: 'jerob jet',
    },
  ];

  const activeSteps = installTab === 'npm' ? npmSteps : gitSteps;

  return (
    <div className="w-full bg-background-card/20 border border-white/5 rounded-3xl p-6 md:p-8 relative overflow-hidden">
      {/* Glow backing */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-blue-500/10 to-transparent pointer-events-none filter blur-[80px]" />

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-white/5 pb-6 mb-8">
        <div>
          <span className="text-xs font-mono font-bold tracking-widest text-slate-500 uppercase">Getting Started</span>
          <h3 className="text-2xl font-bold tracking-tight text-white mt-1 leading-tight">
            Install and run in seconds
          </h3>
          <p className="text-xs text-slate-400 mt-1 max-w-md">
            No environment configurations required on start. The setup wizard creates and locks encrypted database files automatically.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 p-1 bg-black/40 rounded-xl border border-white/5 font-mono text-xs select-none">
          <button
            onClick={() => setInstallTab('npm')}
            className={`px-4 py-1.5 rounded-lg transition-all ${
              installTab === 'npm'
                ? 'bg-white/5 border border-white/10 text-white font-semibold shadow-inner'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            npm install
          </button>
          <button
            onClick={() => setInstallTab('git')}
            className={`px-4 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              installTab === 'git'
                ? 'bg-white/5 border border-white/10 text-white font-semibold shadow-inner'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <GitBranch className="w-3.5 h-3.5" />
            Git source
          </button>
        </div>
      </div>

      {/* Grid Steps Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
        {activeSteps.map((step, idx) => (
          <div key={idx} className="flex flex-col justify-between space-y-4 relative">
            {/* Visual connector lines */}
            {idx < 2 && (
              <div className="hidden lg:block absolute top-7 left-[calc(100%-20px)] w-[40px] h-0.5 bg-gradient-to-r from-white/10 to-transparent z-0 pointer-events-none" />
            )}

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-bold text-slate-500 bg-white/5 border border-white/5 w-7 h-7 rounded-lg flex items-center justify-center">
                  {step.num}
                </span>
                <h4 className="text-sm font-bold text-white tracking-tight">
                  {step.title}
                </h4>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed min-h-[40px]">
                {step.desc}
              </p>
            </div>

            {/* Terminal Copy Panel */}
            <div className="space-y-2">
              <div className="relative group bg-black/60 rounded-xl border border-white/5 p-3.5 font-mono text-[11px] leading-relaxed flex items-center justify-between text-slate-300">
                <div className="flex-1 truncate pr-8">
                  <span className="text-slate-500 select-none mr-2.5">$</span>
                  <span>{step.command}</span>
                </div>
                <button
                  onClick={() => handleCopy(step.command, `${installTab}-${idx}-1`)}
                  className="absolute right-3 top-3.5 p-1 rounded bg-white/5 border border-white/5 text-slate-400 hover:text-white transition-all opacity-0 group-hover:opacity-100"
                >
                  {copiedIndex === `${installTab}-${idx}-1` ? (
                    <Check className="w-3 h-3 text-emerald-400" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                </button>
              </div>

              {/* Windows Fallback Command */}
              {step.subcommand && (
                <div className="space-y-1">
                  <span className="text-[9px] font-mono text-slate-500 block uppercase pl-1">
                    {step.sublabel}
                  </span>
                  <div className="relative group bg-black/60 rounded-xl border border-white/5 p-3.5 font-mono text-[11px] leading-relaxed flex items-center justify-between text-slate-300">
                    <div className="flex-1 truncate pr-8">
                      <span className="text-slate-500 select-none mr-2.5">$</span>
                      <span>{step.subcommand}</span>
                    </div>
                    <button
                      onClick={() => handleCopy(step.subcommand!, `${installTab}-${idx}-2`)}
                      className="absolute right-3 top-3.5 p-1 rounded bg-white/5 border border-white/5 text-slate-400 hover:text-white transition-all opacity-0 group-hover:opacity-100"
                    >
                      {copiedIndex === `${installTab}-${idx}-2` ? (
                        <Check className="w-3 h-3 text-emerald-400" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
