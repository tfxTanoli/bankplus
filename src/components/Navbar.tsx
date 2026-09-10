import React, { useState } from 'react';
import { PageTab } from '../types';
import { BankPlusLogo } from './BankPlusLogo';
import { GooglePlayBadge } from './GooglePlayBadge';
import { 
  Phone, 
  MessageCircle, 
  GraduationCap, 
  Briefcase, 
  MapPin, 
  Award, 
  Handshake, 
  Menu, 
  X, 
  ChevronRight,
  ShieldCheck,
  Sparkles,
  Building2,
  Smartphone,
  CheckCircle2,
  ExternalLink,
  CreditCard,
  Mail
} from 'lucide-react';
import { 
  OFFICIAL_COURSE_WHATSAPP, 
  OFFICIAL_COURSE_WHATSAPP_RAW,
  OFFICIAL_CONTACT_PHONE,
  OFFICIAL_CONTACT_PHONE_RAW,
  OFFICIAL_EMAIL,
  OFFICIAL_ALC_WHATSAPP, 
  OFFICIAL_ALC_WHATSAPP_RAW,
  SELECTION_GUARANTEE_STATEMENT,
  PLAY_STORE_APP_NAME,
  PLAY_STORE_URL
} from '../data/mockData';

interface NavbarProps {
  activeTab: PageTab;
  setActiveTab: (tab: PageTab) => void;
  onOpenEnquiry: () => void;
  onOpenWhatsApp: (stateId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenEnquiry,
  onOpenWhatsApp,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isPartner = activeTab === 'partner';
  const displayPhone = isPartner ? OFFICIAL_ALC_WHATSAPP : OFFICIAL_CONTACT_PHONE;
  const displayPhoneRaw = isPartner ? OFFICIAL_ALC_WHATSAPP_RAW : OFFICIAL_CONTACT_PHONE_RAW;
  const displayPhoneTitle = isPartner ? 'ALC Franchise Helpline' : 'BankPlus Contact Number';
  const displayWA = isPartner ? OFFICIAL_ALC_WHATSAPP : OFFICIAL_COURSE_WHATSAPP;
  const displayWARaw = isPartner ? OFFICIAL_ALC_WHATSAPP_RAW : OFFICIAL_COURSE_WHATSAPP_RAW;
  const displayWAText = isPartner 
    ? 'Hi%20BankPlus%2C%20I%20am%20interested%20in%20an%20ALC%20Franchise%20partnership%20in%20my%20city.' 
    : 'Hi%20BankPlus%2C%20I%20want%20to%20apply%20for%20banking%20courses.';
  const displayWALabel = isPartner ? 'ALC Franchise WA' : 'Admissions WhatsApp';

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'programs', label: 'Flagship Programs', highlight: 'Guaranteed' },
    { id: 'jobs', label: 'Banking Jobs & Channels', badge: 'Live Openings' },
    { id: 'stories', label: 'Success Stories', badge: '3,000+' },
    { id: 'centres', label: 'Centres & Labs', badge: '10 Open' },
    { id: 'partner', label: 'ALC Partner (Franchise)', special: 'PAN India' },
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId as PageTab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Centered Selection Guarantee Top Announcement Bar */}
      <div className="bg-amber-400 text-slate-950 text-[11px] sm:text-xs font-black py-1.5 px-3 sm:px-4 text-center border-b border-amber-500/20 shadow-2xs">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-1.5 text-center leading-snug">
          <span className="text-slate-950 font-black">★</span>
          <span>{SELECTION_GUARANTEE_STATEMENT}</span>
        </div>
      </div>

      {/* Top Utility Bar */}
      <div className="bg-[#001f5c] text-white text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="hidden md:flex items-center gap-2 text-slate-300">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/25 text-emerald-300 border border-emerald-400/40 text-[10px] sm:text-xs font-black">
              <CreditCard className="w-3 h-3 text-emerald-300" />
              <span>Pay as low as ₹2,500/month</span>
            </span>
          </div>
          
          <div className="flex items-center justify-center sm:justify-end gap-3 w-full sm:w-auto text-xs sm:ml-auto">
            <a
              href={`tel:${displayPhoneRaw}`}
              className="flex items-center gap-1 text-amber-300 hover:text-white transition-colors cursor-pointer font-bold"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>Call: {displayPhone}</span>
            </a>
            <span className="text-slate-500">|</span>
            <a
              href={`https://wa.me/${displayWARaw}?text=${displayWAText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-emerald-300 hover:text-white transition-colors cursor-pointer font-semibold"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-emerald-500 text-emerald-500" />
              <span>WhatsApp: {displayWA}</span>
            </a>
            <span className="hidden sm:inline-block text-slate-500">|</span>
            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1 text-sky-300 hover:text-white transition-colors font-bold"
              title="Download BankPlus Learning Portal App on Google Play Store"
            >
              <Smartphone className="w-3.5 h-3.5 text-sky-300" />
              <span>Play Store App</span>
              <ExternalLink className="w-2.5 h-2.5 opacity-75" />
            </a>
            <span className="text-slate-500">|</span>
            <button
              onClick={() => handleNavClick('partner')}
              className="text-[#ffcc00] hover:text-amber-300 transition-colors font-bold cursor-pointer"
            >
              ALC Franchise
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center cursor-pointer group py-2"
            title="BankPlus Learning Home"
          >
            <BankPlusLogo variant="light" size="md" />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-150 cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'text-[#003399] font-bold bg-blue-50/80 shadow-xs'
                      : 'text-slate-700 hover:text-[#003399] hover:bg-slate-100/70'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200">
                      {item.badge}
                    </span>
                  )}
                  {item.special && (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-blue-100 text-[#003399] border border-blue-200">
                      {item.special}
                    </span>
                  )}
                  {item.highlight && (
                    <span className="text-[9px] font-extrabold px-1.5 py-0.2 rounded bg-[#003399] text-[#ffcc00]">
                      {item.highlight}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#003399] rounded-full"></span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Header Action Buttons */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Contact Number Call Button */}
            <a
              href={`tel:${displayPhoneRaw}`}
              id="navbar-contact-number"
              className="px-3.5 py-2 rounded-lg border border-slate-200 hover:border-[#003399] bg-slate-50 hover:bg-blue-50/70 text-slate-800 font-bold text-xs flex items-center gap-2 transition-all shadow-2xs cursor-pointer group"
              title={`Call ${displayPhoneTitle}: ${displayPhone}`}
            >
              <div className="w-7 h-7 rounded-full bg-[#003399] text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Phone className="w-3.5 h-3.5 text-amber-300" />
              </div>
              <div className="text-left">
                <span className="text-[10px] text-slate-500 font-semibold block leading-none">{isPartner ? 'ALC Helpline' : 'Contact No.'}</span>
                <span className="text-xs font-black text-slate-900 group-hover:text-[#003399] tracking-tight leading-normal">
                  {displayPhone}
                </span>
              </div>
            </a>

            {/* BankPlus Learning Portal App Play Store Badge */}
            <GooglePlayBadge size="sm" className="hidden xl:inline-flex" id="navbar-desktop-playstore-badge" />

            {isPartner ? (
              <a
                href={`https://wa.me/${displayWARaw}?text=${displayWAText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-1.5 cursor-pointer transform hover:-translate-y-0.5"
              >
                <MessageCircle className="w-4 h-4 fill-white text-white" />
                <span>ALC Franchise WA</span>
              </a>
            ) : (
              <button
                onClick={onOpenEnquiry}
                className="px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-1.5 cursor-pointer transform hover:-translate-y-0.5"
              >
                <MessageCircle className="w-4 h-4 fill-white text-white" />
                <span>Admissions WhatsApp</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Trigger */}
          <div className="lg:hidden flex items-center gap-1.5">
            <a
              href={`tel:${displayPhoneRaw}`}
              id="mobile-nav-call-pill"
              className="px-2.5 py-1.5 rounded-md bg-amber-50 border border-amber-300 text-amber-900 font-black text-xs shadow-2xs flex items-center gap-1"
              title={`Call ${displayPhoneTitle}: ${displayPhone}`}
            >
              <Phone className="w-3.5 h-3.5 text-amber-700" />
              <span>{displayPhone}</span>
            </a>
            {isPartner ? (
              <a
                href={`https://wa.me/${displayWARaw}?text=${displayWAText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1.5 rounded-md bg-emerald-600 text-white font-bold text-xs shadow-xs flex items-center gap-1"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span className="hidden xs:inline">ALC Desk</span>
              </a>
            ) : (
              <button
                onClick={onOpenEnquiry}
                className="px-2.5 py-1.5 rounded-md bg-emerald-600 text-white font-bold text-xs shadow-xs flex items-center gap-1"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span className="hidden xs:inline">Admissions</span>
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 shadow-xl px-4 pt-3 pb-6 space-y-2">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-[#003399] font-bold border-l-4 border-[#003399]'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      {item.badge}
                    </span>
                  )}
                  {item.special && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-900">
                      {item.special}
                    </span>
                  )}
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            );
          })}

          <div className="pt-4 border-t border-slate-100 space-y-2.5">
            <a
              href={`tel:${displayPhoneRaw}`}
              id="mobile-drawer-call-btn"
              className="w-full py-3 rounded-lg bg-[#001f5c] hover:bg-[#003399] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-colors"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>{isPartner ? 'ALC Helpline' : 'Contact Number'}: {displayPhone}</span>
            </a>
            <a
              href={`https://wa.me/${displayWARaw}?text=${displayWAText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-lg bg-emerald-600 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              {displayWALabel}: {displayWA}
            </a>
            <a
              href={`mailto:${OFFICIAL_EMAIL}`}
              className="w-full py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <Mail className="w-4 h-4 text-[#003399]" />
              <span>Email: {OFFICIAL_EMAIL}</span>
            </a>
            <GooglePlayBadge size="md" className="w-full justify-center py-2.5" id="navbar-mobile-playstore-badge" />
            <div className="text-center pt-2 text-xs text-slate-500">
              Registered Office: Kanpur 208001 | Corporate: Gurugram
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
