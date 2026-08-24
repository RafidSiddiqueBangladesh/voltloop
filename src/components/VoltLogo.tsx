import React from 'react';

interface VoltLogoProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showWordmark?: boolean;
  theme?: 'light' | 'dark' | 'green';
  variant?: 'horizontal' | 'stacked' | 'icon-only';
}

export const VoltLogo: React.FC<VoltLogoProps> = ({
  className = '',
  size = 'md',
  showWordmark = true,
  theme = 'light',
  variant = 'horizontal',
}) => {
  const sizeMap = {
    xs: { icon: 24, text: 'text-sm font-black tracking-widest', sub: 'text-[9px]' },
    sm: { icon: 32, text: 'text-base font-black tracking-widest', sub: 'text-[10px]' },
    md: { icon: 44, text: 'text-xl font-black tracking-widest', sub: 'text-xs' },
    lg: { icon: 60, text: 'text-2xl font-black tracking-widest', sub: 'text-sm' },
    xl: { icon: 84, text: 'text-4xl font-black tracking-widest', sub: 'text-base' },
  };

  const currentSize = sizeMap[size];
  
  // Colors accurately derived from user uploaded VoltLoop logo
  const greenColor = '#15803D'; // High-voltage emerald green
  const darkColor = theme === 'dark' ? '#FFFFFF' : '#111827'; // Dark charcoal/carbon (or white on dark)
  const mutedGreen = theme === 'dark' ? '#22C55E' : '#15803D';

  return (
    <div
      className={`inline-flex ${
        variant === 'stacked' ? 'flex-col items-center text-center gap-1.5' : 'items-center gap-3'
      } select-none ${className}`}
    >
      {/* SVG Icon matching the uploaded logo */}
      <svg
        width={currentSize.icon}
        height={currentSize.icon}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-300 hover:scale-105 filter drop-shadow-xs"
      >
        {/* 1. TOP-LEFT GREEN ARC (from top crossing to left towards plug) */}
        <path
          d="M 108 24 A 76 76 0 0 0 54 62"
          stroke={greenColor}
          strokeWidth="11"
          strokeLinecap="round"
        />

        {/* 2. TOP-RIGHT DARK ARC (from top-right towards wrench) */}
        <path
          d="M 124 28 A 76 76 0 0 1 158 66"
          stroke={darkColor}
          strokeWidth="11"
          strokeLinecap="round"
        />

        {/* 3. LEFT ELECTRICAL PLUG (Dark color) */}
        {/* Arc section holding plug */}
        <path
          d="M 54 62 C 48 72 44 86 44 100 C 44 114 48 128 54 138"
          stroke={darkColor}
          strokeWidth="11"
          strokeLinecap="round"
        />
        {/* Plug rectangular main block */}
        <rect
          x="30"
          y="87"
          width="16"
          height="26"
          rx="4"
          fill={darkColor}
        />
        {/* Plug dual prongs */}
        <rect x="18" y="90" width="12" height="5" rx="1.5" fill={darkColor} />
        <rect x="18" y="105" width="12" height="5" rx="1.5" fill={darkColor} />

        {/* 4. BOTTOM-LEFT DARK ARC */}
        <path
          d="M 54 138 A 76 76 0 0 0 88 172"
          stroke={darkColor}
          strokeWidth="11"
          strokeLinecap="round"
        />

        {/* 5. BOTTOM-RIGHT GREEN ARC (from bottom curve up to wrench) */}
        <path
          d="M 88 172 A 76 76 0 0 0 148 138"
          stroke={greenColor}
          strokeWidth="11"
          strokeLinecap="round"
        />

        {/* 6. RIGHT SPANNER / WRENCH HEAD (Dark color) */}
        <g transform="translate(148, 100)">
          {/* Main open-ended wrench jaws */}
          <path
            d="M 0,-18 C 14,-18 24,-8 24,0 C 24,8 14,18 0,18 C -7,18 -12,14 -14,10 L -4,5 C 2,5 7,2 7,0 C 7,-2 2,-5 -4,-5 L -14,-10 C -12,-14 -7,-18 0,-18 Z"
            fill={darkColor}
          />
        </g>

        {/* 7. CENTRAL HIGH-VOLTAGE LIGHTNING BOLT (Signature Volt Green) */}
        {/* Sharp diagonal lightning bolt through the center */}
        <polygon
          points="126,14 74,94 126,94 70,186 122,96 74,96"
          fill={greenColor}
        />
      </svg>

      {/* Modern High-Impact Wordmark */}
      {showWordmark && (
        <div className="flex flex-col leading-none">
          <span
            className={`${currentSize.text} font-heading uppercase ${
              theme === 'dark' ? 'text-white' : 'text-[#111827]'
            }`}
            style={{ letterSpacing: '0.18em', fontFamily: 'Space Grotesk, sans-serif' }}
          >
            VOLT<span className="text-[#15803D]">LOOP</span>
          </span>
          {variant === 'stacked' && (
            <span className={`${currentSize.sub} font-mono tracking-widest text-emerald-600 uppercase font-semibold mt-0.5`}>
              Circular Lead Network
            </span>
          )}
        </div>
      )}
    </div>
  );
};
