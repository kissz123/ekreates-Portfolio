import { Testimonial } from '../types';

export const BRANDS_LIST = [
  { 
    name: 'Finance Coach David Hephzibah', 
    url: 'https://www.youtube.com/@FinanceCoachDavidHephzibah',
    platform: 'YouTube'
  },
  { 
    name: 'The P Cube Studio', 
    url: 'https://www.instagram.com/thepcubestudio',
    platform: 'Instagram'
  },
  { 
    name: 'We Are Knight', 
    url: 'https://www.instagram.com/we.are.knight',
    platform: 'Instagram'
  },
  { 
    name: 'Bethel Music Crew', 
    url: 'https://www.instagram.com/bethelmusiccrew',
    platform: 'Instagram'
  },
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 't1',
    clientName: 'David Hephzibah',
    role: 'Financial Coach & YouTube Creator',
    company: 'Finance Coach David Hephzibah',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    profileUrl: 'https://www.youtube.com/@FinanceCoachDavidHephzibah',
    content: 'Kisira’s video editing on my financial coaching channel completely transformed viewer watch-time and audience retention. His kinetic captions, crisp sound design, and pacing took my YouTube growth to the next level!',
    rating: 5,
    projectTitle: 'YouTube Growth & Financial Series',
  },
  {
    id: 't2',
    clientName: 'The P Cube Studio',
    role: 'Creative Photography & Film Studio',
    company: '@thepcubestudio',
    avatarUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=200&q=80',
    profileUrl: 'https://www.instagram.com/thepcubestudio',
    content: 'A phenomenal creative partner! Kisira handles photography retouching, video post-production, and color grading with absolute precision. Our studio clients always rave about the cinematic finish.',
    rating: 5,
    projectTitle: 'Photography & Video Post-Production',
  },
  {
    id: 't3',
    clientName: 'We Are Knight',
    role: 'Creative Agency & Brand Storytellers',
    company: '@we.are.knight',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    profileUrl: 'https://www.instagram.com/we.are.knight',
    content: 'Working with Kisira on our commercial campaigns and brand storytelling projects has been seamless. His eye for motion graphics, speed ramping, and pristine sound design elevates every deliverable.',
    rating: 5,
    projectTitle: 'Commercial & Brand Campaigns',
  },
  {
    id: 't4',
    clientName: 'Bethel Music Crew',
    role: 'Gospel Music & Worship Team',
    company: '@bethelmusiccrew',
    avatarUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=200&q=80',
    profileUrl: 'https://www.instagram.com/bethelmusiccrew',
    content: 'Kisira’s multi-cam editing and audio synchronization on our live worship sessions and music video productions capture the authentic emotion and energy of our music every single time.',
    rating: 5,
    projectTitle: 'Live Worship & Music Video Production',
  },
];
