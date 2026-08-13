export type ProjectNiche = 
  | 'commercials'
  | 'music_videos'
  | 'documentaries'
  | 'social_reels'
  | 'corporate'
  | 'events'
  | 'drone_fpv'
  | 'narrative';

export interface Project {
  id: string;
  title: string;
  client: string;
  niche: ProjectNiche;
  nicheLabel: string;
  thumbnailUrl: string;
  videoUrl: string; // HTML5 / sample MP4 video URL
  aspectRatio: '16:9' | '9:16' | '2.39:1';
  year: string;
  duration: string;
  role: string[];
  summary: string;
  description: string;
  viewsCount?: string;
  featured?: boolean;
  
  // Gear and Tech breakdown
  cameraUsed: string;
  lensesUsed: string;
  softwareUsed: string[];
  
  // Color Grading comparison data
  colorGradingBeforeUrl?: string;
  colorGradingAfterUrl?: string;
  colorProfile?: string; // e.g. RED IPP2 Log to Rec.709
  
  // Editing stats
  timelineTrackCount?: {
    videoTracks: number;
    audioTracks: number;
    vfxLayers: number;
    colorNodes: number;
  };
  
  // Client feedback
  testimonial?: {
    quote: string;
    clientName: string;
    clientTitle: string;
    avatarUrl?: string;
  };
}

export interface GearItem {
  id: string;
  name: string;
  category: 'camera' | 'lens' | 'drone' | 'audio' | 'lighting' | 'post_software' | 'post_hardware';
  categoryLabel: string;
  specs: string;
  description: string;
  iconName: string;
  badge?: string;
  availability?: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  role: string;
  company: string;
  logoUrl?: string;
  avatarUrl: string;
  profileUrl?: string;
  content: string;
  rating: number;
  projectTitle: string;
}

export interface ShowreelChapter {
  id: string;
  timestamp: string;
  seconds: number;
  title: string;
  niche: string;
  description: string;
}
