import React, { useState, useEffect } from 'react';
import { 
  X, Upload, Camera, Trash2, CheckCircle2, Search, Sparkles, 
  FileCheck, AlertCircle, ArrowUpRight, ShieldCheck, Check, RefreshCw
} from 'lucide-react';
import { SUCCESS_STORIES } from '../data/mockData';
import { 
  getCustomPhotos, saveCustomPhoto, clearAllCustomPhotos, 
  compressImage, matchFileToStoryId 
} from '../utils/photoStorage';
import { BankLogoBadge } from './BankLogoBadge';

interface PhotoManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PhotoManagerModal: React.FC<PhotoManagerModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [customPhotos, setCustomPhotos] = useState<Record<string, string>>({});
  const [searchFilter, setSearchFilter] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [batchNotice, setBatchNotice] = useState<{ type: 'success' | 'info'; message: string } | null>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setCustomPhotos(getCustomPhotos());
    }
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

  // Process a single file for a candidate
  const handleSingleUpload = async (storyId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsProcessing(true);
      const compressedDataUrl = await compressImage(file, 800, 0.86);
      await saveCustomPhoto(storyId, compressedDataUrl);
      setCustomPhotos((prev) => ({ ...prev, [storyId]: compressedDataUrl }));
      setBatchNotice({
        type: 'success',
        message: `Photo updated successfully for candidate!`,
      });
      setTimeout(() => setBatchNotice(null), 3000);
    } catch (err) {
      console.error(err);
      setBatchNotice({
        type: 'info',
        message: 'Could not process image file. Please try a standard JPEG or PNG.',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  // Batch process multiple files with automatic candidate filename matching
  const handleBatchFiles = async (fileList: FileList | File[]) => {
    const files = Array.from(fileList);
    if (files.length === 0) return;

    setIsProcessing(true);
    let matchedCount = 0;
    const newPhotos: Record<string, string> = { ...customPhotos };

    // Track which stories already have a photo assigned in this batch
    const usedStoryIds = new Set<string>();

    for (const file of files) {
      try {
        const matchedStoryId = matchFileToStoryId(file.name);
        let targetId = matchedStoryId;

        // If no filename match, assign to next unassigned story in the 17 verified list
        if (!targetId || usedStoryIds.has(targetId)) {
          const unassigned = SUCCESS_STORIES.slice(0, 17).find(
            (s) => !newPhotos[s.id] && !usedStoryIds.has(s.id)
          );
          if (unassigned) {
            targetId = unassigned.id;
          }
        }

        if (targetId) {
          const compressed = await compressImage(file, 800, 0.86);
          await saveCustomPhoto(targetId, compressed);
          newPhotos[targetId] = compressed;
          usedStoryIds.add(targetId);
          matchedCount++;
        }
      } catch (err) {
        console.warn('Error compressing batch file:', file.name, err);
      }
    }

    setCustomPhotos(newPhotos);
    setIsProcessing(false);

    setBatchNotice({
      type: 'success',
      message: `Successfully matched & applied ${matchedCount} student flyer image${matchedCount > 1 ? 's' : ''}!`,
    });
    setTimeout(() => setBatchNotice(null), 4000);
  };

  const handleDropBatch = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleBatchFiles(e.dataTransfer.files);
    }
  };

  const handleResetAll = async () => {
    if (window.confirm('Reset all custom candidate photos back to default portraits?')) {
      await clearAllCustomPhotos();
      setCustomPhotos({});
      setBatchNotice({
        type: 'info',
        message: 'All candidate photos have been reset to system defaults.',
      });
      setTimeout(() => setBatchNotice(null), 3000);
    }
  };

  const filteredCandidates = SUCCESS_STORIES.filter((story) => {
    const term = searchFilter.toLowerCase();
    return (
      story.studentName.toLowerCase().includes(term) ||
      story.hiredBank.toLowerCase().includes(term) ||
      story.roleDesignation.toLowerCase().includes(term) ||
      (story.originalFlyerFile && story.originalFlyerFile.toLowerCase().includes(term))
    );
  });

  const verified17Count = SUCCESS_STORIES.slice(0, 17).filter((s) => customPhotos[s.id]).length;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#001f5c] text-white p-5 sm:p-6 relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-blue-900">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-200 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-[#ffcc00]" />
              <span>Official Wall of Fame Photo Manager</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              Apply Attached Candidate Selection Flyers
            </h2>
            <p className="text-xs text-blue-200">
              Select or drop your 17 official candidate flyer images. Each image is automatically matched to the student and saved in your browser.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer self-end sm:self-center"
            title="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 1-Click Dropzone Banner for all 17 attached files */}
        <div className="p-4 sm:p-5 bg-gradient-to-b from-blue-50/70 to-slate-50 border-b border-slate-200 space-y-3">
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDraggingOver(true);
            }}
            onDragLeave={() => setIsDraggingOver(false)}
            onDrop={handleDropBatch}
            className={`border-2 border-dashed rounded-2xl p-4 sm:p-5 text-center transition-all ${
              isDraggingOver 
                ? 'border-[#003399] bg-blue-100/60 scale-[1.01]' 
                : 'border-blue-300 hover:border-[#003399] bg-white'
            }`}
          >
            <div className="max-w-xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3.5 text-left">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0">
                  <Upload className="w-6 h-6 text-[#003399]" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-[#001f5c]">
                    Batch Apply All 17 Attached Images
                  </h4>
                  <p className="text-xs text-slate-600">
                    Drop your 17 downloaded images here (<code className="text-[11px] font-mono bg-blue-100/70 px-1 py-0.5 rounded text-blue-900">January 2020.png</code>, <code className="text-[11px] font-mono bg-blue-100/70 px-1 py-0.5 rounded text-blue-900">65-2.png</code>, etc.) or click to select:
                  </p>
                </div>
              </div>

              <div className="shrink-0 flex items-center gap-2 w-full sm:w-auto">
                <label className="grow sm:grow-0 px-4 py-2.5 bg-[#003399] hover:bg-[#002673] text-white rounded-xl font-black text-xs cursor-pointer transition-all shadow-sm flex items-center justify-center gap-2">
                  <Upload className="w-4 h-4" />
                  <span>Select All 17 Files</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    disabled={isProcessing}
                    onChange={(e) => e.target.files && handleBatchFiles(e.target.files)}
                  />
                </label>
              </div>
            </div>

            {/* Quick Status Bar */}
            <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-600">Progress:</span>
                <span className="font-black text-[#001f5c]">{verified17Count} of 17</span>
                <span className="text-slate-500">verified candidate photos applied</span>
              </div>
              <div className="w-full sm:w-48 bg-slate-200 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-emerald-500 h-full transition-all duration-300" 
                  style={{ width: `${(verified17Count / 17) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Feedback message banner */}
          {batchNotice && (
            <div className={`p-3 rounded-xl text-xs font-bold flex items-center gap-2 border ${
              batchNotice.type === 'success' 
                ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
                : 'bg-blue-50 border-blue-200 text-blue-800'
            }`}>
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>{batchNotice.message}</span>
            </div>
          )}

          {isProcessing && (
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs font-bold text-[#003399] flex items-center gap-2">
              <RefreshCw className="w-4 h-4 animate-spin shrink-0 text-[#003399]" />
              <span>Optimizing and saving photo data...</span>
            </div>
          )}
        </div>

        {/* Action Controls & Candidate Filter */}
        <div className="px-5 py-3 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black text-slate-700">Candidates Checklist</span>
            {verified17Count > 0 && (
              <button
                onClick={handleResetAll}
                className="px-2.5 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-lg font-bold text-[11px] cursor-pointer transition-colors flex items-center gap-1"
              >
                <Trash2 className="w-3 h-3" />
                <span>Reset to Defaults</span>
              </button>
            )}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search candidate or filename..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#003399]/20"
            />
          </div>
        </div>

        {/* Candidate List Scrollable Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-3 grow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {filteredCandidates.map((story, idx) => {
              const currentPhoto = customPhotos[story.id] || story.studentPhoto;
              const isCustom = Boolean(customPhotos[story.id]);

              return (
                <div
                  key={story.id}
                  className={`p-3.5 rounded-2xl border transition-all flex items-center gap-3.5 ${
                    isCustom 
                      ? 'bg-emerald-50/50 border-emerald-300 shadow-2xs' 
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {/* Photo & Upload Button */}
                  <div className="relative shrink-0 group/photo">
                    <img
                      src={currentPhoto}
                      alt={story.studentName}
                      className="w-16 h-16 rounded-xl object-cover border-2 border-white shadow-xs"
                    />
                    <label 
                      className="absolute inset-0 bg-slate-950/70 rounded-xl opacity-0 group-hover/photo:opacity-100 transition-opacity flex flex-col items-center justify-center cursor-pointer text-white text-[9px] font-bold p-1 text-center"
                      title="Upload photo for this candidate"
                    >
                      <Camera className="w-4 h-4 text-sky-300 mb-0.5" />
                      <span>Change</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleSingleUpload(story.id, e)}
                      />
                    </label>

                    {isCustom && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-white text-white flex items-center justify-center text-[10px] font-black">
                        ✓
                      </div>
                    )}
                  </div>

                  {/* Candidate Info */}
                  <div className="grow min-w-0 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black text-slate-400">#{idx + 1}</span>
                      <h4 className="text-sm font-black text-slate-900 truncate">
                        {story.studentName}
                      </h4>
                      {isCustom ? (
                        <span className="px-1.5 py-0.2 bg-emerald-100 text-emerald-800 rounded font-black text-[9px]">
                          Photo Applied
                        </span>
                      ) : (
                        <span className="px-1.5 py-0.2 bg-amber-100 text-amber-800 rounded font-bold text-[9px]">
                          Pending
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-blue-700 font-bold truncate">
                      <span>{story.roleDesignation}</span>
                      <span>•</span>
                      <BankLogoBadge bankCode={story.bankLogo} bankName={story.hiredBank} size="sm" />
                    </div>

                    {story.originalFlyerFile && (
                      <div className="flex items-center gap-1 text-[11px] text-slate-500 font-mono truncate">
                        <span className="text-slate-400">File:</span>
                        <span className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-700 text-[10px]">
                          {story.originalFlyerFile}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Upload Action Button */}
                  <div className="shrink-0">
                    <label className="px-3 py-1.5 bg-slate-100 hover:bg-[#003399] hover:text-white text-slate-700 rounded-xl font-bold text-xs cursor-pointer transition-colors flex items-center gap-1">
                      <Upload className="w-3.5 h-3.5" />
                      <span>{isCustom ? 'Replace' : 'Upload'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleSingleUpload(story.id, e)}
                      />
                    </label>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <div className="text-xs text-slate-500 hidden sm:block">
            All images are compressed and stored locally in your browser session.
          </div>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-[#001f5c] hover:bg-[#003399] text-white rounded-xl font-black text-xs transition-colors cursor-pointer ml-auto"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
