import React, { useState } from 'react';
import { 
  AlertTriangle, 
  TrendingUp, 
  Skull, 
  Droplet, 
  Activity, 
  CheckCircle, 
  XCircle, 
  ShieldAlert, 
  Flame, 
  ArrowRight,
  Zap,
  Info,
  ShieldCheck,
  Factory,
  BarChart2,
  Wind,
  Layers,
  HeartPulse
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from 'recharts';
import { Language } from '../types';

interface TheProblemViewProps {
  onOpenSellModal: () => void;
  language: Language;
}

export const TheProblemView: React.FC<TheProblemViewProps> = ({
  onOpenSellModal,
  language,
}) => {
  const [selectedYear, setSelectedYear] = useState<number>(2026);

  const projectionData = [
    { year: 2020, fleet: '1.8M', churnBatteries: '7.2M', toxicLeadMT: '108,000 MT', informalShare: '88%', informalLead: 95, formalLead: 13 },
    { year: 2022, fleet: '2.6M', churnBatteries: '10.4M', toxicLeadMT: '156,000 MT', informalShare: '85%', informalLead: 132, formalLead: 24 },
    { year: 2024, fleet: '3.5M', churnBatteries: '14.0M', toxicLeadMT: '210,000 MT', informalShare: '81%', informalLead: 170, formalLead: 40 },
    { year: 2026, fleet: '4.2M', churnBatteries: '17.6M', toxicLeadMT: '264,000 MT', informalShare: '76%', informalLead: 200, formalLead: 64 },
    { year: 2028, fleet: '5.1M', churnBatteries: '21.4M', toxicLeadMT: '321,000 MT', informalShare: '55% (Targeted)', informalLead: 176, formalLead: 145 },
  ];

  const currentYearData = projectionData.find((p) => p.year === selectedYear) || projectionData[3];

  return (
    <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16 animate-in fade-in duration-300">
      {/* Header Banner - BIG BOLD GRAPHIC HERO */}
      <div className="max-w-4xl mx-auto text-center space-y-5">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-100 border-2 border-red-300 text-red-800 text-xs sm:text-sm font-bold uppercase tracking-wider shadow-xs">
          <AlertTriangle className="w-5 h-5 text-red-600 animate-bounce" />
          <span>{language === 'en' ? 'The Informal Recycling Crisis in Bangladesh' : 'অনানুষ্ঠানিক সিসা পুনর্ব্যবহারের ভয়াবহ সংকট'}</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-heading text-zinc-900 tracking-tight leading-[1.1]">
          {language === 'en'
            ? "4 Million E-Rickshaws. A 260,000-Ton Toxic Lead Shadow."
            : '৪০ লাখ ই-রিকশা ও ২,৬০,০০০ টন বিষাক্ত সিসার সংকট'}
        </h1>

        <p className="text-lg sm:text-xl text-zinc-700 leading-relaxed font-medium">
          {language === 'en'
            ? "Bangladesh's electric 3-wheeler (easy-bike) revolution has created green mobility — but open-air backyard lead smelting is releasing thousands of tons of neurotoxic heavy metals into residential communities."
            : 'সহজলভ্য ই-রিকশা বিপ্লব শহুরে যোগাযোগে স্বস্তি এনে দিলেও অনিবন্ধিত খোলা ভাট্টিতে ব্যাটারি গলানোর ফলে সৃষ্টি হয়েছে ভয়াবহ পরিবেশগত ও স্বাস্থ্য ঝুঁকি।'}
        </p>
      </div>

      {/* 4 GRAPHICAL HAZARD GAUGES WITH LARGE METRICS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Metric 1 */}
        <div className="bg-gradient-to-br from-red-50 to-white rounded-3xl p-6 border-2 border-red-200 shadow-md space-y-3 relative overflow-hidden group hover:border-red-400 transition-all">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-2xl bg-red-600 text-white flex items-center justify-center shadow-md">
              <Flame className="w-6 h-6" />
            </div>
            <span className="text-xs font-mono font-bold uppercase px-2.5 py-1 rounded-full bg-red-100 text-red-700">Air Crisis</span>
          </div>
          <span className="text-3xl sm:text-4xl font-black font-mono text-red-950 block tracking-tight">
            &gt;65 µg/dL
          </span>
          <h3 className="font-bold text-zinc-900 text-base">
            {language === 'en' ? 'Worker Blood Lead Levels' : 'শ্রমিকদের রক্তে সিসার মাত্রা'}
          </h3>
          <p className="text-xs text-zinc-600 leading-relaxed">
            {language === 'en' ? 'Informal smelters operate open charcoal furnaces with zero baghouse filtration.' : 'খোলা কয়লার আগুনে গলানোর ফলে বাতাসে মারাত্মক বিষাক্ত ধোঁয়া ছড়ায়।'}
          </p>
        </div>

        {/* Metric 2 */}
        <div className="bg-gradient-to-br from-amber-50 to-white rounded-3xl p-6 border-2 border-amber-200 shadow-md space-y-3 relative overflow-hidden group hover:border-amber-400 transition-all">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-md">
              <Droplet className="w-6 h-6" />
            </div>
            <span className="text-xs font-mono font-bold uppercase px-2.5 py-1 rounded-full bg-amber-100 text-amber-800">Water Crisis</span>
          </div>
          <span className="text-3xl sm:text-4xl font-black font-mono text-amber-950 block tracking-tight">
            35M+ Liters
          </span>
          <h3 className="font-bold text-zinc-900 text-base">
            {language === 'en' ? 'Raw Acid Dumped Annually' : 'বার্ষিক খোলা ড্রেনে অ্যাসিড বর্জ্য'}
          </h3>
          <p className="text-xs text-zinc-600 leading-relaxed">
            {language === 'en' ? 'Sulfuric acid electrolyte poured untreated into soil and Buriganga/Turag canals.' : 'লাখ লাখ লিটার অ্যাসিড মাটি ও নদী-নালায় ফেলা হচ্ছে।'}
          </p>
        </div>

        {/* Metric 3 */}
        <div className="bg-gradient-to-br from-purple-50 to-white rounded-3xl p-6 border-2 border-purple-200 shadow-md space-y-3 relative overflow-hidden group hover:border-purple-400 transition-all">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-2xl bg-purple-600 text-white flex items-center justify-center shadow-md">
              <HeartPulse className="w-6 h-6" />
            </div>
            <span className="text-xs font-mono font-bold uppercase px-2.5 py-1 rounded-full bg-purple-100 text-purple-800">Child Health</span>
          </div>
          <span className="text-3xl sm:text-4xl font-black font-mono text-purple-950 block tracking-tight">
            3.6 Million
          </span>
          <h3 className="font-bold text-zinc-900 text-base">
            {language === 'en' ? 'Children at Neurological Risk' : 'শিশুদের স্নায়বিক ও মেধা ক্ষতি'}
          </h3>
          <p className="text-xs text-zinc-600 leading-relaxed">
            {language === 'en' ? 'Lead dust in crop soil causes irreversible IQ deficit and developmental stunt.' : 'সিসা মিশ্রিত ধুলাবালি শিশুদের মস্তিষ্কের বিকাশ চিরতরে ক্ষতিগ্রস্ত করে।'}
          </p>
        </div>

        {/* Metric 4 */}
        <div className="bg-gradient-to-br from-zinc-50 to-white rounded-3xl p-6 border-2 border-zinc-300 shadow-md space-y-3 relative overflow-hidden group hover:border-zinc-500 transition-all">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-2xl bg-zinc-900 text-white flex items-center justify-center shadow-md">
              <TrendingUp className="w-6 h-6" />
            </div>
            <span className="text-xs font-mono font-bold uppercase px-2.5 py-1 rounded-full bg-zinc-200 text-zinc-800">Economic Loss</span>
          </div>
          <span className="text-3xl sm:text-4xl font-black font-mono text-zinc-950 block tracking-tight">
            $16 Billion
          </span>
          <h3 className="font-bold text-zinc-900 text-base">
            {language === 'en' ? 'Annual Bangladesh GDP Drain' : 'জাতীয় অর্থনীতির ক্ষতি/বছর'}
          </h3>
          <p className="text-xs text-zinc-600 leading-relaxed">
            {language === 'en' ? 'Healthcare expenses and lost adult cognitive productivity from chronic exposure.' : 'চিকিৎসা ব্যয় ও মেধার স্থায়ী ক্ষতির ফলে জাতীয় অর্থনীতি ক্ষতিগ্রস্ত।'}
          </p>
        </div>
      </div>

      {/* INTERACTIVE DATA VISUALIZATION: BAR CHART FOR CHURN & INFORMAL POLLUTION */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-zinc-200 shadow-xl space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-200 pb-6">
          <div>
            <span className="text-xs font-mono font-bold text-[#15803D] uppercase tracking-wider">
              {language === 'en' ? 'Historical & Projected Modeling' : 'ডাটা গ্রাফ ও পূর্বাভাস'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black font-heading text-zinc-900">
              {language === 'en' ? 'Informal Smelting vs. VoltLoop Certified Recovery (k MT)' : 'অনানুষ্ঠানিক দূষণ বনাম ভোল্টলুপ সার্কুলার রূপান্তর'}
            </h2>
          </div>

          <div className="flex items-center gap-1.5 bg-zinc-100 p-1.5 rounded-2xl border border-zinc-200">
            {projectionData.map((d) => (
              <button
                key={d.year}
                onClick={() => setSelectedYear(d.year)}
                className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                  selectedYear === d.year
                    ? 'bg-[#107C2B] text-white shadow-md'
                    : 'text-zinc-700 hover:bg-zinc-200'
                }`}
              >
                {d.year}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Year Key Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-zinc-50 p-5 rounded-2xl border border-zinc-200">
            <span className="text-xs text-zinc-500 font-bold block mb-1">{language === 'en' ? 'Active E-Rickshaws' : 'সক্রিয় ই-রিকশা'}</span>
            <span className="text-3xl font-black font-mono text-zinc-900">{currentYearData.fleet}</span>
            <span className="text-xs text-zinc-500 block mt-1">4-5 batteries / vehicle</span>
          </div>

          <div className="bg-amber-50 p-5 rounded-2xl border border-amber-200">
            <span className="text-xs text-amber-800 font-bold block mb-1">{language === 'en' ? 'Batteries Scrapped/Yr' : 'বার্ষিক বাতিল ব্যাটারি'}</span>
            <span className="text-3xl font-black font-mono text-amber-950">{currentYearData.churnBatteries}</span>
            <span className="text-xs text-amber-700 block mt-1">Avg life: 8-10 months</span>
          </div>

          <div className="bg-red-50 p-5 rounded-2xl border border-red-200">
            <span className="text-xs text-red-800 font-bold block mb-1">{language === 'en' ? 'Total Toxic Lead Mass' : 'মোট সিসা বর্জ্য ভর'}</span>
            <span className="text-3xl font-black font-mono text-red-950">{currentYearData.toxicLeadMT}</span>
            <span className="text-xs text-red-700 block mt-1">Hazardous lead inventory</span>
          </div>

          <div className="bg-emerald-50 p-5 rounded-2xl border border-emerald-200">
            <span className="text-xs text-emerald-800 font-bold block mb-1">{language === 'en' ? 'Informal Market Share' : 'অনানুষ্ঠানিক বাজারের অংশ'}</span>
            <span className="text-3xl font-black font-mono text-emerald-950">{currentYearData.informalShare}</span>
            <span className="text-xs text-emerald-700 block mt-1">Transitioning to VoltLoop</span>
          </div>
        </div>

        {/* Visual Recharts Bar Chart */}
        <div className="h-80 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={projectionData}
              margin={{ top: 10, right: 20, left: -10, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="year" stroke="#64748b" fontSize={13} fontWeight="bold" />
              <YAxis stroke="#64748b" fontSize={12} unit="k MT" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0A160E',
                  borderColor: '#107C2B',
                  borderRadius: '16px',
                  color: '#ffffff',
                  fontSize: '12px',
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.4)',
                }}
                formatter={(value: any, name: any) => [`${value},000 MT`, name]}
              />
              <Legend wrapperStyle={{ paddingTop: '16px', fontSize: '13px', fontWeight: 'bold' }} />
              <Bar dataKey="informalLead" name="Toxic Informal Smelting & Leakage (k MT)" fill="#DC2626" radius={[6, 6, 0, 0]} />
              <Bar dataKey="formalLead" name="VoltLoop Certified Clean Recovery (k MT)" fill="#107C2B" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* GRAPHICAL COMPARISON MATRIX: INFORMAL DEALERS VS VOLTLOOP */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-zinc-200 shadow-xl space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-[#107C2B] text-xs font-mono font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>{language === 'en' ? 'Direct Operational Comparison' : 'পদ্ধতিগত পার্থক্য'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black font-heading text-zinc-900">
            {language === 'en' ? 'Informal Scrap Dealers vs. VoltLoop Certified Network' : 'দালাল নেটওয়ার্ক বনাম ভোল্টলুপ সার্কুলার সিস্টেম'}
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm sm:text-base">
            <thead>
              <tr className="border-b-2 border-zinc-300 bg-zinc-100">
                <th className="py-4 px-5 font-black text-zinc-800">Operational Dimension</th>
                <th className="py-4 px-5 font-black text-red-700 bg-red-100/60">Informal Middlemen & Smelters</th>
                <th className="py-4 px-5 font-black text-[#107C2B] bg-emerald-100/70">VoltLoop Closed-Loop Network</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200">
              <tr>
                <td className="py-4 px-5 font-bold text-zinc-900">Garage Unit Payout</td>
                <td className="py-4 px-5 text-zinc-600">Suppressed & fluctuating rates (~৳1,750 / unit)</td>
                <td className="py-4 px-5 font-black text-[#107C2B] bg-emerald-50/40">Guaranteed ৳2,150 / unit + instant mobile bKash</td>
              </tr>
              <tr>
                <td className="py-4 px-5 font-bold text-zinc-900">Weighing Precision</td>
                <td className="py-4 px-5 text-zinc-600">Rigged manual spring scales (shaves 15-20% weight)</td>
                <td className="py-4 px-5 font-bold text-zinc-900 bg-emerald-50/40">Bluetooth calibrated gate scales with printed digital slip</td>
              </tr>
              <tr>
                <td className="py-4 px-5 font-bold text-zinc-900">Acid Electrolyte</td>
                <td className="py-4 px-5 text-red-600 font-bold">Dumped untreated into soil, ponds, and storm drains</td>
                <td className="py-4 px-5 font-bold text-[#107C2B] bg-emerald-50/40">100% neutralized into commercial non-toxic gypsum</td>
              </tr>
              <tr>
                <td className="py-4 px-5 font-bold text-zinc-900">Smelting Technology</td>
                <td className="py-4 px-5 text-zinc-600">Open-pot charcoal kilns with zero filters</td>
                <td className="py-4 px-5 font-bold text-zinc-900 bg-emerald-50/40">Negative-pressure automated chambers + baghouse scrubbers</td>
              </tr>
              <tr>
                <td className="py-4 px-5 font-bold text-zinc-900">Refined Lead Purity</td>
                <td className="py-4 px-5 text-zinc-600">92-95% contaminated crude bullion</td>
                <td className="py-4 px-5 font-black text-[#107C2B] bg-emerald-50/40">99.97% LME Certified Pure Secondary Lead Ingots</td>
              </tr>
              <tr>
                <td className="py-4 px-5 font-bold text-zinc-900">Compliance & EPR</td>
                <td className="py-4 px-5 text-red-600 font-bold">Illegal, vulnerable to police & DoE crackdowns</td>
                <td className="py-4 px-5 font-bold text-emerald-800 bg-emerald-50/40">ISO 14001, DoE License, Full EPR & Scope-3 Certification</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="text-center pt-4">
          <button
            onClick={onOpenSellModal}
            className="px-8 py-4 rounded-2xl bg-[#107C2B] hover:bg-[#0d6423] text-white font-black text-base inline-flex items-center gap-3 shadow-xl transition-all hover:scale-105 cursor-pointer"
          >
            <Zap className="w-5 h-5 fill-white" />
            <span>{language === 'en' ? 'Switch to VoltLoop — Sell Your Dead Batteries at ৳2,150' : 'ভোল্টলুপে ব্যাটারি বিক্রি করুন — নিশ্চিত ৳২,১৫০ দর'}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  );
};
