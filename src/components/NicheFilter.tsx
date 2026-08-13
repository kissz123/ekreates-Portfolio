import React from 'react';
import { 
  Search, Grid, Smartphone, List, Sparkles, Filter, 
  Tv, Music, Film, Video, Globe, Camera, Compass 
} from 'lucide-react';
import { ProjectNiche } from '../types';

interface NicheFilterProps {
  selectedNiche: ProjectNiche | 'all';
  onSelectNiche: (niche: ProjectNiche | 'all') => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  layoutMode: 'grid' | 'reels' | 'list';
  onLayoutModeChange: (mode: 'grid' | 'reels' | 'list') => void;
  totalResultsCount: number;
}

const NICHES_LIST: { id: ProjectNiche | 'all'; label: string; icon: React.FC<{ className?: string }> }[] = [
  { id: 'all', label: 'All Niches', icon: Sparkles },
  { id: 'commercials', label: 'Commercials & Ads', icon: Tv },
  { id: 'music_videos', label: 'Music Videos', icon: Music },
  { id: 'documentaries', label: 'Documentaries', icon: Film },
  { id: 'social_reels', label: 'Social Reels (9:16)', icon: Smartphone },
  { id: 'drone_fpv', label: 'Drone & FPV', icon: Compass },
  { id: 'corporate', label: 'Corporate Stories', icon: Video },
  { id: 'events', label: 'Events & Festivals', icon: Globe },
  { id: 'narrative', label: 'Cinematic Narrative', icon: Camera },
];

export const NicheFilter: React.FC<NicheFilterProps> = ({
  selectedNiche,
  onSelectNiche,
  searchQuery,
  onSearchChange,
  layoutMode,
  onLayoutModeChange,
  totalResultsCount,
}) => {
  return (
    <div className="space-y-6">
      
      {/* Top Search & View Switcher Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-[#111114] border border-[#1F1F23] p-4 shadow-xl">
        
        {/* Real-time Search Box */}
        <div className="relative w-full md:w-96">
          <Search className="w-3.5 h-3.5 text-[#88888C] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by client, camera, Premiere, CapCut..."
            className="w-full bg-[#0A0A0B] text-[#E2E2E2] placeholder-[#4A4A4F] text-xs pl-9 pr-4 py-2.5 border border-[#1F1F23] focus:outline-none focus:border-[#3A3A3F] font-sans"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-[#88888C] hover:text-white uppercase"
            >
              Clear
            </button>
          )}
        </div>

        {/* Results Count & Layout Switcher */}
        <div className="flex items-center justify-between w-full md:w-auto gap-4">
          <span className="text-[11px] font-mono text-[#88888C] uppercase tracking-wider">
            FILTERED: <strong className="text-white">{totalResultsCount}</strong> WORKS
          </span>

          <div className="flex items-center gap-1 bg-[#0A0A0B] p-1 border border-[#1F1F23]">
            <button
              onClick={() => onLayoutModeChange('grid')}
              className={`p-2 text-[10px] font-mono uppercase tracking-wider flex items-center gap-1 transition-all ${
                layoutMode === 'grid'
                  ? 'bg-white text-black font-bold'
                  : 'text-[#88888C] hover:text-white'
              }`}
              title="Grid View (16:9)"
            >
              <Grid className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Grid</span>
            </button>

            <button
              onClick={() => onLayoutModeChange('reels')}
              className={`p-2 text-[10px] font-mono uppercase tracking-wider flex items-center gap-1 transition-all ${
                layoutMode === 'reels'
                  ? 'bg-white text-black font-bold'
                  : 'text-[#88888C] hover:text-white'
              }`}
              title="Vertical Reels View (9:16)"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">9:16 Reels</span>
            </button>

            <button
              onClick={() => onLayoutModeChange('list')}
              className={`p-2 text-[10px] font-mono uppercase tracking-wider flex items-center gap-1 transition-all ${
                layoutMode === 'list'
                  ? 'bg-white text-black font-bold'
                  : 'text-[#88888C] hover:text-white'
              }`}
              title="Compact List View"
            >
              <List className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">List</span>
            </button>
          </div>
        </div>
      </div>

      {/* Niche Categories Pill Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-2">
        {NICHES_LIST.map((niche) => {
          const Icon = niche.icon;
          const isSelected = selectedNiche === niche.id;

          return (
            <button
              key={niche.id}
              onClick={() => onSelectNiche(niche.id)}
              className={`shrink-0 px-4 py-2.5 text-[10px] font-mono uppercase tracking-widest flex items-center gap-2 transition-all border ${
                isSelected
                  ? 'bg-white text-black border-white font-bold'
                  : 'bg-[#111114] border-[#1F1F23] text-[#88888C] hover:text-white hover:border-[#3A3A3F]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{niche.label}</span>
            </button>
          );
        })}
      </div>

    </div>
  );
};
