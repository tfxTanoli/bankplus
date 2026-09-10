import React from 'react';
import { 
  Building2, 
  Briefcase, 
  ShieldCheck, 
  Landmark, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { TOP_10_BFSI_ORGANISATIONS } from '../data/bfsiRecruiters';
import { PageTab } from '../types';

interface BfsiRecruitersSectionProps {
  onOpenEnquiry: (programId?: string) => void;
  setActiveTab: (tab: PageTab) => void;
}

export const BfsiRecruitersSection: React.FC<BfsiRecruitersSectionProps> = ({
  onOpenEnquiry,
  setActiveTab
}) => {
  return (
    <section id="bfsi-recruitment-ecosystem" className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6 sm:space-y-8">
      {/* 1. Header & Title Block */}
      <div className="text-center space-y-2 sm:space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-[#003399] text-xs font-black shadow-xs">
          <Building2 className="w-3.5 h-3.5 text-[#003399]" />
          <span>Corporate Recruitment Network</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="bg-[#003399] text-white px-2.5 py-0.5 rounded-full text-[11px] font-bold">
            100+ BFSI Organisations
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
          Where Our Students Get Hired
        </h2>
        <p className="text-base sm:text-lg font-bold text-[#003399]">
          100+ BFSI Organisations
        </p>

        <p className="text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed">
          Direct campus placement drives, expedited interview tie-ups, and corporate referrals across 100+ BFSI Organisations and India&apos;s leading banking &amp; financial institutions.
        </p>
      </div>

      {/* 2. Exactly 10 Organisations Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
        {TOP_10_BFSI_ORGANISATIONS.map((org) => (
          <div
            key={org.id}
            className="p-3.5 sm:p-4 bg-white rounded-xl border border-slate-200 hover:border-[#003399] card-shadow-hover transition-all duration-200 flex flex-col justify-between text-left space-y-2.5 group"
          >
            {/* Monogram and Bank Name */}
            <div className="space-y-2">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center font-black text-xs text-white shadow-xs group-hover:scale-105 transition-transform shrink-0"
                style={{ backgroundColor: org.color }}
                title={org.name}
              >
                {org.code}
              </div>

              <div>
                <h4 
                  className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-1 group-hover:text-[#003399] transition-colors" 
                  title={org.name}
                >
                  {org.name}
                </h4>
                <span className="text-[10px] sm:text-[11px] text-slate-500 font-medium block truncate">
                  {org.type}
                </span>
              </div>
            </div>

            {/* Roles Hired */}
            <div className="pt-2 border-t border-slate-100">
              <div className="flex items-center gap-1 text-[9.5px] text-slate-400 font-semibold mb-0.5">
                <Briefcase className="w-2.5 h-2.5 text-slate-400 shrink-0" />
                <span>Roles Hired:</span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-600 line-clamp-2 leading-tight">
                {org.rolesHired}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* 3. Text Signifying 100+ BFSI Organisations */}
      <div className="bg-linear-to-b from-slate-50 via-blue-50/40 to-slate-50 rounded-2xl border border-blue-100/90 p-5 sm:p-7 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/80 border border-blue-200 text-[#003399] text-xs font-bold">
          <Landmark className="w-3.5 h-3.5 text-[#003399]" />
          <span>+ 100+ More Leading BFSI Organisations Across India</span>
        </div>

        <div className="max-w-3xl mx-auto space-y-2">
          <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
            Recruitment Across 100+ BFSI Organisations &amp; Financial Institutions
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Beyond the marquee institutions featured above, BankPlus students are actively recruited across <strong>100+ BFSI organisations</strong> nationwide. We provide dedicated on-campus drives, expedited interview channels, and <strong>unlimited interview opportunities</strong> until you secure your appointment letter.
          </p>
        </div>

        {/* Breakdown chips signifying the 100+ organisations */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 max-w-4xl mx-auto pt-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 text-xs font-semibold shadow-2xs">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span><strong>12</strong> Public Sector Banks (PNB, Canara, Union Bank, Bank of India, Indian Bank &amp; more)</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 text-xs font-semibold shadow-2xs">
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span><strong>20+</strong> Leading Private Banks (IDFC FIRST, IndusInd, Bandhan, Federal, Yes Bank &amp; more)</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 text-xs font-semibold shadow-2xs">
            <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0" />
            <span><strong>16</strong> Small Finance &amp; Payments Banks (Equitas, Ujjivan, Jana, Utkarsh, Airtel Bank)</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 text-xs font-semibold shadow-2xs">
            <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span><strong>32+</strong> Leading NBFCs &amp; Housing Financiers (Tata Capital, L&amp;T Finance, Muthoot, LIC HFL)</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 text-xs font-semibold shadow-2xs">
            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 shrink-0" />
            <span><strong>12</strong> Global &amp; MNC Banks (HSBC, Standard Chartered, Citi, DBS, Deutsche Bank)</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 text-xs font-semibold shadow-2xs">
            <CheckCircle2 className="w-3.5 h-3.5 text-rose-600 shrink-0" />
            <span><strong>30+</strong> Insurance Giants &amp; Fintech Leaders (LIC, HDFC Life, ICICI Lombard, Star Health, PhonePe)</span>
          </div>
        </div>

        {/* Footer reassurance & buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <div className="inline-flex items-center gap-1.5 text-xs text-emerald-800 font-bold bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>100% Unlimited Interview Guarantee until Placement</span>
          </div>
          <button
            onClick={() => onOpenEnquiry()}
            className="px-4 py-2 bg-[#003399] hover:bg-[#002266] text-white rounded-lg text-xs font-bold transition-colors cursor-pointer inline-flex items-center gap-1.5 shadow-xs"
          >
            <span>Apply for Placement Drive</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setActiveTab('programs')}
            className="px-4 py-2 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg text-xs font-bold transition-colors cursor-pointer"
          >
            <span>Explore Programs</span>
          </button>
        </div>
      </div>
    </section>
  );
};
