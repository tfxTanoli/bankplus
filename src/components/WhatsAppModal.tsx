import React, { useState, useEffect } from 'react';
import { X, MessageCircle, CheckCircle2, Copy, Check, Bell, ExternalLink, Shield, PhoneCall, GraduationCap, Building2, Smartphone } from 'lucide-react';
import { 
  WHATSAPP_CHANNELS, 
  OFFICIAL_COURSE_WHATSAPP, 
  OFFICIAL_COURSE_WHATSAPP_RAW,
  OFFICIAL_ALC_WHATSAPP, 
  OFFICIAL_ALC_WHATSAPP_RAW,
  OFFICIAL_CONTACT_PHONE,
  OFFICIAL_CONTACT_PHONE_RAW,
  PLAY_STORE_APP_NAME,
} from '../data/mockData';
import { GooglePlayBadge } from './GooglePlayBadge';

interface WhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialStateId?: string;
  initialTab?: 'channels' | 'direct';
}

export const WhatsAppModal: React.FC<WhatsAppModalProps> = ({
  isOpen,
  onClose,
  initialStateId = 'up',
  initialTab = 'channels',
}) => {
  const [activeTab, setActiveTab] = useState<'channels' | 'direct'>(initialTab);
  const [selectedChannelId, setSelectedChannelId] = useState(initialStateId);
  const [copied, setCopied] = useState(false);
  const [joinedSuccess, setJoinedSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setSelectedChannelId(initialStateId);
      setActiveTab(initialTab);
      setJoinedSuccess(false);
    }
  }, [isOpen, initialStateId, initialTab]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentChannel = WHATSAPP_CHANNELS.find(c => c.id === selectedChannelId) || WHATSAPP_CHANNELS[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentChannel.channelUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleJoin = () => {
    setJoinedSuccess(true);
    setTimeout(() => {
      window.open(currentChannel.channelUrl, '_blank');
    }, 500);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Compact Header */}
        <div className="bg-[#128C7E] px-4 py-3 sm:px-5 sm:py-3.5 text-white relative shrink-0">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-white/80 hover:text-white p-1 rounded-full hover:bg-white/15 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2.5 pr-8">
            <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center shadow-sm shrink-0">
              <MessageCircle className="w-5 h-5 fill-[#25D366] text-[#25D366]" />
            </div>
            <div className="min-w-0">
              <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-800/80 text-emerald-100 text-[10px] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-ping"></span>
                <span>Official Helpdesks</span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-white leading-tight truncate">
                BankPlus Official WhatsApp Channels
              </h3>
            </div>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex items-center gap-1.5 mt-2.5 pt-2 border-t border-emerald-600/50 text-xs">
            <button
              onClick={() => setActiveTab('channels')}
              className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                activeTab === 'channels'
                  ? 'bg-white text-emerald-950 shadow-xs'
                  : 'bg-emerald-800/60 text-emerald-100 hover:bg-emerald-800'
              }`}
            >
              State Job Alerts Broadcasts
            </button>
            <button
              onClick={() => setActiveTab('direct')}
              className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                activeTab === 'direct'
                  ? 'bg-white text-emerald-950 shadow-xs'
                  : 'bg-emerald-800/60 text-emerald-100 hover:bg-emerald-800'
              }`}
            >
              Direct Helpdesks & Calling
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="p-4 sm:p-5 space-y-3.5 overflow-y-auto grow">
          {activeTab === 'channels' ? (
            <>
              {/* State selection pills */}
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Select State Broadcast Channel:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                  {WHATSAPP_CHANNELS.map((ch) => {
                    const isSelected = ch.id === selectedChannelId;
                    return (
                      <button
                        key={ch.id}
                        onClick={() => {
                          setSelectedChannelId(ch.id);
                          setJoinedSuccess(false);
                        }}
                        className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold text-left transition-all cursor-pointer border ${
                          isSelected
                            ? 'bg-emerald-50 border-emerald-600 text-emerald-900 ring-2 ring-emerald-500/20 shadow-xs'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <div className="truncate font-bold text-xs">{ch.state}</div>
                        <div className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                          <span>Active Alerts</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Active Channel Card */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2.5">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[11px] font-extrabold text-[#003399] uppercase tracking-wide">
                      BankPlus {currentChannel.state} Community
                    </span>
                    <h4 className="text-sm sm:text-base font-bold text-slate-900 mt-0.5 leading-snug">
                      Direct Daily Job & Admit Card Drops
                    </h4>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center gap-1 shrink-0">
                    <Bell className="w-3 h-3 text-emerald-700" />
                    <span>Daily Broadcasts</span>
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {currentChannel.description} Covers: <strong className="text-slate-800">{currentChannel.cityFocus}</strong>.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px] text-slate-600 pt-1 border-t border-slate-200/60">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Instant Exam Notification PDFs</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Verified Bank Walk-In Venues</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Salary & Eligibility Breakdown</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>No Spam (Admin broadcast only)</span>
                  </div>
                </div>
              </div>

              {/* Action CTAs */}
              <div className="space-y-2 pt-0.5">
                <button
                  onClick={handleJoin}
                  className="w-full py-2.5 sm:py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-slate-950 font-black text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 fill-slate-950 text-slate-950" />
                  <span>
                    {joinedSuccess ? 'Opening WhatsApp Channel...' : `Join ${currentChannel.state} WhatsApp Channel`}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 ml-1" />
                </button>

                <div className="flex items-center justify-between gap-2">
                  <button
                    onClick={handleCopy}
                    className="text-xs text-slate-600 hover:text-slate-900 flex items-center gap-1.5 py-1 px-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Link Copied!' : 'Copy Invite Link'}</span>
                  </button>

                  <span className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Shield className="w-3 h-3 text-emerald-600" /> 100% Free & Verified
                  </span>
                </div>
              </div>
            </>
          ) : (
            <div className="space-y-3">
              <p className="text-xs text-slate-600 leading-relaxed">
                Connect instantly with our verified academic counseling team or national franchise division.
              </p>

              {/* Official Phone Helpline Channel */}
              <div className="p-3.5 rounded-xl bg-amber-50/90 border border-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1">
                    <PhoneCall className="w-3 h-3 text-amber-800" /> Official Phone Helpline (Voice Call)
                  </span>
                  <div className="text-base font-black text-slate-900">{OFFICIAL_CONTACT_PHONE}</div>
                  <p className="text-[11px] text-slate-600">Immediate telephone support for counseling & admissions</p>
                </div>
                <a
                  href={`tel:${OFFICIAL_CONTACT_PHONE_RAW}`}
                  className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-xs flex items-center gap-1.5 shrink-0 transition-transform hover:scale-105 cursor-pointer"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-slate-950" />
                  <span>Call Now</span>
                </a>
              </div>

              {/* Admissions WhatsApp Channel */}
              <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold text-[#003399] uppercase tracking-wider flex items-center gap-1">
                    <GraduationCap className="w-3 h-3" /> Admissions WhatsApp
                  </span>
                  <div className="text-base font-black text-slate-900">{OFFICIAL_COURSE_WHATSAPP}</div>
                  <p className="text-[11px] text-slate-500">For banking programs, batch timings, and syllabus counseling</p>
                </div>
                <a
                  href={`https://wa.me/${OFFICIAL_COURSE_WHATSAPP_RAW}?text=Hi%20BankPlus%2C%20I%20need%20information%20about%20your%20courses.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs shadow-xs flex items-center gap-1.5 shrink-0 transition-transform hover:scale-105"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-white" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>

              {/* ALC Leads Channel */}
              <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1">
                    <Building2 className="w-3 h-3" /> ALC Franchise & Partner Leads
                  </span>
                  <div className="text-base font-black text-slate-900">{OFFICIAL_ALC_WHATSAPP}</div>
                  <p className="text-[11px] text-slate-500">For starting an authorized learning centre across PAN India</p>
                </div>
                <a
                  href={`https://wa.me/${OFFICIAL_ALC_WHATSAPP_RAW}?text=Hi%20BankPlus%2C%20I%20am%20interested%20in%20an%20ALC%20Franchise%20partnership.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs shadow-xs flex items-center gap-1.5 shrink-0 transition-transform hover:scale-105"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-white" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Compact Pinned Footer */}
        <div className="shrink-0 px-4 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
              <Smartphone className="w-3.5 h-3.5 text-emerald-700" />
            </div>
            <div className="truncate">
              <span className="font-bold text-slate-800 block text-[11px] truncate">{PLAY_STORE_APP_NAME}</span>
              <span className="text-[10px] text-slate-500 block truncate">Practice mock exams & tests on Android</span>
            </div>
          </div>
          <GooglePlayBadge size="sm" id="whatsapp-modal-playstore-badge" />
        </div>
      </div>
    </div>
  );
};

