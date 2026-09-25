import React, { useState, useEffect } from 'react';
import { Program } from '../types';
import { 
  PROGRAMS, 
  OFFICIAL_COURSE_WHATSAPP, 
  OFFICIAL_COURSE_WHATSAPP_RAW,
  OFFICIAL_CONTACT_PHONE,
  OFFICIAL_CONTACT_PHONE_RAW,
  OFFICIAL_FACEBOOK,
  OFFICIAL_FACEBOOK_HANDLE,
  SELECTION_GUARANTEE_STATEMENT,
  PLAY_STORE_APP_NAME,
  PLAY_STORE_URL
} from '../data/mockData';
import { getMergedCampusLifeList, CAMPUS_LIFE_UPDATED_EVENT, CustomCampusLifeItem } from '../utils/campusLifeSectionStorage';
import { GooglePlayBadge } from '../components/GooglePlayBadge';
import { 
  CheckCircle2, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight, 
  Download, 
  Clock, 
  ShieldCheck, 
  Award, 
  Users, 
  BookOpen, 
  Star,
  MessageCircle,
  Calendar,
  Check,
  Facebook,
  ExternalLink,
  Phone,
  Smartphone,
  CreditCard
} from 'lucide-react';

interface ProgramsViewProps {
  onOpenEnquiry: (programId?: string) => void;
}

export const ProgramsView: React.FC<ProgramsViewProps> = ({ onOpenEnquiry }) => {
  const [filter, setFilter] = useState<'all' | 'hybrid' | 'govt' | 'private'>('all');
  const [openModuleId, setOpenModuleId] = useState<string | null>('flagship-hybrid-0');
  const [campusLifeList, setCampusLifeList] = useState<CustomCampusLifeItem[]>(getMergedCampusLifeList());

  useEffect(() => {
    setCampusLifeList(getMergedCampusLifeList());
    const handleUpdate = () => {
      setCampusLifeList(getMergedCampusLifeList());
    };
    window.addEventListener(CAMPUS_LIFE_UPDATED_EVENT, handleUpdate);
    return () => {
      window.removeEventListener(CAMPUS_LIFE_UPDATED_EVENT, handleUpdate);
    };
  }, []);

  const filteredPrograms = filter === 'all' 
    ? PROGRAMS 
    : PROGRAMS.filter(p => p.category === filter);

  const toggleModule = (id: string) => {
    setOpenModuleId(openModuleId === id ? null : id);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-16">
      {/* Header Banner */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#003399] text-xs font-bold">
          <Award className="w-4 h-4 text-[#003399]" />
          <span>Outcome-Driven Banking Pedagogy</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#001f5c] tracking-tight">
          Flagship Banking Programs
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Designed by former bank executive directors and recruitment leaders. Dual-track preparation for Government exams and Private Banking careers.
        </p>

        {/* 100% Selection Guarantee Prominent Callout Banner */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-amber-400/10 to-blue-50 border-2 border-amber-400 shadow-sm max-w-3xl mx-auto text-left">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center shrink-0 font-black shadow-xs mt-0.5">
              <CheckCircle2 className="w-6 h-6 text-slate-950" />
            </div>
            <div className="grow">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="text-xs font-black uppercase tracking-wider text-amber-800 block">
                  Official Institutional Guarantee
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-400 text-slate-950 text-xs font-black shadow-xs">
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>Pay as low as ₹2,500/month</span>
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-black text-slate-900 leading-snug mt-1">
                {SELECTION_GUARANTEE_STATEMENT}
              </h2>
              <p className="text-xs text-slate-600 mt-1">
                Unlimited repeat batches at zero extra fee + continuous computer lab practice and corporate bank interview scheduling until you hold your official appointment letter.
              </p>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
          {[
            { id: 'all', label: 'All Flagship Programs' },
            { id: 'hybrid', label: '★ Selection Guarantee (Hybrid)' },
            { id: 'govt', label: 'Government Banking (SBI/IBPS)' },
            { id: 'private', label: 'Young Bankers (Private)' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                filter === tab.id
                  ? 'bg-[#001f5c] text-white shadow-md'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Program Cards Grid */}
      <div className="space-y-12">
        {filteredPrograms.map((program) => (
          <div 
            key={program.id}
            id={program.id}
            className={`bg-white rounded-2xl overflow-hidden card-shadow border transition-all ${
              program.isPopular 
                ? 'border-2 border-emerald-500 ring-4 ring-emerald-500/10' 
                : 'border-slate-200'
            }`}
          >
            {/* Top Bar for Card */}
            <div className={`p-6 sm:p-8 ${
              program.isPopular 
                ? 'bg-gradient-to-r from-[#001f5c] via-[#003399] to-[#002673] text-white' 
                : 'bg-slate-50 border-b border-slate-200 text-slate-900'
            }`}>
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    {program.badge && (
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-400 text-slate-950 text-xs font-black uppercase tracking-wider">
                        {program.badge}
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 text-xs font-black shadow-xs tracking-tight">
                      <CreditCard className="w-3 h-3" />
                      <span>Pay as low as ₹2,500/month</span>
                    </span>
                    <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                      program.isPopular ? 'bg-white/15 text-blue-100' : 'bg-blue-50 text-[#003399]'
                    }`}>
                      {program.mode}
                    </span>
                    <span className={`text-xs font-semibold flex items-center gap-1 ${
                      program.isPopular ? 'text-emerald-300' : 'text-emerald-700'
                    }`}>
                      <Clock className="w-3.5 h-3.5" />
                      <span>{program.duration}</span>
                    </span>
                  </div>

                  <h2 className={`text-2xl sm:text-3xl font-black ${
                    program.isPopular ? 'text-white' : 'text-[#001f5c]'
                  }`}>
                    {program.title}
                  </h2>

                  <p className={`text-xs sm:text-sm max-w-2xl leading-relaxed ${
                    program.isPopular ? 'text-blue-100' : 'text-slate-600'
                  }`}>
                    {program.tagline}
                  </p>
                </div>

                {/* Admission & Primary WhatsApp CTA */}
                <div className="shrink-0 flex flex-col sm:items-end space-y-2">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                      program.isPopular ? 'bg-emerald-400 text-slate-950' : 'bg-emerald-50 text-emerald-800'
                    }`}>
                      ● Cohort Admissions Open
                    </span>
                  </div>

                  <div className={`text-xs ${program.isPopular ? 'text-blue-200' : 'text-slate-500'}`}>
                    Official WhatsApp Channel: {OFFICIAL_COURSE_WHATSAPP}
                  </div>

                  <div className="pt-2 flex flex-wrap gap-2">
                    <a
                      href={`https://wa.me/${OFFICIAL_COURSE_WHATSAPP_RAW}?text=Hi%20BankPlus%2C%20please%20send%20me%20the%20complete%20syllabus%20brochure%20for%20${encodeURIComponent(program.title)}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                        program.isPopular
                          ? 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                      }`}
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Get Syllabus Brochure</span>
                    </a>

                    <a
                      href={`https://wa.me/${OFFICIAL_COURSE_WHATSAPP_RAW}?text=Hi%20BankPlus%2C%20I%20want%20to%20apply%20for%20the%20${encodeURIComponent(program.title)}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-slate-950" />
                      <span>Enroll via WhatsApp</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 sm:p-8 space-y-8">
              {/* USP Banner */}
              <div className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                program.selectionGuarantee 
                  ? 'bg-amber-50/90 border-amber-300 ring-2 ring-amber-400/20' 
                  : 'bg-blue-50/70 border-blue-200/80'
              }`}>
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-lg text-white flex items-center justify-center shrink-0 ${
                    program.selectionGuarantee ? 'bg-amber-500 shadow-xs' : 'bg-[#003399]'
                  }`}>
                    <ShieldCheck className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <span className={`text-[11px] font-black uppercase tracking-wider block ${
                      program.selectionGuarantee ? 'text-amber-900' : 'text-[#003399]'
                    }`}>
                      Core BankPlus Promise
                    </span>
                    <span className="text-sm font-black text-slate-900 leading-snug">
                      {program.selectionGuarantee ? SELECTION_GUARANTEE_STATEMENT : program.usp}
                    </span>
                  </div>
                </div>
                <span className="text-xs text-slate-600 shrink-0">
                  Eligibility: <strong>{program.eligibility}</strong>
                </span>
              </div>

              {/* Fee & EMI Breakdown */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="px-2.5 py-1 rounded-lg bg-amber-400 text-slate-950 font-black flex items-center gap-1 shadow-2xs">
                    <CreditCard className="w-3.5 h-3.5" />
                    Pay as low as ₹2,500/month
                  </span>
                  <span className="text-slate-700 font-medium">
                    Course Investment: <strong>₹9,000 – ₹25,000</strong> (Initial seat registration deposit + 3 to 5 easy monthly EMIs)
                  </span>
                </div>
                <a
                  href={`https://wa.me/${OFFICIAL_COURSE_WHATSAPP_RAW}?text=Hi%20BankPlus%2C%20I%20want%20to%20know%20the%20exact%20fee%20structure%20and%20monthly%20EMI%20options%20for%20${encodeURIComponent(program.title)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-[#003399] hover:underline flex items-center gap-1 cursor-pointer shrink-0"
                >
                  <span>Ask Fee & EMI on WhatsApp</span>
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>

              {/* Key Features & Roles */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left: Features */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Program Highlights & Deliverables
                  </h4>
                  <div className="space-y-2.5">
                    {program.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: Target Roles */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Target Job Designations
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {program.targetRoles.map((role, idx) => (
                      <span 
                        key={idx}
                        className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 text-xs font-semibold border border-slate-200"
                      >
                        {role}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <span className="text-xs font-bold text-slate-900 block">
                      Ex-Banker Faculty Team
                    </span>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Sessions delivered by retired Assistant General Managers (AGM) and Chief Managers with 25+ years of live banking & recruitment board experience.
                    </p>
                  </div>
                </div>
              </div>

              {/* Accordion Curriculum Section */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-[#003399]" />
                    <span>Curriculum & Module Breakdown (Detailed Syllabus)</span>
                  </h4>
                  <span className="text-xs text-slate-500">
                    {program.modules.length} Modules Total
                  </span>
                </div>

                <div className="space-y-2">
                  {program.modules.map((mod, modIdx) => {
                    const uniqueId = `${program.id}-${modIdx}`;
                    const isOpen = openModuleId === uniqueId;

                    return (
                      <div 
                        key={modIdx} 
                        className="border border-slate-200 rounded-xl overflow-hidden transition-all"
                      >
                        <button
                          onClick={() => toggleModule(uniqueId)}
                          className="w-full p-4 text-left font-bold text-xs sm:text-sm text-slate-800 hover:bg-slate-50 flex items-center justify-between cursor-pointer transition-colors"
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="w-6 h-6 rounded-full bg-blue-50 text-[#003399] font-bold text-xs flex items-center justify-center">
                              {modIdx + 1}
                            </span>
                            <span>{mod.title}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-xs text-slate-400 font-normal">{mod.duration}</span>
                            {isOpen ? <ChevronUp className="w-4 h-4 text-[#003399]" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                          </div>
                        </button>

                        {isOpen && (
                          <div className="p-4 pt-0 bg-slate-50 border-t border-slate-100 space-y-2">
                            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                              Topics Covered:
                            </span>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                              {mod.topics.map((top, tIdx) => (
                                <div key={tIdx} className="flex items-center gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#003399]"></span>
                                  <span>{top}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Official WhatsApp & Call Counseling Section */}
      <div className="bg-gradient-to-r from-[#001f5c] via-[#003399] to-[#002673] rounded-3xl p-8 sm:p-10 text-white shadow-xl space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-emerald-300 text-xs font-bold">
              <MessageCircle className="w-4 h-4 fill-emerald-300" />
              <span>Direct Admissions Support • No Waiting Forms</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              Official Admissions & Counseling Helpline
            </h3>
            <p className="text-blue-100 text-xs sm:text-sm leading-relaxed max-w-xl">
              Connect directly with our senior academic counselors. Call or WhatsApp on <strong>{OFFICIAL_CONTACT_PHONE}</strong> to receive personalized guidance on banking eligibility, batch schedules, and curriculum roadmaps.
            </p>

            <div className="space-y-3 pt-2 text-xs sm:text-sm text-slate-100">
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-300 shrink-0" />
                <span>1-on-1 Profile Eligibility check by Ex-Bank Managers</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-300 shrink-0" />
                <span>Immediate PDF copy of updated 2026 syllabus & test schedule</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Smartphone className="w-4 h-4 text-emerald-300 shrink-0" />
                <span>Access all 500+ mock tests on the <strong>{PLAY_STORE_APP_NAME}</strong> Android app</span>
              </div>
            </div>
          </div>

          {/* Official Channel Card */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl p-6 sm:p-8 text-slate-900 shadow-2xl space-y-5 border-2 border-emerald-500">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                Call / WhatsApp Official Helpline
              </span>
              
              <div className="space-y-1">
                <span className="text-3xl font-black text-[#001f5c] tracking-tight block">
                  {OFFICIAL_CONTACT_PHONE}
                </span>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full inline-block">
                  ● Verified Official Helpline & WhatsApp
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Connect directly for seat reservation in our 100% Selection Guarantee Cohorts.
              </p>

              <div className="flex flex-col gap-2.5">
                <a
                  href={`https://wa.me/${OFFICIAL_COURSE_WHATSAPP_RAW}?text=Hi%20BankPlus%2C%20I%20want%20to%20enroll%20in%20a%20banking%20program.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>WhatsApp: {OFFICIAL_COURSE_WHATSAPP}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <a
                  href={`tel:${OFFICIAL_CONTACT_PHONE_RAW}`}
                  className="w-full py-3 rounded-xl bg-[#001f5c] hover:bg-[#003399] text-white font-black text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4 text-amber-400" />
                  <span>Call: {OFFICIAL_CONTACT_PHONE}</span>
                </a>

                <GooglePlayBadge size="md" className="w-full justify-center" id="programs-playstore-badge" />
              </div>

              <div className="text-center pt-1">
                <span className="text-[11px] text-slate-400">
                  Registered Office: 16/19 C2 Civil Lines Kanpur 208001
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Student Friendly Classroom Learning Section */}
      <section className="space-y-6 pt-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
          <div>
            <span className="text-xs font-bold text-[#003399] uppercase tracking-wider flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5" />
              <span>Student-Friendly Academy Environment</span>
            </span>
            <h3 className="text-2xl font-black text-slate-900">
              Interactive Classes & Practical Banking Labs
            </h3>
          </div>
          <a
            href={OFFICIAL_FACEBOOK}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold text-blue-700 hover:text-blue-800 flex items-center gap-1"
          >
            <Facebook className="w-4 h-4 text-[#1877F2]" />
            <span>Follow {OFFICIAL_FACEBOOK_HANDLE}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {campusLifeList.slice(0, 3).map((item) => (
            <div 
              key={item.id}
              className="bg-white rounded-2xl overflow-hidden card-shadow border border-slate-200 group hover:shadow-lg transition-all"
            >
              <div className="relative h-48 overflow-hidden bg-slate-100">
                <img 
                  src={item.image} 
                  alt={item.caption}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    if (item.fallbackImage) {
                      e.currentTarget.src = item.fallbackImage;
                    }
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-slate-900/80 text-white text-[11px] font-bold backdrop-blur-xs">
                  {item.tag}
                </div>
              </div>
              <div className="p-4">
                <p className="text-xs font-bold text-slate-800 leading-snug">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
