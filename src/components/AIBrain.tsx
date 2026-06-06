import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Calendar, Compass, MessageSquare, Cpu, TerminalSquare } from 'lucide-react';

interface NodeData {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  color: string;
  glowColor: string;
  x: number; // percentage layout
  y: number;
  streamPath: string; // SVG path definition
}

export const AIBrain: React.FC = () => {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  const nodes: NodeData[] = [
    {
      id: 'agent',
      name: 'Autonomous Agent',
      icon: <Cpu className="w-5 h-5" />,
      description: 'Executes codebase modifications, debugs, and runs local commands.',
      color: 'from-blue-500 to-cyan-400',
      glowColor: 'rgba(6, 182, 212, 0.4)',
      x: 15,
      y: 20,
      streamPath: 'M 50,50 L 15,20',
    },
    {
      id: 'planner',
      name: 'Intelligent Planner',
      icon: <TerminalSquare className="w-5 h-5" />,
      description: 'Deconstructs goals into sequential tasks with self-correction mechanisms.',
      color: 'from-violet-600 to-indigo-500',
      glowColor: 'rgba(139, 92, 246, 0.4)',
      x: 85,
      y: 20,
      streamPath: 'M 50,50 L 85,20',
    },
    {
      id: 'browser',
      name: 'Browser Automation',
      icon: <Compass className="w-5 h-5" />,
      description: 'Navigates web tools, fills forms, scrapes data, and authenticates.',
      color: 'from-cyan-400 to-teal-400',
      glowColor: 'rgba(6, 182, 212, 0.4)',
      x: 10,
      y: 70,
      streamPath: 'M 50,50 L 10,70',
    },
    {
      id: 'ask',
      name: 'Workspace Ask',
      icon: <MessageSquare className="w-5 h-5" />,
      description: 'Direct conversational agent mapped to files, environment, and history.',
      color: 'from-blue-600 to-violet-500',
      glowColor: 'rgba(0, 102, 255, 0.4)',
      x: 90,
      y: 70,
      streamPath: 'M 50,50 L 90,70',
    },
    {
      id: 'scheduler',
      name: 'Serverless Scheduler',
      icon: <Calendar className="w-5 h-5" />,
      description: 'Runs workflows, triggers cron jobs, and alerts 24/7 on private serverless queues.',
      color: 'from-fuchsia-500 to-pink-500',
      glowColor: 'rgba(236, 72, 153, 0.4)',
      x: 50,
      y: 88,
      streamPath: 'M 50,50 L 50,88',
    },
  ];

  // Helper to determine the core glow color based on hovered node
  const getCoreGlow = () => {
    switch (activeNode) {
      case 'agent': return 'rgba(6, 182, 212, 0.7)';
      case 'planner': return 'rgba(139, 92, 246, 0.7)';
      case 'browser': return 'rgba(45, 212, 191, 0.7)';
      case 'ask': return 'rgba(59, 130, 246, 0.7)';
      case 'scheduler': return 'rgba(236, 72, 153, 0.7)';
      default: return 'rgba(0, 102, 255, 0.4)';
    }
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto h-[550px] flex items-center justify-center select-none overflow-visible">
      {/* Background radial overlays */}
      <div className="absolute inset-0 bg-radial-glow pointer-events-none opacity-40" />

      {/* SVG Canvas for streams */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="stream-agent" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.8" />
          </linearGradient>
          <linearGradient id="stream-planner" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.8" />
          </linearGradient>
          <linearGradient id="stream-browser" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#2dd4bf" stopOpacity="0.8" />
          </linearGradient>
          <linearGradient id="stream-ask" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563eb" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.8" />
          </linearGradient>
          <linearGradient id="stream-scheduler" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d946ef" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#ec4899" stopOpacity="0.8" />
          </linearGradient>
        </defs>

        {/* Energy Lines */}
        {nodes.map((node) => {
          return (
            <g key={`stream-group-${node.id}`}>
              {/* Static background route line */}
              <path
                d={node.streamPath}
                fill="none"
                stroke="rgba(255, 255, 255, 0.04)"
                strokeWidth="0.8"
              />
              {/* Glowing active path line */}
              <motion.path
                d={node.streamPath}
                fill="none"
                stroke={`url(#stream-${node.id})`}
                strokeWidth={activeNode === node.id ? "1.5" : "0.7"}
                strokeDasharray="10 15"
                initial={{ strokeDashoffset: 0 }}
                animate={{ strokeDashoffset: -100 }}
                transition={{
                  repeat: Infinity,
                  duration: activeNode === node.id ? 2 : 4,
                  ease: "linear",
                }}
                className="opacity-70"
                style={{
                  filter: activeNode === node.id ? `drop-shadow(0 0 8px ${node.glowColor})` : 'none',
                }}
              />
            </g>
          );
        })}
      </svg>

      {/* Central AI Brain Core */}
      <div className="absolute z-10 flex flex-col items-center justify-center">
        <motion.div
          animate={{
            scale: activeNode ? [1, 1.08, 1] : [1, 1.04, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 4,
            ease: "easeInOut",
          }}
          className="relative w-32 h-32 md:w-36 md:h-36 rounded-full flex items-center justify-center cursor-pointer glass-panel"
          style={{
            boxShadow: `0 0 60px 10px ${getCoreGlow()}, inset 0 0 20px 2px rgba(255, 255, 255, 0.1)`,
            borderColor: activeNode ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.06)',
            transition: 'box-shadow 0.5s ease, border-color 0.5s ease',
          }}
        >
          {/* Inner holographic layers */}
          <div className="absolute w-28 h-28 md:w-32 md:h-32 rounded-full border border-dashed border-primary/20 animate-spin" style={{ animationDuration: '20s' }} />
          <div className="absolute w-24 h-24 md:w-28 md:h-28 rounded-full border border-dotted border-violet-500/20 animate-spin" style={{ animationDuration: '10s', animationDirection: 'reverse' }} />
          
          <div className="absolute inset-2 rounded-full bg-gradient-to-tr from-background-card via-background-cardHover to-transparent opacity-80" />
          
          {/* Center Orb */}
          <div className="relative flex flex-col items-center text-center p-2">
            <Terminal className="w-8 h-8 md:w-9 md:h-9 text-gradient-neon mb-1 animate-pulse" />
            <span className="text-xs font-mono font-bold tracking-widest text-slate-400">J E R O B</span>
            <span className="text-[9px] font-mono text-cyan-400/80 animate-pulse mt-0.5">OPERATIONAL</span>
          </div>
        </motion.div>
      </div>

      {/* Floating Nodes */}
      {nodes.map((node) => {
        const isHovered = activeNode === node.id;
        const isAnyHovered = activeNode !== null;
        
        return (
          <div
            key={node.id}
            className="absolute z-20"
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div
              onMouseEnter={() => setActiveNode(node.id)}
              onMouseLeave={() => setActiveNode(null)}
              className={`flex flex-col items-center cursor-pointer transition-all duration-300 ${
                isAnyHovered && !isHovered ? 'opacity-40 blur-[1px]' : 'opacity-100'
              }`}
            >
              {/* Outer Glowing Node Ring */}
              <motion.div
                whileHover={{ scale: 1.12 }}
                className={`w-14 h-14 rounded-2xl flex items-center justify-center glass-panel transition-all duration-300 ${
                  isHovered 
                    ? 'border-white/30 shadow-lg text-white bg-slate-900/80' 
                    : 'border-white/5 text-slate-400 bg-background-card/50'
                }`}
                style={{
                  boxShadow: isHovered 
                    ? `0 0 30px ${node.glowColor}, inset 0 1px 1px rgba(255, 255, 255, 0.2)` 
                    : 'none',
                }}
              >
                {/* Node Icon */}
                <div className={`p-2 rounded-xl bg-gradient-to-br ${node.color} bg-clip-text text-transparent`}>
                  <div className={isHovered ? "text-white" : "text-slate-300"}>
                    {node.icon}
                  </div>
                </div>
              </motion.div>

              {/* Node Title */}
              <div className="mt-2 text-center pointer-events-none">
                <span className={`text-xs font-semibold tracking-wide transition-colors ${
                  isHovered ? 'text-white font-bold' : 'text-slate-300'
                }`}>
                  {node.name}
                </span>
              </div>
            </div>

            {/* Hover Tooltip Details */}
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute left-1/2 -translate-x-1/2 mt-3 w-56 p-3 rounded-xl glass-panel glass-panel-glow text-center z-50"
              >
                <div className="text-[11px] text-slate-200 font-medium leading-relaxed">
                  {node.description}
                </div>
                <div className="mt-1.5 flex items-center justify-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                  <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest">Active Mode</span>
                </div>
              </motion.div>
            )}
          </div>
        );
      })}
    </div>
  );
};
