import React from 'react';
import { 
  GraduationCap, Briefcase, Award, Code, Phone, Mail, MapPin, 
  Languages, CheckCircle2, User, Sparkles, FileText, Check
} from 'lucide-react';

export const ResumeSection: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-[#0A0A0B] border-t border-[#1F1F23]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#111114] border border-[#1F1F23] text-[#88888C] text-[10px] font-mono uppercase tracking-widest">
            <User className="w-3.5 h-3.5 text-white" />
            <span>BIOGRAPHY & CV</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-light tracking-tighter text-white">
            ABOUT <span className="italic font-serif-italic font-normal">Ekreates &amp; Kisira Emmanuel</span>
          </h2>
          <p className="text-sm text-[#88888C] max-w-2xl mx-auto font-sans leading-relaxed">
            Videographer, Video Editor &amp; Creative Director pursuing Mechatronics Engineering, with 5+ years of hands-on experience directing, editing, and post-processing visual media.
          </p>
        </div>

        {/* Profile Card & Quick Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Profile Bio Box */}
          <div className="lg:col-span-7 bg-[#111114] p-6 sm:p-8 border border-[#1F1F23] space-y-6">
            <div className="flex items-center justify-between border-b border-[#1F1F23] pb-4">
              <div>
                <h3 className="text-2xl font-light text-white tracking-tight">KISIRA EMMANUEL</h3>
                <p className="text-xs font-mono text-amber-400 uppercase tracking-wider mt-1">
                  Video Editor &amp; Creative Director
                </p>
              </div>
              <div className="p-2.5 bg-[#0A0A0B] border border-[#1F1F23] text-white">
                <FileText className="w-5 h-5" />
              </div>
            </div>

            <p className="text-sm text-[#E2E2E2] leading-relaxed font-sans">
              As a creative and technically inclined individual, I excel as a videographer and video editor with a strong passion for visual storytelling. Pursuing a degree in Mechatronics Engineering, I&apos;ve refined my problem-solving skills and technical knowledge. With 3+ years of experience at MC Ayo Studio and as Creative Director at Media Code, I&apos;ve honed my skills in video production, editing, and post-production using Adobe Premiere Pro and CapCut Pro. I&apos;m dedicated to delivering high-quality visual content that captivates audiences.
            </p>

            {/* Core Skills Chips */}
            <div className="space-y-3 pt-2">
              <span className="text-[10px] font-mono text-[#88888C] uppercase tracking-widest block font-bold">
                CORE TECHNICAL COMPETENCIES
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  'Video Editing',
                  'Videography',
                  'Colourist / Color Correction',
                  'Storytelling & Storyboarding',
                  'Motion Graphics',
                  'Camera Operation & Lighting',
                  'Adobe Premiere Pro',
                  'CapCut Pro',
                  'Photoshop',
                  'After Effects',
                  'Communication & Creativity',
                ].map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#0A0A0B] border border-[#1F1F23] text-xs font-mono text-white"
                  >
                    <Check className="w-3 h-3 text-emerald-400" />
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Languages Spoken */}
            <div className="pt-2 border-t border-[#1F1F23] flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Languages className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-mono text-[#88888C] uppercase">Languages:</span>
              </div>
              <div className="flex items-center gap-4 text-xs font-mono text-white">
                <span><strong>English</strong> (Full Proficiency)</span>
                <span className="text-[#3A3A3F]">•</span>
                <span><strong>Spanish</strong> (Intermediate)</span>
              </div>
            </div>
          </div>

          {/* Contact Details & Resume Info Box */}
          <div className="lg:col-span-5 bg-[#111114] p-6 sm:p-8 border border-[#1F1F23] space-y-5">
            <h4 className="text-sm font-mono uppercase tracking-widest text-white border-b border-[#1F1F23] pb-3 font-bold">
              CONTACT &amp; LOCATION
            </h4>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] font-mono text-[#88888C] uppercase block">Phone / WhatsApp</span>
                  <a href="tel:08103231347" className="text-sm font-medium text-white hover:underline">
                    08103231347 (+234 810 323 1347)
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] font-mono text-[#88888C] uppercase block">Email Address</span>
                  <a href="mailto:Kiss.emmanuel.15@gmail.com" className="text-sm font-medium text-white hover:underline">
                    Kiss.emmanuel.15@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] font-mono text-[#88888C] uppercase block">Address</span>
                  <p className="text-xs text-[#E2E2E2] leading-relaxed">
                    5 Musiliu Babatunde Street, Agric Estate, Ilorin, Kwara State, Nigeria
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#1F1F23] space-y-2">
              <span className="text-[10px] font-mono text-[#88888C] uppercase block">WORKSTATION &amp; SOFTWARE</span>
              <p className="text-xs text-white font-mono bg-[#0A0A0B] p-3 border border-[#1F1F23]">
                HP ZBook Mobile Workstation • Adobe Premiere Pro • CapCut Pro • Photoshop • After Effects
              </p>
            </div>
          </div>

        </div>

        {/* Experience & Education Timelines */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          
          {/* Work Experience */}
          <div className="bg-[#111114] p-6 sm:p-8 border border-[#1F1F23] space-y-6">
            <div className="flex items-center gap-3 border-b border-[#1F1F23] pb-4">
              <div className="w-8 h-8 bg-[#0A0A0B] border border-[#1F1F23] text-amber-400 flex items-center justify-center">
                <Briefcase className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-mono uppercase tracking-wider text-white font-bold">
                WORK EXPERIENCE
              </h3>
            </div>

            <div className="space-y-6 relative before:absolute before:left-3.5 before:top-3 before:bottom-3 before:w-px before:bg-[#1F1F23]">
              
              {/* Media Code */}
              <div className="relative pl-8 space-y-2">
                <div className="absolute left-2 top-1.5 w-3 h-3 rounded-full bg-amber-400 border-2 border-[#111114]" />
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-medium text-white">Creative Director</h4>
                  <span className="text-[10px] font-mono text-amber-400 bg-[#0A0A0B] px-2 py-0.5 border border-[#1F1F23]">
                    2018 – Till date
                  </span>
                </div>
                <p className="text-xs font-mono text-[#88888C]">Media Code</p>
                <ul className="text-xs text-[#88888C] space-y-1.5 list-disc list-inside font-sans pt-1">
                  <li>Earned certification in videography and video editing, honing skills in camera operation, lighting, and editing software.</li>
                  <li>Promoted to Creative Director, overseeing all visual content creation including concept development, shooting, editing, and publishing.</li>
                  <li>Successfully led visual projects that resulted in significant growth for the company.</li>
                  <li>Conceptualized and executed visual content strategies, directed video productions, and managed brand messaging.</li>
                </ul>
              </div>

              {/* MC Ayo Studio */}
              <div className="relative pl-8 space-y-2 pt-2">
                <div className="absolute left-2 top-3.5 w-3 h-3 rounded-full bg-slate-500 border-2 border-[#111114]" />
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-medium text-white">Video Editor, Graphics Designer</h4>
                  <span className="text-[10px] font-mono text-[#88888C] bg-[#0A0A0B] px-2 py-0.5 border border-[#1F1F23]">
                    2019 – 2023
                  </span>
                </div>
                <p className="text-xs font-mono text-[#88888C]">MC Ayo Studio</p>
                <ul className="text-xs text-[#88888C] space-y-1.5 list-disc list-inside font-sans pt-1">
                  <li>Edited high-quality video content for various events, projects, and clients.</li>
                  <li>Collaborated with the production team to conceptualize and capture engaging visuals.</li>
                  <li>Applied visual effects, color correction, and sound design using Adobe Premiere Pro and CapCut Pro.</li>
                  <li>Coordinated with clients to understand project requirements and deliver edited videos meeting expectations.</li>
                  <li>Developed efficient editing workflows, receiving positive feedback from clients and colleagues.</li>
                </ul>
              </div>

            </div>
          </div>

          {/* Education & Certification */}
          <div className="bg-[#111114] p-6 sm:p-8 border border-[#1F1F23] space-y-6">
            <div className="flex items-center gap-3 border-b border-[#1F1F23] pb-4">
              <div className="w-8 h-8 bg-[#0A0A0B] border border-[#1F1F23] text-emerald-400 flex items-center justify-center">
                <GraduationCap className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-mono uppercase tracking-wider text-white font-bold">
                EDUCATION &amp; CERTIFICATION
              </h3>
            </div>

            <div className="space-y-6 relative before:absolute before:left-3.5 before:top-3 before:bottom-3 before:w-px before:bg-[#1F1F23]">
              
              {/* Federal University Oye Ekiti */}
              <div className="relative pl-8 space-y-2">
                <div className="absolute left-2 top-1.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#111114]" />
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-medium text-white">Bachelor of Engineering (B.Eng.)</h4>
                  <span className="text-[10px] font-mono text-emerald-400 bg-[#0A0A0B] px-2 py-0.5 border border-[#1F1F23]">
                    2021 – Till date
                  </span>
                </div>
                <p className="text-xs font-mono text-[#88888C]">Federal University Oye Ekiti</p>
                <p className="text-xs text-[#88888C] font-sans pt-1 leading-relaxed">
                  Currently pursuing a Bachelor&apos;s degree in <strong>Mechatronics Engineering</strong> at Federal University Oye Ekiti. Combining technical engineering principles, control systems, and electronics with creative digital post-production.
                </p>
              </div>

              {/* Media Code Training */}
              <div className="relative pl-8 space-y-2 pt-2">
                <div className="absolute left-2 top-3.5 w-3 h-3 rounded-full bg-slate-500 border-2 border-[#111114]" />
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-medium text-white">Videography and Editing Training</h4>
                  <span className="text-[10px] font-mono text-[#88888C] bg-[#0A0A0B] px-2 py-0.5 border border-[#1F1F23]">
                    2019 – 2022
                  </span>
                </div>
                <p className="text-xs font-mono text-[#88888C]">Media Code</p>
                <p className="text-xs text-[#88888C] font-sans pt-1 leading-relaxed">
                  Professionally trained in videography and video editing with certified expertise in camera operation, studio lighting setups, video editing software (Adobe Premiere Pro, CapCut Pro), visual storytelling, and post-production techniques.
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
