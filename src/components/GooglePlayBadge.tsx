import React from 'react';
import { PLAY_STORE_URL } from '../data/mockData';

interface GooglePlayBadgeProps {
  href?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'black' | 'outline' | 'compact';
  id?: string;
}

export const GooglePlayBadge: React.FC<GooglePlayBadgeProps> = ({
  href = PLAY_STORE_URL,
  className = '',
  size = 'md',
  variant = 'black',
  id,
}) => {
  const sizeClasses = {
    sm: 'px-3 py-1.5 rounded-lg gap-2 text-xs',
    md: 'px-4 py-2 rounded-xl gap-2.5 text-sm',
    lg: 'px-5 py-3 rounded-xl gap-3 text-base',
  }[size];

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-7 h-7',
  }[size];

  const getItOnTextSizes = {
    sm: 'text-[8px]',
    md: 'text-[10px]',
    lg: 'text-[11px]',
  }[size];

  const playStoreTextSizes = {
    sm: 'text-xs',
    md: 'text-sm sm:text-base',
    lg: 'text-base sm:text-lg',
  }[size];

  const baseVariant = variant === 'outline'
    ? 'bg-slate-900/90 hover:bg-slate-950 text-white border border-slate-700 hover:border-slate-500 shadow-md'
    : 'bg-black hover:bg-slate-900 text-white border border-slate-800 hover:border-slate-600 shadow-md hover:shadow-xl';

  return (
    <a
      id={id}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      title="Get BankPlus on Google Play Store"
      className={`inline-flex items-center select-none transition-all duration-200 hover:scale-[1.03] active:scale-[0.98] cursor-pointer group ${baseVariant} ${sizeClasses} ${className}`}
    >
      {/* Official Google Play Colorful Triangle SVG Icon */}
      <svg
        viewBox="0 0 512 512"
        className={`${iconSizes} shrink-0 transition-transform duration-200 group-hover:scale-105`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M78.6 34.2C73.4 39.7 70.3 48.2 70.3 59.2V452.8C70.3 463.8 73.4 472.3 78.6 477.8L80.8 480L298.5 262.3V256V249.7L80.8 32L78.6 34.2Z"
          fill="#00E5FF"
        />
        <path
          d="M371.1 334.8L298.5 262.2V249.7L371.1 177.1L372.7 178.1L458.8 227C483.3 240.9 483.3 263.8 458.8 277.8L372.7 326.6L371.1 334.8Z"
          fill="#FFD600"
        />
        <path
          d="M372.7 334.9L298.5 260.7L80.8 478.4C88.9 486.9 102.3 487.9 117.4 479.3L372.7 334.9Z"
          fill="#FF334B"
        />
        <path
          d="M372.7 177.1L117.4 32.7C102.3 24.1 88.9 25.1 80.8 33.6L298.5 251.3L372.7 177.1Z"
          fill="#00E676"
        />
      </svg>

      {/* Typography: "GET IT ON Google Play" */}
      <div className="text-left leading-none flex flex-col justify-center">
        <span
          className={`${getItOnTextSizes} font-semibold uppercase tracking-[0.18em] text-slate-300 block opacity-90`}
        >
          GET IT ON
        </span>
        <span
          className={`${playStoreTextSizes} font-bold tracking-tight text-white block mt-0.5 font-sans`}
        >
          Google Play
        </span>
      </div>
    </a>
  );
};
