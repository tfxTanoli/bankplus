import React, { useState, useEffect } from 'react';
import { 
  OFFICIAL_ALC_WHATSAPP,
  OFFICIAL_ALC_WHATSAPP_RAW,
  REGISTERED_OFFICE,
  CORPORATE_OFFICE,
  ALC_OPEN_NOW_LIST,
  ALC_COMING_SOON_LIST,
  CENTRES,
  ALC_SIGN_UP_FEE,
  ALC_ROYALTY_FEE,
  OFFICIAL_FACEBOOK,
  OFFICIAL_FACEBOOK_HANDLE
} from '../data/mockData';
import { getMergedCampusLifeList, CAMPUS_LIFE_UPDATED_EVENT, CustomCampusLifeItem } from '../utils/campusLifeSectionStorage';
import { 
  Building2, 
  Sparkles, 
  Briefcase,
  MessageCircle,
  MapPin,
  Facebook,
  GraduationCap,
  Users,
  CheckCircle2,
  ExternalLink,
  CreditCard,
  BadgeCheck,
  Megaphone,
  Smartphone,
  BookOpen,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export const ALCPartnerView: React.FC = () => {
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-16">
      {/* 1. Hero Section */}
      <section className="bg-gradient-to-r from-[#001438] via-[#001f5c] to-[#003399] rounded-3xl p-8 sm:p-14 text-white shadow-2xl relative overflow-hidden">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-400 text-slate-950 text-xs font-black uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 fill-slate-950" />
              <span>ALCs Solicited for PAN India</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              Authorized Learning Centre (ALC) Franchise Network
            </h1>

            <p className="text-blue-100 text-sm sm:text-base leading-relaxed max-w-xl">
              Partner with BankPlus to launch a recognized Authorized Learning Centre in your city. Authorized Learning Centres are now actively solicited <strong>PAN India</strong>. Empower local youth with job-ready banking preparation backed by <strong>3,000+ placed careers</strong>.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <a
                href={`https://wa.me/${OFFICIAL_ALC_WHATSAPP_RAW}?text=Hi%20BankPlus%2C%20I%20am%20interested%20in%20an%20ALC%20Franchise%20partnership%20in%20my%20city.`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-3.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black text-sm shadow-xl transition-all cursor-pointer flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-slate-950" />
                <span>ALC Franchise Enquiry: {OFFICIAL_ALC_WHATSAPP}</span>
              </a>
            </div>
          </div>

          {/* Right Highlight Box */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl p-6 sm:p-8 text-slate-900 shadow-2xl space-y-4 border-4 border-emerald-400 relative">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>ALC Franchise Enquiry Helpline</span>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                  Official WhatsApp Channel for ALC Leads
                </span>
                <div className="text-3xl font-black text-[#001f5c]">
                  {OFFICIAL_ALC_WHATSAPP}
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Connect directly with our National Expansion & Franchise desk for syllabus setup, LMS accreditation, and placement alliance support.
              </p>

              <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-700">
                <div className="flex items-center justify-between">
                  <span>Sign Up Fees:</span>
                  <strong className="text-emerald-700 font-bold">{ALC_SIGN_UP_FEE} (One-Time)</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span>Royalty:</span>
                  <strong className="text-[#001f5c] font-bold">{ALC_ROYALTY_FEE}</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span>Target Scope:</span>
                  <strong className="text-[#001f5c]">PAN India (All States & Districts)</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span>Open Now ALCs:</span>
                  <strong className="text-emerald-700 font-bold">10 Active Cities</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span>Student Track Record:</span>
                  <strong className="text-slate-900">3,000+ Placed Careers</strong>
                </div>
              </div>

              <a
                href={`https://wa.me/${OFFICIAL_ALC_WHATSAPP_RAW}?text=Hi%20BankPlus%2C%20I%20am%20contacting%20regarding%20ALC%20Franchise%20Enquiry%20(Sign%20Up%3A%20%E2%82%B951%2C000%2C%20Royalty%3A%20%E2%82%B91%2C500%2FStudent%20Login).`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs rounded-xl shadow transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Chat for ALC Franchise Setup</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ALC Partnership Commercials & Deliverables */}
      <section id="alc-commercials-and-offers" className="space-y-10">
        <div className="text-center space-y-2.5 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-black uppercase tracking-wider border border-emerald-200">
            <CreditCard className="w-3.5 h-3.5 text-emerald-700" />
            <span>ALC Partnership Model</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#001f5c]">
            Investment Structure &amp; What BankPlus Offers
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm max-w-2xl mx-auto">
            Launch or expand your banking preparation academy with a proven operational framework, transparent commercials, and end-to-end institutional support.
          </p>
        </div>

        {/* Commercial Investment Cards: Sign Up Fees & Royalty */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Card 1: Sign Up Fees */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border-2 border-emerald-500 shadow-md relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 px-3 py-1 bg-emerald-500 text-slate-950 font-black text-[11px] rounded-bl-xl uppercase tracking-wider shadow-xs">
              One-Time Investment
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-black">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                  ALC Partnership Onboarding
                </span>
                <div className="text-3xl sm:text-4xl font-black text-[#001f5c] mt-1">
                  ₹51,000
                </div>
                <span className="text-xs font-bold text-emerald-700 block mt-1">
                  Sign Up Fees: ₹51,000 (One-Time)
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Includes official franchise accreditation certificate, territorial exclusivity rights in your catchment area, institute starter kit, and complete faculty orientation.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-600">Center Launch Timeline:</span>
              <span className="font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">Operational in 7 Days</span>
            </div>
          </div>

          {/* Card 2: Royalty */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border-2 border-[#003399] shadow-md relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 px-3 py-1 bg-[#003399] text-white font-black text-[11px] rounded-bl-xl uppercase tracking-wider shadow-xs">
              Pay-As-You-Grow
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#003399] flex items-center justify-center font-black">
                <CreditCard className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                  Per Student Licensing
                </span>
                <div className="text-3xl sm:text-4xl font-black text-[#001f5c] mt-1">
                  ₹1,500 <span className="text-sm sm:text-base font-semibold text-slate-500">/ Student Login</span>
                </div>
                <span className="text-xs font-bold text-[#003399] block mt-1">
                  Royalty: ₹1,500/Student Login
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                No fixed monthly franchise fees, no annual maintenance overheads, and no revenue deductions. You only pay when a new student enrolls and activates their digital portal.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-600">Fixed Monthly Overheads:</span>
              <span className="font-bold text-[#003399] bg-blue-50 px-2.5 py-1 rounded-full">₹0 Fixed Monthly Royalty</span>
            </div>
          </div>
        </div>

        {/* What BankPlus Offers - 5 Pillars */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-8">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-black uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 fill-slate-950" />
              <span>Full-Stack Institutional Deliverables</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-[#001f5c]">
              What BankPlus Offers
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Everything your academy needs to deliver the highest bank selection rate in your district:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 1. Branding Support */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 hover:border-[#003399] hover:bg-white hover:shadow-md transition-all space-y-3">
              <div className="w-11 h-11 rounded-xl bg-blue-100 text-[#003399] flex items-center justify-center font-black">
                <BadgeCheck className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-black uppercase tracking-wider text-[#003399] block">
                  Institutional Identity
                </span>
                <h4 className="text-lg font-black text-slate-900 mt-0.5">
                  Branding Support
                </h4>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                Every ALC can use <strong className="text-[#001f5c] bg-amber-200/70 px-1.5 py-0.5 rounded">&ldquo;Your Institute Name in association with BankPlus Learning&rdquo;</strong> Branding across your campus building signboard, reception desk, student certificates, and local hoardings.
              </p>
              <div className="pt-2 text-[11px] font-bold text-slate-700 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Official co-branding authorization kit</span>
              </div>
            </div>

            {/* 2. Marketing Support */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 hover:border-pink-500 hover:bg-white hover:shadow-md transition-all space-y-3">
              <div className="w-11 h-11 rounded-xl bg-pink-100 text-pink-700 flex items-center justify-center font-black">
                <Megaphone className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-black uppercase tracking-wider text-pink-700 block">
                  Digital &amp; Social Reach
                </span>
                <h4 className="text-lg font-black text-slate-900 mt-0.5">
                  Marketing Support
                </h4>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                <strong className="text-slate-900">Highlighted on our Social Media Pages and Website</strong>. Your center receives an official verified centre listing on the BankPlus portal, verified Facebook shoutouts, and local digital lead redirection.
              </p>
              <div className="pt-2 text-[11px] font-bold text-slate-700 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-pink-600 shrink-0" />
                <span>Featured on central website &amp; social handles</span>
              </div>
            </div>

            {/* 3. Technology Support */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 hover:border-emerald-500 hover:bg-white hover:shadow-md transition-all space-y-3">
              <div className="w-11 h-11 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black">
                <Smartphone className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-black uppercase tracking-wider text-emerald-800 block">
                  Digital Learning LMS
                </span>
                <h4 className="text-lg font-black text-slate-900 mt-0.5">
                  Technology Support
                </h4>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                <strong className="text-slate-900">Each Student gets a login on the BankPlus App</strong> (available on Google Play Store). Full access to CBT mock tests, speed drill software, video modules, live class replays, and sectional score analytics.
              </p>
              <div className="pt-2 text-[11px] font-bold text-slate-700 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Individual student app login credentials</span>
              </div>
            </div>

            {/* 4. Study Material */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 hover:border-amber-500 hover:bg-white hover:shadow-md transition-all space-y-3">
              <div className="w-11 h-11 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-black">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-black uppercase tracking-wider text-amber-800 block">
                  Exhaustive Curriculum
                </span>
                <h4 className="text-lg font-black text-slate-900 mt-0.5">
                  Study Material
                </h4>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                <strong className="text-slate-900">Best in Class Govt and Private Banking Study Material</strong>. Rigorously updated books, practice problem sets, current affairs monthly digests, and specialized private banking modules (CASA, loans, credit underwriting).
              </p>
              <div className="pt-2 text-[11px] font-bold text-slate-700 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                <span>Printed handbooks &amp; digital test series</span>
              </div>
            </div>

            {/* 5. Placement Channel Access (spans 2 cols on lg) */}
            <div className="bg-gradient-to-br from-[#001f5c] via-[#002673] to-[#003399] text-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all space-y-4 md:col-span-2 lg:col-span-2 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-xl bg-white/15 text-emerald-300 flex items-center justify-center font-black">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-400 text-slate-950 text-xs font-black">
                    Exclusive State Channels
                  </span>
                </div>
                <div>
                  <span className="text-[11px] font-black uppercase tracking-wider text-blue-200 block">
                    Institutional Placement Network
                  </span>
                  <h4 className="text-xl font-black text-white mt-0.5">
                    Placement Channel Access
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
                  <strong className="text-white">Unlimited Placement Support through State Placement Channels</strong>. Your students get direct interview line-ups with partner private commercial banks across ICICI Bank, HDFC Bank, Axis Bank, Kotak Mahindra Bank, IndusInd Bank, and leading NBFCs until they secure their appointment letters.
                </p>
              </div>

              <div className="pt-4 border-t border-white/15 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-emerald-300 font-bold">
                  <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-400" />
                  <span>Unlimited corporate bank interviews till selection</span>
                </div>
                <a
                  href={`https://wa.me/${OFFICIAL_ALC_WHATSAPP_RAW}?text=Hi%20BankPlus%2C%20I%20want%20to%20know%20more%20about%20State%20Placement%20Channels%20and%20ALC%20Franchise%20Partnership.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black text-xs transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <span>Enquire for State Placement Channels</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Apply Bar */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-blue-50 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <h5 className="text-sm font-black text-slate-900">
                Partner with BankPlus Today
              </h5>
              <p className="text-xs text-slate-600">
                Sign Up Fees: <strong className="text-slate-900">₹51,000</strong> • Royalty: <strong className="text-slate-900">₹1,500/Student Login</strong> • Fast 7-Day Launch
              </p>
            </div>
            <a
              href={`https://wa.me/${OFFICIAL_ALC_WHATSAPP_RAW}?text=Hi%20BankPlus%2C%20I%20am%20interested%20in%20ALC%20Partnership%20(Sign%20Up%20Fees%3A%20%E2%82%B951%2C000%2C%20Royalty%3A%20%E2%82%B91%2C500%2FStudent%20Login).%20Please%20share%20the%20onboarding%20procedure.`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Apply for ALC Partnership on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      {/* 3. ALCs Network (7 Active + 3 Coming Soon) */}
      <section className="space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#003399] text-xs font-bold border border-blue-200">
            <MapPin className="w-3.5 h-3.5 text-[#003399]" />
            <span>Operational ALC Network</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#001f5c]">
            Authorized Learning Centres (ALCs)
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm">
            7 active Authorized Learning Centres operating with verified addresses, plus 3 upcoming centres opening soon.
          </p>
        </div>

        {/* 7 Open Now Centres */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-800">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>7 ALCs Open Now (Walk-ins, Admissions & Classrooms Active)</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {ALC_OPEN_NOW_LIST.map((city, idx) => {
              const centreData = CENTRES.find(c => c.city.toLowerCase() === city.toLowerCase());
              const address = centreData?.fullAddress || `${city} City`;

              return (
                <div 
                  key={idx}
                  className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all space-y-3 group flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded-full">
                        Open Now
                      </span>
                    </div>
                    <div>
                      <h3 className="text-base font-black text-slate-900">{city} ALC</h3>
                      <p className="text-xs text-slate-600 line-clamp-2 mt-1 leading-snug">
                        {address}
                      </p>
                    </div>
                  </div>
                  <a
                    href={`https://wa.me/${OFFICIAL_ALC_WHATSAPP_RAW}?text=${encodeURIComponent(`Hi BankPlus, I am enquiring about the ${city} ALC at ${address}.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 px-3 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs transition-colors flex items-center justify-center gap-1 border border-emerald-200"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-emerald-700" />
                    <span>Enquire on WhatsApp</span>
                  </a>
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming Coming Soon Centres */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-800">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
            <span>Upcoming ALCs (Coming Soon)</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ALC_COMING_SOON_LIST.map((city, idx) => (
              <div 
                key={idx}
                className="bg-amber-50/40 rounded-2xl p-5 border border-amber-200 hover:border-amber-400 hover:shadow-sm transition-all space-y-3 group flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-bold text-amber-900 bg-amber-200/80 border border-amber-300 px-2 py-0.5 rounded-full">
                      Coming Soon
                    </span>
                  </div>
                  <div>
                    <h3 className="text-base font-black text-slate-900">{city} ALC</h3>
                    <p className="text-xs text-amber-900/80 mt-1">
                      Launching Shortly • Admissions & Venue Announcement Pending
                    </p>
                  </div>
                </div>
                <a
                  href={`https://wa.me/${OFFICIAL_ALC_WHATSAPP_RAW}?text=${encodeURIComponent(`Hi BankPlus, I want to get notified when the ${city} ALC opens.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-3 rounded-lg bg-white hover:bg-amber-100/60 text-amber-900 font-bold text-xs transition-colors flex items-center justify-center gap-1 border border-amber-300"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-amber-800" />
                  <span>Get Launch Notification</span>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* PAN India Solicitation Note */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 text-center space-y-1">
          <p className="text-xs sm:text-sm font-bold text-[#001f5c]">
            ALCs are solicited for PAN India — New cities and district centres are enrolling weekly.
          </p>
          <p className="text-xs text-slate-600">
            Interested educational institutions or coaching directors can message ALC Leads directly on WhatsApp.
          </p>
        </div>
      </section>

      {/* 3. Student Friendly Learning Culture & Facebook Highlights */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200 mb-1">
              <Facebook className="w-3.5 h-3.5 text-[#1877F2]" />
              <span>Student Friendly Academies</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#001f5c]">
              Genuine Student Life & Preparation Culture
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm">
              Our students experience interactive peer study, mock interview simulations, and celebratory selection moments.
            </p>
          </div>

          <a
            href={OFFICIAL_FACEBOOK}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold flex items-center gap-1.5 border border-blue-200 transition-colors"
          >
            <Facebook className="w-4 h-4" />
            <span>Follow {OFFICIAL_FACEBOOK_HANDLE}</span>
            <ExternalLink className="w-3 h-3 ml-0.5" />
          </a>
        </div>

        {/* Student Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {campusLifeList.map((item) => (
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

      {/* 4. Official Registered and Corporate Headquarters */}
      <section className="bg-white rounded-3xl p-8 sm:p-10 card-shadow border border-slate-200 space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-bold text-[#003399] uppercase tracking-wider">
            Official Headquarters
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#001f5c]">
            BankPlus Administrative Offices
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center gap-2 text-[#003399]">
              <Building2 className="w-5 h-5" />
              <span className="text-xs font-black uppercase tracking-wider">Registered Office</span>
            </div>
            <h4 className="text-base font-bold text-slate-900">{REGISTERED_OFFICE}</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Central academic headquarters, student records, syllabus accreditation, and legal contracting.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center gap-2 text-emerald-700">
              <Briefcase className="w-5 h-5" />
              <span className="text-xs font-black uppercase tracking-wider">Corporate Office</span>
            </div>
            <h4 className="text-base font-bold text-slate-900">{CORPORATE_OFFICE}</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Corporate banking partnerships, HR placement channels, nationwide ALC expansion, and media desk.
            </p>
            <div className="pt-2">
              <span className="text-xs text-slate-500">ALC Franchise Helpline: </span>
              <strong className="text-xs text-emerald-800">{OFFICIAL_ALC_WHATSAPP}</strong>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-2xl p-6 sm:p-8 text-white text-center space-y-4">
          <h3 className="text-xl sm:text-2xl font-black text-white">
            Connect with ALC Franchise Helpline
          </h3>
          <p className="text-emerald-100 text-xs sm:text-sm max-w-xl mx-auto">
            Use the official WhatsApp channel <strong>{OFFICIAL_ALC_WHATSAPP}</strong> for instant franchise counseling and partnership brochures.
          </p>
          <a
            href={`https://wa.me/${OFFICIAL_ALC_WHATSAPP_RAW}?text=Hi%20BankPlus%2C%20I%20am%20interested%20in%20an%20ALC%20franchise.`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 py-3 px-6 rounded-xl bg-white text-slate-950 font-black text-xs sm:text-sm hover:bg-emerald-50 transition-colors shadow-lg"
          >
            <MessageCircle className="w-4 h-4 fill-emerald-600 text-emerald-600" />
            <span>Chat with ALC Desk ({OFFICIAL_ALC_WHATSAPP})</span>
          </a>
        </div>
      </section>
    </div>
  );
};
