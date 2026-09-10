export interface BfsiOrganisation {
  id: string;
  name: string;
  code: string;
  category: 'psu' | 'private' | 'sfb' | 'nbfc' | 'hfc' | 'global' | 'insurance' | 'fintech';
  categoryLabel: string;
  type: string;
  color: string;
  rolesHired: string;
  isTopRecruiter?: boolean;
}

export const BFSI_ORGANISATIONS: BfsiOrganisation[] = [
  // ==========================================
  // 1. PUBLIC SECTOR BANKS (12 PSBs - Complete Set)
  // ==========================================
  {
    id: 'sbi',
    name: 'State Bank of India',
    code: 'SBI',
    category: 'psu',
    categoryLabel: 'Public Sector Bank',
    type: 'Nationalized Bank',
    color: '#002B7F',
    rolesHired: 'Probationary Officer, Junior Associate, Specialist Officer',
    isTopRecruiter: true
  },
  {
    id: 'pnb',
    name: 'Punjab National Bank',
    code: 'PNB',
    category: 'psu',
    categoryLabel: 'Public Sector Bank',
    type: 'Nationalized Bank',
    color: '#9E1B32',
    rolesHired: 'Probationary Officer, Management Trainee, Clerk',
    isTopRecruiter: true
  },
  {
    id: 'bob',
    name: 'Bank of Baroda',
    code: 'BOB',
    category: 'psu',
    categoryLabel: 'Public Sector Bank',
    type: 'Nationalized Bank',
    color: '#F26522',
    rolesHired: 'Probationary Officer, Specialist Officer, Relationship Executive',
    isTopRecruiter: true
  },
  {
    id: 'canara',
    name: 'Canara Bank',
    code: 'CANARA',
    category: 'psu',
    categoryLabel: 'Public Sector Bank',
    type: 'Nationalized Bank',
    color: '#0093D0',
    rolesHired: 'Probationary Officer, Specialist Officer, Junior Associate'
  },
  {
    id: 'ubi',
    name: 'Union Bank of India',
    code: 'UBI',
    category: 'psu',
    categoryLabel: 'Public Sector Bank',
    type: 'Nationalized Bank',
    color: '#C8102E',
    rolesHired: 'Assistant Manager, Credit Officer, Clerk'
  },
  {
    id: 'boi',
    name: 'Bank of India',
    code: 'BOI',
    category: 'psu',
    categoryLabel: 'Public Sector Bank',
    type: 'Nationalized Bank',
    color: '#ED1C24',
    rolesHired: 'Probationary Officer, Credit Officer, General Banking'
  },
  {
    id: 'ib',
    name: 'Indian Bank',
    code: 'IB',
    category: 'psu',
    categoryLabel: 'Public Sector Bank',
    type: 'Nationalized Bank',
    color: '#004B87',
    rolesHired: 'PO, Customer Service Associate, Agriculture Field Officer'
  },
  {
    id: 'cbi',
    name: 'Central Bank of India',
    code: 'CBI',
    category: 'psu',
    categoryLabel: 'Public Sector Bank',
    type: 'Nationalized Bank',
    color: '#005696',
    rolesHired: 'Junior Management Grade (Scale-I), PO, Clerk'
  },
  {
    id: 'iob',
    name: 'Indian Overseas Bank',
    code: 'IOB',
    category: 'psu',
    categoryLabel: 'Public Sector Bank',
    type: 'Nationalized Bank',
    color: '#0066B3',
    rolesHired: 'Assistant Manager, Credit Analyst, Clerk'
  },
  {
    id: 'uco',
    name: 'UCO Bank',
    code: 'UCO',
    category: 'psu',
    categoryLabel: 'Public Sector Bank',
    type: 'Nationalized Bank',
    color: '#0072CE',
    rolesHired: 'Management Trainee, Customer Service Associate'
  },
  {
    id: 'bom',
    name: 'Bank of Maharashtra',
    code: 'BOM',
    category: 'psu',
    categoryLabel: 'Public Sector Bank',
    type: 'Nationalized Bank',
    color: '#E31837',
    rolesHired: 'Generalist Officer, Assistant Manager, Clerk'
  },
  {
    id: 'psb',
    name: 'Punjab & Sind Bank',
    code: 'PSB',
    category: 'psu',
    categoryLabel: 'Public Sector Bank',
    type: 'Nationalized Bank',
    color: '#D97706',
    rolesHired: 'Assistant Manager, Probationary Officer, Clerk'
  },

  // ==========================================
  // 2. TOP PRIVATE SECTOR BANKS (20 Banks)
  // ==========================================
  {
    id: 'hdfc',
    name: 'HDFC Bank',
    code: 'HDFC',
    category: 'private',
    categoryLabel: 'Private Sector Bank',
    type: 'Leading Private Bank',
    color: '#004B87',
    rolesHired: 'Personal Banker, Teller, Relationship Manager, Credit Manager',
    isTopRecruiter: true
  },
  {
    id: 'icici',
    name: 'ICICI Bank',
    code: 'ICICI',
    category: 'private',
    categoryLabel: 'Private Sector Bank',
    type: 'Leading Private Bank',
    color: '#97144D',
    rolesHired: 'Probationary Officer, Relationship Manager, Branch Sales',
    isTopRecruiter: true
  },
  {
    id: 'axis',
    name: 'Axis Bank',
    code: 'AXIS',
    category: 'private',
    categoryLabel: 'Private Sector Bank',
    type: 'Leading Private Bank',
    color: '#861F41',
    rolesHired: 'Assistant Manager, Customer Service Officer, BDE',
    isTopRecruiter: true
  },
  {
    id: 'kotak',
    name: 'Kotak Mahindra Bank',
    code: 'KOTAK',
    category: 'private',
    categoryLabel: 'Private Sector Bank',
    type: 'Leading Private Bank',
    color: '#ED1C24',
    rolesHired: 'Acquisition Manager, Branch Operations, Premier Banker',
    isTopRecruiter: true
  },
  {
    id: 'indusind',
    name: 'IndusInd Bank',
    code: 'INDUSIND',
    category: 'private',
    categoryLabel: 'Private Sector Bank',
    type: 'Leading Private Bank',
    color: '#861A22',
    rolesHired: 'Branch Relationship Executive, Teller, Credit Underwriter',
    isTopRecruiter: true
  },
  {
    id: 'yes',
    name: 'Yes Bank',
    code: 'YES',
    category: 'private',
    categoryLabel: 'Private Sector Bank',
    type: 'Private Sector Bank',
    color: '#003366',
    rolesHired: 'Relationship Manager, Operations Executive, Retail Assets'
  },
  {
    id: 'idfc',
    name: 'IDFC FIRST Bank',
    code: 'IDFC',
    category: 'private',
    categoryLabel: 'Private Sector Bank',
    type: 'Private Sector Bank',
    color: '#9A1C20',
    rolesHired: 'Associate Banker, Branch Manager, Retail Loan Specialist',
    isTopRecruiter: true
  },
  {
    id: 'federal',
    name: 'Federal Bank',
    code: 'FEDERAL',
    category: 'private',
    categoryLabel: 'Private Sector Bank',
    type: 'Private Sector Bank',
    color: '#004B87',
    rolesHired: 'Officer Junior Management Grade, Clerk, Branch Service Officer'
  },
  {
    id: 'bandhan',
    name: 'Bandhan Bank',
    code: 'BANDHAN',
    category: 'private',
    categoryLabel: 'Private Sector Bank',
    type: 'Private Sector Bank',
    color: '#003399',
    rolesHired: 'Branch Sales Officer, Customer Relationship Officer, Teller',
    isTopRecruiter: true
  },
  {
    id: 'rbl',
    name: 'RBL Bank',
    code: 'RBL',
    category: 'private',
    categoryLabel: 'Private Sector Bank',
    type: 'Private Sector Bank',
    color: '#003366',
    rolesHired: 'Relationship Officer, Branch Operations, Credit Cards'
  },
  {
    id: 'sib',
    name: 'South Indian Bank',
    code: 'SIB',
    category: 'private',
    categoryLabel: 'Private Sector Bank',
    type: 'Private Sector Bank',
    color: '#D71920',
    rolesHired: 'Probationary Officer, Clerk, NRI Relationship Executive'
  },
  {
    id: 'cub',
    name: 'City Union Bank',
    code: 'CUB',
    category: 'private',
    categoryLabel: 'Private Sector Bank',
    type: 'Private Sector Bank',
    color: '#0055A5',
    rolesHired: 'Relationship Manager, Branch Executive, Cashier'
  },
  {
    id: 'kvb',
    name: 'Karur Vysya Bank',
    code: 'KVB',
    category: 'private',
    categoryLabel: 'Private Sector Bank',
    type: 'Private Sector Bank',
    color: '#E31B23',
    rolesHired: 'Assistant Manager, Branch Cashier, Loan Executive'
  },
  {
    id: 'csb',
    name: 'CSB Bank',
    code: 'CSB',
    category: 'private',
    categoryLabel: 'Private Sector Bank',
    type: 'Private Sector Bank',
    color: '#C8102E',
    rolesHired: 'Gold Loan Officer, Branch Relationship Officer'
  },
  {
    id: 'kbl',
    name: 'Karnataka Bank',
    code: 'KBL',
    category: 'private',
    categoryLabel: 'Private Sector Bank',
    type: 'Private Sector Bank',
    color: '#00529B',
    rolesHired: 'Probationary Officer, Agricultural Field Officer, Clerk'
  },
  {
    id: 'tmb',
    name: 'Tamilnad Mercantile Bank',
    code: 'TMB',
    category: 'private',
    categoryLabel: 'Private Sector Bank',
    type: 'Private Sector Bank',
    color: '#0284C7',
    rolesHired: 'Clerk, Assistant Manager, Business Correspondent'
  },
  {
    id: 'dcb',
    name: 'DCB Bank',
    code: 'DCB',
    category: 'private',
    categoryLabel: 'Private Sector Bank',
    type: 'Private Sector Bank',
    color: '#0078D7',
    rolesHired: 'Branch Banking Executive, Mortgage Loan Officer'
  },
  {
    id: 'nbl',
    name: 'Nainital Bank',
    code: 'NBL',
    category: 'private',
    categoryLabel: 'Private Sector Bank',
    type: 'Private Sector Bank',
    color: '#1E3A8A',
    rolesHired: 'Management Trainee, Clerk, Branch Associate'
  },
  {
    id: 'idbi',
    name: 'IDBI Bank',
    code: 'IDBI',
    category: 'private',
    categoryLabel: 'Private Sector Bank',
    type: 'Private / PSB Hybrid',
    color: '#006837',
    rolesHired: 'Assistant Manager (Grade A), Executive, Retail Banking'
  },
  {
    id: 'jkb',
    name: 'Jammu & Kashmir Bank',
    code: 'JKB',
    category: 'private',
    categoryLabel: 'Private Sector Bank',
    type: 'Private Sector Bank',
    color: '#047857',
    rolesHired: 'Banking Associate, Probationary Officer, Credit Executive'
  },

  // ==========================================
  // 3. SMALL FINANCE & PAYMENTS BANKS (16 Banks)
  // ==========================================
  {
    id: 'au-sfb',
    name: 'AU Small Finance Bank',
    code: 'AU-SFB',
    category: 'sfb',
    categoryLabel: 'Small Finance Bank',
    type: 'Small Finance Bank',
    color: '#F15A24',
    rolesHired: 'Branch Banking Officer, Relationship Officer, Credit Manager',
    isTopRecruiter: true
  },
  {
    id: 'equitas',
    name: 'Equitas Small Finance Bank',
    code: 'EQUITAS',
    category: 'sfb',
    categoryLabel: 'Small Finance Bank',
    type: 'Small Finance Bank',
    color: '#0D9488',
    rolesHired: 'Branch Operations, Customer Service, Retail Loan Officer',
    isTopRecruiter: true
  },
  {
    id: 'ujjivan',
    name: 'Ujjivan Small Finance Bank',
    code: 'UJJIVAN',
    category: 'sfb',
    categoryLabel: 'Small Finance Bank',
    type: 'Small Finance Bank',
    color: '#0284C7',
    rolesHired: 'Customer Relationship Officer, Teller, Micro Loan Officer'
  },
  {
    id: 'jana',
    name: 'Jana Small Finance Bank',
    code: 'JANA',
    category: 'sfb',
    categoryLabel: 'Small Finance Bank',
    type: 'Small Finance Bank',
    color: '#D97706',
    rolesHired: 'Relationship Manager, Gold Loan Officer, Affordable Housing'
  },
  {
    id: 'utkarsh',
    name: 'Utkarsh Small Finance Bank',
    code: 'UTKARSH',
    category: 'sfb',
    categoryLabel: 'Small Finance Bank',
    type: 'Small Finance Bank',
    color: '#9333EA',
    rolesHired: 'Branch Banking Executive, Micro-banking Relationship Officer'
  },
  {
    id: 'esaf',
    name: 'ESAF Small Finance Bank',
    code: 'ESAF',
    category: 'sfb',
    categoryLabel: 'Small Finance Bank',
    type: 'Small Finance Bank',
    color: '#15803D',
    rolesHired: 'Branch Manager, Credit Officer, Priority Banking Officer'
  },
  {
    id: 'fincare',
    name: 'Fincare Small Finance Bank',
    code: 'FINCARE',
    category: 'sfb',
    categoryLabel: 'Small Finance Bank',
    type: 'Small Finance Bank',
    color: '#EA580C',
    rolesHired: 'Sales Officer, Customer Service Associate, Micro Loans'
  },
  {
    id: 'suryoday',
    name: 'Suryoday Small Finance Bank',
    code: 'SURYODAY',
    category: 'sfb',
    categoryLabel: 'Small Finance Bank',
    type: 'Small Finance Bank',
    color: '#E11D48',
    rolesHired: 'Loan Officer, Branch Operations, Casa Sales'
  },
  {
    id: 'capital-sfb',
    name: 'Capital Small Finance Bank',
    code: 'CAPITAL',
    category: 'sfb',
    categoryLabel: 'Small Finance Bank',
    type: 'Small Finance Bank',
    color: '#2563EB',
    rolesHired: 'Branch Executive, Retail Asset Officer, Teller'
  },
  {
    id: 'shivalik',
    name: 'Shivalik Small Finance Bank',
    code: 'SHIVALIK',
    category: 'sfb',
    categoryLabel: 'Small Finance Bank',
    type: 'Small Finance Bank',
    color: '#059669',
    rolesHired: 'Field Officer, Relationship Manager, MSME Finance'
  },
  {
    id: 'unity',
    name: 'Unity Small Finance Bank',
    code: 'UNITY',
    category: 'sfb',
    categoryLabel: 'Small Finance Bank',
    type: 'Small Finance Bank',
    color: '#4F46E5',
    rolesHired: 'Operations Executive, Digital Banking Associate'
  },
  {
    id: 'nesfb',
    name: 'North East Small Finance Bank',
    code: 'NESFB',
    category: 'sfb',
    categoryLabel: 'Small Finance Bank',
    type: 'Small Finance Bank',
    color: '#0891B2',
    rolesHired: 'Banking Associate, Loan Supervisor, Field Officer'
  },
  {
    id: 'airtel-bank',
    name: 'Airtel Payments Bank',
    code: 'AIRTEL',
    category: 'sfb',
    categoryLabel: 'Payments Bank',
    type: 'Payments Bank',
    color: '#DC2626',
    rolesHired: 'Area Sales Manager, Banking Points Executive, Partner Support',
    isTopRecruiter: true
  },
  {
    id: 'ippb',
    name: 'India Post Payments Bank',
    code: 'IPPB',
    category: 'sfb',
    categoryLabel: 'Payments Bank',
    type: 'Govt Payments Bank',
    color: '#B91C1C',
    rolesHired: 'Territory Officer, Customer Associate, Digital Banking'
  },
  {
    id: 'paytm-bank',
    name: 'Paytm Payments Bank',
    code: 'PAYTM',
    category: 'sfb',
    categoryLabel: 'Payments Bank',
    type: 'Payments Bank',
    color: '#002E6E',
    rolesHired: 'Merchant Acquisition, Operations Executive, KYC Associate'
  },
  {
    id: 'fino-bank',
    name: 'Fino Payments Bank',
    code: 'FINO',
    category: 'sfb',
    categoryLabel: 'Payments Bank',
    type: 'Payments Bank',
    color: '#7C3AED',
    rolesHired: 'Channel Partner Manager, Relationship Officer, Operations'
  },

  // ==========================================
  // 4. LEADING NBFCs & ASSET FINANCIERS (20 NBFCs)
  // ==========================================
  {
    id: 'bajaj-finserv',
    name: 'Bajaj Finserv / Bajaj Finance',
    code: 'BAJAJ',
    category: 'nbfc',
    categoryLabel: 'NBFC & Asset Finance',
    type: 'Retail NBFC Giant',
    color: '#0072CE',
    rolesHired: 'Unit Manager, Credit Underwriter, Store Relationship Officer',
    isTopRecruiter: true
  },
  {
    id: 'tata-capital',
    name: 'Tata Capital',
    code: 'TATA',
    category: 'nbfc',
    categoryLabel: 'NBFC & Asset Finance',
    type: 'Corporate NBFC',
    color: '#005696',
    rolesHired: 'Relationship Manager, Personal Loan Executive, Operations',
    isTopRecruiter: true
  },
  {
    id: 'lt-finance',
    name: 'L&T Finance Holdings',
    code: 'L&T',
    category: 'nbfc',
    categoryLabel: 'NBFC & Asset Finance',
    type: 'Diversified NBFC',
    color: '#004B87',
    rolesHired: 'Two-Wheeler Loan Officer, Farm Equipment Finance, Credit Analyst',
    isTopRecruiter: true
  },
  {
    id: 'aditya-birla-capital',
    name: 'Aditya Birla Capital',
    code: 'AB CAPITAL',
    category: 'nbfc',
    categoryLabel: 'NBFC & Asset Finance',
    type: 'Financial Conglomerate',
    color: '#C8102E',
    rolesHired: 'Branch Sales Manager, Loan Advisor, SME Finance Officer',
    isTopRecruiter: true
  },
  {
    id: 'mahindra-finance',
    name: 'Mahindra & Mahindra Financial Services',
    code: 'MMFS',
    category: 'nbfc',
    categoryLabel: 'NBFC & Asset Finance',
    type: 'Rural & Vehicle NBFC',
    color: '#D71920',
    rolesHired: 'Trainee Officer, Field Operations, Vehicle Loan Executive',
    isTopRecruiter: true
  },
  {
    id: 'shriram-finance',
    name: 'Shriram Finance',
    code: 'SHRIRAM',
    category: 'nbfc',
    categoryLabel: 'NBFC & Asset Finance',
    type: 'Commercial & Retail NBFC',
    color: '#E65100',
    rolesHired: 'Management Trainee, Branch Credit Officer, Customer Executive',
    isTopRecruiter: true
  },
  {
    id: 'chola',
    name: 'Cholamandalam Investment & Finance',
    code: 'CHOLA',
    category: 'nbfc',
    categoryLabel: 'NBFC & Asset Finance',
    type: 'Vehicle & SME NBFC',
    color: '#15803D',
    rolesHired: 'Credit Officer, Business Executive, Operations Trainee'
  },
  {
    id: 'muthoot-finance',
    name: 'Muthoot Finance',
    code: 'MUTHOOT',
    category: 'nbfc',
    categoryLabel: 'NBFC & Asset Finance',
    type: 'Gold Loan NBFC',
    color: '#C026D3',
    rolesHired: 'Junior Relationship Executive, Branch Manager, Customer Care',
    isTopRecruiter: true
  },
  {
    id: 'manappuram',
    name: 'Manappuram Finance',
    code: 'MANAPPURAM',
    category: 'nbfc',
    categoryLabel: 'NBFC & Asset Finance',
    type: 'Gold Loan NBFC',
    color: '#E11D48',
    rolesHired: 'Assistant Branch Manager, Teller, Customer Relationship'
  },
  {
    id: 'sundaram-finance',
    name: 'Sundaram Finance',
    code: 'SUNDARAM',
    category: 'nbfc',
    categoryLabel: 'NBFC & Asset Finance',
    type: 'Auto & Commercial NBFC',
    color: '#0284C7',
    rolesHired: 'Executive Trainee, Credit Assessor, Field Executive'
  },
  {
    id: 'poonawalla',
    name: 'Poonawalla Fincorp',
    code: 'POONAWALLA',
    category: 'nbfc',
    categoryLabel: 'NBFC & Asset Finance',
    type: 'Consumer NBFC',
    color: '#4338CA',
    rolesHired: 'Sales Manager, Credit Analyst, Customer Experience Associate'
  },
  {
    id: 'piramal',
    name: 'Piramal Capital & Housing',
    code: 'PIRAMAL',
    category: 'nbfc',
    categoryLabel: 'NBFC & Asset Finance',
    type: 'Retail Finance',
    color: '#B91C1C',
    rolesHired: 'Loan Officer, Branch Relationship Officer, Credit Verification'
  },
  {
    id: 'hero-fincorp',
    name: 'Hero FinCorp',
    code: 'HERO',
    category: 'nbfc',
    categoryLabel: 'NBFC & Asset Finance',
    type: 'Consumer & SME NBFC',
    color: '#DC2626',
    rolesHired: 'Customer Acquisition Executive, Credit Officer, Dealer Manager'
  },
  {
    id: 'tvs-credit',
    name: 'TVS Credit Services',
    code: 'TVS',
    category: 'nbfc',
    categoryLabel: 'NBFC & Asset Finance',
    type: 'Retail NBFC',
    color: '#1E40AF',
    rolesHired: 'Territory Manager, Sales Officer, Two-Wheeler Loans'
  },
  {
    id: 'smfg',
    name: 'SMFG India Credit (Fullerton)',
    code: 'SMFG',
    category: 'nbfc',
    categoryLabel: 'NBFC & Asset Finance',
    type: 'Consumer NBFC',
    color: '#059669',
    rolesHired: 'Customer Service Officer, Loan Officer, Branch Ops'
  },
  {
    id: 'northern-arc',
    name: 'Northern Arc Capital',
    code: 'NORTHERN ARC',
    category: 'nbfc',
    categoryLabel: 'NBFC & Asset Finance',
    type: 'Credit Platform NBFC',
    color: '#7C2D12',
    rolesHired: 'Credit Analyst, Operations Executive, Risk Associate'
  },
  {
    id: 'iifl',
    name: 'IIFL Finance',
    code: 'IIFL',
    category: 'nbfc',
    categoryLabel: 'NBFC & Asset Finance',
    type: 'Diversified NBFC',
    color: '#B45309',
    rolesHired: 'Gold Loan Officer, Branch Executive, SME Loans'
  },
  {
    id: 'dmi',
    name: 'DMI Finance',
    code: 'DMI',
    category: 'nbfc',
    categoryLabel: 'NBFC & Asset Finance',
    type: 'Digital NBFC',
    color: '#4F46E5',
    rolesHired: 'Operations Associate, Credit Underwriter, Risk Trainee'
  },
  {
    id: 'avanse',
    name: 'Avanse Financial Services',
    code: 'AVANSE',
    category: 'nbfc',
    categoryLabel: 'NBFC & Asset Finance',
    type: 'Education NBFC',
    color: '#0D9488',
    rolesHired: 'Education Loan Counselor, Credit Analyst, Sales Specialist'
  },
  {
    id: 'incred',
    name: 'InCred Financial Services',
    code: 'INCRED',
    category: 'nbfc',
    categoryLabel: 'NBFC & Asset Finance',
    type: 'Digital NBFC',
    color: '#6366F1',
    rolesHired: 'Relationship Manager, Risk Associate, Consumer Lending'
  },

  // ==========================================
  // 5. HOUSING FINANCE COMPANIES (12 HFCs)
  // ==========================================
  {
    id: 'hdb-fs',
    name: 'HDB Financial Services',
    code: 'HDB',
    category: 'hfc',
    categoryLabel: 'Housing & Asset Finance',
    type: 'HDFC Group Subsidiary',
    color: '#004B87',
    rolesHired: 'Credit Officer, Branch Executive, Loan Verification',
    isTopRecruiter: true
  },
  {
    id: 'lic-hfl',
    name: 'LIC Housing Finance',
    code: 'LIC HFL',
    category: 'hfc',
    categoryLabel: 'Housing & Asset Finance',
    type: 'Housing Finance',
    color: '#1E3A8A',
    rolesHired: 'Assistant Manager, Credit Processing Trainee, Marketing Officer',
    isTopRecruiter: true
  },
  {
    id: 'pnb-hfl',
    name: 'PNB Housing Finance',
    code: 'PNB HFL',
    category: 'hfc',
    categoryLabel: 'Housing & Asset Finance',
    type: 'Housing Finance',
    color: '#9E1B32',
    rolesHired: 'Relationship Officer, Loan Underwriter, Operations Associate'
  },
  {
    id: 'can-fin',
    name: 'Can Fin Homes',
    code: 'CAN FIN',
    category: 'hfc',
    categoryLabel: 'Housing & Asset Finance',
    type: 'Housing Finance',
    color: '#0284C7',
    rolesHired: 'Junior Officer, Branch Cashier, Loan Executive'
  },
  {
    id: 'aadhar-housing',
    name: 'Aadhar Housing Finance',
    code: 'AADHAR',
    category: 'hfc',
    categoryLabel: 'Housing & Asset Finance',
    type: 'Affordable Housing',
    color: '#D97706',
    rolesHired: 'Branch Sales Manager, Credit Appraiser, Customer Care'
  },
  {
    id: 'home-first',
    name: 'Home First Finance Company',
    code: 'HOME FIRST',
    category: 'hfc',
    categoryLabel: 'Housing & Asset Finance',
    type: 'Housing Finance',
    color: '#2563EB',
    rolesHired: 'Relationship Manager, Loan Processing, Valuation Associate'
  },
  {
    id: 'aavas',
    name: 'Aavas Financiers',
    code: 'AAVAS',
    category: 'hfc',
    categoryLabel: 'Housing & Asset Finance',
    type: 'Affordable Housing',
    color: '#059669',
    rolesHired: 'Loan Officer, Technical Valuer, Customer Executive'
  },
  {
    id: 'india-shelter',
    name: 'India Shelter Finance',
    code: 'INDIA SHELTER',
    category: 'hfc',
    categoryLabel: 'Housing & Asset Finance',
    type: 'Housing Finance',
    color: '#EA580C',
    rolesHired: 'Branch Associate, Credit Processor, Sales Trainee'
  },
  {
    id: 'repco-home',
    name: 'Repco Home Finance',
    code: 'REPCO',
    category: 'hfc',
    categoryLabel: 'Housing & Asset Finance',
    type: 'Housing Finance',
    color: '#DC2626',
    rolesHired: 'Assistant Manager, Clerk, Legal & Technical Appraiser'
  },
  {
    id: 'gic-hfl',
    name: 'GIC Housing Finance',
    code: 'GIC HFL',
    category: 'hfc',
    categoryLabel: 'Housing & Asset Finance',
    type: 'Housing Finance',
    color: '#0F766E',
    rolesHired: 'Credit Executive, Processing Officer, Branch Support'
  },
  {
    id: 'indiabulls-home',
    name: 'Indiabulls Home Loans',
    code: 'INDIABULLS',
    category: 'hfc',
    categoryLabel: 'Housing & Asset Finance',
    type: 'Housing Finance',
    color: '#008000',
    rolesHired: 'Relationship Officer, Home Loan Sales, Credit Underwriter',
    isTopRecruiter: true
  },
  {
    id: 'capri-housing',
    name: 'Capri Global Housing Finance',
    code: 'CAPRI',
    category: 'hfc',
    categoryLabel: 'Housing & Asset Finance',
    type: 'Affordable Housing',
    color: '#4C1D95',
    rolesHired: 'Sales Officer, Credit Underwriter, Operations Associate'
  },

  // ==========================================
  // 6. GLOBAL & MULTINATIONAL BANKS (12 Global Institutions)
  // ==========================================
  {
    id: 'natwest-rbs',
    name: 'The Royal Bank of Scotland / NatWest Group',
    code: 'NATWEST',
    category: 'global',
    categoryLabel: 'Global & MNC Bank',
    type: 'Global Investment & Retail Bank',
    color: '#002663',
    rolesHired: 'Analyst, Operations Associate, KYC Specialist, Customer Service',
    isTopRecruiter: true
  },
  {
    id: 'hsbc',
    name: 'HSBC India',
    code: 'HSBC',
    category: 'global',
    categoryLabel: 'Global & MNC Bank',
    type: 'Global Bank',
    color: '#DB0011',
    rolesHired: 'Premier Banker, Global Service Associate, Operations Analyst',
    isTopRecruiter: true
  },
  {
    id: 'stanchar',
    name: 'Standard Chartered Bank',
    code: 'STANCHAR',
    category: 'global',
    categoryLabel: 'Global & MNC Bank',
    type: 'Global Bank',
    color: '#00853E',
    rolesHired: 'Client Relationship Executive, Trade Ops Trainee, Priority Banker',
    isTopRecruiter: true
  },
  {
    id: 'citi',
    name: 'Citibank India / Citi',
    code: 'CITI',
    category: 'global',
    categoryLabel: 'Global & MNC Bank',
    type: 'Global Institutional Bank',
    color: '#003B70',
    rolesHired: 'Operations Analyst, Wealth Management Associate, Risk Trainee',
    isTopRecruiter: true
  },
  {
    id: 'deutsche',
    name: 'Deutsche Bank',
    code: 'DEUTSCHE',
    category: 'global',
    categoryLabel: 'Global & MNC Bank',
    type: 'Global Corporate Bank',
    color: '#0018A8',
    rolesHired: 'Corporate Banking Analyst, Operations Executive, Trade Specialist'
  },
  {
    id: 'barclays',
    name: 'Barclays India',
    code: 'BARCLAYS',
    category: 'global',
    categoryLabel: 'Global & MNC Bank',
    type: 'Global Bank',
    color: '#00AEEF',
    rolesHired: 'Service Executive, Operations Trainee, Wealth Support'
  },
  {
    id: 'dbs',
    name: 'DBS Bank India',
    code: 'DBS',
    category: 'global',
    categoryLabel: 'Global & MNC Bank',
    type: 'Global & Digital Bank',
    color: '#ED1C24',
    rolesHired: 'Relationship Manager, Digibank Executive, SME Banker',
    isTopRecruiter: true
  },
  {
    id: 'jpmorgan',
    name: 'J.P. Morgan Chase',
    code: 'JPM',
    category: 'global',
    categoryLabel: 'Global & MNC Bank',
    type: 'Global Financial Hub',
    color: '#1D4ED8',
    rolesHired: 'Operations Analyst, Financial Trainee, Reconciliation Officer'
  },
  {
    id: 'morgan-stanley',
    name: 'Morgan Stanley',
    code: 'MS',
    category: 'global',
    categoryLabel: 'Global & MNC Bank',
    type: 'Global Financial Services',
    color: '#002855',
    rolesHired: 'Operations Associate, Fund Accounting Trainee, Settlements'
  },
  {
    id: 'bnp-paribas',
    name: 'BNP Paribas',
    code: 'BNP',
    category: 'global',
    categoryLabel: 'Global & MNC Bank',
    type: 'Global Bank',
    color: '#00965E',
    rolesHired: 'Junior Analyst, Banking Operations Officer, KYC Reviewer'
  },
  {
    id: 'bank-of-america',
    name: 'Bank of America',
    code: 'BOA',
    category: 'global',
    categoryLabel: 'Global & MNC Bank',
    type: 'Global Financial Services',
    color: '#012169',
    rolesHired: 'Global Processing Associate, Client Service Rep, Payment Ops'
  },
  {
    id: 'ubs',
    name: 'UBS India',
    code: 'UBS',
    category: 'global',
    categoryLabel: 'Global & MNC Bank',
    type: 'Global Wealth & Bank',
    color: '#262626',
    rolesHired: 'Wealth Associate, Operations Analyst, Compliance Support'
  },

  // ==========================================
  // 7. LIFE & GENERAL INSURANCE COMPANIES (16 Insurance Giants)
  // ==========================================
  {
    id: 'lic',
    name: 'Life Insurance Corporation of India',
    code: 'LIC',
    category: 'insurance',
    categoryLabel: 'Insurance & Wealth',
    type: 'Public Sector Insurance',
    color: '#002B7F',
    rolesHired: 'Direct Sales Executive, Apprentice Development Officer, Assistant',
    isTopRecruiter: true
  },
  {
    id: 'hdfc-life',
    name: 'HDFC Life Insurance',
    code: 'HDFC LIFE',
    category: 'insurance',
    categoryLabel: 'Insurance & Wealth',
    type: 'Life Insurance',
    color: '#004B87',
    rolesHired: 'Corporate Agency Manager, Bancassurance Manager, Financial Planner',
    isTopRecruiter: true
  },
  {
    id: 'icici-pru-life',
    name: 'ICICI Prudential Life Insurance',
    code: 'ICICI PRU',
    category: 'insurance',
    categoryLabel: 'Insurance & Wealth',
    type: 'Life Insurance',
    color: '#97144D',
    rolesHired: 'Financial Counselor, Bancassurance Officer, Unit Manager',
    isTopRecruiter: true
  },
  {
    id: 'sbi-life',
    name: 'SBI Life Insurance',
    code: 'SBI LIFE',
    category: 'insurance',
    categoryLabel: 'Insurance & Wealth',
    type: 'Life Insurance',
    color: '#002B7F',
    rolesHired: 'Unit Manager, Channel Sales Executive, Customer Service',
    isTopRecruiter: true
  },
  {
    id: 'max-life',
    name: 'Max Life Insurance',
    code: 'MAX LIFE',
    category: 'insurance',
    categoryLabel: 'Insurance & Wealth',
    type: 'Life Insurance',
    color: '#0284C7',
    rolesHired: 'Agency Associate, Bancassurance Specialist, Branch Sales'
  },
  {
    id: 'bajaj-allianz-life',
    name: 'Bajaj Allianz Life Insurance',
    code: 'BAJAJ ALLIANZ',
    category: 'insurance',
    categoryLabel: 'Insurance & Wealth',
    type: 'Life Insurance',
    color: '#0072CE',
    rolesHired: 'Relationship Manager, Sales Officer, Direct Marketing'
  },
  {
    id: 'tata-aia',
    name: 'Tata AIA Life Insurance',
    code: 'TATA AIA',
    category: 'insurance',
    categoryLabel: 'Insurance & Wealth',
    type: 'Life Insurance',
    color: '#005696',
    rolesHired: 'Client Advisor, Business Associate, Branch Ops'
  },
  {
    id: 'aditya-birla-sun-life',
    name: 'Aditya Birla Sun Life Insurance',
    code: 'ABSLI',
    category: 'insurance',
    categoryLabel: 'Insurance & Wealth',
    type: 'Life Insurance',
    color: '#C8102E',
    rolesHired: 'Bancassurance Executive, Branch Sales, Customer Support'
  },
  {
    id: 'kotak-life',
    name: 'Kotak Life Insurance',
    code: 'KOTAK LIFE',
    category: 'insurance',
    categoryLabel: 'Insurance & Wealth',
    type: 'Life Insurance',
    color: '#ED1C24',
    rolesHired: 'Direct Sales Associate, Agency Manager, Partner Support'
  },
  {
    id: 'star-health',
    name: 'Star Health & Allied Insurance',
    code: 'STAR HEALTH',
    category: 'insurance',
    categoryLabel: 'Insurance & Wealth',
    type: 'Health Insurance',
    color: '#2563EB',
    rolesHired: 'Claims Executive, Sales Officer, Hospital Network Coordinator',
    isTopRecruiter: true
  },
  {
    id: 'icici-lombard',
    name: 'ICICI Lombard General Insurance',
    code: 'ICICI LOMBARD',
    category: 'insurance',
    categoryLabel: 'Insurance & Wealth',
    type: 'General Insurance',
    color: '#861A22',
    rolesHired: 'Underwriting Trainee, Agency Associate, Motor Insurance Sales'
  },
  {
    id: 'hdfc-ergo',
    name: 'HDFC ERGO General Insurance',
    code: 'HDFC ERGO',
    category: 'insurance',
    categoryLabel: 'Insurance & Wealth',
    type: 'General Insurance',
    color: '#004B87',
    rolesHired: 'Branch Operations, Sales Manager, Claims Support'
  },
  {
    id: 'sbi-general',
    name: 'SBI General Insurance',
    code: 'SBI GENERAL',
    category: 'insurance',
    categoryLabel: 'Insurance & Wealth',
    type: 'General Insurance',
    color: '#002B7F',
    rolesHired: 'Executive Trainee, Channel Partner Rep, Commercial Lines'
  },
  {
    id: 'care-health',
    name: 'Care Health Insurance',
    code: 'CARE HEALTH',
    category: 'insurance',
    categoryLabel: 'Insurance & Wealth',
    type: 'Health Insurance',
    color: '#059669',
    rolesHired: 'Relationship Officer, Claims Coordinator, Agency Leader'
  },
  {
    id: 'new-india-assurance',
    name: 'The New India Assurance Company',
    code: 'NEW INDIA',
    category: 'insurance',
    categoryLabel: 'Insurance & Wealth',
    type: 'Govt General Insurance',
    color: '#991B1B',
    rolesHired: 'Assistant, Administrative Officer (Scale-I), Claim Analyst'
  },
  {
    id: 'niva-bupa',
    name: 'Niva Bupa Health Insurance',
    code: 'NIVA BUPA',
    category: 'insurance',
    categoryLabel: 'Insurance & Wealth',
    type: 'Health Insurance',
    color: '#0284C7',
    rolesHired: 'Sales Trainee, Customer Service, Bancassurance Partner'
  },

  // ==========================================
  // 8. WEALTH, MICROFINANCE & FINTECH (14 Institutions)
  // ==========================================
  {
    id: 'motilal-oswal',
    name: 'Motilal Oswal Financial Services',
    code: 'MOTILAL',
    category: 'fintech',
    categoryLabel: 'Fintech, Wealth & Microfinance',
    type: 'Wealth & Broking',
    color: '#004B87',
    rolesHired: 'Wealth Advisor, Equity Dealer, Relationship Executive',
    isTopRecruiter: true
  },
  {
    id: 'sharekhan',
    name: 'Sharekhan by BNP Paribas',
    code: 'SHAREKHAN',
    category: 'fintech',
    categoryLabel: 'Fintech, Wealth & Microfinance',
    type: 'Retail Broking',
    color: '#E11D48',
    rolesHired: 'Relationship Manager, Branch Trainee, Equity Specialist'
  },
  {
    id: 'angel-one',
    name: 'Angel One',
    code: 'ANGEL ONE',
    category: 'fintech',
    categoryLabel: 'Fintech, Wealth & Microfinance',
    type: 'Digital Broking & Wealth',
    color: '#2563EB',
    rolesHired: 'Advisory Executive, Support Specialist, Product Specialist'
  },
  {
    id: 'geojit',
    name: 'Geojit Financial Services',
    code: 'GEOJIT',
    category: 'fintech',
    categoryLabel: 'Fintech, Wealth & Microfinance',
    type: 'Broking & Wealth',
    color: '#15803D',
    rolesHired: 'Branch Head Trainee, Investment Counselor, Dealer'
  },
  {
    id: 'anand-rathi',
    name: 'Anand Rathi Wealth',
    code: 'ANAND RATHI',
    category: 'fintech',
    categoryLabel: 'Fintech, Wealth & Microfinance',
    type: 'Private Wealth',
    color: '#B45309',
    rolesHired: 'Private Wealth Associate, Financial Planner, Research Trainee'
  },
  {
    id: 'edelweiss',
    name: 'Edelweiss Financial Services',
    code: 'EDELWEISS',
    category: 'fintech',
    categoryLabel: 'Fintech, Wealth & Microfinance',
    type: 'Financial Services',
    color: '#1E40AF',
    rolesHired: 'Associate, Credit Analyst, Wealth Relationship Trainee'
  },
  {
    id: 'creditaccess-grameen',
    name: 'CreditAccess Grameen',
    code: 'CREDITACCESS',
    category: 'fintech',
    categoryLabel: 'Fintech, Wealth & Microfinance',
    type: 'Microfinance Institution',
    color: '#047857',
    rolesHired: 'Kendra Manager, Loan Officer, Community Banker',
    isTopRecruiter: true
  },
  {
    id: 'spandana',
    name: 'Spandana Sphoorty Financial',
    code: 'SPANDANA',
    category: 'fintech',
    categoryLabel: 'Fintech, Wealth & Microfinance',
    type: 'Microfinance NBFC',
    color: '#9A1C20',
    rolesHired: 'Field Assistant, Credit Supervisor, Branch Accountant'
  },
  {
    id: 'fusion-micro',
    name: 'Fusion Micro Finance',
    code: 'FUSION',
    category: 'fintech',
    categoryLabel: 'Fintech, Wealth & Microfinance',
    type: 'Microfinance NBFC',
    color: '#C2410C',
    rolesHired: 'Relationship Officer, Branch Accountant, Field Auditor'
  },
  {
    id: 'satin-creditcare',
    name: 'Satin Creditcare Network',
    code: 'SATIN',
    category: 'fintech',
    categoryLabel: 'Fintech, Wealth & Microfinance',
    type: 'Microfinance NBFC',
    color: '#4338CA',
    rolesHired: 'Community Banking Trainee, Relationship Officer, Field Executive'
  },
  {
    id: 'muthoot-microfin',
    name: 'Muthoot Microfin',
    code: 'MUTHOOT MICRO',
    category: 'fintech',
    categoryLabel: 'Fintech, Wealth & Microfinance',
    type: 'Microfinance NBFC',
    color: '#BE185D',
    rolesHired: 'Field Credit Officer, Branch Executive, Collection Trainee'
  },
  {
    id: 'phonepe',
    name: 'PhonePe Financial Services',
    code: 'PHONEPE',
    category: 'fintech',
    categoryLabel: 'Fintech, Wealth & Microfinance',
    type: 'Fintech & Digital Lending',
    color: '#5F259F',
    rolesHired: 'Business Development Associate, Financial Product Specialist',
    isTopRecruiter: true
  },
  {
    id: 'lendingkart',
    name: 'Lendingkart Technologies',
    code: 'LENDINGKART',
    category: 'fintech',
    categoryLabel: 'Fintech, Wealth & Microfinance',
    type: 'Fintech MSME Lending',
    color: '#0891B2',
    rolesHired: 'Credit Underwriting Associate, Inside Sales Executive'
  },
  {
    id: 'navi',
    name: 'Navi Technologies',
    code: 'NAVI',
    category: 'fintech',
    categoryLabel: 'Fintech, Wealth & Microfinance',
    type: 'Digital Lending & NBFC',
    color: '#0D9488',
    rolesHired: 'Customer Success Specialist, Credit Analyst, Risk Associate'
  }
];

// Re-export top recruiters for concise preview or marquee
export const TOP_BFSI_RECRUITERS = BFSI_ORGANISATIONS.filter(b => b.isTopRecruiter);

// Selected Top 10 marquee BFSI organisations for the primary home grid
export const TOP_10_BFSI_ORGANISATIONS: BfsiOrganisation[] = [
  BFSI_ORGANISATIONS.find(b => b.id === 'sbi')!,
  BFSI_ORGANISATIONS.find(b => b.id === 'hdfc')!,
  BFSI_ORGANISATIONS.find(b => b.id === 'icici')!,
  BFSI_ORGANISATIONS.find(b => b.id === 'axis')!,
  BFSI_ORGANISATIONS.find(b => b.id === 'kotak')!,
  BFSI_ORGANISATIONS.find(b => b.id === 'pnb')!,
  BFSI_ORGANISATIONS.find(b => b.id === 'bob')!,
  BFSI_ORGANISATIONS.find(b => b.id === 'au-sfb')!,
  BFSI_ORGANISATIONS.find(b => b.id === 'bajaj-finserv')!,
  BFSI_ORGANISATIONS.find(b => b.id === 'natwest-rbs')!,
];

// Backwards-compatible BANK_PARTNERS list (matches original structure)
export const BANK_PARTNERS = BFSI_ORGANISATIONS.slice(0, 16).map(b => ({
  name: b.name,
  code: b.code,
  type: b.type,
  color: b.color
}));
