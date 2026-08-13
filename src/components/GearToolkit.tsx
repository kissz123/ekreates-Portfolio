import React, { useState } from 'react';
import { 
  Camera, Video, Disc, Focus, Navigation, Plane, Mic, 
  Zap, Sliders, Layers, Monitor, Cpu, Sparkles 
} from 'lucide-react';
import { GEAR_ITEMS } from '../data/gearData';
import { GearItem } from '../types';

export const GearToolkit: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredGear = selectedCategory === 'all'
    ? GEAR_ITEMS
    : GEAR_ITEMS.filter((g) => {
        if (selectedCategory === 'camera_optics') return g.category === 'camera' || g.category === 'lens';
        if (selectedCategory === 'drones') return g.category === 'drone';
        if (selectedCategory === 'audio_lighting') return g.category === 'audio' || g.category === 'lighting';
        if (selectedCategory === 'post_suite') return g.category === 'post_software' || g.category === 'post_hardware';
        return true;
      });

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Camera': return <Camera className="w-4 h-4 text-white" />;
      case 'Video': return <Video className="w-4 h-4 text-white" />;
      case 'Disc': return <Disc className="w-4 h-4 text-white" />;
      case 'Focus': return <Focus className="w-4 h-4 text-white" />;
      case 'Navigation': return <Navigation className="w-4 h-4 text-white" />;
      case 'Plane': return <Plane className="w-4 h-4 text-white" />;
      case 'Mic': return <Mic className="w-4 h-4 text-white" />;
      case 'Zap': return <Zap className="w-4 h-4 text-white" />;
      case 'Sliders': return <Sliders className="w-4 h-4 text-white" />;
      case 'Layers': return <Layers className="w-4 h-4 text-white" />;
      case 'Monitor': return <Monitor className="w-4 h-4 text-white" />;
      default: return <Cpu className="w-4 h-4 text-white" />;
    }
  };

  return (
    <section id="gear" className="py-20 bg-[#0A0A0B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#111114] border border-[#1F1F23] text-[#88888C] text-[10px] font-mono uppercase tracking-widest">
            <Cpu className="w-3.5 h-3.5 text-white" />
            <span>CINEMA HARDWARE &amp; POST SUITE</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-light tracking-tighter text-white">
            PRODUCTION <span className="italic font-serif-italic font-normal">Toolkit</span>
          </h2>
          <p className="text-sm text-[#88888C] max-w-xl mx-auto font-sans">
            Powered by my flagship HP ZBook mobile workstation, Adobe post-suite, and full production access to professional cinema cameras &amp; aerial systems.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
          {[
            { id: 'all', label: 'All Equipment' },
            { id: 'camera_optics', label: 'Cameras & Cinema Lenses' },
            { id: 'drones', label: 'Drones & Aerial FPV' },
            { id: 'audio_lighting', label: '32-Bit Audio & Lighting' },
            { id: 'post_suite', label: 'Post-Production & Editing' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 text-[10px] font-mono tracking-widest uppercase transition-all border ${
                selectedCategory === cat.id
                  ? 'bg-white text-black border-white font-bold'
                  : 'bg-[#111114] text-[#88888C] border-[#1F1F23] hover:text-white hover:border-[#3A3A3F]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Equipment Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGear.map((item) => (
            <div
              key={item.id}
              className="p-6 bg-[#111114] border border-[#1F1F23] hover:border-[#3A3A3F] transition-all space-y-4 group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 bg-[#0A0A0B] border border-[#1F1F23] flex items-center justify-center">
                    {getIcon(item.iconName)}
                  </div>
                  {item.badge && (
                    <span className="px-2 py-0.5 bg-[#0A0A0B] text-white border border-[#1F1F23] text-[9px] font-mono font-bold tracking-widest uppercase">
                      {item.badge}
                    </span>
                  )}
                </div>

                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#88888C]">
                    {item.categoryLabel}
                  </span>
                  <h3 className="text-base font-medium text-white group-hover:underline transition-all">
                    {item.name}
                  </h3>
                </div>

                <p className="text-xs text-[#E2E2E2] font-mono leading-relaxed bg-[#0A0A0B] p-3 border border-[#1F1F23]">
                  SPEC: {item.specs}
                </p>

                <p className="text-xs text-[#88888C] leading-relaxed font-sans">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#1F1F23] flex items-center justify-between text-[10px] font-mono text-[#88888C]">
                <span>{item.availability || 'OWNED IN-HOUSE'}</span>
                <span className={item.availability?.includes('PRODUCTION') ? 'text-amber-400' : 'text-emerald-400'}>
                  {item.availability?.includes('PRODUCTION') ? 'ACCESS' : 'READY'}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
