import React, { useState, useEffect } from 'react';
import { 
  Search, 
  CheckCircle2, 
  Clock, 
  Truck, 
  Factory, 
  ShieldCheck, 
  MapPin, 
  Phone, 
  Sparkles, 
  ArrowRight,
  RefreshCw,
  Zap,
  Download,
  AlertCircle,
  Building2,
  Calendar,
  Share2,
  Printer,
  Navigation,
  Layers,
  Check,
  Award,
  BatteryCharging,
  Gauge,
  Maximize2
} from 'lucide-react';
import { BatteryPickupRequest, BatteryStatus, Language } from '../types';
import { VoltLogo } from './VoltLogo';

interface TrackPickupViewProps {
  requests: BatteryPickupRequest[];
  initialTrackingCode?: string;
  onOpenSellModal: () => void;
  language: Language;
}

export const TrackPickupView: React.FC<TrackPickupViewProps> = ({
  requests,
  initialTrackingCode = '',
  onOpenSellModal,
  language,
}) => {
  const [searchInput, setSearchInput] = useState(initialTrackingCode || 'VL-2026-00184');
  const [selectedRecord, setSelectedRecord] = useState<BatteryPickupRequest | null>(null);
  const [searchError, setSearchError] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  
  // Interactive Map State
  const [mapLayer, setMapLayer] = useState<'radar' | 'topo' | 'satellite'>('radar');
  const [isVehicleMoving, setIsVehicleMoving] = useState(true);
  const [vehicleProgress, setVehicleProgress] = useState(0.68); // Progress along route (0 to 1)
  const [copiedLink, setCopiedLink] = useState(false);
  const [showWaybillModal, setShowWaybillModal] = useState(false);

  // Perform search lookup
  const handleSearch = (codeToSearch: string) => {
    setIsSearching(true);
    setSearchError(false);
    const cleaned = codeToSearch.trim().toUpperCase();

    setTimeout(() => {
      const found = requests.find(
        (r) =>
          r.trackingCode.toUpperCase() === cleaned ||
          r.phone.replace(/[^0-9]/g, '').includes(cleaned.replace(/[^0-9]/g, ''))
      );

      if (found) {
        setSelectedRecord(found);
        setSearchError(false);
      } else {
        setSelectedRecord(null);
        setSearchError(true);
      }
      setIsSearching(false);
    }, 250);
  };

  useEffect(() => {
    if (initialTrackingCode) {
      setSearchInput(initialTrackingCode);
      handleSearch(initialTrackingCode);
    } else {
      handleSearch('VL-2026-00184');
    }
  }, [initialTrackingCode, requests]);

  // Animate truck movement along path
  useEffect(() => {
    if (!isVehicleMoving) return;
    const interval = setInterval(() => {
      setVehicleProgress((prev) => {
        if (prev >= 0.95) return 0.2;
        return prev + 0.015;
      });
    }, 800);
    return () => clearInterval(interval);
  }, [isVehicleMoving]);

  const stepStatusConfig: Record<
    BatteryStatus,
    { labelEn: string; labelBn: string; color: string; stepNumber: number }
  > = {
    submitted: { labelEn: 'Request Serialized', labelBn: 'রিকোয়েস্ট তালিকাভুক্ত', color: 'bg-amber-500', stepNumber: 1 },
    partner_assigned: { labelEn: 'EV Collection Fleet Assigned', labelBn: 'কালেকশন পার্টনার নিযুক্ত', color: 'bg-blue-600', stepNumber: 2 },
    collected: { labelEn: 'Collected & Gate Weighed', labelBn: 'সংগৃহীত ও ওজন সম্পন্ন', color: 'bg-emerald-600', stepNumber: 3 },
    processed: { labelEn: 'Clean Smelted (Hydrometallurgical)', labelBn: 'বিশুদ্ধ সিসা নিষ্কাশিত', color: 'bg-teal-600', stepNumber: 4 },
    offtake_delivered: { labelEn: 'Delivered to Manufacturer Offtake', labelBn: 'ব্যাটারি কারখানায় সরবরাহ', color: 'bg-emerald-800', stepNumber: 5 },
  };

  const getStatusBadge = (status: BatteryStatus) => {
    const conf = stepStatusConfig[status] || stepStatusConfig.submitted;
    return (
      <span className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black tracking-wider text-white ${conf.color} shadow-sm uppercase font-mono`}>
        <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
        {language === 'en' ? conf.labelEn : conf.labelBn}
      </span>
    );
  };

  // Map route interpolation (Dhaka Hub to Garage location)
  // Route points in SVG coordinates (500x320)
  const routePoints = [
    { x: 120, y: 80, label: 'Tejgaon Hub (Central)' },
    { x: 180, y: 110, label: 'Mohakhali Flyover' },
    { x: 250, y: 130, label: 'Rampura Transit corridor' },
    { x: 340, y: 180, label: 'Demra Express Way' },
    { x: 420, y: 240, label: 'Partner Garage Destination' },
  ];

  // Calculate current interpolated truck position
  const getTruckCoordinates = (t: number) => {
    // 4 segments
    const totalSegments = routePoints.length - 1;
    const segIndex = Math.min(Math.floor(t * totalSegments), totalSegments - 1);
    const segT = (t * totalSegments) - segIndex;
    
    const p1 = routePoints[segIndex];
    const p2 = routePoints[segIndex + 1];
    
    return {
      x: p1.x + (p2.x - p1.x) * segT,
      y: p1.y + (p2.y - p1.y) * segT,
    };
  };

  const truckPos = getTruckCoordinates(vehicleProgress);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="relative min-h-screen py-10 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Background Liquid Ambient Glow Elements */}
      <div className="absolute top-10 left-1/4 w-96 h-96 rounded-full bg-emerald-400/10 blur-3xl pointer-events-none animate-liquid-blob"></div>
      <div className="absolute top-80 right-10 w-[30rem] h-[30rem] rounded-full bg-teal-400/10 blur-3xl pointer-events-none animate-liquid-blob-delay"></div>

      {/* Main Header with Logo & Live Badge */}
      <div className="text-center max-w-4xl mx-auto space-y-5 relative z-10">
        <div className="flex items-center justify-center gap-3">
          <div className="liquid-glass inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-zinc-900 border border-emerald-500/30 shadow-xs">
            <VoltLogo size="xs" showWordmark={false} />
            <span className="text-xs font-bold font-mono tracking-wider text-emerald-800 uppercase">
              {language === 'en' ? 'VOLTLOOP REAL-TIME DISPATCH & TRACEABILITY' : 'ভোল্টলুপ লাইভ ব্যাটারি ট্র্যাকিং'}
            </span>
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          </div>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-heading text-zinc-900 tracking-tight leading-none">
          {language === 'en' ? (
            <>Track Your <span className="text-[#15803D] underline decoration-emerald-300 decoration-wavy underline-offset-8">Dead Battery</span> Fleet</>
          ) : (
            <>আপনার ব্যাটারি <span className="text-[#15803D]">পিকআপ ও রিসাইক্লিং</span> ট্র্যাক করুন</>
          )}
        </h1>

        <p className="text-base sm:text-lg text-zinc-600 max-w-2xl mx-auto">
          {language === 'en'
            ? 'Monitor live GPS dispatch, certified digital weight slips, hydrometallurgical lead recovery, and manufacturer offtake delivery in real time.'
            : 'আপনার ট্র্যাকিং আইডি দিয়ে লাইভ জিপিএস রুট, ডিজিটাল স্কেল ওজন স্লিপ এবং কারখানায় ডেলিভারি অগ্রগতি দেখুন।'}
        </p>
      </div>

      {/* Liquid Search Bar & Demo Pills */}
      <div className="max-w-3xl mx-auto space-y-4 relative z-10">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch(searchInput);
          }}
          className="liquid-glass relative flex items-center rounded-2xl p-2 border-2 border-emerald-600/30 focus-within:border-[#15803D] focus-within:ring-4 focus-within:ring-emerald-500/10 shadow-xl transition-all"
        >
          <div className="pl-4 pr-2 text-[#15803D]">
            <Search className="w-6 h-6" />
          </div>
          <input
            id="tracking-search-input"
            type="text"
            placeholder={language === 'en' ? 'Enter Tracking ID (e.g., VL-2026-00184) or Mobile Number...' : 'ট্র্যাকিং কোড বা মোবাইল নম্বর লিখুন...'}
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full py-3.5 px-2 text-base sm:text-lg font-mono font-bold text-zinc-900 bg-transparent outline-none uppercase placeholder:normal-case placeholder:font-sans placeholder:text-zinc-400"
          />
          <button
            type="submit"
            id="track-search-submit-btn"
            disabled={isSearching}
            className="px-6 sm:px-8 py-3.5 rounded-xl bg-[#15803D] hover:bg-[#166534] text-white text-sm font-black shadow-md transition-all shrink-0 cursor-pointer disabled:opacity-50 flex items-center gap-2 hover:scale-[1.02]"
          >
            {isSearching ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Locating...</span>
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 fill-white" />
                <span>{language === 'en' ? 'Track Live' : 'ট্র্যাক করুন'}</span>
              </>
            )}
          </button>
        </form>

        {/* Interactive Quick Sample Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
          <span className="text-xs text-zinc-500 font-bold uppercase tracking-wider">
            {language === 'en' ? 'Quick Inspect Demo Batches:' : 'নমুনা দেখুন:'}
          </span>
          {requests.slice(0, 3).map((req) => (
            <button
              key={req.id}
              onClick={() => {
                setSearchInput(req.trackingCode);
                handleSearch(req.trackingCode);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer border ${
                selectedRecord?.trackingCode === req.trackingCode
                  ? 'bg-[#15803D] text-white border-[#15803D] shadow-sm scale-105'
                  : 'bg-white/80 backdrop-blur-sm text-zinc-700 border-zinc-300 hover:bg-emerald-50 hover:border-emerald-300'
              }`}
            >
              {req.trackingCode} <span className="opacity-75 font-normal">({req.quantity} pcs)</span>
            </button>
          ))}
        </div>
      </div>

      {/* Error state */}
      {searchError && (
        <div className="max-w-xl mx-auto p-8 rounded-3xl liquid-glass border-2 border-amber-300/80 text-center space-y-4 shadow-xl animate-in zoom-in-95 duration-200">
          <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto shadow-inner">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-black font-heading text-zinc-900">
            {language === 'en' ? 'No Active Batch Found' : 'রেকর্ড পাওয়া যায়নি'}
          </h3>
          <p className="text-sm text-zinc-600">
            {language === 'en'
              ? `No active dispatch logged under "${searchInput}". Please double check your 10-digit ticket code or create an instant pickup request.`
              : `"${searchInput}" দিয়ে কোনো সক্রিয় অর্ডার পাওয়া যায়নি। সঠিক কোড লিখুন বা নতুন আবেদন করুন।`}
          </p>
          <button
            onClick={onOpenSellModal}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#15803D] text-white text-sm font-bold hover:bg-[#166534] shadow-md transition-transform hover:scale-105 cursor-pointer"
          >
            <Zap className="w-4 h-4 fill-white" />
            <span>{language === 'en' ? 'Book Immediate Pickup' : 'নতুন ব্যাটারি বিক্রি করুন'}</span>
          </button>
        </div>
      )}

      {/* RICH LIQUID GLASS DETAILS VIEW */}
      {selectedRecord && (
        <div className="space-y-8 max-w-6xl mx-auto relative z-10 animate-in fade-in-50 slide-in-from-bottom-6 duration-300">
          
          {/* Main Hero Summary Card */}
          <div className="liquid-glass rounded-3xl overflow-hidden shadow-2xl border border-emerald-500/20">
            
            {/* Top Dark Command Bar */}
            <div className="bg-[#0A160E] text-white p-6 sm:p-8 flex flex-wrap items-center justify-between gap-6 border-b border-emerald-900/50">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-emerald-950/80 border border-emerald-500/30">
                  <VoltLogo size="sm" showWordmark={false} theme="dark" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest font-bold">
                      {language === 'en' ? 'Certified Custody ID' : 'সার্টিফাইড ট্র্যাকিং কোড'}
                    </span>
                    <span className="text-zinc-600">•</span>
                    <span className="text-xs text-zinc-400 font-mono flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {selectedRecord.createdAt}
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black font-mono tracking-wider text-white">
                    {selectedRecord.trackingCode}
                  </h2>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                {getStatusBadge(selectedRecord.status)}

                <div className="bg-emerald-950/90 border border-emerald-500/40 rounded-2xl px-5 py-2.5 text-right">
                  <span className="text-[11px] text-zinc-400 uppercase tracking-wider block font-bold">
                    {language === 'en' ? 'Guaranteed Net Payout' : 'নিশ্চিত নগদ মূল্য'}
                  </span>
                  <span className="text-2xl sm:text-3xl font-black font-mono text-emerald-400">
                    ৳{selectedRecord.estimatedPayoutBDT.toLocaleString()}{' '}
                    <span className="text-xs text-emerald-200/80 font-sans">BDT</span>
                  </span>
                </div>
              </div>
            </div>

            {/* LIVE ANIMATED DHAKA FLEET MAP & DISPATCH RADAR */}
            <div className="p-6 sm:p-8 border-b border-zinc-200/80 bg-linear-to-b from-white/90 to-emerald-50/40">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
                <div>
                  <h3 className="text-base sm:text-lg font-black font-heading text-zinc-900 flex items-center gap-2">
                    <Navigation className="w-5 h-5 text-[#15803D] animate-bounce" />
                    <span>{language === 'en' ? 'Live EV Fleet Route & Telemetry' : 'লাইভ কালেকশন রুট ও জিপিএস গতিবিধি'}</span>
                  </h3>
                  <p className="text-xs text-zinc-500">
                    {language === 'en' ? 'High-precision GPS telemetry updating every 3 seconds from onboard IoT terminal.' : 'অনবোর্ড ট্র্যাকিং থেকে প্রতি ৩ সেকেন্ডে স্বয়ংক্রিয়ভাবে আপডেট হচ্ছে।'}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="bg-white rounded-xl p-1 border border-zinc-300 shadow-xs flex items-center text-xs font-bold">
                    <button
                      onClick={() => setMapLayer('radar')}
                      className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                        mapLayer === 'radar' ? 'bg-[#15803D] text-white shadow-xs' : 'text-zinc-600 hover:text-zinc-900'
                      }`}
                    >
                      Radar View
                    </button>
                    <button
                      onClick={() => setMapLayer('topo')}
                      className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                        mapLayer === 'topo' ? 'bg-[#15803D] text-white shadow-xs' : 'text-zinc-600 hover:text-zinc-900'
                      }`}
                    >
                      Topological
                    </button>
                  </div>

                  <button
                    onClick={() => setIsVehicleMoving(!isVehicleMoving)}
                    className="p-2 rounded-xl bg-white border border-zinc-300 text-zinc-700 hover:bg-zinc-50 shadow-xs text-xs font-bold cursor-pointer flex items-center gap-1.5"
                    title="Pause/Play Simulation"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isVehicleMoving ? 'text-emerald-600 animate-spin' : 'text-zinc-400'}`} />
                    <span>{isVehicleMoving ? 'Simulating' : 'Paused'}</span>
                  </button>
                </div>
              </div>

              {/* Dynamic Vector Canvas / Map */}
              <div className="relative rounded-2xl overflow-hidden border-2 border-emerald-500/30 bg-[#07130B] shadow-2xl">
                
                {/* SVG Live Map Visualization */}
                <svg
                  viewBox="0 0 540 300"
                  className="w-full h-64 sm:h-80 object-cover"
                  style={{ background: mapLayer === 'topo' ? '#0E1D13' : '#061009' }}
                >
                  {/* Grid Lines */}
                  <defs>
                    <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                      <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(34, 197, 94, 0.08)" strokeWidth="1" />
                    </pattern>
                    <linearGradient id="routeGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#10B981" />
                      <stop offset="50%" stopColor="#22C55E" />
                      <stop offset="100%" stopColor="#EAB308" />
                    </linearGradient>
                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>

                  <rect width="100%" height="100%" fill="url(#grid)" />

                  {/* Dhaka Major Road Network Arteries (Background Vector) */}
                  <path d="M 40 40 Q 200 80 480 50" stroke="rgba(255,255,255,0.06)" strokeWidth="4" fill="none" />
                  <path d="M 120 20 Q 150 160 180 280" stroke="rgba(255,255,255,0.06)" strokeWidth="4" fill="none" />
                  <path d="M 280 20 Q 320 180 380 290" stroke="rgba(255,255,255,0.06)" strokeWidth="4" fill="none" />
                  <path d="M 50 220 Q 260 200 500 240" stroke="rgba(255,255,255,0.06)" strokeWidth="4" fill="none" />

                  {/* Rivers / Hatirjheel Lake representation */}
                  <path
                    d="M 160 100 Q 200 90 230 110 T 260 100"
                    stroke="#0284C7"
                    strokeWidth="8"
                    strokeLinecap="round"
                    fill="none"
                    opacity="0.3"
                  />

                  {/* Full Route Path with Animated Flow Dash */}
                  <path
                    d="M 120 80 L 180 110 L 250 130 L 340 180 L 420 240"
                    stroke="url(#routeGlow)"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    filter="url(#glow)"
                    className="animate-flow-dash"
                  />

                  {/* Waypoint Markers */}
                  {routePoints.map((pt, idx) => {
                    const isOrigin = idx === 0;
                    const isDest = idx === routePoints.length - 1;
                    return (
                      <g key={idx} transform={`translate(${pt.x}, ${pt.y})`}>
                        {/* Pulse Ring */}
                        <circle
                          r={isOrigin || isDest ? "12" : "6"}
                          fill={isOrigin ? "rgba(34, 197, 94, 0.2)" : isDest ? "rgba(234, 179, 8, 0.2)" : "rgba(255,255,255,0.1)"}
                          className="animate-ping"
                        />
                        {/* Dot */}
                        <circle
                          r={isOrigin || isDest ? "7" : "4"}
                          fill={isOrigin ? "#22C55E" : isDest ? "#EAB308" : "#9CA3AF"}
                          stroke="#FFFFFF"
                          strokeWidth="2"
                        />
                        {/* Label */}
                        <text
                          y={idx % 2 === 0 ? "-12" : "18"}
                          x="0"
                          textAnchor="middle"
                          fill="#E5E7EB"
                          fontSize="9"
                          fontFamily="monospace"
                          fontWeight="bold"
                        >
                          {pt.label}
                        </text>
                      </g>
                    );
                  })}

                  {/* LIVE MOVING TRUCK BEACON */}
                  <g transform={`translate(${truckPos.x}, ${truckPos.y})`}>
                    {/* Radar wave pulse */}
                    <circle r="22" fill="rgba(34, 197, 94, 0.25)" className="animate-ping" />
                    <circle r="14" fill="rgba(34, 197, 94, 0.4)" />
                    
                    {/* Vehicle Marker Pin */}
                    <circle r="9" fill="#15803D" stroke="#FFFFFF" strokeWidth="2.5" />
                    <circle r="3" fill="#FFFFFF" />

                    {/* Interactive Vehicle Tooltip Badge */}
                    <g transform="translate(0, -26)">
                      <rect
                        x="-45"
                        y="-16"
                        width="90"
                        height="20"
                        rx="6"
                        fill="#0A160E"
                        stroke="#22C55E"
                        strokeWidth="1"
                      />
                      <text
                        x="0"
                        y="-4"
                        textAnchor="middle"
                        fill="#22C55E"
                        fontSize="9"
                        fontFamily="monospace"
                        fontWeight="bold"
                      >
                        🚚 EV-04 • 28 km/h
                      </text>
                    </g>
                  </g>
                </svg>

                {/* Real-time Telemetry HUD overlay */}
                <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center justify-between gap-3 bg-[#0A160E]/90 backdrop-blur-md p-3 sm:p-4 rounded-xl border border-emerald-500/30 text-white">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-950 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                      <Truck className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] text-zinc-400 uppercase tracking-widest block font-mono">
                        Active EV Carrier
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-white">
                        {selectedRecord.driverName || 'VoltLoop Fleet Unit #04 (Tejgaon)'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 sm:gap-6 text-xs font-mono">
                    <div>
                      <span className="text-[10px] text-zinc-400 block">BATTERY</span>
                      <span className="font-bold text-emerald-400 flex items-center gap-1">
                        <BatteryCharging className="w-3.5 h-3.5" /> 84% EV
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-zinc-400 block">SPEED</span>
                      <span className="font-bold text-zinc-200 flex items-center gap-1">
                        <Gauge className="w-3.5 h-3.5 text-amber-400" /> 28 km/h
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-zinc-400 block">ETA TO GATE</span>
                      <span className="font-bold text-emerald-300">~18 Mins</span>
                    </div>
                    {selectedRecord.driverPhone && (
                      <a
                        href={`tel:${selectedRecord.driverPhone}`}
                        className="px-3 py-1.5 rounded-lg bg-[#15803D] hover:bg-[#166534] text-white font-sans font-bold text-xs flex items-center gap-1 transition-transform hover:scale-105"
                      >
                        <Phone className="w-3 h-3" />
                        <span>Call Driver</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* 5-STEPPING CHAIN OF CUSTODY TIMELINE */}
            <div className="p-6 sm:p-8 bg-white/95 border-b border-zinc-200">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
                    {language === 'en' ? 'Closed-Loop Chain of Custody & Smelting Stepper' : 'সম্পূর্ণ রিসাইক্লিং ও রূপান্তর পর্যায়'}
                  </h3>
                  <span className="text-xs text-[#15803D] font-bold">100% Traceability SLA Active</span>
                </div>
                <button
                  onClick={() => setShowWaybillModal(true)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#15803D] hover:text-[#166534] underline cursor-pointer"
                >
                  <Award className="w-4 h-4" />
                  <span>View Tamper-Proof Custody Seal</span>
                </button>
              </div>

              {/* Step Progress Line */}
              <div className="relative">
                <div className="hidden md:block absolute top-6 left-10 right-10 h-1.5 bg-zinc-200 rounded-full z-0">
                  <div
                    className="h-full bg-linear-to-r from-[#15803D] to-emerald-500 rounded-full transition-all duration-700 shadow-sm"
                    style={{
                      width:
                        selectedRecord.status === 'submitted'
                          ? '15%'
                          : selectedRecord.status === 'partner_assigned'
                          ? '38%'
                          : selectedRecord.status === 'collected'
                          ? '62%'
                          : selectedRecord.status === 'processed'
                          ? '86%'
                          : '100%',
                    }}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative z-10">
                  {[
                    {
                      status: 'submitted',
                      num: '1',
                      titleEn: '1. Request Logged',
                      titleBn: '১. রিকোয়েস্ট তালিকাভুক্ত',
                      sub: 'Barcode serialized in ledger',
                    },
                    {
                      status: 'partner_assigned',
                      num: '2',
                      titleEn: '2. EV Fleet Dispatched',
                      titleBn: '২. গাড়ি পাঠানো হয়েছে',
                      sub: selectedRecord.driverName || 'Depot carrier unit #04',
                    },
                    {
                      status: 'collected',
                      num: '3',
                      titleEn: '3. Gate Weighed & Paid',
                      titleBn: '৩. ওজন ও পেমেন্ট সম্পন্ন',
                      sub: 'Instant digital payout settled',
                    },
                    {
                      status: 'processed',
                      num: '4',
                      titleEn: '4. Pure Lead Recovered',
                      titleBn: '৪. সিসা নিষ্কাশিত',
                      sub: '99.97% hydrometallurgical yield',
                    },
                    {
                      status: 'offtake_delivered',
                      num: '5',
                      titleEn: '5. Offtake Ingot Delivery',
                      titleBn: '৫. কারখানায় হস্তান্তর',
                      sub: selectedRecord.manufacturerOfftake || 'Tier-1 Battery Manufacturer',
                    },
                  ].map((stepItem, idx) => {
                    const isDone = selectedRecord.timeline[idx]?.completed;
                    const isCurrent =
                      selectedRecord.status === stepItem.status ||
                      (stepItem.status === 'offtake_delivered' && selectedRecord.status === 'offtake_delivered');

                    return (
                      <div
                        key={stepItem.status}
                        className={`p-4 rounded-2xl border transition-all duration-300 ${
                          isDone
                            ? 'bg-emerald-50/70 border-emerald-400 shadow-xs'
                            : isCurrent
                            ? 'bg-white border-[#15803D] ring-2 ring-emerald-500/30 shadow-md scale-[1.02]'
                            : 'bg-zinc-100/60 border-zinc-200 text-zinc-400 opacity-80'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 mb-2">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black shrink-0 ${
                              isDone
                                ? 'bg-[#15803D] text-white shadow-xs'
                                : isCurrent
                                ? 'bg-amber-500 text-white ring-4 ring-amber-200 animate-pulse'
                                : 'bg-zinc-300 text-zinc-600'
                            }`}
                          >
                            {isDone ? <Check className="w-4 h-4 stroke-[3]" /> : stepItem.num}
                          </div>
                          <span
                            className={`text-xs font-bold leading-tight ${
                              isDone || isCurrent ? 'text-zinc-900' : 'text-zinc-500'
                            }`}
                          >
                            {language === 'en' ? stepItem.titleEn : stepItem.titleBn}
                          </span>
                        </div>
                        <p className="text-[11px] text-zinc-500 leading-snug pl-10.5">{stepItem.sub}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* THREE-COLUMN BATCH ATTRIBUTES */}
            <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 bg-zinc-50/70">
              {/* Garage Profile */}
              <div className="bg-white p-5 rounded-2xl border border-zinc-200/90 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Building2 className="w-4 h-4 text-emerald-700" />
                    <span>{language === 'en' ? 'Garage & Seller Node' : 'গ্যারেজ ও বিক্রেতা'}</span>
                  </h4>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                    Verified Seller
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-zinc-400 block text-[11px]">Garage Name:</span>
                    <span className="font-bold text-zinc-900 text-sm">{selectedRecord.garageName}</span>
                  </div>
                  <div>
                    <span className="text-zinc-400 block text-[11px]">Contact Partner:</span>
                    <span className="font-semibold text-zinc-800">{selectedRecord.sellerName}</span>
                  </div>
                  <div>
                    <span className="text-zinc-400 block text-[11px]">bKash / Mobile:</span>
                    <span className="font-mono font-semibold text-zinc-800">+880 {selectedRecord.phone}</span>
                  </div>
                  <div>
                    <span className="text-zinc-400 block text-[11px]">Pickup Location:</span>
                    <span className="font-medium text-zinc-800 flex items-start gap-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-[#15803D] shrink-0 mt-0.5" />
                      <span>{selectedRecord.address}, {selectedRecord.thana}, {selectedRecord.district}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Environmental & Metallurgy Yield */}
              <div className="bg-white p-5 rounded-2xl border border-zinc-200/90 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-[#15803D]" />
                    <span>{language === 'en' ? 'Recovered Clean Yield' : 'পরিবেশ ও রিসাইক্লিং লাভ'}</span>
                  </h4>
                  <span className="px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 text-[10px] font-bold">
                    99.97% Pure
                  </span>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="flex justify-between items-center pb-2 border-b border-zinc-100">
                    <span className="text-zinc-500">Batch Quantity:</span>
                    <span className="font-mono font-bold text-zinc-900 text-sm">{selectedRecord.quantity} Units</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2.5 rounded-xl bg-emerald-50/80 border border-emerald-200">
                      <span className="text-[10px] text-emerald-800 font-bold block uppercase">Pure Lead Yield</span>
                      <span className="font-mono font-black text-emerald-950 text-sm">
                        {selectedRecord.leadRecoveredKg || (selectedRecord.quantity * 23)} kg
                      </span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-teal-50/80 border border-teal-200">
                      <span className="text-[10px] text-teal-800 font-bold block uppercase">Acid Neutralized</span>
                      <span className="font-mono font-black text-teal-950 text-sm">
                        {selectedRecord.acidNeutralizedLiters || (selectedRecord.quantity * 5)} L
                      </span>
                    </div>
                  </div>
                  <div>
                    <span className="text-[11px] text-zinc-400 block">Battery Spec:</span>
                    <span className="font-bold text-zinc-800">{selectedRecord.batteryType}</span>
                  </div>
                </div>
              </div>

              {/* Downstream Manufacturer Offtake */}
              <div className="bg-white p-5 rounded-2xl border border-zinc-200/90 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Factory className="w-4 h-4 text-emerald-800" />
                    <span>{language === 'en' ? 'Industrial Offtake Partner' : 'অফটেক ম্যানুফ্যাকচারার'}</span>
                  </h4>
                  <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold">
                    DoE Certified
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-zinc-400 block text-[11px]">Smelter Offtake Contract:</span>
                    <span className="font-bold text-zinc-900">
                      {selectedRecord.manufacturerOfftake || 'Rahimafrooz / Navana Battery Offtake Agreement'}
                    </span>
                  </div>
                  <div>
                    <span className="text-zinc-400 block text-[11px]">Processing Facility:</span>
                    <span className="font-semibold text-zinc-800">VoltLoop Hydromet Unit #02 (Tongi)</span>
                  </div>
                  <div>
                    <span className="text-zinc-400 block text-[11px]">Logistics Carrier:</span>
                    <span className="font-mono font-medium text-zinc-800">
                      {selectedRecord.vehicleNumber || 'Dhaka Metro EV-Flatbed 14'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* ACTION BAR: DOWNLOAD WAYBILL & SHARE TRACKING */}
            <div className="p-5 sm:p-6 bg-white flex flex-wrap items-center justify-between gap-4 border-t border-zinc-200">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowWaybillModal(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>{language === 'en' ? 'Print Digital Weight Certificate' : 'ওজন সার্টিফিকেট প্রিন্ট'}</span>
                </button>
                <button
                  onClick={handleShare}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-bold transition-all cursor-pointer"
                >
                  <Share2 className="w-4 h-4" />
                  <span>{copiedLink ? 'Link Copied!' : 'Share Tracking Link'}</span>
                </button>
              </div>

              <div className="text-xs text-zinc-400 font-mono">
                Immutable Ledger Stamp: <span className="text-zinc-700 font-bold">SHA-256 Verified</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: HOLOGRAPHIC OFFICIAL CERTIFICATE & WAYBILL */}
      {showWaybillModal && selectedRecord && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="liquid-glass max-w-xl w-full rounded-3xl p-6 sm:p-8 bg-white border border-emerald-500/40 shadow-2xl relative space-y-6">
            
            {/* Header with Logo */}
            <div className="flex items-center justify-between pb-4 border-b border-zinc-200">
              <VoltLogo size="sm" showWordmark={true} />
              <button
                onClick={() => setShowWaybillModal(false)}
                className="w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 flex items-center justify-center text-zinc-600 font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Waybill Certificate Body */}
            <div className="border-2 border-dashed border-emerald-600/40 rounded-2xl p-5 bg-emerald-50/40 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-800 font-bold block">
                    GOVERNMENT OF BANGLADESH COMPLIANT
                  </span>
                  <h3 className="text-base font-black font-heading text-zinc-900">
                    Lead-Acid Battery Chain-of-Custody Waybill
                  </h3>
                </div>
                <div className="p-2 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-mono font-black">
                  SEAL #084-26
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs font-mono bg-white p-4 rounded-xl border border-emerald-200">
                <div>
                  <span className="text-zinc-400 block text-[10px]">TRACKING CODE</span>
                  <span className="font-bold text-zinc-900">{selectedRecord.trackingCode}</span>
                </div>
                <div>
                  <span className="text-zinc-400 block text-[10px]">NET PAYOUT</span>
                  <span className="font-bold text-emerald-700">৳{selectedRecord.estimatedPayoutBDT.toLocaleString()} BDT</span>
                </div>
                <div>
                  <span className="text-zinc-400 block text-[10px]">SELLER GARAGE</span>
                  <span className="font-bold text-zinc-900">{selectedRecord.garageName}</span>
                </div>
                <div>
                  <span className="text-zinc-400 block text-[10px]">UNITS & WEIGHT</span>
                  <span className="font-bold text-zinc-900">{selectedRecord.quantity} Units (~{selectedRecord.quantity * 28} kg)</span>
                </div>
              </div>

              {/* Barcode scanner laser visual */}
              <div className="relative py-3 px-4 bg-zinc-900 rounded-xl flex items-center justify-center overflow-hidden">
                <div className="absolute inset-x-0 h-0.5 bg-emerald-400 shadow-[0_0_12px_#34d399] animate-scan-line"></div>
                <span className="font-mono text-emerald-400 text-sm tracking-[0.3em] font-bold">
                  ||| | |||| || ||| |||| | ||| {selectedRecord.trackingCode} |||
                </span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => {
                  window.print();
                  setShowWaybillModal(false);
                }}
                className="px-5 py-2.5 rounded-xl bg-[#15803D] hover:bg-[#166534] text-white text-xs font-bold shadow-md cursor-pointer flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Save Official PDF Certificate</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
