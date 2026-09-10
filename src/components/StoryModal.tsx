import React, { useState, useEffect } from 'react';
import { X, Play, Quote, Award, Building2, MapPin, CheckCircle2, Calendar, TrendingUp, Camera } from 'lucide-react';
import { StudentSuccessStory } from '../types';
import { getCustomPhoto, saveCustomPhoto, compressImage } from '../utils/photoStorage';

interface StoryModalProps {
  story: StudentSuccessStory | null;
  onClose: () => void;
  onEnquireNow: () => void;
}

export const StoryModal: React.FC<StoryModalProps> = ({
  story,
  onClose,
  onEnquireNow,
}) => {
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [modalPhoto, setModalPhoto] = useState<string>(story?.studentPhoto || '');

  useEffect(() => {
    if (story) {
      setModalPhoto(getCustomPhoto(story.id) || story.studentPhoto);
      setIsPlayingVideo(false);
    }
  }, [story]);

  useEffect(() => {
    if (!story) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [story, onClose]);

  if (!story) return null;

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const compressed = await compressImage(file, 800, 0.86);
        await saveCustomPhoto(story.id, compressed);
        setModalPhoto(compressed);
      } catch (err) {
        console.error('Photo save error:', err);
      }
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-xl sm:max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Photo & Bank Badge */}
        <div className="bg-[#001f5c] px-4 py-3.5 sm:px-5 sm:py-4 text-white relative flex flex-row items-center gap-3.5 sm:gap-4 shrink-0">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Student Photo */}
          <div className="relative shrink-0 group/modalphoto">
            <img 
              src={modalPhoto} 
              alt={story.studentName}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover border-2 border-white/90 shadow-md"
            />
            {/* Upload/Change Photo Overlay */}
            <label 
              className="absolute inset-0 bg-slate-950/70 rounded-xl opacity-0 group-hover/modalphoto:opacity-100 transition-opacity flex flex-col items-center justify-center cursor-pointer text-white p-1 text-center"
              title="Click to replace candidate photo"
            >
              <Camera className="w-4 h-4 text-sky-300 mb-0.5" />
              <span className="text-[9px] font-black leading-tight">Change</span>
              <input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={handlePhotoChange} 
              />
            </label>
            {/* Bank Overlay Badge */}
            <div className="absolute -bottom-1.5 -right-1.5 px-1.5 py-0.5 rounded bg-[#ffcc00] text-slate-950 font-black text-[10px] shadow-sm">
              {story.bankLogo}
            </div>
          </div>

          {/* Student Details */}
          <div className="space-y-0.5 grow min-w-0 pr-6">
            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
              <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" />
              <span>Verified Alumni • Class of {story.yearPlaced}</span>
            </div>

            <h3 className="text-lg sm:text-xl font-black text-white truncate">{story.studentName}</h3>
            
            <p className="text-xs font-semibold text-[#ffcc00] flex items-center gap-1 truncate">
              <Building2 className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{story.roleDesignation} at {story.hiredBank}</span>
            </p>

            <div className="flex items-center gap-2 pt-0.5 text-[11px] text-blue-200">
              <span className="flex items-center gap-1 truncate">
                <MapPin className="w-3 h-3 text-slate-400 shrink-0" /> {story.hometown}
              </span>
              <span>•</span>
              <span className="font-bold text-emerald-300 bg-emerald-950/70 px-1.5 py-0.2 rounded text-[10px]">
                Placed
              </span>
            </div>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-4 sm:p-5 space-y-3.5 overflow-y-auto grow">
          {/* Quote */}
          <div className="p-3 rounded-xl bg-blue-50/70 border-l-4 border-[#003399] italic text-slate-800 text-xs sm:text-sm flex items-start gap-2.5">
            <Quote className="w-4 h-4 text-[#003399] shrink-0 opacity-40 mt-0.5" />
            <p className="leading-relaxed">
              &ldquo;{story.shortQuote}&rdquo;
            </p>
          </div>

          {/* Video or Simulated Player */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Video Journey Interview ({story.videoDuration || '3m 15s'})
              </h4>
              <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                <Award className="w-3 h-3" /> Verified Candidate
              </span>
            </div>

            <div className="relative rounded-xl overflow-hidden bg-slate-900 aspect-video sm:max-h-56 w-full flex items-center justify-center group shadow-inner">
              <img 
                src={modalPhoto || story.studentPhoto} 
                alt="Interview video thumbnail"
                className={`w-full h-full object-cover transition-opacity duration-300 ${isPlayingVideo ? 'opacity-30' : 'opacity-60'}`}
              />

              {!isPlayingVideo ? (
                <button
                  onClick={() => setIsPlayingVideo(true)}
                  className="absolute z-10 w-12 h-12 rounded-full bg-[#ffcc00] hover:bg-[#e6b800] text-slate-950 flex items-center justify-center shadow-xl transition-transform group-hover:scale-110 cursor-pointer"
                  aria-label="Play Interview Video"
                >
                  <Play className="w-5 h-5 fill-slate-950 ml-0.5" />
                </button>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 text-white space-y-1.5 bg-slate-950/80">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></div>
                  <p className="text-xs font-bold text-[#ffcc00]">
                    [Simulated Video Playback: {story.studentName}&apos;s Interview Mock Session]
                  </p>
                  <p className="text-[11px] text-slate-300 max-w-sm">
                    &quot;The ex-banker panel taught me how to handle tricky questions about gap years and non-commerce background.&quot;
                  </p>
                  <button 
                    onClick={() => setIsPlayingVideo(false)}
                    className="mt-1 text-[11px] text-slate-300 hover:text-white underline cursor-pointer"
                  >
                    Pause Video
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Full Journey Description */}
          <div className="space-y-1">
            <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Preparation & Selection Pathway:
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {story.fullJourney}
            </p>
          </div>

          {/* Key Takeaway box */}
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 grid grid-cols-3 gap-2 text-xs">
            <div>
              <span className="text-slate-500 block text-[10px]">Program</span>
              <span className="font-bold text-[#001f5c] text-[11px] sm:text-xs truncate block">{story.programTaken}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">Timeline</span>
              <span className="font-bold text-emerald-700 text-[11px] sm:text-xs block">Cleared in 74 Days</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">Panel Mocks</span>
              <span className="font-bold text-slate-800 text-[11px] sm:text-xs block">12 Simulations</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-1 flex flex-col sm:flex-row items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onEnquireNow();
              }}
              className="w-full sm:w-auto grow py-2.5 px-4 rounded-xl bg-[#003399] hover:bg-[#002673] text-white font-bold text-xs sm:text-sm shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Enroll in Same Program ({story.programTaken})</span>
            </button>
            <button
              onClick={onClose}
              className="w-full sm:w-auto py-2.5 px-4 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-semibold text-xs sm:text-sm transition-colors cursor-pointer"
            >
              Close Story
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
