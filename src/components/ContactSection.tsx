import React, { useState, useEffect } from 'react';
import { 
  Send, Mail, Phone, MapPin, Calendar, CheckCircle2, 
  Instagram, Youtube, Film, MessageSquare, Sparkles, Clock
} from 'lucide-react';

interface ContactSectionProps {
  initialEstimateText?: string;
  initialBudgetRange?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  initialEstimateText = '',
  initialBudgetRange = '',
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    niche: 'commercials',
    targetDate: '',
    budget: initialBudgetRange || '$3,000 - $5,000',
    message: initialEstimateText || '',
  });

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (initialEstimateText) {
      setFormData((prev) => ({
        ...prev,
        message: initialEstimateText,
        budget: initialBudgetRange || prev.budget,
      }));
    }
  }, [initialEstimateText, initialBudgetRange]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 bg-[#0A0A0B] border-t border-[#1F1F23]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Info & Availability (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#111114] border border-[#1F1F23] text-[#88888C] text-[10px] font-mono uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>BOOKINGS OPEN • Q3/Q4 2026</span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-light tracking-tighter text-white">
              LET&apos;S <span className="italic font-serif-italic font-normal">Connect</span>
            </h2>

            <p className="text-sm text-[#88888C] leading-relaxed font-sans">
              Have a commercial campaign, music video, documentary short, or viral social package in mind? Reach out with your vision or book a strategy call.
            </p>

            {/* Direct Details Box */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3.5 p-3.5 bg-[#111114] border border-[#1F1F23]">
                <div className="w-9 h-9 bg-[#0A0A0B] border border-[#1F1F23] flex items-center justify-center text-white shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-[#88888C] uppercase block tracking-widest">DIRECT EMAIL</span>
                  <a href="mailto:kiss.emmanuel.15@gmail.com" className="text-sm font-medium text-white hover:underline transition-all">
                    kiss.emmanuel.15@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3.5 p-3.5 bg-[#111114] border border-[#1F1F23]">
                <div className="w-9 h-9 bg-[#0A0A0B] border border-[#1F1F23] flex items-center justify-center text-white shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-[#88888C] uppercase block tracking-widest">WHATSAPP / PHONE</span>
                  <a href="https://wa.me/2348103231347" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-white hover:underline transition-all">
                    +234 810 323 1347
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3.5 p-3.5 bg-[#111114] border border-[#1F1F23]">
                <div className="w-9 h-9 bg-[#0A0A0B] border border-[#1F1F23] flex items-center justify-center text-white shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-[#88888C] uppercase block tracking-widest">STUDIO &amp; ADDRESS</span>
                  <span className="text-xs font-medium text-white block">
                    5 Musiliu Babatunde St, Agric Estate, Ilorin, Kwara State
                  </span>
                </div>
              </div>
            </div>

            {/* Social channels */}
            <div className="pt-2">
              <span className="text-[10px] font-mono text-[#88888C] uppercase block mb-3 font-bold tracking-widest">
                CHANNEL PLATFORMS
              </span>
              <div className="flex items-center gap-3">
                <a href="#instagram" className="p-3 bg-[#111114] border border-[#1F1F23] text-[#88888C] hover:text-white hover:border-[#3A3A3F] transition-all">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="#youtube" className="p-3 bg-[#111114] border border-[#1F1F23] text-[#88888C] hover:text-white hover:border-[#3A3A3F] transition-all">
                  <Youtube className="w-4 h-4" />
                </a>
                <a href="#vimeo" className="p-3 bg-[#111114] border border-[#1F1F23] text-[#88888C] hover:text-white hover:border-[#3A3A3F] transition-all">
                  <Film className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form (7 cols) */}
          <div className="lg:col-span-7 bg-[#111114] p-6 sm:p-8 border border-[#1F1F23] shadow-2xl">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-12 h-12 bg-[#0A0A0B] border border-[#1F1F23] text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-light text-white uppercase tracking-wider font-mono">INQUIRY RECEIVED</h3>
                <p className="text-sm text-[#88888C] max-w-md mx-auto font-sans">
                  Thank you, <strong className="text-white">{formData.name}</strong>. I have received your project overview and will respond within 12 hours with treatment notes.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 bg-[#0A0A0B] border border-[#1F1F23] text-[#88888C] hover:text-white text-[10px] font-mono uppercase tracking-widest"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="border-b border-[#1F1F23] pb-3">
                  <h3 className="text-lg font-medium text-white">Project Inquiry</h3>
                  <p className="text-xs text-[#88888C] font-sans">Fill in your details for a custom production proposal</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-[#88888C] block uppercase tracking-widest">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Marcus Vance"
                      className="w-full bg-[#0A0A0B] text-white placeholder-[#4A4A4F] text-xs px-3.5 py-2.5 border border-[#1F1F23] focus:outline-none focus:border-white transition-all font-sans"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-[#88888C] block uppercase tracking-widest">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. marcus@brand.com"
                      className="w-full bg-[#0A0A0B] text-white placeholder-[#4A4A4F] text-xs px-3.5 py-2.5 border border-[#1F1F23] focus:outline-none focus:border-white transition-all font-sans"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-[#88888C] block uppercase tracking-widest">Niche</label>
                    <select
                      value={formData.niche}
                      onChange={(e) => setFormData({ ...formData, niche: e.target.value })}
                      className="w-full bg-[#0A0A0B] text-white text-xs px-3.5 py-2.5 border border-[#1F1F23] focus:outline-none focus:border-white transition-all font-mono"
                    >
                      <option value="commercials">Commercial / Ad</option>
                      <option value="music_videos">Music Video</option>
                      <option value="documentaries">Documentary Short</option>
                      <option value="social_reels">Social Vertical Reels</option>
                      <option value="corporate">Corporate Story</option>
                      <option value="events">Event Aftermovie</option>
                      <option value="motion_fx">Motion FX &amp; Visual Post</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-[#88888C] block uppercase tracking-widest">Target Date</label>
                    <input
                      type="date"
                      value={formData.targetDate}
                      onChange={(e) => setFormData({ ...formData, targetDate: e.target.value })}
                      className="w-full bg-[#0A0A0B] text-white text-xs px-3.5 py-2.5 border border-[#1F1F23] focus:outline-none focus:border-white transition-all font-mono"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-[#88888C] block uppercase tracking-widest">Budget</label>
                    <input
                      type="text"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      placeholder="$2,500 - $5,000"
                      className="w-full bg-[#0A0A0B] text-white text-xs px-3.5 py-2.5 border border-[#1F1F23] focus:outline-none focus:border-white transition-all font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-[#88888C] block uppercase tracking-widest">Project Brief &amp; Vision</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your project concept, deliverables needed, reference links, and timeline..."
                    className="w-full bg-[#0A0A0B] text-white placeholder-[#4A4A4F] text-xs p-3.5 border border-[#1F1F23] focus:outline-none focus:border-white transition-all font-sans"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 border border-[#3A3A3F] bg-white text-black font-bold text-xs tracking-widest uppercase hover:bg-transparent hover:text-white transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Inquiry</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
