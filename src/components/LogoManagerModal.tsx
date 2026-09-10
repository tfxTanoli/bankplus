import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Upload, 
  Trash2, 
  Check, 
  Sparkles, 
  RefreshCw, 
  Sliders, 
  Eye, 
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { 
  getCustomLogo, 
  saveCustomLogo, 
  removeCustomLogo, 
  getLogoStyle, 
  setLogoStyle, 
  getLogoScale, 
  setLogoScale, 
  BankPlusLogoStyle 
} from '../utils/logoStorage';
import { BankPlusLogo } from './BankPlusLogo';

interface LogoManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LogoManagerModal: React.FC<LogoManagerModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [customLogo, setCustomLogo] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<BankPlusLogoStyle>('emblem');
  const [scale, setScale] = useState<number>(100);
  const [isDragging, setIsDragging] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setCustomLogo(getCustomLogo());
      setSelectedStyle(getLogoStyle());
      setScale(getLogoScale());
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

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleFileUpload = (file: File) => {
    if (!file.type.startsWith('image/')) {
      showToast('Please select a valid image file (PNG, SVG, JPG, WebP)');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        saveCustomLogo(result);
        setCustomLogo(result);
        showToast('BankPlus Logo updated successfully!');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleRemoveCustom = () => {
    removeCustomLogo();
    setCustomLogo(null);
    showToast('Reset to default vector logo');
  };

  const handleStyleChange = (style: BankPlusLogoStyle) => {
    setSelectedStyle(style);
    setLogoStyle(style);
    showToast(`Applied ${style} vector style`);
  };

  const handleScaleChange = (newScale: number) => {
    setScale(newScale);
    setLogoScale(newScale);
  };

  const handleResetAll = () => {
    removeCustomLogo();
    setLogoStyle('emblem');
    setLogoScale(100);
    setCustomLogo(null);
    setSelectedStyle('emblem');
    setScale(100);
    showToast('Logo settings reset to default');
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#002b7f] via-[#003d99] to-[#0284c7] text-white p-4 sm:p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black tracking-tight">BankPlus Logo Manager</h2>
              <p className="text-xs text-blue-100">
                Upload your official institute logo or choose a vector style
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Toast Notification */}
        {toastMessage && (
          <div className="bg-emerald-600 text-white text-xs font-bold py-2 px-4 flex items-center justify-center gap-2 animate-in slide-in-from-top-2">
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6">
          {/* Live Preview Cards (Light & Dark Header Backgrounds) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-[#003399]" />
                <span>Live Logo Appearance Preview</span>
              </label>
              <span className="text-[11px] text-slate-500 font-medium">
                {customLogo ? 'Custom Image Active' : `Vector Style: ${selectedStyle}`}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Light Background Preview */}
              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-inner flex flex-col items-center justify-center min-h-[110px] relative">
                <span className="absolute top-1.5 left-2 text-[9px] font-bold text-slate-400 uppercase">
                  Light Header (Navbar)
                </span>
                <div className="py-2">
                  <BankPlusLogo variant="light" size="lg" />
                </div>
              </div>

              {/* Dark Background Preview */}
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 shadow-inner flex flex-col items-center justify-center min-h-[110px] relative">
                <span className="absolute top-1.5 left-2 text-[9px] font-bold text-slate-400 uppercase">
                  Dark Header (Footer)
                </span>
                <div className="py-2">
                  <BankPlusLogo variant="dark" size="lg" />
                </div>
              </div>
            </div>
          </div>

          {/* Section 1: Upload Official Logo File */}
          <div className="space-y-3 pt-1 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Upload className="w-3.5 h-3.5 text-[#003399]" />
                <span>Option 1: Upload Your Official Logo Image</span>
              </h3>
              {customLogo && (
                <button
                  onClick={handleRemoveCustom}
                  className="text-xs text-rose-600 hover:text-rose-700 font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>Remove Custom Image</span>
                </button>
              )}
            </div>

            <p className="text-xs text-slate-500">
              Have your official institute logo file (like <code>Logo1.png</code>, <code>logo.svg</code>, or <code>logo.png</code>)? Drag and drop or browse to apply it across all pages instantly.
            </p>

            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all ${
                isDragging 
                  ? 'border-[#003399] bg-blue-50/50' 
                  : 'border-slate-300 hover:border-blue-400 bg-slate-50/70 hover:bg-white'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png, image/jpeg, image/svg+xml, image/webp"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleFileUpload(e.target.files[0]);
                  }
                }}
              />
              <div className="w-10 h-10 rounded-full bg-blue-100 text-[#003399] flex items-center justify-center mx-auto mb-2">
                <Upload className="w-5 h-5" />
              </div>
              <p className="text-sm font-bold text-slate-800">
                Click to browse or drag & drop your Logo file
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                Supports transparent PNG, SVG, JPG, or WebP
              </p>
            </div>

            {/* Custom Logo Scale Slider (if custom logo uploaded) */}
            {customLogo && (
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center gap-4">
                <Sliders className="w-4 h-4 text-slate-500 shrink-0" />
                <div className="flex-1">
                  <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                    <span>Adjust Logo Size Scaling</span>
                    <span>{scale}%</span>
                  </div>
                  <input
                    type="range"
                    min="70"
                    max="140"
                    step="5"
                    value={scale}
                    onChange={(e) => handleScaleChange(Number(e.target.value))}
                    className="w-full accent-[#003399] cursor-pointer"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Section 2: Choose Curated Vector Style */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#003399]" />
                <span>Option 2: High-Resolution Vector Styles</span>
              </h3>
              <span className="text-[10px] text-slate-400">
                No image file needed • Perfect SVG clarity
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Style 1: Executive Emblem */}
              <button
                type="button"
                onClick={() => {
                  if (customLogo) handleRemoveCustom();
                  handleStyleChange('emblem');
                }}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  !customLogo && selectedStyle === 'emblem'
                    ? 'border-[#003399] bg-blue-50/50 shadow-sm ring-2 ring-[#003399]/20'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-slate-900">1. Executive Crest</span>
                    {!customLogo && selectedStyle === 'emblem' && (
                      <span className="w-4 h-4 rounded-full bg-[#003399] text-white flex items-center justify-center">
                        <Check className="w-2.5 h-2.5" />
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 leading-tight">
                    Sapphire shield crest with 3D &apos;+&apos; cross, navy BANK, sky blue PLUS, and aligned slogan.
                  </p>
                </div>
                <span className="mt-2 text-[10px] font-bold text-[#003399] uppercase tracking-wider">
                  Recommended
                </span>
              </button>

              {/* Style 2: Modern 3D Cross */}
              <button
                type="button"
                onClick={() => {
                  if (customLogo) handleRemoveCustom();
                  handleStyleChange('cross');
                }}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  !customLogo && selectedStyle === 'cross'
                    ? 'border-[#003399] bg-blue-50/50 shadow-sm ring-2 ring-[#003399]/20'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-slate-900">2. Modern 3D Cross</span>
                    {!customLogo && selectedStyle === 'cross' && (
                      <span className="w-4 h-4 rounded-full bg-[#003399] text-white flex items-center justify-center">
                        <Check className="w-2.5 h-2.5" />
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 leading-tight">
                    Dynamic geometric banking cross emblem with gradient bevels and bold typography.
                  </p>
                </div>
                <span className="mt-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  Dynamic
                </span>
              </button>

              {/* Style 3: Sleek Pill Wordmark */}
              <button
                type="button"
                onClick={() => {
                  if (customLogo) handleRemoveCustom();
                  handleStyleChange('wordmark');
                }}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  !customLogo && selectedStyle === 'wordmark'
                    ? 'border-[#003399] bg-blue-50/50 shadow-sm ring-2 ring-[#003399]/20'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-slate-900">3. Sleek Pill Wordmark</span>
                    {!customLogo && selectedStyle === 'wordmark' && (
                      <span className="w-4 h-4 rounded-full bg-[#003399] text-white flex items-center justify-center">
                        <Check className="w-2.5 h-2.5" />
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 leading-tight">
                    Navy BANK with vibrant electric PLUS pill badge and clean subtitle.
                  </p>
                </div>
                <span className="mt-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  Minimalist
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-5 py-3.5 border-t border-slate-200 flex items-center justify-between shrink-0">
          <button
            type="button"
            onClick={handleResetAll}
            className="text-xs text-slate-600 hover:text-slate-800 font-semibold flex items-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset to Default</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-[#003399] hover:bg-[#002266] text-white rounded-xl font-bold text-xs shadow-md transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
