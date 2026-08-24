import React from 'react';

interface VoltLogoProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'hero';
  showWordmark?: boolean;
  showTagline?: boolean;
  theme?: 'light' | 'dark' | 'green';
  variant?: 'horizontal' | 'stacked' | 'icon-only';
}

export const VoltLogo: React.FC<VoltLogoProps> = ({
  className = '',
  size = 'md',
  showWordmark = true,
  showTagline = false,
  theme = 'light',
  variant = 'horizontal',
}) => {
  const sizeMap = {
    xs: { icon: 28, text: 'text-sm font-black tracking-[0.14em]', sub: 'text-[9px]' },
    sm: { icon: 38, text: 'text-base font-black tracking-[0.14em]', sub: 'text-[10px]' },
    md: { icon: 48, text: 'text-xl font-black tracking-[0.14em]', sub: 'text-xs' },
    lg: { icon: 68, text: 'text-3xl font-black tracking-[0.14em]', sub: 'text-sm' },
    xl: { icon: 96, text: 'text-4xl sm:text-5xl font-black tracking-[0.14em]', sub: 'text-base' },
    '2xl': { icon: 140, text: 'text-5xl sm:text-6xl font-black tracking-[0.14em]', sub: 'text-lg' },
    hero: { icon: 200, text: 'text-6xl sm:text-7xl font-black tracking-[0.14em]', sub: 'text-xl' },
  };

  const currentSize = sizeMap[size] || sizeMap.md;
  
  // Exact brand colors from the user-provided official VoltLoop logo
  const greenColor = '#107C2B'; // Authentic Volt Green
  const darkColor = theme === 'dark' ? '#FFFFFF' : '#000000'; // Pure deep black / white for dark canvas

  return (
    <div
      className={`inline-flex ${
        variant === 'stacked' ? 'flex-col items-center text-center gap-2' : 'items-center gap-3'
      } select-none ${className}`}
    >
      {/* Exact Vector Re-creation of Official Uploaded VoltLoop Logo */}
      <svg
        width={currentSize.icon}
        height={currentSize.icon}
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-300 hover:scale-105 drop-shadow-xs"
      >
        {/* ========================================================================= */}
        {/* 1. TOP-LEFT GREEN ARC (From top bolt cut ~85° down to plug top at 170°)  */}
        {/* ========================================================================= */}
        <path
          d="M 282 92 A 155 155 0 0 0 128 178"
          stroke={greenColor}
          strokeWidth="26"
          strokeLinecap="round"
        />

        {/* ========================================================================= */}
        {/* 2. TOP-RIGHT BLACK ARC (From top bolt cut ~70° down to wrench at 25°)     */}
        {/* ========================================================================= */}
        <path
          d="M 334 116 A 155 155 0 0 1 402 208"
          stroke={darkColor}
          strokeWidth="26"
          strokeLinecap="round"
        />

        {/* ========================================================================= */}
        {/* 3. LEFT DUAL-PRONG ELECTRICAL PLUG (Vertical prongs pointing straight UP) */}
        {/* ========================================================================= */}
        {/* Left Prong */}
        <rect x="110" y="174" width="10" height="26" rx="4" fill={darkColor} />
        {/* Right Prong */}
        <rect x="134" y="174" width="10" height="26" rx="4" fill={darkColor} />
        {/* Plug Collar / Ridge Bar */}
        <rect x="96" y="198" width="62" height="14" rx="4" fill={darkColor} />
        {/* Plug Lower Socket Body */}
        <path
          d="M 102 210 C 102 210 100 242 127 245 C 154 242 152 210 152 210 Z"
          fill={darkColor}
        />

        {/* ========================================================================= */}
        {/* 4. BOTTOM-LEFT BLACK ARC (From under plug at 195° down to bottom bolt)    */}
        {/* ========================================================================= */}
        <path
          d="M 120 246 A 155 155 0 0 0 206 348"
          stroke={darkColor}
          strokeWidth="26"
          strokeLinecap="round"
        />

        {/* ========================================================================= */}
        {/* 5. BOTTOM-RIGHT GREEN ARC (From bottom bolt up to wrench lower jaw)       */}
        {/* ========================================================================= */}
        <path
          d="M 252 360 A 155 155 0 0 0 398 266"
          stroke={greenColor}
          strokeWidth="26"
          strokeLinecap="round"
        />

        {/* ========================================================================= */}
        {/* 6. RIGHT OPEN-ENDED SPANNER WRENCH HEAD (Angled facing inward)            */}
        {/* ========================================================================= */}
        <g transform="translate(398, 234) rotate(-25)">
          <path
            d="M 0 -34 C 22 -34 38 -18 38 4 C 38 26 22 42 0 42 C -10 42 -20 37 -25 28 L -8 16 C -3 21 5 21 11 16 C 17 11 17 -3 11 -8 C 5 -13 -3 -13 -8 -8 L -25 -20 C -20 -29 -10 -34 0 -34 Z"
            fill={darkColor}
          />
        </g>

        {/* ========================================================================= */}
        {/* 7. CENTRAL SIGNATURE LIGHTNING BOLT (Volt Green)                          */}
        {/* ========================================================================= */}
        <polygon
          points="310,68 184,236 272,236 210,364 336,196 248,196"
          fill={greenColor}
        />
      </svg>

      {/* High-Contrast Exact Geometric Wordmark */}
      {showWordmark && (
        <div className="flex flex-col leading-none">
          <span
            className={`${currentSize.text} font-black uppercase ${
              theme === 'dark' ? 'text-white' : 'text-black'
            }`}
            style={{ 
              fontFamily: 'Space Grotesk, Montserrat, system-ui, sans-serif',
              letterSpacing: '0.14em' 
            }}
          >
            VOLTLOOP
          </span>
          {showTagline && (
            <span className="text-[11px] sm:text-xs font-bold text-[#107C2B] tracking-tight mt-1">
              Turning Toxic Strains into Economic Gains.
            </span>
          )}
          {variant === 'stacked' && !showTagline && (
            <span className={`${currentSize.sub} font-mono tracking-widest text-[#107C2B] uppercase font-bold mt-1`}>
              Circular Lead Network
            </span>
          )}
        </div>
      )}
    </div>
  );
};
