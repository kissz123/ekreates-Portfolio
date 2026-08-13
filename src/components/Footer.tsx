import React from 'react';
import { Camera, ArrowUp, UploadCloud, Heart } from 'lucide-react';

interface FooterProps {
  onOpenVercelModal: () => void;
  onScrollToTop: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenVercelModal,
  onScrollToTop,
}) => {
  return (
    <footer className="bg-[#050506] border-t border-[#1F1F23] text-[#88888C] text-xs py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-[#1F1F23]">
          
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#111114] border border-[#1F1F23] flex items-center justify-center text-white font-mono font-bold">
              EK
            </div>
            <div>
              <span className="font-bold text-sm text-white font-mono uppercase tracking-widest block">
                EKREATES
              </span>
              <p className="text-[10px] text-[#88888C] font-mono">
                Videography &amp; Video Editing Studio • Kisira Emmanuel
              </p>
            </div>
          </div>

          {/* Vercel Deploy Helper Badge */}
          <button
            onClick={onOpenVercelModal}
            className="flex items-center gap-2 px-3.5 py-2 bg-[#111114] hover:bg-[#1A1A1E] text-white border border-[#1F1F23] text-[10px] font-mono uppercase tracking-widest transition-all"
          >
            <UploadCloud className="w-3.5 h-3.5 text-emerald-400" />
            <span>Deploy to Vercel Guide</span>
          </button>

          {/* Scroll to Top */}
          <button
            onClick={onScrollToTop}
            className="flex items-center gap-2 text-[#88888C] hover:text-white transition-colors font-mono text-[10px] uppercase tracking-widest"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>

        </div>

        {/* Bottom copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[#4A4A4F] font-mono text-[10px] uppercase tracking-widest">
          <p>© 2026 Ekreates Studio (Kisira Emmanuel). All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#privacy" className="hover:text-[#88888C]">Privacy</a>
            <span>•</span>
            <a href="#terms" className="hover:text-[#88888C]">Terms</a>
            <span>•</span>
            <button onClick={onOpenVercelModal} className="text-emerald-400 hover:underline">
              Vercel Guide
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
