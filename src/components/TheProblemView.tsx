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
  Info
} from 'lucide-react';
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
    { year: 2020, fleet: '1.8M', churnBatteries: '7.2M', toxicLeadMT: '108,000 MT', informalShare: '88%' },
    { year: 2022, fleet: '2.6M', churnBatteries: '10.4M', toxicLeadMT: '156,000 MT', informalShare: '85%' },
    { year: 2024, fleet: '3.5M', churnBatteries: '14.0M', toxicLeadMT: '210,000 MT', informalShare: '81%' },
    { year: 2026, fleet: '4.2M', churnBatteries: '17.6M', toxicLeadMT: '264,000 MT', informalShare: '76%' },
    { year: 2028, fleet: '5.1M', churnBatteries: '21.4M', toxicLeadMT: '321,000 MT', informalShare: '55% (Targeted)' },
  ];

  const currentYearData = projectionData.find((p) => p.year === selectedYear) || projectionData[3];

  return (
    <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="max-w-3xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200 text-red-700 text-xs font-bold uppercase tracking-wider">
          <AlertTriangle className="w-4 h-4 text-red-600" />
          <span>{language === 'en' ? 'The Informal Recycling Crisis in Bangladesh' : 'অনানুষ্ঠানিক সিসা পুনর্ব্যবহারের সংকট'}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-zinc-900 tracking-tight">
          {language === 'en'
            ? "4 Million E-Rickshaws. A 260,000-Ton Toxic Lead Shadow."
            : '৪০ লাখ ই-রিকশা ও ২,৬০,০০০ টন বিষাক্ত সিসার সংকট'}
        </h1>

        <p className="text-base sm:text-lg text-zinc-600 leading-relaxed">
          {language === 'en'
            ? "Bangladesh's booming electric 3-wheeler (easy-bike) revolution has created unprecedented green urban mobility — but it has also triggered a catastrophic hazardous waste epidemic due to unlicensed, open-air lead smelting."
            : 'সহজলভ্য ই-রিকশা বিপ্লব শহুরে যোগাযোগে স্বস্তি এনে দিলেও অনিবন্ধিত খোলা ভাট্টিতে ব্যাটারি গলানোর ফলে সৃষ্টি হয়েছে ভয়াবহ পরিবেশগত ও স্বাস্থ্য ঝুঁকি।'}
        </p>
      </div>

      {/* THREE HAZARD PILLARS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-zinc-200 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-xl bg-red-100 text-red-600 flex items-center justify-center">
            <Flame className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-zinc-900">
            {language === 'en' ? 'Backyard Open Smelting' : 'অনাবৃত চুলা ও মারাত্মক ধোঁয়া'}
          </h3>
          <p className="text-xs text-zinc-600 leading-relaxed">
            {language === 'en'
              ? 'Informal scrappers break battery casings with axes in residential backyards and melt lead plates over open charcoal fires without filters, venting neurotoxic lead fumes directly into the atmosphere.'
              : 'আবাসিক এলাকায় কুড়াল দিয়ে ব্যাটারি ভেঙে খোলা কয়লার আগুনে সিসা গলানো হয়, যা কোনো ফিল্টার ছাড়াই বিষাক্ত ধোঁয়া বাতাসে ছড়িয়ে দেয়।'}
          </p>
          <div className="pt-2 border-t border-zinc-100 text-[11px] font-semibold text-red-700">
            • {language === 'en' ? 'Extreme worker blood lead levels (>65 µg/dL)' : 'শ্রমিকদের রক্তে অতিরিক্ত সিসা'}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-zinc-200 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
            <Droplet className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-zinc-900">
            {language === 'en' ? 'Acid Dumping in Open Drains' : 'খোলা ড্রেনে অ্যাসিড ফেলা'}
          </h3>
          <p className="text-xs text-zinc-600 leading-relaxed">
            {language === 'en'
              ? 'Millions of liters of raw sulfuric acid electrolyte are dumped directly into soil, canals, and Buriganga/Turag tributaries without chemical neutralization, destroying arable topsoil and aquatic life.'
              : 'প্রতি বছর লাখ লাখ লিটার বিষাক্ত অ্যাসিড সরাসরি মাটি ও নদী-নালায় ফেলা হচ্ছে, যা ভূগর্ভস্থ পানি ও কৃষিজমিকে চিরতরে নষ্ট করছে।'}
          </p>
          <div className="pt-2 border-t border-zinc-100 text-[11px] font-semibold text-amber-800">
            • {language === 'en' ? 'Over 35M Liters raw acid dumped/yr' : 'বছরে ৩৫+ মিলিয়ন লিটার অ্যাসিড বর্জ্য'}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-zinc-200 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
            <Skull className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-zinc-900">
            {language === 'en' ? 'Child Cognitive Impairment' : 'শিশুদের স্নায়বিক ক্ষতি'}
          </h3>
          <p className="text-xs text-zinc-600 leading-relaxed">
            {language === 'en'
              ? 'Lead deposits in dust and crops near informal cluster zones (Zinjira, Demra, Tongi, Bogura) lead to irreversible IQ reduction, behavioral disorders, and developmental stunt in children.'
              : 'সিসা মিশ্রিত ধুলাবালি ও ফসলের কারণে শিশুদের মস্তিষ্কের বিকাশ বাধাগ্রস্ত হচ্ছে এবং বুদ্ধিমত্তা (IQ) স্থায়ীভাবে ক্ষতিগ্রস্ত হচ্ছে।'}
          </p>
          <div className="pt-2 border-t border-zinc-100 text-[11px] font-semibold text-purple-800">
            • {language === 'en' ? 'Estimated $16B annual GDP loss' : 'জাতীয় অর্থনীতিতে বিশাল ক্ষতি'}
          </div>
        </div>
      </div>

      {/* INTERACTIVE DATA VISUALIZATION: FLEET SIZE VS LEAD CHURN */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 border border-zinc-200 shadow-lg space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-200 pb-6">
          <div>
            <span className="text-xs font-mono font-bold text-[#15803D] uppercase tracking-wider">
              {language === 'en' ? 'Bangladesh Fleet & Churn Data' : 'ই-রিকশা ফ্লিট ও ব্যাটারি ডাটা মডেল'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black font-heading text-zinc-900">
              {language === 'en' ? 'E-Rickshaw Growth vs. Annual Dead Battery Churn' : 'ফ্লিট বৃদ্ধি বনাম বার্ষিক মৃত ব্যাটারির বিস্তার'}
            </h2>
          </div>

          <div className="flex items-center gap-1.5 bg-zinc-100 p-1 rounded-xl">
            {projectionData.map((d) => (
              <button
                key={d.year}
                onClick={() => setSelectedYear(d.year)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                  selectedYear === d.year
                    ? 'bg-[#15803D] text-white shadow-xs'
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
          <div className="bg-zinc-50 p-4.5 rounded-xl border border-zinc-200">
            <span className="text-xs text-zinc-500 block">{language === 'en' ? 'Active E-Rickshaws' : 'সক্রিয় ই-রিকশা'}</span>
            <span className="text-2xl font-black font-mono text-zinc-900">{currentYearData.fleet}</span>
            <span className="text-[11px] text-zinc-400 block">4-5 batteries / vehicle</span>
          </div>

          <div className="bg-amber-50/70 p-4.5 rounded-xl border border-amber-200">
            <span className="text-xs text-amber-800 block">{language === 'en' ? 'Batteries Scrapped/Yr' : 'বার্ষিক বাতিল ব্যাটারি'}</span>
            <span className="text-2xl font-black font-mono text-amber-950">{currentYearData.churnBatteries}</span>
            <span className="text-[11px] text-amber-700 block">Avg life: 8-10 months</span>
          </div>

          <div className="bg-red-50/70 p-4.5 rounded-xl border border-red-200">
            <span className="text-xs text-red-800 block">{language === 'en' ? 'Total Toxic Lead Mass' : 'মোট সিসা বর্জ্য ভর'}</span>
            <span className="text-2xl font-black font-mono text-red-950">{currentYearData.toxicLeadMT}</span>
            <span className="text-[11px] text-red-700 block">High smelting hazard</span>
          </div>

          <div className="bg-emerald-50/70 p-4.5 rounded-xl border border-emerald-200">
            <span className="text-xs text-emerald-800 block">{language === 'en' ? 'Informal Middlemen Share' : 'অনানুষ্ঠানিক বাজারের অংশ'}</span>
            <span className="text-2xl font-black font-mono text-emerald-950">{currentYearData.informalShare}</span>
            <span className="text-[11px] text-emerald-700 block">Targeting formal transition</span>
          </div>
        </div>

        {/* Visual Bar Comparison Chart */}
        <div className="space-y-4 pt-2">
          <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
            {language === 'en' ? 'Annual Battery Scrapping Volume (2020 - 2028 Projection in Millions of Units)' : 'বার্ষিক ব্যাটারি বাতিল হওয়ার তুলনামূলক গ্রাফ'}
          </h4>

          <div className="space-y-3">
            {projectionData.map((d) => {
              const numVal = parseFloat(d.churnBatteries);
              const maxVal = 22;
              const percent = (numVal / maxVal) * 100;
              const isSelected = d.year === selectedYear;

              return (
                <div key={d.year} className="space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span className={`font-bold ${isSelected ? 'text-[#15803D]' : 'text-zinc-700'}`}>
                      {d.year}: {d.fleet} Fleet
                    </span>
                    <span className="font-semibold text-zinc-900">{d.churnBatteries} Batteries ({d.toxicLeadMT})</span>
                  </div>
                  <div className="w-full bg-zinc-100 h-6 rounded-lg overflow-hidden flex">
                    <div
                      className={`h-full transition-all duration-500 rounded-lg flex items-center px-3 text-[10px] font-mono font-bold text-white ${
                        isSelected ? 'bg-[#15803D]' : 'bg-zinc-700'
                      }`}
                      style={{ width: `${percent}%` }}
                    >
                      {d.churnBatteries}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* COMPARISON MATRIX: INFORMAL DEALERS VS VOLTLOOP */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 border border-zinc-200 shadow-sm space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold font-mono text-[#15803D] uppercase tracking-wider">
            {language === 'en' ? 'Direct Operational Comparison' : 'পদ্ধতিগত পার্থক্য'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black font-heading text-zinc-900">
            {language === 'en' ? 'Informal Scrap Dealers vs. VoltLoop Certified Network' : 'দালাল নেটওয়ার্ক বনাম ভোল্টলুপ সার্কুলার সিস্টেম'}
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b-2 border-zinc-200 bg-zinc-50">
                <th className="py-3 px-4 font-bold text-zinc-700">Parameter</th>
                <th className="py-3 px-4 font-bold text-red-700 bg-red-50/50">Informal Middlemen & Smelters</th>
                <th className="py-3 px-4 font-bold text-[#15803D] bg-emerald-50/60">VoltLoop Closed-Loop Network</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200">
              <tr>
                <td className="py-3.5 px-4 font-semibold text-zinc-900">Garage Payout</td>
                <td className="py-3.5 px-4 text-zinc-600">Unregulated, suppressed pricing (৳2,800 - ৳3,000)</td>
                <td className="py-3.5 px-4 font-bold text-[#15803D] bg-emerald-50/30">Guaranteed wholesale rate (৳3,400 - ৳4,100+)</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-zinc-900">Weighing Method</td>
                <td className="py-3.5 px-4 text-zinc-600">Rigged manual spring scales, weight shaved by 15-20%</td>
                <td className="py-3.5 px-4 font-bold text-zinc-900 bg-emerald-50/30">Calibrated digital Bluetooth gate scale with instant receipt</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-zinc-900">Acid Electrolyte</td>
                <td className="py-3.5 px-4 text-red-600 font-medium">Dumped untreated into soil, ponds, and open storm drains</td>
                <td className="py-3.5 px-4 font-bold text-[#15803D] bg-emerald-50/30">100% neutralized with calcium carbonate into industrial gypsum</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-zinc-900">Smelting Technology</td>
                <td className="py-3.5 px-4 text-zinc-600">Open-pot charcoal kilns with zero filters</td>
                <td className="py-3.5 px-4 font-bold text-zinc-900 bg-emerald-50/30">Negative-pressure hydrometallurgical rotary furnaces + baghouse filters</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-zinc-900">Refined Lead Purity</td>
                <td className="py-3.5 px-4 text-zinc-600">92-95% contaminated crude bullion</td>
                <td className="py-3.5 px-4 font-bold text-[#15803D] bg-emerald-50/30">99.97% refined pure secondary lead (LME standard)</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-zinc-900">Regulatory Compliance</td>
                <td className="py-3.5 px-4 text-red-600 font-medium">Illegal, vulnerable to police & DoE crackdowns</td>
                <td className="py-3.5 px-4 font-bold text-emerald-800 bg-emerald-50/30">Full Extended Producer Responsibility (EPR) & ISO 14001 certified</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="text-center pt-4">
          <button
            onClick={onOpenSellModal}
            className="px-8 py-3.5 rounded-xl bg-[#15803D] hover:bg-[#166534] text-white font-bold text-sm inline-flex items-center gap-2 shadow-md transition-colors cursor-pointer"
          >
            <Zap className="w-4 h-4 fill-white" />
            <span>{language === 'en' ? 'Switch to VoltLoop — Sell Your Dead Batteries' : 'ভোল্টলুপে ব্যাটারি বিক্রি করে সর্বোচ্চ লাভ নিন'}</span>
          </button>
        </div>
      </section>
    </div>
  );
};
