import React, { useState, useEffect } from 'react';
import { 
  CENTRES,
  OFFICIAL_COURSE_WHATSAPP,
  OFFICIAL_COURSE_WHATSAPP_RAW,
  OFFICIAL_ALC_WHATSAPP,
  OFFICIAL_ALC_WHATSAPP_RAW,
  OFFICIAL_CONTACT_PHONE,
  OFFICIAL_CONTACT_PHONE_RAW,
  REGISTERED_OFFICE,
  CORPORATE_OFFICE,
  ALC_OPEN_NOW_LIST,
  ALC_COMING_SOON_LIST,
  STUDENT_COMMUNITY_GALLERY,
  OFFICIAL_FACEBOOK,
  OFFICIAL_FACEBOOK_HANDLE
} from '../data/mockData';
import {
  getMergedCampusLifeList,
  getCampusLifeSectionText,
  CAMPUS_LIFE_UPDATED_EVENT,
  CustomCampusLifeItem,
  CampusLifeSectionText
} from '../utils/campusLifeSectionStorage';
import { IndiaCampusMap } from '../components/IndiaCampusMap';
import { 
  MapPin, 
  Phone, 
  Building2, 
  Navigation, 
  Sparkles, 
  MessageCircle,
  Briefcase,
  Facebook,
  ExternalLink,
  GraduationCap,
  Mail
} from 'lucide-react';

interface CentresViewProps {
  onOpenEnquiry: (cityName?: string) => void;
}

export const CentresView: React.FC<CentresViewProps> = () => {
  const [selectedCity, setSelectedCity] = useState<string>('Kanpur');
  const [campusLifeList, setCampusLifeList] = useState<CustomCampusLifeItem[]>(getMergedCampusLifeList());
  const [campusLifeText, setCampusLifeText] = useState<CampusLifeSectionText>(getCampusLifeSectionText());

  useEffect(() => {
    setCampusLifeList(getMergedCampusLifeList());
    setCampusLifeText(getCampusLifeSectionText());

    const handleUpdate = () => {
      setCampusLifeList(getMergedCampusLifeList());
      setCampusLifeText(getCampusLifeSectionText());
    };

    window.addEventListener(CAMPUS_LIFE_UPDATED_EVENT, handleUpdate);
    return () => {
      window.removeEventListener(CAMPUS_LIFE_UPDATED_EVENT, handleUpdate);
    };
  }, []);

  const cityList = Array.from(new Set(CENTRES.map(c => c.city)));
  const currentCentres = CENTRES.filter(c => c.city === selectedCity);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-16">
      {/* 1. Header Banner */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#003399] text-xs font-bold border border-blue-200">
          <MapPin className="w-4 h-4 text-[#003399]" />
          <span>PAN India Network • {ALC_OPEN_NOW_LIST.length} Active ALCs • {ALC_COMING_SOON_LIST.length} Coming Soon</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#001f5c] tracking-tight">
          BankPlus Offices & Learning Centres
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Visit our registered office in Kanpur, corporate headquarters in Gurugram, our 7 active Authorized Learning Centres (ALCs), or explore upcoming centres opening soon.
        </p>

        {/* City Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
          {cityList.map(city => {
            const isSelected = selectedCity === city;
            const isHQ = city === 'Kanpur';
            const isCorp = city === 'Gurugram';
            const isComingSoon = ALC_COMING_SOON_LIST.includes(city);

            return (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-[#001f5c] text-white shadow-md'
                    : isComingSoon
                    ? 'bg-amber-50 text-amber-900 border border-amber-300 hover:bg-amber-100'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                <span>{city}</span>
                {isHQ && <span className="text-[10px] opacity-80">(Regd Office)</span>}
                {isCorp && <span className="text-[10px] opacity-80">(Corp Office)</span>}
                {isComingSoon && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isSelected ? 'bg-amber-400 text-slate-950' : 'bg-amber-200 text-amber-900'
                  }`}>
                    Coming Soon
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 1.5 Registered and Corporate Offices */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 card-shadow flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#003399] flex items-center justify-center shrink-0">
            <Building2 className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-[#003399] uppercase tracking-wider block">
              Registered Office
            </span>
            <h4 className="text-base font-bold text-slate-900">{REGISTERED_OFFICE}</h4>
            <p className="text-xs text-slate-500">Central Academic Administration & Candidate Verification</p>
            <div className="pt-1 flex items-center gap-2 text-xs">
              <span className="text-slate-500">Admissions WhatsApp:</span>
              <a 
                href={`https://wa.me/${OFFICIAL_COURSE_WHATSAPP_RAW}?text=Hi%20BankPlus%2C%20I%20want%20to%20know%20about%20admissions.`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-[#003399] hover:text-blue-700 transition-colors"
              >
                {OFFICIAL_COURSE_WHATSAPP}
              </a>
            </div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 card-shadow flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
            <Briefcase className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider block">
              Corporate Office
            </span>
            <h4 className="text-base font-bold text-slate-900">{CORPORATE_OFFICE}</h4>
            <p className="text-xs text-slate-500">Corporate Strategy, Banking Alliances & ALC Expansion</p>
            <div className="pt-1 flex items-center gap-2 text-xs">
              <span className="text-slate-500">ALC Franchise Helpline:</span>
              <a 
                href={`https://wa.me/${OFFICIAL_ALC_WHATSAPP_RAW}?text=Hi%20BankPlus%2C%20I%20want%20to%20inquire%20about%20ALC%20franchise.`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-emerald-700 hover:text-emerald-800 transition-colors"
              >
                {OFFICIAL_ALC_WHATSAPP}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Interactive Map & Location Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Interactive India Campus Map */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-black text-[#001f5c] flex items-center gap-2">
              <Navigation className="w-4 h-4 text-[#003399]" />
              <span>Campus Map View (India Network)</span>
            </h3>
            <span className="text-xs text-emerald-700 font-bold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
              7 Active • 3 Coming Soon
            </span>
          </div>

          <IndiaCampusMap 
            selectedCity={selectedCity}
            onSelectCity={setSelectedCity}
          />

          {/* Quick Filter Chips */}
          <div className="bg-white rounded-2xl p-5 card-shadow border border-slate-200 space-y-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-emerald-900 text-xs flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
                  <span>7 ALCs Open Now (Walk-ins & Classes Active):</span>
                </span>
                <span className="text-[10px] text-slate-500 font-medium">Click to focus</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {ALC_OPEN_NOW_LIST.map((loc, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedCity(loc)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold border cursor-pointer transition-all ${
                      selectedCity === loc 
                        ? 'bg-[#001f5c] text-white border-[#001f5c] shadow-sm scale-105'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-emerald-50 hover:border-emerald-300'
                    }`}
                  >
                    {loc}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-amber-900 text-xs flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500 inline-block"></span>
                  <span>{ALC_COMING_SOON_LIST.length} ALCs Coming Soon:</span>
                </span>
                <span className="text-[10px] text-amber-800 font-medium">Admissions Opening</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {ALC_COMING_SOON_LIST.map((loc, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedCity(loc)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold border cursor-pointer transition-all ${
                      selectedCity === loc 
                        ? 'bg-amber-600 text-white border-amber-600 shadow-sm scale-105'
                        : 'bg-amber-50/50 text-amber-900 border-amber-200 hover:bg-amber-100/70'
                    }`}
                  >
                    {loc} (Coming Soon)
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center gap-2 text-xs">
              <span className="text-slate-500 font-medium">Central Offices:</span>
              <button
                onClick={() => setSelectedCity('Kanpur')}
                className={`px-2 py-0.5 rounded text-[11px] font-bold border cursor-pointer transition-colors ${
                  selectedCity === 'Kanpur'
                    ? 'bg-amber-500 text-slate-950 border-amber-600'
                    : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                }`}
              >
                Kanpur (Regd. HQ)
              </button>
              <button
                onClick={() => setSelectedCity('Gurugram')}
                className={`px-2 py-0.5 rounded text-[11px] font-bold border cursor-pointer transition-colors ${
                  selectedCity === 'Gurugram'
                    ? 'bg-sky-500 text-slate-950 border-sky-600'
                    : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                }`}
              >
                Gurugram (Corp. Office)
              </button>
            </div>
          </div>
        </div>

        {/* Right: Centre Details for Selected City */}
        <div className="lg:col-span-6 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-black text-slate-900">
              Location: {selectedCity}
            </h3>
            {(selectedCity === 'Kanpur' || selectedCity === 'Gurugram') && (
              <a
                href={`https://wa.me/${OFFICIAL_COURSE_WHATSAPP_RAW}?text=Hi%20BankPlus%2C%20I%20want%20to%20connect%20with%20the%20${encodeURIComponent(selectedCity)}%20office.`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors flex items-center gap-1"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Central Helpline →</span>
              </a>
            )}
          </div>

          <div className="space-y-6">
            {currentCentres.map((centre) => {
              const isHQ = centre.isHQ;
              const isCorp = centre.id === 'gurugram-co';
              const isComingSoon = centre.isComingSoon;
              const contactPhone = isHQ ? OFFICIAL_COURSE_WHATSAPP : OFFICIAL_ALC_WHATSAPP;
              const contactRaw = isHQ ? OFFICIAL_COURSE_WHATSAPP_RAW : OFFICIAL_ALC_WHATSAPP_RAW;

              return (
                <div 
                  key={centre.id}
                  className="bg-white rounded-2xl overflow-hidden card-shadow border border-slate-200 hover:border-[#003399] transition-all"
                >
                  {/* Clean Executive Header (Photo Removed) */}
                  <div className={`p-5 sm:p-6 border-b transition-colors ${
                    isComingSoon
                      ? 'bg-gradient-to-r from-amber-500/15 via-amber-50 to-orange-50/70 border-amber-200'
                      : isHQ
                      ? 'bg-gradient-to-r from-slate-950 via-[#001f5c] to-blue-950 text-white border-blue-900'
                      : isCorp
                      ? 'bg-gradient-to-r from-slate-900 via-slate-800 to-blue-950 text-white border-slate-800'
                      : 'bg-gradient-to-r from-[#001f5c] via-[#003399] to-blue-900 text-white border-blue-900'
                  }`}>
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black shadow-sm ${
                        isComingSoon
                          ? 'bg-amber-400 text-slate-950'
                          : isHQ
                          ? 'bg-amber-400 text-slate-950'
                          : isCorp
                          ? 'bg-sky-300 text-slate-950'
                          : 'bg-emerald-400 text-slate-950'
                      }`}>
                        {isHQ 
                          ? '★ REGISTERED ACADEMIC HEADQUARTERS' 
                          : isCorp 
                          ? '★ NATIONAL CORPORATE OFFICE' 
                          : isComingSoon 
                          ? '⏳ COMING SOON ALC' 
                          : '✓ OPEN NOW ALC'}
                      </span>

                      <span className={`text-[11px] font-mono font-bold ${
                        isComingSoon ? 'text-amber-800' : 'text-blue-200'
                      }`}>
                        {isComingSoon ? 'Admissions Opening Soon' : 'Classrooms & Walk-ins Active'}
                      </span>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${
                        isComingSoon
                          ? 'bg-amber-100 text-amber-900 border border-amber-300'
                          : 'bg-white/10 backdrop-blur-sm border border-white/20 text-white'
                      }`}>
                        <Building2 className="w-6 h-6" />
                      </div>
                      <div className="space-y-1">
                        <h4 className={`text-xl sm:text-2xl font-black tracking-tight leading-tight ${
                          isComingSoon ? 'text-slate-900' : 'text-white'
                        }`}>
                          {centre.branchName}
                        </h4>
                        <div className={`flex flex-wrap items-center gap-2 text-xs font-medium ${
                          isComingSoon ? 'text-slate-600' : 'text-blue-100'
                        }`}>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 shrink-0 opacity-80" />
                            <span>{centre.city}, {centre.state}</span>
                          </span>
                          <span className="opacity-40">•</span>
                          <span className="font-mono text-[11px]">Centre ID: {centre.id.toUpperCase()}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Clean details (Full Address + Contact + Email) */}
                  <div className="p-6 space-y-4 text-xs sm:text-sm">
                    <div className="space-y-3 text-slate-700">
                      {/* Full Address Highlight */}
                      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
                        <MapPin className="w-4 h-4 text-[#003399] shrink-0 mt-0.5" />
                        <div className="space-y-0.5 grow">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                              {isComingSoon ? 'Centre Status' : 'Official Full Address'}
                            </span>
                            {isComingSoon ? (
                              <span className="text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300 px-2 py-0.5 rounded-full">
                                Coming Soon
                              </span>
                            ) : (
                              <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 px-2 py-0.5 rounded-full">
                                Verified Address
                              </span>
                            )}
                          </div>
                          {isComingSoon ? (
                            <div>
                              <p className="font-bold text-amber-900 text-sm">
                                Coming Soon
                              </p>
                              <p className="text-xs text-slate-600 mt-0.5">
                                Facility and admissions schedule for {centre.city} ALC will be published shortly. Connect on WhatsApp to get notified.
                              </p>
                            </div>
                          ) : (
                            <div>
                              <p className="font-bold text-slate-900 text-sm leading-snug">
                                {centre.fullAddress}
                              </p>
                              <p className="text-xs text-slate-500 mt-0.5">
                                {centre.city}, {centre.state}
                                {isHQ && ' (Registered Academic Headquarters)'}
                                {isCorp && ' (National Corporate Office)'}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Official Contact and Email only for Registered HQ / Corporate Office (Removed from all ALC cards) */}
                      {(isHQ || isCorp) && (
                        <div className="space-y-2.5 pt-1 border-t border-slate-100">
                          <div className="flex items-center gap-2.5">
                            <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span>
                              <strong>Central Office Contact: </strong>
                              <a href={`tel:${OFFICIAL_CONTACT_PHONE_RAW}`} className="font-bold text-[#001f5c] hover:text-[#003399] transition-colors">
                                {OFFICIAL_CONTACT_PHONE}
                              </a>
                            </span>
                          </div>

                          {centre.email && (
                            <div className="flex items-center gap-2.5">
                              <Mail className="w-4 h-4 text-[#003399] shrink-0" />
                              <span>
                                <strong>Official Office Email: </strong>
                                <a href={`mailto:${centre.email}`} className="font-bold text-[#001f5c] hover:text-[#003399] transition-colors">
                                  {centre.email}
                                </a>
                              </span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {(isHQ || isCorp) && (
                      <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-3">
                        <a
                          href={`https://wa.me/${contactRaw}?text=${encodeURIComponent(`Hi BankPlus, I am connecting with the central office.`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full sm:w-auto grow py-3 px-5 rounded-xl font-black text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5 text-white bg-emerald-600 hover:bg-emerald-500"
                        >
                          <MessageCircle className="w-3.5 h-3.5 fill-white" />
                          <span>WhatsApp: {contactPhone}</span>
                        </a>

                        <a
                          href={`tel:${OFFICIAL_CONTACT_PHONE_RAW}`}
                          className="w-full sm:w-auto py-3 px-4 rounded-xl border border-slate-300 hover:border-slate-400 hover:bg-slate-50 text-slate-800 font-bold text-xs transition-colors text-center cursor-pointer flex items-center justify-center gap-1.5"
                        >
                          <Phone className="w-3.5 h-3.5 text-amber-600" />
                          <span>Call {OFFICIAL_CONTACT_PHONE}</span>
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. Student Friendly Learning Atmosphere Section */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#003399] text-xs font-bold border border-blue-200 mb-1">
              <GraduationCap className="w-3.5 h-3.5 text-[#003399]" />
              <span>{campusLifeText.eyebrow}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#001f5c]">
              {campusLifeText.heading}
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm">
              {campusLifeText.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap shrink-0">
            <a
              href={OFFICIAL_FACEBOOK}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold flex items-center gap-1.5 border border-blue-200 transition-colors"
            >
              <Facebook className="w-4 h-4" />
              <span>{OFFICIAL_FACEBOOK_HANDLE}</span>
              <ExternalLink className="w-3 h-3 ml-0.5" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {campusLifeList.slice(0, 3).map((item) => (
            <div 
              key={item.id}
              className="bg-white rounded-2xl overflow-hidden card-shadow border border-slate-200 group hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div className="relative h-48 overflow-hidden bg-slate-100 group">
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

      {/* 4. PAN India Solicitation Banner */}
      <div className="bg-gradient-to-r from-[#001f5c] via-[#003399] to-[#004bbb] rounded-3xl p-8 sm:p-10 text-white shadow-xl">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Authorized Learning Centres (ALCs) Solicited For PAN India</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-white">
            Want to Launch an ALC Centre in Your City?
          </h3>
          <p className="text-blue-100 text-xs sm:text-sm leading-relaxed">
            BankPlus invites educational institutes and edupreneurs across India. Turnkey curriculum, bank recruitment partnerships, and LMS software provided.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href={`https://wa.me/${OFFICIAL_ALC_WHATSAPP_RAW}?text=Hi%20BankPlus%2C%20I%20am%20interested%20in%20an%20ALC%20Franchise%20partnership.`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-slate-950" />
              <span>ALC Franchise Enquiry: {OFFICIAL_ALC_WHATSAPP}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
