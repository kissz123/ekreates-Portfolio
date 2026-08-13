import React, { useState } from 'react';
import { X, Plus, Video, Film, Sparkles, Image, Check, Trash2, Link, ArrowLeft } from 'lucide-react';
import { Project, ProjectNiche } from '../types';

interface AddProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProject: (newProject: Project) => void;
}

const PRESET_THUMBNAILS = [
  { label: 'Cinematic Night', url: 'https://images.unsplash.com/photo-1518173946687-a4c8a383392e?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Studio Concert', url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Urban Fashion', url: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Motion FX & Compositing', url: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Corporate Tech', url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80' },
];

const PRESET_VIDEOS = [
  { label: 'Sample MP4 (Big Buck Bunny)', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
  { label: 'Sample MP4 (Elephants Dream)', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' },
  { label: 'Sample MP4 (For Bigger Blazes)', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' },
  { label: 'Sample MP4 (For Bigger Escapes)', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4' },
];

export const AddProjectModal: React.FC<AddProjectModalProps> = ({
  isOpen,
  onClose,
  onAddProject,
}) => {
  const [title, setTitle] = useState('');
  const [client, setClient] = useState('');
  const [niche, setNiche] = useState<ProjectNiche>('commercials');
  const [videoUrl, setVideoUrl] = useState('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4');
  const [thumbnailUrl, setThumbnailUrl] = useState('https://images.unsplash.com/photo-1518173946687-a4c8a383392e?auto=format&fit=crop&w=1200&q=80');
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16' | '2.39:1'>('16:9');
  const [year, setYear] = useState('2026');
  const [duration, setDuration] = useState('1:30');
  const [summary, setSummary] = useState('');
  const [description, setDescription] = useState('');
  const [featured, setFeatured] = useState(false);
  
  // Tech Specs
  const [cameraUsed, setCameraUsed] = useState('Sony FX6 / FX3 (On-Demand)');
  const [lensesUsed, setLensesUsed] = useState('Sony GM Lenses / Anamorphic Primes');
  
  // Software Checkboxes
  const [selectedSoftware, setSelectedSoftware] = useState<string[]>([
    'Adobe Premiere Pro',
    'After Effects',
    'CapCut Pro',
  ]);

  const softwareOptions = [
    'Adobe Premiere Pro',
    'After Effects',
    'Photoshop',
    'CapCut Pro',
    'DaVinci Resolve',
  ];

  const handleSoftwareToggle = (sw: string) => {
    if (selectedSoftware.includes(sw)) {
      setSelectedSoftware(selectedSoftware.filter((s) => s !== sw));
    } else {
      setSelectedSoftware([...selectedSoftware, sw]);
    }
  };

  const getNicheLabel = (n: ProjectNiche): string => {
    switch (n) {
      case 'commercials': return 'Commercial & Brand';
      case 'music_videos': return 'Music Video';
      case 'documentaries': return 'Documentary';
      case 'social_reels': return 'Social Reel (9:16)';
      case 'corporate': return 'Corporate Story';
      case 'events': return 'Event Aftermovie';
      case 'motion_fx': return 'Motion FX & Post';
      case 'narrative': return 'Short Film';
      default: return 'Video Project';
    }
  };

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !client.trim()) return;

    const newProject: Project = {
      id: `custom_${Date.now()}`,
      title: title.trim(),
      client: client.trim(),
      niche,
      nicheLabel: getNicheLabel(niche),
      thumbnailUrl: thumbnailUrl.trim() || PRESET_THUMBNAILS[0].url,
      videoUrl: videoUrl.trim() || PRESET_VIDEOS[0].url,
      aspectRatio,
      year: year.trim() || '2026',
      duration: duration.trim() || '1:30',
      role: ['Lead Videographer', 'Lead Post Editor'],
      summary: summary.trim() || `${title} video created for ${client}.`,
      description: description.trim() || summary.trim() || `Full post-production and editing assembly created in Adobe Premiere Pro and After Effects for ${client}.`,
      featured,
      cameraUsed: cameraUsed.trim() || 'Production Cinema Camera',
      lensesUsed: lensesUsed.trim() || 'Cinema Primes',
      softwareUsed: selectedSoftware.length > 0 ? selectedSoftware : ['Adobe Premiere Pro', 'After Effects'],
      timelineTrackCount: {
        videoTracks: aspectRatio === '9:16' ? 4 : 8,
        audioTracks: 6,
        vfxLayers: 12,
        colorNodes: 10,
      },
    };

    onAddProject(newProject);
    onClose();

    // Reset form
    setTitle('');
    setClient('');
    setSummary('');
    setDescription('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#0D0D10] border border-[#1F1F23] rounded-xl shadow-2xl overflow-hidden my-8">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1F1F23] bg-[#111114]">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0A0A0B] hover:bg-[#1A1A1E] text-white border border-[#1F1F23] hover:border-amber-500/50 text-xs font-mono transition-all rounded group"
              title="Return to Previous Page"
            >
              <ArrowLeft className="w-4 h-4 text-amber-400 group-hover:-translate-x-0.5 transition-transform" />
              <span>Back</span>
            </button>
            <div>
              <h3 className="text-base font-bold text-white tracking-wide">Add New Portfolio Work</h3>
              <p className="text-xs text-[#88888C] font-mono">Expand Ekreates Portfolio Gallery</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#88888C] hover:text-white hover:bg-[#1F1F23] transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body / Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Main Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-mono text-[#88888C] block uppercase tracking-widest mb-1">
                Project Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Nike Kinetic Commercial"
                className="w-full bg-[#0A0A0B] text-white text-xs px-3.5 py-2.5 border border-[#1F1F23] rounded-lg focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="text-[10px] font-mono text-[#88888C] block uppercase tracking-widest mb-1">
                Client / Brand *
              </label>
              <input
                type="text"
                required
                value={client}
                onChange={(e) => setClient(e.target.value)}
                placeholder="e.g. Nike Africa / Self-Produced"
                className="w-full bg-[#0A0A0B] text-white text-xs px-3.5 py-2.5 border border-[#1F1F23] rounded-lg focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Niche Category & Aspect Ratio */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-[10px] font-mono text-[#88888C] block uppercase tracking-widest mb-1">
                Niche / Category
              </label>
              <select
                value={niche}
                onChange={(e) => setNiche(e.target.value as ProjectNiche)}
                className="w-full bg-[#0A0A0B] text-white text-xs px-3.5 py-2.5 border border-[#1F1F23] rounded-lg focus:outline-none focus:border-amber-500"
              >
                <option value="commercials">Commercial & Brand</option>
                <option value="music_videos">Music Video</option>
                <option value="social_reels">Social Reel (9:16 Vertical)</option>
                <option value="corporate">Corporate & Tech</option>
                <option value="events">Event Aftermovie</option>
                <option value="documentaries">Documentary</option>
                <option value="motion_fx">Motion FX &amp; Visual Post</option>
                <option value="narrative">Short Film / Narrative</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] font-mono text-[#88888C] block uppercase tracking-widest mb-1">
                Aspect Ratio
              </label>
              <select
                value={aspectRatio}
                onChange={(e) => setAspectRatio(e.target.value as any)}
                className="w-full bg-[#0A0A0B] text-white text-xs px-3.5 py-2.5 border border-[#1F1F23] rounded-lg focus:outline-none focus:border-amber-500"
              >
                <option value="16:9">16:9 Widescreen</option>
                <option value="9:16">9:16 Vertical Mobile</option>
                <option value="2.39:1">2.39:1 Anamorphic Scope</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] font-mono text-[#88888C] block uppercase tracking-widest mb-1">
                Year & Duration
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  placeholder="2026"
                  className="w-1/2 bg-[#0A0A0B] text-white text-xs px-3 py-2.5 border border-[#1F1F23] rounded-lg focus:outline-none focus:border-amber-500 font-mono text-center"
                />
                <input
                  type="text"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="1:30"
                  className="w-1/2 bg-[#0A0A0B] text-white text-xs px-3 py-2.5 border border-[#1F1F23] rounded-lg focus:outline-none focus:border-amber-500 font-mono text-center"
                />
              </div>
            </div>
          </div>

          {/* Video URL */}
          <div>
            <label className="text-[10px] font-mono text-[#88888C] block uppercase tracking-widest mb-1">
              Video File URL (MP4 / Direct Link)
            </label>
            <div className="relative">
              <input
                type="text"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="https://domain.com/my-video.mp4"
                className="w-full bg-[#0A0A0B] text-white text-xs pl-9 pr-3.5 py-2.5 border border-[#1F1F23] rounded-lg focus:outline-none focus:border-amber-500 font-mono"
              />
              <Link className="w-4 h-4 text-[#88888C] absolute left-3 top-3" />
            </div>

            {/* Presets */}
            <div className="mt-2 flex flex-wrap gap-2">
              <span className="text-[10px] font-mono text-[#88888C] self-center">Presets:</span>
              {PRESET_VIDEOS.map((v, i) => (
                <button
                  type="button"
                  key={i}
                  onClick={() => setVideoUrl(v.url)}
                  className={`text-[10px] font-mono px-2 py-1 rounded border transition-colors ${
                    videoUrl === v.url
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                      : 'bg-[#111114] text-[#88888C] border-[#1F1F23] hover:text-white'
                  }`}
                >
                  {v.label}
                </button>
              ))}
            </div>
          </div>

          {/* Thumbnail URL */}
          <div>
            <label className="text-[10px] font-mono text-[#88888C] block uppercase tracking-widest mb-1">
              Thumbnail Cover Image URL
            </label>
            <div className="relative">
              <input
                type="text"
                value={thumbnailUrl}
                onChange={(e) => setThumbnailUrl(e.target.value)}
                placeholder="https://images.unsplash.com/photo-..."
                className="w-full bg-[#0A0A0B] text-white text-xs pl-9 pr-3.5 py-2.5 border border-[#1F1F23] rounded-lg focus:outline-none focus:border-amber-500 font-mono"
              />
              <Image className="w-4 h-4 text-[#88888C] absolute left-3 top-3" />
            </div>

            {/* Presets */}
            <div className="mt-2 flex flex-wrap gap-2">
              <span className="text-[10px] font-mono text-[#88888C] self-center">Cover Presets:</span>
              {PRESET_THUMBNAILS.map((t, i) => (
                <button
                  type="button"
                  key={i}
                  onClick={() => setThumbnailUrl(t.url)}
                  className={`text-[10px] font-mono px-2 py-1 rounded border transition-colors ${
                    thumbnailUrl === t.url
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                      : 'bg-[#111114] text-[#88888C] border-[#1F1F23] hover:text-white'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Software Used Checkboxes */}
          <div>
            <label className="text-[10px] font-mono text-[#88888C] block uppercase tracking-widest mb-2">
              Software &amp; Tools Used
            </label>
            <div className="flex flex-wrap gap-2">
              {softwareOptions.map((sw) => {
                const isSelected = selectedSoftware.includes(sw);
                return (
                  <button
                    type="button"
                    key={sw}
                    onClick={() => handleSoftwareToggle(sw)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono border transition-all ${
                      isSelected
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 font-semibold'
                        : 'bg-[#0A0A0B] text-[#88888C] border-[#1F1F23] hover:text-white'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3 text-amber-400" />}
                    <span>{sw}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Descriptions */}
          <div className="space-y-3">
            <div>
              <label className="text-[10px] font-mono text-[#88888C] block uppercase tracking-widest mb-1">
                Short Summary Pitch
              </label>
              <textarea
                rows={2}
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="Brief 1-2 sentence overview of the video project concept..."
                className="w-full bg-[#0A0A0B] text-white text-xs px-3.5 py-2.5 border border-[#1F1F23] rounded-lg focus:outline-none focus:border-amber-500 font-sans"
              />
            </div>

            <div>
              <label className="text-[10px] font-mono text-[#88888C] block uppercase tracking-widest mb-1">
                Full Production &amp; Post Story
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Detailed explanation of production, multi-cam timeline assembly, motion FX, sound design, and final delivery..."
                className="w-full bg-[#0A0A0B] text-white text-xs px-3.5 py-2.5 border border-[#1F1F23] rounded-lg focus:outline-none focus:border-amber-500 font-sans"
              />
            </div>
          </div>

          {/* Featured Toggle */}
          <div className="flex items-center gap-3 p-3 bg-[#111114] border border-[#1F1F23] rounded-lg">
            <input
              type="checkbox"
              id="featured_toggle"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="w-4 h-4 accent-amber-500 bg-[#0A0A0B] border-[#1F1F23] rounded cursor-pointer"
            />
            <label htmlFor="featured_toggle" className="text-xs font-medium text-white cursor-pointer select-none">
              Mark as <span className="text-amber-400 font-mono font-bold uppercase">Featured Work</span> (Highlighted at top of portfolio)
            </label>
          </div>

          {/* Submit Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#1F1F23]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-lg border border-[#1F1F23] bg-[#111114] text-xs font-medium text-[#88888C] hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold tracking-wider uppercase transition-all shadow-lg shadow-amber-500/20"
            >
              <Plus className="w-4 h-4" />
              <span>Add to Portfolio</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
