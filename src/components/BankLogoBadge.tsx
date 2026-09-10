import React from 'react';

interface BankLogoBadgeProps {
  bankCode: string;
  bankName?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'emblem' | 'full' | 'pill';
  className?: string;
}

export const BankLogoBadge: React.FC<BankLogoBadgeProps> = ({
  bankCode,
  bankName,
  size = 'md',
  variant = 'full',
  className = '',
}) => {
  const normalized = (bankCode || '').toUpperCase().trim();

  // Size configs
  const sizeMap = {
    sm: { icon: 'w-5 h-5', text: 'text-[11px]', badge: 'px-2 py-0.5' },
    md: { icon: 'w-7 h-7', text: 'text-xs', badge: 'px-2.5 py-1' },
    lg: { icon: 'w-9 h-9', text: 'text-sm font-bold', badge: 'px-3 py-1.5' },
    xl: { icon: 'w-12 h-12', text: 'text-base font-bold', badge: 'px-4 py-2' },
  }[size];

  // Bank Specific Colors and SVG Emblems
  const getBankConfig = () => {
    switch (true) {
      case normalized.includes('AXIS'):
        return {
          name: bankName || 'Axis Bank',
          color: '#971237',
          bgColor: 'bg-[#971237]',
          textColor: 'text-[#971237]',
          emblem: (
            <svg viewBox="0 0 100 100" className="w-full h-full" fill="currentColor">
              <polygon points="50,15 88,85 12,85" />
              <polygon points="50,42 72,85 28,85" fill="#ffffff" />
              <polygon points="50,60 62,85 38,85" fill="#971237" />
            </svg>
          )
        };

      case normalized.includes('KOTAK'):
        return {
          name: bankName || 'Kotak Mahindra Bank',
          color: '#ED1C24',
          bgColor: 'bg-[#ED1C24]',
          textColor: 'text-[#ED1C24]',
          emblem: (
            <svg viewBox="0 0 100 100" className="w-full h-full" fill="currentColor">
              <path d="M28,50 C28,38 38,28 50,28 C62,28 72,38 72,50 C72,62 62,72 50,72 C38,72 28,62 28,50 Z M40,50 C40,55 45,60 50,60 C55,60 60,55 60,50 C60,45 55,40 50,40 C45,40 40,45 40,50 Z" />
              <circle cx="28" cy="50" r="14" fill="currentColor" />
              <circle cx="72" cy="50" r="14" fill="currentColor" />
            </svg>
          )
        };

      case normalized.includes('HDFC'):
        return {
          name: bankName || 'HDFC Bank',
          color: '#004C8F',
          bgColor: 'bg-[#004C8F]',
          textColor: 'text-[#004C8F]',
          emblem: (
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <rect width="100" height="100" rx="14" fill="#004C8F" />
              <rect x="18" y="18" width="28" height="28" rx="4" fill="#ED232A" />
              <rect x="54" y="18" width="28" height="28" rx="4" fill="#ED232A" />
              <rect x="18" y="54" width="28" height="28" rx="4" fill="#ED232A" />
              <rect x="54" y="54" width="28" height="28" rx="4" fill="#ED232A" />
              <rect x="36" y="36" width="28" height="28" fill="#ffffff" />
            </svg>
          )
        };

      case normalized.includes('BANDHAN'):
        return {
          name: bankName || 'Bandhan Bank',
          color: '#ED1C24',
          bgColor: 'bg-[#004B87]',
          textColor: 'text-[#004B87]',
          emblem: (
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <circle cx="50" cy="50" r="48" fill="#F37023" />
              <path d="M50,18 C58,32 72,48 72,62 C72,74 62,84 50,84 C38,84 28,74 28,62 C28,48 42,32 50,18 Z" fill="#ffffff" />
              <path d="M50,38 C54,48 62,58 62,66 C62,73 57,78 50,78 C43,78 38,73 38,66 C38,58 46,48 50,38 Z" fill="#ED1C24" />
            </svg>
          )
        };

      case normalized.includes('INDUSIND'):
        return {
          name: bankName || 'IndusInd Bank',
          color: '#861A22',
          bgColor: 'bg-[#861A22]',
          textColor: 'text-[#861A22]',
          emblem: (
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <circle cx="50" cy="50" r="48" fill="#861A22" />
              <path d="M25,58 C32,42 45,34 60,34 C72,34 78,42 75,56 C72,70 56,76 42,76 C30,76 22,68 25,58 Z" fill="#ffffff" />
              <circle cx="68" cy="38" r="6" fill="#F8A51D" />
            </svg>
          )
        };

      case normalized.includes('SBI') || normalized.includes('STATE BANK'):
        return {
          name: bankName || 'State Bank of India',
          color: '#002B7F',
          bgColor: 'bg-[#002B7F]',
          textColor: 'text-[#002B7F]',
          emblem: (
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <circle cx="50" cy="50" r="48" fill="#002B7F" />
              <circle cx="50" cy="50" r="22" fill="#ffffff" />
              <rect x="44" y="50" width="12" height="42" fill="#ffffff" />
            </svg>
          )
        };

      case normalized.includes('ICICI'):
        return {
          name: bankName || 'ICICI Bank',
          color: '#9E1C38',
          bgColor: 'bg-[#9E1C38]',
          textColor: 'text-[#9E1C38]',
          emblem: (
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <circle cx="50" cy="50" r="48" fill="#9E1C38" />
              <circle cx="50" cy="34" r="9" fill="#F58220" />
              <path d="M42,50 L58,50 L58,74 L42,74 Z" fill="#F58220" />
            </svg>
          )
        };

      case normalized.includes('RBS') || normalized.includes('ROYAL BANK'):
        return {
          name: bankName || 'RBS (Royal Bank of Scotland)',
          color: '#002663',
          bgColor: 'bg-[#002663]',
          textColor: 'text-[#002663]',
          emblem: (
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <rect width="100" height="100" rx="16" fill="#002663" />
              <circle cx="50" cy="50" r="14" fill="#ffffff" />
              <circle cx="50" cy="24" r="8" fill="#ffffff" />
              <circle cx="50" cy="76" r="8" fill="#ffffff" />
              <circle cx="24" cy="50" r="8" fill="#ffffff" />
              <circle cx="76" cy="50" r="8" fill="#ffffff" />
            </svg>
          )
        };

      case normalized.includes('HDB'):
        return {
          name: bankName || 'HDB Financial Services',
          color: '#004C8F',
          bgColor: 'bg-[#004C8F]',
          textColor: 'text-[#004C8F]',
          emblem: (
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <rect width="100" height="100" rx="14" fill="#004C8F" />
              <rect x="20" y="20" width="26" height="60" rx="4" fill="#ffffff" />
              <rect x="54" y="20" width="26" height="60" rx="4" fill="#ED232A" />
            </svg>
          )
        };

      case normalized.includes('INDIABULLS'):
        return {
          name: bankName || 'Indiabulls Home Loans',
          color: '#008000',
          bgColor: 'bg-[#006837]',
          textColor: 'text-[#006837]',
          emblem: (
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <circle cx="50" cy="50" r="48" fill="#006837" />
              <path d="M30,52 L44,66 L72,36" fill="none" stroke="#ffffff" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )
        };

      case normalized.includes('AU'):
        return {
          name: bankName || 'AU Small Finance Bank',
          color: '#6A1B9A',
          bgColor: 'bg-[#6A1B9A]',
          textColor: 'text-[#6A1B9A]',
          emblem: (
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <rect width="100" height="100" rx="16" fill="#F15A24" />
              <text x="50" y="68" fill="#ffffff" fontSize="50" fontWeight="900" textAnchor="middle">AU</text>
            </svg>
          )
        };

      case normalized.includes('BAJAJ'):
        return {
          name: bankName || 'Bajaj Finserv',
          color: '#0072CE',
          bgColor: 'bg-[#0072CE]',
          textColor: 'text-[#0072CE]',
          emblem: (
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <circle cx="50" cy="50" r="48" fill="#0072CE" />
              <polygon points="26,72 50,28 74,72 50,56" fill="#ffffff" />
            </svg>
          )
        };

      default:
        return {
          name: bankName || bankCode,
          color: '#003399',
          bgColor: 'bg-[#003399]',
          textColor: 'text-[#003399]',
          emblem: (
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <rect width="100" height="100" rx="16" fill="#003399" />
              <text x="50" y="62" fill="#ffffff" fontSize="36" fontWeight="900" textAnchor="middle">
                {normalized.substring(0, 3)}
              </text>
            </svg>
          )
        };
    }
  };

  const config = getBankConfig();

  if (variant === 'emblem') {
    return (
      <div className={`shrink-0 ${sizeMap.icon} ${className}`} title={config.name}>
        {config.emblem}
      </div>
    );
  }

  if (variant === 'pill') {
    return (
      <div className={`inline-flex items-center gap-1.5 ${sizeMap.badge} rounded-full bg-slate-50 border border-slate-200/80 shadow-2xs ${className}`}>
        <div className={`shrink-0 ${sizeMap.icon}`}>
          {config.emblem}
        </div>
        <span className={`font-bold ${sizeMap.text} text-slate-800 whitespace-nowrap`}>
          {config.name}
        </span>
      </div>
    );
  }

  // Full variant (emblem + label)
  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <div className={`shrink-0 ${sizeMap.icon} drop-shadow-2xs`}>
        {config.emblem}
      </div>
      <span className={`font-black ${sizeMap.text} ${config.textColor} tracking-tight whitespace-nowrap`}>
        {config.name}
      </span>
    </div>
  );
};
