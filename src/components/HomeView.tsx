import React, { useState } from 'react';
import { 
  Zap, 
  ArrowRight, 
  ShieldCheck, 
  Search, 
  Truck, 
  Factory, 
  Recycle, 
  TrendingUp, 
  Coins, 
  CheckCircle2, 
  MapPin, 
  Clock, 
  Sparkles,
  Award,
  ChevronRight,
  Calculator,
  Building2,
  Users,
  Navigation,
  BarChart3,
  AlertTriangle,
  Skull,
  Droplets,
  Flame,
  ShieldAlert,
  PieChart as PieIcon
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { ImpactStats, Language, PageView } from '../types';
import { BATTERY_TYPES, PRICE_TREND_DATA } from '../data/mockData';
import { VoltLogo } from './VoltLogo';

interface HomeViewProps {
  impactStats: ImpactStats;
  onOpenSellModal: () => void;
  onNavigate: (page: PageView) => void;
  language: Language;
}


export const HomeView: React.FC<HomeViewProps> = ({
  impactStats,
  onOpenSellModal,
  onNavigate,
  language,
}) => {
  // Mini interactive payout calculator on Home
  const [calcQty, setCalcQty] = useState<number>(8);
  const [calcType, setCalcType] = useState(BATTERY_TYPES[0].id);

  const activeCalcType = BATTERY_TYPES.find((b) => b.id === calcType) || BATTERY_TYPES[0];
  const calcEstimatedBDT = activeCalcType.unitPayoutBDT * calcQty;
  const calcInformalBDT = activeCalcType.informalScrapRateBDT * calcQty;
  const calcGainBDT = calcEstimatedBDT - calcInformalBDT;

  return (
    <div className="space-y-20 pb-20 overflow-hidden relative">
      {/* Background Liquid Ambient Blobs */}
      <div className="absolute top-10 left-1/3 w-[36rem] h-[36rem] rounded-full bg-emerald-400/10 blur-[130px] pointer-events-none animate-liquid-blob -z-10" />
      <div className="absolute top-96 right-10 w-[28rem] h-[28rem] rounded-full bg-teal-400/10 blur-[100px] pointer-events-none animate-liquid-blob-delay -z-10" />

      {/* HERO SECTION */}
      <section className="relative pt-8 sm:pt-14 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Mission & Main CTA */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Tagline Badge */}
            <div className="liquid-glass inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-[#15803D] text-xs sm:text-sm font-bold shadow-xs border border-emerald-500/30">
              <span className="w-2.5 h-2.5 rounded-full bg-[#15803D] animate-ping" />
              <span>
                {language === 'en' 
                  ? 'VoltLoop: Turning Toxic Strains into Economic Gains.' 
                  : 'ভোল্টলুপ: পরিবেশ দূষণ রোধ ও টেকসই অর্থনৈতিক সমৃদ্ধি।'}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-heading text-zinc-900 tracking-tight leading-[1.08]">
              {language === 'en' ? (
                <>
                  Bangladesh’s Safe Battery Recycling <span className="text-[#15803D]">Offtake Network.</span>
                </>
              ) : (
                <>
                  বাংলাদেশের ই-রিকশা ব্যাটারির <span className="text-[#15803D]">নিরাপদ রিসাইক্লিং ও অফটেক নেটওয়ার্ক।</span>
                </>
              )}
            </h1>

            <p className="text-lg sm:text-xl text-zinc-600 leading-relaxed max-w-2xl">
              {language === 'en'
                ? "We safely collect dead lead-acid batteries from Dhaka's e-rickshaw garages at guaranteed premium payouts, extract 99.97% refined secondary lead, and supply certified offtake to battery manufacturers."
                : "আমরা ঢাকার ই-রিকশা গ্যারেজ থেকে সর্বোচ্চ মূল্যে মৃত ব্যাটারি সংগ্রহ করে ৯৯.৯৭% খাঁটি সিসা প্রস্তুত করি এবং দেশীয় ব্যাটারি কারখানায় অফটেক চুক্তির আওতায় সরবরাহ করি।"}
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <button
                id="hero-sell-battery-btn"
                onClick={onOpenSellModal}
                className="px-8 py-4 rounded-2xl bg-[#15803D] hover:bg-[#166534] active:scale-98 text-white font-black text-base shadow-lg shadow-emerald-900/15 flex items-center justify-center gap-3 transition-all cursor-pointer group hover:scale-[1.02]"
              >
                <Zap className="w-5 h-5 fill-emerald-200 text-emerald-200" />
                <span>{language === 'en' ? 'Sell Your Dead Battery' : 'মৃত ব্যাটারি বিক্রি করুন'}</span>
                <ArrowRight className="w-5 h-5 text-emerald-200 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="hero-track-btn"
                onClick={() => onNavigate('track')}
                className="liquid-glass px-6 py-4 rounded-2xl border border-zinc-300 text-zinc-800 font-bold text-base shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer hover:bg-white hover:scale-[1.02]"
              >
                <Search className="w-4 h-4 text-[#15803D]" />
                <span>{language === 'en' ? 'Track Live Pickup & GPS' : 'লাইভ ট্র্যাকিং ও জিপিএস'}</span>
              </button>
            </div>

            {/* Trust highlights directly beside / under CTA */}
            <div className="pt-4 border-t border-zinc-200/80 grid grid-cols-3 gap-3 text-xs">
              <div className="flex items-center gap-2 text-zinc-700 font-medium">
                <ShieldCheck className="w-4 h-4 text-[#15803D] shrink-0" />
                <span className="font-bold">{language === 'en' ? '+15-20% Top Price' : '১৫-২০% বেশি দাম'}</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-700 font-medium">
                <Truck className="w-4 h-4 text-[#15803D] shrink-0" />
                <span className="font-bold">{language === 'en' ? 'Free EV Pickup' : 'ফ্রি ডোরস্টেপ পিকআপ'}</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-700 font-medium">
                <Coins className="w-4 h-4 text-[#15803D] shrink-0" />
                <span className="font-bold">{language === 'en' ? 'Instant bKash Pay' : 'তাৎক্ষণিক বিকাশ পেমেন্ট'}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Live Interactive Instant Payout Calculator Widget */}
          <div className="lg:col-span-5">
            <div className="liquid-glass rounded-3xl p-6 sm:p-7 border border-emerald-500/20 shadow-2xl space-y-5 relative">
              <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-100/90 flex items-center justify-center text-[#15803D] shadow-xs">
                    <Calculator className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-zinc-900 font-heading">
                      {language === 'en' ? 'Live Garage Payout Estimator' : 'লাইভ গ্যারেজ মূল্য ক্যালকুলেটর'}
                    </h3>
                    <p className="text-[11px] text-zinc-500">
                      {language === 'en' ? 'Dhaka wholesale scrap index' : 'ঢাকা পাইকারি স্ক্র্যাপ মূল্য'}
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-mono font-bold bg-emerald-50 text-[#15803D] px-2.5 py-1 rounded-full border border-emerald-200">
                  Live Index
                </span>
              </div>

              {/* Battery Type Selector */}
              <div>
                <label className="text-xs font-bold text-zinc-700 block mb-1.5">
                  {language === 'en' ? 'Select Battery Model' : 'ব্যাটারির মডেল বেছে নিন'}
                </label>
                <select
                  value={calcType}
                  onChange={(e) => setCalcType(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-zinc-300 focus:border-[#15803D] font-bold text-zinc-900 bg-white/90 shadow-xs outline-none"
                >
                  {BATTERY_TYPES.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name} (৳{b.unitPayoutBDT}/unit)
                    </option>
                  ))}
                </select>
              </div>

              {/* Quantity Counter */}
              <div>
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <span className="font-bold text-zinc-700">
                    {language === 'en' ? 'Quantity of Dead Batteries' : 'মৃত ব্যাটারির সংখ্যা'}:
                  </span>
                  <span className="font-mono font-black text-base text-[#15803D] bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                    {calcQty} Units
                  </span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="40"
                  step="2"
                  value={calcQty}
                  onChange={(e) => setCalcQty(parseInt(e.target.value))}
                  className="w-full accent-[#15803D] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-zinc-400 font-mono mt-1">
                  <span>2 Units</span>
                  <span>16 Units (4 Rickshaws)</span>
                  <span>40 Units (Depot)</span>
                </div>
              </div>

              {/* Payout Calculation Result Box */}
              <div className="bg-[#0A160E] text-white rounded-2xl p-4.5 space-y-2 border border-emerald-900/60 shadow-inner">
                <span className="text-[11px] text-emerald-400 uppercase tracking-wider block font-mono font-bold">
                  {language === 'en' ? 'Total Guaranteed Payout' : 'সর্বমোট প্রদেয় মূল্য'}
                </span>
                <div className="text-3xl font-black font-mono text-white tracking-tight">
                  ৳{calcEstimatedBDT.toLocaleString()}{' '}
                  <span className="text-xs font-sans text-emerald-300">BDT</span>
                </div>
                <div className="text-xs text-emerald-400 flex items-center gap-1 font-semibold pt-1 border-t border-emerald-950">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>
                    +৳{calcGainBDT.toLocaleString()} {language === 'en' ? 'more than informal scrap dealers' : 'টাকা বাড়তি লাভ'}
                  </span>
                </div>
              </div>

              {/* Action */}
              <button
                onClick={onOpenSellModal}
                className="w-full py-3.5 rounded-xl bg-[#15803D] hover:bg-[#166534] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer hover:scale-[1.01]"
              >
                <span>{language === 'en' ? 'Schedule Pickup For This Batch' : 'এই ব্যাচের পিকআপ বুক করুন'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* VERIFIED ENVIRONMENTAL IMPACT SNAPSHOT WITH FLOATING PIE CHART & RICH GRAPHICS */}
      <section className="bg-radial from-[#0e2716] via-[#08170e] to-[#040a06] text-white py-14 sm:py-20 px-4 sm:px-6 lg:px-8 border-y border-emerald-900/60 relative overflow-hidden shadow-2xl">
        {/* Ambient background glow and grid */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto space-y-10 relative z-10">
          {/* Header Bar */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-emerald-900/60 pb-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/90 border border-emerald-500/40 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider shadow-inner">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <PieIcon className="w-4 h-4 text-emerald-400" />
                <span>{language === 'en' ? 'Verified Environmental Impact Snapshot' : 'লাইভ পরিবেশগত প্রভাব ও সার্কুলার মেট্রিকস'}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-white tracking-tight">
                {language === 'en' ? '100% Material Recovery & Toxicity Elimination' : 'শতভাগ কাঁচামাল পুনরুদ্ধার ও দূষণমুক্ত সমাধান'}
              </h2>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400/90 bg-emerald-950/60 px-3.5 py-2 rounded-xl border border-emerald-900/80">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{language === 'en' ? 'ISO 14001 • DoE & Basel Convention Certified' : 'আইএসও ১৪০০১ ও পরিবেশ অধিদপ্তর প্রত্যয়িত'}</span>
            </div>
          </div>

          {/* 4 Primary Big Impact Numbers */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-zinc-900/90 hover:bg-zinc-900 transition-all p-5 sm:p-6 rounded-3xl border border-emerald-900/50 shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl group-hover:bg-emerald-500/20 transition-all" />
              <span className="text-xs text-zinc-400 block font-medium mb-1.5">
                {language === 'en' ? 'Dead Batteries Diverted' : 'সংগৃহীত মৃত ব্যাটারি'}
              </span>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black font-mono text-white tracking-tight">
                {impactStats.batteriesCollected.toLocaleString()}+
              </div>
              <div className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-lg border border-emerald-800/60">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{language === 'en' ? 'Zero backyard dumping' : 'পরিবেশ দূষণ রোধ'}</span>
              </div>
            </div>

            <div className="bg-zinc-900/90 hover:bg-zinc-900 transition-all p-5 sm:p-6 rounded-3xl border border-emerald-900/50 shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-400/10 rounded-full blur-xl group-hover:bg-emerald-400/20 transition-all" />
              <span className="text-xs text-zinc-400 block font-medium mb-1.5">
                {language === 'en' ? 'Refined Lead Recovered' : 'নিষ্কাশিত বিশুদ্ধ সিসা'}
              </span>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black font-mono text-emerald-400 tracking-tight">
                {impactStats.leadRecoveredMT.toLocaleString()} <span className="text-base sm:text-lg font-sans text-zinc-400">MT</span>
              </div>
              <div className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-mono text-zinc-300 bg-zinc-800/80 px-2.5 py-1 rounded-lg border border-zinc-700">
                <span>99.97% LME Pure Ingots</span>
              </div>
            </div>

            <div className="bg-zinc-900/90 hover:bg-zinc-900 transition-all p-5 sm:p-6 rounded-3xl border border-emerald-900/50 shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-teal-500/10 rounded-full blur-xl group-hover:bg-teal-500/20 transition-all" />
              <span className="text-xs text-zinc-400 block font-medium mb-1.5">
                {language === 'en' ? 'Toxic Acid Neutralized' : 'নিষ্ক্রিয়কৃত সালফিউরিক অ্যাসিড'}
              </span>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black font-mono text-teal-300 tracking-tight">
                {(impactStats.acidNeutralizedLiters / 1000).toFixed(0)}k <span className="text-base sm:text-lg font-sans text-zinc-400">Liters</span>
              </div>
              <div className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-semibold text-teal-300 bg-teal-950/80 px-2.5 py-1 rounded-lg border border-teal-800/60">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>100% neutralized to gypsum</span>
              </div>
            </div>

            <div className="bg-zinc-900/90 hover:bg-zinc-900 transition-all p-5 sm:p-6 rounded-3xl border border-emerald-900/50 shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-xl group-hover:bg-amber-500/20 transition-all" />
              <span className="text-xs text-zinc-400 block font-medium mb-1.5">
                {language === 'en' ? 'Registered Partner Garages' : 'নিবন্ধিত গ্যারেজ পার্টনার'}
              </span>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black font-mono text-amber-300 tracking-tight">
                {impactStats.activeGarages.toLocaleString()}+
              </div>
              <div className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-semibold text-amber-300 bg-amber-950/80 px-2.5 py-1 rounded-lg border border-amber-800/60">
                <MapPin className="w-3.5 h-3.5" />
                <span>Dhaka, Tongi, Gazipur</span>
              </div>
            </div>
          </div>

          {/* FLOATING PIE CHART & CIRCULAR MATERIAL RECOVERY VISUAL */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-zinc-950/90 rounded-3xl p-6 sm:p-10 border border-emerald-900/60 shadow-2xl relative">
            {/* Left: Floating Interactive Pie Chart */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center relative">
              <div className="text-center space-y-1 mb-3">
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
                  {language === 'en' ? 'Battery Mass Conversion Efficiency' : 'উপাদান পুনর্ব্যবহার অনুপাত'}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  {language === 'en' ? 'Zero-Waste Closed Recovery Loop' : 'শূন্য-বর্জ্য সার্কুলার রূপান্তর'}
                </h3>
              </div>

              {/* Floating Pie Container with Central Value */}
              <div className="relative w-full h-72 sm:h-80 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-[#0A160E] border-2 border-emerald-500 p-3 rounded-2xl shadow-2xl text-white font-mono text-xs space-y-1">
                              <p className="font-bold text-sm text-emerald-300">{data.name}</p>
                              <p className="text-zinc-200">Share: <span className="font-bold text-white text-base">{data.value}%</span> of total weight</p>
                              <p className="text-emerald-400 font-semibold">{data.sub}</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Pie
                      data={[
                        { name: 'Refined Secondary Lead (99.97%)', value: 65, color: '#107C2B', sub: '1,936 MT Pure Ingots to Battery Makers' },
                        { name: 'Neutralized Gypsum (Sulfuric Acid)', value: 18, color: '#0EA5E9', sub: '412,000 L Acid Neutralized to Gypsum' },
                        { name: 'Polypropylene (PP) Polymer Casing', value: 12, color: '#F59E0B', sub: '358 MT High-Impact Casing Pellets' },
                        { name: 'Copper & Alloy Terminals', value: 5, color: '#8B5CF6', sub: '148 MT Heavy Hardware Salvaged' },
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={75}
                      outerRadius={115}
                      paddingAngle={4}
                      dataKey="value"
                      stroke="#040a06"
                      strokeWidth={3}
                    >
                      <Cell key="cell-0" fill="#107C2B" />
                      <Cell key="cell-1" fill="#0EA5E9" />
                      <Cell key="cell-2" fill="#F59E0B" />
                      <Cell key="cell-3" fill="#8B5CF6" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>

                {/* Floating Center Badge inside Donut */}
                <div className="absolute inset-0 m-auto w-32 h-32 rounded-full bg-[#07130A] border-2 border-emerald-500/50 flex flex-col items-center justify-center text-center shadow-lg pointer-events-none animate-pulse">
                  <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold tracking-wider">Efficiency</span>
                  <span className="text-2xl font-black font-mono text-white">99.4%</span>
                  <span className="text-[9px] text-zinc-400 font-medium">Material Circularity</span>
                </div>
              </div>
            </div>

            {/* Right: Graphic Breakdown Cards */}
            <div className="lg:col-span-6 space-y-3.5">
              <div className="p-4 rounded-2xl bg-zinc-900/90 border border-emerald-600/40 flex items-center justify-between gap-4 hover:border-emerald-500 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#107C2B]/20 text-emerald-400 flex items-center justify-center font-bold text-base border border-[#107C2B]/40">
                    65%
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm sm:text-base">
                      {language === 'en' ? 'Refined Secondary Lead (99.97% LME)' : 'নিষ্কাশিত বিশুদ্ধ সিসা (৯৯.৯৭%)'}
                    </h4>
                    <p className="text-xs text-zinc-400">
                      {language === 'en' ? 'Direct supply to Rahimafrooz & Hamko' : 'রহিমআফরোজ ও হামকো কারখানায় সরবরাহ'}
                    </p>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded-lg border border-emerald-800">
                  1,936 MT
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-900/90 border border-sky-600/40 flex items-center justify-between gap-4 hover:border-sky-500 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold text-base border border-sky-500/40">
                    18%
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm sm:text-base">
                      {language === 'en' ? 'Neutralized Gypsum (Electrolyte)' : 'নিষ্ক্রিয়কৃত জিপসাম স্লাজ'}
                    </h4>
                    <p className="text-xs text-zinc-400">
                      {language === 'en' ? '412k Liters neutralized with sodium carbonate' : 'সালফিউরিক অ্যাসিড সম্পূর্ণ নিষ্ক্রিয়'}
                    </p>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-sky-400 bg-sky-950 px-2.5 py-1 rounded-lg border border-sky-800">
                  412k Liters
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-900/90 border border-amber-600/40 flex items-center justify-between gap-4 hover:border-amber-500 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-base border border-amber-500/40">
                    12%
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm sm:text-base">
                      {language === 'en' ? 'Polypropylene Plastic Granules' : 'পলিপ্রোপিলিন প্লাস্টিক দানা'}
                    </h4>
                    <p className="text-xs text-zinc-400">
                      {language === 'en' ? 'Washed and remelted into fresh battery casings' : 'নতুন ব্যাটারি কেসিং তৈরির কাঁচামাল'}
                    </p>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-amber-400 bg-amber-950 px-2.5 py-1 rounded-lg border border-amber-800">
                  358 MT
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-900/90 border border-purple-600/40 flex items-center justify-between gap-4 hover:border-purple-500 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-base border border-purple-500/40">
                    5%
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm sm:text-base">
                      {language === 'en' ? 'Terminal Connectors & Hardware' : 'কানেক্টর ও মেটাল টার্মিনাল'}
                    </h4>
                    <p className="text-xs text-zinc-400">
                      {language === 'en' ? 'Salvaged copper and zinc alloys' : 'তামা ও ধাতব সংকর পুনর্ব্যবহার'}
                    </p>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-purple-400 bg-purple-950 px-2.5 py-1 rounded-lg border border-purple-800">
                  148 MT
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING TRANSPARENCY & VOLTLOOP PREMIUM TREND CHART */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-9 border border-zinc-200 shadow-lg space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-100 pb-5">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-[#15803D] text-xs font-bold uppercase tracking-wider mb-2">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>{language === 'en' ? 'Market Transparency Benchmark' : 'ন্যায্য মূল্য ও মুনাফার তুলনামূলক চিত্র'}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black font-heading text-zinc-900 tracking-tight">
                {language === 'en' ? 'Direct Manufacturer Offtake vs Scrap Middlemen Rate' : 'ভোল্টলুপ বনাম সাধারণ ভাঙারি ব্যবসায়ীদের দর'}
              </h2>
              <p className="text-xs sm:text-sm text-zinc-500 mt-1">
                {language === 'en' ? 'Historical secondary lead purchase price (BDT / kg) over the past 7 months across Dhaka depots.' : 'গত ৭ মাসের প্রতি কেজি সিসার গড় ক্রয়মূল্যের পরিসংখ্যান।'}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="text-[10px] text-zinc-400 font-mono uppercase block">Seller Margin Advantage</span>
                <span className="text-xl font-black font-mono text-[#15803D]">+৳28–31 / kg</span>
              </div>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={PRICE_TREND_DATA}
                margin={{ top: 10, right: 20, left: -20, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis 
                  dataKey="month" 
                  stroke="#94a3b8" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={{ stroke: '#e2e8f0' }}
                />
                <YAxis 
                  stroke="#94a3b8" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false}
                  domain={[120, 180]}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0A160E',
                    borderColor: '#107c2b',
                    borderRadius: '12px',
                    color: '#ffffff',
                    fontSize: '12px',
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
                  }}
                  formatter={(value: any, name: any) => [`৳${value} BDT/kg`, name]}
                />
                <Legend 
                  wrapperStyle={{ paddingTop: '12px', fontSize: '12px' }}
                />
                <Line
                  type="monotone"
                  dataKey="voltloopRate"
                  name="VoltLoop Certified Direct Rate (৳/kg)"
                  stroke="#15803D"
                  strokeWidth={3.5}
                  dot={{ r: 5, fill: '#15803D', strokeWidth: 2, stroke: '#ffffff' }}
                  activeDot={{ r: 8, stroke: '#15803D', strokeWidth: 2, fill: '#ffffff' }}
                />
                <Line
                  type="monotone"
                  dataKey="informalRate"
                  name="Informal Middleman Average Rate (৳/kg)"
                  stroke="#94a3b8"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  dot={{ r: 4, fill: '#94a3b8' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-zinc-100 text-xs">
            <div className="bg-zinc-50 p-3.5 rounded-xl border border-zinc-200">
              <span className="font-bold text-zinc-900 block mb-0.5">100% Digital Weighing</span>
              <span className="text-zinc-600">Bluetooth certified scales prevent middlemen manipulation.</span>
            </div>
            <div className="bg-zinc-50 p-3.5 rounded-xl border border-zinc-200">
              <span className="font-bold text-zinc-900 block mb-0.5">Instant Mobile Settlement</span>
              <span className="text-zinc-600">Funds transferred directly via bKash / Nagad before pickup truck departs.</span>
            </div>
            <div className="bg-zinc-50 p-3.5 rounded-xl border border-zinc-200">
              <span className="font-bold text-zinc-900 block mb-0.5">Guaranteed Manufacturer Offtake</span>
              <span className="text-zinc-600">Direct supply to Rahimafrooz & Hamko eliminates brokers.</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4-STEP CIRCULAR LOOP VISUAL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="liquid-glass inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[#15803D] text-xs font-bold uppercase tracking-wider border border-emerald-500/30">
            <Recycle className="w-4 h-4" />
            <span>{language === 'en' ? 'The Closed-Loop Lifecycle' : 'সম্পূর্ণ ক্লোজড-লুপ প্রক্রিয়া'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black font-heading text-zinc-900 tracking-tight">
            {language === 'en'
              ? 'From Dead E-Rickshaw Battery to Brand-New Cell'
              : 'মৃত ব্যাটারি থেকে নতুন ব্যাটারির সার্কুলার রূপান্তর'}
          </h2>
          <p className="text-zinc-600 text-sm sm:text-base">
            {language === 'en'
              ? 'Our certified 4-step chain of custody eliminates informal backyard lead smelting, protects human health, and supplies local manufacturers with pure circular raw materials.'
              : 'আমাদের ৪-ধাপের প্রক্রিয়া অনানুষ্ঠানিক দূষণ দূর করে এবং ব্যাটারি কারখানায় মানসম্পন্ন কাঁচামাল নিশ্চিত করে।'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Step 1 */}
          <div className="liquid-glass rounded-3xl p-6 border border-zinc-200 shadow-sm relative group hover:border-emerald-500 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-[#15803D] flex items-center justify-center font-black text-xl mb-4 shadow-xs">
              01
            </div>
            <h3 className="text-lg font-black font-heading text-zinc-900 mb-2">
              {language === 'en' ? 'Garage Collection Point' : 'গ্যারেজ কালেকশন'}
            </h3>
            <p className="text-xs text-zinc-600 leading-relaxed mb-4">
              {language === 'en'
                ? 'Garage owners register dead batteries via mobile. Calibrated digital scale weighing at garage gate ensures complete transparency and instant bKash payout.'
                : 'গ্যারেজ মালিকরা মোবাইলে রিকোয়েস্ট দেন। গেটে ডিজিটাল ওজনের পর সাথে সাথে ন্যায্য মূল্য পরিশোধ করা হয়।'}
            </p>
            <div className="text-[11px] text-[#15803D] font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'Instant digital receipt' : 'ডিজিটাল রশিদ'}</span>
            </div>
          </div>

          {/* Step 2 */}
          <div className="liquid-glass rounded-3xl p-6 border border-zinc-200 shadow-sm relative group hover:border-emerald-500 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-black text-xl mb-4 shadow-xs">
              02
            </div>
            <h3 className="text-lg font-black font-heading text-zinc-900 mb-2">
              {language === 'en' ? 'Zero-Spill EV Logistics' : 'সুরক্ষিত পরিবহন'}
            </h3>
            <p className="text-xs text-zinc-600 leading-relaxed mb-4">
              {language === 'en'
                ? 'Dead batteries are locked in specialized acid-resistant poly-crates and transported on VoltLoop electric flatbed trucks across 6 Greater Dhaka depots.'
                : 'অ্যাসিডরোধী বিশেষ ক্রেইটে লক করে নিজস্ব ই-ট্রাকের মাধ্যমে কেন্দ্রীয় ডিপোতে পরিবহন করা হয়।'}
            </p>
            <div className="text-[11px] text-blue-700 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'Zero acid spill guarantee' : 'অ্যাসিড লিকমুক্ত'}</span>
            </div>
          </div>

          {/* Step 3 */}
          <div className="liquid-glass rounded-3xl p-6 border border-zinc-200 shadow-sm relative group hover:border-emerald-500 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center font-black text-xl mb-4 shadow-xs">
              03
            </div>
            <h3 className="text-lg font-black font-heading text-zinc-900 mb-2">
              {language === 'en' ? 'Clean Metallurgy & Smelting' : 'পরিবেশবান্ধব স্মেল্টিং'}
            </h3>
            <p className="text-xs text-zinc-600 leading-relaxed mb-4">
              {language === 'en'
                ? 'Automated battery breaking in closed negative-pressure chambers. Electrolyte is neutralized into non-toxic gypsum; lead grids refined to 99.97% pure ingots.'
                : 'সম্পূর্ণ আধুনিক মেশিনে স্বয়ংক্রিয়ভাবে সিসা ও প্লাস্টিক পৃথক করা হয় এবং সালফিউরিক অ্যাসিড নিষ্ক্রিয় করা হয়।'}
            </p>
            <div className="text-[11px] text-teal-700 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{language === 'en' ? '99.97% LME ingot purity' : '৯৯.৯৭% বিশুদ্ধ সিসা'}</span>
            </div>
          </div>

          {/* Step 4 */}
          <div className="liquid-glass rounded-3xl p-6 border border-zinc-200 shadow-sm relative group hover:border-emerald-500 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#0A160E] text-emerald-400 flex items-center justify-center font-black text-xl mb-4 shadow-xs border border-emerald-500/30">
              04
            </div>
            <h3 className="text-lg font-black font-heading text-zinc-900 mb-2">
              {language === 'en' ? 'Manufacturer Offtake' : 'কারখানায় অফটেক সরবরাহ'}
            </h3>
            <p className="text-xs text-zinc-600 leading-relaxed mb-4">
              {language === 'en'
                ? 'Secondary lead ingots are delivered under long-term offtake contracts to major Bangladesh battery makers (Rahimafrooz, Hamko, Lucas) with EPR credits.'
                : 'শীর্ষস্থানীয় ব্যাটারি প্রস্তুতকারকদের কাছে অফটেক চুক্তির আওতায় সার্কুলার কাঁচামাল হিসেবে হস্তান্তর।'}
            </p>
            <div className="text-[11px] text-[#15803D] font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'EPR & Scope 3 Certified' : 'ইপিআর সার্টিফিকেট'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* THE PROBLEM SNAPSHOT TEASER - GRAPHIC-RICH COMPARISON */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-zinc-950 via-[#0a100c] to-zinc-950 text-white rounded-3xl p-8 sm:p-12 border-2 border-red-900/40 shadow-2xl space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-zinc-800 pb-6">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-950/80 border border-red-500/40 text-red-400 text-xs font-mono font-bold uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4 text-red-400 animate-pulse" />
                <span>{language === 'en' ? 'The Bangladesh Battery Epidemic' : 'বাংলাদেশের মারাত্মক ব্যাটারি সংকট'}</span>
              </div>
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-white tracking-tight leading-tight">
                {language === 'en'
                  ? '4 Million E-Rickshaws. 35,000+ Tons of Toxic Lead Leaking.'
                  : '৪০ লাখের বেশি ই-রিকশা। ৩৫,০০০ টন বিষাক্ত সিসার উন্মুক্ত হুমকি।'}
              </h3>
              <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-normal">
                {language === 'en'
                  ? 'Without formal collection, 80%+ of dead easy-bike batteries end up in unregulated backyard furnaces, venting neurotoxic lead fumes directly into communities.'
                  : 'যথাযথ ব্যবস্থাপনার অভাবে শতকরা ৮০ ভাগ ব্যাটারি অনিবন্ধিত খোলা ভাট্টিতে পোড়ানো হয়, যা বায়ু, পানি ও মানুষের রক্তে বিষাক্ত সিসা ছড়াচ্ছে।'}
              </p>
            </div>

            <button
              onClick={() => onNavigate('problem')}
              className="self-start lg:self-center px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold flex items-center gap-2.5 shadow-lg transition-all hover:scale-105 cursor-pointer whitespace-nowrap"
            >
              <span>{language === 'en' ? 'Explore Full Graphic Report' : 'পূর্ণ চিত্রভিত্তিক রিপোর্ট দেখুন'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Visual Graphic Contrast Cards: Backyard informal vs VoltLoop Safe Loop */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Informal Crisis Card */}
            <div className="bg-red-950/30 rounded-2xl p-6 border border-red-800/50 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase text-red-400 flex items-center gap-2">
                  <Skull className="w-4 h-4 text-red-400" />
                  {language === 'en' ? 'Informal Backyard Scrappers' : 'অনানুষ্ঠানিক খোলা ভাঙারি কারখানা'}
                </span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-red-900/60 text-red-300 font-bold">Unregulated</span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-zinc-900/80 p-3 rounded-xl border border-red-900/30">
                  <span className="text-zinc-400 block mb-1">Worker Blood Lead</span>
                  <span className="text-lg font-black font-mono text-red-400">&gt;65 µg/dL</span>
                  <span className="text-[10px] text-red-300 block">Severe neurotoxicity</span>
                </div>
                <div className="bg-zinc-900/80 p-3 rounded-xl border border-red-900/30">
                  <span className="text-zinc-400 block mb-1">Acid Handling</span>
                  <span className="text-lg font-black font-mono text-red-400">Open Drains</span>
                  <span className="text-[10px] text-red-300 block">Canals & rivers ruined</span>
                </div>
              </div>
            </div>

            {/* VoltLoop Solution Card */}
            <div className="bg-emerald-950/30 rounded-2xl p-6 border border-emerald-800/50 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase text-emerald-400 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  {language === 'en' ? 'VoltLoop Closed-Loop Chain' : 'ভোল্টলুপ সার্কুলার নেটওয়ার্ক'}
                </span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-900/60 text-emerald-300 font-bold">100% Certified</span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-zinc-900/80 p-3 rounded-xl border border-emerald-900/30">
                  <span className="text-zinc-400 block mb-1">Garage Payout Rate</span>
                  <span className="text-lg font-black font-mono text-emerald-400">৳2,150 / unit</span>
                  <span className="text-[10px] text-emerald-300 block">Instant bKash payout</span>
                </div>
                <div className="bg-zinc-900/80 p-3 rounded-xl border border-emerald-900/30">
                  <span className="text-zinc-400 block mb-1">Acid Neutralization</span>
                  <span className="text-lg font-black font-mono text-emerald-400">100% Gypsum</span>
                  <span className="text-[10px] text-emerald-300 block">Zero groundwater runoff</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
