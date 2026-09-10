import React, { useState, useEffect } from 'react';
import { 
  X, Upload, Camera, Trash2, CheckCircle2, Sparkles, 
  RefreshCw, Video, School, AlertCircle
} from 'lucide-react';
import { INSTAGRAM_STUDENT_REELS, STUDENT_COMMUNITY_GALLERY } from '../data/mockData';
import { 
  getDrillClassroomPhotos, 
  saveDrillClassroomPhoto, 
  clearDrillClassroomPhotos, 
  compressImage, 
  matchDrillOrClassroomFile 
} from '../utils/photoStorage';

interface ClassroomPhotoManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'drills' | 'classroom';
}

export const ClassroomPhotoManagerModal: React.FC<ClassroomPhotoManagerModalProps> = ({
  isOpen,
  onClose,
  defaultTab = 'drills',
}) => {
  const [activeTab, setActiveTab] = useState<'drills' | 'classroom'>(defaultTab);
  const [customPhotos, setCustomPhotos] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [batchNotice, setBatchNotice] = useState<{ type: 'success' | 'info'; message: string } | null>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setCustomPhotos(getDrillClassroomPhotos());
      setActiveTab(defaultTab);
    }
  }, [isOpen, defaultTab]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Single file upload handler
  const handleSingleUpload = async (key: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsProcessing(true);
      const compressedDataUrl = await compressImage(file, 900, 0.88);
      await saveDrillClassroomPhoto(key, compressedDataUrl);
      setCustomPhotos((prev) => ({ ...prev, [key]: compressedDataUrl }));
      setBatchNotice({
        type: 'success',
        message: 'Photo updated successfully and saved in browser storage!'
      });
      setTimeout(() => setBatchNotice(null), 3000);
    } catch (err) {
      console.error(err);
      setBatchNotice({
        type: 'info',
        message: 'Could not process image file. Please use a standard JPEG or PNG.'
      });
    } finally {
      setIsProcessing(false);
    }
  };

  // Batch drop or multi-file selection
  const handleBatchFiles = async (fileList: FileList | File[]) => {
    const files = Array.from(fileList);
    if (files.length === 0) return;

    setIsProcessing(true);
    let matchedCount = 0;
    const newPhotos: Record<string, string> = { ...customPhotos };

    // Keep track of what has been assigned in this batch
    const usedKeys = new Set<string>();

    for (const file of files) {
      try {
        const match = matchDrillOrClassroomFile(file.name);
        let targetKey = match?.targetKey;

        // If no direct filename match, assign to next unassigned slot
        if (!targetKey || usedKeys.has(targetKey)) {
          // Check drills first
          const unassignedDrill = INSTAGRAM_STUDENT_REELS.find(
            (r) => !newPhotos[`drill-${r.id}`] && !usedKeys.has(`drill-${r.id}`)
          );
          if (unassignedDrill) {
            targetKey = `drill-${unassignedDrill.id}`;
          } else {
            // Check classroom
            const unassignedClassroom = STUDENT_COMMUNITY_GALLERY.slice(0, 5).find(
              (g) => !newPhotos[`classroom-${g.id}`] && !usedKeys.has(`classroom-${g.id}`)
            );
            if (unassignedClassroom) {
              targetKey = `classroom-${unassignedClassroom.id}`;
            }
          }
        }

        if (targetKey) {
          const compressed = await compressImage(file, 900, 0.88);
          await saveDrillClassroomPhoto(targetKey, compressed);
          newPhotos[targetKey] = compressed;
          usedKeys.add(targetKey);
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
      message: `Successfully matched & applied ${matchedCount} photo${matchedCount > 1 ? 's' : ''} across Drills & Classroom!`
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
    if (window.confirm('Reset all custom student drills and classroom photos back to default assets?')) {
      await clearDrillClassroomPhotos();
      setCustomPhotos({});
      setBatchNotice({
        type: 'info',
        message: 'All drill and classroom photos have been reset to system defaults.'
      });
      setTimeout(() => setBatchNotice(null), 3000);
    }
  };

  // Counts
  const drillAppliedCount = INSTAGRAM_STUDENT_REELS.filter((r) => customPhotos[`drill-${r.id}`]).length;
  const classroomAppliedCount = STUDENT_COMMUNITY_GALLERY.slice(0, 5).filter((g) => customPhotos[`classroom-${g.id}`]).length;
  const totalApplied = drillAppliedCount + classroomAppliedCount;

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
              <span>Drills & Classroom Environment Photos</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              Manage Student Drills & Campus Life Photos
            </h2>
            <p className="text-xs text-blue-200">
              Update photos for 4 Speed Drills/Reels and 5 Classroom & CBT Lab cards using your 9 uploaded photos or any custom images.
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

        {/* 1-Click Dropzone Banner for 9 uploaded images */}
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
                    Batch Apply All 9 Uploaded Photos
                  </h4>
                  <p className="text-xs text-slate-600">
                    Drop your 9 WhatsApp photos here (<code className="text-[11px] font-mono bg-blue-100/70 px-1 py-0.5 rounded text-blue-900">IMG-20260907-WA0024.jpg</code>, <code className="text-[11px] font-mono bg-blue-100/70 px-1 py-0.5 rounded text-blue-900">WA0025</code>, etc.) or click to select:
                  </p>
                </div>
              </div>

              <div className="shrink-0 flex items-center gap-2 w-full sm:w-auto">
                <label className="grow sm:grow-0 px-4 py-2.5 bg-[#003399] hover:bg-[#002673] text-white rounded-xl font-black text-xs cursor-pointer transition-all shadow-sm flex items-center justify-center gap-2">
                  <Upload className="w-4 h-4" />
                  <span>Select 9 Files</span>
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

            {/* Quick Progress Bar */}
            <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-600">Status:</span>
                <span className="font-black text-[#001f5c]">{totalApplied} of 9</span>
                <span className="text-slate-500">custom photos applied ({drillAppliedCount} drills, {classroomAppliedCount} classroom)</span>
              </div>
              <div className="w-full sm:w-48 bg-slate-200 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-emerald-500 h-full transition-all duration-300" 
                  style={{ width: `${(totalApplied / 9) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Feedback banner */}
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
              <span>Compressing and updating photo storage...</span>
            </div>
          )}
        </div>

        {/* Tab Selection & Reset Button */}
        <div className="px-5 py-3 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 bg-slate-200/70 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab('drills')}
              className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'drills'
                  ? 'bg-white text-[#001f5c] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Video className="w-3.5 h-3.5 text-pink-600" />
              <span>Student Drills & Reels ({drillAppliedCount}/4)</span>
            </button>
            <button
              onClick={() => setActiveTab('classroom')}
              className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'classroom'
                  ? 'bg-white text-[#001f5c] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <School className="w-3.5 h-3.5 text-[#003399]" />
              <span>Classroom & Lab Life ({classroomAppliedCount}/5)</span>
            </button>
          </div>

          {totalApplied > 0 && (
            <button
              onClick={handleResetAll}
              className="px-2.5 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-lg font-bold text-[11px] cursor-pointer transition-colors flex items-center gap-1"
            >
              <Trash2 className="w-3 h-3" />
              <span>Reset All Photos</span>
            </button>
          )}
        </div>

        {/* Scrollable list */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-3 grow">
          {activeTab === 'drills' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {INSTAGRAM_STUDENT_REELS.map((reel, idx) => {
                const storageKey = `drill-${reel.id}`;
                const currentPhoto = customPhotos[storageKey] || reel.thumbnail;
                const isCustom = Boolean(customPhotos[storageKey]);

                return (
                  <div
                    key={reel.id}
                    className={`p-3.5 rounded-2xl border transition-all flex items-center gap-3.5 ${
                      isCustom 
                        ? 'bg-emerald-50/50 border-emerald-300 shadow-2xs' 
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {/* Thumbnail & Upload */}
                    <div className="relative shrink-0 group/photo w-20 h-24 bg-slate-900 rounded-xl overflow-hidden">
                      <img
                        src={currentPhoto}
                        alt={reel.title}
                        onError={(e) => {
                          if (reel.fallbackThumbnail) {
                            e.currentTarget.src = reel.fallbackThumbnail;
                          }
                        }}
                        className="w-full h-full object-cover"
                      />
                      <label 
                        className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover/photo:opacity-100 transition-opacity flex flex-col items-center justify-center cursor-pointer text-white text-[9px] font-bold p-1 text-center"
                        title="Upload replacement photo"
                      >
                        <Camera className="w-4 h-4 text-sky-300 mb-0.5" />
                        <span>Change</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleSingleUpload(storageKey, e)}
                        />
                      </label>

                      {isCustom && (
                        <div className="absolute top-1 right-1 w-4 h-4 bg-emerald-500 rounded-full border border-white text-white flex items-center justify-center text-[9px] font-black">
                          ✓
                        </div>
                      )}
                    </div>

                    {/* Drill Details */}
                    <div className="grow min-w-0 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black text-slate-400">Drill #{idx + 1}</span>
                        <span className="px-1.5 py-0.2 rounded bg-pink-100 text-pink-800 text-[9px] font-bold">
                          {reel.duration}
                        </span>
                        {isCustom ? (
                          <span className="px-1.5 py-0.2 bg-emerald-100 text-emerald-800 rounded font-black text-[9px]">
                            Custom Photo Applied
                          </span>
                        ) : (
                          <span className="px-1.5 py-0.2 bg-slate-100 text-slate-600 rounded font-bold text-[9px]">
                            Default Asset
                          </span>
                        )}
                      </div>

                      <h4 className="text-xs font-bold text-slate-900 line-clamp-2 leading-tight">
                        {reel.title}
                      </h4>

                      <p className="text-[11px] text-blue-700 font-bold truncate">
                        {reel.studentName} • {reel.location}
                      </p>

                      {reel.fileName && (
                        <div className="flex items-center gap-1 text-[10px] text-slate-500 font-mono truncate">
                          <span className="text-slate-400">Target File:</span>
                          <span className="bg-slate-100 px-1 py-0.2 rounded text-slate-700">
                            {reel.fileName}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Upload Action */}
                    <div className="shrink-0">
                      <label className="px-3 py-1.5 bg-slate-100 hover:bg-[#003399] hover:text-white text-slate-700 rounded-xl font-bold text-xs cursor-pointer transition-colors flex items-center gap-1">
                        <Upload className="w-3.5 h-3.5" />
                        <span>{isCustom ? 'Replace' : 'Upload'}</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleSingleUpload(storageKey, e)}
                        />
                      </label>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {STUDENT_COMMUNITY_GALLERY.slice(0, 5).map((item, idx) => {
                const storageKey = `classroom-${item.id}`;
                const currentPhoto = customPhotos[storageKey] || item.image;
                const isCustom = Boolean(customPhotos[storageKey]);

                return (
                  <div
                    key={item.id}
                    className={`p-3.5 rounded-2xl border transition-all flex items-center gap-3.5 ${
                      isCustom 
                        ? 'bg-emerald-50/50 border-emerald-300 shadow-2xs' 
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {/* Thumbnail & Upload */}
                    <div className="relative shrink-0 group/photo w-24 h-20 bg-slate-100 rounded-xl overflow-hidden">
                      <img
                        src={currentPhoto}
                        alt={item.caption}
                        onError={(e) => {
                          if (item.fallbackImage) {
                            e.currentTarget.src = item.fallbackImage;
                          }
                        }}
                        className="w-full h-full object-cover"
                      />
                      <label 
                        className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover/photo:opacity-100 transition-opacity flex flex-col items-center justify-center cursor-pointer text-white text-[9px] font-bold p-1 text-center"
                        title="Upload replacement photo"
                      >
                        <Camera className="w-4 h-4 text-sky-300 mb-0.5" />
                        <span>Change</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleSingleUpload(storageKey, e)}
                        />
                      </label>

                      {isCustom && (
                        <div className="absolute top-1 right-1 w-4 h-4 bg-emerald-500 rounded-full border border-white text-white flex items-center justify-center text-[9px] font-black">
                          ✓
                        </div>
                      )}
                    </div>

                    {/* Classroom Details */}
                    <div className="grow min-w-0 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black text-slate-400">Classroom #{idx + 1}</span>
                        <span className="px-1.5 py-0.2 rounded bg-blue-100 text-blue-800 text-[9px] font-bold">
                          {item.tag}
                        </span>
                        {isCustom ? (
                          <span className="px-1.5 py-0.2 bg-emerald-100 text-emerald-800 rounded font-black text-[9px]">
                            Custom Photo Applied
                          </span>
                        ) : (
                          <span className="px-1.5 py-0.2 bg-slate-100 text-slate-600 rounded font-bold text-[9px]">
                            Default Asset
                          </span>
                        )}
                      </div>

                      <p className="text-xs font-bold text-slate-900 line-clamp-2 leading-tight">
                        {item.caption}
                      </p>

                      {item.fileName && (
                        <div className="flex items-center gap-1 text-[10px] text-slate-500 font-mono truncate">
                          <span className="text-slate-400">Target File:</span>
                          <span className="bg-slate-100 px-1 py-0.2 rounded text-slate-700">
                            {item.fileName}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Upload Action */}
                    <div className="shrink-0">
                      <label className="px-3 py-1.5 bg-slate-100 hover:bg-[#003399] hover:text-white text-slate-700 rounded-xl font-bold text-xs cursor-pointer transition-colors flex items-center gap-1">
                        <Upload className="w-3.5 h-3.5" />
                        <span>{isCustom ? 'Replace' : 'Upload'}</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleSingleUpload(storageKey, e)}
                        />
                      </label>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <div className="text-xs text-slate-500 hidden sm:block">
            Images are saved in your local browser storage (IndexedDB). Static files can also be placed in <code className="font-mono text-slate-700 bg-slate-200/70 px-1 py-0.5 rounded">public/assets/drills/</code> and <code className="font-mono text-slate-700 bg-slate-200/70 px-1 py-0.5 rounded">public/assets/classroom/</code>.
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
