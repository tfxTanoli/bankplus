import React, { useState, useMemo } from 'react';
import { StudentSuccessStory } from '../types';
import { SUCCESS_STORIES, OFFICIAL_INSTAGRAM, OFFICIAL_INSTAGRAM_HANDLE } from '../data/mockData';
import { StudentFlyerCard } from './StudentFlyerCard';
import { PhotoManagerModal } from './PhotoManagerModal';
import { 
  getCustomPhotos, 
  saveCustomPhoto, 
  compressImage, 
  matchFileToStoryId 
} from '../utils/photoStorage';
import { 
  Instagram, 
  Search, 
  Filter, 
  Sparkles, 
  CheckCircle2, 
  ExternalLink, 
  LayoutGrid, 
  Grid2X2,
  Award,
  TrendingUp,
  Building2,
  Users,
  Camera,
  Upload
} from 'lucide-react';

interface WallOfFameProps {
  onOpenStory?: (story: StudentSuccessStory) => void;
  className?: string;
  initialBank?: string;
}

export const WallOfFame: React.FC<WallOfFameProps> = ({
  onOpenStory,
  className = '',
  initialBank = 'All',
}) => {
  const [selectedBank, setSelectedBank] = useState<string>(initialBank);
  const [selectedRole, setSelectedRole] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'poster' | 'card'>('poster');
  const [isPhotoManagerOpen, setIsPhotoManagerOpen] = useState<boolean>(false);
  const [customPhotos, setCustomPhotos] = useState<Record<string, string>>(() => getCustomPhotos());
  const [inlineNotice, setInlineNotice] = useState<string | null>(null);
  const [isProcessingBatch, setIsProcessingBatch] = useState<boolean>(false);
  const [isDraggingBanner, setIsDraggingBanner] = useState<boolean>(false);

  React.useEffect(() => {
    const handleUpdate = () => {
      setCustomPhotos(getCustomPhotos());
    };
    window.addEventListener('bankplus_photo_updated', handleUpdate);
    return () => window.removeEventListener('bankplus_photo_updated', handleUpdate);
  }, []);

  const handleInlineBatchFiles = async (files: FileList | File[]) => {
    const fileArray = Array.from(files);
    if (fileArray.length === 0) return;

    setIsProcessingBatch(true);
    let matched = 0;
    const current = getCustomPhotos();
    const usedStoryIds = new Set<string>();

    for (const file of fileArray) {
      try {
        let targetId = matchFileToStoryId(file.name);
        if (!targetId || usedStoryIds.has(targetId)) {
          const unassigned = SUCCESS_STORIES.slice(0, 17).find(
            (s) => !current[s.id] && !usedStoryIds.has(s.id)
          );
          if (unassigned) targetId = unassigned.id;
        }

        if (targetId) {
          const compressed = await compressImage(file, 800, 0.86);
          await saveCustomPhoto(targetId, compressed);
          usedStoryIds.add(targetId);
          matched++;
        }
      } catch (err) {
        console.warn('Error processing inline file:', file.name, err);
      }
    }

    setIsProcessingBatch(false);
    setInlineNotice(`Applied & verified ${matched} student selection photo${matched > 1 ? 's' : ''}!`);
    setTimeout(() => setInlineNotice(null), 4000);
  };

  const verifiedAppliedCount = SUCCESS_STORIES.slice(0, 17).filter((s) => customPhotos[s.id]).length;

  // Available Bank Filters
  const bankFilterOptions = [
    { label: 'All Banks', value: 'All' },
    { label: 'Axis Bank', value: 'Axis' },
    { label: 'Kotak Mahindra', value: 'Kotak' },
    { label: 'HDFC Bank', value: 'HDFC' },
    { label: 'Bandhan Bank', value: 'Bandhan' },
    { label: 'IndusInd Bank', value: 'IndusInd' },
    { label: 'RBS / Indiabulls', value: 'Indiabulls' },
    { label: 'HDB Financial', value: 'HDB' },
    { label: 'SBI', value: 'SBI' },
  ];

  // Available Role Filters
  const roleFilterOptions = [
    { label: 'All Roles', value: 'All' },
    { label: 'Assistant Manager', value: 'Assistant Manager' },
    { label: 'Officer', value: 'Officer' },
    { label: 'Credit Officer', value: 'Credit' },
    { label: 'CRO / Teller', value: 'Teller' },
    { label: 'Phone Banking', value: 'Phone' },
  ];

  // Filtered Stories
  const filteredStories = useMemo(() => {
    return SUCCESS_STORIES.filter((story) => {
      // Bank filter
      const matchesBank =
        selectedBank === 'All' ||
        story.hiredBank.toLowerCase().includes(selectedBank.toLowerCase()) ||
        story.bankLogo.toLowerCase().includes(selectedBank.toLowerCase());

      // Role filter
      const matchesRole =
        selectedRole === 'All' ||
        story.roleDesignation.toLowerCase().includes(selectedRole.toLowerCase());

      // Search query
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        story.studentName.toLowerCase().includes(query) ||
        story.hiredBank.toLowerCase().includes(query) ||
        story.hometown.toLowerCase().includes(query) ||
        story.roleDesignation.toLowerCase().includes(query);

      return matchesBank && matchesRole && matchesSearch;
    });
  }, [selectedBank, selectedRole, searchQuery]);

  return (
    <section className={`space-y-8 ${className}`} id="wall-of-fame">
      {/* 1. TOP INSTAGRAM CTA BANNER */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#001f5c] via-[#003399] to-[#0284c7] text-white p-6 sm:p-8 shadow-xl">
        {/* Subtle geometric circles */}
        <div className="absolute -right-12 -top-12 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none"></div>
        <div className="absolute -left-12 -bottom-12 w-64 h-64 rounded-full bg-cyan-400/15 blur-2xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 border border-white/20 text-sky-200 text-xs font-black uppercase tracking-wider backdrop-blur-xs">
              <Instagram className="w-3.5 h-3.5 text-pink-300" />
              <span>Official Wall of Fame • @bankplus_learning</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
              Verified Student Selections Wall
            </h2>

            <p className="text-sm sm:text-base text-blue-100/90 leading-relaxed">
              Every card below is an authentic student selection flyer direct from our official Instagram channel. 
              Over 3,000+ students from Tier 2 & 3 cities have successfully started their banking careers through BankPlus.
            </p>
          </div>

          {/* Direct Instagram Action */}
          <div className="shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
            <a
              href={OFFICIAL_INSTAGRAM}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-rose-500 hover:from-purple-500 hover:to-rose-400 text-white font-black text-sm shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95"
            >
              <Instagram className="w-4 h-4" />
              <span>Follow @bankplus_learning</span>
              <ExternalLink className="w-4 h-4 opacity-80" />
            </a>
          </div>
        </div>

        {/* Quick Stat Badges */}
        <div className="relative z-10 mt-6 pt-6 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="p-2 rounded-xl bg-white/10 backdrop-blur-xs">
            <div className="text-xl sm:text-2xl font-black text-white">3,000+</div>
            <div className="text-[11px] font-medium text-blue-200 uppercase tracking-wide">Students Placed</div>
          </div>
          <div className="p-2 rounded-xl bg-white/10 backdrop-blur-xs">
            <div className="text-xl sm:text-2xl font-black text-white">100+</div>
            <div className="text-[11px] font-medium text-blue-200 uppercase tracking-wide">Banking Partners</div>
          </div>
          <div className="p-2 rounded-xl bg-white/10 backdrop-blur-xs">
            <div className="text-xl sm:text-2xl font-black text-emerald-300">100%</div>
            <div className="text-[11px] font-medium text-blue-200 uppercase tracking-wide">Selection Guarantee</div>
          </div>
          <div className="p-2 rounded-xl bg-white/10 backdrop-blur-xs">
            <div className="text-xl sm:text-2xl font-black text-pink-300">Daily</div>
            <div className="text-[11px] font-medium text-blue-200 uppercase tracking-wide">Instagram Updates</div>
          </div>
        </div>
      </div>

      {/* CANDIDATE PHOTOS QUICK-APPLY BANNER */}
      <div 
        onDragOver={(e) => {
          e.preventDefault();
          setIsDraggingBanner(true);
        }}
        onDragLeave={() => setIsDraggingBanner(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDraggingBanner(false);
          if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleInlineBatchFiles(e.dataTransfer.files);
          }
        }}
        className={`rounded-2xl p-4 sm:p-5 border transition-all ${
          isDraggingBanner
            ? 'bg-blue-100 border-[#003399] ring-2 ring-[#003399]/30'
            : 'bg-white border-blue-200 card-shadow'
        }`}
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-100 text-[#003399] font-black text-xs">
                <Camera className="w-3.5 h-3.5 text-[#003399]" />
                <span>17 Official Student Flyers Attached</span>
              </span>
              <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                {verifiedAppliedCount} / 17 Photos Applied
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-black text-[#001f5c]">
              Update Candidate Selection Photos
            </h3>
            <p className="text-xs text-slate-600">
              Drag &amp; drop your 17 downloaded images here (<span className="font-mono text-slate-700 text-[11px]">January 2020.png</span>, <span className="font-mono text-slate-700 text-[11px]">65-2.png</span>, etc.) or select them to automatically apply photos to candidate posters.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto shrink-0">
            <label className="grow md:grow-0 px-4 py-2.5 bg-[#003399] hover:bg-[#002673] text-white rounded-xl font-black text-xs cursor-pointer transition-colors shadow-xs flex items-center justify-center gap-2">
              <Upload className="w-4 h-4" />
              <span>Select All 17 Images</span>
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                disabled={isProcessingBatch}
                onChange={(e) => e.target.files && handleInlineBatchFiles(e.target.files)}
              />
            </label>

            <button
              onClick={() => setIsPhotoManagerOpen(true)}
              className="grow md:grow-0 px-4 py-2.5 bg-blue-50 hover:bg-blue-100 text-[#003399] border border-blue-200 rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Manage &amp; View Checklist</span>
            </button>
          </div>
        </div>

        {inlineNotice && (
          <div className="mt-3 p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-bold text-emerald-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{inlineNotice}</span>
          </div>
        )}

        {isProcessingBatch && (
          <div className="mt-3 p-2.5 bg-blue-50 border border-blue-200 rounded-xl text-xs font-bold text-[#003399] flex items-center gap-2">
            <div className="w-3.5 h-3.5 border-2 border-[#003399] border-t-transparent rounded-full animate-spin"></div>
            <span>Optimizing and applying candidate photos...</span>
          </div>
        )}
      </div>

      {/* 2. FILTER & SEARCH CONTROLS BAR */}
      <div className="bg-white rounded-2xl p-5 card-shadow border border-slate-200 space-y-4">
        {/* Row 1: Search & View Toggle */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative grow max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by student name, bank, role, or hometown..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#003399]/20 focus:border-[#003399] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700 font-bold"
              >
                Clear
              </button>
            )}
          </div>

          {/* View Mode Toggle, Manage Photos & Total Counter */}
          <div className="flex flex-wrap items-center justify-between sm:justify-end gap-2.5">
            {/* Manage/Upload Student Photos Button */}
            <button
              onClick={() => setIsPhotoManagerOpen(true)}
              className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-[#003399] border border-blue-200 rounded-xl font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
              title="Upload custom photos for student flyers"
            >
              <Camera className="w-3.5 h-3.5 text-[#003399]" />
              <span>Change Photos</span>
            </button>

            <div className="text-xs font-bold text-slate-500 hidden md:block">
              <span className="text-[#001f5c] font-black">{filteredStories.length}</span> Stories
            </div>

            {/* Mode Switch: Poster vs Card */}
            <div className="inline-flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200">
              <button
                onClick={() => setViewMode('poster')}
                className={`p-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  viewMode === 'poster'
                    ? 'bg-white text-[#001f5c] shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
                title="Instagram Flyer Poster View"
              >
                <Grid2X2 className="w-4 h-4" />
                <span className="hidden md:inline">Posters</span>
              </button>
              <button
                onClick={() => setViewMode('card')}
                className={`p-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  viewMode === 'card'
                    ? 'bg-white text-[#001f5c] shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
                title="Compact Executive Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
                <span className="hidden md:inline">Executive</span>
              </button>
            </div>
          </div>
        </div>

        {/* Row 2: Bank Filter Pills */}
        <div className="space-y-1.5">
          <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider block">
            Filter by Hiring Bank:
          </span>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
            {bankFilterOptions.map((bank) => (
              <button
                key={bank.value}
                onClick={() => setSelectedBank(bank.value)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedBank === bank.value
                    ? 'bg-[#001f5c] text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {bank.label}
              </button>
            ))}
          </div>
        </div>

        {/* Row 3: Role Filter Pills */}
        <div className="space-y-1.5 pt-1 border-t border-slate-100">
          <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider block">
            Filter by Role / Designation:
          </span>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
            {roleFilterOptions.map((role) => (
              <button
                key={role.value}
                onClick={() => setSelectedRole(role.value)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedRole === role.value
                    ? 'bg-[#0284c7] text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {role.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3. WALL OF FAME GRID */}
      {filteredStories.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center space-y-4 border border-slate-200">
          <div className="w-16 h-16 rounded-full bg-blue-50 text-[#003399] mx-auto flex items-center justify-center">
            <Search className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-black text-slate-900">No stories match your active filter</h3>
            <p className="text-sm text-slate-500">
              Try resetting the search keyword or selecting "All Banks" to view all 24 verified student flyers.
            </p>
          </div>
          <button
            onClick={() => {
              setSelectedBank('All');
              setSelectedRole('All');
              setSearchQuery('');
            }}
            className="px-5 py-2.5 rounded-xl bg-[#001f5c] hover:bg-[#003399] text-white text-xs font-bold transition-colors cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div 
          className={`grid gap-6 ${
            viewMode === 'poster'
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
              : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
          }`}
        >
          {filteredStories.map((story) => (
            <StudentFlyerCard
              key={story.id}
              story={story}
              variant={viewMode}
              onOpenStory={onOpenStory}
            />
          ))}
        </div>
      )}

      {/* 4. PROMINENT BOTTOM INSTAGRAM CALL-TO-ACTION BANNER */}
      <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-[#001f5c] to-[#002b7f] text-white p-8 sm:p-10 shadow-xl overflow-hidden relative">
        <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 w-80 h-80 rounded-full bg-pink-500/10 blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/20 border border-pink-400/30 text-pink-300 text-xs font-black uppercase tracking-wider">
              <Instagram className="w-4 h-4" />
              <span>Explore More Student Success</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Want to see 150+ more student selection reactions?
            </h3>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              We post new candidate offer letter reveals, interview reaction videos, and live speed-test drills every single day on our official Instagram page <strong className="text-pink-300">@bankplus_learning</strong>.
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2 text-xs text-blue-200">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Verified Offer Letters</span>
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Direct Student Interviews</span>
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Speed Drills & Tips</span>
              </span>
            </div>
          </div>

          <div className="shrink-0 space-y-2">
            <a
              href={OFFICIAL_INSTAGRAM}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-rose-500 hover:from-purple-500 hover:to-rose-400 text-white font-black text-base shadow-xl hover:shadow-2xl transition-all hover:scale-105 active:scale-95"
            >
              <Instagram className="w-5 h-5" />
              <span>View More Stories on Instagram</span>
              <ExternalLink className="w-4 h-4 opacity-80" />
            </a>
            <span className="text-[11px] text-slate-400 block text-center">
              Official Handle: @bankplus_learning
            </span>
          </div>
        </div>
      </div>

      {/* Candidate Photo Manager Modal */}
      <PhotoManagerModal 
        isOpen={isPhotoManagerOpen} 
        onClose={() => setIsPhotoManagerOpen(false)} 
      />
    </section>
  );
};
