import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, Pause, Volume2, VolumeX, Maximize, Film, Sparkles, 
  CheckCircle2, Flame, Award, Sliders, ChevronRight, MessageSquare, Headphones
} from 'lucide-react';
import { SHOWREEL_CHAPTERS } from '../data/projectsData';
import { getYouTubeId } from '../utils/videoUtils';

interface HeroShowreelProps {
  onExploreClick: () => void;
  onContactClick: () => void;
}

export const HeroShowreel: React.FC<HeroShowreelProps> = ({
  onExploreClick,
  onContactClick,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [quality, setQuality] = useState<'4K UHD' | '1080p'>('4K UHD');
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [isCommentaryMode, setIsCommentaryMode] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // User's flagship showreel video
  const sampleShowreelUrl = "https://youtube.com/shorts/_e-2YjdlOi0?feature=share";
  const ytId = getYouTubeId(sampleShowreelUrl);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => setIsPlaying(true))
            .catch(() => setIsPlaying(false));
        } else {
          setIsPlaying(true);
        }
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleSeekChapter = (seconds: number, index: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = seconds;
      if (!isPlaying) {
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => setIsPlaying(true))
            .catch(() => setIsPlaying(false));
        }
      }
      setActiveChapterIndex(index);
    }
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

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
            Ekreates.MOV studio directed by <strong className="text-white">Kisira Emmanuel</strong> — Videographer, Lead Video Editor, and Creative Director. Delivering high-retention visual storytelling, cinematic color grading, motion graphics, and mobile short-form content mastered in <span className="text-white font-medium">Adobe Premiere Pro, After Effects, Photoshop</span>, and <span className="text-white font-medium">CapCut Pro</span>.
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

        {/* Showreel Video Player Container */}
        <div className="relative overflow-hidden bg-[#111114] border border-[#1F1F23] shadow-2xl group">
          
          {/* Top Bar Status Badges */}
          <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
            <div className="flex items-center gap-2.5 bg-[#0A0A0B]/90 backdrop-blur-md px-3.5 py-1.5 border border-[#1F1F23] pointer-events-auto">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-[10px] font-mono font-bold tracking-widest text-white uppercase">2026 DIRECTOR&apos;S REEL</span>
              <span className="text-[9px] bg-[#1F1F23] text-[#88888C] px-1.5 py-0.5 font-mono uppercase">
                {quality}
              </span>
            </div>

            <div className="flex items-center gap-2 pointer-events-auto">
              {/* Commentary audio mode */}
              <button
                onClick={() => setIsCommentaryMode(!isCommentaryMode)}
                className={`flex items-center gap-1.5 px-3 py-1 text-[10px] font-mono uppercase tracking-wider border transition-all ${
                  isCommentaryMode 
                    ? 'bg-white text-black border-white font-bold' 
                    : 'bg-[#0A0A0B]/90 text-[#88888C] border-[#1F1F23] hover:text-white'
                }`}
                title="Toggle Director's Audio Commentary Track"
              >
                <Headphones className="w-3 h-3" />
                <span className="hidden sm:inline">Commentary</span>
              </button>

              {/* Quality selector */}
              <button
                onClick={() => setQuality(quality === '4K UHD' ? '1080p' : '4K UHD')}
                className="bg-[#0A0A0B]/90 text-[#88888C] hover:text-white border border-[#1F1F23] px-2.5 py-1 text-[10px] font-mono transition-all uppercase"
              >
                {quality}
              </button>
            </div>
          </div>

          {/* Actual Video Element */}
          <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden">
            {ytId ? (
              <iframe
                src={`https://www.youtube.com/embed/${ytId}?autoplay=0&rel=0&playsinline=1`}
                title="Ekreates Director Showreel"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full object-cover border-0"
              />
            ) : (
              <video
                ref={videoRef}
                src={sampleShowreelUrl}
                poster="https://images.unsplash.com/photo-1518173946687-a4c8a383392e?auto=format&fit=crop&w=1600&q=80"
                muted={isMuted}
                loop
                playsInline
                onError={() => setVideoError(true)}
                className="w-full h-full object-cover"
              />
            )}

            {/* Overlay Gradient for readability */}
            {!ytId && <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B] via-transparent to-black/50 pointer-events-none" />}

            {/* Play Button Overlay (when paused for HTML5 video) */}
            {!ytId && !isPlaying && (
              <div 
                onClick={togglePlay}
                className="absolute inset-0 flex items-center justify-center cursor-pointer bg-black/40 backdrop-blur-[2px] transition-all hover:bg-black/30"
              >
                <div className="w-16 h-16 rounded-full border border-white/30 bg-black/60 backdrop-blur-md flex items-center justify-center text-white transition-transform group-hover:scale-110">
                  <Play className="w-6 h-6 fill-white ml-1" />
                </div>
              </div>
            )}

            {/* Commentary Banner (if active) */}
            {isCommentaryMode && (
              <div className="absolute bottom-16 left-4 right-4 sm:left-6 sm:right-6 bg-[#0A0A0B]/95 border border-[#3A3A3F] backdrop-blur-md p-3.5 text-xs text-[#E2E2E2] flex items-center gap-3">
                <MessageSquare className="w-4 h-4 text-white shrink-0" />
                <div>
                  <span className="font-bold text-white font-mono uppercase tracking-wider text-[10px] block">DIRECTOR COMMENTARY: </span>
                  <span className="italic font-serif-italic text-sm text-[#88888C]">
                    &quot;{SHOWREEL_CHAPTERS[activeChapterIndex].description}&quot;
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Interactive Player Controls & Chapter Selector */}
          <div className="p-4 bg-[#0A0A0B] border-t border-[#1F1F23] space-y-3">
            
            {/* Player Main Controls Row */}
            <div className="flex flex-wrap items-center justify-between gap-3 text-[#E2E2E2]">
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  className="p-2 border border-[#3A3A3F] bg-white text-black hover:bg-transparent hover:text-white transition-all"
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                </button>

                <button
                  onClick={toggleMute}
                  className="p-2 bg-[#111114] border border-[#1F1F23] text-[#88888C] hover:text-white transition-all"
                  title={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? <VolumeX className="w-3.5 h-3.5 text-red-400" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-400" />}
                </button>

                <div className="text-[11px] font-mono text-[#88888C] hidden sm:block">
                  <span className="text-white font-bold">{SHOWREEL_CHAPTERS[activeChapterIndex].timestamp}</span> / 02:30
                </div>
              </div>

              <div className="text-[11px] font-mono text-[#88888C] flex items-center gap-2">
                <span className="text-[#4A4A4F] uppercase tracking-widest">CHAPTER:</span>
                <span className="text-white font-semibold uppercase">{SHOWREEL_CHAPTERS[activeChapterIndex].title}</span>
              </div>

              <button
                onClick={toggleFullscreen}
                className="p-2 bg-[#111114] border border-[#1F1F23] text-[#88888C] hover:text-white transition-all"
                title="Fullscreen"
              >
                <Maximize className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Chapters Timestamp Selector Pills */}
            <div className="pt-2 border-t border-[#1F1F23] flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
              <span className="text-[10px] font-mono text-[#4A4A4F] uppercase tracking-widest shrink-0 pr-1">
                INDEX:
              </span>
              {SHOWREEL_CHAPTERS.map((ch, idx) => (
                <button
                  key={ch.id}
                  onClick={() => handleSeekChapter(ch.seconds, idx)}
                  className={`shrink-0 px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider flex items-center gap-1.5 transition-all border ${
                    activeChapterIndex === idx
                      ? 'bg-white text-black border-white font-bold'
                      : 'bg-[#111114] border-[#1F1F23] text-[#88888C] hover:text-white hover:border-[#3A3A3F]'
                  }`}
                >
                  <span className="font-bold">{ch.timestamp}</span>
                  <span>{ch.niche}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Stats & Credentials Banner */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-6 bg-[#111114] border border-[#1F1F23] text-center space-y-1">
            <p className="text-3xl font-light text-white font-mono">120+</p>
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
