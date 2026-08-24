import React, { useState } from 'react';
import { VoltLogo } from './VoltLogo';
import { PageView, Language } from '../types';
import { 
  PhoneCall, 
  Search, 
  PlusCircle, 
  Menu, 
  X, 
  ShieldCheck, 
  Languages, 
  ArrowRight,
  Zap,
  Activity
} from 'lucide-react';

interface NavbarProps {
  currentPage: PageView;
  onNavigate: (page: PageView) => void;
  onOpenSellModal: () => void;
  language: Language;
  onToggleLanguage: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenSellModal,
  language,
  onToggleLanguage,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: PageView; labelEn: string; labelBn: string; badge?: string }[] = [
    { id: 'home', labelEn: 'Home', labelBn: 'হোম' },
    { id: 'problem', labelEn: 'The Problem', labelBn: 'সংকট ও তথ্য' },
    { id: 'model', labelEn: 'Our Model (VOLT)', labelBn: 'মডেল (ভোল্ট)' },
    { id: 'track', labelEn: 'Track Pickup', labelBn: 'ট্র্যাকিং', badge: 'Live' },
    { id: 'impact', labelEn: 'Impact & Traceability', labelBn: 'প্রভাব ও লেজার' },
    { id: 'partners', labelEn: 'Partners', labelBn: 'অফটেক ও পার্টনার' },
    { id: 'about', labelEn: 'About', labelBn: 'আমাদের সম্পর্কে' },
    { id: 'contact', labelEn: 'Contact', labelBn: 'যোগাযোগ' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-zinc-200/80 shadow-xs">
      {/* Top micro-bar for credibility and direct garage dispatch */}
      <div className="bg-[#0B150F] text-zinc-300 text-xs py-1.5 px-4 sm:px-8 border-b border-emerald-950">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-emerald-400 font-semibold font-mono text-[11px] sm:text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              {language === 'en' 
                ? 'VoltLoop: Turning Toxic Strains into Economic Gains.' 
                : 'ভোল্টলুপ: পরিবেশ দূষণ রোধ ও টেকসই অর্থনৈতিক সমৃদ্ধি।'}
            </span>
            <span className="hidden lg:inline-block text-zinc-600">|</span>
            <span className="hidden lg:inline-flex items-center gap-1 text-zinc-400 text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              {language === 'en' 
                ? 'DoE & Basel Convention Certified Closed-Loop' 
                : 'পরিবেশ অধিদপ্তর ও বাসেল কনভেনশন স্বীকৃত'}
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <a 
              href="tel:09612865857" 
              className="inline-flex items-center gap-1 text-zinc-200 hover:text-emerald-400 transition-colors"
            >
              <PhoneCall className="w-3 h-3 text-emerald-400" />
              <span>{language === 'en' ? 'Hotline: 09612-VOLT-LP' : 'হটলাইন: ০৯৬১২-ভোল্ট-লুপ'}</span>
            </a>

            <button
              onClick={onToggleLanguage}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs transition-colors border border-zinc-700"
              title="Toggle Language"
            >
              <Languages className="w-3 h-3 text-emerald-400" />
              <span className="font-semibold">{language === 'en' ? 'বাংলা' : 'English'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo with VOLTLOOP and Tagline */}
          <button
            id="brand-logo-btn"
            onClick={() => {
              onNavigate('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center text-left focus:outline-none group cursor-pointer"
          >
            <VoltLogo size="md" showTagline={true} />
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => {
                    onNavigate(item.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`relative px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'text-[#15803D] bg-emerald-50/80 font-semibold'
                      : 'text-zinc-700 hover:text-[#111827] hover:bg-zinc-100/70'
                  }`}
                >
                  <span>{language === 'en' ? item.labelEn : item.labelBn}</span>
                  {item.badge && (
                    <span className="ml-1.5 px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-emerald-600 text-white uppercase tracking-wider">
                      {item.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-3.5 right-3.5 h-0.5 bg-[#15803D] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              id="quick-track-btn"
              onClick={() => onNavigate('track')}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-zinc-700 hover:text-zinc-950 bg-zinc-100 hover:bg-zinc-200/80 rounded-lg transition-colors border border-zinc-200 cursor-pointer"
            >
              <Search className="w-3.5 h-3.5 text-zinc-500" />
              <span>{language === 'en' ? 'Track ID' : 'ট্র্যাক করুন'}</span>
            </button>

            {/* Primary High-Priority CTA: Sell Your Dead Battery */}
            <button
              id="nav-sell-battery-btn"
              onClick={onOpenSellModal}
              className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold text-white bg-[#15803D] hover:bg-[#166534] active:scale-98 shadow-sm transition-all cursor-pointer group"
            >
              <Zap className="w-4 h-4 text-emerald-200 fill-emerald-200" />
              <span>{language === 'en' ? 'Sell Dead Battery' : 'ব্যাটারি বিক্রি করুন'}</span>
              <ArrowRight className="w-4 h-4 text-emerald-200 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex items-center gap-2 xl:hidden">
            <button
              onClick={onOpenSellModal}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-[#15803D] shadow-xs"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'Sell' : 'বিক্রি'}</span>
            </button>

            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-zinc-700 hover:bg-zinc-100 focus:outline-none"
              aria-label="Open menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-zinc-200 px-4 pt-2 pb-6 space-y-2 animate-in slide-in-from-top-2 duration-200 shadow-xl">
          <div className="grid grid-cols-1 gap-1">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setMobileMenuOpen(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-base font-medium ${
                    isActive
                      ? 'bg-emerald-50 text-[#15803D] font-bold'
                      : 'text-zinc-800 hover:bg-zinc-50'
                  }`}
                >
                  <span>{language === 'en' ? item.labelEn : item.labelBn}</span>
                  {item.badge && (
                    <span className="px-2 py-0.5 text-xs font-mono rounded-full bg-emerald-600 text-white">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="pt-4 border-t border-zinc-200 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSellModal();
              }}
              className="w-full py-3 px-4 rounded-lg bg-[#15803D] hover:bg-[#166534] text-white font-bold flex items-center justify-center gap-2 shadow-sm text-sm"
            >
              <Zap className="w-4 h-4 fill-white" />
              <span>{language === 'en' ? 'Sell Your Dead Battery' : 'মৃত ব্যাটারি বিক্রি করুন'}</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('track');
              }}
              className="w-full py-2.5 px-4 rounded-lg bg-zinc-100 text-zinc-800 font-semibold flex items-center justify-center gap-2 text-sm"
            >
              <Search className="w-4 h-4 text-zinc-500" />
              <span>{language === 'en' ? 'Track Existing Pickup' : 'পিকআপ ট্র্যাক করুন'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
