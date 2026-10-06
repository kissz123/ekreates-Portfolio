/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroShowreel } from './components/HeroShowreel';
import { NicheFilter } from './components/NicheFilter';
import { ProjectCard } from './components/ProjectCard';
import { ProjectModal } from './components/ProjectModal';
import { WorkflowSection } from './components/WorkflowSection';
import { ResumeSection } from './components/ResumeSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

import { PROJECTS_DATA } from './data/projectsData';
import { Project, ProjectNiche } from './types';
import { Film, ArrowLeft } from 'lucide-react';

const STORAGE_KEY = 'ekreates_portfolio_projects_v11';

export default function App() {
  const [projectsList, setProjectsList] = useState<Project[]>(() => {
    try {
      // Clear legacy storage keys if present
      [
        'ekreates_portfolio_projects',
        'ekreates_portfolio_projects_v2',
        'ekreates_portfolio_projects_v3',
        'ekreates_portfolio_projects_v4',
        'ekreates_portfolio_projects_v5',
        'ekreates_portfolio_projects_v6',
        'ekreates_portfolio_projects_v7',
        'ekreates_portfolio_projects_v8',
        'ekreates_portfolio_projects_v9',
        'ekreates_portfolio_projects_v10',
      ].forEach((key) => {
        try {
          localStorage.removeItem(key);
        } catch (_) {}
      });

      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Filter out deleted Reel 08, old thriller video, or removed projects
          const sanitized = parsed.filter(
            (p: Project) =>
              p.id !== 'reel_8' &&
              p.id !== 'drama_thriller_1' &&
              p.id !== 'work_linkedin_1' &&
              p.id !== 'work_linkedin_2' &&
              p.id !== 'work_linkedin_3' &&
              p.id !== 'p1' &&
              p.id !== 'p2' &&
              !p.videoUrl?.includes('QSHohrusMHg') &&
              !p.videoUrl?.includes('12SrQ96SGp_Jew6YRq793xr0e7fcXtRBp')
          );
          // Merge any newly added default projects from PROJECTS_DATA that might be missing
          const existingIds = new Set(sanitized.map((p: Project) => p.id));
          const missingDefaults = PROJECTS_DATA.filter(
            (p) =>
              !existingIds.has(p.id) &&
              p.id !== 'reel_8' &&
              p.id !== 'drama_thriller_1' &&
              p.id !== 'work_linkedin_1' &&
              p.id !== 'work_linkedin_2' &&
              p.id !== 'work_linkedin_3' &&
              p.id !== 'p1' &&
              p.id !== 'p2'
          );
          if (missingDefaults.length > 0) {
            return [...sanitized, ...missingDefaults];
          }
          return sanitized;
        }
      }
    } catch (e) {
      console.error('Failed to load saved projects', e);
    }
    return PROJECTS_DATA.filter(
      (p) =>
        p.id !== 'reel_8' &&
        p.id !== 'drama_thriller_1' &&
        p.id !== 'work_linkedin_1' &&
        p.id !== 'work_linkedin_2' &&
        p.id !== 'work_linkedin_3' &&
        p.id !== 'p1' &&
        p.id !== 'p2'
    );
  });

  const [selectedNiche, setSelectedNiche] = useState<ProjectNiche | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [layoutMode, setLayoutMode] = useState<'grid' | 'reels' | 'list'>('grid');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  // Form pre-fill
  const [contactEstimateText, setContactEstimateText] = useState('');
  const [contactBudgetRange, setContactBudgetRange] = useState('');

  // Navigation history & Back button support
  const [sectionHistory, setSectionHistory] = useState<string[]>(['hero']);
  const [showBackButton, setShowBackButton] = useState(false);

  // Deep link handling: Open project from URL search query on load and sync URL when project opens/closes
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const projectId = params.get('project');
    if (projectId) {
      if (
        projectId === 'work_linkedin_1' ||
        projectId === 'work_linkedin_2' ||
        projectId === 'work_linkedin_3' ||
        projectId === 'p1' ||
        projectId === 'p2'
      ) {
        const cleanUrl = new URL(window.location.href);
        cleanUrl.searchParams.delete('project');
        window.history.replaceState(null, '', cleanUrl.toString());
        return;
      }
      const targetId = projectId === 'drama_thriller_1' ? 'live_drama_thriller' : projectId;
      const found = projectsList.find(
        (p) => p.id === targetId || p.title.toLowerCase() === targetId.toLowerCase()
      );
      if (found) {
        setSelectedProject(found);
      }
    }
  }, [projectsList]);

  useEffect(() => {
    const url = new URL(window.location.href);
    if (selectedProject) {
      url.searchParams.set('project', selectedProject.id);
    } else {
      url.searchParams.delete('project');
    }
    window.history.replaceState(null, '', url.toString());
  }, [selectedProject]);

  // Save projects to localStorage whenever changed
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projectsList));
    } catch (e) {
      console.error('Failed to save projects to storage', e);
    }
  }, [projectsList]);

  // Track scrolling to toggle floating back button visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowBackButton(window.scrollY > 250 || sectionHistory.length > 1 || selectedProject !== null);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionHistory, selectedProject]);

  // Back action: Closes open modal or scrolls back to previous section / top
  const handleGoBack = () => {
    if (selectedProject) {
      setSelectedProject(null);
      return;
    }
    if (sectionHistory.length > 1) {
      const updated = [...sectionHistory];
      updated.pop(); // Pop current
      const prevSection = updated[updated.length - 1];
      setSectionHistory(updated);
      const el = document.getElementById(prevSection);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Sync browser popstate (browser back button)
  useEffect(() => {
    const handlePopState = () => {
      if (selectedProject) {
        setSelectedProject(null);
      } else if (sectionHistory.length > 1) {
        handleGoBack();
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [selectedProject, sectionHistory]);

  // Push browser history state when opening modals
  useEffect(() => {
    if (selectedProject) {
      window.history.pushState({ modalOpen: true }, '');
    }
  }, [selectedProject]);

  const handleDeleteProject = (projectId: string) => {
    setProjectsList((prev) => prev.filter((p) => p.id !== projectId));
    if (selectedProject?.id === projectId) {
      setSelectedProject(null);
    }
  };

  // Filtering projects
  const filteredProjects = projectsList.filter((p) => {
    // Niche filter
    if (selectedNiche !== 'all' && p.niche !== selectedNiche) {
      return false;
    }
    // Search query filter
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchTitle = p.title.toLowerCase().includes(q);
      const matchClient = p.client.toLowerCase().includes(q);
      const matchCamera = p.cameraUsed.toLowerCase().includes(q);
      const matchSoftware = p.softwareUsed.some((s) => s.toLowerCase().includes(q));
      const matchSummary = p.summary.toLowerCase().includes(q);
      return matchTitle || matchClient || matchCamera || matchSoftware || matchSummary;
    }
    return true;
  });

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setSectionHistory((prev) => {
        if (prev[prev.length - 1] !== id) {
          return [...prev, id];
        }
        return prev;
      });
    }
  };

  const handleOpenShowreel = () => {
    scrollToSection('hero');
  };

  const handleSendEstimateToContact = (estimateText: string, budgetRange: string) => {
    setContactEstimateText(estimateText);
    setContactBudgetRange(budgetRange);
    scrollToSection('contact');
  };

  const handleBookProjectWithData = (projectTitle: string) => {
    setContactEstimateText(`Inquiry regarding project reference: "${projectTitle}". Please share concept details and calendar availability.`);
    setSelectedProject(null);
    scrollToSection('contact');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950">
      
      {/* Header Navigation */}
      <Navbar
        onOpenShowreel={handleOpenShowreel}
        onScrollToSection={scrollToSection}
      />

      {/* Hero & Director's Showreel */}
      <HeroShowreel
        onExploreClick={() => scrollToSection('works')}
        onContactClick={() => scrollToSection('contact')}
      />

      {/* Main Works & Portfolio Section */}
      <section id="works" className="py-16 bg-slate-950 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          {/* Section Heading */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-amber-400 text-xs font-mono font-bold">
              <Film className="w-3.5 h-3.5" />
              <span>EXPLORE WORKS BY NICHE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              MULTI-NICHE PORTFOLIO GALLERY
            </h2>
            <p className="text-sm sm:text-base text-slate-300">
              Filter through high-impact commercials, music videos, documentaries, vertical reels, corporate brand stories, and motion graphics post.
            </p>
          </div>

          {/* Filter Bar */}
          <NicheFilter
            selectedNiche={selectedNiche}
            onSelectNiche={setSelectedNiche}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            layoutMode={layoutMode}
            onLayoutModeChange={setLayoutMode}
            totalResultsCount={filteredProjects.length}
          />

          {/* Projects Display Grid / List / Reels */}
          {filteredProjects.length === 0 ? (
            <div className="text-center py-16 bg-slate-900/60 rounded-2xl border border-slate-800 space-y-3">
              <p className="text-lg font-bold text-white">No projects matched your search &quot;{searchQuery}&quot;</p>
              <p className="text-xs text-slate-400">Try clearing your search query or selecting &quot;All Niches&quot;.</p>
              <button
                onClick={() => { setSelectedNiche('all'); setSearchQuery(''); }}
                className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs"
              >
                Reset All Filters
              </button>
            </div>
          ) : layoutMode === 'reels' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onSelectProject={setSelectedProject}
                  onDeleteProject={handleDeleteProject}
                  layoutMode="reels"
                />
              ))}
            </div>
          ) : layoutMode === 'list' ? (
            <div className="space-y-4">
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onSelectProject={setSelectedProject}
                  onDeleteProject={handleDeleteProject}
                  layoutMode="list"
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onSelectProject={setSelectedProject}
                  onDeleteProject={handleDeleteProject}
                  layoutMode="grid"
                />
              ))}
            </div>
          )}

        </div>
      </section>

      {/* About & Resume Section */}
      <ResumeSection />

      {/* Production Process Workflow */}
      <WorkflowSection />

      {/* Testimonials & Brands */}
      <TestimonialsSection />

      {/* Contact & Booking Section */}
      <ContactSection
        initialEstimateText={contactEstimateText}
        initialBudgetRange={contactBudgetRange}
      />

      {/* Footer */}
      <Footer
        onScrollToTop={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      />

      {/* Project Detail Deep View Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onBookProjectWithData={handleBookProjectWithData}
        onDeleteProject={handleDeleteProject}
      />

      {/* Floating Back to Previous Page Button */}
      {showBackButton && (
        <button
          onClick={handleGoBack}
          className="fixed bottom-6 left-6 z-40 flex items-center gap-2 px-4 py-2.5 bg-[#0F0F12]/90 backdrop-blur-md hover:bg-[#1A1A1E] text-white border border-[#2A2A30] hover:border-amber-500/60 shadow-2xl rounded-full text-xs font-mono font-bold tracking-wider transition-all duration-300 group hover:scale-105 active:scale-95"
          title="Back to Previous Page / Section"
        >
          <ArrowLeft className="w-4 h-4 text-amber-400 group-hover:-translate-x-1 transition-transform" />
          <span>Back</span>
        </button>
      )}

    </div>
  );
}
