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
  Users
} from 'lucide-react';
import { ImpactStats, Language, PageView } from '../types';
import { BATTERY_TYPES } from '../data/mockData';

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
    <div className="space-y-20 pb-20 overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative pt-8 sm:pt-14 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Subtle background radial glow in VoltLoop green */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Mission & Main CTA */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-300/80 text-[#15803D] text-xs sm:text-sm font-bold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#15803D] animate-ping" />
              <span>{language === 'en' ? '"Every dead battery, given a second Volt."' : '"প্রতিটি মৃত ব্যাটারির নতুন ভোল্ট জীবন।"'}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-heading text-zinc-900 tracking-tight leading-[1.1]">
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
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                id="hero-sell-battery-btn"
                onClick={onOpenSellModal}
                className="px-8 py-4 rounded-xl bg-[#15803D] hover:bg-[#166534] active:scale-98 text-white font-extrabold text-base shadow-lg shadow-emerald-900/10 flex items-center justify-center gap-3 transition-all cursor-pointer group"
              >
                <Zap className="w-5 h-5 fill-emerald-200 text-emerald-200" />
                <span>{language === 'en' ? 'Sell Your Dead Battery' : 'মৃত ব্যাটারি বিক্রি করুন'}</span>
                <ArrowRight className="w-5 h-5 text-emerald-200 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="hero-track-btn"
                onClick={() => onNavigate('track')}
                className="px-6 py-4 rounded-xl bg-white hover:bg-zinc-50 border border-zinc-300 text-zinc-800 font-bold text-base shadow-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Search className="w-4 h-4 text-zinc-500" />
                <span>{language === 'en' ? 'Track Existing Pickup' : 'পিকআপ ট্র্যাক করুন'}</span>
              </button>
            </div>

            {/* Trust highlights directly beside / under CTA */}
            <div className="pt-4 border-t border-zinc-200 grid grid-cols-3 gap-3 text-xs">
              <div className="flex items-center gap-2 text-zinc-700">
                <ShieldCheck className="w-4 h-4 text-[#15803D] shrink-0" />
                <span className="font-semibold">{language === 'en' ? '+15-20% Top Price' : '১৫-২০% বেশি দাম'}</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-700">
                <Truck className="w-4 h-4 text-[#15803D] shrink-0" />
                <span className="font-semibold">{language === 'en' ? 'Free EV Pickup' : 'ফ্রি ডোরস্টেপ পিকআপ'}</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-700">
                <Coins className="w-4 h-4 text-[#15803D] shrink-0" />
                <span className="font-semibold">{language === 'en' ? 'Instant bKash Pay' : 'তাৎক্ষণিক বিকাশ পেমেন্ট'}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Live Interactive Instant Payout Calculator Widget */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-zinc-200 shadow-xl space-y-5 relative">
              <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-[#15803D]">
                    <Calculator className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-zinc-900">
                      {language === 'en' ? 'Live Garage Payout Estimator' : 'লাইভ গ্যারেজ মূল্য ক্যালকুলেটর'}
                    </h3>
                    <p className="text-[11px] text-zinc-400">
                      {language === 'en' ? 'Dhaka wholesale scrap index' : 'ঢাকা পাইকারি স্ক্র্যাপ মূল্য'}
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-mono font-bold bg-emerald-50 text-[#15803D] px-2 py-0.5 rounded border border-emerald-200">
                  August 2026 Rate
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
                  className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-300 focus:border-[#15803D] font-medium text-zinc-900 bg-zinc-50"
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
                  <span className="font-mono font-bold text-base text-[#15803D]">{calcQty} Units</span>
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
              <div className="bg-[#0B150F] text-white rounded-2xl p-4.5 space-y-2 border border-emerald-950">
                <span className="text-[11px] text-emerald-400 uppercase tracking-wider block font-mono">
                  {language === 'en' ? 'Total Guaranteed Payout' : 'সর্বমোট প্রদেয় মূল্য'}
                </span>
                <div className="text-3xl font-black font-mono text-white tracking-tight">
                  ৳{calcEstimatedBDT.toLocaleString()} <span className="text-xs font-sans text-emerald-300">BDT</span>
                </div>
                <div className="text-xs text-emerald-400 flex items-center gap-1 font-semibold pt-1 border-t border-zinc-800">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>
                    +৳{calcGainBDT.toLocaleString()} {language === 'en' ? 'more than informal dealers' : 'টাকা বাড়তি লাভ'}
                  </span>
                </div>
              </div>

              {/* Action */}
              <button
                onClick={onOpenSellModal}
                className="w-full py-3 rounded-xl bg-[#15803D] hover:bg-[#166534] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
              >
                <span>{language === 'en' ? 'Schedule Pickup For This Batch' : 'এই ব্যাচের পিকআপ বুক করুন'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* IMPACT SNAPSHOT TICKER BAR */}
      <section className="bg-[#0B150F] text-white py-10 px-4 sm:px-6 lg:px-8 border-y border-emerald-950">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              {language === 'en' ? 'Verified Environmental Impact Snapshot' : 'লাইভ সার্কুলার অর্থনীতি মেট্রিকস'}
            </span>
            <span className="text-xs text-zinc-400 font-mono">
              {language === 'en' ? 'ISO 14001 & Basel Convention Compliant' : 'আইএসও ১৪০০১ মান অনুযায়ী প্রত্যয়িত'}
            </span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-zinc-900/80 p-5 rounded-2xl border border-zinc-800">
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

            <div className="bg-zinc-900/80 p-5 rounded-2xl border border-zinc-800">
              <span className="text-xs text-zinc-400 block mb-1">
                {language === 'en' ? 'Refined Lead Recovered' : 'নিষ্কাশিত বিশুদ্ধ সিসা'}
              </span>
              <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-400 tracking-tight">
                {impactStats.leadRecoveredMT.toLocaleString()} <span className="text-sm font-sans text-zinc-400">MT</span>
              </div>
              <span className="text-[11px] text-zinc-400 font-mono">99.97% LME Purity</span>
            </div>

            <div className="bg-zinc-900/80 p-5 rounded-2xl border border-zinc-800">
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

            <div className="bg-zinc-900/80 p-5 rounded-2xl border border-zinc-800">
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

      {/* 4-STEP CIRCULAR LOOP VISUAL (Garage -> Collection -> Processing -> Manufacturer) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-[#15803D] text-xs font-bold uppercase tracking-wider">
            <Recycle className="w-3.5 h-3.5" />
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
          <div className="bg-white rounded-2xl p-6 border border-zinc-200 shadow-sm relative group hover:border-emerald-500 transition-all">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-[#15803D] flex items-center justify-center font-black text-xl mb-4">
              01
            </div>
            <h3 className="text-lg font-bold text-zinc-900 mb-2">
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
          <div className="bg-white rounded-2xl p-6 border border-zinc-200 shadow-sm relative group hover:border-emerald-500 transition-all">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-black text-xl mb-4">
              02
            </div>
            <h3 className="text-lg font-bold text-zinc-900 mb-2">
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
          <div className="bg-white rounded-2xl p-6 border border-zinc-200 shadow-sm relative group hover:border-emerald-500 transition-all">
            <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-black text-xl mb-4">
              03
            </div>
            <h3 className="text-lg font-bold text-zinc-900 mb-2">
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
          <div className="bg-white rounded-2xl p-6 border border-zinc-200 shadow-sm relative group hover:border-emerald-500 transition-all">
            <div className="w-12 h-12 rounded-xl bg-emerald-900 text-white flex items-center justify-center font-black text-xl mb-4">
              04
            </div>
            <h3 className="text-lg font-bold text-zinc-900 mb-2">
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
        <div className="bg-gradient-to-r from-zinc-900 to-zinc-950 text-white rounded-3xl p-8 sm:p-12 border border-zinc-800 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
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

          <div className="lg:col-span-4 bg-zinc-800/80 p-6 rounded-2xl border border-zinc-700 space-y-4">
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
              className="w-full py-2.5 rounded-xl bg-[#15803D] hover:bg-[#166534] text-white text-xs font-bold transition-colors cursor-pointer"
            >
              {language === 'en' ? 'Sell Your Batch' : 'ব্যাটারি বিক্রি করুন'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
