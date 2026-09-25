import React, { useState, useEffect } from 'react';
import { JobPosting } from '../types';
import { JOB_POSTINGS, WHATSAPP_CHANNELS, OFFICIAL_FACEBOOK, OFFICIAL_FACEBOOK_HANDLE } from '../data/mockData';
import { getMergedCampusLifeList, CAMPUS_LIFE_UPDATED_EVENT, CustomCampusLifeItem } from '../utils/campusLifeSectionStorage';
import { 
  Briefcase, 
  MessageCircle, 
  MapPin, 
  DollarSign, 
  Search, 
  CheckCircle2, 
  UploadCloud, 
  Calendar, 
  Filter, 
  Users, 
  ExternalLink, 
  Sparkles, 
  FileText, 
  ArrowRight,
  ShieldCheck,
  Check,
  Facebook
} from 'lucide-react';

interface JobsViewProps {
  onOpenWhatsApp: (stateId?: string) => void;
  onOpenResumeUpload: () => void;
  onOpenEnquiry: (jobTitle?: string) => void;
  selectedJobId?: string;
}

export const JobsView: React.FC<JobsViewProps> = ({
  onOpenWhatsApp,
  onOpenResumeUpload,
  onOpenEnquiry,
  selectedJobId,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedExp, setSelectedExp] = useState<string>('all');
  const [appliedJobIds, setAppliedJobIds] = useState<string[]>([]);
  const [selectedJobDetail, setSelectedJobDetail] = useState<JobPosting | null>(
    selectedJobId ? JOB_POSTINGS.find(j => j.id === selectedJobId) || null : null
  );
  const [campusLifeList, setCampusLifeList] = useState<CustomCampusLifeItem[]>(getMergedCampusLifeList());

  useEffect(() => {
    setCampusLifeList(getMergedCampusLifeList());
    const handleUpdate = () => {
      setCampusLifeList(getMergedCampusLifeList());
    };
    window.addEventListener(CAMPUS_LIFE_UPDATED_EVENT, handleUpdate);
    return () => {
      window.removeEventListener(CAMPUS_LIFE_UPDATED_EVENT, handleUpdate);
    };
  }, []);

  const filteredJobs = JOB_POSTINGS.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          job.bankName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          job.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesState = selectedState === 'all' || job.state.includes(selectedState);
    const matchesType = selectedType === 'all' || job.bankType === selectedType;
    const matchesExp = selectedExp === 'all' || job.experienceRequired === selectedExp;
    return matchesSearch && matchesState && matchesType && matchesExp;
  });

  const handleApply = (job: JobPosting) => {
    if (!appliedJobIds.includes(job.id)) {
      setAppliedJobIds([...appliedJobIds, job.id]);
    }
    onOpenEnquiry(`Job Application: ${job.title} (${job.bankName})`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-16">
      {/* 1. Header Banner */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Fresher Openings Only • CTC ₹1.5 Lacs to ₹3.5 Lacs / Annum</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#001f5c] tracking-tight">
          Banking Jobs for Freshers
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Skip crowded job portals. Connect directly with hiring bank HRs across Uttar Pradesh, Bihar, Rajasthan, and Uttarakhand with guaranteed salary packages from <strong>₹1.5 Lacs to ₹3.5 Lacs per annum</strong>.
        </p>
      </div>

      {/* 2. 4 OFFICIAL STATE-WISE WHATSAPP CHANNELS */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-200 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <h2 className="text-xl sm:text-2xl font-black text-[#001f5c]">
                Official State WhatsApp Placement Channels
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Live updates on fresher walk-in drives, local bank branch interviews, and exam notices.
            </p>
          </div>
          <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
            Live Daily Job Alerts
          </span>
        </div>

        {/* 4 State Channel Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {WHATSAPP_CHANNELS.map((channel) => (
            <div 
              key={channel.id}
              className="bg-white rounded-2xl p-5 card-shadow border border-slate-200 hover:border-emerald-500 card-shadow-hover flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2.5">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      Official Channel
                    </span>
                    <h3 className="text-lg font-black text-slate-900 mt-1">
                      {channel.state}
                    </h3>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2.5 py-1 rounded-full flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>Active</span>
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {channel.description}
                </p>

                <div className="text-[11px] text-slate-500 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                  <span className="truncate">Key Cities: {channel.cityFocus}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-bold text-emerald-700">
                  ⚡ {channel.todayAlertsCount} Alerts Today
                </span>

                <a
                  href={channel.channelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-slate-950 font-black text-xs shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-slate-950 text-slate-950" />
                  <span>Join Channel</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. SEARCH & MULTI-FILTER BAR */}
      <section className="bg-white rounded-2xl p-5 card-shadow border border-slate-200 space-y-4">
        {/* Keyword Search */}
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3" />
          <input 
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search fresher banking jobs (e.g. HDFC, Relationship Officer, SBI, Lucknow, ₹1.5 - ₹3.5 Lacs)..."
            className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#003399]/30 focus:border-[#003399]"
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 text-xs">
          <div>
            <label className="block text-slate-500 font-bold mb-1">State / Channel Location</label>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full p-2 rounded-lg border border-slate-200 bg-white font-medium text-slate-800"
            >
              <option value="all">All Available States</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
              <option value="Bihar">Bihar</option>
              <option value="Rajasthan">Rajasthan</option>
              <option value="Uttarakhand">Uttarakhand</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-500 font-bold mb-1">Bank Category</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full p-2 rounded-lg border border-slate-200 bg-white font-medium text-slate-800"
            >
              <option value="all">All Bank Types</option>
              <option value="Private Bank">Private Sector Banks</option>
              <option value="Public Sector / Govt">Public Sector / Govt Channel</option>
              <option value="NBFC / Small Finance">NBFC & Small Finance Banks</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-500 font-bold mb-1">Experience Level</label>
            <select
              value={selectedExp}
              onChange={(e) => setSelectedExp(e.target.value)}
              className="w-full p-2 rounded-lg border border-slate-200 bg-white font-medium text-slate-800"
            >
              <option value="all">All Fresher Levels</option>
              <option value="Fresher Friendly">Fresher Friendly (0 Exp)</option>
              <option value="Fresh Graduate (0-1 Yr)">Fresh Graduate (0-1 Yr)</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedState('all');
                setSelectedType('all');
                setSelectedExp('all');
              }}
              className="w-full p-2 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 font-bold transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        </div>
      </section>

      {/* 4. JOB LISTINGS GRID */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black text-[#001f5c]">
            Fresher Vacancies ({filteredJobs.length} Positions Available)
          </h2>
          <span className="text-xs text-slate-500">
            Standard Fresher CTC: ₹1.5 Lacs to ₹3.5 Lacs / Annum
          </span>
        </div>

        <div className="space-y-4">
          {filteredJobs.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-2xl card-shadow border border-slate-200 space-y-3">
              <Briefcase className="w-10 h-10 text-slate-300 mx-auto" />
              <h4 className="text-base font-bold text-slate-700">No matching fresher openings found</h4>
              <p className="text-xs text-slate-500">Try resetting filters or checking your state WhatsApp channel for unlisted walk-in drives.</p>
            </div>
          ) : (
            filteredJobs.map((job) => {
              const isDetailOpen = selectedJobDetail?.id === job.id;
              const isApplied = appliedJobIds.includes(job.id);

              return (
                <div 
                  key={job.id}
                  className={`bg-white rounded-2xl p-6 card-shadow border transition-all ${
                    isDetailOpen ? 'border-[#003399] ring-2 ring-[#003399]/10' : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                    {/* Left: Job Meta */}
                    <div className="space-y-2 grow">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className="px-2.5 py-0.5 rounded-md bg-[#001f5c] text-white font-black text-xs">
                          {job.bankName}
                        </span>
                        <span className="text-xs font-bold text-slate-500">
                          {job.bankType}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-black flex items-center gap-1 border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>Fresher Friendly (₹1.5L - ₹3.5L CTC)</span>
                        </span>
                        <span className="text-[11px] text-slate-400">
                          Posted {job.postedDaysAgo} day{job.postedDaysAgo > 1 ? 's' : ''} ago
                        </span>
                      </div>

                      <h3 className="text-xl font-black text-slate-900 hover:text-[#003399] transition-colors">
                        {job.title}
                      </h3>

                      <p className="text-xs text-slate-600 line-clamp-2 max-w-3xl">
                        {job.roleOverview}
                      </p>

                      {/* Criteria row */}
                      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-700 pt-1">
                        <span className="flex items-center gap-1 font-semibold">
                          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>{job.location}</span>
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1 font-black text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded">
                          <DollarSign className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{job.salaryMonthly}</span>
                        </span>
                        <span>•</span>
                        <span className="text-slate-500 font-bold">
                          CTC: {job.salaryAnnual}
                        </span>
                        <span>•</span>
                        <span className="text-slate-700 font-medium">
                          {job.openings} Openings
                        </span>
                      </div>

                      {/* Skills Tags */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {job.skills.map((skill, sIdx) => (
                          <span 
                            key={sIdx}
                            className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end gap-2.5">
                      <span className="text-[11px] text-slate-500 text-right">
                        Last Date: <strong className="text-slate-900">{job.lastDate}</strong>
                      </span>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedJobDetail(isDetailOpen ? null : job)}
                          className="px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-bold transition-colors cursor-pointer"
                        >
                          {isDetailOpen ? 'Close Details' : 'View Details'}
                        </button>

                        <button
                          onClick={() => handleApply(job)}
                          disabled={isApplied}
                          className={`px-5 py-2.5 rounded-xl font-black text-xs transition-all flex items-center gap-1.5 cursor-pointer shadow-md ${
                            isApplied
                              ? 'bg-emerald-600 text-white cursor-default'
                              : 'bg-gradient-to-r from-[#ffcc00] to-[#f5b800] hover:from-[#f5b800] hover:to-[#e6a800] text-slate-950'
                          }`}
                        >
                          {isApplied ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Applied</span>
                            </>
                          ) : (
                            <>
                              <span>Apply Now</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Detail Panel */}
                  {isDetailOpen && (
                    <div className="mt-6 pt-5 border-t border-slate-100 space-y-4 text-xs animate-in fade-in duration-150">
                      <div className="bg-slate-50 p-4 rounded-xl space-y-3">
                        <h5 className="font-bold text-slate-900 text-sm">Detailed Job Specification & Walk-in Guidelines</h5>
                        <p className="text-slate-700 leading-relaxed">
                          This recruitment drive is organized exclusively through BankPlus Career Placement Cell for Freshers. Shortlisted candidates are granted direct interview slots with the Branch Operations / HR Manager, bypassing public recruiter queues.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-slate-600">
                          <div>
                            <span className="text-slate-400 block text-[10px]">Eligibility</span>
                            <span className="font-bold text-slate-800">Fresh Graduate (Any Stream)</span>
                          </div>
                          <div>
                            <span className="text-slate-400 block text-[10px]">Salary Package</span>
                            <span className="font-bold text-emerald-700">{job.salaryAnnual}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 block text-[10px]">BankPlus Support</span>
                            <span className="font-bold text-[#003399]">Free Mock Interview Included</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </section>

      {/* Student Friendly Classroom & Placement Glimpse */}
      <section className="space-y-4 pt-2">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
          <div>
            <span className="text-xs font-bold text-[#003399] uppercase tracking-wider flex items-center gap-1">
              <Users className="w-3.5 h-3.5" />
              <span>Fresher Placement Campus Drills</span>
            </span>
            <h3 className="text-xl font-black text-slate-900">
              From College Freshers to Branch Bankers
            </h3>
          </div>
          <a
            href={OFFICIAL_FACEBOOK}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold text-blue-700 hover:text-blue-800 flex items-center gap-1"
          >
            <Facebook className="w-4 h-4 text-[#1877F2]" />
            <span>See Freshers on {OFFICIAL_FACEBOOK_HANDLE}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {campusLifeList.slice(0, 3).map((item) => (
            <div 
              key={item.id}
              className="bg-white rounded-2xl overflow-hidden card-shadow border border-slate-200 group hover:shadow-lg transition-all"
            >
              <div className="relative h-44 overflow-hidden bg-slate-100">
                <img 
                  src={item.image} 
                  alt={item.caption}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    if (item.fallbackImage) {
                      e.currentTarget.src = item.fallbackImage;
                    }
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-slate-900/80 text-white text-[10px] font-bold">
                  {item.tag}
                </div>
              </div>
              <div className="p-3.5">
                <p className="text-xs font-bold text-slate-800 leading-snug">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. FLOATING / BOTTOM-DOCKED RESUME UPLOAD BAR */}
      <section className="bg-gradient-to-r from-[#001f5c] to-[#003399] rounded-2xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border-2 border-[#ffcc00]">
        <div className="flex items-center gap-4 text-center md:text-left">
          <div className="w-14 h-14 rounded-2xl bg-white/10 text-[#ffcc00] flex items-center justify-center shrink-0 border border-white/20">
            <UploadCloud className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-xl font-black text-white">
              Upload Your Fresher Resume & Let Bank HRs Contact You
            </h3>
            <p className="text-xs sm:text-sm text-blue-100 mt-1 max-w-xl">
              Our placement desk directly distributes verified candidate dossiers to 100+ partner public & private banking HR heads offering ₹1.5L to ₹3.5L per annum.
            </p>
          </div>
        </div>

        <button
          onClick={onOpenResumeUpload}
          className="w-full md:w-auto px-7 py-3.5 rounded-xl bg-[#ffcc00] hover:bg-[#e6b800] text-slate-950 font-black text-sm shadow-md transition-all shrink-0 cursor-pointer flex items-center justify-center gap-2"
        >
          <FileText className="w-4 h-4" />
          <span>Upload Resume (Free)</span>
        </button>
      </section>
    </div>
  );
};
