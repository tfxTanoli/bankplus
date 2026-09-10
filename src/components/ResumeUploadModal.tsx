import React, { useState, useEffect } from 'react';
import { X, UploadCloud, FileText, CheckCircle2, ArrowRight, Sparkles, MapPin } from 'lucide-react';
import { JOB_POSTINGS } from '../data/mockData';

interface ResumeUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectJob?: (jobId: string) => void;
}

export const ResumeUploadModal: React.FC<ResumeUploadModalProps> = ({
  isOpen,
  onClose,
  onSelectJob,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [matchesFound, setMatchesFound] = useState(false);
  const [candidateName, setCandidateName] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file && !candidateName) return;
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setMatchesFound(true);
    }, 1200);
  };

  const reset = () => {
    setFile(null);
    setMatchesFound(false);
    setCandidateName('');
    setPhone('');
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-md sm:max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-[#001f5c] px-4 py-3 sm:px-5 sm:py-3.5 text-white relative shrink-0">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#ffcc00] text-slate-950 text-[10px] font-bold mb-1">
            <Sparkles className="w-3 h-3 text-slate-950" />
            <span>BankPlus AI Resume Matcher</span>
          </div>
          <h3 className="text-base sm:text-lg font-black text-white">
            Upload Resume for Instant Banking Match
          </h3>
          <p className="text-blue-100 text-xs mt-0.5">
            Our placement team verifies eligibility directly with 100+ hiring banking partners.
          </p>
        </div>

        {matchesFound ? (
          <div className="p-4 sm:p-5 space-y-3.5 overflow-y-auto grow">
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <div className="text-xs">
                <span className="font-bold text-emerald-900 block">
                  Profile Verified: 3 Immediate High-Fit Banking Roles Found!
                </span>
                <span className="text-emerald-700 text-[11px]">
                  Based on your educational background, you qualify for direct interview scheduling.
                </span>
              </div>
            </div>

            <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Top Recommended Opportunities:
            </h4>

            <div className="space-y-2.5">
              {JOB_POSTINGS.slice(0, 3).map((job) => (
                <div 
                  key={job.id} 
                  className="p-3 rounded-xl border border-slate-200 hover:border-[#003399] bg-slate-50/50 hover:bg-white transition-all space-y-1"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-[#003399]">{job.bankName}</span>
                      <h5 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">{job.title}</h5>
                    </div>
                    <span className="text-[11px] font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {job.salaryMonthly}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-[11px] text-slate-500">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400" /> {job.location}
                    </span>
                    <span>•</span>
                    <span>{job.experienceRequired}</span>
                  </div>

                  <div className="pt-1 flex items-center justify-between">
                    <span className="text-[10px] text-emerald-600 font-semibold">
                      ✓ 92% Profile Fit Score
                    </span>
                    <button
                      onClick={() => {
                        reset();
                        if (onSelectJob) onSelectJob(job.id);
                      }}
                      className="text-xs font-bold text-[#003399] hover:text-blue-700 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      View & Apply <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-1">
              <button
                onClick={reset}
                className="w-full py-2.5 bg-[#001f5c] hover:bg-[#003399] text-white font-bold rounded-xl text-xs sm:text-sm transition-colors cursor-pointer"
              >
                Browse All Openings
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleAnalyze} className="p-4 sm:p-5 space-y-3 overflow-y-auto grow">
            {/* Drag & Drop Zone */}
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              className="border-2 border-dashed border-slate-300 hover:border-[#003399] rounded-xl p-4 sm:p-5 text-center bg-slate-50/60 hover:bg-blue-50/30 transition-colors cursor-pointer relative"
            >
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              />
              <UploadCloud className="w-8 h-8 text-[#003399] mx-auto mb-1.5" />
              {file ? (
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-emerald-700 flex items-center justify-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-emerald-600" />
                    {file.name} ({(file.size / 1024).toFixed(1)} KB)
                  </span>
                  <span className="text-[10px] text-slate-500 block">Click or drop another file to replace</span>
                </div>
              ) : (
                <div className="space-y-0.5">
                  <span className="text-xs sm:text-sm font-bold text-slate-800 block">
                    Drag and drop your resume here, or <span className="text-[#003399] font-black underline">browse files</span>
                  </span>
                  <span className="text-[11px] text-slate-500 block">
                    Supports PDF, DOC, DOCX up to 10MB
                  </span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Your Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={candidateName}
                  onChange={(e) => setCandidateName(e.target.value)}
                  placeholder="e.g. Priya Sharma"
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#003399]/30"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Mobile Number for Alerts <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  pattern="[0-9]{10}"
                  maxLength={10}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="10 digit mobile"
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#003399]/30"
                />
              </div>
            </div>

            <div className="text-[11px] text-slate-500 bg-slate-100 p-2.5 rounded-lg flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#003399] shrink-0" />
              <span>We match your qualification score directly with 100+ active bank mandates.</span>
            </div>

            <button
              type="submit"
              disabled={analyzing}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#ffcc00] to-[#f5b800] hover:from-[#f5b800] hover:to-[#e6a800] text-slate-950 font-black text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {analyzing ? (
                <span>Parsing resume & matching bank mandates...</span>
              ) : (
                <>
                  <span>Analyze Resume & Find Matching Jobs</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
