import React, { useState, useEffect, useId } from 'react';
import { 
  getCustomLogo, 
  getLogoStyle, 
  getLogoScale, 
  BankPlusLogoStyle 
} from '../utils/logoStorage';

export interface BankPlusLogoProps {
  className?: string;
  variant?: 'light' | 'dark'; // 'light' for white/light backgrounds, 'dark' for dark backgrounds
  showTagline?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  styleVariant?: BankPlusLogoStyle;
}

export const BankPlusLogo: React.FC<BankPlusLogoProps> = ({
  className = '',
  variant = 'light',
  showTagline = true,
  size = 'md',
  styleVariant,
}) => {
  const uid = useId().replace(/:/g, '');
  const isDark = variant === 'dark';

  const [customLogo, setCustomLogo] = useState<string | null>(null);
  const [activeStyle, setActiveStyle] = useState<BankPlusLogoStyle>('emblem');
  const [scale, setScale] = useState<number>(100);

  useEffect(() => {
    // Initial sync
    setCustomLogo(getCustomLogo());
    setActiveStyle(styleVariant || getLogoStyle());
    setScale(getLogoScale());

    const handleUpdate = () => {
      setCustomLogo(getCustomLogo());
      setActiveStyle(styleVariant || getLogoStyle());
      setScale(getLogoScale());
    };

    window.addEventListener('bankplus_logo_updated', handleUpdate);
    return () => window.removeEventListener('bankplus_logo_updated', handleUpdate);
  }, [styleVariant]);

  // Height scaling
  const heightClass = {
    sm: 'h-8 sm:h-9',
    md: 'h-10 sm:h-12',
    lg: 'h-12 sm:h-14',
    xl: 'h-16 sm:h-20',
  }[size];

  // 1. If user uploaded a custom logo file (PNG, SVG, etc.)
  if (customLogo) {
    return (
      <div className={`inline-flex items-center select-none relative ${className}`}>
        <img
          src={customLogo}
          alt="BankPlus - Financial Education Simplified"
          style={{ transform: scale !== 100 ? `scale(${scale / 100})` : undefined }}
          className={`${heightClass} w-auto max-w-full object-contain transition-transform`}
        />
      </div>
    );
  }

  // 2. High-Fidelity Mathematical Vector SVG
  // Style 1: Executive Banking Crest (Default)
  if (activeStyle === 'emblem') {
    return (
      <div className={`inline-flex items-center select-none relative group/logo ${className}`}>
        <svg
          viewBox="0 0 250 52"
          className={`${heightClass} w-auto max-w-full drop-shadow-xs`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="BankPlus - Financial Education Simplified"
        >
          <defs>
            <linearGradient id={`${uid}-emblemGrad`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={isDark ? '#0f172a' : '#002b7f'} />
              <stop offset="50%" stopColor={isDark ? '#1e293b' : '#003d99'} />
              <stop offset="100%" stopColor={isDark ? '#0369a1' : '#0284c7'} />
            </linearGradient>

            <linearGradient id={`${uid}-borderGrad`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={isDark ? '#38bdf8' : '#7dd3fc'} stopOpacity="0.85" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0.25" />
            </linearGradient>

            <linearGradient id={`${uid}-plusGrad`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="50%" stopColor={isDark ? '#e0f2fe' : '#f0f9ff'} />
              <stop offset="100%" stopColor={isDark ? '#38bdf8' : '#bae6fd'} />
            </linearGradient>

            <filter id={`${uid}-shadow`} x="-10%" y="-10%" width="125%" height="125%">
              <feDropShadow 
                dx="0" 
                dy="1.5" 
                stdDeviation="2" 
                floodColor={isDark ? '#000000' : '#002b7f'} 
                floodOpacity={isDark ? 0.6 : 0.22} 
              />
            </filter>
          </defs>

          {/* Left Emblem: Sapphire Banking Crest with 3D Crystalline "+" Cross */}
          <g filter={`url(#${uid}-shadow)`}>
            {/* Base Rounded Square */}
            <rect x="4" y="6" width="40" height="40" rx="10" fill={`url(#${uid}-emblemGrad)`} />
            {/* Inner Border */}
            <rect x="4.5" y="6.5" width="39" height="39" rx="9.5" stroke={`url(#${uid}-borderGrad)`} strokeWidth="1" />
            {/* Top Gloss Sheen */}
            <path 
              d="M 6 16 C 6 10, 10 7, 16 7 L 32 7 C 38 7, 42 10, 42 16 C 42 18, 36 21, 24 21 C 12 21, 6 18, 6 16 Z" 
              fill="#ffffff" 
              opacity={isDark ? '0.15' : '0.45'} 
            />

            {/* Plus Cross Symbol: Vertical & Horizontal Rounded Pill Arms */}
            <rect x="20" y="14" width="8" height="24" rx="3.5" fill={`url(#${uid}-plusGrad)`} />
            <rect x="12" y="22" width="24" height="8" rx="3.5" fill={`url(#${uid}-plusGrad)`} />
            
            {/* Center Gem Node */}
            <polygon points="24,22 27.5,26 24,30 20.5,26" fill="#ffffff" />
            <circle cx="24" cy="26" r="1.5" fill={isDark ? '#0284c7' : '#0369a1'} />
          </g>

          {/* Wordmark: "BANK" + "PLUS" + "™" */}
          <text
            x="54"
            y="30"
            fill={isDark ? '#ffffff' : '#002b7f'}
            fontFamily="'Montserrat', 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
            fontWeight="900"
            fontStyle="italic"
            fontSize="24.5"
            letterSpacing="-0.5"
          >
            BANK
          </text>

          <text
            x="128"
            y="30"
            fill={isDark ? '#38bdf8' : '#0284c7'}
            fontFamily="'Montserrat', 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
            fontWeight="900"
            fontStyle="italic"
            fontSize="24.5"
            letterSpacing="-0.5"
          >
            PLUS
          </text>

          <text
            x="198"
            y="19"
            fill={isDark ? '#94a3b8' : '#64748b'}
            fontFamily="'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif"
            fontWeight="800"
            fontSize="8.5"
          >
            ™
          </text>

          {/* Tagline: "FINANCIAL EDUCATION SIMPLIFIED." */}
          {showTagline && (
            <text
              x="55"
              y="43"
              fill={isDark ? '#7dd3fc' : '#003399'}
              fontFamily="'Montserrat', 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
              fontWeight="800"
              fontSize="7.2"
              letterSpacing="0.14em"
            >
              FINANCIAL EDUCATION SIMPLIFIED.
            </text>
          )}
        </svg>
      </div>
    );
  }

  // Style 2: Modern 3D Precision Cross
  if (activeStyle === 'cross') {
    return (
      <div className={`inline-flex items-center select-none relative ${className}`}>
        <svg
          viewBox="0 0 250 52"
          className={`${heightClass} w-auto max-w-full drop-shadow-xs`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="BankPlus - Financial Education Simplified"
        >
          <defs>
            <linearGradient id={`${uid}-crossV`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="50%" stopColor="#0284c7" />
              <stop offset="100%" stopColor="#002b7f" />
            </linearGradient>
            <linearGradient id={`${uid}-crossH`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#003d99" />
              <stop offset="50%" stopColor="#0ea5e9" />
              <stop offset="100%" stopColor="#38bdf8" />
            </linearGradient>
          </defs>

          {/* 3D Modern Banking Cross */}
          <g transform="translate(4, 5)">
            <rect x="15" y="1" width="12" height="40" rx="4" fill={`url(#${uid}-crossV)`} />
            <rect x="1" y="15" width="40" height="12" rx="4" fill={`url(#${uid}-crossH)`} opacity="0.9" />
            <rect x="15" y="15" width="12" height="12" rx="2" fill="#ffffff" opacity="0.4" />
          </g>

          <text
            x="54"
            y="30"
            fill={isDark ? '#ffffff' : '#002b7f'}
            fontFamily="'Montserrat', 'Plus Jakarta Sans', -apple-system, sans-serif"
            fontWeight="900"
            fontStyle="italic"
            fontSize="24.5"
            letterSpacing="-0.5"
          >
            BANK
          </text>

          <text
            x="128"
            y="30"
            fill={isDark ? '#38bdf8' : '#0284c7'}
            fontFamily="'Montserrat', 'Plus Jakarta Sans', -apple-system, sans-serif"
            fontWeight="900"
            fontStyle="italic"
            fontSize="24.5"
            letterSpacing="-0.5"
          >
            PLUS
          </text>

          <text
            x="198"
            y="19"
            fill={isDark ? '#94a3b8' : '#64748b'}
            fontFamily="'Montserrat', -apple-system, sans-serif"
            fontWeight="800"
            fontSize="8.5"
          >
            ™
          </text>

          {showTagline && (
            <text
              x="55"
              y="43"
              fill={isDark ? '#7dd3fc' : '#003399'}
              fontFamily="'Montserrat', 'Plus Jakarta Sans', -apple-system, sans-serif"
              fontWeight="800"
              fontSize="7.2"
              letterSpacing="0.14em"
            >
              FINANCIAL EDUCATION SIMPLIFIED.
            </text>
          )}
        </svg>
      </div>
    );
  }

  // Style 3: Sleek Pill Wordmark
  return (
    <div className={`inline-flex items-center select-none relative ${className}`}>
      <svg
        viewBox="0 0 240 52"
        className={`${heightClass} w-auto max-w-full drop-shadow-xs`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="BankPlus - Financial Education Simplified"
      >
        <defs>
          <linearGradient id={`${uid}-pill`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#003d99" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>
        </defs>

        <text
          x="6"
          y="31"
          fill={isDark ? '#ffffff' : '#002b7f'}
          fontFamily="'Montserrat', 'Plus Jakarta Sans', -apple-system, sans-serif"
          fontWeight="900"
          fontStyle="italic"
          fontSize="27"
          letterSpacing="-0.8"
        >
          BANK
        </text>

        {/* PLUS Pill Badge */}
        <rect x="90" y="8" width="90" height="28" rx="8" fill={`url(#${uid}-pill)`} />
        
        <text
          x="100"
          y="28"
          fill="#ffffff"
          fontFamily="'Montserrat', 'Plus Jakarta Sans', -apple-system, sans-serif"
          fontWeight="900"
          fontStyle="italic"
          fontSize="20"
          letterSpacing="0.5"
        >
          PLUS
        </text>

        <text
          x="156"
          y="28"
          fill="#7dd3fc"
          fontFamily="'Montserrat', sans-serif"
          fontWeight="900"
          fontSize="21"
        >
          +
        </text>

        <text
          x="184"
          y="18"
          fill={isDark ? '#94a3b8' : '#64748b'}
          fontFamily="'Montserrat', -apple-system, sans-serif"
          fontWeight="800"
          fontSize="8.5"
        >
          ™
        </text>

        {showTagline && (
          <text
            x="7"
            y="44"
            fill={isDark ? '#7dd3fc' : '#003399'}
            fontFamily="'Montserrat', 'Plus Jakarta Sans', -apple-system, sans-serif"
            fontWeight="800"
            fontSize="7.2"
            letterSpacing="0.14em"
          >
            FINANCIAL EDUCATION SIMPLIFIED.
          </text>
        )}
      </svg>
    </div>
  );
};
