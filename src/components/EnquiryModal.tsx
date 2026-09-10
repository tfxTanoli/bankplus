import React, { useState, useEffect } from 'react';
import { X, MessageCircle, Building2, ExternalLink, ShieldCheck, CheckCircle2, Sparkles, Phone } from 'lucide-react';
import { 
  OFFICIAL_COURSE_WHATSAPP, 
  OFFICIAL_COURSE_WHATSAPP_RAW,
  OFFICIAL_ALC_WHATSAPP, 
  OFFICIAL_ALC_WHATSAPP_RAW,
  OFFICIAL_CONTACT_PHONE,
  OFFICIAL_CONTACT_PHONE_RAW,
  REGISTERED_OFFICE,
  CORPORATE_OFFICE,
  ALC_SIGN_UP_FEE,
  ALC_ROYALTY_FEE
} from '../data/mockData';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProgram?: string;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
  isOpen,
  onClose,
  defaultProgram,
}) => {
  const [activeTab, setActiveTab] = useState<'course' | 'alc'>('course');
  const [studentName, setStudentName] = useState('');
  const [selectedCity, setSelectedCity] = useState('Kanpur');

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const courseWhatsAppUrl = `https://wa.me/${OFFICIAL_COURSE_WHATSAPP_RAW}?text=${encodeURIComponent(
    `Hello BankPlus! My name is ${studentName || 'Aspirant'}. I am from ${selectedCity} and I am interested in Course Admissions counseling for ${defaultProgram || 'Banking Programs'}.`
  )}`;

  const alcWhatsAppUrl = `https://wa.me/${OFFICIAL_ALC_WHATSAPP_RAW}?text=${encodeURIComponent(
    `Hello BankPlus! I am interested in setting up an Authorized Learning Centre (ALC Franchise) in ${selectedCity}. Please share the prospectus and PAN India onboarding details.`
  )}`;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-md sm:max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Gradient */}
        <div className="bg-gradient-to-r from-[#001f5c] via-[#003399] to-[#0055ff] px-4 py-3 sm:px-5 sm:py-3.5 text-white relative shrink-0">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/30 border border-emerald-400/40 text-emerald-200 text-[10px] font-bold mb-1">
            <Sparkles className="w-3 h-3 text-emerald-300" />
            <span>Official WhatsApp Channels • Instant Connect</span>
          </div>

          <h3 className="text-base sm:text-lg font-black tracking-tight text-white">
            Connect on Official WhatsApp
          </h3>
          <p className="text-blue-100 text-xs mt-0.5">
            BankPlus connects directly via verified WhatsApp channels for immediate guidance.
          </p>

          {/* Toggle between Admissions WhatsApp & ALC Franchise */}
          <div className="grid grid-cols-2 gap-1.5 mt-2.5 bg-black/25 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab('course')}
              className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'course'
                  ? 'bg-white text-[#001f5c] shadow-xs'
                  : 'text-blue-100 hover:text-white'
              }`}
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>Admissions WhatsApp</span>
            </button>
            <button
              onClick={() => setActiveTab('alc')}
              className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'alc'
                  ? 'bg-white text-[#001f5c] shadow-xs'
                  : 'text-blue-100 hover:text-white'
              }`}
            >
              <Building2 className="w-3.5 h-3.5 text-[#003399]" />
              <span>ALC Franchise</span>
            </button>
          </div>
        </div>

        <div className="p-4 sm:p-5 space-y-3.5 overflow-y-auto grow">
          {activeTab === 'course' ? (
            /* Admissions WhatsApp Section */
            <div className="space-y-3">
              <div className="bg-emerald-50/80 border border-emerald-200 rounded-xl p-3 flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <MessageCircle className="w-4 h-4 fill-white" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">
                    Official Admissions WhatsApp Channel
                  </span>
                  <div className="text-base font-black text-slate-900 tracking-tight">
                    {OFFICIAL_COURSE_WHATSAPP}
                  </div>
                  <p className="text-[11px] text-slate-600">
                    For course selection, syllabus roadmaps, batch timings, and lab access.
                  </p>
                </div>
              </div>

              <div className="space-y-2.5">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Your Name (Optional for personalized intro)
                  </label>
                  <input
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#003399]/30 focus:border-[#003399]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Your Nearest City / ALC Centre
                  </label>
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#003399]/30 focus:border-[#003399] bg-white"
                  >
                    <option value="Kanpur">Kanpur (Registered Office: Civil Lines 208001)</option>
                    <option value="Gurugram">Gurugram (Corporate Office: JMD Megapolis)</option>
                    <option value="Siwan">Siwan (Open Now ALC)</option>
                    <option value="Saharanpur">Saharanpur (Open Now ALC)</option>
                    <option value="Budaun">Budaun (Open Now ALC)</option>
                    <option value="Rudrapur">Rudrapur (Open Now ALC)</option>
                    <option value="Bharatpur">Bharatpur (Open Now ALC)</option>
                    <option value="Dineshpur">Dineshpur (Open Now ALC)</option>
                    <option value="Varanasi">Varanasi (Open Now ALC)</option>
                    <option value="Farrukhabad">Farrukhabad (Coming Soon)</option>
                    <option value="Gorakhpur">Gorakhpur (Coming Soon)</option>
                    <option value="Bareilly">Bareilly (Coming Soon)</option>
                    <option value="Unnao">Unnao (Coming Soon)</option>
                    <option value="Other City (PAN India)">Other City (PAN India Online/Hybrid)</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-2 pt-0.5">
                <a
                  href={courseWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onClose}
                  className="w-full sm:grow py-2.5 px-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>WhatsApp: {OFFICIAL_COURSE_WHATSAPP}</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-1" />
                </a>

                <a
                  href={`tel:${OFFICIAL_CONTACT_PHONE_RAW}`}
                  className="w-full sm:w-auto py-2.5 px-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
                  title={`Call Admissions Helpline: ${OFFICIAL_CONTACT_PHONE}`}
                >
                  <Phone className="w-3.5 h-3.5 text-slate-950" />
                  <span>Call {OFFICIAL_CONTACT_PHONE}</span>
                </a>
              </div>

              <div className="flex items-center gap-1.5 text-[11px] text-slate-500 justify-center">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Immediate reply during counseling hours (8 AM - 8 PM)</span>
              </div>
            </div>
          ) : (
            /* ALC Leads WhatsApp Section */
            <div className="space-y-3">
              <div className="bg-blue-50/80 border border-blue-200 rounded-xl p-3 flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#003399] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-[#003399] uppercase tracking-wider block">
                    Official ALC Franchise Channel
                  </span>
                  <div className="text-base font-black text-slate-900 tracking-tight">
                    {OFFICIAL_ALC_WHATSAPP}
                  </div>
                  <p className="text-[11px] text-slate-600">
                    For opening a BankPlus Authorized Learning Centre in your city. ALCs are solicited for PAN India.
                  </p>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2 text-slate-700">
                <div className="flex items-center justify-between pb-1.5 border-b border-slate-200 text-[11px]">
                  <span className="font-bold text-slate-500 uppercase">Commercial Model:</span>
                  <span className="font-black text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                    Sign Up: {ALC_SIGN_UP_FEE} • Royalty: {ALC_ROYALTY_FEE}
                  </span>
                </div>
                <div className="font-bold text-slate-900 flex items-center gap-1.5 text-[11px]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#003399]" />
                  <span>Authorized Learning Centre (ALC) Highlights:</span>
                </div>
                <ul className="space-y-1 text-slate-600 list-disc list-inside text-[11px]">
                  <li><strong>Branding:</strong> &ldquo;Your Institute in association with BankPlus&rdquo;</li>
                  <li><strong>Marketing & Tech:</strong> Social/Web visibility + student App logins</li>
                  <li><strong>Academics & Placements:</strong> Study Material + State Placement Channels</li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-2 pt-0.5">
                <a
                  href={alcWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onClose}
                  className="w-full sm:grow py-2.5 px-3.5 rounded-xl bg-[#003399] hover:bg-[#002673] text-white font-black text-xs shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>ALC WhatsApp: {OFFICIAL_ALC_WHATSAPP}</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-1" />
                </a>

                <a
                  href={`tel:${OFFICIAL_CONTACT_PHONE_RAW}`}
                  className="w-full sm:w-auto py-2.5 px-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
                  title={`Call ALC Helpline: ${OFFICIAL_CONTACT_PHONE}`}
                >
                  <Phone className="w-3.5 h-3.5 text-slate-950" />
                  <span>Call {OFFICIAL_CONTACT_PHONE}</span>
                </a>
              </div>

              <div className="text-center text-[10px] text-slate-500">
                Corporate Office: {CORPORATE_OFFICE}
              </div>
            </div>
          )}
        </div>

        {/* Pinned Bottom bar */}
        <div className="shrink-0 px-4 py-2 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-[10px] text-slate-400">
          <span className="truncate pr-2">Registered: {REGISTERED_OFFICE}</span>
          <button
            onClick={onClose}
            className="text-slate-600 hover:text-slate-900 font-bold shrink-0 cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
