import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, BookOpen, Terminal, Settings, Cpu, Command, X, Check, Copy, 
  Play, ChevronRight, ShieldCheck, CpuIcon, 
  HelpCircle, Code, ListChecks, FileText, Menu, ChevronLeft, ExternalLink 
} from 'lucide-react';

interface DocsSection {
  id: string;
  title: string;
  category: string;
  breadcrumbs: string[];
  headings: { id: string; text: string }[];
  content: React.ReactNode;
}

export const DocumentationHub: React.FC = () => {
  const [activeDoc, setActiveDoc] = useState<string>('intro');
  const [isPaletteOpen, setIsPaletteOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [playgroundOutput, setPlaygroundOutput] = useState<string[]>([
    'Welcome to Jerob CLI Sandbox Console.',
    'Execute simulated workflows by clicking the buttons in the action pane below.'
  ]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Keyboard shortcut Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const runPlaygroundCommand = (cmd: string) => {
    if (isPlaying) return;
    setIsPlaying(true);
    setPlaygroundOutput(prev => [...prev, `\n$ ${cmd}`]);

    let logs: string[] = [];
    if (cmd === 'jerob jet') {
      logs = [
        '✨ Welcome to Jerob Setup Wizard!',
        '? Enter security password to salt key vault: **********',
        '✔ Crypt key generated with local bcrypt hash.',
        '? Select primary operator model: OpenRouter (free)',
        '? Select fallback mode: Groq llama-3.3-70b',
        '✔ Setup complete. Credentials saved locally.'
      ];
    } else if (cmd === 'jerob set-key') {
      logs = [
        '⚙  Choose API credentials to update:',
        '   1) OpenRouter  2) Google Gemini  3) Anthropic  4) Supabase',
        'Selected: Google Gemini API Key',
        '? Enter API Key: AIzaSy****************',
        '✔ Encrypted with AES-256 and written to local database.'
      ];
    } else if (cmd === 'jerob sync-credentials') {
      logs = [
        '🔑 Querying local encrypted token cache...',
        '🛰 Connecting to Supabase project environment...',
        '✔ Authenticated using Service Role Key.',
        '✔ Synchronized credentials in database schema vaults.'
      ];
    } else if (cmd === 'jerob scheduler-debug') {
      logs = [
        '🔍 Auditing Supabase Cron triggers...',
        'ℹ Check Edge Function: online (latency 35ms)',
        'ℹ Check Vault tables RLS policies: OK',
        '✔ 0 alerts. background queue operating at 100% capacity.'
      ];
    }

    logs.forEach((log, index) => {
      setTimeout(() => {
        setPlaygroundOutput(prev => [...prev, log]);
        if (index === logs.length - 1) {
          setIsPlaying(false);
        }
      }, (index + 1) * 300);
    });
  };

  const sections: DocsSection[] = [
    {
      id: 'intro',
      category: 'GETTING STARTED',
      breadcrumbs: ['Docs', 'Getting Started', 'Introduction'],
      title: 'Introduction to Jerob',
      headings: [
        { id: 'what-is-jerob', text: 'What is Jerob?' },
        { id: 'core-features', text: 'Core Design' },
        { id: 'architecture', text: 'Architectural Model' }
      ],
      content: (
        <div className="space-y-6">
          <p id="what-is-jerob" className="text-slate-300 leading-relaxed font-sans text-sm">
            <strong>Jerob</strong> is a personal, terminal-first AI agent that runs on your local machine. It combines autonomous file/code writing, multi-step scheduling, Gemini-based browser automation, workspace Q&A, and background task scheduling on Supabase Edge Functions.
          </p>

          <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/10 flex items-start gap-3 my-4">
            <Cpu className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Developer-First Philosophy</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Jerob is built for engineers who want AI assistance directly inside their existing terminals. Unlike traditional web consoles, Jerob has access to local files and shell execution environments, and runs autonomously but strictly requires manual approval before writing changes.
              </p>
            </div>
          </div>

          <h3 id="core-features" className="text-sm font-bold text-white uppercase tracking-widest font-mono">Core Design</h3>
          <ul className="list-disc pl-5 space-y-2 text-xs text-slate-400 leading-relaxed">
            <li><strong>Minimal Footprint</strong>: Zero heavy web interface requirements. Fits entirely in your shell process.</li>
            <li><strong>Security Boundary</strong>: Generates code files inside a gVisor sandboxed environment and presents visual diffs.</li>
            <li><strong>Serverless Handoff</strong>: Offloads repetitive background workflows to run 24/7 on Supabase Edge Crons.</li>
          </ul>

          <h3 id="architecture" className="text-sm font-bold text-white uppercase tracking-widest font-mono">Architectural Model</h3>
          <div className="p-4 rounded-xl bg-black/40 border border-white/5 font-mono text-[11px] leading-relaxed text-slate-400">
            <div className="flex justify-between items-center bg-white/5 p-2 rounded-lg mb-2">
              <span className="text-cyan-400">1. Local CLI Shell</span>
              <span>Input goals & authenticate</span>
            </div>
            <div className="flex justify-between items-center bg-white/5 p-2 rounded-lg mb-2">
              <span className="text-violet-400">2. Provider Routing</span>
              <span>Resolves queries with fallback mappings</span>
            </div>
            <div className="flex justify-between items-center bg-white/5 p-2 rounded-lg">
              <span className="text-pink-400">3. Supabase edge crons</span>
              <span>Executes schedules in serverless containers</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'install',
      category: 'GETTING STARTED',
      breadcrumbs: ['Docs', 'Getting Started', 'Installation'],
      title: 'Installation Guide',
      headings: [
        { id: 'prerequisites', text: 'Prerequisites' },
        { id: 'npm-installation', text: 'NPM Global Install' },
        { id: 'git-contributor', text: 'Build from Source' }
      ],
      content: (
        <div className="space-y-6">
          <h3 id="prerequisites" className="text-sm font-bold text-white uppercase tracking-widest font-mono">Prerequisites</h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            Jerob runs on the high-performance **Bun runtime**. Before installing the CLI, deploy Bun inside your workstation:
          </p>

          <div className="space-y-3">
            <div>
              <span className="text-[10px] font-mono text-slate-500 uppercase block pl-1">macOS / Linux Shell</span>
              <div className="relative group mt-1">
                <pre className="bg-black/60 border border-white/5 p-3.5 rounded-xl font-mono text-xs text-slate-200 overflow-x-auto">
                  <code>curl -fsSL https://bun.sh/install | bash</code>
                </pre>
                <button
                  onClick={() => copyToClipboard('curl -fsSL https://bun.sh/install | bash', 'inst-bun-mac')}
                  className="absolute right-3 top-3.5 p-1 rounded bg-white/5 border border-white/5 text-slate-400 hover:text-white opacity-0 group-hover:opacity-100 transition-all"
                >
                  {copiedCode === 'inst-bun-mac' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <div>
              <span className="text-[10px] font-mono text-slate-500 uppercase block pl-1">Windows (PowerShell)</span>
              <div className="relative group mt-1">
                <pre className="bg-black/60 border border-white/5 p-3.5 rounded-xl font-mono text-xs text-slate-200 overflow-x-auto">
                  <code>powershell -c &quot;irm bun.sh/install.ps1 | iex&quot;</code>
                </pre>
                <button
                  onClick={() => copyToClipboard('powershell -c "irm bun.sh/install.ps1 | iex"', 'inst-bun-win')}
                  className="absolute right-3 top-3.5 p-1 rounded bg-white/5 border border-white/5 text-slate-400 hover:text-white opacity-0 group-hover:opacity-100 transition-all"
                >
                  {copiedCode === 'inst-bun-win' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>

          <h3 id="npm-installation" className="text-sm font-bold text-white uppercase tracking-widest font-mono">NPM Global Install</h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            Deploy the latest release package globally using the standard node installer:
          </p>

          <div className="relative group">
            <pre className="bg-black/60 border border-white/5 p-3.5 rounded-xl font-mono text-xs text-slate-200 overflow-x-auto">
              <code>npm install -g jerob</code>
            </pre>
            <button
              onClick={() => copyToClipboard('npm install -g jerob', 'inst-jerob')}
              className="absolute right-3 top-3.5 p-1 rounded bg-white/5 border border-white/5 text-slate-400 hover:text-white opacity-0 group-hover:opacity-100 transition-all"
            >
              {copiedCode === 'inst-jerob' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>

          <h3 id="git-contributor" className="text-sm font-bold text-white uppercase tracking-widest font-mono">Build from Source</h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            For contributions or bleeding-edge updates, build the binary locally:
          </p>

          <div className="relative group">
            <pre className="bg-black/60 border border-white/5 p-3.5 rounded-xl font-mono text-xs text-slate-200 overflow-x-auto">
              <code>git clone https://github.com/ABHI-Theq/Jerob-Personal_AI_Operator.git&#10;cd Jerob-Personal_AI_Operator&#10;bun install&#10;bun link</code>
            </pre>
            <button
              onClick={() => copyToClipboard('git clone https://github.com/ABHI-Theq/Jerob-Personal_AI_Operator.git\ncd Jerob-Personal_AI_Operator\nbun install\nbun link', 'inst-git')}
              className="absolute right-3 top-3.5 p-1 rounded bg-white/5 border border-white/5 text-slate-400 hover:text-white opacity-0 group-hover:opacity-100 transition-all"
            >
              {copiedCode === 'inst-git' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      )
    },
    {
      id: 'quickstart',
      category: 'GETTING STARTED',
      breadcrumbs: ['Docs', 'Getting Started', 'Quick Start'],
      title: 'Quick Start',
      headings: [
        { id: 'first-launch', text: 'First Launch' },
        { id: 'setup-wizard', text: 'Encrypted Wizard' },
        { id: 'test-command', text: 'Run Test Ask' }
      ],
      content: (
        <div className="space-y-6">
          <h3 id="first-launch" className="text-sm font-bold text-white uppercase tracking-widest font-mono">First Launch</h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            Open your terminal and initialize the setup engine by launching:
          </p>
          <pre className="bg-black/60 border border-white/5 p-3.5 rounded-xl font-mono text-xs text-slate-200">
            <code>jerob jet</code>
          </pre>

          <h3 id="setup-wizard" className="text-sm font-bold text-white uppercase tracking-widest font-mono">Encrypted Wizard</h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            On first use, Jerob will start an interactive setup dashboard:
          </p>
          <ol className="list-decimal pl-5 space-y-2 text-xs text-slate-400 leading-relaxed">
            <li><strong>Encrypt Passphrase</strong>: Enter a password. This salts and generates local key vaults via bcrypt.</li>
            <li><strong>Provide API Keys</strong>: Insert your OpenRouter (free/paid), Google Gemini, or Anthropic keys.</li>
            <li><strong>Credentials Database</strong>: Setup triggers will generate encrypted in-memory environment variables.</li>
          </ol>

          <h3 id="test-command" className="text-sm font-bold text-white uppercase tracking-widest font-mono">Run Test Ask</h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            Once setup exits, verify core processing with a read-only request:
          </p>
          <pre className="bg-black/60 border border-white/5 p-3.5 rounded-xl font-mono text-xs text-slate-200">
            <code>jerob jet --mode ask "How many typescript files are in the src/ folder?"</code>
          </pre>
        </div>
      )
    },
    {
      id: 'agent',
      category: 'CORE MODES',
      breadcrumbs: ['Docs', 'Core Modes', 'Agent Mode'],
      title: '🤖 Agent Mode',
      headings: [
        { id: 'agent-ops', text: 'Autonomous Operations' },
        { id: 'sandbox-isolation', text: 'Sandbox Boundaries' },
        { id: 'approval-checks', text: 'Visual Diff Approval' }
      ],
      content: (
        <div className="space-y-6">
          <h3 id="agent-ops" className="text-sm font-bold text-white uppercase tracking-widest font-mono">Autonomous Operations</h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            Agent Mode allows Jerob to make file modifications and run testing frameworks within your project workspace. Simply supply a natural language goal:
          </p>
          <pre className="bg-black/60 border border-white/5 p-3.5 rounded-xl font-mono text-xs text-slate-200">
            <code>jerob jet --mode agent "add a payment utility for processing stripe invoice hooks"</code>
          </pre>

          <h3 id="sandbox-isolation" className="text-sm font-bold text-white uppercase tracking-widest font-mono">Sandbox Boundaries</h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            To safeguard files, code changes are evaluated inside sandboxed node workers. The agent drafts scripts, checks local config boundaries, and ensures syntax compiles correctly before proposing changes.
          </p>

          <h3 id="approval-checks" className="text-sm font-bold text-white uppercase tracking-widest font-mono">Visual Diff Approval</h3>
          <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/20 text-xs leading-relaxed text-slate-300 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-white">Security Assertion:</span>
              <p className="text-slate-400 mt-1">
                Jerob strictly blocks file mutations from writing directly. The agent renders a standard visual Git-style diff in terminal, prompting for a `Y/n` input.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'plan',
      category: 'CORE MODES',
      breadcrumbs: ['Docs', 'Core Modes', 'Plan Mode'],
      title: '🧭 Plan Mode',
      headings: [
        { id: 'generating-plans', text: 'Structured Planning' },
        { id: 'edit-plans', text: 'Step Review & Editing' },
        { id: 'handoff', text: 'Agent Execution Handoff' }
      ],
      content: (
        <div className="space-y-6">
          <h3 id="generating-plans" className="text-sm font-bold text-white uppercase tracking-widest font-mono">Structured Planning</h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            Plan Mode decomposes complex projects into sequential task graphs. Instead of modifying files immediately, the LLM plans migration files, API setups, and compiler runs:
          </p>
          <pre className="bg-black/60 border border-white/5 p-3.5 rounded-xl font-mono text-xs text-slate-200">
            <code>jerob jet --mode plan "migrate auth tables and configure Google login callbacks"</code>
          </pre>

          <h3 id="edit-plans" className="text-sm font-bold text-white uppercase tracking-widest font-mono">Step Review & Editing</h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            The CLI yields a interactive task list. Users can toggle individual steps, add details to logic nodes, or exclude tasks.
          </p>

          <h3 id="handoff" className="text-sm font-bold text-white uppercase tracking-widest font-mono">Agent Execution Handoff</h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            Once approved, Plan Mode hands the entire instruction tree to Agent Mode. The agent completes the steps one-by-one, reviewing compiling metrics after each run.
          </p>
        </div>
      )
    },
    {
      id: 'browser',
      category: 'CORE MODES',
      breadcrumbs: ['Docs', 'Core Modes', 'Browser Agent Mode'],
      title: '🌐 Browser Agent Mode',
      headings: [
        { id: 'playwright-gemini', text: 'Gemini-Powered Playwright' },
        { id: 'profile-sharing', text: 'Browser Profile Sharing' },
        { id: 'selector-resolution', text: 'Dynamic Selector Parsing' }
      ],
      content: (
        <div className="space-y-6">
          <h3 id="playwright-gemini" className="text-sm font-bold text-white uppercase tracking-widest font-mono">Gemini-Powered Playwright</h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            Jerob controls a headless browser using Playwright automation. This is driven by **Google Gemini** vision models which understand webpage layouts:
          </p>
          <pre className="bg-black/60 border border-white/5 p-3.5 rounded-xl font-mono text-xs text-slate-200">
            <code>jerob jet --mode browser "login to my stripe panel and download invoice reports"</code>
          </pre>

          <h3 id="profile-sharing" className="text-sm font-bold text-white uppercase tracking-widest font-mono">Browser Profile Sharing</h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            Jerob connects directly to your local Chrome or Brave browser profiles. This inherits existing cookies and sessions—meaning you are already logged in to your core SaaS platforms, eliminating the need to store passwords in script code.
          </p>

          <h3 id="selector-resolution" className="text-sm font-bold text-white uppercase tracking-widest font-mono">Dynamic Selector Parsing</h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            Unlike rigid scripts that break on minor HTML shifts, Gemini reads the browser DOM layout dynamically to resolve button selectors and form fields on the fly.
          </p>
        </div>
      )
    },
    {
      id: 'ask',
      category: 'CORE MODES',
      breadcrumbs: ['Docs', 'Core Modes', 'Ask Mode'],
      title: '❓ Ask Mode',
      headings: [
        { id: 'conversational-qa', text: 'Workspace QA' },
        { id: 'context-sources', text: 'Read-Only Context' },
        { id: 'external-search', text: 'Firecrawl Search & Gmail' }
      ],
      content: (
        <div className="space-y-6">
          <h3 id="conversational-qa" className="text-sm font-bold text-white uppercase tracking-widest font-mono">Workspace QA</h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            Ask Mode provides developer Q&A with deep context from workspace files, project setups, and configuration settings:
          </p>
          <pre className="bg-black/60 border border-white/5 p-3.5 rounded-xl font-mono text-xs text-slate-200">
            <code>jerob jet --mode ask "why is my build failing in components/PaymentGateway.tsx?"</code>
          </pre>

          <h3 id="context-sources" className="text-sm font-bold text-white uppercase tracking-widest font-mono">Read-Only Context</h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            Ask Mode is strictly read-only. It reads and indices project files into a local context buffer, but is completely blocked from modifying file structures on disk.
          </p>

          <h3 id="external-search" className="text-sm font-bold text-white uppercase tracking-widest font-mono">Firecrawl Search & Gmail</h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            Jerob can trigger web searches (via Firecrawl API integration) and search user Gmail mailboxes when given OAuth read access, consolidating research tasks in one place.
          </p>
        </div>
      )
    },
    {
      id: 'scheduler',
      category: 'CORE MODES',
      breadcrumbs: ['Docs', 'Core Modes', 'Scheduler Mode'],
      title: '⏰ Scheduler Mode',
      headings: [
        { id: 'supabase-crons', text: 'Supabase Serverless crons' },
        { id: 'provisioning', text: 'Automated Micro-VM Provisioning' },
        { id: 'running-cron', text: 'Deploying Tasks' }
      ],
      content: (
        <div className="space-y-6">
          <h3 id="supabase-crons" className="text-sm font-bold text-white uppercase tracking-widest font-mono">Supabase Serverless crons</h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            Scheduler Mode allows user workflows to run continuously on **Supabase Edge Functions**. The triggers operate 24/7 in the cloud—even when your laptop is completely offline.
          </p>

          <h3 id="provisioning" className="text-sm font-bold text-white uppercase tracking-widest font-mono">Automated Micro-VM Provisioning</h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            When syncing a task, Jerob contacts your Supabase project, sets up key vault schemas, configures pg_cron tables, and deploys TypeScript edge functions automatically.
          </p>

          <h3 id="running-cron" className="text-sm font-bold text-white uppercase tracking-widest font-mono">Deploying Tasks</h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            Pass a plain-english task and a cron timer. Jerob splits it into API calls, browser scrapes, and email reports:
          </p>
          <pre className="bg-black/60 border border-white/5 p-3.5 rounded-xl font-mono text-xs text-slate-200">
            <code>jerob jet --mode scheduler "Every morning at 8am, scrape HN frontpage and email me a summary"</code>
          </pre>
        </div>
      )
    },
    {
      id: 'providers',
      category: 'INTEGRATIONS & SEC',
      breadcrumbs: ['Docs', 'Integrations', 'AI Providers'],
      title: 'AI Providers & Mappings',
      headings: [
        { id: 'supported-models', text: 'Default Mappings' },
        { id: 'switch-models', text: 'CLI Model Switches' },
        { id: 'fallback-rules', text: 'Outage Redundancy' }
      ],
      content: (
        <div className="space-y-6">
          <h3 id="supported-models" className="text-sm font-bold text-white uppercase tracking-widest font-mono">Default Mappings</h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            Jerob connects dynamically with multiple LLM API endpoints. By default, tasks are routed to:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-xs text-slate-400 leading-relaxed">
            <li><strong>OpenRouter</strong>: default for coding and general prompts (`openrouter/free` or paid Claude models).</li>
            <li><strong>Gemini</strong>: default for parsing selector trees in browser automation (`gemini-2.5-flash`).</li>
            <li><strong>Groq</strong>: fallback for Supabase Edge Functions execution (`llama-3.3-70b-versatile`).</li>
          </ul>

          <h3 id="switch-models" className="text-sm font-bold text-white uppercase tracking-widest font-mono">CLI Model Switches</h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            Override provider model mappings instantly in your command line:
          </p>
          <pre className="bg-black/60 border border-white/5 p-3.5 rounded-xl font-mono text-xs text-slate-200">
            <code>jerob switch-model</code>
          </pre>

          <h3 id="fallback-rules" className="text-sm font-bold text-white uppercase tracking-widest font-mono">Outage Redundancy</h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            If a primary API endpoint times out or yields a rate limit error, Jerob auto-reroutes the payload to your defined fallback options, with Groq acting as the final local fallback.
          </p>
        </div>
      )
    },
    {
      id: 'security',
      category: 'INTEGRATIONS & SEC',
      breadcrumbs: ['Docs', 'Security', 'Data Protection'],
      title: 'Security & Key Encryption',
      headings: [
        { id: 'aes-encryption', text: 'Local AES-256' },
        { id: 'bcrypt-auth', text: 'Bcrypt Verification' },
        { id: 'supabase-rls', text: 'Supabase RLS Policies' }
      ],
      content: (
        <div className="space-y-6">
          <h3 id="aes-encryption" className="text-sm font-bold text-white uppercase tracking-widest font-mono">Local AES-256</h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            All credentials, API keys, and OAuth variables are encrypted using **AES-256-GCM** before writing to local configurations. Env files are loaded dynamically in-memory and wiped immediately upon process exit.
          </p>

          <h3 id="bcrypt-auth" className="text-sm font-bold text-white uppercase tracking-widest font-mono">Bcrypt Verification</h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            Your encryption passphrase is salted and validated with local **bcrypt** hashes. The master password is never stored on disk, preventing key extraction if your workstation is compromised.
          </p>

          <h3 id="supabase-rls" className="text-sm font-bold text-white uppercase tracking-widest font-mono">Supabase RLS Policies</h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            Edge Function keys synced to your Supabase project are shielded behind Row Level Security (RLS). Database tables can only be queried by the authorized Service Role, blocking public access.
          </p>
        </div>
      )
    },
    {
      id: 'commands',
      category: 'INTEGRATIONS & SEC',
      breadcrumbs: ['Docs', 'Integrations', 'CLI Commands'],
      title: 'CLI Commands Reference',
      headings: [
        { id: 'core-commands', text: 'Core Operations' },
        { id: 'database-commands', text: 'Database & Sync' },
        { id: 'diagnostics', text: 'Diagnostics' }
      ],
      content: (
        <div className="space-y-6">
          <h3 id="core-commands" className="text-sm font-bold text-white uppercase tracking-widest font-mono">Core Operations</h3>
          <div className="space-y-3 font-mono text-xs">
            <div className="p-3 bg-black/40 border border-white/5 rounded-xl">
              <span className="text-cyan-400 font-bold">jerob jet</span>
              <p className="text-slate-400 mt-1 font-sans">Starts the CLI setup wizard or triggers an interactive prompt menu.</p>
            </div>
            <div className="p-3 bg-black/40 border border-white/5 rounded-xl">
              <span className="text-cyan-400 font-bold">jerob set-key</span>
              <p className="text-slate-400 mt-1 font-sans">Prompt to input or update API tokens (saves encrypted).</p>
            </div>
            <div className="p-3 bg-black/40 border border-white/5 rounded-xl">
              <span className="text-cyan-400 font-bold">jerob switch-model</span>
              <p className="text-slate-400 mt-1 font-sans">Modify model mapping defaults for active providers.</p>
            </div>
            <div className="p-3 bg-black/40 border border-white/5 rounded-xl">
              <span className="text-cyan-400 font-bold">jerob reset-auth</span>
              <p className="text-slate-400 mt-1 font-sans">Purges local master passwords and keys. Restarts the setup engine.</p>
            </div>
          </div>

          <h3 id="database-commands" className="text-sm font-bold text-white uppercase tracking-widest font-mono">Database & Sync</h3>
          <div className="space-y-3 font-mono text-xs">
            <div className="p-3 bg-black/40 border border-white/5 rounded-xl">
              <span className="text-violet-400 font-bold">jerob sync-credentials</span>
              <p className="text-slate-400 mt-1 font-sans">Encrypts and pushes credentials cache to Supabase Vault tables.</p>
            </div>
            <div className="p-3 bg-black/40 border border-white/5 rounded-xl">
              <span className="text-violet-400 font-bold">jerob setup-db</span>
              <p className="text-slate-400 mt-1 font-sans">Deploys pg_cron migrations and Edge Functions directly to Supabase project.</p>
            </div>
          </div>

          <h3 id="diagnostics" className="text-sm font-bold text-white uppercase tracking-widest font-mono">Diagnostics</h3>
          <div className="p-3 bg-black/40 border border-white/5 rounded-xl font-mono text-xs">
            <span className="text-pink-400 font-bold">jerob scheduler-debug</span>
            <p className="text-slate-400 mt-1 font-sans">Checks Edge Function latency, db vaults, and triggers a simulated test cron run.</p>
          </div>
        </div>
      )
    },
    {
      id: 'examples',
      category: 'INTEGRATIONS & SEC',
      breadcrumbs: ['Docs', 'Guides', 'Real-World Examples'],
      title: 'Real-World Examples',
      headings: [
        { id: 'news-scraper', text: 'AI News Summarizer' },
        { id: 'competitor-tracker', text: 'Competitor Billing Tracker' },
        { id: 'research-digest', text: 'Research Automation' }
      ],
      content: (
        <div className="space-y-6">
          <h3 id="news-scraper" className="text-sm font-bold text-white uppercase tracking-widest font-mono">AI News Summarizer</h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            Crawls research databases and dispatches summaries via email. Run this serverless task globally:
          </p>
          <pre className="bg-black/60 border border-white/5 p-3.5 rounded-xl font-mono text-xs text-slate-200 overflow-x-auto">
            <code>jerob jet --mode scheduler "Every morning at 9am, search arXiv for 'agentic LLM' and email me summaries"</code>
          </pre>

          <h3 id="competitor-tracker" className="text-sm font-bold text-white uppercase tracking-widest font-mono">Competitor Billing Tracker</h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            Deploy a browser routine that monitors competitor pricing changes:
          </p>
          <pre className="bg-black/60 border border-white/5 p-3.5 rounded-xl font-mono text-xs text-slate-200 overflow-x-auto">
            <code>jerob jet --mode scheduler "Every Monday, scrape competitor.io/pricing and slack me changes"</code>
          </pre>

          <h3 id="research-digest" className="text-sm font-bold text-white uppercase tracking-widest font-mono">Research Automation</h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            Auto-checks OpenFDA approvals and maps biological target records:
          </p>
          <pre className="bg-black/60 border border-white/5 p-3.5 rounded-xl font-mono text-xs text-slate-200 overflow-x-auto">
            <code>jerob jet --mode scheduler "At midnight, scan OpenFDA approvals and write targets to reports/target.json"</code>
          </pre>
        </div>
      )
    },
    {
      id: 'configuration',
      category: 'INTEGRATIONS & SEC',
      breadcrumbs: ['Docs', 'Configuration', 'Settings Schema'],
      title: 'Configuration Schema',
      headings: [
        { id: 'json-config', text: 'Local JSON Schema' },
        { id: 'model-overrides', text: 'Model Configuration' },
        { id: 'env-variables', text: 'Environment Hooks' }
      ],
      content: (
        <div className="space-y-6">
          <h3 id="json-config" className="text-sm font-bold text-white uppercase tracking-widest font-mono">Local JSON Schema</h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            Local setup variables are written to `~/.cccontrol/config.json`. The keys and secret tokens are encrypted and structured as:
          </p>
          <pre className="bg-black/60 border border-white/5 p-3.5 rounded-xl font-mono text-xs text-slate-200 overflow-x-auto">
            <code>&#123;&#10;  "primaryProvider": "openrouter",&#10;  "fallbackProvider": "groq",&#10;  "supabase": &#123;&#10;    "url": "https://xyz.supabase.co",&#10;    "vaultEnabled": true&#10;  &#125;&#10;&#125;</code>
          </pre>

          <h3 id="model-overrides" className="text-sm font-bold text-white uppercase tracking-widest font-mono">Model Configuration</h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            Model assignments are updated dynamically. Jerob reads provider keys, tests API connections, and locks assignments into the configuration buffer.
          </p>

          <h3 id="env-variables" className="text-sm font-bold text-white uppercase tracking-widest font-mono">Environment Hooks</h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            Environmental keys are decrypted, piped during process runs, and garbage collected immediately on CLI exit—leaving zero plain-text traces on host system disks.
          </p>
        </div>
      )
    },
    {
      id: 'faq',
      category: 'INTEGRATIONS & SEC',
      breadcrumbs: ['Docs', 'Guides', 'Frequently Asked Questions'],
      title: 'FAQ',
      headings: [
        { id: 'rate-limits', text: 'Outages & Rate Limits' },
        { id: 'sandbox-safety', text: 'Sandbox Safety' },
        { id: 'supabase-charges', text: 'Supabase Free Tier' }
      ],
      content: (
        <div className="space-y-6">
          <h3 id="rate-limits" className="text-sm font-bold text-white uppercase tracking-widest font-mono">Outages & Rate Limits</h3>
          <div className="space-y-2">
            <span className="text-xs font-bold text-white block">Q: What happens if OpenRouter API is offline?</span>
            <p className="text-xs text-slate-400 leading-relaxed">
              A: Jerob will automatically catch the connection timeout error and route the active plan payload to Gemini or Anthropic endpoints, with Groq acting as the final local fallback to keep terminal execution online.
            </p>
          </div>

          <h3 id="sandbox-safety" className="text-sm font-bold text-white uppercase tracking-widest font-mono">Sandbox Safety</h3>
          <div className="space-y-2">
            <span className="text-xs font-bold text-white block">Q: Can Jerob delete my project files autonomously?</span>
            <p className="text-xs text-slate-400 leading-relaxed">
              A: No. Agent Mode operates in an isolated worker container. Every single file write or delete operation is piped to a staging buffer, and must be approved by the developer in a visual terminal diff before writing.
            </p>
          </div>

          <h3 id="supabase-charges" className="text-sm font-bold text-white uppercase tracking-widest font-mono">Supabase Free Tier</h3>
          <div className="space-y-2">
            <span className="text-xs font-bold text-white block">Q: Do I need a paid Supabase subscription?</span>
            <p className="text-xs text-slate-400 leading-relaxed">
              A: No. Jerob crons and vault integrations run perfectly fine on the standard Supabase Free Tier databases and serverless edge functions.
            </p>
          </div>
        </div>
      )
    }
  ];

  const currentDoc = sections.find(s => s.id === activeDoc) || sections[0];

  const currentIndex = sections.findIndex(s => s.id === activeDoc);
  const prevDoc = currentIndex > 0 ? sections[currentIndex - 1] : null;
  const nextDoc = currentIndex < sections.length - 1 ? sections[currentIndex + 1] : null;

  const searchResults = sections.filter(s =>
    s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative select-none">
      
      {/* Mobile Sidebar Hamburger Toggle */}
      <div className="lg:hidden flex items-center justify-between w-full p-3 bg-black/40 border border-white/5 rounded-xl mb-4">
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="flex items-center gap-2 text-xs font-mono text-slate-300 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5"
        >
          <Menu className="w-4 h-4 text-cyan-400" />
          <span>Documentation Menu</span>
        </button>
        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">{currentDoc.title}</span>
      </div>

      {/* Left Navigation Sidebar */}
      <div className={`lg:col-span-3 flex flex-col gap-5 bg-background-card/20 border border-white/5 rounded-2xl p-4 transition-all duration-300 lg:flex ${
        isMobileMenuOpen ? 'flex absolute left-0 right-0 z-30 bg-slate-950/95 top-16 border-white/10 shadow-2xl' : 'hidden lg:relative lg:top-0'
      }`}>
        {/* Interactive Search Box trigger */}
        <button
          onClick={() => {
            setIsPaletteOpen(true);
            setIsMobileMenuOpen(false);
          }}
          className="flex items-center justify-between w-full px-3 py-2 bg-black/40 hover:bg-black/60 transition-all rounded-xl border border-white/5 text-xs text-slate-400"
        >
          <div className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-slate-500" />
            <span>Search docs...</span>
          </div>
          <span className="flex items-center gap-0.5 px-1.5 py-0.5 bg-white/5 rounded text-[10px] font-mono border border-white/5 select-none">
            <Command className="w-2.5 h-2.5" />K
          </span>
        </button>

        {/* Categories */}
        <div className="flex flex-col gap-4">
          {['GETTING STARTED', 'CORE MODES', 'INTEGRATIONS & SEC'].map((category) => {
            const catDocs = sections.filter(s => s.category === category);
            if (catDocs.length === 0) return null;
            return (
              <div key={category} className="flex flex-col gap-1.5">
                <span className="text-[10px] font-mono font-bold tracking-widest text-slate-500 uppercase px-2">
                  {category}
                </span>
                {catDocs.map(doc => (
                  <button
                    key={doc.id}
                    onClick={() => {
                      setActiveDoc(doc.id);
                      setIsMobileMenuOpen(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs transition-all text-left ${
                      activeDoc === doc.id
                        ? 'bg-gradient-to-r from-primary-blue/10 to-primary-violet/10 border border-primary-blue/20 text-white font-semibold'
                        : 'text-slate-400 hover:text-slate-200 border border-transparent'
                    }`}
                  >
                    {doc.id === 'intro' && <BookOpen className="w-3.5 h-3.5" />}
                    {doc.id === 'install' && <Settings className="w-3.5 h-3.5" />}
                    {doc.id === 'quickstart' && <Play className="w-3.5 h-3.5" />}
                    {doc.id === 'agent' && <Cpu className="w-3.5 h-3.5" />}
                    {doc.id === 'plan' && <ListChecks className="w-3.5 h-3.5" />}
                    {doc.id === 'browser' && <ExternalLink className="w-3.5 h-3.5" />}
                    {doc.id === 'ask' && <HelpCircle className="w-3.5 h-3.5" />}
                    {doc.id === 'scheduler' && <Terminal className="w-3.5 h-3.5" />}
                    {doc.id === 'providers' && <CpuIcon className="w-3.5 h-3.5" />}
                    {doc.id === 'security' && <ShieldCheck className="w-3.5 h-3.5" />}
                    {doc.id === 'commands' && <Code className="w-3.5 h-3.5" />}
                    {doc.id === 'examples' && <FileText className="w-3.5 h-3.5" />}
                    {doc.id === 'configuration' && <Settings className="w-3.5 h-3.5" />}
                    {doc.id === 'faq' && <HelpCircle className="w-3.5 h-3.5" />}
                    {doc.title}
                  </button>
                ))}
              </div>
            );
          })}
        </div>
      </div>

      {/* Docs Content area */}
      <div className="lg:col-span-5 flex flex-col bg-background-card/10 border border-white/5 rounded-3xl p-5 md:p-8 min-h-[500px]">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-500 mb-2.5">
          {currentDoc.breadcrumbs.map((crumb, cidx) => (
            <React.Fragment key={cidx}>
              {cidx > 0 && <ChevronRight className="w-3 h-3 text-slate-600" />}
              <span className={cidx === currentDoc.breadcrumbs.length - 1 ? 'text-cyan-400 font-bold' : ''}>
                {crumb}
              </span>
            </React.Fragment>
          ))}
        </div>

        <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight mb-5 border-b border-white/5 pb-4">
          {currentDoc.title}
        </h1>

        {/* Content body */}
        <div className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDoc}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {currentDoc.content}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Next / Previous Page Navigation */}
        <div className="flex items-center justify-between border-t border-white/5 pt-6 mt-10 text-xs font-mono select-none">
          {prevDoc ? (
            <button
              onClick={() => {
                setActiveDoc(prevDoc.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors bg-white/5 border border-white/5 px-3.5 py-2 rounded-xl"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {nextDoc ? (
            <button
              onClick={() => {
                setActiveDoc(nextDoc.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors bg-white/5 border border-white/5 px-3.5 py-2 rounded-xl ml-auto"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <div />
          )}
        </div>
      </div>

      {/* Right Sidebar: Table of Contents & Sandbox console */}
      <div className="lg:col-span-4 flex flex-col gap-6 lg:sticky lg:top-24">
        
        {/* Table of Contents */}
        <div className="bg-background-card/20 border border-white/5 rounded-2xl p-5 flex flex-col gap-3">
          <span className="text-[10px] font-mono font-bold tracking-widest text-slate-500 uppercase">
            On this page
          </span>
          <div className="flex flex-col gap-2">
            {currentDoc.headings.map((head) => (
              <a
                key={head.id}
                href={`#${head.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById(head.id);
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-xs text-slate-400 hover:text-white hover:underline transition-all flex items-center gap-1.5"
              >
                <ChevronRight className="w-3 h-3 text-slate-600 flex-shrink-0" />
                <span>{head.text}</span>
              </a>
            ))}
          </div>
        </div>

        {/* CLI Live Playground Pane */}
        <div className="flex flex-col bg-black/60 rounded-3xl border border-white/5 overflow-hidden h-[410px]">
          {/* Terminal Header */}
          <div className="px-4 py-3 bg-background-card/80 border-b border-white/5 flex items-center justify-between text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1.5">
              <Terminal className="w-4 h-4 text-cyan-400" />
              CLI Playground
            </span>
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold uppercase select-none">
              Sandbox Online
            </span>
          </div>

          {/* Terminal Console log */}
          <div className="flex-1 p-4 font-mono text-[11px] leading-relaxed overflow-y-auto bg-black/40 text-slate-300">
            <div className="flex flex-col gap-1.5 whitespace-pre-line">
              {playgroundOutput.map((log, idx) => (
                <div key={idx} className={log.startsWith('$') ? 'text-cyan-400 font-bold' : 'text-slate-300'}>
                  {log}
                </div>
              ))}
              {isPlaying && (
                <div className="text-slate-500 animate-pulse mt-1">⠋ Executing command wizard...</div>
              )}
            </div>
          </div>

          {/* Playground commands list */}
          <div className="p-3.5 bg-background-card/45 border-t border-white/5 flex flex-col gap-2">
            <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest font-bold">
              Interactive Commands
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => runPlaygroundCommand('jerob jet')}
                disabled={isPlaying}
                className="flex items-center justify-between px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-[10px] font-mono text-slate-300 text-left border border-white/5 disabled:opacity-50"
              >
                <span>jerob jet</span>
                <Play className="w-2.5 h-2.5 text-cyan-400" />
              </button>
              <button
                onClick={() => runPlaygroundCommand('jerob set-key')}
                disabled={isPlaying}
                className="flex items-center justify-between px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-[10px] font-mono text-slate-300 text-left border border-white/5 disabled:opacity-50"
              >
                <span>jerob set-key</span>
                <Play className="w-2.5 h-2.5 text-violet-400" />
              </button>
              <button
                onClick={() => runPlaygroundCommand('jerob sync-credentials')}
                disabled={isPlaying}
                className="flex items-center justify-between px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-[10px] font-mono text-slate-300 text-left border border-white/5 disabled:opacity-50"
              >
                <span>jerob sync</span>
                <Play className="w-2.5 h-2.5 text-emerald-400" />
              </button>
              <button
                onClick={() => runPlaygroundCommand('jerob scheduler-debug')}
                disabled={isPlaying}
                className="flex items-center justify-between px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-[10px] font-mono text-slate-300 text-left border border-white/5 disabled:opacity-50"
              >
                <span>jerob debug</span>
                <Play className="w-2.5 h-2.5 text-pink-400" />
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Command Palette Modal */}
      <AnimatePresence>
        {isPaletteOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-xl bg-background-card rounded-2xl border border-white/10 overflow-hidden shadow-2xl relative"
            >
              <div className="flex items-center justify-between px-4 py-3.5 border-b border-white/5 bg-black/40">
                <div className="flex items-center gap-2 flex-1">
                  <Search className="w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Search documentation guides..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent border-none outline-none text-slate-200 text-xs w-full font-sans"
                    autoFocus
                  />
                </div>
                <button
                  onClick={() => setIsPaletteOpen(false)}
                  className="p-1 rounded bg-white/5 border border-white/5 text-slate-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Suggestions */}
              <div className="max-h-[300px] overflow-y-auto p-2 flex flex-col gap-1">
                {searchResults.length > 0 ? (
                  searchResults.map(res => (
                    <button
                      key={res.id}
                      onClick={() => {
                        setActiveDoc(res.id);
                        setIsPaletteOpen(false);
                        setSearchQuery('');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="flex items-center justify-between w-full p-3 rounded-xl hover:bg-white/5 text-xs text-slate-300 hover:text-white text-left transition-all"
                    >
                      <div className="flex items-center gap-2.5">
                        <BookOpen className="w-4 h-4 text-slate-500" />
                        <div className="flex flex-col">
                          <span className="font-bold">{res.title}</span>
                          <span className="text-[10px] text-slate-500 uppercase font-mono mt-0.5">{res.category}</span>
                        </div>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                    </button>
                  ))
                ) : (
                  <div className="p-4 text-center text-xs text-slate-500 font-mono">
                    No matching guides found.
                  </div>
                )}
              </div>

              {/* Command Palette footer */}
              <div className="px-4 py-2 bg-black/40 border-t border-white/5 flex items-center justify-between text-[9px] font-mono text-slate-500 select-none">
                <span>Use mouse or Enter to select</span>
                <span>ESC to close</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
