import React, { useState, useEffect } from 'react';
import { StudentSuccessStory } from '../types';
import { BankPlusLogo } from './BankPlusLogo';
import { BankLogoBadge } from './BankLogoBadge';
import { Instagram, CheckCircle2, Award, ExternalLink, ArrowRight, MapPin, Sparkles, Camera, Upload } from 'lucide-react';
import { OFFICIAL_INSTAGRAM, OFFICIAL_INSTAGRAM_HANDLE } from '../data/mockData';
import { getCustomPhoto, saveCustomPhoto, compressImage } from '../utils/photoStorage';

interface StudentFlyerCardProps {
  story: StudentSuccessStory;
  onOpenStory?: (story: StudentSuccessStory) => void;
  variant?: 'poster' | 'card'; // 'poster' matches the uploaded Instagram flyer format, 'card' is executive list
  className?: string;
}

export const StudentFlyerCard: React.FC<StudentFlyerCardProps> = ({
  story,
  onOpenStory,
  variant = 'poster',
  className = '',
}) => {
  const [photo, setPhoto] = useState<string>(() => getCustomPhoto(story.id) || story.studentPhoto);
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);

  useEffect(() => {
    const handlePhotoUpdated = (e: Event) => {
      const customEvent = e as CustomEvent<{ storyId?: string; dataUrl?: string }>;
      if (!customEvent.detail.storyId || customEvent.detail.storyId === story.id) {
        setPhoto(getCustomPhoto(story.id) || story.studentPhoto);
      }
    };
    window.addEventListener('bankplus_photo_updated', handlePhotoUpdated);
    return () => window.removeEventListener('bankplus_photo_updated', handlePhotoUpdated);
  }, [story.id, story.studentPhoto]);

  const processFile = async (file: File) => {
    if (file && file.type.startsWith('image/')) {
      try {
        const compressed = await compressImage(file, 800, 0.86);
        await saveCustomPhoto(story.id, compressed);
        setPhoto(compressed);
        setUploadSuccess(true);
        setTimeout(() => setUploadSuccess(false), 2500);
      } catch (err) {
        console.error('Photo save error:', err);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const isPoster = variant === 'poster';

  if (!isPoster) {
    // Executive Card Variant
    return (
      <div 
        className={`bg-white rounded-2xl overflow-hidden card-shadow border border-slate-200 hover:border-[#003399] transition-all flex flex-col justify-between group ${className}`}
      >
        <div className="p-5 space-y-4">
          {/* Header Row: Bank Badge & Instagram Verified */}
          <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <BankLogoBadge bankCode={story.bankLogo} bankName={story.hiredBank} size="sm" />
            <a 
              href={story.instagramUrl || OFFICIAL_INSTAGRAM} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[10px] font-bold text-pink-600 bg-pink-50 hover:bg-pink-100 px-2 py-0.5 rounded-full border border-pink-200/80 transition-colors"
              title="Verified on Instagram @bankplus_learning"
            >
              <Instagram className="w-3 h-3" />
              <span>Verified</span>
            </a>
          </div>

          {/* Student Profile Row */}
          <div className="flex items-center gap-3.5">
            <div className="relative shrink-0 group/avatar">
              <img
                src={photo}
                alt={story.studentName}
                referrerPolicy="no-referrer"
                className="w-14 h-14 rounded-xl object-cover border-2 border-blue-100 shadow-xs group-hover:scale-105 transition-transform"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <label 
                className="absolute inset-0 bg-slate-900/60 rounded-xl opacity-0 group-hover/avatar:opacity-100 transition-opacity flex items-center justify-center cursor-pointer text-white"
                title="Click to replace with your candidate photo"
              >
                <Camera className="w-4 h-4" />
                <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
              </label>
              <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white absolute -bottom-0.5 -right-0.5"></div>
            </div>
            <div className="space-y-0.5 min-w-0">
              <h3 className="text-base font-black text-slate-900 group-hover:text-[#003399] transition-colors truncate">
                {story.studentName}
              </h3>
              <p className="text-xs font-bold text-blue-700 truncate">
                {story.roleDesignation}
              </p>
              <div className="flex items-center gap-1 text-[11px] text-slate-500">
                <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                <span className="truncate">{story.hometown}</span>
              </div>
            </div>
          </div>

          {/* Selection Status and Quote */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs py-1.5 px-2.5 bg-emerald-50/80 rounded-lg border border-emerald-200/70">
              <span className="text-emerald-900 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Selected Officer</span>
              </span>
              <span className="font-semibold text-emerald-700 text-[11px]">
                {story.yearPlaced || 'Batch 2024-25'}
              </span>
            </div>
            <p className="text-xs text-slate-600 italic line-clamp-2 bg-blue-50/50 p-2 rounded-lg border-l-2 border-[#003399]">
              &ldquo;{story.shortQuote}&rdquo;
            </p>
          </div>
        </div>

        {/* Action Footer */}
        <div className="p-4 pt-0">
          <button
            onClick={() => onOpenStory && onOpenStory(story)}
            className="w-full py-2 bg-[#001f5c] hover:bg-[#003399] text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>View Full Journey</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    );
  }

  // POSTER VARIANT (Matches the authentic BankPlus Selection Poster flyer uploaded by the user!)
  return (
    <div 
      className={`relative bg-white rounded-3xl overflow-hidden card-shadow border border-slate-200/90 hover:border-[#003399] transition-all duration-300 group flex flex-col justify-between hover:shadow-xl ${className}`}
    >
      {/* Top Poster Visual Container with Geometric Blue Wave Background */}
      <div className="relative aspect-4/5 w-full overflow-hidden bg-gradient-to-b from-white via-slate-50 to-blue-50 flex flex-col justify-between p-4 sm:p-5">
        
        {/* Background Decorative SVG Curves matching official BankPlus flyer artwork */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 500" fill="none" preserveAspectRatio="none">
          <defs>
            <linearGradient id={`curveGrad-${story.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.2" />
              <stop offset="60%" stopColor="#0284c7" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#003399" stopOpacity="0.18" />
            </linearGradient>
            <linearGradient id={`ribbonGrad-${story.id}`} x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#002b7f" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0.85" />
            </linearGradient>
            <pattern id={`dotPattern-${story.id}`} x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.2" fill="#003399" fillOpacity="0.12" />
            </pattern>
          </defs>

          {/* Dot Matrix Corner Accents */}
          <rect x="10" y="10" width="90" height="70" fill={`url(#dotPattern-${story.id})`} />
          <rect x="290" y="380" width="100" height="100" fill={`url(#dotPattern-${story.id})`} />

          {/* Sweeping Dynamic Curves */}
          <path
            d="M -20,240 Q 80,180 200,220 T 420,160 L 420,-20 L -20,-20 Z"
            fill={`url(#curveGrad-${story.id})`}
          />
          <path
            d="M -40,360 C 60,320 180,420 440,310 L 440,520 L -40,520 Z"
            fill={`url(#curveGrad-${story.id})`}
          />
        </svg>

        {/* 1. FLYER HEADER: BankPlus Logo + Instagram Verified Badge */}
        <div className="relative z-10 flex items-center justify-between gap-2 border-b border-blue-100/60 pb-2.5">
          <BankPlusLogo variant="light" size="sm" showTagline={true} />
          
          <a
            href={story.instagramUrl || OFFICIAL_INSTAGRAM}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-rose-500 text-white font-bold text-[10px] shadow-2xs hover:scale-105 transition-transform"
            title="Verified Student Selection on @bankplus_learning Instagram"
          >
            <Instagram className="w-3 h-3" />
            <span className="hidden sm:inline">Instagram</span>
            <span>Verified</span>
          </a>
        </div>

        {/* 2. FLYER CENTER: Student Portrait in Official Framed Container */}
        <div className="relative z-10 flex flex-col items-center justify-center my-auto py-2">
          <div className="relative group/photo">
            {/* Outer Glow Ring */}
            <div className="absolute -inset-2 rounded-2xl bg-gradient-to-tr from-sky-400 via-blue-600 to-indigo-600 opacity-30 blur-xs group-hover/photo:opacity-60 transition-opacity"></div>

            {/* Inner Bordered Frame */}
            <div 
              className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-2xl overflow-hidden bg-white p-1 shadow-md border-2 border-white"
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
            >
              <img
                src={photo}
                alt={story.studentName}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-slate-950/20 via-transparent to-transparent pointer-events-none"></div>

              {/* Upload Photo Hover Overlay */}
              <label 
                className="absolute inset-0 bg-slate-950/70 rounded-xl opacity-0 group-hover/photo:opacity-100 transition-opacity flex flex-col items-center justify-center cursor-pointer text-white p-2 text-center"
                title="Click to replace with your candidate photo"
              >
                <Camera className="w-5 h-5 text-sky-300 mb-1" />
                <span className="text-[10px] font-black leading-tight">Change Photo</span>
                <span className="text-[9px] text-slate-300">(Select from PC)</span>
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleFileChange} 
                />
              </label>
            </div>

            {/* Verified Badge Icon */}
            <div className="absolute -bottom-2 -right-2 w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md border-2 border-white" title="Verified Selection">
              <CheckCircle2 className="w-4 h-4" />
            </div>

            {/* Upload Success Feedback Banner */}
            {uploadSuccess && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap bg-emerald-600 text-white px-3 py-0.5 rounded-full text-[10px] font-black shadow-lg animate-bounce z-20">
                Photo Updated!
              </div>
            )}
          </div>
        </div>

        {/* 3. FLYER LOWER SECTION: Student Name, Role & Bank Emblem */}
        <div className="relative z-10 text-center space-y-1 pt-1">
          {/* Student Full Name */}
          <h3 className="text-lg sm:text-xl font-black text-[#001f5c] tracking-tight group-hover:text-[#003399] transition-colors leading-tight">
            {story.studentName}
          </h3>

          {/* Job Designation */}
          <div className="text-xs sm:text-sm font-black text-[#0048a7] tracking-tight">
            {story.roleDesignation}
          </div>

          {/* Official Bank Emblem & Name Pill */}
          <div className="pt-2 flex justify-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/95 border border-slate-200/80 shadow-xs">
              <BankLogoBadge bankCode={story.bankLogo} bankName={story.hiredBank} size="sm" variant="full" />
            </div>
          </div>
        </div>
      </div>

      {/* Card Info Details Footer (Clean, scannable student metrics) */}
      <div className="p-4 sm:p-5 bg-white border-t border-slate-100 space-y-3">
        {/* Placement Metrics Row */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-2 rounded-xl bg-slate-50 border border-slate-100/80">
            <span className="text-[10px] font-semibold text-slate-400 block uppercase">Hometown</span>
            <span className="font-bold text-slate-800 truncate block">{story.hometown}</span>
          </div>
          <div className="p-2 rounded-xl bg-emerald-50/70 border border-emerald-200/70">
            <span className="text-[10px] font-semibold text-emerald-700 block uppercase">Selection</span>
            <span className="font-bold text-emerald-800 truncate block flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
              <span>Verified Offer</span>
            </span>
          </div>
        </div>

        {/* Short Verified Quote */}
        <p className="text-xs text-slate-600 italic line-clamp-2 bg-blue-50/40 p-2.5 rounded-xl border-l-2 border-[#003399]">
          &ldquo;{story.shortQuote}&rdquo;
        </p>

        {/* Action Buttons: Modal view + Instagram Link */}
        <div className="pt-1 flex items-center gap-2">
          <button
            onClick={() => onOpenStory && onOpenStory(story)}
            className="grow py-2.5 bg-[#001f5c] hover:bg-[#003399] text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>View Interview Journey</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <a
            href={story.instagramUrl || OFFICIAL_INSTAGRAM}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-pink-50 hover:bg-pink-100 text-pink-600 border border-pink-200 transition-colors shrink-0"
            title="Open on official Instagram @bankplus_learning"
          >
            <Instagram className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};
