import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Leaf, 
  Droplet, 
  Activity, 
  Download, 
  Search, 
  Filter, 
  FileCheck, 
  Award, 
  Calendar, 
  Zap,
  Globe,
  CheckCircle2,
  Lock,
  TrendingUp,
  BarChart3,
  PieChart as PieIcon
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { ImpactStats, Language, PublicLedgerEntry } from '../types';
import { 
  MONTHLY_RECOVERY_GROWTH, 
  DISTRICT_IMPACT_DATA, 
  MATERIAL_RECOVERY_COMPOSITION 
} from '../data/mockData';

interface ImpactTraceabilityViewProps {
  impactStats: ImpactStats;
  ledgerEntries: PublicLedgerEntry[];
  onOpenSellModal: () => void;
  language: Language;
}

export const ImpactTraceabilityView: React.FC<ImpactTraceabilityViewProps> = ({
  impactStats,
  ledgerEntries,
  onOpenSellModal,
  language,
}) => {
  const [districtFilter, setDistrictFilter] = useState('All');
  const [downloadedCert, setDownloadedCert] = useState(false);
  const [activeMetricTab, setActiveMetricTab] = useState<'lead' | 'batteries' | 'acid'>('lead');

  const districts = ['All', 'Dhaka North', 'Dhaka South', 'Dhaka Central', 'Gazipur', 'Narayanganj'];

  const filteredEntries = districtFilter === 'All'
    ? ledgerEntries
    : ledgerEntries.filter((e) => e.district.includes(districtFilter));

  const handleDownloadLedger = () => {
    setDownloadedCert(true);
    setTimeout(() => setDownloadedCert(false), 3000);
  };


  return (
    <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16 animate-in fade-in duration-300">
      {/* Header Section */}
      <div className="max-w-3xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-300 text-[#15803D] text-xs font-bold uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4" />
          <span>{language === 'en' ? 'Public ESG & Traceability Ledger' : 'উন্মুক্ত ট্রেসেবিলিটি ও পরিবেশগত প্রভাব লেজার'}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-zinc-900 tracking-tight">
          {language === 'en' ? 'Radical Transparency for Every Gram of Lead' : 'প্রতিটি গ্রাম সিসার শতভাগ স্বচ্ছ অডিট ও লেজার'}
        </h1>

        <p className="text-base sm:text-lg text-zinc-600 leading-relaxed">
          {language === 'en'
            ? 'We publish an anonymized live ledger of verified collections, hazardous acid neutralizations, and manufacturer secondary lead offtakes to ensure complete environmental integrity.'
            : 'ব্যক্তিগত গোপনীয়তা রক্ষা করে প্রতিটি ব্যাটারির সংগ্রহ, প্রক্রিয়াজাতকরণ এবং সিসা হস্তান্তরের রিয়েল-টাইম পাবলিক লেজার।'}
        </p>
      </div>

      {/* DASHBOARD-STYLE METRIC CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-zinc-200 shadow-sm space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs text-zinc-500 font-bold uppercase tracking-wider">
              {language === 'en' ? 'Total Diverted from Dumping' : 'ডাম্পিং রোধকৃত ব্যাটারি'}
            </span>
            <div className="w-9 h-9 rounded-lg bg-emerald-100 text-[#15803D] flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black font-mono text-zinc-900 tracking-tight">
            {impactStats.batteriesCollected.toLocaleString()}{' '}
            <span className="text-sm font-sans font-semibold text-zinc-500">Units</span>
          </div>
          <p className="text-xs text-emerald-700 font-medium">
            ✓ 100% collected via licensed zero-emission EV flatbeds
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-zinc-200 shadow-sm space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs text-zinc-500 font-bold uppercase tracking-wider">
              {language === 'en' ? 'Pure Secondary Lead Recovered' : 'নিষ্কাশিত বিশুদ্ধ সিসা'}
            </span>
            <div className="w-9 h-9 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center">
              <Activity className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black font-mono text-zinc-900 tracking-tight">
            {impactStats.leadRecoveredMT.toLocaleString()}{' '}
            <span className="text-sm font-sans font-semibold text-zinc-500">Metric Tons</span>
          </div>
          <p className="text-xs text-teal-700 font-medium">
            ✓ 99.97% LME purity supplied to battery makers
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-zinc-200 shadow-sm space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs text-zinc-500 font-bold uppercase tracking-wider">
              {language === 'en' ? 'Sulfuric Acid Neutralized' : 'নিষ্ক্রিয়কৃত সালফিউরিক অ্যাসিড'}
            </span>
            <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
              <Droplet className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black font-mono text-zinc-900 tracking-tight">
            {impactStats.acidNeutralizedLiters.toLocaleString()}{' '}
            <span className="text-sm font-sans font-semibold text-zinc-500">Liters</span>
          </div>
          <p className="text-xs text-blue-700 font-medium">
            ✓ Converted to neutral non-hazardous calcium sulfate
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-zinc-200 shadow-sm space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs text-zinc-500 font-bold uppercase tracking-wider">
              {language === 'en' ? 'Urban Soil Area Protected' : 'সুরক্ষিত মাটির আয়তন'}
            </span>
            <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
              <Globe className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black font-mono text-zinc-900 tracking-tight">
            {(impactStats.soilProtectedSqM / 1000).toFixed(0)}k{' '}
            <span className="text-sm font-sans font-semibold text-zinc-500">sq. meters</span>
          </div>
          <p className="text-xs text-amber-800 font-medium">
            ✓ Zero heavy-metal leaching into agricultural soil
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-zinc-200 shadow-sm space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs text-zinc-500 font-bold uppercase tracking-wider">
              {language === 'en' ? 'Carbon Emissions Avoided' : 'কার্বন নিঃসরণ হ্রাস'}
            </span>
            <div className="w-9 h-9 rounded-lg bg-emerald-100 text-[#15803D] flex items-center justify-center">
              <Leaf className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black font-mono text-zinc-900 tracking-tight">
            {impactStats.co2SavedMT.toLocaleString()}{' '}
            <span className="text-sm font-sans font-semibold text-zinc-500">tCO₂e</span>
          </div>
          <p className="text-xs text-emerald-700 font-medium">
            ✓ Compared to virgin lead ore mining & refining
          </p>
        </div>

        <div className="bg-[#0B150F] text-white rounded-2xl p-6 border border-emerald-950 shadow-sm space-y-3 flex flex-col justify-between">
          <div>
            <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider block mb-1">
              ESG Compliance Certificate
            </span>
            <h4 className="text-base font-bold text-white">
              {language === 'en' ? 'Download Traceability Report' : 'সার্টিফাইড অডিট রিপোর্ট'}
            </h4>
            <p className="text-xs text-zinc-400 mt-1">
              Verified by ISO 14001 and Bangladesh Department of Environment.
            </p>
          </div>

          <button
            onClick={handleDownloadLedger}
            className="w-full py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>{downloadedCert ? 'Certificate Generated!' : 'Download Official ESG Ledger (PDF)'}</span>
          </button>
        </div>
      </div>

      {/* INTERACTIVE DATA VISUALIZATIONS & CHARTS */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-[#15803D]" />
              <h2 className="text-2xl sm:text-3xl font-black font-heading text-zinc-900">
                {language === 'en' ? 'Environmental Recovery Analytics' : 'লাইভ রিকভারি ও ইমপ্যাক্ট গ্রাফ'}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-zinc-500 mt-1">
              {language === 'en' ? 'Real-time telemetry and aggregated yield curves verified through IoT scales and laboratory assays.' : 'আইওটি স্কেল ও ল্যাব টেস্টের ভিত্তিতে স্বয়ংক্রিয়ভাবে আপডেট হওয়া রিসাইক্লিং মেট্রিকস।'}
            </p>
          </div>

          {/* Metric Toggle */}
          <div className="flex items-center bg-zinc-100 p-1 rounded-xl border border-zinc-200 self-start sm:self-auto">
            <button
              onClick={() => setActiveMetricTab('lead')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeMetricTab === 'lead'
                  ? 'bg-white text-zinc-900 shadow-xs'
                  : 'text-zinc-500 hover:text-zinc-800'
              }`}
            >
              Pure Lead (MT)
            </button>
            <button
              onClick={() => setActiveMetricTab('batteries')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeMetricTab === 'batteries'
                  ? 'bg-white text-zinc-900 shadow-xs'
                  : 'text-zinc-500 hover:text-zinc-800'
              }`}
            >
              Diverted Units
            </button>
            <button
              onClick={() => setActiveMetricTab('acid')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeMetricTab === 'acid'
                  ? 'bg-white text-zinc-900 shadow-xs'
                  : 'text-zinc-500 hover:text-zinc-800'
              }`}
            >
              Acid Neutralized (kL)
            </button>
          </div>
        </div>

        {/* Chart Grid: Main Timeline Curve + Composition Donut */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Area Growth Chart (2 Cols) */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-7 border border-zinc-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800">
                  Monthly Trajectory
                </span>
                <h3 className="text-lg font-bold text-zinc-900">
                  {activeMetricTab === 'lead' && '99.97% Pure Secondary Lead Recovered (Metric Tons)'}
                  {activeMetricTab === 'batteries' && 'Dead Battery Units Collected from Garages'}
                  {activeMetricTab === 'acid' && 'Hazardous Sulfuric Acid Neutralized (kL)'}
                </h3>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-mono font-bold">
                +403% QoQ Growth
              </span>
            </div>

            <div className="h-72 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={MONTHLY_RECOVERY_GROWTH}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="leadGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#15803D" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#15803D" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="batteryGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0284C7" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#0284C7" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="acidGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis 
                    dataKey="month" 
                    stroke="#94a3b8" 
                    fontSize={11} 
                    tickLine={false} 
                    axisLine={{ stroke: '#e2e8f0' }}
                  />
                  <YAxis 
                    stroke="#94a3b8" 
                    fontSize={11} 
                    tickLine={false} 
                    axisLine={false}
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
                    labelStyle={{ color: '#86efac', fontWeight: 'bold' }}
                  />
                  {activeMetricTab === 'lead' && (
                    <Area
                      type="monotone"
                      dataKey="leadMT"
                      name="Lead Recovered (MT)"
                      stroke="#15803D"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#leadGrad)"
                    />
                  )}
                  {activeMetricTab === 'batteries' && (
                    <Area
                      type="monotone"
                      dataKey="batteries"
                      name="Batteries Diverted"
                      stroke="#0284C7"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#batteryGrad)"
                    />
                  )}
                  {activeMetricTab === 'acid' && (
                    <Area
                      type="monotone"
                      dataKey="acidKL"
                      name="Acid Neutralized (kL)"
                      stroke="#F59E0B"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#acidGrad)"
                    />
                  )}
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Donut Chart: Material Recovery Fraction */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-zinc-200 shadow-sm space-y-4 flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800">
                Circular Efficiency
              </span>
              <h3 className="text-lg font-bold text-zinc-900">
                Battery Material Recovery Yield
              </h3>
              <p className="text-xs text-zinc-500 mt-0.5">
                Zero landfill waste — 100% of inputs refined into industrial grade commodities.
              </p>
            </div>

            <div className="h-52 w-full relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={MATERIAL_RECOVERY_COMPOSITION}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {MATERIAL_RECOVERY_COMPOSITION.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0A160E',
                      borderColor: '#107c2b',
                      borderRadius: '8px',
                      color: '#ffffff',
                      fontSize: '11px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-black font-mono text-zinc-900">100%</span>
                <span className="text-[10px] uppercase font-bold text-emerald-700 tracking-wider">Recycled</span>
              </div>
            </div>

            <div className="space-y-1.5 pt-2 border-t border-zinc-100 text-xs">
              {MATERIAL_RECOVERY_COMPOSITION.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-[11px]">
                  <span className="flex items-center gap-1.5 text-zinc-600">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                    <span className="truncate max-w-[170px]">{item.name}</span>
                  </span>
                  <span className="font-mono font-bold text-zinc-900">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* District Breakdown Bar Chart */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800">
                Dhaka Regional Hub Analysis
              </span>
              <h3 className="text-lg font-bold text-zinc-900">
                Regional Collection Volume & Secondary Lead Output
              </h3>
            </div>
            <span className="text-xs text-zinc-500 font-mono">
              6 Operational Clusters Across Greater Dhaka
            </span>
          </div>

          <div className="h-64 w-full pt-3">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={DISTRICT_IMPACT_DATA}
                margin={{ top: 10, right: 10, left: -20, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis 
                  dataKey="district" 
                  stroke="#94a3b8" 
                  fontSize={11} 
                  tickLine={false} 
                  axisLine={{ stroke: '#e2e8f0' }}
                  angle={-10}
                  textAnchor="end"
                />
                <YAxis 
                  stroke="#94a3b8" 
                  fontSize={11} 
                  tickLine={false} 
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0A160E',
                    borderColor: '#107c2b',
                    borderRadius: '12px',
                    color: '#ffffff',
                    fontSize: '12px',
                  }}
                  cursor={{ fill: 'rgba(21, 128, 61, 0.05)' }}
                />
                <Bar 
                  dataKey="leadMT" 
                  name="Pure Lead Output (MT)" 
                  fill="#15803D" 
                  radius={[6, 6, 0, 0]} 
                />
                <Bar 
                  dataKey="acidKL" 
                  name="Acid Neutralized (kL)" 
                  fill="#0284C7" 
                  radius={[6, 6, 0, 0]} 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* PUBLIC ANONYMIZED LIVE COLLECTION LOG / LEDGER */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 border border-zinc-200 shadow-lg space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <h2 className="text-xl sm:text-2xl font-black font-heading text-zinc-900">
                {language === 'en' ? 'Public Anonymized Collection Ledger' : 'সর্বজনীন লাইভ কালেকশন লেজার'}
              </h2>
            </div>
            <p className="text-xs text-zinc-500 mt-0.5">
              {language === 'en' ? 'Live stream of verified battery handovers across Greater Dhaka depots' : 'ঢাকা মেট্রো অঞ্চলের সাম্প্রতিক সংগৃহীত ব্যাটারির অডিট স্ট্রিম'}
            </p>
          </div>

          {/* District Filter Chips */}
          <div className="flex flex-wrap items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-zinc-400 mr-1" />
            {districts.map((d) => (
              <button
                key={d}
                onClick={() => setDistrictFilter(d)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  districtFilter === d
                    ? 'bg-[#15803D] text-white shadow-xs'
                    : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Ledger Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-zinc-200 text-zinc-400 font-mono text-[11px] uppercase">
                <th className="py-3 px-4 font-semibold">Tracking Code</th>
                <th className="py-3 px-4 font-semibold">Location / District</th>
                <th className="py-3 px-4 font-semibold">Quantity</th>
                <th className="py-3 px-4 font-semibold">Secondary Lead (kg)</th>
                <th className="py-3 px-4 font-semibold">Offset Score</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 font-sans">
              {filteredEntries.map((entry) => (
                <tr key={entry.id} className="hover:bg-zinc-50/80 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-zinc-900 flex items-center gap-1.5">
                    <FileCheck className="w-3.5 h-3.5 text-[#15803D]" />
                    <span>{entry.trackingCode}</span>
                  </td>
                  <td className="py-3 px-4 text-zinc-700">
                    <span className="font-semibold block">{entry.thana}</span>
                    <span className="text-[11px] text-zinc-400">{entry.district}</span>
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-zinc-900">
                    {entry.quantity} Units
                  </td>
                  <td className="py-3 px-4 font-mono font-semibold text-emerald-800">
                    {entry.leadWeightKg} kg pure
                  </td>
                  <td className="py-3 px-4 text-xs font-mono text-zinc-600">
                    {entry.offsetScore}
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase font-mono bg-emerald-100 text-[#15803D]">
                      {entry.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono text-xs text-zinc-400">
                    {entry.timestamp}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-zinc-200 text-xs text-zinc-500">
          <span className="flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-zinc-400" />
            <span>Personal seller identity is cryptographically hashed to protect garage privacy.</span>
          </span>

          <button
            onClick={onOpenSellModal}
            className="text-[#15803D] font-bold hover:underline cursor-pointer"
          >
            Submit your battery to join the public ledger →
          </button>
        </div>
      </section>
    </div>
  );
};
