import React from 'react';

interface VoltLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showWordmark?: boolean;
  theme?: 'light' | 'dark' | 'green';
}

export const VoltLogo: React.FC<VoltLogoProps> = ({
  className = '',
  size = 'md',
  showWordmark = true,
  theme = 'light',
}) => {
  const sizeMap = {
    sm: { icon: 28, text: 'text-base font-extrabold tracking-wider' },
    md: { icon: 38, text: 'text-xl font-extrabold tracking-widest' },
    lg: { icon: 54, text: 'text-2xl font-black tracking-widest' },
    xl: { icon: 72, text: 'text-3xl font-black tracking-widest' },
  };

  const currentSize = sizeMap[size];
  const ringColor = theme === 'dark' ? '#F3F4F6' : '#111827';
  const boltColor = '#15803D'; // High-voltage emerald green from logo

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* SVG Icon recreated faithfully from user uploaded logo */}
      <svg
        width={currentSize.icon}
        height={currentSize.icon}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-300 hover:scale-105"
      >
        {/* Top-Left arc with Plug */}
        {/* Arc path */}
        <path
          d="M 58 68 A 72 72 0 0 1 108 28"
          stroke={ringColor}
          strokeWidth="12"
          strokeLinecap="round"
        />

        {/* Plug prongs & body on left side */}
        <path
          d="M 60 70 C 50 82 46 95 46 100 C 46 105 50 118 60 130"
          stroke={ringColor}
          strokeWidth="12"
          strokeLinecap="round"
        />
        
        {/* Plug Body block */}
        <rect
          x="34"
          y="88"
          width="16"
          height="24"
          rx="4"
          fill={ringColor}
        />
        {/* Plug Prongs */}
        <rect x="22" y="91" width="12" height="4" rx="2" fill={ringColor} />
        <rect x="22" y="105" width="12" height="4" rx="2" fill={ringColor} />

        {/* Bottom-left arc */}
        <path
          d="M 64 135 A 72 72 0 0 0 94 170"
          stroke={ringColor}
          strokeWidth="12"
          strokeLinecap="round"
        />

        {/* Bottom-right arc to spanner */}
        <path
          d="M 106 172 A 72 72 0 0 0 148 135"
          stroke={ringColor}
          strokeWidth="12"
          strokeLinecap="round"
        />

        {/* Top-Right arc */}
        <path
          d="M 132 40 A 72 72 0 0 1 154 75"
          stroke={ringColor}
          strokeWidth="12"
          strokeLinecap="round"
        />

        {/* Spanner / Wrench head on right side */}
        <g transform="translate(144, 98) rotate(-15)">
          {/* Spanner outer C shape */}
          <path
            d="M 0,-16 C 14,-16 22,-6 22,0 C 22,6 14,16 0,16 C -6,16 -10,12 -12,8 L -2,4 C 2,4 6,2 6,0 C 6,-2 2,-4 -2,-4 L -12,-8 C -10,-12 -6,-16 0,-16 Z"
            fill={ringColor}
          />
        </g>

        {/* Central Dynamic Lightning Bolt in signature Volt Green */}
        <polygon
          points="118,18 78,92 124,92 82,182 128,98 88,98"
          fill={boltColor}
        />
      </svg>

      {showWordmark && (
        <span
          className={`${currentSize.text} font-heading uppercase ${
            theme === 'dark' ? 'text-white' : 'text-[#111827]'
          }`}
          style={{ letterSpacing: '0.14em' }}
        >
          Volt<span className="text-[#15803D]">Loop</span>
        </span>
      )}
    </div>
  );
};
