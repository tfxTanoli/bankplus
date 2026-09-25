import React, { useState, useEffect } from 'react';
import { StudentSuccessStory } from '../types';
import { 
  OFFICIAL_FACEBOOK,
  OFFICIAL_FACEBOOK_HANDLE,
  OFFICIAL_COURSE_WHATSAPP,
  OFFICIAL_COURSE_WHATSAPP_RAW
} from '../data/mockData';
import { WallOfFame } from '../components/WallOfFame';
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
  Award, 
  Play, 
  Facebook, 
  MessageCircle,
  ExternalLink,
  Users,
  CheckCircle2
} from 'lucide-react';

interface SuccessStoriesViewProps {
  onOpenStory: (story: StudentSuccessStory) => void;
  onOpenEnquiry: () => void;
}

export const SuccessStoriesView: React.FC<SuccessStoriesViewProps> = ({
  onOpenStory,
}) => {
  const [reelsText, setReelsText] = useState<ReelsSectionText>(getReelsSectionText());
  const [reelsList, setReelsList] = useState<CustomReelItem[]>(getMergedReelsList());
  const [campusLifeText, setCampusLifeText] = useState<CampusLifeSectionText>(getCampusLifeSectionText());
  const [campusLifeList, setCampusLifeList] = useState<CustomCampusLifeItem[]>(getMergedCampusLifeList());

  useEffect(() => {
    setReelsText(getReelsSectionText());
    setReelsList(getMergedReelsList());

    const handleUpdate = () => {
      setReelsText(getReelsSectionText());
      setReelsList(getMergedReelsList());
    };

    window.addEventListener(REELS_SECTION_UPDATED_EVENT, handleUpdate);
    return () => {
      window.removeEventListener(REELS_SECTION_UPDATED_EVENT, handleUpdate);
    };
  }, []);

  useEffect(() => {
    setCampusLifeText(getCampusLifeSectionText());
    setCampusLifeList(getMergedCampusLifeList());

    const handleCampusUpdate = () => {
      setCampusLifeText(getCampusLifeSectionText());
      setCampusLifeList(getMergedCampusLifeList());
    };

    window.addEventListener(CAMPUS_LIFE_UPDATED_EVENT, handleCampusUpdate);
    return () => {
      window.removeEventListener(CAMPUS_LIFE_UPDATED_EVENT, handleCampusUpdate);
    };
  }, []);
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-16">
      {/* 1. HERO HEADER SECTION */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-[#003399] text-xs font-black border border-blue-200 shadow-2xs">
          <Award className="w-4 h-4 text-[#003399]" />
          <span>3,000+ Banking Selections Since 2017</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#001f5c] tracking-tight">
          Real Students. Verified Placements.
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          From non-commerce degrees and Tier-2/3 hometowns to respectable branch officers, assistant managers, and credit underwriters across India. Explore authentic selection flyers from our official Facebook page.
        </p>

        {/* Official Facebook Share Link Callout */}
        <div className="flex justify-center pt-2">
          <a
            href={OFFICIAL_FACEBOOK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1877F2] hover:bg-[#166FE5] text-white font-black text-xs sm:text-sm shadow-md transition-all hover:scale-105"
          >
            <Facebook className="w-4 h-4 text-white" />
            <span>Follow {OFFICIAL_FACEBOOK_HANDLE} on Facebook for Daily Stories</span>
            <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
          </a>
        </div>
      </div>

      {/* 2. TOP PLACEMENT HIGHLIGHTS STATS BAR */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 card-shadow border border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-x-4 sm:gap-x-6 gap-y-6 sm:gap-y-0 text-center sm:divide-x divide-slate-100">
        <div className="space-y-1">
          <span className="text-3xl sm:text-4xl font-black text-[#001f5c] block leading-tight">3,000+</span>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wide block">Placements Verified</span>
        </div>
        <div className="space-y-1">
          <span className="text-3xl sm:text-4xl font-black text-emerald-700 block leading-tight">100+</span>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wide block">Hiring Bank Partners</span>
        </div>
        <div className="space-y-1 pt-5 border-t border-slate-100 sm:pt-0 sm:border-t-0">
          <span className="text-3xl sm:text-4xl font-black text-[#003399] block leading-tight">100%</span>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wide block">Selection Guarantee</span>
        </div>
        <div className="space-y-1 pt-5 border-t border-slate-100 sm:pt-0 sm:border-t-0">
          <span className="text-3xl sm:text-4xl font-black text-slate-900 block leading-tight">68%</span>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wide block">Non-Commerce Roots</span>
        </div>
      </div>

      {/* 100% Selection Guarantee Banner */}
      <div className="bg-gradient-to-r from-[#001f5c] via-[#003399] to-[#0ea5e9] rounded-2xl p-5 sm:p-6 text-white shadow-lg border border-blue-400/30 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-center md:text-left">
          <div className="w-12 h-12 rounded-xl bg-[#ffcc00] text-slate-950 flex items-center justify-center shrink-0 font-black shadow-md">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <div>
            <div className="text-xs font-black text-[#ffcc00] uppercase tracking-wider">
              Backed by Official Career Commitment
            </div>
            <div className="text-base sm:text-lg font-black text-white">
              100% Selection Guarantee = Unlimited Training + Unlimited Interviews till Selection
            </div>
            <p className="text-xs text-blue-100">
              Zero additional fees for batch revisions, CBT speed tests, and corporate bank interview drives until your appointment letter is issued.
            </p>
          </div>
        </div>
        <a
          href={`https://wa.me/${OFFICIAL_COURSE_WHATSAPP_RAW}?text=Hi%20BankPlus%2C%20I%20want%20to%20know%20about%20the%20100%25%20Selection%20Guarantee%20program.`}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs shadow-md transition-transform hover:scale-105 flex items-center gap-2 cursor-pointer"
        >
          <MessageCircle className="w-4 h-4 fill-slate-950" />
          <span>WhatsApp {OFFICIAL_COURSE_WHATSAPP}</span>
        </a>
      </div>

      {/* 3. VERIFIED STUDENT WALL OF FAME COMPONENT (Grid with Facebook Flyers & CTA) */}
      <WallOfFame onOpenStory={onOpenStory} />

      {/* 4. FACEBOOK REELS & VIDEO SELECTION STORIES */}
      <section className="space-y-6 pt-6 relative" id="student-reels-section">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
          <div className="grow">
            <div className="group relative">
              <div className="inline-flex items-center gap-1.5 text-xs font-black text-[#1877F2] uppercase tracking-wider mb-1">
                <Facebook className="w-4 h-4" />
                <span>{reelsText.eyebrow}</span>
              </div>
              <h2 className="text-2xl font-black text-slate-900">
                {reelsText.heading}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                {reelsText.subtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap shrink-0">
            <a
              href={reelsText.buttonLink || OFFICIAL_FACEBOOK}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shrink-0 shadow-xs"
            >
              <Facebook className="w-4 h-4 text-blue-400" />
              <span>{reelsText.buttonText}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reelsList.map((reel) => {
            return (
              <div
                key={reel.id}
                className="bg-white rounded-2xl overflow-hidden card-shadow border border-slate-200 hover:border-[#1877F2] transition-all flex flex-col justify-between relative group"
              >
                <div className="relative aspect-9/14 bg-slate-900 overflow-hidden">
                  <img 
                    src={reel.thumbnail} 
                    alt={reel.title}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      if (reel.fallbackThumbnail) {
                        e.currentTarget.src = reel.fallbackThumbnail;
                      }
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-slate-950/40 pointer-events-none"></div>

                  {/* Top Badge */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-white text-[11px] z-20">
                    <span className="bg-[#1877F2]/90 px-2 py-0.5 rounded-full font-bold flex items-center gap-1 shadow-xs">
                      <Facebook className="w-3 h-3" />
                      <span>Reel</span>
                    </span>

                    <span className="bg-slate-900/80 px-2 py-0.5 rounded-full font-mono text-[10px]">
                      {reel.duration}
                    </span>
                  </div>

                  {/* Center Play Icon */}
                  <a 
                    href={reel.facebookLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 flex items-center justify-center cursor-pointer z-10"
                  >
                    <div className="w-12 h-12 rounded-full bg-white/90 text-[#1877F2] flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-[#1877F2] group-hover:text-white transition-all">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </div>
                  </a>

                  {/* Bottom Overlay Text */}
                  <div className="absolute bottom-3 left-3 right-3 text-white space-y-1 pointer-events-none z-20">
                    <span className="text-[10px] text-emerald-400 font-bold block">
                      {reel.views} views on Facebook
                    </span>
                    <h4 className="text-xs font-black line-clamp-2 text-white">
                      {reel.title}
                    </h4>
                    <p className="text-[11px] text-blue-200">
                      {reel.studentName} • {reel.location}
                    </p>
                  </div>
                </div>

                <div className="p-3.5 bg-slate-50 border-t border-slate-100">
                  <div className="text-xs text-slate-700 italic line-clamp-2">
                    &ldquo;{reel.quote}&rdquo;
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. STUDENT COMMUNITY & CAMPUS LIFE GALLERY */}
      <section className="space-y-6 pt-6 relative" id="bankplus-campus-life-section">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
          <div className="grow">
            <div className="group relative">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#003399] text-xs font-bold border border-blue-200 mb-1.5">
                <Users className="w-3.5 h-3.5" />
                <span>{campusLifeText.eyebrow}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#001f5c]">
                {campusLifeText.heading}
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm mt-1">
                {campusLifeText.subtitle}
              </p>
            </div>
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

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {campusLifeList.map((item) => {
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl overflow-hidden card-shadow border border-slate-200 hover:border-[#003399] hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div className="relative h-52 overflow-hidden bg-slate-100 group">
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
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-slate-950/30"></div>

                  <div className="absolute top-3 left-3 z-20">
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-900/80 text-white text-[11px] font-bold backdrop-blur-xs shadow-xs">
                      {item.tag}
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-white">
                  <p className="text-xs font-bold text-slate-800 leading-snug">
                    {item.caption}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. BOTTOM MOTIVATION & WHATSAPP ADMISSIONS BANNER */}
      <div className="bg-gradient-to-r from-[#001f5c] via-[#003399] to-[#002673] rounded-3xl p-8 sm:p-12 text-white shadow-xl text-center space-y-6">
        <h3 className="text-2xl sm:text-3xl font-black text-white max-w-2xl mx-auto">
          Your Name Could Be in Our Next Selection Wall of Fame
        </h3>
        <p className="text-blue-100 text-xs sm:text-sm max-w-xl mx-auto">
          Join over 3,000+ successful banking professionals. Contact our admissions counsellors directly on WhatsApp for eligibility assessment and upcoming batch registration.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href={`https://wa.me/${OFFICIAL_COURSE_WHATSAPP_RAW}?text=Hi%20BankPlus%2C%20I%20saw%20the%20success%20stories%20and%20want%20to%20know%20how%20to%20enroll.`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm rounded-xl shadow-lg transition-transform hover:scale-105 cursor-pointer flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4 fill-slate-950" />
            <span>WhatsApp Admissions: {OFFICIAL_COURSE_WHATSAPP}</span>
          </a>
          <a
            href={OFFICIAL_FACEBOOK}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm rounded-xl transition-colors flex items-center gap-2"
          >
            <Facebook className="w-4 h-4" />
            <span>Follow {OFFICIAL_FACEBOOK_HANDLE}</span>
          </a>
        </div>
      </div>
    </div>
  );
};
