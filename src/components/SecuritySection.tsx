import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';

export const SecuritySection: React.FC = () => {
  const [randomHex, setRandomHex] = useState<string>('');
  const [sandboxBlocked, setSandboxBlocked] = useState<boolean>(false);

  // Generate random data bytes for the encrypted stream
  useEffect(() => {
    const chars = 'ABCDEF0123456789X&*%@!$#?';
    const interval = setInterval(() => {
      let str = '';
      for (let i = 0; i < 90; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
      }
      setRandomHex(str);
    }, 120);

    return () => clearInterval(interval);
  }, []);

  // Toggle sandbox warning periodically to represent interception
  useEffect(() => {
    const interval = setInterval(() => {
      setSandboxBlocked(prev => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
      {/* Box 1: Encrypted Data Streams & Supabase Vault */}
      <div className="glass-panel rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between min-h-[300px]">
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-radial-glow pointer-events-none opacity-5 bg-gradient-to-tr from-cyan-500/10 to-transparent" />
        
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <h4 className="text-lg font-bold text-white tracking-tight">Encrypted Streams & Vaults</h4>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed max-w-sm mb-6">
            All API credentials and keys are AES-256 encrypted inside a secure, private Supabase Vault. Jerob never stores plain secrets.
          </p>
        </div>

        {/* Visual: Encrypted Scrolling Bytes */}
        <div className="relative bg-black/60 rounded-2xl border border-white/5 p-4 font-mono text-[10px] overflow-hidden leading-relaxed h-[150px] flex flex-col justify-between">
          <div className="text-slate-500 truncate select-none">
            {randomHex.slice(0, 45)}<br />
            {randomHex.slice(45, 90)}<br />
            {randomHex.slice(15, 60)}
          </div>

          {/* Secure Lock Overlay */}
          <div className="flex justify-between items-center bg-cyan-950/20 border border-cyan-500/30 p-2.5 rounded-xl mt-3">
            <div className="flex flex-col gap-0.5">
              <span className="text-[8px] text-cyan-400 uppercase font-bold tracking-widest">TLS 1.3 TUNNEL</span>
              <span className="text-[11px] text-slate-300 font-bold font-mono">SUPABASE_DB_CONN: CONNECTED</span>
            </div>
            <Lock className="w-4 h-4 text-cyan-400 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Box 2: Secure AI Execution Sandbox */}
      <div className="glass-panel rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between min-h-[300px]">
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-radial-glow pointer-events-none opacity-5 bg-gradient-to-tr from-violet-500/10 to-transparent" />

        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-violet-400" />
            <h4 className="text-lg font-bold text-white tracking-tight">Isolated Execution Sandbox</h4>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed max-w-sm mb-6">
            Jerob runs coding tasks in a locked down, short-lived Docker-style gVisor sandbox, shielding your home directories and network.
          </p>
        </div>

        {/* Visual Sandbox Intercept */}
        <div className="relative bg-black/60 rounded-2xl border border-white/5 p-4 font-mono text-[11px] overflow-hidden leading-relaxed h-[150px] flex flex-col justify-between">
          <div>
            <div className="text-slate-500 flex justify-between select-none">
              <span>$ sandbox-exec npm run dev</span>
              <span>ID: vm_41d27</span>
            </div>
            <div className="text-slate-400 mt-1">
              &gt; Evaluating file edits...<br />
              &gt; Checking directory boundaries...
            </div>
          </div>

          {/* Dynamic Intercept Bar */}
          <div className="mt-3">
            {sandboxBlocked ? (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-950/20 border border-red-500/30 p-2 rounded-xl text-center flex items-center justify-center gap-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                <span className="text-[10px] text-red-400 font-bold uppercase tracking-wide">
                  SANDBOX INTERCEPT: FILE R/W BOUNDARY RESTRICTED
                </span>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-emerald-950/20 border border-emerald-500/30 p-2 rounded-xl text-center flex items-center justify-center gap-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wide">
                  SECURE CONTAINER: OPERATIONAL (OK)
                </span>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
