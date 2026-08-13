import React, { useState } from 'react';
import { 
  X, UploadCloud, Check, Copy, ExternalLink, Terminal, 
  Sparkles, Github, Layers, ArrowRight, ShieldCheck, Zap
} from 'lucide-react';

interface VercelDeployModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VercelDeployModal: React.FC<VercelDeployModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [copiedGit, setCopiedGit] = useState(false);
  const [copiedConfig, setCopiedConfig] = useState(false);

  if (!isOpen) return null;

  const gitCommands = `git init
git add .
git commit -m "Deploy Videographer Portfolio"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main`;

  const vercelJsonContent = `{
  "framework": "vite",
  "buildCommand": "npm run build",
  "outputDirectory": "dist"
}`;

  const handleCopyGit = () => {
    navigator.clipboard.writeText(gitCommands);
    setCopiedGit(true);
    setTimeout(() => setCopiedGit(false), 2000);
  };

  const handleCopyConfig = () => {
    navigator.clipboard.writeText(vercelJsonContent);
    setCopiedConfig(true);
    setTimeout(() => setCopiedConfig(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-xl overflow-y-auto animate-in fade-in duration-200">
      
      {/* Modal Box */}
      <div className="relative w-full max-w-3xl my-auto bg-[#0A0A0B] border border-[#1F1F23] overflow-hidden shadow-2xl text-[#E2E2E2] max-h-[90vh] flex flex-col">
        
        {/* Top Header */}
        <div className="p-5 bg-[#111114] border-b border-[#1F1F23] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#0A0A0B] border border-[#1F1F23] flex items-center justify-center text-emerald-400">
              <UploadCloud className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-medium text-white flex items-center gap-2">
                <span>Deploy Portfolio to Vercel</span>
                <span className="text-[9px] bg-[#0A0A0B] text-emerald-400 border border-[#1F1F23] px-2 py-0.5 font-mono uppercase tracking-widest">
                  READY
                </span>
              </h2>
              <p className="text-xs text-[#88888C] font-sans">
                Step-by-step guide to push this website live to Vercel in 2 minutes
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 bg-[#0A0A0B] text-[#88888C] hover:text-white border border-[#1F1F23] transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 space-y-6 text-sm">
          
          {/* Quick Overview Banner */}
          <div className="p-4 bg-[#111114] border border-[#1F1F23] flex items-start gap-3">
            <Zap className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-bold text-white text-xs">
                Zero Configuration Needed for Vite + React 19
              </p>
              <p className="text-xs text-[#88888C] leading-relaxed font-sans">
                This project uses standard Vite output (`npm run build` producing static files in `dist/`). Vercel auto-detects Vite projects instantly!
              </p>
            </div>
          </div>

          {/* STEP 1: Export / Git Push */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 bg-white text-black font-bold font-mono text-xs flex items-center justify-center">
                1
              </span>
              <h3 className="font-medium text-white text-sm font-mono uppercase tracking-widest">
                Push Code to GitHub
              </h3>
            </div>

            <p className="text-xs text-[#88888C] font-sans">
              Export or download your project files from AI Studio (via Settings &rarr; Export ZIP / GitHub), or run these standard Git commands in your project folder:
            </p>

            <div className="relative bg-[#111114] p-4 border border-[#1F1F23] font-mono text-xs text-white space-y-1">
              <pre className="overflow-x-auto">{gitCommands}</pre>
              <button
                onClick={handleCopyGit}
                className="absolute top-3 right-3 px-3 py-1 bg-[#0A0A0B] border border-[#1F1F23] text-[#88888C] hover:text-white text-[10px] font-mono uppercase tracking-widest flex items-center gap-1.5 transition-all"
              >
                {copiedGit ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedGit ? 'Copied' : 'Copy Commands'}</span>
              </button>
            </div>
          </div>

          {/* STEP 2: Import on Vercel */}
          <div className="space-y-3 pt-2 border-t border-[#1F1F23]">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 bg-white text-black font-bold font-mono text-xs flex items-center justify-center">
                2
              </span>
              <h3 className="font-medium text-white text-sm font-mono uppercase tracking-widest">
                Import Repository on Vercel
              </h3>
            </div>

            <ol className="list-decimal list-inside space-y-2 text-xs text-[#88888C] pl-2 font-sans">
              <li>Log in to <a href="https://vercel.com/new" target="_blank" rel="noreferrer" className="text-white hover:underline inline-flex items-center gap-1 font-bold">Vercel Dashboard <ExternalLink className="w-3 h-3" /></a>.</li>
              <li>Click <strong>&quot;Add New...&quot; &rarr; &quot;Project&quot;</strong> and select your GitHub repository.</li>
              <li>Vercel will automatically detect:
                <ul className="list-disc list-inside pl-4 pt-1 space-y-1 text-[#88888C] font-mono text-[11px]">
                  <li>Framework Preset: <strong className="text-emerald-400">Vite</strong></li>
                  <li>Build Command: <strong className="text-white">npm run build</strong></li>
                  <li>Output Directory: <strong className="text-white">dist</strong></li>
                </ul>
              </li>
              <li>Click <strong className="text-white">&quot;Deploy&quot;</strong>. Your portfolio will be live at <code className="bg-[#111114] px-1.5 py-0.5 border border-[#1F1F23] text-white">https://your-portfolio.vercel.app</code> in under 45 seconds!</li>
            </ol>
          </div>

          {/* STEP 3: Optional vercel.json */}
          <div className="space-y-3 pt-2 border-t border-[#1F1F23]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 bg-[#111114] text-[#88888C] font-bold font-mono text-xs flex items-center justify-center border border-[#1F1F23]">
                  3
                </span>
                <h3 className="font-medium text-white text-sm font-mono uppercase tracking-widest">
                  Optional: vercel.json File
                </h3>
              </div>

              <button
                onClick={handleCopyConfig}
                className="px-2.5 py-1 bg-[#111114] border border-[#1F1F23] text-[#88888C] hover:text-white text-[10px] uppercase tracking-widest flex items-center gap-1 font-mono"
              >
                {copiedConfig ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedConfig ? 'Copied' : 'Copy vercel.json'}</span>
              </button>
            </div>

            <div className="bg-[#111114] p-3 border border-[#1F1F23] font-mono text-xs text-[#88888C]">
              <pre>{vercelJsonContent}</pre>
            </div>
          </div>

          {/* Bottom Action Footer */}
          <div className="pt-4 border-t border-[#1F1F23] flex flex-col sm:flex-row items-center justify-between gap-3">
            <a
              href="https://vercel.com/new"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-6 py-2.5 bg-white text-black font-bold text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 border border-[#3A3A3F] hover:bg-transparent hover:text-white transition-all"
            >
              <span>Open Vercel Dashboard</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2.5 bg-[#111114] border border-[#1F1F23] text-[#88888C] hover:text-white text-[10px] font-mono uppercase tracking-widest transition-all"
            >
              Close Guide
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
