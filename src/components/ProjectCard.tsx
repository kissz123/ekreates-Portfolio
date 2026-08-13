import React, { useState } from 'react';
import { Play, Eye, Film, Sparkles, Sliders, Smartphone, Monitor } from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  onSelectProject: (project: Project) => void;
  layoutMode?: 'grid' | 'reels' | 'list';
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onSelectProject,
  layoutMode = 'grid',
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Vertical 9:16 Shorts Mode Layout
  if (layoutMode === 'reels' || project.aspectRatio === '9:16') {
    return (
      <div 
        onClick={() => onSelectProject(project)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative cursor-pointer bg-[#111114] border border-[#1F1F23] hover:border-[#3A3A3F] transition-all duration-300 shadow-xl flex flex-col h-[460px]"
      >
        {/* Aspect Ratio Header Indicator */}
        <div className="relative flex-1 bg-black overflow-hidden">
          <img
            src={project.thumbnailUrl}
            alt={project.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

          {/* Top Badges */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
            <span className="px-2.5 py-1 bg-[#0A0A0B]/90 backdrop-blur-md text-[9px] font-mono font-bold tracking-widest text-white border border-[#1F1F23] flex items-center gap-1 uppercase">
              <Smartphone className="w-3 h-3 text-[#88888C]" />
              <span>9:16 REEL</span>
            </span>
            <span className="text-[10px] font-mono text-[#88888C] bg-black/80 px-2 py-0.5 border border-[#1F1F23]">
              {project.duration}
            </span>
          </div>

          {/* Hover Play Button */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
            <div className="w-12 h-12 rounded-full border border-white flex items-center justify-center text-white transform group-hover:scale-110 transition-transform">
              <Play className="w-5 h-5 fill-white ml-0.5" />
            </div>
          </div>

          {/* Bottom Card Meta */}
          <div className="absolute bottom-3 left-3 right-3 space-y-1 text-white">
            <span className="text-[10px] font-mono text-[#88888C] font-semibold uppercase tracking-widest block">
              {project.client}
            </span>
            <h3 className="text-base font-medium text-white group-hover:underline transition-all line-clamp-1">
              {project.title}
            </h3>
            {project.viewsCount && (
              <p className="text-[11px] font-mono text-emerald-400">
                {project.viewsCount} VIEWS
              </p>
            )}
          </div>
        </div>

        {/* Roles footer */}
        <div className="p-3 bg-[#0A0A0B] border-t border-[#1F1F23] flex items-center justify-between text-[11px] text-[#88888C] font-mono">
          <span className="truncate">{project.role.join(' • ')}</span>
          <span className="text-white hover:underline shrink-0 pl-2 uppercase font-bold text-[10px]">
            VIEW →
          </span>
        </div>
      </div>
    );
  }

  // Standard List View Layout
  if (layoutMode === 'list') {
    return (
      <div 
        onClick={() => onSelectProject(project)}
        className="group cursor-pointer bg-[#111114] border border-[#1F1F23] hover:border-[#3A3A3F] p-4 transition-all duration-300 flex flex-col md:flex-row gap-4 items-center justify-between"
      >
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative w-28 h-18 bg-black shrink-0 border border-[#1F1F23] overflow-hidden">
            <img 
              src={project.thumbnailUrl} 
              alt={project.title} 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform" 
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <Play className="w-4 h-4 text-white fill-white group-hover:scale-110 transition-transform" />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-[#0A0A0B] text-[#88888C] text-[9px] font-mono border border-[#1F1F23] uppercase tracking-widest">
                {project.nicheLabel}
              </span>
              <span className="text-[11px] text-[#4A4A4F] font-mono">{project.year}</span>
            </div>
            <h3 className="text-base font-medium text-white group-hover:underline transition-all">
              {project.title}
            </h3>
            <p className="text-xs text-[#88888C] line-clamp-1 font-sans">{project.summary}</p>
          </div>
        </div>

        <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto pt-2 md:pt-0 border-t md:border-t-0 border-[#1F1F23]">
          <div className="text-right hidden sm:block">
            <p className="text-xs text-[#E2E2E2] font-mono">{project.cameraUsed}</p>
            <p className="text-[10px] text-[#88888C] font-mono uppercase">{project.softwareUsed.slice(0, 2).join(', ')}</p>
          </div>

          <button className="px-4 py-2 border border-[#3A3A3F] bg-white text-black text-[10px] font-bold tracking-widest uppercase hover:bg-transparent hover:text-white transition-all">
            Watch
          </button>
        </div>
      </div>
    );
  }

  // Default Grid View Layout (16:9 or 2.39:1)
  return (
    <div 
      onClick={() => onSelectProject(project)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative cursor-pointer bg-[#111114] border border-[#1F1F23] hover:border-[#3A3A3F] transition-all duration-300 shadow-xl flex flex-col"
    >
      {/* Thumbnail Aspect Container */}
      <div className="relative aspect-video w-full bg-black overflow-hidden">
        <img
          src={project.thumbnailUrl}
          alt={project.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 z-10" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-20">
          <span className="px-2.5 py-1 bg-[#0A0A0B]/90 backdrop-blur-md text-[9px] font-mono font-bold tracking-widest text-white/80 uppercase border border-[#1F1F23]">
            {project.nicheLabel}
          </span>
          <span className="text-[10px] font-mono text-[#88888C] bg-black/80 px-2 py-0.5 border border-[#1F1F23]">
            {project.duration}
          </span>
        </div>

        {/* Hover Overlay Play Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-30 bg-black/40 backdrop-blur-[1px]">
          <div className="w-12 h-12 rounded-full border border-white flex items-center justify-center text-white transform group-hover:scale-110 transition-transform">
            <Play className="w-5 h-5 fill-white ml-0.5" />
          </div>
        </div>

        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute bottom-3 right-3 z-20">
            <span className="px-2 py-0.5 bg-[#0A0A0B] text-white border border-[#3A3A3F] text-[9px] font-mono font-bold uppercase tracking-widest flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-400" /> FEATURED
            </span>
          </div>
        )}
      </div>

      {/* Card Details */}
      <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[10px] text-[#88888C] font-mono uppercase tracking-widest">
            <span>{project.client}</span>
            <span>{project.year}</span>
          </div>

          <h3 className="text-xl font-medium text-white group-hover:underline transition-all leading-snug">
            {project.title}
          </h3>

          <p className="text-xs text-[#88888C] line-clamp-2 leading-relaxed font-sans">
            {project.summary}
          </p>
        </div>

        {/* Roles and Specs Footer */}
        <div className="pt-3 border-t border-[#1F1F23] flex items-center justify-between text-xs text-[#88888C] font-mono">
          <div className="flex items-center gap-1.5 text-[11px]">
            <Film className="w-3.5 h-3.5 text-white/60" />
            <span className="truncate max-w-[180px]">{project.cameraUsed}</span>
          </div>

          {project.viewsCount && (
            <span className="text-emerald-400 text-[10px] uppercase font-mono">
              {project.viewsCount}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
