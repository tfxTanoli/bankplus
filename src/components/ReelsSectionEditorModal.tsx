import React, { useState, useEffect } from 'react';
import { 
  X, 
  Upload, 
  Camera, 
  RotateCcw, 
  CheckCircle2, 
  Sparkles, 
  Facebook, 
  Link as LinkIcon, 
  FileText, 
  Image as ImageIcon,
  ExternalLink,
  Play,
  Check,
  AlertCircle
} from 'lucide-react';
import { 
  ReelsSectionText, 
  CustomReelItem, 
  getReelsSectionText, 
  saveReelsSectionText, 
  resetReelsSectionText, 
  getMergedReelsList, 
  saveCustomReelItem, 
  uploadReelImage, 
  resetReelItem, 
  resetEntireReelsSection,
  DEFAULT_REELS_SECTION_TEXT
} from '../utils/reelsSectionStorage';

interface ReelsSectionEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'text' | 'photos';
  focusedReelId?: string | null;
}

export const ReelsSectionEditorModal: React.FC<ReelsSectionEditorModalProps> = ({
  isOpen,
  onClose,
  defaultTab = 'text',
  focusedReelId = null
}) => {
  const [activeTab, setActiveTab] = useState<'text' | 'photos'>(defaultTab);
  const [sectionText, setSectionText] = useState<ReelsSectionText>(DEFAULT_REELS_SECTION_TEXT);
  const [reels, setReels] = useState<CustomReelItem[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'info' } | null>(null);
  
  // Custom URL inputs for each reel
  const [urlInputs, setUrlInputs] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isOpen) {
      setSectionText(getReelsSectionText());
      setReels(getMergedReelsList());
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

  const showToast = (text: string, type: 'success' | 'info' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Save Text Changes
  const handleSaveText = () => {
    saveReelsSectionText(sectionText);
    showToast('Section heading & text updated successfully!');
  };

  // Reset Text Changes
  const handleResetText = () => {
    const def = resetReelsSectionText();
    setSectionText(def);
    showToast('Heading text reset to official defaults.', 'info');
  };

  // Upload Photo for a specific Reel
  const handlePhotoUpload = async (reelId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsProcessing(true);
      await uploadReelImage(reelId, file);
      setReels(getMergedReelsList());
      showToast('Image uploaded and optimized successfully!');
    } catch (err) {
      console.error(err);
      showToast('Could not process image. Please try another JPEG/PNG file.', 'info');
    } finally {
      setIsProcessing(false);
    }
  };

  // Apply URL for a specific Reel
  const handleApplyUrl = async (reelId: string) => {
    const url = urlInputs[reelId]?.trim();
    if (!url) return;

    try {
      setIsProcessing(true);
      await saveCustomReelItem(reelId, { thumbnail: url });
      setReels(getMergedReelsList());
      setUrlInputs(prev => ({ ...prev, [reelId]: '' }));
      showToast('Image URL applied successfully!');
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  // Update text field on a reel card
  const handleUpdateReelField = async (reelId: string, field: keyof CustomReelItem, value: string) => {
    await saveCustomReelItem(reelId, { [field]: value });
    setReels(getMergedReelsList());
  };

  // Reset single reel
  const handleResetReel = async (reelId: string) => {
    await resetReelItem(reelId);
    setReels(getMergedReelsList());
    showToast('Card restored to original default.', 'info');
  };

  // Reset entire section
  const handleResetAll = async () => {
    if (window.confirm('Reset all custom headings and photos back to official system defaults?')) {
      await resetEntireReelsSection();
      setSectionText(DEFAULT_REELS_SECTION_TEXT);
      setReels(getMergedReelsList());
      showToast('Entire section restored to original defaults.', 'info');
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col my-auto max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 bg-[#001f5c] text-white flex items-center justify-between shrink-0 border-b border-blue-900">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-pink-500/20 text-pink-400 border border-pink-400/30 flex items-center justify-center">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black tracking-tight text-white flex items-center gap-2">
                Edit Reels Section
                <span className="text-[11px] font-bold bg-pink-500 text-white px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Live Customizer
                </span>
              </h3>
              <p className="text-xs text-blue-200">
                Update heading, description, button, and video card images directly
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            title="Close editor"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 pt-3 pb-0 bg-slate-50 border-b border-slate-200 flex items-center gap-2 shrink-0">
          <button
            onClick={() => setActiveTab('text')}
            className={`px-4 py-2.5 rounded-t-xl font-bold text-xs flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'text'
                ? 'border-[#003399] text-[#003399] bg-white shadow-xs'
                : 'border-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Heading & Description</span>
          </button>

          <button
            onClick={() => setActiveTab('photos')}
            className={`px-4 py-2.5 rounded-t-xl font-bold text-xs flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'photos'
                ? 'border-pink-600 text-pink-600 bg-white shadow-xs'
                : 'border-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Reel Images & Cards ({reels.length})</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto grow space-y-6">
          {/* Toast Notification */}
          {toastMessage && (
            <div className={`p-3.5 rounded-xl border flex items-center gap-3 text-xs font-bold animate-in fade-in slide-in-from-top-2 ${
              toastMessage.type === 'success' 
                ? 'bg-emerald-50 text-emerald-900 border-emerald-300' 
                : 'bg-blue-50 text-blue-900 border-blue-300'
            }`}>
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{toastMessage.text}</span>
            </div>
          )}

          {/* TAB 1: HEADING & TEXT */}
          {activeTab === 'text' && (
            <div className="space-y-6">
              {/* Form Fields */}
              <div className="space-y-4 bg-white p-5 rounded-2xl border border-slate-200">
                <div>
                  <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
                    Eyebrow / Category Tag
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-[#1877F2]">
                      <Facebook className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      value={sectionText.eyebrow}
                      onChange={(e) => setSectionText(prev => ({ ...prev, eyebrow: e.target.value }))}
                      placeholder="e.g. Direct From Official Facebook Reels"
                      className="w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl font-bold text-slate-900 focus:outline-hidden focus:border-pink-500 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
                    Main Heading
                  </label>
                  <textarea
                    rows={2}
                    value={sectionText.heading}
                    onChange={(e) => setSectionText(prev => ({ ...prev, heading: e.target.value }))}
                    placeholder="e.g. Selection Reactions & Speed Drills on @bankpluslearning"
                    className="w-full p-3 text-sm bg-slate-50 border border-slate-300 rounded-xl font-black text-slate-900 focus:outline-hidden focus:border-[#003399] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
                    Subtitle / Description
                  </label>
                  <textarea
                    rows={2}
                    value={sectionText.subtitle}
                    onChange={(e) => setSectionText(prev => ({ ...prev, subtitle: e.target.value }))}
                    placeholder="e.g. Watch authentic student reaction moments, 60-second speed maths drills..."
                    className="w-full p-3 text-sm bg-slate-50 border border-slate-300 rounded-xl text-slate-700 focus:outline-hidden focus:border-[#003399] focus:bg-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
                      Button Label
                    </label>
                    <input
                      type="text"
                      value={sectionText.buttonText}
                      onChange={(e) => setSectionText(prev => ({ ...prev, buttonText: e.target.value }))}
                      placeholder="e.g. Watch All Reels on Facebook"
                      className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl font-bold text-slate-900 focus:outline-hidden focus:border-pink-500 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
                      Facebook Page URL
                    </label>
                    <input
                      type="url"
                      value={sectionText.buttonLink}
                      onChange={(e) => setSectionText(prev => ({ ...prev, buttonLink: e.target.value }))}
                      placeholder="https://www.facebook.com/bankpluslearning/"
                      className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-hidden focus:border-pink-500 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={handleResetText}
                    className="text-xs text-slate-500 hover:text-slate-800 font-bold flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset Text to Defaults</span>
                  </button>

                  <button
                    onClick={handleSaveText}
                    className="px-5 py-2.5 rounded-xl bg-[#001f5c] hover:bg-[#003399] text-white font-bold text-xs flex items-center gap-2 transition-colors cursor-pointer shadow-md"
                  >
                    <Check className="w-4 h-4" />
                    <span>Save Text Changes</span>
                  </button>
                </div>
              </div>

              {/* Live Preview Box */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-pink-50/50 via-slate-50 to-blue-50/50 border border-pink-200">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-3">
                  Live Header Preview
                </span>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-200/80 pb-4">
                  <div>
                    <div className="inline-flex items-center gap-1.5 text-xs font-black text-[#1877F2] uppercase tracking-wider mb-1">
                      <Facebook className="w-4 h-4" />
                      <span>{sectionText.eyebrow}</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                      {sectionText.heading}
                    </h2>
                    <p className="text-xs text-slate-600 mt-1 max-w-2xl">
                      {sectionText.subtitle}
                    </p>
                  </div>

                  <span className="px-4 py-2 rounded-xl bg-blue-50 text-blue-700 font-bold text-xs flex items-center gap-1.5 border border-blue-200 shrink-0">
                    <Facebook className="w-4 h-4" />
                    <span>{sectionText.buttonText}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: REEL IMAGES & CARDS */}
          {activeTab === 'photos' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900 flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-[#003399] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block">Instant Photo Replacement:</span>
                  You can upload any photo directly from your device (JPG, PNG, WebP) or paste an image URL. Images are automatically compressed so they load fast and persist securely in your browser!
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {reels.map((reel, index) => {
                  const isFocused = focusedReelId === reel.id;

                  return (
                    <div 
                      key={reel.id}
                      className={`bg-white rounded-2xl border p-4 shadow-xs space-y-4 transition-all ${
                        isFocused ? 'ring-2 ring-pink-500 border-pink-300' : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                        <span className="text-xs font-black text-slate-800 flex items-center gap-1.5">
                          <span className="w-5 h-5 rounded-full bg-pink-100 text-pink-700 text-[11px] font-black flex items-center justify-center">
                            {index + 1}
                          </span>
                          <span>Reel Card #{index + 1}</span>
                        </span>

                        <button
                          onClick={() => handleResetReel(reel.id)}
                          className="text-[11px] text-slate-400 hover:text-slate-700 font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                          title="Restore original default photo & text"
                        >
                          <RotateCcw className="w-3 h-3" />
                          <span>Reset</span>
                        </button>
                      </div>

                      {/* Image Thumbnail & Upload Controls */}
                      <div className="flex gap-4">
                        {/* Thumbnail Preview */}
                        <div className="relative w-28 h-38 rounded-xl overflow-hidden bg-slate-900 shrink-0 border border-slate-200 shadow-xs">
                          <img
                            src={reel.thumbnail}
                            alt={reel.title}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                          <div className="absolute top-1.5 left-1.5 bg-[#1877F2] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md flex items-center gap-0.5">
                            <Facebook className="w-2.5 h-2.5" />
                            <span>{reel.duration}</span>
                          </div>
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="w-7 h-7 rounded-full bg-white/90 text-[#1877F2] flex items-center justify-center shadow-xs">
                              <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                            </div>
                          </div>
                        </div>

                        {/* Upload & URL actions */}
                        <div className="grow space-y-2.5 text-xs">
                          <div>
                            <span className="font-bold text-slate-700 block mb-1">
                              Replace Image:
                            </span>
                            <label className="inline-flex items-center gap-1.5 px-3 py-2 bg-pink-50 hover:bg-pink-100 text-pink-700 rounded-xl font-bold border border-pink-200 cursor-pointer transition-colors w-full justify-center">
                              <Upload className="w-3.5 h-3.5" />
                              <span>{isProcessing ? 'Processing...' : 'Upload New Photo'}</span>
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                disabled={isProcessing}
                                onChange={(e) => handlePhotoUpload(reel.id, e)}
                              />
                            </label>
                          </div>

                          <div className="space-y-1">
                            <span className="text-[11px] text-slate-500 font-medium block">
                              Or use Image URL:
                            </span>
                            <div className="flex gap-1.5">
                              <input
                                type="url"
                                placeholder="https://..."
                                value={urlInputs[reel.id] || ''}
                                onChange={(e) => setUrlInputs(prev => ({ ...prev, [reel.id]: e.target.value }))}
                                className="grow px-2 py-1 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
                              />
                              <button
                                onClick={() => handleApplyUrl(reel.id)}
                                disabled={!urlInputs[reel.id]?.trim() || isProcessing}
                                className="px-2.5 py-1 bg-[#001f5c] hover:bg-[#003399] disabled:opacity-50 text-white rounded-lg font-bold text-xs cursor-pointer"
                              >
                                Apply
                              </button>
                            </div>
                          </div>

                          <div className="text-[11px] text-slate-400">
                            Duration: <span className="font-bold text-slate-700">{reel.duration}</span> • Views: <span className="font-bold text-emerald-600">{reel.views}</span>
                          </div>
                        </div>
                      </div>

                      {/* Card Content Fields */}
                      <div className="space-y-2 pt-1">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase">
                            Headline / Video Title
                          </label>
                          <input
                            type="text"
                            value={reel.title}
                            onChange={(e) => handleUpdateReelField(reel.id, 'title', e.target.value)}
                            className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg font-bold text-slate-900 focus:bg-white"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase">
                              Student Name
                            </label>
                            <input
                              type="text"
                              value={reel.studentName}
                              onChange={(e) => handleUpdateReelField(reel.id, 'studentName', e.target.value)}
                              className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg font-semibold text-slate-800 focus:bg-white"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase">
                              Role / Location
                            </label>
                            <input
                              type="text"
                              value={reel.role}
                              onChange={(e) => handleUpdateReelField(reel.id, 'role', e.target.value)}
                              className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:bg-white"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase">
                            Quote / Student Feedback
                          </label>
                          <textarea
                            rows={2}
                            value={reel.quote}
                            onChange={(e) => handleUpdateReelField(reel.id, 'quote', e.target.value)}
                            className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg italic text-slate-700 focus:bg-white"
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
          <button
            onClick={handleResetAll}
            className="text-xs text-rose-600 hover:text-rose-700 font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Entire Section</span>
          </button>

          <button
            onClick={() => {
              handleSaveText();
              onClose();
            }}
            className="px-6 py-2.5 rounded-xl bg-[#001f5c] hover:bg-[#003399] text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-md transition-all"
          >
            <Check className="w-4 h-4" />
            <span>Done & Apply</span>
          </button>
        </div>
      </div>
    </div>
  );
};
