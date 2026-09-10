import React, { useState } from 'react';
import { PageTab, StudentSuccessStory } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { EnquiryModal } from './components/EnquiryModal';
import { WhatsAppModal } from './components/WhatsAppModal';
import { ResumeUploadModal } from './components/ResumeUploadModal';
import { StoryModal } from './components/StoryModal';
import { ExportSyncModal } from './components/ExportSyncModal';

import { HomeView } from './views/HomeView';
import { ProgramsView } from './views/ProgramsView';
import { JobsView } from './views/JobsView';
import { SuccessStoriesView } from './views/SuccessStoriesView';
import { CentresView } from './views/CentresView';
import { ALCPartnerView } from './views/ALCPartnerView';

import { MessageCircle, Phone, Sparkles } from 'lucide-react';
import { 
  OFFICIAL_CONTACT_PHONE, 
  OFFICIAL_CONTACT_PHONE_RAW,
  OFFICIAL_ALC_WHATSAPP,
  OFFICIAL_ALC_WHATSAPP_RAW
} from './data/mockData';

export default function App() {
  const [activeTab, setActiveTab] = useState<PageTab>('home');
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [enquiryDefaultProgram, setEnquiryDefaultProgram] = useState<string | undefined>();
  
  const [whatsAppOpen, setWhatsAppOpen] = useState(false);
  const [whatsAppStateId, setWhatsAppStateId] = useState<string>('up');

  const [resumeOpen, setResumeOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const [activeStory, setActiveStory] = useState<StudentSuccessStory | null>(null);
  const [selectedJobId, setSelectedJobId] = useState<string | undefined>();

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const search = window.location.search || '';
      const hash = window.location.hash || '';
      if (search.includes('export') || hash.includes('export') || search.includes('sync')) {
        setExportOpen(true);
      }
    }
  }, []);

  const handleOpenEnquiry = (programName?: string) => {
    setEnquiryDefaultProgram(programName);
    setEnquiryOpen(true);
  };

  const handleOpenWhatsApp = (stateId?: string) => {
    if (stateId) setWhatsAppStateId(stateId);
    setWhatsAppOpen(true);
  };

  const handleOpenStory = (story: StudentSuccessStory) => {
    setActiveStory(story);
  };

  const handleSelectJob = (jobId: string) => {
    setSelectedJobId(jobId);
    setActiveTab('jobs');
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-[#ffcc00] selection:text-slate-950">
      {/* Sticky Top Header */}
      <Navbar 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenEnquiry={() => handleOpenEnquiry()}
        onOpenWhatsApp={handleOpenWhatsApp}
      />

      {/* Main Content Area */}
      <main className="grow">
        {activeTab === 'home' && (
          <HomeView 
            setActiveTab={setActiveTab}
            onOpenEnquiry={handleOpenEnquiry}
            onOpenWhatsApp={handleOpenWhatsApp}
            onOpenStory={handleOpenStory}
            onOpenResumeUpload={() => setResumeOpen(true)}
            onSelectJob={handleSelectJob}
          />
        )}

        {activeTab === 'programs' && (
          <ProgramsView 
            onOpenEnquiry={handleOpenEnquiry}
          />
        )}

        {activeTab === 'jobs' && (
          <JobsView 
            onOpenWhatsApp={handleOpenWhatsApp}
            onOpenResumeUpload={() => setResumeOpen(true)}
            onOpenEnquiry={handleOpenEnquiry}
            selectedJobId={selectedJobId}
          />
        )}

        {activeTab === 'stories' && (
          <SuccessStoriesView 
            onOpenStory={handleOpenStory}
            onOpenEnquiry={() => handleOpenEnquiry('Selection Stories Consultation')}
          />
        )}

        {activeTab === 'centres' && (
          <CentresView 
            onOpenEnquiry={handleOpenEnquiry}
          />
        )}

        {activeTab === 'partner' && (
          <ALCPartnerView />
        )}
      </main>

      {/* Global Comprehensive Footer */}
      <Footer 
        setActiveTab={setActiveTab}
        onOpenEnquiry={() => handleOpenEnquiry()}
        onOpenWhatsApp={handleOpenWhatsApp}
        onOpenExport={() => setExportOpen(true)}
      />

      {/* Sticky Mobile Floating CTAs */}
      <div className="md:hidden fixed bottom-3 left-3 right-3 z-40 flex items-center gap-2 bg-slate-950/80 backdrop-blur-md p-1.5 rounded-2xl border border-white/20 shadow-2xl">
        <button
          onClick={() => handleOpenWhatsApp('up')}
          className="grow py-2.5 px-3 rounded-xl bg-[#25D366] text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 shadow-md"
        >
          <MessageCircle className="w-4 h-4 fill-slate-950" />
          <span>Job Alerts (WA)</span>
        </button>

        <button
          onClick={() => handleOpenEnquiry()}
          className="grow py-2.5 px-3 rounded-xl bg-[#ffcc00] text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 shadow-md"
        >
          <Sparkles className="w-4 h-4 text-slate-950" />
          <span>Enquire (Free)</span>
        </button>

        <a
          href={`tel:${activeTab === 'partner' ? OFFICIAL_ALC_WHATSAPP_RAW : OFFICIAL_CONTACT_PHONE_RAW}`}
          className="p-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 flex items-center justify-center transition-colors shadow-sm"
          aria-label={`Call Helpline: ${activeTab === 'partner' ? OFFICIAL_ALC_WHATSAPP : OFFICIAL_CONTACT_PHONE}`}
          title={`Call Helpline: ${activeTab === 'partner' ? OFFICIAL_ALC_WHATSAPP : OFFICIAL_CONTACT_PHONE}`}
        >
          <Phone className="w-4 h-4 text-slate-950" />
        </a>
      </div>

      {/* Floating Desktop Quick Actions (Call & WhatsApp) */}
      <div className="hidden md:flex flex-col items-end gap-2.5 fixed bottom-6 right-6 z-40">
        <a
          href={`tel:${activeTab === 'partner' ? OFFICIAL_ALC_WHATSAPP_RAW : OFFICIAL_CONTACT_PHONE_RAW}`}
          className="group relative flex items-center gap-2 bg-[#001f5c] hover:bg-[#003399] text-white font-bold text-xs py-2.5 px-4 rounded-full shadow-2xl transition-all duration-200 cursor-pointer border border-white/20 transform hover:-translate-y-0.5"
          title={`Call ${activeTab === 'partner' ? 'ALC Helpline' : 'BankPlus Helpline'}: ${activeTab === 'partner' ? OFFICIAL_ALC_WHATSAPP : OFFICIAL_CONTACT_PHONE}`}
        >
          <Phone className="w-4 h-4 text-amber-400" />
          <span>Call: {activeTab === 'partner' ? OFFICIAL_ALC_WHATSAPP : OFFICIAL_CONTACT_PHONE}</span>
        </a>

        <button
          onClick={() => handleOpenWhatsApp('up')}
          className="group relative flex items-center gap-2.5 bg-[#25D366] hover:bg-[#1ebe5d] text-slate-950 font-black text-xs py-3 px-4 rounded-full shadow-2xl transition-all duration-200 cursor-pointer transform hover:-translate-y-1 hover:scale-105"
        >
          <div className="relative">
            <MessageCircle className="w-5 h-5 fill-slate-950" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white animate-pulse"></span>
          </div>
          <span className="tracking-tight">Join State WhatsApp Alerts</span>
        </button>
      </div>

      {/* Global Modals */}
      <EnquiryModal 
        isOpen={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
        defaultProgram={enquiryDefaultProgram}
      />

      <WhatsAppModal 
        isOpen={whatsAppOpen}
        onClose={() => setWhatsAppOpen(false)}
        initialStateId={whatsAppStateId}
      />

      <ResumeUploadModal 
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
        onSelectJob={handleSelectJob}
      />

      <StoryModal 
        story={activeStory}
        onClose={() => setActiveStory(null)}
        onEnquireNow={() => handleOpenEnquiry(activeStory?.programTaken)}
      />

      <ExportSyncModal 
        isOpen={exportOpen}
        onClose={() => setExportOpen(false)}
      />
    </div>
  );
}
