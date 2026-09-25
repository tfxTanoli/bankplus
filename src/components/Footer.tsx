import React, { useState } from 'react';
import { PageTab } from '../types';
import { BankPlusLogo } from './BankPlusLogo';
import { GooglePlayBadge } from './GooglePlayBadge';
import { 
  ShieldCheck, 
  MapPin, 
  Phone, 
  Mail, 
  MessageCircle, 
  ChevronRight, 
  Award, 
  CheckCircle2, 
  Send, 
  Clock, 
  Heart,
  Facebook,
  Youtube,
  Building2,
  ExternalLink,
  Smartphone,
  X,
  FileText,
  Lock
} from 'lucide-react';
import { 
  OFFICIAL_COURSE_WHATSAPP, 
  OFFICIAL_COURSE_WHATSAPP_RAW,
  OFFICIAL_ALC_WHATSAPP, 
  OFFICIAL_ALC_WHATSAPP_RAW,
  OFFICIAL_CONTACT_PHONE,
  OFFICIAL_CONTACT_PHONE_RAW,
  OFFICIAL_EMAIL,
  OFFICIAL_FACEBOOK, 
  OFFICIAL_FACEBOOK_HANDLE,
  OFFICIAL_YOUTUBE,
  OFFICIAL_YOUTUBE_HANDLE,
  REGISTERED_OFFICE,
  CORPORATE_OFFICE,
  SELECTION_GUARANTEE_STATEMENT,
  PLAY_STORE_APP_NAME,
  PLAY_STORE_URL
} from '../data/mockData';

interface FooterProps {
  setActiveTab: (tab: PageTab) => void;
  onOpenEnquiry: () => void;
  onOpenWhatsApp: (stateId?: string) => void;
  onOpenExport?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  setActiveTab,
  onOpenEnquiry,
  onOpenWhatsApp,
  onOpenExport,
}) => {
  const [emailSub, setEmailSub] = useState('');
  const [subSuccess, setSubSuccess] = useState(false);
  const [activeLegalModal, setActiveLegalModal] = useState<'privacy' | 'terms' | 'alc' | null>(null);

  const handleSub = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailSub) return;
    setSubSuccess(true);
    setTimeout(() => {
      setSubSuccess(false);
      setEmailSub('');
    }, 4000);
  };

  const handleNav = (tab: PageTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#001438] text-slate-300 pt-16 pb-8 border-t-4 border-[#0ea5e9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Top Highlight Banner */}
        <div className="bg-gradient-to-r from-[#001f5c] via-[#003399] to-[#0284c7] rounded-2xl p-6 sm:p-8 mb-12 shadow-xl border border-blue-900/60 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-black">
              <CheckCircle2 className="w-3.5 h-3.5 text-slate-950" />
              <span>{SELECTION_GUARANTEE_STATEMENT}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Ready to Secure Your Career in Banking?
            </h3>
            <p className="text-blue-100 text-sm max-w-2xl leading-relaxed">
              Unlimited training sessions and unlimited interviews until you hold your official appointment letter. Call or WhatsApp on <strong>{OFFICIAL_CONTACT_PHONE}</strong> or study anytime via the <strong>{PLAY_STORE_APP_NAME}</strong> app.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={`tel:${OFFICIAL_CONTACT_PHONE_RAW}`}
              className="px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm shadow-md transition-all hover:scale-105 flex items-center gap-2 cursor-pointer"
            >
              <Phone className="w-4 h-4 fill-slate-950 text-slate-950" />
              <span>Call: {OFFICIAL_CONTACT_PHONE}</span>
            </a>
            <a
              href={`https://wa.me/${OFFICIAL_COURSE_WHATSAPP_RAW}?text=Hi%20BankPlus%2C%20I%20am%20interested%20in%20Banking%20Course%20Admissions%20and%20Counseling.`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md transition-all hover:scale-105 flex items-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>WhatsApp: {OFFICIAL_COURSE_WHATSAPP}</span>
            </a>
            <GooglePlayBadge size="md" id="footer-playstore-badge" />
          </div>
        </div>

        {/* 4 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Col 1: Brand & Official Offices (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNav('home')}>
              <div className="bg-white px-3.5 py-1.5 rounded-xl inline-flex items-center shadow-md">
                <BankPlusLogo variant="light" size="md" officialAsset />
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed pr-4">
              BankPlus is India&apos;s leading specialized academy with <strong>3,000+ Banking Careers created</strong>. Dual-track preparation for Government Bank Exams (SBI, IBPS, RRB) and Private Banks (HDFC, ICICI, Axis) with direct placement drives.
            </p>

            {/* Official Social Channels: Facebook & YouTube */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {/* Facebook Page */}
              <div className="p-3 bg-gradient-to-r from-blue-950/40 via-indigo-950/40 to-slate-900 rounded-xl border border-blue-500/30 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-[#1877F2] flex items-center justify-center text-white shrink-0 shadow-sm">
                    <Facebook className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[11px] font-bold text-white block truncate">Facebook</span>
                    <span className="text-[10px] text-blue-300 font-medium block truncate">{OFFICIAL_FACEBOOK_HANDLE}</span>
                  </div>
                </div>
                <a
                  href={OFFICIAL_FACEBOOK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[11px] font-bold transition-all flex items-center gap-1 shrink-0"
                  title="Follow BankPlus on Facebook"
                >
                  <span>Follow</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>

              {/* YouTube Channel */}
              <div className="p-3 bg-gradient-to-r from-red-950/40 via-rose-950/40 to-slate-900 rounded-xl border border-red-500/30 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center text-white shrink-0 shadow-sm">
                    <Youtube className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[11px] font-bold text-white block truncate">YouTube</span>
                    <span className="text-[10px] text-red-300 font-medium block truncate">{OFFICIAL_YOUTUBE_HANDLE}</span>
                  </div>
                </div>
                <a
                  href={OFFICIAL_YOUTUBE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 rounded-lg bg-red-600/30 hover:bg-red-600/50 text-red-100 hover:text-white text-[11px] font-bold transition-all flex items-center gap-1 shrink-0 border border-red-500/30"
                  title="Subscribe to BankPlus Learning on YouTube"
                >
                  <span>Watch</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
            </div>

            <div className="pt-2 space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#38bdf8] shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">Registered Office:</strong> {REGISTERED_OFFICE}
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <Building2 className="w-4 h-4 text-[#38bdf8] shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">Corporate Office:</strong> {CORPORATE_OFFICE}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>
                  Official Contact No: <a href={`tel:${OFFICIAL_CONTACT_PHONE_RAW}`} className="text-white hover:text-amber-400 font-bold">{OFFICIAL_CONTACT_PHONE}</a>
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  Admissions Official WhatsApp: <a href={`https://wa.me/${OFFICIAL_COURSE_WHATSAPP_RAW}`} className="text-white hover:text-emerald-400 font-bold">{OFFICIAL_COURSE_WHATSAPP}</a>
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Smartphone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  App on Play Store: <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer" className="text-white hover:text-emerald-300 font-bold transition-colors">{PLAY_STORE_APP_NAME}</a>
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#38bdf8] shrink-0" />
                <span>
                  Official Email: <a href={`mailto:${OFFICIAL_EMAIL}`} className="text-white hover:text-[#38bdf8]">{OFFICIAL_EMAIL}</a>
                </span>
              </div>
            </div>
          </div>

          {/* Col 2: Flagship Programs */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider border-b border-slate-800 pb-2 flex items-center justify-between">
              <span>Flagship Programs</span>
              <Award className="w-4 h-4 text-[#38bdf8]" />
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handleNav('programs')} className="text-slate-300 hover:text-white transition-colors text-left cursor-pointer">
                  Govt + Pvt Selection Guarantee (90-Day)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('programs')} className="text-slate-300 hover:text-white transition-colors text-left cursor-pointer">
                  Government Pariksha (SBI & IBPS PO/Clerk)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('programs')} className="text-slate-300 hover:text-white transition-colors text-left cursor-pointer">
                  Young Bankers Fast-Track (Private Banks)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('programs')} className="text-slate-300 hover:text-white transition-colors text-left cursor-pointer">
                  Ex-Banker Mock Interview Bootcamps
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('programs')} className="text-slate-300 hover:text-white transition-colors text-left cursor-pointer">
                  CBT Speed Drills & Online Test Series
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Open Now ALCs */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider border-b border-slate-800 pb-2 flex items-center justify-between">
              <span>ALCs & Centres</span>
              <span className="text-[10px] bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-800 font-bold">7 Active + 4 Upcoming</span>
            </h4>
            <p className="text-[11px] text-slate-400">
              Walk-in for admissions or computer lab practice:
            </p>
            <div className="grid grid-cols-2 gap-1.5 text-xs text-slate-300">
              <span className="hover:text-white cursor-pointer" onClick={() => handleNav('centres')}>• Bharatpur</span>
              <span className="hover:text-white cursor-pointer" onClick={() => handleNav('centres')}>• Rudrapur</span>
              <span className="hover:text-white cursor-pointer" onClick={() => handleNav('centres')}>• Budaun</span>
              <span className="hover:text-white cursor-pointer" onClick={() => handleNav('centres')}>• Saharanpur</span>
              <span className="hover:text-white cursor-pointer" onClick={() => handleNav('centres')}>• Siwan</span>
              <span className="hover:text-white cursor-pointer" onClick={() => handleNav('centres')}>• Dineshpur</span>
              <span className="hover:text-white cursor-pointer" onClick={() => handleNav('centres')}>• Varanasi</span>
              <span className="hover:text-white cursor-pointer" onClick={() => handleNav('centres')}>• Farrukhabad</span>
              <span className="hover:text-white cursor-pointer" onClick={() => handleNav('centres')}>• Gorakhpur</span>
              <span className="hover:text-white cursor-pointer" onClick={() => handleNav('centres')}>• Bareilly (Soon)</span>
              <span className="hover:text-white cursor-pointer" onClick={() => handleNav('centres')}>• Unnao (Soon)</span>
            </div>
            <div className="pt-2">
              <button 
                onClick={() => handleNav('centres')} 
                className="text-[#38bdf8] hover:text-cyan-300 font-bold text-xs flex items-center gap-1 transition-colors cursor-pointer"
              >
                <span>View Full Branch Addresses</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Col 4: Franchise & PAN India Expansion */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider border-b border-slate-800 pb-2">
              ALC Partner (Franchise)
            </h4>
            <div className="p-3 bg-blue-950/60 rounded-xl border border-blue-800/80 space-y-1.5">
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 block">
                PAN India Solicited
              </span>
              <p className="text-xs text-slate-200">
                Authorized Learning Centres (ALCs) are solicited across all districts in India.
              </p>
              <a
                href={`https://wa.me/${OFFICIAL_ALC_WHATSAPP_RAW}?text=Hi%2C%20I%20am%20interested%20in%20setting%20up%20an%20ALC%20in%20my%20city.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors pt-1"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp: {OFFICIAL_ALC_WHATSAPP}</span>
              </a>
            </div>

            <ul className="space-y-2 text-xs pt-1">
              <li>
                <button onClick={() => handleNav('partner')} className="text-slate-300 hover:text-white transition-colors text-left cursor-pointer">
                  Why Partner with BankPlus?
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('stories')} className="text-slate-300 hover:text-white transition-colors text-left cursor-pointer">
                  3,000+ Placement Hall of Fame
                </button>
              </li>
              <li>
                <a 
                  href={OFFICIAL_FACEBOOK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1 text-left"
                >
                  <Facebook className="w-3.5 h-3.5" />
                  <span>Success Stories on Facebook</span>
                </a>
              </li>
              <li>
                <a 
                  href={OFFICIAL_YOUTUBE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-400 hover:text-red-300 transition-colors flex items-center gap-1 text-left"
                >
                  <Youtube className="w-3.5 h-3.5" />
                  <span>YouTube ({OFFICIAL_YOUTUBE_HANDLE})</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar - Properly Aligned Legal & Policy Links */}
        <div className="pt-8 mt-10 border-t border-slate-800 text-xs text-slate-400">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 text-center lg:text-left">
            {/* Left: Copyright & Headquarters Presence */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-3 gap-y-1.5">
              <span>© {new Date().getFullYear()} BankPlus India. 3,000+ Banking Careers Created.</span>
              <span className="hidden sm:inline text-slate-700">|</span>
              <span className="inline-flex items-center gap-1 text-slate-400">
                <span>Registered in Kanpur & Gurugram</span>
                <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline mx-0.5" />
                <span>Serving PAN India</span>
              </span>
            </div>

            {/* Right: Properly Aligned Privacy Policy, Legal Norms & Social Channels */}
            <div className="flex flex-wrap items-center justify-center lg:justify-end gap-x-3 sm:gap-x-4 gap-y-2">
              <button 
                type="button"
                onClick={() => setActiveLegalModal('privacy')}
                className="hover:text-white font-medium transition-colors cursor-pointer"
              >
                Privacy Policy
              </button>
              <span className="text-slate-700 select-none">•</span>
              <button 
                type="button"
                onClick={() => setActiveLegalModal('terms')}
                className="hover:text-white font-medium transition-colors cursor-pointer"
              >
                Terms & Conditions
              </button>
              <span className="text-slate-700 select-none">•</span>
              <button 
                type="button"
                onClick={() => setActiveLegalModal('alc')}
                className="hover:text-white font-medium transition-colors cursor-pointer"
              >
                ALC Agreement Norms
              </button>
              <span className="text-slate-700 select-none hidden sm:inline">•</span>
              <div className="flex items-center gap-3">
                <a 
                  href={OFFICIAL_FACEBOOK} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 font-medium inline-flex items-center gap-1 transition-colors"
                  title="Follow BankPlus on Facebook"
                >
                  <Facebook className="w-3.5 h-3.5" />
                  <span>Facebook</span>
                </a>
                <span className="text-slate-700 select-none">•</span>
                <a 
                  href={OFFICIAL_YOUTUBE} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-red-400 hover:text-red-300 font-medium inline-flex items-center gap-1 transition-colors"
                  title="Subscribe to BankPlus on YouTube"
                >
                  <Youtube className="w-3.5 h-3.5" />
                  <span>YouTube</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Policy & Legal Documentation Modal */}
      {activeLegalModal && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setActiveLegalModal(null)}
        >
          <div 
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden shadow-2xl border border-slate-200 text-slate-800 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-slate-50 border-b border-slate-200 p-4 sm:p-5 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#003399]/10 text-[#003399] flex items-center justify-center font-bold">
                  {activeLegalModal === 'privacy' && <Lock className="w-4 h-4 text-[#003399]" />}
                  {activeLegalModal === 'terms' && <FileText className="w-4 h-4 text-[#003399]" />}
                  {activeLegalModal === 'alc' && <Building2 className="w-4 h-4 text-[#003399]" />}
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-[#001f5c]">
                    {activeLegalModal === 'privacy' && 'BankPlus Privacy Policy'}
                    {activeLegalModal === 'terms' && 'BankPlus Terms & Conditions'}
                    {activeLegalModal === 'alc' && 'Authorized Learning Centre (ALC) Norms'}
                  </h3>
                  <p className="text-xs text-slate-500">Official Candidate & Partner Documentation • BankPlus India</p>
                </div>
              </div>
              <button 
                type="button"
                onClick={() => setActiveLegalModal(null)}
                className="w-8 h-8 rounded-full hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
              {activeLegalModal === 'privacy' && (
                <>
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-3.5 flex items-start gap-2.5 text-xs text-[#003399] font-medium">
                    <ShieldCheck className="w-4 h-4 shrink-0 text-[#003399] mt-0.5" />
                    <span>Candidate Trust Guarantee: BankPlus strictly safeguards personal details, test performance logs, and contact credentials with zero commercial resale to telemarketers.</span>
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-bold text-slate-900 text-sm">1. Candidate Information Collection</h4>
                    <p>We collect essential academic and profile details including candidate name, contact mobile number, email, educational background, and preferred banking examination tracks (SBI PO/Clerk, IBPS, RBI, or leading Private Banking programs).</p>
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-bold text-slate-900 text-sm">2. Purpose & Academic Utility</h4>
                    <p>Candidate information is utilized exclusively for classroom batch assignments, Computer-Based Test (CBT) speed drill evaluations, ex-banker mock interview schedules, and coordinating direct recruitment drives with commercial partner banks.</p>
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-bold text-slate-900 text-sm">3. Zero Resale Policy</h4>
                    <p>BankPlus strictly assures candidates that their data is never leased, sold, or shared with third-party brokers, lenders, or commercial spam marketing networks.</p>
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-bold text-slate-900 text-sm">4. Data Access & Inquiries</h4>
                    <p>Candidates may request updates to their profile records by emailing <span className="font-semibold text-slate-800">{OFFICIAL_EMAIL}</span> or contacting our central admissions office in Kanpur & Gurugram.</p>
                  </div>
                </>
              )}

              {activeLegalModal === 'terms' && (
                <>
                  <div className="space-y-1">
                    <h4 className="font-bold text-slate-900 text-sm">1. 100% Selection Guarantee Framework</h4>
                    <p>Our 100% Selection Guarantee provides candidates with unlimited training batches, ongoing CBT lab drill access, and repeated private bank interview drives until an official appointment letter is received, subject to candidate maintaining 85% attendance.</p>
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-bold text-slate-900 text-sm">2. Lab & Classroom Protocol</h4>
                    <p>Candidates must adhere to high standards of academic discipline, wear formal business attire for corporate interview bootcamps, and respect centre computer lab equipment.</p>
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-bold text-slate-900 text-sm">3. Transparent Fee & EMI Options</h4>
                    <p>Program enrollments cover comprehensive physical study kits, online test series, speed drills, and corporate placement facilitation. Low-cost monthly EMI options starting at ₹2,500/month are facilitated via partner financial institutions.</p>
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-bold text-slate-900 text-sm">4. Jurisdiction</h4>
                    <p>All institutional and admissions agreements are governed by the laws of India under the jurisdiction of competent courts in Kanpur and Gurugram.</p>
                  </div>
                </>
              )}

              {activeLegalModal === 'alc' && (
                <>
                  <div className="space-y-1">
                    <h4 className="font-bold text-slate-900 text-sm">1. Authorized Learning Centre (ALC) Accreditation</h4>
                    <p>BankPlus ALCs are authorized regional centres operating under institutional franchise agreements to deliver standardized banking preparation and speed testing facilities.</p>
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-bold text-slate-900 text-sm">2. Infrastructure Standards</h4>
                    <p>Every active ALC (including Bharatpur, Rudrapur, Budaun, Saharanpur, Siwan, Dineshpur, Varanasi, and upcoming branches) must provide dedicated CBT computer terminals, high-speed connectivity, and certified banking mentors.</p>
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-bold text-slate-900 text-sm">3. Territory & Franchise Inquiries</h4>
                    <p>ALC franchises are solicited PAN India across all districts. Prospective franchise partners can connect directly via WhatsApp at <span className="font-semibold text-slate-800">{OFFICIAL_ALC_WHATSAPP}</span> or email <span className="font-semibold text-slate-800">alc@bankplus.in</span>.</p>
                  </div>
                </>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
              <span className="text-xs text-slate-500">BankPlus India • Empowering Banking Aspirants</span>
              <button
                type="button"
                onClick={() => setActiveLegalModal(null)}
                className="px-5 py-2 rounded-xl bg-[#001f5c] hover:bg-[#003399] text-white text-xs font-bold transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
