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
  BarChart3
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
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
              <span>{language === 'en' ? '"Every dead battery, given a second Volt."' : '"প্রতিটি মৃত ব্যাটারির নতুন ভোল্ট জীবন।"'}</span>
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

      {/* IMPACT SNAPSHOT TICKER BAR */}
      <section className="bg-[#0A160E] text-white py-12 px-4 sm:px-6 lg:px-8 border-y border-emerald-900/50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-6 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 flex items-center gap-2 font-bold">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              {language === 'en' ? 'Verified Environmental Impact Snapshot' : 'লাইভ সার্কুলার অর্থনীতি মেট্রিকস'}
            </span>
            <span className="text-xs text-zinc-400 font-mono">
              {language === 'en' ? 'ISO 14001 & Basel Convention Compliant' : 'আইএসও ১৪০০১ মান অনুযায়ী প্রত্যয়িত'}
            </span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-zinc-900/90 p-5 rounded-2xl border border-zinc-800/80 shadow-lg">
              <span className="text-xs text-zinc-400 block mb-1">
                {language === 'en' ? 'Dead Batteries Diverted' : 'সংগৃহীত মৃত ব্যাটারি'}
              </span>
              <div className="text-2xl sm:text-3xl font-black font-mono text-white tracking-tight">
                {impactStats.batteriesCollected.toLocaleString()}+
              </div>
              <span className="text-[11px] text-emerald-400 font-medium">
                {language === 'en' ? 'Zero backyard dumping' : 'পরিবেশ দূষণ রোধ'}
              </span>
            </div>

            <div className="bg-zinc-900/90 p-5 rounded-2xl border border-zinc-800/80 shadow-lg">
              <span className="text-xs text-zinc-400 block mb-1">
                {language === 'en' ? 'Refined Lead Recovered' : 'নিষ্কাশিত বিশুদ্ধ সিসা'}
              </span>
              <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-400 tracking-tight">
                {impactStats.leadRecoveredMT.toLocaleString()} <span className="text-sm font-sans text-zinc-400">MT</span>
              </div>
              <span className="text-[11px] text-zinc-400 font-mono">99.97% LME Purity</span>
            </div>

            <div className="bg-zinc-900/90 p-5 rounded-2xl border border-zinc-800/80 shadow-lg">
              <span className="text-xs text-zinc-400 block mb-1">
                {language === 'en' ? 'Active Garage Partners' : 'নিবন্ধিত গ্যারেজ পার্টনার'}
              </span>
              <div className="text-2xl sm:text-3xl font-black font-mono text-white tracking-tight">
                {impactStats.activeGarages.toLocaleString()}+
              </div>
              <span className="text-[11px] text-emerald-400 font-medium">
                {language === 'en' ? 'Dhaka, Tongi, Narayanganj' : 'ঢাকা, টঙ্গী, নারায়ণগঞ্জ'}
              </span>
            </div>

            <div className="bg-zinc-900/90 p-5 rounded-2xl border border-zinc-800/80 shadow-lg">
              <span className="text-xs text-zinc-400 block mb-1">
                {language === 'en' ? 'Toxic Acid Neutralized' : 'নিষ্ক্রিয়কৃত সালফিউরিক অ্যাসিড'}
              </span>
              <div className="text-2xl sm:text-3xl font-black font-mono text-teal-400 tracking-tight">
                {(impactStats.acidNeutralizedLiters / 1000).toFixed(0)}k <span className="text-sm font-sans text-zinc-400">Liters</span>
              </div>
              <span className="text-[11px] text-zinc-400">100% neutralized to gypsum</span>
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

      {/* THE PROBLEM SNAPSHOT TEASER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-zinc-900 to-zinc-950 text-white rounded-3xl p-8 sm:p-12 border border-zinc-800 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-2xl">
          <div className="lg:col-span-8 space-y-4">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
              {language === 'en' ? 'The Bangladesh Battery Crisis' : 'বাংলাদেশের ব্যাটারি সংকট'}
            </span>
            <h3 className="text-2xl sm:text-3xl font-black font-heading text-white">
              {language === 'en'
                ? 'Over 4 Million E-Rickshaws. 35,000+ Tons of Toxic Lead Leaking Annually.'
                : '৪০ লাখের বেশি ই-রিকশা। প্রতি বছর ৩৫,০০০ টন বিষাক্ত সিসা উন্মুক্ত স্থানে ছড়াচ্ছে।'}
            </h3>
            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
              {language === 'en'
                ? 'Without formal collection, 80%+ of depleted easy-bike batteries end up in unregulated informal backyard smelting pots, poisoning groundwater and causing irreversible neurotoxic damage. VoltLoop transforms this crisis into a sustainable, profitable circular commodity loop.'
                : 'যথাযথ ব্যবস্থাপনার অভাবে শতকরা ৮০ ভাগ ব্যাটারি অনিবন্ধিত খোলা ভাট্টিতে পোড়ানো হয়, যা মাটি ও পানিকে বিষাক্ত করছে। ভোল্টলুপ এই সংকটকে নিরাপদ অর্থনৈতিক মডেলে রূপান্তর করছে।'}
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onNavigate('problem')}
                className="inline-flex items-center gap-2 text-sm font-bold text-emerald-400 hover:text-emerald-300 cursor-pointer"
              >
                <span>{language === 'en' ? 'Explore Data & Research Report' : 'পূর্ণ ডাটা রিপোর্ট দেখুন'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-4 bg-zinc-800/80 p-6 rounded-2xl border border-zinc-700 space-y-4 shadow-lg">
            <div className="text-xs text-zinc-400 uppercase font-mono">{language === 'en' ? 'Scrap Middlemen vs VoltLoop' : 'দালাল বনাম ভোল্টলুপ'}</div>
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-zinc-700">
                <span className="text-zinc-300">{language === 'en' ? 'Garage Payout:' : 'গ্যারেজ মূল্য:'}</span>
                <span className="font-bold text-emerald-400">৳3,400+ (VoltLoop) vs ৳2,800 (Scrap)</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-zinc-700">
                <span className="text-zinc-300">{language === 'en' ? 'Acid Handling:' : 'অ্যাসিড সুরক্ষা:'}</span>
                <span className="font-bold text-emerald-400">100% Sealed Neutralization</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-300">{language === 'en' ? 'Weighing Precision:' : 'ওজন নির্ভরযোগ্যতা:'}</span>
                <span className="font-bold text-white">Digital Calibrated Scale</span>
              </div>
            </div>
            <button
              onClick={onOpenSellModal}
              className="w-full py-3 rounded-xl bg-[#15803D] hover:bg-[#166534] text-white text-xs font-bold transition-all cursor-pointer shadow-md hover:scale-[1.02]"
            >
              {language === 'en' ? 'Sell Your Batch' : 'ব্যাটারি বিক্রি করুন'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
