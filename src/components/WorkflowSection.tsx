import React, { useState } from 'react';
import { 
  Clapperboard, Camera, Sliders, CheckCircle2, ChevronDown, 
  Sparkles, Layers, Cpu, Radio, Shield
} from 'lucide-react';

export const WorkflowSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const STEPS = [
    {
      num: '01',
      title: 'Pre-Production & Concept',
      subtitle: 'Strategy, Moodboards, Shotlists & Logistics',
      icon: Clapperboard,
      desc: 'We define creative direction, draft scene-by-scene storyboards, secure location permits, select optimal cinema camera packages, and align on timeline deliverables.',
      deliverables: ['Moodboard & Color Palette', 'Director Shotlist', 'Talent & Crew Call Sheets', 'Equipment Selection'],
    },
    {
      num: '02',
      title: 'Production & On-Set Shoot',
      subtitle: 'On-Set Camera Packages, Lighting & Audio',
      icon: Camera,
      desc: 'Executing the vision on location with professional camera packages, cinematic lighting setups, 32-bit float audio recording, and stabilized movement.',
      deliverables: ['High-Bitrate RAW / Log Footage', 'Multi-Cam Synchronized Audio', 'Lighting & Grip Setup', 'Aerial & Gimbal Movement'],
    },
    {
      num: '03',
      title: 'Post-Production & Assembly',
      subtitle: 'Pacing, Rhythm, Sound Design & Motion FX',
      icon: Sliders,
      desc: 'Editing the narrative in Adobe Premiere Pro & CapCut. Layering motion graphics in After Effects, custom Photoshop assets, sound effects, and voiceover cleanup.',
      deliverables: ['First Offline Directors Cut', 'Sound FX & Foley Stems', 'Kinetic Motion Overlays', 'Frame.io Review Link'],
    },
    {
      num: '04',
      title: 'Color Finishing & Multi-Export',
      subtitle: 'Cinematic Color Grade, Grain & 16:9 + 9:16 Delivery',
      icon: Layers,
      desc: 'Color grading and finishing using Lumetri Color & film emulation LUTs, exporting multi-format masters tailored for TV, YouTube, and TikTok Reels.',
      deliverables: ['4K HDR 10-bit Master ProRes', '9:16 Vertical Mobile Cuts', 'Rec.709 & DCI-P3 Color Profiles', 'Archival RAW Backup'],
    },
  ];

  return (
    <section id="process" className="py-20 bg-[#050506] border-y border-[#1F1F23]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#111114] border border-[#1F1F23] text-[#88888C] text-[10px] font-mono uppercase tracking-widest">
            <Radio className="w-3.5 h-3.5 text-white" />
            <span>PRODUCTION WORKFLOW</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-light tracking-tighter text-white">
            PRODUCTION <span className="italic font-serif-italic font-normal">Process</span>
          </h2>
          <p className="text-sm text-[#88888C] max-w-xl mx-auto font-sans">
            A structured, reliable 4-step workflow engineered to deliver broadcast-grade films on schedule.
          </p>
        </div>

        {/* Interactive Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            const isActive = activeStep === idx;

            return (
              <div
                key={step.num}
                onClick={() => setActiveStep(idx)}
                className={`cursor-pointer p-6 border transition-all duration-300 flex flex-col justify-between space-y-4 ${
                  isActive
                    ? 'bg-[#111114] border-white shadow-2xl'
                    : 'bg-[#111114] border-[#1F1F23] hover:border-[#3A3A3F]'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-light font-mono text-white">
                      {step.num}
                    </span>
                    <div className={`w-9 h-9 border flex items-center justify-center transition-colors ${
                      isActive ? 'bg-white text-black border-white' : 'bg-[#0A0A0B] text-[#88888C] border-[#1F1F23]'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-base font-medium text-white leading-snug">
                      {step.title}
                    </h3>
                    <p className="text-[11px] text-[#88888C] font-mono mt-0.5 uppercase">
                      {step.subtitle}
                    </p>
                  </div>

                  <p className="text-xs text-[#88888C] leading-relaxed font-sans">
                    {step.desc}
                  </p>
                </div>

                {/* Deliverables List */}
                <div className="pt-3 border-t border-[#1F1F23] space-y-1.5">
                  <span className="text-[9px] font-mono uppercase text-[#4A4A4F] block font-bold tracking-widest">
                    DELIVERABLES:
                  </span>
                  {step.deliverables.map((item, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-xs text-[#E2E2E2]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="truncate">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
