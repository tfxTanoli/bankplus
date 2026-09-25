import React, { useState, useEffect } from 'react';
import { Download, Copy, Check, X, ShieldAlert, Sparkles, Image as ImageIcon } from 'lucide-react';
import { TEXT_STORAGE_KEY as REELS_TEXT_STORAGE_KEY } from '../utils/reelsSectionStorage';

interface ExportSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExportSyncModal: React.FC<ExportSyncModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [summary, setSummary] = useState<{
    studentPhotosCount: number;
    drillPhotosCount: number;
    hasReels: boolean;
    hasCampusLife: boolean;
    hasLogo: boolean;
  }>({
    studentPhotosCount: 0,
    drillPhotosCount: 0,
    hasReels: false,
    hasCampusLife: false,
    hasLogo: false,
  });

  const getExportData = () => {
    if (typeof window === 'undefined') return {};
    return {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      studentPhotos: JSON.parse(localStorage.getItem('bankplus_student_custom_photos_v2') || '{}'),
      drillClassroomPhotos: JSON.parse(localStorage.getItem('bankplus_drill_classroom_photos') || '{}'),
      reelsItems: JSON.parse(localStorage.getItem('bankplus_reels_custom_items_v1') || '[]'),
      reelsText: JSON.parse(localStorage.getItem(REELS_TEXT_STORAGE_KEY) || '{}'),
      campusLifeItems: JSON.parse(localStorage.getItem('bankplus_campus_life_items_v1') || '[]'),
      campusLifeText: JSON.parse(localStorage.getItem('bankplus_campus_life_section_text_v1') || '{}'),
      customLogo: localStorage.getItem('bankplus_custom_logo_data') || null,
      logoStyle: localStorage.getItem('bankplus_logo_style') || null,
      logoScale: localStorage.getItem('bankplus_logo_scale') || null,
    };
  };

  useEffect(() => {
    if (!isOpen) return;
    const data = getExportData();
    setSummary({
      studentPhotosCount: Object.keys(data.studentPhotos || {}).length,
      drillPhotosCount: Object.keys(data.drillClassroomPhotos || {}).length,
      hasReels: Array.isArray(data.reelsItems) && data.reelsItems.length > 0,
      hasCampusLife: Array.isArray(data.campusLifeItems) && data.campusLifeItems.length > 0,
      hasLogo: !!data.customLogo,
    });
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleDownload = () => {
    const data = getExportData();
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bankplus-uploaded-content-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopy = () => {
    const data = getExportData();
    const jsonStr = JSON.stringify(data);
    navigator.clipboard.writeText(jsonStr).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl max-w-md sm:max-w-lg w-full p-4 sm:p-5 shadow-2xl border border-slate-200 flex flex-col max-h-[85vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between shrink-0 pb-2">
          <div className="space-y-0.5">
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-blue-50 text-[#003399] text-[10px] font-black">
              <Sparkles className="w-3 h-3" />
              <span>Make Uploads Visible to Everyone</span>
            </div>
            <h3 className="text-base sm:text-lg font-black text-slate-900">
              Export Uploaded Content & Images
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto grow space-y-3 pr-0.5">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-900 space-y-1">
            <div className="font-black flex items-center gap-1.5 text-amber-950 text-[11px]">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>Why images weren&apos;t visible on shared preview:</span>
            </div>
            <p className="leading-relaxed text-slate-700 text-[11px]">
              When uploaded in the browser, your images were saved into your local browser storage (<code className="bg-amber-100 px-1 py-0.2 rounded">localStorage</code>). Different links (<code className="bg-amber-100 px-1 py-0.2 rounded">ais-dev</code> vs <code className="bg-amber-100 px-1 py-0.2 rounded">ais-pre</code>) and other people&apos;s devices cannot access your computer&apos;s local storage.
            </p>
          </div>

          <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 space-y-1.5 text-xs">
            <span className="font-bold text-slate-900 block text-[11px]">Found in your local browser session:</span>
            <div className="grid grid-cols-2 gap-1.5 text-slate-600 text-[11px]">
              <div className="flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-[#003399]" />
                <span>Student Flyers: <strong>{summary.studentPhotosCount}</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-emerald-600" />
                <span>Classroom Photos: <strong>{summary.drillPhotosCount}</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <span>Reels Items: <strong>{summary.hasReels ? 'Yes' : 'None'}</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <span>Campus Items: <strong>{summary.hasCampusLife ? 'Yes' : 'None'}</strong></span>
              </div>
            </div>
          </div>

          <div className="space-y-2 pt-1">
            <button
              onClick={handleDownload}
              className="w-full py-2.5 px-4 rounded-xl bg-[#003399] hover:bg-[#002266] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download Backup File (.json)</span>
            </button>

            <button
              onClick={handleCopy}
              className="w-full py-2 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-bold">Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-600" />
                  <span>Copy Data to Clipboard (to paste in chat)</span>
                </>
              )}
            </button>
          </div>

          <p className="text-[10px] text-center text-slate-500 pb-1">
            After downloading or copying, share it with the AI agent in the chat to permanently bake all images directly into the codebase.
          </p>
        </div>
      </div>
    </div>
  );
};
