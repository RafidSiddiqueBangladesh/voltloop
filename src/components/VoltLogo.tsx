import React from 'react';

interface VoltLogoProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'hero';
  showWordmark?: boolean;
  showTagline?: boolean;
  theme?: 'light' | 'dark' | 'green';
  variant?: 'horizontal' | 'stacked' | 'icon-only';
  useImage?: boolean;
}

export const VoltLogo: React.FC<VoltLogoProps> = ({
  className = '',
  size = 'md',
  showWordmark = true,
  showTagline = false,
  theme = 'light',
  variant = 'horizontal',
  useImage = false,
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
  
  // Exact brand colors from official VoltLoop identity
  const greenColor = '#107C2B'; // Authentic VoltLoop Green
  const darkColor = theme === 'dark' ? '#FFFFFF' : '#050505';

  return (
    <div
      className={`inline-flex ${
        variant === 'stacked' ? 'flex-col items-center text-center gap-2' : 'items-center gap-3'
      } select-none ${className}`}
    >
      {/* Precision Circular Brand Symbol with Strict Aspect Ratio Locking */}
      <div 
        className="shrink-0 aspect-square relative flex items-center justify-center"
        style={{ width: currentSize.icon, height: currentSize.icon }}
      >
        <svg
          viewBox="0 0 500 500"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid meet"
          className="w-full h-full drop-shadow-xs transition-transform duration-200 hover:scale-105"
        >
          {/* Top-Left Green Arc */}
          <path
            d="M 285 88 A 155 155 0 0 0 128 178"
            stroke={greenColor}
            strokeWidth="28"
            strokeLinecap="round"
          />

          {/* Top-Right Black Arc */}
          <path
            d="M 334 116 A 155 155 0 0 1 402 208"
            stroke={darkColor}
            strokeWidth="28"
            strokeLinecap="round"
          />

          {/* Left Dual-Prong Electrical Plug */}
          <rect x="108" y="170" width="11" height="28" rx="4" fill={darkColor} />
          <rect x="135" y="170" width="11" height="28" rx="4" fill={darkColor} />
          <rect x="94" y="196" width="66" height="15" rx="5" fill={darkColor} />
          <path
            d="M 100 209 C 100 209 98 244 127 247 C 156 244 154 209 154 209 Z"
            fill={darkColor}
          />

          {/* Bottom-Left Black Arc */}
          <path
            d="M 120 248 A 155 155 0 0 0 206 348"
            stroke={darkColor}
            strokeWidth="28"
            strokeLinecap="round"
          />

          {/* Bottom-Right Green Arc */}
          <path
            d="M 252 360 A 155 155 0 0 0 398 266"
            stroke={greenColor}
            strokeWidth="28"
            strokeLinecap="round"
          />

          {/* Right Open-Ended Wrench Head */}
          <g transform="translate(398, 234) rotate(-25)">
            <path
              d="M 0 -36 C 24 -36 40 -20 40 4 C 40 28 24 44 0 44 C -11 44 -22 39 -27 29 L -9 17 C -4 22 4 22 11 17 C 18 12 18 -4 11 -9 C 4 -14 -4 -14 -9 -9 L -27 -21 C -22 -31 -11 -36 0 -36 Z"
              fill={darkColor}
            />
          </g>

          {/* Center Green Lightning Bolt */}
          <polygon
            points="310,64 182,236 274,236 210,366 338,194 246,194"
            fill={greenColor}
          />
        </svg>
      </div>

      {/* High-Contrast Exact Geometric Wordmark */}
      {showWordmark && (
        <div className="flex flex-col leading-none">
          <span
            className={`${currentSize.text} font-black uppercase ${
              theme === 'dark' ? 'text-white' : 'text-zinc-950'
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
