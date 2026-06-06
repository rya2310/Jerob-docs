import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, BookOpen, ChevronRight, Sparkles, Copy, Check } from 'lucide-react';
import { AIBrain } from './components/AIBrain';
import { FuturisticTerminal } from './components/FuturisticTerminal';
import { ImmersiveFeatures } from './components/ImmersiveFeatures';
import { WhyJerob } from './components/WhyJerob';
import { AIProvidersSection } from './components/AIProvidersSection';
import { InstallationSection } from './components/InstallationSection';
import { AutomationsShowcase } from './components/AutomationsShowcase';
import { SecuritySection } from './components/SecuritySection';
import { DocumentationHub } from './components/DocumentationHub';

function App() {
  const [activeTab, setActiveTab] = useState<'console' | 'docs'>('console');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [heroCopied, setHeroCopied] = useState<boolean>(false);

  // Handle mouse moves for glow lighting coords
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen bg-mesh-dark tech-grid overflow-hidden selection:bg-cyan-500/20">
      
      {/* Mouse responsive light source */}
      <div 
        className="fixed w-[600px] h-[600px] rounded-full pointer-events-none opacity-20 transition-all duration-300 z-0"
        style={{
          left: `${mousePos.x - 300}px`,
          top: `${mousePos.y - 300}px`,
          background: 'radial-gradient(circle, rgba(0, 102, 255, 0.15) 0%, rgba(139, 92, 246, 0.05) 50%, transparent 100%)',
          filter: 'blur(60px)'
        }}
      />

      {/* Static top blurs */}
      <div className="absolute top-[-10%] left-[10%] w-[350px] h-[350px] aurora-blur-1 pointer-events-none opacity-30" />
      <div className="absolute top-[20%] right-[5%] w-[400px] h-[400px] aurora-blur-2 pointer-events-none opacity-20" />
      <div className="absolute bottom-[10%] left-[5%] w-[350px] h-[350px] aurora-blur-3 pointer-events-none opacity-20" />

      {/* Global Navigation Header */}
      <header className="sticky top-0 z-40 w-full glass-panel border-b border-white/5 bg-background-nav backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          {/* Logo brand */}
          <div 
            onClick={() => {
              setActiveTab('console');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }} 
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="relative w-8 h-8 rounded-xl bg-gradient-to-tr from-primary-blue to-primary-violet flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-200">
              <Terminal className="w-4.5 h-4.5 text-white" />
              <div className="absolute inset-0.5 rounded-[10px] border border-white/20" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-mono font-bold tracking-widest text-white">JEROB</span>
              <span className="text-[9px] font-mono text-cyan-400 font-bold uppercase tracking-wider">AI OPERATOR</span>
            </div>
          </div>

          {/* Nav links */}
          <nav className="flex items-center gap-1 p-1 bg-black/40 rounded-xl border border-white/5 select-none">
            <button
              onClick={() => {
                setActiveTab('console');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-mono transition-all ${
                activeTab === 'console'
                  ? 'bg-white/5 border border-white/10 text-white font-semibold shadow-inner'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              Console
            </button>
            <button
              onClick={() => {
                setActiveTab('docs');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-mono transition-all ${
                activeTab === 'docs'
                  ? 'bg-white/5 border border-white/10 text-white font-semibold shadow-inner'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              Docs & API
            </button>
          </nav>

          {/* Socials / Action Button */}
          <div className="flex items-center gap-3">
            <a 
              href="https://github.com/ABHI-Theq/Jerob-Personal_AI_Operator" 
              target="_blank" 
              rel="noreferrer" 
              className="hidden md:flex p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-slate-400 hover:text-white transition-colors"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <button 
              onClick={() => {
                setActiveTab(activeTab === 'console' ? 'docs' : 'console');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="relative px-4 py-1.5 rounded-xl bg-gradient-to-r from-primary-blue to-primary-violet hover:brightness-110 text-xs font-bold text-white shadow-lg shadow-primary-blue/20 transition-all duration-300 flex items-center gap-1 group"
            >
              <span>{activeTab === 'console' ? 'Launch Docs' : 'Launch Console'}</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-16 relative z-10">
        <AnimatePresence mode="wait">
          {activeTab === 'console' ? (
            <motion.div
              key="landing-page"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="space-y-24 md:space-y-36"
            >
              {/* Hero Section */}
              <section className="text-center space-y-6 max-w-4xl mx-auto flex flex-col items-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-mono mb-2">
                  <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                  <span>Your Personal AI Operator</span>
                </div>
                
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-tight font-heading">
                  Your Personal <br />
                  <span className="text-gradient-neon">AI Operator</span>
                </h1>
                
                <p className="text-base sm:text-lg md:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto">
                  A terminal-first AI agent that combines autonomous coding, planning, browser automation, conversational AI, and serverless scheduling into a single CLI experience.
                </p>

                {/* Hero CTAs */}
                <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 select-none">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText('npm install -g jerob');
                      setHeroCopied(true);
                      setTimeout(() => setHeroCopied(false), 2000);
                    }}
                    className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-black/60 hover:bg-black/80 text-white font-mono text-sm border border-white/10 hover:border-cyan-500/50 shadow-lg shadow-cyan-500/5 transition-all duration-300 flex items-center justify-center gap-3 group relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-violet-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    <span className="text-slate-500 select-none">$</span>
                    <span className="font-semibold text-slate-200">npm install -g jerob</span>
                    <div className="pl-1 border-l border-white/10 text-slate-400 group-hover:text-white transition-colors">
                      {heroCopied ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </div>
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('docs');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-bold text-sm border border-white/5 transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    Get Started
                    <ChevronRight className="w-4 h-4 text-cyan-400" />
                  </button>
                </div>
              </section>

              {/* Terminal Switcher Section */}
              <section id="terminal-showcase" className="scroll-mt-24 space-y-4">
                <div className="text-center space-y-2 mb-8">
                  <span className="text-xs font-mono font-bold tracking-widest text-slate-500 uppercase">Interactive Terminal</span>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">The developer console rebuilt for agents</h2>
                </div>
                <FuturisticTerminal />
              </section>

              {/* Installation Steps stepper section */}
              <section>
                <InstallationSection />
              </section>

              {/* Five Modes Deep Dive */}
              <section className="space-y-12">
                <div className="text-center space-y-2 mb-6 max-w-xl mx-auto">
                  <span className="text-xs font-mono font-bold tracking-widest text-slate-500 uppercase">Feature Deep Dive</span>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">Cinematic workspace capability</h2>
                </div>
                <ImmersiveFeatures />
              </section>

              {/* Why Jerob advantage cards */}
              <section>
                <WhyJerob />
              </section>

              {/* AI Brain Stream Visualization */}
              <section className="space-y-6">
                <div className="text-center space-y-2 mb-10 max-w-xl mx-auto">
                  <span className="text-xs font-mono font-bold tracking-widest text-slate-500 uppercase">AI Brain Core</span>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">Five modes. One intelligent engine.</h2>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Hover over satellite nodes to spark custom HSL gradient paths and stream information directly into Jerob&apos;s center execution loop.
                  </p>
                </div>
                <AIBrain />
              </section>

              {/* AI Providers list */}
              <section>
                <AIProvidersSection />
              </section>

              {/* Security features */}
              <section className="space-y-8">
                <div className="text-center space-y-2 max-w-xl mx-auto">
                  <span className="text-xs font-mono font-bold tracking-widest text-slate-500 uppercase">Sandboxed Integrity</span>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">Security in every instruction</h2>
                </div>
                <SecuritySection />
              </section>

              {/* Example Automations */}
              <section>
                <AutomationsShowcase />
              </section>
            </motion.div>
          ) : (
            <motion.div
              key="documentation-hub"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              {/* Docs Hero info */}
              <div className="border-b border-white/5 pb-6">
                <h1 className="text-3xl font-extrabold text-white tracking-tight font-heading">Documentation Hub</h1>
                <p className="text-sm text-slate-400 mt-2">
                  Complete API specifications, installation steps, and interactive playground. Press <code className="text-cyan-400 font-mono px-1 py-0.5 rounded bg-white/5 border border-white/5">Ctrl + K</code> anywhere to search.
                </p>
              </div>
              <DocumentationHub />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Global Footer */}
      <footer className="border-t border-white/5 bg-black/40 py-10 text-center relative z-10 mt-24">
        <div className="max-w-7xl mx-auto px-4 text-slate-500 text-xs font-mono space-y-2">
          <p>© 2026 Jerob Technologies. Released under the MIT License.</p>
          <div className="flex justify-center gap-4 text-[10px] text-slate-600">
            <a href="https://github.com/ABHI-Theq/Jerob-Personal_AI_Operator" target="_blank" rel="noreferrer" className="hover:text-slate-400">GitHub Workspace</a>
            <span>•</span>
            <a href="https://www.npmjs.com/package/jerob" target="_blank" rel="noreferrer" className="hover:text-slate-400">NPM Package</a>
            <span>•</span>
            <a href="#status" className="hover:text-slate-400 flex items-center gap-1 justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              All Systems Operational
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default App;
