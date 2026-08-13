import React, { useState, useRef } from 'react';
import { 
  X, Play, Pause, Volume2, VolumeX, Maximize, Film, Camera, 
  Sliders, Layers, Sparkles, CheckCircle2, MessageSquare, ExternalLink, Share2, Award, Linkedin, ArrowLeft, Trash2
} from 'lucide-react';
import { Project } from '../types';
import { getYouTubeId } from '../utils/videoUtils';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onBookProjectWithData: (projectTitle: string) => void;
  onDeleteProject?: (projectId: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onBookProjectWithData,
  onDeleteProject,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [gradingSliderPos, setGradingSliderPos] = useState(50); // 0 to 100%
  const [activeTab, setActiveTab] = useState<'overview' | 'color' | 'timeline'>('overview');
  const videoRef = useRef<HTMLVideoElement | null>(null);

  if (!project) return null;

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-xl overflow-y-auto animate-in fade-in duration-200">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-5xl my-auto bg-[#0A0A0B] border border-[#1F1F23] overflow-hidden shadow-2xl text-[#E2E2E2] max-h-[92vh] flex flex-col">
        
        {/* Top Header Bar */}
        <div className="p-3 sm:p-4 bg-[#111114] border-b border-[#1F1F23] flex items-center justify-between shrink-0 gap-2">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0A0A0B] hover:bg-[#1A1A1E] text-white border border-[#1F1F23] hover:border-amber-500/50 text-xs font-mono tracking-wider transition-all rounded group shrink-0"
              title="Return to Previous Page"
            >
              <ArrowLeft className="w-4 h-4 text-amber-400 group-hover:-translate-x-0.5 transition-transform" />
              <span className="hidden sm:inline">Back to Previous Page</span>
              <span className="sm:hidden">Back</span>
            </button>
            <span className="hidden md:inline-block px-2.5 py-1 bg-[#0A0A0B] text-[#88888C] border border-[#1F1F23] text-[10px] font-mono uppercase tracking-widest shrink-0">
              {project.nicheLabel}
            </span>
            <h2 className="text-sm sm:text-base font-medium text-white truncate">
              {project.title}
            </h2>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {onDeleteProject && (
              <button
                onClick={() => {
                  if (window.confirm(`Are you sure you want to remove "${project.title}" from your portfolio?`)) {
                    onDeleteProject(project.id);
                    onClose();
                  }
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-red-950/60 hover:bg-red-900 text-red-300 border border-red-800/60 text-[10px] font-mono tracking-wider uppercase transition-all rounded"
                title="Remove Video from Portfolio"
              >
                <Trash2 className="w-3.5 h-3.5 text-red-400" />
                <span className="hidden sm:inline">Delete Video</span>
              </button>
            )}

            <button
              onClick={() => onBookProjectWithData(project.title)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 border border-[#3A3A3F] bg-white text-black font-bold text-[10px] tracking-widest uppercase hover:bg-transparent hover:text-white transition-all rounded"
            >
              <span>Inquire Similar Project</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 bg-[#0A0A0B] text-[#88888C] hover:text-white border border-[#1F1F23] transition-all rounded"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Modal Content */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {/* Main Video Player */}
          {(() => {
            const ytId = getYouTubeId(project.videoUrl);
            const isVertical = project.aspectRatio === '9:16';
            const isLinkedIn = project.videoUrl.includes('linkedin.com');

            if (isLinkedIn) {
              return (
                <div className="relative aspect-video w-full overflow-hidden bg-slate-900 border border-[#1F1F23] shadow-lg rounded-xl flex flex-col items-center justify-center p-6 text-center group">
                  <img
                    src={project.thumbnailUrl}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-25 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40" />
                  <div className="relative z-10 max-w-md space-y-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#0A66C2]/20 border border-[#0A66C2]/40 text-[#70B5F9] font-mono text-[11px] font-bold uppercase tracking-wider">
                      <Linkedin className="w-3.5 h-3.5" />
                      LinkedIn Creator Post
                    </span>
                    <h4 className="text-lg font-bold text-white">{project.title}</h4>
                    <p className="text-xs text-slate-300 line-clamp-2">{project.summary}</p>
                    <a
                      href={project.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0A66C2] hover:bg-[#004182] text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-lg transition-all transform hover:-translate-y-0.5"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Watch Post on LinkedIn</span>
                    </a>
                  </div>
                </div>
              );
            }

            if (ytId) {
              return (
                <div className={`relative w-full mx-auto overflow-hidden bg-black border border-[#1F1F23] shadow-lg ${isVertical ? 'max-w-xs sm:max-w-sm aspect-[9/16]' : 'aspect-video'}`}>
                  <iframe
                    src={`https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0&playsinline=1`}
                    title={project.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full object-cover border-0"
                  />
                  <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between bg-[#0A0A0B]/90 backdrop-blur-md p-1.5 border border-[#1F1F23] pointer-events-none">
                    <span className="text-[10px] font-mono text-amber-400">YOUTUBE SHOWCASE</span>
                    <span className="text-[10px] font-mono text-white">{project.duration}</span>
                  </div>
                </div>
              );
            }

            return (
              <div className="relative aspect-video w-full overflow-hidden bg-black border border-[#1F1F23] group shadow-lg">
                <video
                  ref={videoRef}
                  src={project.videoUrl}
                  poster={project.thumbnailUrl}
                  muted={isMuted}
                  loop
                  playsInline
                  onError={() => setIsPlaying(false)}
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none opacity-60" />

                {/* Play Button Overlay */}
                {!isPlaying && (
                  <div 
                    onClick={togglePlay}
                    className="absolute inset-0 flex items-center justify-center cursor-pointer bg-black/40 backdrop-blur-[2px]"
                  >
                    <div className="w-16 h-16 rounded-full border border-white text-white flex items-center justify-center hover:scale-110 transition-transform">
                      <Play className="w-7 h-7 fill-white ml-0.5" />
                    </div>
                  </div>
                )}

                {/* Player Controls Bar */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between bg-[#0A0A0B]/90 backdrop-blur-md p-2 border border-[#1F1F23]">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={togglePlay}
                      className="p-1.5 bg-white text-black font-bold"
                    >
                      {isPlaying ? <Pause className="w-4 h-4 fill-black" /> : <Play className="w-4 h-4 fill-black" />}
                    </button>

                    <button
                      onClick={toggleMute}
                      className="p-1.5 bg-[#111114] text-[#88888C] hover:text-white border border-[#1F1F23]"
                    >
                      {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
                    </button>

                    <span className="text-xs font-mono text-[#88888C] hidden sm:inline">
                      {project.duration} Master Cut
                    </span>
                  </div>

                  <span className="text-xs font-mono text-white">
                    {project.aspectRatio} Aspect Ratio
                  </span>
                </div>
              </div>
            );
          })()}

          {/* Deep-Dive Navigation Tabs */}
          <div className="flex items-center gap-2 border-b border-[#1F1F23] pb-2">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 text-[10px] font-mono tracking-widest uppercase flex items-center gap-2 transition-all border ${
                activeTab === 'overview'
                  ? 'bg-white text-black border-white font-bold'
                  : 'bg-[#111114] text-[#88888C] border-[#1F1F23] hover:text-white'
              }`}
            >
              <Film className="w-3.5 h-3.5" />
              <span>Project Specs &amp; Story</span>
            </button>

            {project.colorGradingBeforeUrl && (
              <button
                onClick={() => setActiveTab('color')}
                className={`px-4 py-2 text-[10px] font-mono tracking-widest uppercase flex items-center gap-2 transition-all border ${
                  activeTab === 'color'
                    ? 'bg-white text-black border-white font-bold'
                    : 'bg-[#111114] text-[#88888C] border-[#1F1F23] hover:text-white'
                }`}
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>LOG vs Graded Rec.709</span>
              </button>
            )}

            {project.timelineTrackCount && (
              <button
                onClick={() => setActiveTab('timeline')}
                className={`px-4 py-2 text-[10px] font-mono tracking-widest uppercase flex items-center gap-2 transition-all border ${
                  activeTab === 'timeline'
                    ? 'bg-white text-black border-white font-bold'
                    : 'bg-[#111114] text-[#88888C] border-[#1F1F23] hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Timeline &amp; Tracks</span>
              </button>
            )}
          </div>

          {/* TAB 1: OVERVIEW & SPECS */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Left 2 Columns: Description & Testimonial */}
              <div className="lg:col-span-2 space-y-5">
                <div className="space-y-2">
                  <h3 className="text-xl font-medium text-white">Project Overview</h3>
                  <p className="text-sm text-[#88888C] leading-relaxed font-sans">
                    {project.description}
                  </p>
                </div>

                {/* Roles list */}
                <div className="space-y-2">
                  <h4 className="text-[10px] font-mono uppercase tracking-widest text-[#88888C]">
                    Roles Executed
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.role.map((r, i) => (
                      <span key={i} className="px-3 py-1 bg-[#111114] border border-[#1F1F23] text-xs text-white font-mono">
                        ✓ {r}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Client Quote if available */}
                {project.testimonial && (
                  <div className="p-4 bg-[#111114] border border-[#1F1F23] space-y-3">
                    <div className="flex items-center gap-2 text-white font-mono text-xs uppercase tracking-widest">
                      <MessageSquare className="w-3.5 h-3.5 text-[#88888C]" />
                      <span>CLIENT FEEDBACK</span>
                    </div>
                    <p className="text-xs italic text-[#E2E2E2] leading-relaxed font-sans">
                      &quot;{project.testimonial.quote}&quot;
                    </p>
                    <div className="flex items-center gap-3 pt-1">
                      {project.testimonial.avatarUrl && (
                        <img 
                          src={project.testimonial.avatarUrl} 
                          alt={project.testimonial.clientName}
                          referrerPolicy="no-referrer"
                          className="w-8 h-8 rounded-full object-cover border border-[#1F1F23]"
                        />
                      )}
                      <div>
                        <p className="text-xs font-bold text-white">{project.testimonial.clientName}</p>
                        <p className="text-[11px] text-[#88888C]">{project.testimonial.clientTitle}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column: Gear & Tech Specs Box */}
              <div className="bg-[#111114] p-5 border border-[#1F1F23] space-y-4 h-fit">
                <h4 className="text-[10px] font-mono uppercase tracking-widest text-[#88888C] font-bold border-b border-[#1F1F23] pb-2">
                  Gear &amp; Technical Specs
                </h4>

                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-[#88888C] block font-mono text-[10px]">CAMERA BODY</span>
                    <span className="text-white font-medium">{project.cameraUsed}</span>
                  </div>

                  <div>
                    <span className="text-[#88888C] block font-mono text-[10px]">OPTICS / LENSES</span>
                    <span className="text-white font-medium">{project.lensesUsed}</span>
                  </div>

                  <div>
                    <span className="text-[#88888C] block font-mono text-[10px]">POST SOFTWARE</span>
                    <span className="text-white font-mono">{project.softwareUsed.join(' • ')}</span>
                  </div>

                  {project.colorProfile && (
                    <div>
                      <span className="text-[#88888C] block font-mono text-[10px]">COLOR PROFILE</span>
                      <span className="text-[#88888C] font-mono text-[11px]">{project.colorProfile}</span>
                    </div>
                  )}

                  {project.viewsCount && (
                    <div className="pt-2 border-t border-[#1F1F23]">
                      <span className="text-[#88888C] block font-mono text-[10px]">STATS</span>
                      <span className="text-emerald-400 font-bold text-sm">{project.viewsCount}</span>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => onBookProjectWithData(project.title)}
                  className="w-full py-2.5 border border-[#3A3A3F] bg-white text-black font-bold text-[10px] tracking-widest uppercase hover:bg-transparent hover:text-white transition-all text-center mt-2"
                >
                  Inquire Similar Project
                </button>
              </div>

            </div>
          )}

          {/* TAB 2: BEFORE / AFTER COLOR GRADING SLIDER */}
          {activeTab === 'color' && project.colorGradingBeforeUrl && project.colorGradingAfterUrl && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-[#88888C]">
                <span className="font-mono">
                  Interactive Color Grading Comparison (Drag Slider)
                </span>
                <span className="font-mono text-white">
                  {project.colorProfile || 'Raw Log C-Log3 vs Rec.709 Master'}
                </span>
              </div>

              {/* Interactive Split Image Container */}
              <div className="relative aspect-video w-full overflow-hidden bg-black select-none border border-[#1F1F23]">
                {/* Before Image (Flat Log) */}
                <img
                  src={project.colorGradingBeforeUrl}
                  alt="Flat Log Footage"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* After Image (Graded) clipped by slider percentage */}
                <div 
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: `${gradingSliderPos}%` }}
                >
                  <img
                    src={project.colorGradingAfterUrl}
                    alt="Graded Master Rec.709"
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover max-w-none"
                    style={{ width: '100%', height: '100%' }}
                  />
                  <div className="absolute top-4 left-4 bg-white text-black px-2.5 py-1 text-[10px] font-mono font-bold tracking-widest uppercase">
                    FINAL GRADED REC.709 ({gradingSliderPos}%)
                  </div>
                </div>

                <div className="absolute top-4 right-4 bg-black/80 text-[#88888C] border border-[#1F1F23] px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest">
                  RAW LOG / UNGRADED
                </div>

                {/* Vertical Divider Drag Line */}
                <div 
                  className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)] cursor-ew-resize flex items-center justify-center"
                  style={{ left: `${gradingSliderPos}%` }}
                >
                  <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-bold text-xs shadow-xl">
                    ↔
                  </div>
                </div>

                {/* Transparent Range Input Slider on top */}
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={gradingSliderPos}
                  onChange={(e) => setGradingSliderPos(Number(e.target.value))}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-10"
                />
              </div>

              <p className="text-xs text-[#88888C] text-center font-mono">
                💡 Drag left or right to inspect skin tones, highlight rolloff, and shadow detail recovery.
              </p>
            </div>
          )}

          {/* TAB 3: TIMELINE & EDITING TRACKS */}
          {activeTab === 'timeline' && project.timelineTrackCount && (
            <div className="space-y-5 bg-[#111114] p-5 border border-[#1F1F23]">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-medium text-white font-mono uppercase tracking-widest">
                    TIMELINE BREAKDOWN
                  </h3>
                  <p className="text-xs text-[#88888C]">
                    Visual composition of video tracks, audio stems, and color node tree
                  </p>
                </div>
                <span className="text-xs font-mono text-white bg-[#0A0A0B] px-3 py-1 border border-[#1F1F23]">
                  {project.softwareUsed[0]} Sequence
                </span>
              </div>

              {/* Tracks Diagram */}
              <div className="space-y-3 font-mono text-xs">
                
                {/* Video Tracks */}
                <div className="space-y-1">
                  <span className="text-[#88888C] text-[10px] block font-bold uppercase tracking-widest">
                    VIDEO TRACKS ({project.timelineTrackCount.videoTracks} LAYERS)
                  </span>
                  <div className="grid grid-cols-6 gap-1 bg-[#0A0A0B] p-2 border border-[#1F1F23]">
                    <div className="col-span-6 bg-[#111114] border border-[#1F1F23] text-white p-2 text-[11px] flex justify-between">
                      <span>V6 - Title Captions &amp; Lower Thirds</span>
                      <span>Overlay</span>
                    </div>
                    <div className="col-span-4 bg-[#111114] border border-[#1F1F23] text-white p-2 text-[11px] flex justify-between">
                      <span>V3 - Motion FX &amp; Speed Ramps</span>
                      <span>VFX</span>
                    </div>
                    <div className="col-span-6 bg-[#111114] border border-[#1F1F23] text-[#88888C] p-2 text-[11px] flex justify-between">
                      <span>V1 - Primary 8K B-Roll Sequence</span>
                      <span>Base</span>
                    </div>
                  </div>
                </div>

                {/* Audio Stems */}
                <div className="space-y-1 pt-2">
                  <span className="text-[#88888C] text-[10px] block font-bold uppercase tracking-widest">
                    AUDIO STEMS ({project.timelineTrackCount.audioTracks} CHANNELS)
                  </span>
                  <div className="grid grid-cols-12 gap-1 bg-[#0A0A0B] p-2 border border-[#1F1F23]">
                    <div className="col-span-4 bg-[#111114] border border-[#1F1F23] text-[#88888C] p-2 text-[11px]">
                      A1 Dialogue &amp; Lavs
                    </div>
                    <div className="col-span-4 bg-[#111114] border border-[#1F1F23] text-[#88888C] p-2 text-[11px]">
                      A3 Foley &amp; Sound FX
                    </div>
                    <div className="col-span-4 bg-[#111114] border border-[#1F1F23] text-[#88888C] p-2 text-[11px]">
                      A7 Music Master
                    </div>
                  </div>
                </div>

                {/* Color Nodes */}
                <div className="pt-2 flex items-center justify-between text-xs text-[#E2E2E2] bg-[#0A0A0B] p-3 border border-[#1F1F23]">
                  <span className="text-[#88888C]">Node Complexity:</span>
                  <span className="text-white font-bold">
                    {project.timelineTrackCount.colorNodes} Nodes (Exposure, Balance, Qualifier, Grain)
                  </span>
                </div>

              </div>
            </div>
          )}

          {/* Bottom Back Button Footer Action */}
          <div className="pt-6 border-t border-[#1F1F23] flex flex-wrap items-center justify-between gap-4">
            <button
              onClick={onClose}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#111114] hover:bg-[#1A1A1E] text-white border border-[#1F1F23] hover:border-amber-500/50 text-xs font-mono uppercase tracking-wider transition-all rounded group"
            >
              <ArrowLeft className="w-4 h-4 text-amber-400 group-hover:-translate-x-0.5 transition-transform" />
              <span>Back to Previous Page</span>
            </button>

            <button
              onClick={() => onBookProjectWithData(project.title)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-widest transition-all rounded shadow-md"
            >
              <span>Inquire Similar Project</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
