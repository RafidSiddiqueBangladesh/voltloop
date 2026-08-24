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
    xs: { icon: 26, text: 'text-sm font-black tracking-widest', sub: 'text-[9px]' },
    sm: { icon: 34, text: 'text-base font-black tracking-widest', sub: 'text-[10px]' },
    md: { icon: 46, text: 'text-xl font-black tracking-widest', sub: 'text-xs' },
    lg: { icon: 64, text: 'text-2xl font-black tracking-widest', sub: 'text-sm' },
    xl: { icon: 96, text: 'text-4xl font-black tracking-widest', sub: 'text-base' },
  };

  const currentSize = sizeMap[size];
  
  // Exact colors from the user-provided official VoltLoop logo
  const greenColor = '#107c2b'; // Rich Volt Green from uploaded image
  const darkColor = theme === 'dark' ? '#FFFFFF' : '#000000'; // Pure crisp black / white in dark mode

  return (
    <div
      className={`inline-flex ${
        variant === 'stacked' ? 'flex-col items-center text-center gap-1.5' : 'items-center gap-3'
      } select-none ${className}`}
    >
      {/* Exact Vector Re-creation of Official Uploaded VoltLoop Logo */}
      <svg
        width={currentSize.icon}
        height={currentSize.icon}
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-300 hover:scale-105"
      >
        {/* ========================================================================= */}
        {/* 1. TOP-LEFT GREEN ARC (Starts near top bolt, curves down towards plug)   */}
        {/* ========================================================================= */}
        <path
          d="M 276 100 A 136 136 0 0 0 148 184"
          stroke={greenColor}
          strokeWidth="24"
          strokeLinecap="round"
        />

        {/* ========================================================================= */}
        {/* 2. TOP-RIGHT BLACK ARC (Starts near top bolt, curves down to wrench)      */}
        {/* ========================================================================= */}
        <path
          d="M 314 116 A 136 136 0 0 1 378 196"
          stroke={darkColor}
          strokeWidth="24"
          strokeLinecap="round"
        />

        {/* ========================================================================= */}
        {/* 3. LEFT PLUG (Vertical dual prongs pointing straight UPWARDS)             */}
        {/* ========================================================================= */}
        {/* Prongs (Vertical pins pointing up) */}
        <rect x="125" y="180" width="8" height="24" rx="3" fill={darkColor} />
        <rect x="147" y="180" width="8" height="24" rx="3" fill={darkColor} />
        {/* Plug collar / ridge bar */}
        <rect x="112" y="202" width="56" height="10" rx="3" fill={darkColor} />
        {/* Plug main rounded socket base body */}
        <path
          d="M 118 212 C 118 212 116 238 140 240 C 164 238 162 212 162 212 Z"
          fill={darkColor}
        />

        {/* ========================================================================= */}
        {/* 4. BOTTOM-LEFT BLACK ARC (Curves from under plug down to bottom bolt)     */}
        {/* ========================================================================= */}
        <path
          d="M 134 238 A 136 136 0 0 0 216 324"
          stroke={darkColor}
          strokeWidth="24"
          strokeLinecap="round"
        />

        {/* ========================================================================= */}
        {/* 5. BOTTOM-RIGHT GREEN ARC (Curves from bottom bolt up towards wrench)     */}
        {/* ========================================================================= */}
        <path
          d="M 252 334 A 136 136 0 0 0 376 250"
          stroke={greenColor}
          strokeWidth="24"
          strokeLinecap="round"
        />

        {/* ========================================================================= */}
        {/* 6. RIGHT WRENCH HEAD (Open-ended spanner jaws facing inward)             */}
        {/* ========================================================================= */}
        <g transform="translate(378, 222) rotate(-22)">
          <path
            d="M 0 -28 C 18 -28 32 -14 32 4 C 32 22 18 36 0 36 C -8 36 -16 32 -20 24 L -6 14 C -1 18 6 18 10 14 C 15 10 15 -2 10 -6 C 6 -10 -1 -10 -6 -6 L -20 -16 C -16 -24 -8 -28 0 -28 Z"
            fill={darkColor}
          />
        </g>

        {/* ========================================================================= */}
        {/* 7. CENTRAL HIGH-VOLTAGE LIGHTNING BOLT (Signature Volt Green)             */}
        {/* ========================================================================= */}
        <polygon
          points="292,82 192,228 268,228 216,334 316,194 240,194"
          fill={greenColor}
        />
      </svg>

      {/* High-Contrast Exact Wordmark */}
      {showWordmark && (
        <div className="flex flex-col leading-none">
          <span
            className={`${currentSize.text} font-heading font-black tracking-[0.14em] uppercase ${
              theme === 'dark' ? 'text-white' : 'text-black'
            }`}
            style={{ fontFamily: 'Space Grotesk, Montserrat, sans-serif' }}
          >
            VOLTLOOP
          </span>
          {variant === 'stacked' && (
            <span className={`${currentSize.sub} font-mono tracking-widest text-emerald-600 uppercase font-bold mt-0.5`}>
              Circular Lead Network
            </span>
          )}
        </div>
      )}
    </div>
  );
};
