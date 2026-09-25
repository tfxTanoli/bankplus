import React, { useState, useEffect } from 'react';
import { PageTab, StudentSuccessStory, JobPosting } from '../types';
import { 
  BANK_PARTNERS, 
  STATS_DATA, 
  PROGRAMS, 
  JOB_POSTINGS, 
  SUCCESS_STORIES,
  OFFICIAL_COURSE_WHATSAPP,
  OFFICIAL_COURSE_WHATSAPP_RAW,
  OFFICIAL_ALC_WHATSAPP,
  OFFICIAL_ALC_WHATSAPP_RAW,
  OFFICIAL_CONTACT_PHONE,
  OFFICIAL_CONTACT_PHONE_RAW,
  OFFICIAL_FACEBOOK,
  OFFICIAL_FACEBOOK_HANDLE,
  FACEBOOK_STUDENT_REELS,
  STUDENT_COMMUNITY_GALLERY,
  SELECTION_GUARANTEE_STATEMENT,
  PLAY_STORE_APP_NAME,
  PLAY_STORE_URL
} from '../data/mockData';
import { GooglePlayBadge } from '../components/GooglePlayBadge';
import { StudentFlyerCard } from '../components/StudentFlyerCard';
import { BfsiRecruitersSection } from '../components/BfsiRecruitersSection';
import { initDrillClassroomStorage, getDrillClassroomPhotos } from '../utils/photoStorage';
import { 
  getReelsSectionText, 
  getMergedReelsList, 
  REELS_SECTION_UPDATED_EVENT,
  ReelsSectionText,
  CustomReelItem 
} from '../utils/reelsSectionStorage';
import {
  getCampusLifeSectionText,
  getMergedCampusLifeList,
  CAMPUS_LIFE_UPDATED_EVENT,
  CampusLifeSectionText,
  CustomCampusLifeItem
} from '../utils/campusLifeSectionStorage';
import { 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Award, 
  Building2, 
  GraduationCap, 
  TrendingUp, 
  Users, 
  Calendar, 
  MapPin, 
  DollarSign, 
  Briefcase, 
  Phone,
  Check, 
  ChevronRight, 
  Star, 
  FileText, 
  MessageCircle,
  HelpCircle,
  Clock,
  Compass,
  Zap,
  Facebook,
  Play,
  ExternalLink,
  Smartphone,
  Download,
  CreditCard
} from 'lucide-react';

interface HomeViewProps {
  setActiveTab: (tab: PageTab) => void;
  onOpenEnquiry: (programId?: string) => void;
  onOpenWhatsApp: (stateId?: string) => void;
  onOpenStory: (story: StudentSuccessStory) => void;
  onOpenResumeUpload: () => void;
  onSelectJob: (jobId: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  setActiveTab,
  onOpenEnquiry,
  onOpenWhatsApp,
  onOpenStory,
  onOpenResumeUpload,
  onSelectJob,
}) => {
  const [selectedPath, setSelectedPath] = useState<'hybrid' | 'govt' | 'private'>('hybrid');
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [drillClassroomPhotos, setDrillClassroomPhotos] = useState<Record<string, string>>({});
  // Dynamic Reels Section State
  const [reelsText, setReelsText] = useState<ReelsSectionText>(getReelsSectionText());
  const [reelsList, setReelsList] = useState<CustomReelItem[]>(getMergedReelsList());

  // Dynamic Campus Life Section State
  const [campusLifeText, setCampusLifeText] = useState<CampusLifeSectionText>(getCampusLifeSectionText());
  const [campusLifeList, setCampusLifeList] = useState<CustomCampusLifeItem[]>(getMergedCampusLifeList());

  useEffect(() => {
    initDrillClassroomStorage().then((photos) => setDrillClassroomPhotos(photos));
    setReelsText(getReelsSectionText());
    setReelsList(getMergedReelsList());
    setCampusLifeText(getCampusLifeSectionText());
    setCampusLifeList(getMergedCampusLifeList());

    const handleUpdate = () => {
      setDrillClassroomPhotos(getDrillClassroomPhotos());
      setReelsText(getReelsSectionText());
      setReelsList(getMergedReelsList());
      setCampusLifeText(getCampusLifeSectionText());
      setCampusLifeList(getMergedCampusLifeList());
    };

    window.addEventListener('bankplus_drill_classroom_photo_updated', handleUpdate);
    window.addEventListener(REELS_SECTION_UPDATED_EVENT, handleUpdate);
    window.addEventListener(CAMPUS_LIFE_UPDATED_EVENT, handleUpdate);
    return () => {
      window.removeEventListener('bankplus_drill_classroom_photo_updated', handleUpdate);
      window.removeEventListener(REELS_SECTION_UPDATED_EVENT, handleUpdate);
      window.removeEventListener(CAMPUS_LIFE_UPDATED_EVENT, handleUpdate);
    };
  }, []);

  const workflowSteps = [
    { num: '01', title: 'Intensive Training', desc: 'Quantitative, Reasoning & Core Finacle Banking software' },
    { num: '02', title: 'Daily CBT Practice', desc: '1,000+ speed drill tests simulating actual IBPS/SBI interfaces' },
    { num: '03', title: 'Ex-Banker Mocks', desc: '1-on-1 interviews with retired DGMs & Chief General Managers' },
    { num: '04', title: 'Corporate Drives', desc: 'Direct interview scheduling with HDFC, ICICI, Axis & SBI channel' },
    { num: '05', title: 'Personal Feedback', desc: 'Detailed video review of body language, communication & banking concepts' },
    { num: '06', title: 'Final Selection', desc: 'Guaranteed offer letter in hand or continuous unlimited training' },
  ];

  const faqs = [
    {
      q: 'What does 100% Selection Guarantee mean?',
      a: `${SELECTION_GUARANTEE_STATEMENT}. If you do not secure a banking appointment letter in your initial batch, you receive unlimited repeat batches at zero additional fee, continuous speed lab mock drills, and regular private bank placement interviews until you hold your official appointment letter.`
    },
    {
      q: 'What is the fee structure and can I pay in monthly EMIs?',
      a: 'BankPlus course fees range from ₹9,000 to ₹25,000 depending on your selected program track. You can reserve your seat with an initial registration deposit and pay the remaining balance in 3 to 5 easy monthly installments (pay as low as ₹2,500/month). All subsequent training and interview schedules are 100% free until you get selected.'
    },
    {
      q: 'Can non-commerce or engineering graduates join?',
      a: 'Yes, over 65% of our placed students are from BA, B.Sc, B.Tech, or BCA backgrounds. Our foundational modules cover banking from scratch, including core accounting principles, KYC laws, and credit lending fundamentals.'
    },
    {
      q: 'How do I access study materials on mobile?',
      a: `You can download the official "${PLAY_STORE_APP_NAME}" app directly from the Google Play Store. It features 500+ CBT mock speed tests, daily financial awareness updates, video lessons, and real-time interview notifications.`
    },
    {
      q: 'How do I apply and connect with an Academic Counselor?',
      a: `You can Call or WhatsApp directly on our official contact number ${OFFICIAL_CONTACT_PHONE}. Our counselors evaluate your eligibility, share the syllabus roadmap, and schedule your orientation session instantly.`
    },
    {
      q: 'Where are BankPlus Authorized Learning Centres (ALCs) located?',
      a: 'BankPlus has active ALCs open now in Bharatpur, Rudrapur, Budaun, Saharanpur, Siwan, Dineshpur, and Varanasi, with upcoming centres coming soon in Farrukhabad, Gorakhpur, Bareilly, and Unnao. Our Registered Office is at 16/19 C2 Civil Lines, Kanpur 208001 and Corporate Office is at JMD Megapolis, Udyog Vihar, Gurugram. ALC franchises are solicited PAN India.'
    }
  ];

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-8 sm:pt-14 pb-12 sm:pb-20 hero-gradient border-b border-slate-200/60">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="space-y-6 text-center">
            {/* Trust Tag & Guarantee Highlight */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#003399] text-xs font-bold shadow-2xs">
                <ShieldCheck className="w-4 h-4 text-[#003399]" />
                <span>India&apos;s #1 Dedicated Banking Career Academy • ISO 9001:2015</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-400 text-slate-950 text-xs font-black shadow-2xs">
                <CreditCard className="w-3.5 h-3.5" />
                <span>Pay as low as ₹2,500/month</span>
              </div>
              <a
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold hover:bg-emerald-100 transition-colors shadow-2xs"
                title="Download BankPlus Learning Portal App on Google Play Store"
              >
                <Smartphone className="w-3.5 h-3.5 text-emerald-600" />
                <span>App on Play Store: {PLAY_STORE_APP_NAME}</span>
                <ExternalLink className="w-3 h-3 text-emerald-600 opacity-70" />
              </a>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#001f5c] tracking-tight leading-[1.15]">
              Build Your Career in Banking. <br className="hidden sm:inline" />
              <span className="text-[#003399] underline decoration-[#ffcc00] decoration-4 underline-offset-8">
                Prepare for Both
              </span>{' '}
              <span className="text-slate-800 text-2xl sm:text-3xl md:text-4xl block sm:inline font-bold">
                (Govt + Private)
              </span>{' '}
              on One Platform.
            </h1>

            {/* 100% Selection Guarantee Prominent Callout Banner */}
            <div className="max-w-3xl mx-auto p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-amber-400/10 to-blue-50 border-2 border-amber-400 shadow-sm text-left">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center shrink-0 font-black shadow-xs mt-0.5">
                  <CheckCircle2 className="w-6 h-6 text-slate-950" />
                </div>
                <div className="grow">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className="text-xs font-black uppercase tracking-wider text-amber-800 block">
                      Official Institutional Guarantee
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 text-xs font-black shadow-xs">
                      <CreditCard className="w-3 h-3" />
                      <span>Pay as low as ₹2,500/month</span>
                    </span>
                  </div>
                  <h2 className="text-base sm:text-lg font-black text-slate-900 leading-snug mt-1">
                    {SELECTION_GUARANTEE_STATEMENT}
                  </h2>
                  <p className="text-xs text-slate-600 mt-1">
                    If not selected in your initial batch, attend unlimited repeat batches with zero tuition fee, unlimited computer lab speed drills, and continuous private bank interview drives until your appointment letter is issued.
                  </p>
                </div>
              </div>
            </div>

            {/* Subtitle */}
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Join 3,000+ candidates who built successful banking careers. Dual-track preparation for SBI, IBPS, HDFC, ICICI, and Axis with our <strong>100% Selection Guarantee</strong> pathway and direct corporate interview drives.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 pt-2">
              <a
                href={`https://wa.me/${OFFICIAL_COURSE_WHATSAPP_RAW}?text=Hi%20BankPlus%2C%20I%20want%20to%20enroll%20in%20the%20100%25%20Guaranteed%20Banking%20Batch.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-base shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                <span>WhatsApp: {OFFICIAL_COURSE_WHATSAPP}</span>
                <ArrowRight className="w-5 h-5" />
              </a>

              <a
                href={`tel:${OFFICIAL_CONTACT_PHONE_RAW}`}
                className="w-full sm:w-auto px-6 py-4 rounded-xl bg-[#001f5c] hover:bg-[#003399] text-white font-black text-base shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Phone className="w-5 h-5 text-amber-400" />
                <span>Call: {OFFICIAL_CONTACT_PHONE}</span>
              </a>

              <button
                onClick={() => setActiveTab('jobs')}
                className="w-full sm:w-auto px-6 py-4 rounded-xl bg-white hover:bg-slate-50 text-[#001f5c] border-2 border-[#003399]/30 hover:border-[#003399] font-bold text-base shadow-xs transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Briefcase className="w-5 h-5 text-[#003399]" />
                <span>1,200+ Jobs</span>
              </button>

              <GooglePlayBadge size="md" id="hero-action-playstore-badge" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. SOCIAL PROOF & TRUST BAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 -mt-8 sm:-mt-14 relative z-20">
        <div className="bg-white rounded-2xl p-6 sm:p-8 card-shadow border border-slate-200/80">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 sm:gap-x-6 gap-y-6 md:gap-y-0 md:divide-x md:divide-slate-100">
            {STATS_DATA.map((stat, idx) => (
              <div 
                key={idx} 
                className={`text-center space-y-1.5 flex flex-col items-center justify-center md:px-4 lg:px-6 ${
                  idx >= 2 ? 'pt-5 border-t border-slate-100 md:pt-0 md:border-t-0' : ''
                }`}
              >
                <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#001f5c] tracking-tight block leading-tight">
                  {stat.value}
                </span>
                <span className="text-xs font-bold text-slate-800 block leading-snug">
                  {stat.label}
                </span>
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2.5 py-0.5 rounded-full inline-block whitespace-nowrap">
                  {stat.highlight}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. PARTNER BANK LOGOS & HIRING RECRUITERS - 100+ BFSI ORGANISATIONS */}
      <BfsiRecruitersSection 
        onOpenEnquiry={onOpenEnquiry} 
        setActiveTab={setActiveTab} 
      />

      {/* 4. CHOOSE YOUR CAREER PATH (3 BOXES WITH HYBRID HIGHLIGHTED) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="text-center space-y-2 max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#003399] text-xs font-bold">
              <Compass className="w-3.5 h-3.5" />
              <span>Structured Career Pathways</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-black shadow-xs">
              <CreditCard className="w-3.5 h-3.5" />
              <span>Pay as low as ₹2,500/month</span>
            </div>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#001f5c]">
            Choose Your Banking Career Path
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Whether your dream is a prestigious Government Officer rank or an immediate high-growth corporate banking salary, we have the exact blueprint for you.
          </p>
        </div>

        {/* 3 Path Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          
          {/* Card 1: Government Banking */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 card-shadow border border-slate-200 hover:border-slate-300 card-shadow-hover flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#003399] flex items-center justify-center">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Public Sector Banks</span>
                <h3 className="text-xl font-black text-slate-900 mt-1">Government Banking Exams</h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  Dedicated classroom rigor for SBI PO/Clerk, IBPS, RRB Gramin Bank, and RBI Grade B.
                </p>
              </div>

              <div className="space-y-2.5 pt-2 border-t border-slate-100 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Daily 4-hr intensive concept lectures & doubt desks</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>1,000+ bilingual topic tests & full-length CBT mocks</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Interview panels with retired AGM & DGM officers</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Lifetime revision access until selection</span>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between text-xs gap-2 flex-wrap">
                <span className="text-xs font-bold text-slate-900 bg-amber-100 border border-amber-300 px-2.5 py-1 rounded-lg flex items-center gap-1">
                  <CreditCard className="w-3 h-3 text-amber-800" />
                  <span>Pay as low as ₹2,500/month</span>
                </span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">Active Batch</span>
              </div>
              <a
                href={`https://wa.me/${OFFICIAL_COURSE_WHATSAPP_RAW}?text=Hi%20BankPlus%2C%20I%20want%20information%20on%20the%20Government%20Banking%20Exam%20Program.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl border-2 border-[#003399] text-[#003399] hover:bg-[#003399] hover:text-white font-bold text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp for Syllabus & Details</span>
              </a>
            </div>
          </div>

          {/* Card 2: HYBRID SELECTION GUARANTEE (MOST POPULAR) */}
          <div className="bg-gradient-to-b from-[#001f5c] to-[#003399] text-white rounded-2xl p-6 sm:p-8 shadow-2xl relative border-2 border-emerald-400 flex flex-col justify-between space-y-6 transform lg:-translate-y-2">
            {/* Top Ribbon */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-emerald-400 text-slate-950 font-black text-xs px-4 py-1 rounded-full uppercase tracking-wider shadow-md flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 fill-slate-950" />
              <span>MOST POPULAR • 90-DAY SELECTION GUARANTEE</span>
            </div>

            <div className="space-y-4 pt-2">
              <div className="w-12 h-12 rounded-xl bg-white/10 text-emerald-300 flex items-center justify-center border border-white/20">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">Zero-Risk Dual Track</span>
                <h3 className="text-2xl font-black text-white mt-1">Govt + Pvt Guaranteed Selection</h3>
                <p className="text-xs text-blue-100 mt-1.5 leading-relaxed">
                  Prepare for prestigious Govt exams while securing a guaranteed private bank appointment within 90 days.
                </p>
              </div>

              <div className="space-y-2.5 pt-2 border-t border-blue-800/80 text-xs text-slate-100">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                  <span><strong>100% Placement Assurance:</strong> Unlimited interviews till offer</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                  <span>Direct Campus Recruitment drives for HDFC, Axis, ICICI</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                  <span>Specialized Finacle & retail lending practical software lab</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                  <span>Spoken English & Executive Personality grooming</span>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-blue-800/80">
              <div className="flex items-center justify-between text-white gap-2 flex-wrap">
                <span className="text-xs font-black text-slate-950 bg-amber-400 px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-xs">
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>Pay as low as ₹2,500/month</span>
                </span>
                <span className="text-xs font-bold text-slate-950 bg-emerald-400 px-2.5 py-1 rounded-lg">
                  Limited Seats
                </span>
              </div>
              <a
                href={`https://wa.me/${OFFICIAL_COURSE_WHATSAPP_RAW}?text=Hi%20BankPlus%2C%20I%20want%20to%20enroll%20in%20the%2090-Day%20Guaranteed%20Govt%20%2B%20Private%20Batch.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-slate-950" />
                <span>WhatsApp: {OFFICIAL_COURSE_WHATSAPP}</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Card 3: Private Banking Fast-Track */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 card-shadow border border-slate-200 hover:border-slate-300 card-shadow-hover flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <Briefcase className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Fast Placement (Within 90 Days)</span>
                <h3 className="text-xl font-black text-slate-900 mt-1">Young Bankers Program</h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  Direct job-oriented course for quick appointment as Assistant Manager, CSO, or Relationship Officer.
                </p>
              </div>

              <div className="space-y-2.5 pt-2 border-t border-slate-100 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-semibold text-emerald-950">100% Selection Guarantee: Unlimited Training + Unlimited Interviews till Selection</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Practical training on retail CASA, Loans & Wealth products</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Direct resume submission to partner Bank HR heads</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Average package: Upto ₹3.5 Lacs</span>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between text-xs gap-2 flex-wrap">
                <span className="text-xs font-bold text-slate-900 bg-amber-100 border border-amber-300 px-2.5 py-1 rounded-lg flex items-center gap-1">
                  <CreditCard className="w-3 h-3 text-amber-800" />
                  <span>Pay as low as ₹2,500/month</span>
                </span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">Within 90 Days Direct Drive</span>
              </div>
              <a
                href={`https://wa.me/${OFFICIAL_COURSE_WHATSAPP_RAW}?text=Hi%20BankPlus%2C%20I%20want%20to%20apply%20for%20the%20Private%20Banking%20Young%20Bankers%20Program.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-600 hover:text-white font-bold text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp for Fast-Track Batch</span>
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* 5. PROCESS WORKFLOW (HORIZONTAL LINEAR PATH) */}
      <section className="bg-white py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-xs font-bold text-[#003399] uppercase tracking-wider">
              Methodology for Guaranteed Results
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#001f5c]">
              How BankPlus Delivers Selection in 90 Days
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm">
              Our proven 6-stage scientific workflow guarantees candidate competency before setting foot in the interview room.
            </p>
          </div>

          {/* Horizontal Steps Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 relative">
            {workflowSteps.map((step, idx) => (
              <div 
                key={idx} 
                className="bg-slate-50 rounded-xl p-4 border border-slate-200 hover:border-[#003399] hover:bg-white transition-all space-y-2 relative group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xl font-black text-[#003399]/40 group-hover:text-[#003399] transition-colors">
                    {step.num}
                  </span>
                  <div className="w-2 h-2 rounded-full bg-slate-300 group-hover:bg-[#ffcc00] transition-colors"></div>
                </div>
                <h4 className="text-sm font-bold text-slate-900">{step.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. WHY BANKPLUS IS DIFFERENT (COMPARATIVE TABLE / CARDS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-bold text-[#003399] uppercase tracking-wider">The BankPlus Advantage</span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#001f5c]">
            Why Traditional Coaching Institutes Fail
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm">
            See how our industry-connected academy outperforms standard exam prep libraries and generic YouTube coaching.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-2xl overflow-hidden card-shadow border border-slate-200 text-left text-xs sm:text-sm">
            <thead className="bg-[#001f5c] text-white">
              <tr>
                <th className="p-4 sm:p-5 font-bold">Feature / Metric</th>
                <th className="p-4 sm:p-5 font-black text-[#ffcc00] bg-[#002b7f]">BankPlus Academy</th>
                <th className="p-4 sm:p-5 font-normal text-slate-300">Generic Exam Coaching</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr>
                <td className="p-4 sm:p-5 font-semibold">Selection Assurance</td>
                <td className="p-4 sm:p-5 font-bold text-emerald-700 bg-blue-50/40 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Unlimited Interviews & Support till Offer Letter</span>
                </td>
                <td className="p-4 sm:p-5 text-slate-400">Ends when course duration finishes</td>
              </tr>
              <tr>
                <td className="p-4 sm:p-5 font-semibold">Faculty Profile</td>
                <td className="p-4 sm:p-5 font-bold text-slate-900 bg-blue-50/40">
                  Retired SBI DGMs, PNB Chief Managers & Bank HRs
                </td>
                <td className="p-4 sm:p-5 text-slate-400">General subject teachers without banking exposure</td>
              </tr>
              <tr>
                <td className="p-4 sm:p-5 font-semibold">Private Banking Tie-ups</td>
                <td className="p-4 sm:p-5 font-bold text-slate-900 bg-blue-50/40">
                  Direct Campus Drives (HDFC, ICICI, Axis, Bandhan)
                </td>
                <td className="p-4 sm:p-5 text-slate-400">Zero corporate HR tie-ups</td>
              </tr>
              <tr>
                <td className="p-4 sm:p-5 font-semibold">Practical Core Banking Labs</td>
                <td className="p-4 sm:p-5 font-bold text-slate-900 bg-blue-50/40">
                  Finnacle / Flexcube simulation & CASA pitching labs
                </td>
                <td className="p-4 sm:p-5 text-slate-400">Only bookish theory from question banks</td>
              </tr>
              <tr>
                <td className="p-4 sm:p-5 font-semibold">Job Alert Integration</td>
                <td className="p-4 sm:p-5 font-bold text-slate-900 bg-blue-50/40">
                  State-wise WhatsApp alerts with verified HR contacts
                </td>
                <td className="p-4 sm:p-5 text-slate-400">Public notifications without guidance</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 7. JOB BOARD PREVIEW ("JOBS ARE WAITING") */}
      <section className="bg-slate-100/70 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full inline-block">
                • 1,200+ Active Openings This Week
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#001f5c]">
                Banking Jobs are Waiting for You
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm">
                Verified vacancies with transparent monthly salaries and location criteria.
              </p>
            </div>

            <button
              onClick={() => setActiveTab('jobs')}
              className="px-5 py-2.5 rounded-xl bg-[#003399] hover:bg-[#002673] text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Explore All Jobs & Filters</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* 4 Job Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {JOB_POSTINGS.slice(0, 4).map((job) => (
              <div 
                key={job.id} 
                className="bg-white rounded-xl p-5 card-shadow border border-slate-200 hover:border-[#003399] transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded bg-blue-50 text-[#003399] font-black text-xs">
                      {job.bankName}
                    </span>
                    <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded font-bold">
                      ✓ Verified
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 line-clamp-2">
                    {job.title}
                  </h3>

                  <div className="text-xs text-slate-600 space-y-1 pt-1">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{job.location}</span>
                    </div>
                    <div className="flex items-center gap-1 font-bold text-slate-900">
                      <DollarSign className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{job.salaryMonthly}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500">{job.experienceRequired}</span>
                  <button
                    onClick={() => onSelectJob(job.id)}
                    className="text-xs font-bold text-[#003399] hover:text-blue-700 transition-colors flex items-center gap-0.5 cursor-pointer"
                  >
                    <span>Apply</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Resume Upload Callout */}
          <div className="p-4 bg-white rounded-xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#003399] flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  Don&apos;t know which bank fits your qualifications?
                </h4>
                <p className="text-xs text-slate-500">
                  Upload your resume and our automated matcher will alert you about matching openings.
                </p>
              </div>
            </div>
            <button
              onClick={onOpenResumeUpload}
              className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors cursor-pointer shrink-0"
            >
              Upload Resume (Free)
            </button>
          </div>
        </div>
      </section>

      {/* 8. REAL STUDENTS, REAL CAREERS (TESTIMONIALS & BANK LOGOS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-black text-[#003399] uppercase tracking-wider flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-[#003399]" />
              <span>Official Wall of Fame • {OFFICIAL_FACEBOOK_HANDLE}</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#001f5c]">
              Real Students. Verified Placements.
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm">
              Over <strong>3,000+ Banking Careers created</strong> across prestigious public and private banks. Authentic selection flyers direct from our Facebook page.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={OFFICIAL_FACEBOOK}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 hover:bg-blue-100 font-black text-xs transition-colors flex items-center gap-1.5 shadow-2xs"
            >
              <Facebook className="w-4 h-4 text-[#1877F2]" />
              <span>Follow {OFFICIAL_FACEBOOK_HANDLE}</span>
            </a>
            <button
              onClick={() => setActiveTab('stories')}
              className="px-5 py-2.5 rounded-xl bg-[#001f5c] hover:bg-[#003399] text-white font-black text-xs transition-colors cursor-pointer shadow-md flex items-center gap-1.5"
            >
              <span>View Full Wall of Fame ({SUCCESS_STORIES.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 3 Featured Official Student Flyer Posters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SUCCESS_STORIES.slice(0, 3).map((story) => (
            <StudentFlyerCard 
              key={story.id} 
              story={story} 
              variant="poster" 
              onOpenStory={onOpenStory} 
            />
          ))}
        </div>

        {/* Facebook Student Video Reels Showcase */}
        <div className="pt-6 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
            <div>
              <span className="text-xs font-bold text-[#1877F2] uppercase tracking-wider flex items-center gap-1.5">
                <Facebook className="w-3.5 h-3.5" />
                <span>{reelsText.eyebrow}</span>
              </span>
              <h3 className="text-lg font-black text-slate-900">
                {reelsText.heading}
              </h3>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              <a
                href={reelsText.buttonLink || OFFICIAL_FACEBOOK}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-blue-700 hover:text-blue-800 flex items-center gap-1 bg-blue-50 hover:bg-blue-100 border border-blue-200 px-3 py-1.5 rounded-xl transition-colors"
              >
                <span>{reelsText.buttonText}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {reelsList.map((reel) => {
              const currentThumb = reel.thumbnail;

              return (
                <div
                  key={reel.id}
                  className="bg-white rounded-xl overflow-hidden card-shadow border border-slate-200 hover:border-[#1877F2] group transition-all relative flex flex-col"
                >
                  <div className="relative aspect-9/12 bg-slate-900 overflow-hidden">
                    <img 
                      src={currentThumb} 
                      alt={reel.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-slate-950/40"></div>

                    <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between text-white text-[10px] z-10">
                      <span className="bg-[#1877F2] px-2 py-0.5 rounded-full font-bold">
                        Reel
                      </span>
                      <span className="bg-slate-900/80 px-2 py-0.5 rounded-full font-mono">
                        {reel.duration}
                      </span>
                    </div>

                    <a
                      href={reel.facebookLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute inset-0 flex items-center justify-center cursor-pointer"
                    >
                      <div className="w-10 h-10 rounded-full bg-white/90 text-[#1877F2] flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-[#1877F2] group-hover:text-white transition-all">
                        <Play className="w-4 h-4 fill-current ml-0.5" />
                      </div>
                    </a>

                    <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white space-y-0.5 pointer-events-none">
                      <span className="text-[10px] text-emerald-400 font-bold block">
                        {reel.views} views
                      </span>
                      <h4 className="text-xs font-bold line-clamp-2 text-white">
                        {reel.title}
                      </h4>
                      <p className="text-[10px] text-blue-200">
                        {reel.studentName}
                      </p>
                    </div>
                  </div>

                  <div className="p-2.5 bg-slate-50 text-[11px] text-slate-600 italic border-t border-slate-100 line-clamp-2 grow flex items-center">
                    <span>&ldquo;{reel.quote}&rdquo;</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Student Community Friendly Photos */}
        <div className="pt-6 space-y-4" id="home-campus-life-section">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3 border-b border-slate-200 pb-3">
            <div className="space-y-1 max-w-xl">
              <span className="text-xs font-bold text-[#003399] uppercase tracking-wider">
                {campusLifeText.eyebrow}
              </span>
              <h3 className="text-xl font-black text-slate-900">
                {campusLifeText.heading}
              </h3>
              <p className="text-xs text-slate-500">
                {campusLifeText.subtitle}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {campusLifeList.map((item, idx) => {
              return (
                <div 
                  key={item.id || idx}
                  className="bg-white rounded-xl overflow-hidden card-shadow border border-slate-200 group hover:shadow-md transition-all relative flex flex-col justify-between"
                >
                  <div className="relative h-28 overflow-hidden bg-slate-100">
                    <img 
                      src={item.image} 
                      alt={item.caption}
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        if (item.fallbackImage) {
                          e.currentTarget.src = item.fallbackImage;
                        }
                      }}
                      className="w-full h-full object-cover group-hover:scale-115 transition-transform duration-300"
                    />
                    <div className="absolute top-1.5 left-1.5 px-1.5 py-0.2 rounded bg-slate-900/80 text-white text-[9px] font-bold backdrop-blur-xs">
                      {item.tag}
                    </div>
                  </div>
                  <div className="p-2">
                    <p className="text-[11px] font-medium text-slate-700 line-clamp-2 leading-tight">
                      {item.caption}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8.5 PLAY STORE APP SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-br from-[#001438] via-[#002266] to-[#003399] rounded-3xl p-8 sm:p-12 text-white shadow-2xl border border-blue-800/50 relative overflow-hidden">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -left-20 -top-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30">
                  <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
                  Official Mobile App
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold border border-amber-400/30">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  Rated 4.8 ★ on Play Store
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight">
                Study Anywhere with <br className="hidden sm:inline" />
                <span className="text-[#38bdf8] underline decoration-amber-400 decoration-4 underline-offset-8">
                  {PLAY_STORE_APP_NAME}
                </span>
              </h2>

              <p className="text-blue-100 text-sm sm:text-base leading-relaxed max-w-xl">
                Carry India&apos;s most comprehensive banking preparation academy in your pocket. Access simulated computer-based tests, daily RBI news capsules, and interview schedules anytime.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <strong className="text-white block">500+ CBT Mock Tests</strong>
                    <span className="text-blue-200">Real IBPS/SBI interface with instant percentile</span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <strong className="text-white block">Finacle Banking Labs</strong>
                    <span className="text-blue-200">Video guides for CASA, KYC and retail lending</span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <strong className="text-white block">Daily Banking Awareness</strong>
                    <span className="text-blue-200">Financial current affairs & monthly PDF digests</span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <strong className="text-white block">Direct Placement Alerts</strong>
                    <span className="text-blue-200">Push notifications for private bank interview drives</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <GooglePlayBadge size="lg" id="app-showcase-google-play-badge" />

                <div className="text-xs text-blue-200">
                  <span className="block font-semibold text-white">App ID: co.lynde.hexqy</span>
                  <span>Compatible with Android smartphones & tablets</span>
                </div>
              </div>
            </div>

            {/* Visual Phone Mockup */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[300px] bg-slate-950 rounded-[36px] p-3 shadow-2xl border-4 border-slate-800">
                {/* Speaker notch */}
                <div className="w-20 h-4 bg-slate-800 rounded-full mx-auto mb-2"></div>
                
                {/* Screen Content */}
                <div className="bg-slate-900 rounded-[28px] p-4 text-white space-y-3 overflow-hidden border border-slate-800">
                  <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800">
                    <div className="flex items-center gap-1.5">
                      <div className="w-6 h-6 rounded-md bg-[#003399] flex items-center justify-center font-black text-[10px] text-amber-300">
                        B+
                      </div>
                      <span className="font-bold text-slate-200">{PLAY_STORE_APP_NAME}</span>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-blue-950/80 border border-blue-800/50 space-y-1">
                    <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider block">
                      Live Test Series
                    </span>
                    <h5 className="text-xs font-bold text-white">SBI PO Prelims Full Speed Mock #14</h5>
                    <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                      <span>100 Questions • 60 Mins</span>
                      <span className="text-emerald-400 font-bold">Start Now →</span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/50 space-y-1">
                    <span className="text-[10px] font-black uppercase text-emerald-400 tracking-wider block">
                      Banking Capsule
                    </span>
                    <h5 className="text-xs font-bold text-white">RBI Monetary Policy Highlights 2026</h5>
                    <p className="text-[10px] text-slate-400">PDF download available</p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/50 space-y-1">
                    <span className="text-[10px] font-black uppercase text-pink-400 tracking-wider block">
                      Placement Alert
                    </span>
                    <h5 className="text-xs font-bold text-white">HDFC Bank Deputy Manager Walk-in Drive</h5>
                    <p className="text-[10px] text-slate-400">Exclusive for BankPlus enrolled batches</p>
                  </div>

                  <a
                    href={PLAY_STORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors"
                  >
                    Download on Play Store
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. ALC FRANCHISE PARTNER TEASER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="navy-gradient rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
                <span>Authorized Learning Centre (ALC) • PAN India Solicited</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white">
                Launch an Authorized BankPlus Centre in Your City
              </h2>
              <p className="text-blue-100 text-sm sm:text-base leading-relaxed max-w-2xl">
                ALCs are solicited for PAN India. 7 Active centres open now in Bharatpur, Rudrapur, Budaun, Saharanpur, Siwan, Dineshpur, and Varanasi, plus upcoming centres in Farrukhabad, Gorakhpur, Bareilly, and Unnao.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2 text-xs sm:text-sm">
                <div className="bg-white/10 px-4 py-2.5 rounded-xl border border-white/15">
                  <span className="text-emerald-400 font-bold block text-base">PAN India</span>
                  <span className="text-slate-300 text-xs">Centres Solicited</span>
                </div>
                <div className="bg-white/10 px-4 py-2.5 rounded-xl border border-white/15">
                  <span className="text-white font-bold block text-base">7 Active + 4 Upcoming</span>
                  <span className="text-slate-300 text-xs">Centres Across 4 States</span>
                </div>
                <div className="bg-white/10 px-4 py-2.5 rounded-xl border border-white/15">
                  <span className="text-emerald-300 font-bold block text-base">WhatsApp Official</span>
                  <span className="text-slate-300 text-xs">{OFFICIAL_ALC_WHATSAPP}</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 text-center lg:text-right space-y-3">
              <a
                href={`https://wa.me/${OFFICIAL_ALC_WHATSAPP_RAW}?text=Hi%20BankPlus%2C%20I%20am%20interested%20in%20setting%20up%20an%20ALC%20Franchise%20Centre.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm shadow-xl transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-slate-950" />
                <span>ALC WhatsApp: {OFFICIAL_ALC_WHATSAPP}</span>
              </a>
              <span className="block text-xs text-blue-200">
                Direct connect with Corporate Office (Gurugram)
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 10. FREQUENTLY ASKED QUESTIONS */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-[#003399] uppercase tracking-wider">Clear Doubts</span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#001f5c]">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div 
                key={idx} 
                className="bg-white rounded-xl border border-slate-200 overflow-hidden card-shadow"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left font-bold text-slate-900 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50 transition-colors"
                >
                  <span className="text-sm sm:text-base">{faq.q}</span>
                  <span className="text-lg font-bold text-[#003399] shrink-0">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>
                {isOpen && (
                  <div className="p-4 sm:p-5 pt-0 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 11. LEAD CAPTURE BOTTOM SECTION */}
      <section className="bg-slate-100 py-12 border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <h3 className="text-2xl font-black text-[#001f5c]">
            Start Your Banking Career Journey Today
          </h3>
          <p className="text-slate-600 text-sm max-w-xl mx-auto">
            Connect directly on our official WhatsApp channels or visit our registered office in Civil Lines, Kanpur, corporate office in Gurugram, or our Authorized Learning Centres (ALCs) across India.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={`tel:${OFFICIAL_CONTACT_PHONE_RAW}`}
              className="px-7 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm shadow-md transition-all cursor-pointer flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-slate-950" />
              <span>Call Helpline: {OFFICIAL_CONTACT_PHONE}</span>
            </a>
            <a
              href={`https://wa.me/${OFFICIAL_COURSE_WHATSAPP_RAW}?text=Hi%20BankPlus%2C%20I%20want%20to%20apply%20for%20banking%20courses.`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm shadow-md transition-all cursor-pointer flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Admissions WhatsApp: {OFFICIAL_COURSE_WHATSAPP}</span>
            </a>
            <button
              onClick={() => setActiveTab('centres')}
              className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-bold text-sm transition-colors cursor-pointer"
            >
              Locate ALC Centres
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
