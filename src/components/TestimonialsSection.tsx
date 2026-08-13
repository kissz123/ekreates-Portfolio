import React from 'react';
import { Star, Award, Building2, ExternalLink, Instagram, Youtube } from 'lucide-react';
import { BRANDS_LIST, TESTIMONIALS_DATA } from '../data/testimonialsData';

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="testimonials" className="py-20 bg-[#0A0A0B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#111114] border border-[#1F1F23] text-[#88888C] text-[10px] font-mono uppercase tracking-widest">
            <Award className="w-3.5 h-3.5 text-[#70B5F9]" />
            <span>PROVEN COLLABORATIONS</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-light tracking-tighter text-white">
            CLIENT <span className="italic font-serif-italic font-normal">Endorsements</span>
          </h2>
          <p className="text-sm text-[#88888C] max-w-xl mx-auto font-sans">
            Hear from creators, studios, agencies, and worship teams who collaborated with Kisira Emmanuel.
          </p>
        </div>

        {/* Brands Logo / Profile Grid */}
        <div className="mb-14 p-6 bg-[#111114] border border-[#1F1F23] space-y-4">
          <p className="text-[10px] font-mono text-center text-[#88888C] uppercase tracking-widest font-bold">
            Featured Creators &amp; Organizations Worked With
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
            {BRANDS_LIST.map((b, i) => (
              <a
                key={i}
                href={b.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 bg-[#0A0A0B] border border-[#1F1F23] hover:border-[#3A3A3F] hover:bg-[#151518] transition-all group rounded-lg"
              >
                <div className="flex items-center gap-2.5 overflow-hidden">
                  {b.platform === 'YouTube' ? (
                    <Youtube className="w-4 h-4 text-red-500 shrink-0" />
                  ) : (
                    <Instagram className="w-4 h-4 text-pink-500 shrink-0" />
                  )}
                  <span className="text-xs font-mono font-medium text-white group-hover:text-amber-400 transition-colors truncate">
                    {b.name}
                  </span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-[#88888C] group-hover:text-white shrink-0" />
              </a>
            ))}
          </div>
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TESTIMONIALS_DATA.map((t) => (
            <div
              key={t.id}
              className="p-6 sm:p-8 bg-[#111114] border border-[#1F1F23] hover:border-[#3A3A3F] transition-all space-y-5 shadow-xl flex flex-col justify-between rounded-xl"
            >
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  {/* Rating Stars */}
                  <div className="flex items-center gap-1">
                    {[...Array(t.rating)].map((_, idx) => (
                      <Star key={idx} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    ))}
                  </div>

                  <span className="px-2.5 py-0.5 bg-[#0A0A0B] text-amber-400 border border-[#1F1F23] text-[10px] font-mono uppercase tracking-wider">
                    {t.projectTitle}
                  </span>
                </div>

                <p className="text-sm text-[#E2E2E2] italic leading-relaxed font-sans">
                  &quot;{t.content}&quot;
                </p>
              </div>

              <div className="pt-4 border-t border-[#1F1F23] flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatarUrl}
                    alt={t.clientName}
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-full object-cover border border-[#1F1F23]"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-white">
                      {t.clientName}
                    </h4>
                    <p className="text-xs text-[#88888C] font-mono">
                      {t.role}
                    </p>
                  </div>
                </div>

                {t.profileUrl && (
                  <a
                    href={t.profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0A0A0B] hover:bg-[#1F1F23] text-white border border-[#1F1F23] text-xs font-mono rounded transition-colors"
                  >
                    {t.profileUrl.includes('youtube.com') ? (
                      <Youtube className="w-3.5 h-3.5 text-red-500" />
                    ) : (
                      <Instagram className="w-3.5 h-3.5 text-pink-500" />
                    )}
                    <span>Visit</span>
                    <ExternalLink className="w-3 h-3 text-[#88888C]" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
