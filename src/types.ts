export type PageTab = 'home' | 'programs' | 'jobs' | 'stories' | 'centres' | 'partner' | 'about';

export interface Program {
  id: string;
  title: string;
  category: 'hybrid' | 'govt' | 'private';
  badge?: string;
  isPopular?: boolean;
  tagline: string;
  duration: string;
  mode: 'Offline & Online' | 'Classroom Intensive' | 'Live Interactive Online';
  selectionGuarantee: boolean;
  admissionStatus?: string;
  usp: string;
  targetRoles: string[];
  eligibility: string;
  features: string[];
  modules: {
    title: string;
    duration: string;
    topics: string[];
  }[];
}

export interface JobPosting {
  id: string;
  title: string;
  bankName: string;
  bankLogo: string;
  bankType: 'Private Bank' | 'Public Sector / Govt' | 'NBFC / Small Finance';
  location: string;
  state: string;
  salaryMonthly: string;
  salaryAnnual: string;
  experienceRequired: 'Fresher Friendly' | '0 - 2 Years' | '1 - 3 Years' | '2+ Years';
  openings: number;
  lastDate: string;
  isVerified: boolean;
  roleOverview: string;
  skills: string[];
  postedDaysAgo: number;
}

export interface WhatsAppChannel {
  id: string;
  state: string;
  cityFocus: string;
  membersCount: string;
  verifiedActive: boolean;
  todayAlertsCount: number;
  bgGradient: string;
  channelLink: string;
  channelUrl: string;
  description: string;
}

export interface StudentSuccessStory {
  id: string;
  studentName: string;
  studentPhoto: string;
  hiredBank: string;
  bankLogo: string;
  bankColor?: string;
  roleDesignation: string;
  salaryPackage?: string;
  hometown: string;
  programTaken: string;
  yearPlaced: string;
  shortQuote: string;
  fullJourney: string;
  videoDuration?: string;
  instagramUrl?: string;
  isInstagramVerified?: boolean;
  flyerImage?: string;
  originalFlyerFile?: string;
  selectionBatch?: string;
}

export interface CentreLocation {
  id: string;
  city: string;
  state: string;
  isHQ?: boolean;
  isComingSoon?: boolean;
  branchName: string;
  fullAddress: string;
  centerHead: string;
  phone: string;
  email: string;
  timings: string;
  facilities: string[];
  image: string;
  mapCoords: { x: number; y: number };
}

export interface PartnerTier {
  tier: 'Tier 1 Metro' | 'Tier 2 City' | 'Tier 3 / District HQ';
  investment: string;
  spaceRequired: string;
  expectedStudents: number;
  monthlyRevenue: number;
  operatingCosts: number;
  netProfit: number;
  breakEvenMonths: number;
}

export interface StudentReel {
  id: string;
  title: string;
  studentName: string;
  role: string;
  location: string;
  thumbnail: string;
  fallbackThumbnail?: string;
  fileName?: string;
  duration: string;
  views: string;
  instagramLink: string;
  quote: string;
}

export interface CommunityGalleryItem {
  id: string;
  image: string;
  fallbackImage?: string;
  fileName?: string;
  caption: string;
  tag: string;
}
