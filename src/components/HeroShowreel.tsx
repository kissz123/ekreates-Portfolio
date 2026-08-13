import React, { useState, useEffect } from 'react';
import { 
  Play, Pause, Film, Sparkles, Sliders, ChevronRight, ChevronLeft, 
  MessageSquare, Maximize, ExternalLink, Layers, Monitor, CheckCircle2, Clapperboard
} from 'lucide-react';

import timeline1 from '../assets/images/hp_zbook_timeline_1_1786626843659.jpg';
import timeline2 from '../assets/images/hp_zbook_timeline_2_1786626859738.jpg';
import timeline3 from '../assets/images/hp_zbook_timeline_3_1786626875481.jpg';
import timeline4 from '../assets/images/hp_zbook_timeline_4_1786626894288.jpg';
import timeline5 from '../assets/images/hp_zbook_timeline_5_1786629791346.jpg';
import timeline6 from '../assets/images/hp_zbook_timeline_6_1786629808669.jpg';

interface HeroShowreelProps {
  onExploreClick: () => void;
  onContactClick: () => void;
}

interface TimelineSlide {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  software: string;
  image: string;
  description: string;
  specs: string[];
  videoUrl?: string;
}

const TIMELINE_SLIDES: TimelineSlide[] = [
  {
    id: 's1',
    number: '01',
    title: 'Podcast & Dialogue Multi-Track Assembly',
    subtitle: 'Adobe Premiere Pro CC',
    software: 'Premiere Pro',
    image: timeline1,
    description: 'Multi-cam podcast editing with 32-bit float audio stems, automated subtitle captions, and program monitor alignment.',
    specs: ['6 Video Layers', '4 Audio Stems', 'Auto Subtitles', 'Dialogue EQ & Gate'],
    videoUrl: 'https://youtube.com/shorts/_e-2YjdlOi0',
  },
  {
    id: 's2',
    number: '02',
    title: 'Kinetic Motion Graphics & 3D Compositing',
    subtitle: 'Adobe After Effects CC',
    software: 'After Effects',
    image: timeline2,
    description: 'Keyframe speed graphing, 3D Null object motion paths, vector graphics compositing, and kinetic text animation.',
    specs: ['27 Motion Layers', '3D Null Objects', 'Speed Graphing', 'Content-Aware Fill'],
    videoUrl: 'https://youtube.com/shorts/sUBPZpxUfEk',
  },
  {
    id: 's3',
    number: '03',
    title: 'Graphic Cover Art & Music Video Assembly',
    subtitle: 'Adobe Premiere Pro & Photoshop',
    software: 'Premiere Pro',
    image: timeline3,
    description: 'Integrated flyer graphic composition paired with beat-matched music video timeline cuts and transition FX.',
    specs: ['Photoshop Integration', 'Beat-Matched Cut Pacing', 'BCC Glitch Dissolves', 'Custom LUTS'],
    videoUrl: 'https://youtu.be/mjX7AbFfF3w',
  },
  {
    id: 's4',
    number: '04',
    title: 'The Bethel Experience 2025 Event Edit',
    subtitle: 'Adobe Premiere Pro & Lumetri Color',
    software: 'Premiere Pro',
    image: timeline4,
    description: 'Live event aftermovie timeline featuring nested sequences, custom adjustment layers, speed ramps, and cinema aspect ratio.',
    specs: ['Nested Sequences', 'Time Remapping Ramps', 'Lumetri Color Nodes', '2.35:1 Letterbox'],
    videoUrl: 'https://youtu.be/JJTGo6kO5MU',
  },
  {
    id: 's5',
    number: '05',
    title: 'Vertical 9:16 Social Reel & Kinetic Layout',
    subtitle: 'Adobe Premiere Pro & CapCut Pro',
    software: 'Premiere Pro',
    image: timeline5,
    description: 'Vertical 9:16 short-form social edit with synchronized sound design risers, impact audio meters, and dynamic text pop-ins.',
    specs: ['9:16 Framing', 'Dynamic Text Pop-Ins', 'Impact Audio Layering', 'Speed-Ramped Cut Rhythm'],
    videoUrl: 'https://youtube.com/shorts/j0vUBL7A_T0',
  },
  {
    id: 's6',
    number: '06',
    title: 'Studio Audio Mixer & Multi-Channel Stems',
    subtitle: 'Adobe Premiere Pro & Essential Sound',
    software: 'Premiere Pro',
    image: timeline6,
    description: 'Multi-channel audio track mixing, console EQ balancing, noise suppression, and sound effects layering.',
    specs: ['Studio Mix Dials', 'Dialogue Auto-Ducking', '5 Audio Busses', 'Stereo Panning'],
    videoUrl: 'https://youtu.be/1cz_2GW9khs',
  },
];

export const HeroShowreel: React.FC<HeroShowreelProps> = ({
  onExploreClick,
  onContactClick,
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Auto-advance slideshow
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % TIMELINE_SLIDES.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const activeSlide = TIMELINE_SLIDES[currentSlideIndex];

  return (
    <section id="hero" className="relative pt-12 pb-16 lg:py-20 overflow-hidden bg-[#0A0A0B]">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Eyebrow & Main Title */}
        <div className="text-center max-w-4xl mx-auto space-y-6 mb-12">
          
          {/* Availability Status Dot */}
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-[#111114] border border-[#1F1F23]">
            <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
            <span className="text-[10px] uppercase tracking-widest text-[#88888C] font-mono">
              AVAILABLE FOR VIDEO PRODUCTION &amp; POST-PRODUCTION
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tighter leading-[0.95] text-white">
            HE CREATES <br />
            <span className="italic font-serif-italic font-normal">through my lens</span>
          </h1>

          <p className="text-sm sm:text-base text-[#88888C] max-w-2xl mx-auto font-sans leading-relaxed">
            Ekreates.MOV studio directed by <strong className="text-white">Kisira Emmanuel</strong> — Videographer, Lead Video Editor, and Creative Director. Delivering high-retention visual storytelling, cinematic color grading, motion graphics, and mobile short-form content mastered using <span className="text-white font-medium">industry-standard post-production software</span>.
          </p>

          {/* Quick CTA row */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={onExploreClick}
              className="px-6 py-3 border border-[#3A3A3F] bg-white text-black text-[10px] font-bold tracking-widest uppercase hover:bg-transparent hover:text-white transition-all shadow-sm flex items-center gap-2"
            >
              <Film className="w-3.5 h-3.5" />
              <span>Selected Works</span>
            </button>

            <button
              onClick={onContactClick}
              className="px-6 py-3 border border-[#1F1F23] bg-[#111114] hover:border-[#3A3A3F] text-[#E2E2E2] text-[10px] font-bold tracking-widest uppercase transition-all flex items-center gap-2"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#88888C]" />
              <span>Get In Touch</span>
            </button>
          </div>
        </div>

        {/* Timeline Pictures & Workspace Slideshow Container */}
        <div className="relative overflow-hidden bg-[#111114] border border-[#1F1F23] shadow-2xl max-w-5xl mx-auto group">
          
          {/* Top Bar Header */}
          <div className="absolute top-3 left-3 right-3 sm:top-4 sm:left-4 sm:right-4 z-20 flex items-center justify-between pointer-events-none">
            <div className="flex items-center gap-2 bg-[#0A0A0B]/90 backdrop-blur-md px-3 py-1.5 border border-[#1F1F23] pointer-events-auto">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-[10px] font-mono font-bold tracking-widest text-amber-400 uppercase">
                POST-PRODUCTION WORKSPACE ({activeSlide.number}/{TIMELINE_SLIDES.length})
              </span>
              <span className="hidden sm:inline text-[9px] bg-[#1F1F23] text-white px-2 py-0.5 font-mono uppercase">
                {activeSlide.software}
              </span>
            </div>

            <div className="flex items-center gap-2 pointer-events-auto">
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-1.5 bg-[#0A0A0B]/90 text-[#88888C] hover:text-white border border-[#1F1F23] transition-all"
                title="Toggle Fullscreen Picture View"
              >
                <Maximize className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Main Picture Frame */}
          <div className={`relative w-full bg-black flex items-center justify-center overflow-hidden transition-all ${
            isFullscreen ? 'h-[80vh]' : 'aspect-[16/10] sm:aspect-[16/9]'
          }`}>
            
            {/* Timeline Workspace Image */}
            <img
              src={activeSlide.image}
              alt={activeSlide.title}
              className="w-full h-full object-contain transition-transform duration-700"
            />

            {/* Gradient Shadow Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B] via-transparent to-black/40 pointer-events-none" />

            {/* Previous & Next Slide Controls */}
            <button
              onClick={() => setCurrentSlideIndex((prev) => (prev - 1 + TIMELINE_SLIDES.length) % TIMELINE_SLIDES.length)}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded bg-[#0A0A0B]/80 hover:bg-white text-white hover:text-black border border-[#2A2A30] transition-all group shadow-xl"
              title="Previous Timeline Picture"
            >
              <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
            </button>

            <button
              onClick={() => setCurrentSlideIndex((prev) => (prev + 1) % TIMELINE_SLIDES.length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded bg-[#0A0A0B]/80 hover:bg-white text-white hover:text-black border border-[#2A2A30] transition-all group shadow-xl"
              title="Next Timeline Picture"
            >
              <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            </button>

            {/* Active Slide Specs Overlay */}
            <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 z-20 flex flex-col sm:flex-row items-start sm:items-center justify-between bg-[#0A0A0B]/95 backdrop-blur-md p-3.5 rounded border border-[#1F1F23] gap-3">
              <div className="flex items-center gap-3 w-full sm:w-auto overflow-hidden">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-2 border border-[#3A3A3F] bg-white text-black hover:bg-transparent hover:text-white transition-all shrink-0"
                  title={isPlaying ? "Pause Slideshow" : "Start Slideshow"}
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current ml-0.5" />}
                </button>

                <div className="overflow-hidden">
                  <p className="text-xs sm:text-sm font-bold text-white tracking-wide truncate">
                    {activeSlide.title}
                  </p>
                  <p className="text-[10px] sm:text-xs text-[#88888C] font-mono truncate">
                    {activeSlide.description}
                  </p>
                </div>
              </div>

              {/* Specs Pills */}
              <div className="hidden lg:flex items-center gap-1.5 shrink-0">
                {activeSlide.specs.map((spec, idx) => (
                  <span key={idx} className="text-[9px] font-mono text-[#E2E2E2] bg-[#111114] border border-[#1F1F23] px-2 py-0.5 rounded">
                    {spec}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Interactive Timeline Pictures Selector Grid */}
          <div className="p-4 bg-[#0A0A0B] border-t border-[#1F1F23] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clapperboard className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-mono uppercase tracking-wider text-white font-semibold">
                  Post-Production Timeline Screenshots &amp; Workstations
                </span>
              </div>
              <span className="text-[10px] font-mono text-[#88888C] hidden sm:inline">
                Click any picture to inspect Adobe workspace
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
              {TIMELINE_SLIDES.map((slide, idx) => (
                <button
                  key={slide.id}
                  onClick={() => {
                    setCurrentSlideIndex(idx);
                    setIsPlaying(false);
                  }}
                  className={`p-2 rounded border text-left transition-all relative overflow-hidden flex flex-col justify-between ${
                    idx === currentSlideIndex
                      ? 'bg-[#18181C] border-white text-white shadow-md'
                      : 'bg-[#111114] border-[#1F1F23] text-[#88888C] hover:border-[#3A3A3F] hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[9px] font-mono text-amber-400 font-bold">
                      SLIDE {slide.number}
                    </span>
                    <span className="text-[8px] font-mono text-[#88888C] uppercase">
                      {slide.software}
                    </span>
                  </div>
                  <p className="text-[11px] font-medium line-clamp-1 text-white">
                    {slide.title}
                  </p>
                  {idx === currentSlideIndex && (
                    <div className="mt-1.5 h-0.5 bg-amber-400 rounded-full w-full animate-pulse" />
                  )}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Quick Stats & Credentials Banner */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-6 bg-[#111114] border border-[#1F1F23] text-center space-y-1">
            <p className="text-2xl sm:text-3xl font-light text-white font-mono uppercase tracking-wider">MULTIPLE</p>
            <p className="text-[10px] uppercase tracking-widest text-[#88888C]">Projects Delivered</p>
          </div>

          <div className="p-6 bg-[#111114] border border-[#1F1F23] text-center space-y-1">
            <p className="text-3xl font-light text-white font-mono">25M+</p>
            <p className="text-[10px] uppercase tracking-widest text-[#88888C]">Aggregate Views</p>
          </div>

          <div className="p-6 bg-[#111114] border border-[#1F1F23] text-center space-y-1">
            <p className="text-3xl font-light text-white font-mono">8K RAW</p>
            <p className="text-[10px] uppercase tracking-widest text-[#88888C]">Anamorphic Master</p>
          </div>

          <div className="p-6 bg-[#111114] border border-[#1F1F23] text-center space-y-1">
            <p className="text-2xl font-light text-white font-mono">Premiere &amp; AE</p>
            <p className="text-[10px] uppercase tracking-widest text-[#88888C]">Lead Post Editor</p>
          </div>
        </div>

      </div>
    </section>
  );
};
