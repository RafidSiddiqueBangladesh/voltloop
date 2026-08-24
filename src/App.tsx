import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HomeView } from './components/HomeView';
import { TheProblemView } from './components/TheProblemView';
import { OurModelView } from './components/OurModelView';
import { TrackPickupView } from './components/TrackPickupView';
import { ImpactTraceabilityView } from './components/ImpactTraceabilityView';
import { PartnersView } from './components/PartnersView';
import { AboutView } from './components/AboutView';
import { ContactView } from './components/ContactView';
import { Footer } from './components/Footer';
import { SellBatteryModal } from './components/SellBatteryModal';
import { 
  BatteryPickupRequest, 
  ImpactStats, 
  Language, 
  PageView, 
  PublicLedgerEntry 
} from './types';
import { 
  INITIAL_IMPACT_STATS, 
  INITIAL_PUBLIC_LEDGER, 
  INITIAL_TRACKING_DATABASE 
} from './data/mockData';
import { Zap, Search, ShieldCheck } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [language, setLanguage] = useState<Language>('en');
  const [isSellModalOpen, setIsSellModalOpen] = useState(false);
  const [activeTrackingCode, setActiveTrackingCode] = useState<string>('VL-2026-00184');

  // Persistent Requests State
  const [requests, setRequests] = useState<BatteryPickupRequest[]>(() => {
    const saved = localStorage.getItem('voltloop_requests');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return [...parsed, ...INITIAL_TRACKING_DATABASE];
      } catch (e) {
        return INITIAL_TRACKING_DATABASE;
      }
    }
    return INITIAL_TRACKING_DATABASE;
  });

  // Impact Stats State
  const [impactStats, setImpactStats] = useState<ImpactStats>(() => {
    const saved = localStorage.getItem('voltloop_impact_stats');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_IMPACT_STATS;
      }
    }
    return INITIAL_IMPACT_STATS;
  });

  // Public Ledger State
  const [ledgerEntries, setLedgerEntries] = useState<PublicLedgerEntry[]>(INITIAL_PUBLIC_LEDGER);

  const handleToggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'bn' : 'en'));
  };

  const handleNavigate = (page: PageView) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewPickupSubmit = (newRequest: BatteryPickupRequest) => {
    // 1. Add to requests state & localStorage
    setRequests((prev) => [newRequest, ...prev]);
    const savedLocal = JSON.parse(localStorage.getItem('voltloop_requests') || '[]');
    savedLocal.unshift(newRequest);
    localStorage.setItem('voltloop_requests', JSON.stringify(savedLocal));

    // 2. Update dynamic impact metrics
    const addedLeadKg = newRequest.quantity * 23;
    const addedAcidL = newRequest.quantity * 4.8;
    const updatedStats: ImpactStats = {
      ...impactStats,
      batteriesCollected: impactStats.batteriesCollected + newRequest.quantity,
      leadRecoveredMT: parseFloat((impactStats.leadRecoveredMT + addedLeadKg / 1000).toFixed(1)),
      acidNeutralizedLiters: impactStats.acidNeutralizedLiters + Math.round(addedAcidL),
      activeGarages: impactStats.activeGarages + 1,
    };
    setImpactStats(updatedStats);
    localStorage.setItem('voltloop_impact_stats', JSON.stringify(updatedStats));

    // 3. Add entry to live public ledger
    const newLedgerEntry: PublicLedgerEntry = {
      id: `led-${Date.now()}`,
      trackingCode: newRequest.trackingCode,
      district: newRequest.district.split('(')[0].trim(),
      thana: newRequest.thana,
      quantity: newRequest.quantity,
      leadWeightKg: addedLeadKg,
      status: 'submitted',
      timestamp: 'Just now',
      offsetScore: `+${((newRequest.quantity * 23 * 3.2) / 1000).toFixed(1)} tCO₂e saved`,
    };
    setLedgerEntries((prev) => [newLedgerEntry, ...prev]);
  };

  const handleTrackRedirect = (code: string) => {
    setActiveTrackingCode(code);
    setCurrentPage('track');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAF8] text-[#111827]">
      {/* Navigation Header */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenSellModal={() => setIsSellModalOpen(true)}
        language={language}
        onToggleLanguage={handleToggleLanguage}
      />

      {/* Main Page View Renderer */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomeView
            impactStats={impactStats}
            onOpenSellModal={() => setIsSellModalOpen(true)}
            onNavigate={handleNavigate}
            language={language}
          />
        )}

        {currentPage === 'problem' && (
          <TheProblemView
            onOpenSellModal={() => setIsSellModalOpen(true)}
            language={language}
          />
        )}

        {currentPage === 'model' && (
          <OurModelView
            onOpenSellModal={() => setIsSellModalOpen(true)}
            language={language}
          />
        )}

        {currentPage === 'track' && (
          <TrackPickupView
            requests={requests}
            initialTrackingCode={activeTrackingCode}
            onOpenSellModal={() => setIsSellModalOpen(true)}
            language={language}
          />
        )}

        {currentPage === 'impact' && (
          <ImpactTraceabilityView
            impactStats={impactStats}
            ledgerEntries={ledgerEntries}
            onOpenSellModal={() => setIsSellModalOpen(true)}
            language={language}
          />
        )}

        {currentPage === 'partners' && (
          <PartnersView
            onOpenSellModal={() => setIsSellModalOpen(true)}
            language={language}
          />
        )}

        {currentPage === 'about' && (
          <AboutView
            onOpenSellModal={() => setIsSellModalOpen(true)}
            language={language}
          />
        )}

        {currentPage === 'contact' && (
          <ContactView
            onOpenSellModal={() => setIsSellModalOpen(true)}
            language={language}
          />
        )}
      </main>

      {/* Multi-Step Modal for "Sell Your Dead Battery" */}
      <SellBatteryModal
        isOpen={isSellModalOpen}
        onClose={() => setIsSellModalOpen(false)}
        onSubmitSuccess={handleNewPickupSubmit}
        language={language}
        onTrackRedirect={handleTrackRedirect}
      />

      {/* Persistent Floating Quick Action Button on Mobile/Tablet */}
      <div className="fixed bottom-5 right-5 z-30 lg:hidden flex items-center gap-2">
        <button
          onClick={() => {
            handleNavigate('track');
          }}
          className="p-3.5 bg-zinc-900 text-white rounded-full shadow-xl hover:bg-zinc-800 transition-transform active:scale-95 border border-zinc-700 cursor-pointer"
          title="Track Pickup"
        >
          <Search className="w-5 h-5 text-emerald-400" />
        </button>

        <button
          onClick={() => setIsSellModalOpen(true)}
          className="flex items-center gap-2 px-4 py-3.5 bg-[#15803D] hover:bg-[#166534] text-white rounded-full shadow-2xl transition-transform active:scale-95 font-bold text-xs cursor-pointer ring-4 ring-emerald-500/20"
        >
          <Zap className="w-4 h-4 fill-white" />
          <span>{language === 'en' ? 'Sell Battery' : 'ব্যাটারি বিক্রি'}</span>
        </button>
      </div>

      {/* Global Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenSellModal={() => setIsSellModalOpen(true)}
        language={language}
      />
    </div>
  );
}
