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
import { AddProjectModal } from './components/AddProjectModal';
import { GearToolkit } from './components/GearToolkit';
import { WorkflowSection } from './components/WorkflowSection';
import { ResumeSection } from './components/ResumeSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

import { PROJECTS_DATA } from './data/projectsData';
import { Project, ProjectNiche } from './types';
import { Film, Plus, RotateCcw, ArrowLeft } from 'lucide-react';

const STORAGE_KEY = 'ekreates_portfolio_projects';

export default function App() {
  const [projectsList, setProjectsList] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Merge any newly added default projects from PROJECTS_DATA that might be missing in localStorage
          const existingIds = new Set(parsed.map((p: Project) => p.id));
          const missingDefaults = PROJECTS_DATA.filter((p) => !existingIds.has(p.id));
          if (missingDefaults.length > 0) {
            return [...missingDefaults, ...parsed];
          }
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to load saved projects', e);
    }
    return PROJECTS_DATA;
  });

  const [selectedNiche, setSelectedNiche] = useState<ProjectNiche | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [layoutMode, setLayoutMode] = useState<'grid' | 'reels' | 'list'>('grid');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  // Modals
  const [isAddWorkModalOpen, setIsAddWorkModalOpen] = useState(false);

  // Form pre-fill
  const [contactEstimateText, setContactEstimateText] = useState('');
  const [contactBudgetRange, setContactBudgetRange] = useState('');

  // Navigation history & Back button support
  const [sectionHistory, setSectionHistory] = useState<string[]>(['hero']);
  const [showBackButton, setShowBackButton] = useState(false);

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
      setShowBackButton(window.scrollY > 250 || sectionHistory.length > 1 || selectedProject !== null || isAddWorkModalOpen);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionHistory, selectedProject, isAddWorkModalOpen]);

  // Back action: Closes open modal or scrolls back to previous section / top
  const handleGoBack = () => {
    if (selectedProject) {
      setSelectedProject(null);
      return;
    }
    if (isAddWorkModalOpen) {
      setIsAddWorkModalOpen(false);
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
      } else if (isAddWorkModalOpen) {
        setIsAddWorkModalOpen(false);
      } else if (sectionHistory.length > 1) {
        handleGoBack();
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [selectedProject, isAddWorkModalOpen, sectionHistory]);

  // Push browser history state when opening modals
  useEffect(() => {
    if (selectedProject || isAddWorkModalOpen) {
      window.history.pushState({ modalOpen: true }, '');
    }
  }, [selectedProject, isAddWorkModalOpen]);

  const handleAddProject = (newProject: Project) => {
    setProjectsList((prev) => [newProject, ...prev]);
  };

  const handleResetProjects = () => {
    if (window.confirm('Reset portfolio back to default sample works?')) {
      setProjectsList(PROJECTS_DATA);
      localStorage.removeItem(STORAGE_KEY);
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
        onOpenAddWorkModal={() => setIsAddWorkModalOpen(true)}
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

            {/* Quick Add Work CTA */}
            <div className="pt-2 flex items-center justify-center gap-3">
              <button
                onClick={() => setIsAddWorkModalOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-amber-500/10"
              >
                <Plus className="w-4 h-4" />
                <span>Add Your Work</span>
              </button>
              {projectsList.length !== PROJECTS_DATA.length && (
                <button
                  onClick={handleResetProjects}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white text-xs font-mono transition-colors"
                  title="Reset portfolio list to default sample projects"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Default</span>
                </button>
              )}
            </div>
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
                  layoutMode="grid"
                />
              ))}
            </div>
          )}

        </div>
      </section>

      {/* About & Resume Section */}
      <ResumeSection />

      {/* Gear & Software Toolkit */}
      <GearToolkit />

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
      />

      {/* Add New Project Modal */}
      <AddProjectModal
        isOpen={isAddWorkModalOpen}
        onClose={() => setIsAddWorkModalOpen(false)}
        onAddProject={handleAddProject}
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
