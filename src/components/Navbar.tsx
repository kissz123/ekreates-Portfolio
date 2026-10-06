import React, { useState } from 'react';
import { Play, Menu, X, Camera } from 'lucide-react';

interface NavbarProps {
  onOpenShowreel: () => void;
  onScrollToSection: (id: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenShowreel,
  onScrollToSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (id: string) => {
    onScrollToSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0A0A0B]/90 backdrop-blur-md border-b border-[#1F1F23] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          onClick={() => handleNavClick('hero')} 
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-8 h-8 bg-white flex items-center justify-center rounded-sm transition-transform group-hover:scale-105">
            <Camera className="w-4 h-4 text-black" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg sm:text-xl tracking-tighter text-white font-mono uppercase">
                EKREATES
              </span>
              <span className="text-[9px] uppercase tracking-widest px-1.5 py-0.5 rounded-sm bg-[#111114] text-amber-400 border border-[#1F1F23] font-mono">
                STUDIO
              </span>
            </div>
            <p className="text-[11px] text-[#88888C] tracking-wide font-sans">
              Videography &amp; Editing by Kisira Emmanuel
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8 text-xs font-medium tracking-[0.2em] uppercase text-[#88888C]">
          <button 
            onClick={() => handleNavClick('works')} 
            className="hover:text-white transition-colors py-1"
          >
            Portfolio
          </button>
          <button 
            onClick={() => handleNavClick('about')} 
            className="hover:text-white transition-colors py-1"
          >
            About &amp; CV
          </button>
          <button 
            onClick={() => handleNavClick('process')} 
            className="hover:text-white transition-colors py-1"
          >
            Workflow
          </button>
          <button 
            onClick={() => handleNavClick('testimonials')} 
            className="hover:text-white transition-colors py-1"
          >
            Clients
          </button>
        </nav>

        {/* Action CTA Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Showreel Button */}
          <button
            onClick={onOpenShowreel}
            className="flex items-center gap-2 px-3.5 py-2 border border-[#1F1F23] bg-[#111114] hover:border-[#3A3A3F] text-white text-[11px] font-bold tracking-widest uppercase transition-all"
          >
            <Play className="w-3 h-3 text-white fill-white" />
            <span>2026 Reel</span>
          </button>

          {/* Direct Booking CTA */}
          <button
            onClick={() => handleNavClick('contact')}
            className="px-5 py-2 border border-[#3A3A3F] bg-white text-black text-[10px] font-bold tracking-widest uppercase hover:bg-transparent hover:text-white transition-all shadow-sm"
          >
            Hire Director
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 bg-[#111114] border border-[#1F1F23] text-[#E2E2E2] hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0A0A0B] border-b border-[#1F1F23] px-4 py-6 space-y-4">
          <div className="pb-2">
            <button
              onClick={() => { onOpenShowreel(); setMobileMenuOpen(false); }}
              className="w-full flex items-center justify-center gap-2 p-2.5 bg-[#111114] border border-[#1F1F23] text-white text-[11px] font-mono uppercase tracking-widest hover:border-[#3A3A3F]"
            >
              <Play className="w-3 h-3 fill-white" /> Watch 2026 Reel
            </button>
          </div>

          <div className="space-y-1 pt-2 border-t border-[#1F1F23] text-xs font-medium tracking-widest uppercase text-[#88888C]">
            <button 
              onClick={() => handleNavClick('works')} 
              className="block w-full text-left py-2.5 px-3 hover:bg-[#111114] hover:text-white"
            >
              Portfolio Works
            </button>
            <button 
              onClick={() => handleNavClick('about')} 
              className="block w-full text-left py-2.5 px-3 hover:bg-[#111114] hover:text-white"
            >
              About &amp; CV
            </button>
            <button 
              onClick={() => handleNavClick('process')} 
              className="block w-full text-left py-2.5 px-3 hover:bg-[#111114] hover:text-white"
            >
              Workflow
            </button>
            <button 
              onClick={() => handleNavClick('testimonials')} 
              className="block w-full text-left py-2.5 px-3 hover:bg-[#111114] hover:text-white"
            >
              Client Reviews
            </button>
            <button 
              onClick={() => handleNavClick('contact')} 
              className="block w-full text-center py-2.5 px-3 bg-white text-black font-bold uppercase mt-2 tracking-widest"
            >
              Hire Director
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
