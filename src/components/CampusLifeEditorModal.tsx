import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Upload, 
  Camera, 
  RotateCcw, 
  CheckCircle2, 
  Sparkles, 
  GraduationCap, 
  Link as LinkIcon, 
  FileText, 
  Image as ImageIcon, 
  Check, 
  AlertCircle,
  Users,
  Edit3
} from 'lucide-react';
import { 
  CampusLifeSectionText, 
  CustomCampusLifeItem, 
  getCampusLifeSectionText, 
  saveCampusLifeSectionText, 
  resetCampusLifeSectionText, 
  getMergedCampusLifeList, 
  saveCustomCampusLifeItem, 
  uploadCampusLifeImage, 
  resetCampusLifeItem, 
  resetEntireCampusLifeSection,
  DEFAULT_CAMPUS_LIFE_SECTION_TEXT
} from '../utils/campusLifeSectionStorage';

interface CampusLifeEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'text' | 'photos';
  focusedItemId?: string | null;
}

export const CampusLifeEditorModal: React.FC<CampusLifeEditorModalProps> = ({
  isOpen,
  onClose,
  defaultTab = 'text',
  focusedItemId = null
}) => {
  const [activeTab, setActiveTab] = useState<'text' | 'photos'>(defaultTab);
  const [sectionText, setSectionText] = useState<CampusLifeSectionText>(DEFAULT_CAMPUS_LIFE_SECTION_TEXT);
  const [items, setItems] = useState<CustomCampusLifeItem[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'info' } | null>(null);
  
  // Custom URL inputs for each item
  const [urlInputs, setUrlInputs] = useState<Record<string, string>>({});
  // Editing state for card details (caption, tag)
  const [editedDetails, setEditedDetails] = useState<Record<string, { caption: string; tag: string }>>({});
  
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  useEffect(() => {
    if (isOpen) {
      setSectionText(getCampusLifeSectionText());
      const currentList = getMergedCampusLifeList();
      setItems(currentList);
      setActiveTab(defaultTab);

      // Initialize edited details
      const initialDetails: Record<string, { caption: string; tag: string }> = {};
      currentList.forEach(item => {
        initialDetails[item.id] = {
          caption: item.caption,
          tag: item.tag
        };
      });
      setEditedDetails(initialDetails);
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
    saveCampusLifeSectionText(sectionText);
    showToast('Campus life heading & text updated successfully!');
  };

  // Reset Text Changes
  const handleResetText = () => {
    const def = resetCampusLifeSectionText();
    setSectionText(def);
    showToast('Heading text reset to official defaults.', 'info');
  };

  // Upload Photo for a specific item
  const handlePhotoUpload = async (itemId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsProcessing(true);
      await uploadCampusLifeImage(itemId, file);
      setItems(getMergedCampusLifeList());
      showToast(`Photo updated successfully for ${editedDetails[itemId]?.tag || 'item'}!`);
    } catch (err) {
      console.error('Failed to upload image:', err);
      showToast('Error uploading image. Please try another image.', 'info');
    } finally {
      setIsProcessing(false);
    }
  };

  // Apply custom Image URL
  const handleApplyUrl = async (itemId: string) => {
    const url = urlInputs[itemId]?.trim();
    if (!url) return;

    try {
      setIsProcessing(true);
      await saveCustomCampusLifeItem(itemId, { image: url });
      setItems(getMergedCampusLifeList());
      setUrlInputs((prev) => ({ ...prev, [itemId]: '' }));
      showToast('Image URL applied successfully!');
    } catch (err) {
      console.error('Failed to apply image URL:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  // Save Card Caption and Tag
  const handleSaveCardDetails = async (itemId: string) => {
    const details = editedDetails[itemId];
    if (!details) return;

    try {
      await saveCustomCampusLifeItem(itemId, {
        caption: details.caption.trim(),
        tag: details.tag.trim()
      });
      setItems(getMergedCampusLifeList());
      showToast('Card details saved!');
    } catch (err) {
      console.error('Failed to save card details:', err);
    }
  };

  // Reset a specific card back to original default
  const handleResetCard = async (itemId: string) => {
    await resetCampusLifeItem(itemId);
    const updated = getMergedCampusLifeList();
    setItems(updated);
    const resetItem = updated.find(i => i.id === itemId);
    if (resetItem) {
      setEditedDetails(prev => ({
        ...prev,
        [itemId]: { caption: resetItem.caption, tag: resetItem.tag }
      }));
    }
    showToast('Card reset to default asset and text.', 'info');
  };

  // Reset entire campus life section
  const handleResetEntireSection = async () => {
    if (window.confirm('Reset all campus life photos and headings to original defaults?')) {
      await resetEntireCampusLifeSection();
      setSectionText(DEFAULT_CAMPUS_LIFE_SECTION_TEXT);
      const updated = getMergedCampusLifeList();
      setItems(updated);
      showToast('All campus life photos and text reset to defaults.', 'info');
    }
  };

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
              <GraduationCap className="w-3.5 h-3.5 text-[#ffcc00]" />
              <span>BankPlus Campus Life Customizer</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              Edit BankPlus Campus Life & Classrooms
            </h2>
            <p className="text-blue-200 text-xs max-w-xl">
              Customize the section headline, subtitle, and replace all 6 campus classroom photos with your own institution images.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer self-end sm:self-center"
            title="Close Editor"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 pt-3 gap-2">
          <button
            onClick={() => setActiveTab('text')}
            className={`px-4 py-2.5 font-bold text-xs rounded-t-xl transition-all flex items-center gap-2 cursor-pointer border-t border-x ${
              activeTab === 'text'
                ? 'bg-white text-[#001f5c] border-slate-200 border-b-white -mb-px shadow-xs'
                : 'text-slate-600 hover:text-slate-900 border-transparent hover:bg-slate-100'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-[#003399]" />
            <span>Section Heading & Text</span>
          </button>

          <button
            onClick={() => setActiveTab('photos')}
            className={`px-4 py-2.5 font-bold text-xs rounded-t-xl transition-all flex items-center gap-2 cursor-pointer border-t border-x ${
              activeTab === 'photos'
                ? 'bg-white text-[#001f5c] border-slate-200 border-b-white -mb-px shadow-xs'
                : 'text-slate-600 hover:text-slate-900 border-transparent hover:bg-slate-100'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5 text-blue-600" />
            <span>Campus Photos & Cards ({items.length})</span>
          </button>
        </div>

        {/* Toast Alert */}
        {toastMessage && (
          <div className="mx-6 mt-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{toastMessage.text}</span>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto grow space-y-6">
          {/* TAB 1: SECTION HEADING & TEXT */}
          {activeTab === 'text' && (
            <div className="space-y-6">
              <div className="bg-blue-50/60 p-4 rounded-2xl border border-blue-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase text-[#003399] tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#ffcc00]" />
                    <span>Live Preview of Section Header</span>
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">Updates in real-time</span>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200 text-center space-y-2 shadow-xs">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#003399] text-xs font-bold border border-blue-200">
                    <Users className="w-3.5 h-3.5" />
                    <span>{sectionText.eyebrow}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-[#001f5c]">
                    {sectionText.heading}
                  </h3>
                  <p className="text-slate-600 text-xs max-w-xl mx-auto">
                    {sectionText.subtitle}
                  </p>
                </div>
              </div>

              {/* Edit Form */}
              <div className="space-y-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                <h4 className="text-sm font-black text-slate-900 border-b border-slate-100 pb-2">
                  Edit Header Text Content
                </h4>

                {/* Eyebrow */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Top Eyebrow Badge Text
                  </label>
                  <input
                    type="text"
                    value={sectionText.eyebrow}
                    onChange={(e) => setSectionText((prev) => ({ ...prev, eyebrow: e.target.value }))}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#003399] focus:border-transparent font-semibold"
                    placeholder="e.g. Student-Friendly Atmosphere"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">Small badge pill displayed directly above the heading.</p>
                </div>

                {/* Main Heading */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Main Heading Title
                  </label>
                  <input
                    type="text"
                    value={sectionText.heading}
                    onChange={(e) => setSectionText((prev) => ({ ...prev, heading: e.target.value }))}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#003399] focus:border-transparent font-black text-slate-900"
                    placeholder="e.g. Inside BankPlus Campus Life & Learning Centres"
                  />
                </div>

                {/* Subtitle */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Subtitle / Description Paragraph
                  </label>
                  <textarea
                    rows={3}
                    value={sectionText.subtitle}
                    onChange={(e) => setSectionText((prev) => ({ ...prev, subtitle: e.target.value }))}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#003399] focus:border-transparent text-slate-700"
                    placeholder="Describe what visitors can expect in your campus environment..."
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={handleResetText}
                    className="px-3.5 py-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset Heading to Default</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleSaveText}
                    className="px-6 py-2.5 rounded-xl bg-[#001f5c] hover:bg-[#003399] text-white font-bold text-xs flex items-center gap-2 shadow-md transition-all cursor-pointer hover:scale-102"
                  >
                    <Check className="w-4 h-4" />
                    <span>Save Heading Changes</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CAMPUS LIFE IMAGES & CARDS */}
          {activeTab === 'photos' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div>
                  <h4 className="text-sm font-black text-slate-900">
                    Replace & Manage Campus Life Photos
                  </h4>
                  <p className="text-xs text-slate-500">
                    Upload your high-resolution institute classrooms, computer labs, student cohort study groups, and mock interview rooms.
                  </p>
                </div>

                <button
                  onClick={handleResetEntireSection}
                  className="px-3 py-1.5 rounded-xl text-red-600 hover:bg-red-50 border border-red-200 text-xs font-bold flex items-center gap-1.5 cursor-pointer shrink-0"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset All to Defaults</span>
                </button>
              </div>

              {/* Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {items.map((item, idx) => {
                  const details = editedDetails[item.id] || { caption: item.caption, tag: item.tag };
                  const isFocused = focusedItemId === item.id;

                  return (
                    <div 
                      key={item.id}
                      className={`bg-white rounded-2xl border p-4 space-y-3 transition-all ${
                        isFocused 
                          ? 'border-[#003399] ring-2 ring-blue-400 shadow-md' 
                          : 'border-slate-200 hover:border-slate-300 shadow-xs'
                      }`}
                    >
                      {/* Hidden File Input */}
                      <input
                        type="file"
                        accept="image/*"
                        ref={(el) => (fileInputRefs.current[item.id] = el)}
                        onChange={(e) => handlePhotoUpload(item.id, e)}
                        className="hidden"
                      />

                      {/* Header Info */}
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-[#001f5c] flex items-center gap-1.5">
                          <span className="w-5 h-5 rounded-full bg-blue-100 text-[#003399] flex items-center justify-center text-[10px]">
                            {idx + 1}
                          </span>
                          <span>Campus Card #{idx + 1}</span>
                        </span>

                        <span className="px-2 py-0.5 rounded-full bg-blue-50 text-[#003399] text-[10px] font-bold border border-blue-200">
                          {details.tag}
                        </span>
                      </div>

                      {/* Image Preview & Upload Button */}
                      <div className="relative h-44 rounded-xl overflow-hidden bg-slate-900 group">
                        <img 
                          src={item.image} 
                          alt={item.caption}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/20 transition-colors"></div>

                        {/* Top Tag overlay */}
                        <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-slate-900/80 text-white text-[10px] font-bold">
                          {details.tag}
                        </div>

                        {/* Upload Button overlay */}
                        <button
                          type="button"
                          onClick={() => fileInputRefs.current[item.id]?.click()}
                          disabled={isProcessing}
                          className="absolute inset-0 flex items-center justify-center bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity text-white text-xs font-bold gap-2 cursor-pointer"
                        >
                          <Camera className="w-4 h-4 text-[#ffcc00]" />
                          <span>Click to Upload New Photo</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => fileInputRefs.current[item.id]?.click()}
                          className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-lg bg-white/95 hover:bg-white text-slate-900 hover:text-[#003399] text-[11px] font-bold flex items-center gap-1.5 shadow-md cursor-pointer transition-transform hover:scale-105"
                        >
                          <Camera className="w-3.5 h-3.5 text-[#003399]" />
                          <span>Upload Photo</span>
                        </button>
                      </div>

                      {/* URL input fallback */}
                      <div className="flex items-center gap-1.5">
                        <div className="relative grow">
                          <LinkIcon className="w-3 h-3 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                          <input
                            type="url"
                            value={urlInputs[item.id] || ''}
                            onChange={(e) => setUrlInputs((prev) => ({ ...prev, [item.id]: e.target.value }))}
                            placeholder="Or paste image URL (https://...)"
                            className="w-full pl-7 pr-2 py-1 text-[11px] rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#003399]"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => handleApplyUrl(item.id)}
                          className="px-2.5 py-1 text-[11px] bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg cursor-pointer transition-colors shrink-0"
                        >
                          Apply URL
                        </button>
                      </div>

                      {/* Tag & Caption Inputs */}
                      <div className="space-y-2 pt-1 border-t border-slate-100">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">
                            Tag / Category
                          </label>
                          <input
                            type="text"
                            value={details.tag}
                            onChange={(e) => setEditedDetails(prev => ({
                              ...prev,
                              [item.id]: { ...details, tag: e.target.value }
                            }))}
                            className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 font-bold text-slate-800"
                            placeholder="e.g. Classroom Life"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">
                            Caption Description
                          </label>
                          <textarea
                            rows={2}
                            value={details.caption}
                            onChange={(e) => setEditedDetails(prev => ({
                              ...prev,
                              [item.id]: { ...details, caption: e.target.value }
                            }))}
                            className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 text-slate-700"
                            placeholder="Describe this campus activity or lab facility..."
                          />
                        </div>

                        <div className="flex items-center justify-between pt-2">
                          <button
                            type="button"
                            onClick={() => handleResetCard(item.id)}
                            className="text-[11px] font-bold text-slate-400 hover:text-slate-700 flex items-center gap-1 cursor-pointer"
                          >
                            <RotateCcw className="w-3 h-3" />
                            <span>Reset Card</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleSaveCardDetails(item.id)}
                            className="px-3 py-1 rounded-lg bg-[#001f5c] hover:bg-[#003399] text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
                          >
                            <Check className="w-3 h-3" />
                            <span>Save Card</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 p-4 border-t border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Changes persist automatically across all pages</span>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs cursor-pointer shadow-xs"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
