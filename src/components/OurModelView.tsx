import React, { useState } from 'react';
import { 
  CheckCircle2, 
  MapPin, 
  Truck, 
  Phone, 
  ShieldCheck, 
  Layers, 
  Cpu, 
  Factory, 
  Sparkles, 
  ArrowRight,
  Zap,
  Activity,
  Maximize2,
  BarChart3,
  TrendingUp,
  Award,
  Table as TableIcon,
  Flame,
  Droplets,
  Wind,
  Check,
  X,
  FileCheck2,
  Info
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend,
  Cell,
  ReferenceLine
} from 'recharts';
import { DHAKA_HUBS, HUB_CAPACITY_DATA, PURITY_BENCHMARK_DATA, BENCHMARK_CHART_METRICS } from '../data/mockData';
import { HubLocation, Language } from '../types';

interface OurModelViewProps {
  onOpenSellModal: () => void;
  language: Language;
}

export const OurModelView: React.FC<OurModelViewProps> = ({
  onOpenSellModal,
  language,
}) => {
  const [activeVoltCard, setActiveVoltCard] = useState<number>(0);
  const [selectedHub, setSelectedHub] = useState<HubLocation>(DHAKA_HUBS[0]);
  const [benchmarkViewMode, setBenchmarkViewMode] = useState<'all' | 'chart' | 'table'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const voltFramework = [

    {
      letter: 'V',
      word: 'Verify',
      wordBn: 'যাচাই ও সিরিয়ালাইজেশন',
      title: 'Digital Gate Serialization & Specific Gravity Testing',
      tagline: 'Precision weighing & IoT barcode tagging right at the garage door.',
      details: [
        'Each battery lot is tagged with tamper-evident QR code and entered into the national traceability ledger.',
        'Calibrated Bluetooth scales transmit true certified weight to the garage owner’s phone, eliminating scrap dealer scale manipulation.',
        'Battery electrolyte acidity and casing integrity are scanned to allocate the appropriate hazardous containment crate.',
      ],
      iconBg: 'bg-emerald-100 text-[#15803D]',
      metric: '100% Digital Scale Verified',
    },
    {
      letter: 'O',
      word: 'Optimize',
      wordBn: 'লজিস্টিকস অপটিমাইজেশন',
      title: 'AI Route-Clustered EV Flatbed Logistics',
      tagline: 'Zero tailpipe emissions and scheduled neighborhood pickups across Dhaka.',
      details: [
        'Dynamic dispatch algorithms aggregate garage requests across 6 Dhaka operational zones into efficient bulk pickup runs.',
        'Custom heavy-duty electric flatbed trucks capable of hauling up to 3.5 metric tons of batteries per trip with zero fossil fuel burn.',
        'Guaranteed pickup arrival within 3 hours for express calls, reducing garage clutter and acid leak hazards.',
      ],
      iconBg: 'bg-blue-100 text-blue-700',
      metric: '6 Strategic Dhaka Hubs',
    },
    {
      letter: 'L',
      word: 'Lock-down',
      wordBn: 'অ্যাসিড ও ঝুঁকি লকডাউন',
      title: 'Hermetically Sealed Cages & Acid Neutralization',
      tagline: 'OSHA & Basel-compliant spill containment and chemical safety.',
      details: [
        'Polyethylene acid-resistant cages with absorbent polymer lining ensure zero corrosive liquid touches roads or storm drains.',
        'Drivers and handling crew equipped with certified acid-proof aprons, nitrile heavy gloves, and eye respirators.',
        'Electrolyte is siphoned into sealed vacuum tanks and neutralized immediately with alkaline slurry into neutral calcium sulfate (gypsum).',
      ],
      iconBg: 'bg-amber-100 text-amber-800',
      metric: 'Zero-Spill Certified',
    },
    {
      letter: 'T',
      word: 'Transform',
      wordBn: 'খাঁটি রূপান্তর ও অফটেক',
      title: '99.97% Secondary Lead Refining & Manufacturer Offtake',
      tagline: 'Closed-loop supply agreements with Bangladesh’s leading battery manufacturers.',
      details: [
        'Automated mechanical breaker shears polypropylene casings from lead plates, washing and pelletizing plastic for 100% circular reuse.',
        'Rotary smelting furnaces with baghouse dust collectors capture 99.9% of particulate lead emissions.',
        'Refined 99.97% pure lead ingots are certified by BUET / ISO labs and delivered under binding offtake contracts to Rahimafrooz, Hamko, and Lucas.',
      ],
      iconBg: 'bg-emerald-900 text-white',
      metric: '99.97% LME Lead Purity',
    },
  ];

  return (
    <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-20 animate-in fade-in duration-300">
      {/* Header Section */}
      <div className="max-w-3xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-300 text-[#15803D] text-xs font-bold uppercase tracking-wider">
          <Layers className="w-4 h-4" />
          <span>{language === 'en' ? 'The Circular Architecture' : 'সার্কুলার অপারেটিং মডেল'}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-zinc-900 tracking-tight">
          {language === 'en' ? 'The VOLT Operating Framework' : 'ভোল্ট (VOLT) ফ্রেমওয়ার্ক ও ঢাকা নেটওয়ার্ক'}
        </h1>

        <p className="text-base sm:text-lg text-zinc-600 leading-relaxed">
          {language === 'en'
            ? 'A disciplined four-pillar industrial methodology that turns informal hazardous scrap into high-purity, traceable secondary lead ingots for Bangladesh battery manufacturing.'
            : 'চারটি শক্তিশালী স্তম্ভের সমন্বয়ে তৈরি আমাদের অপারেশনাল ফ্রেমওয়ার্ক যা ঝুঁকিপূর্ণ ব্যাটারি বর্জ্যকে উচ্চ মানের কাঁচামালে রূপান্তর করে।'}
        </p>
      </div>

      {/* THE VOLT INTERACTIVE FRAMEWORK CARDS */}
      <section className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {voltFramework.map((item, index) => {
            const isActive = activeVoltCard === index;
            return (
              <button
                key={item.letter}
                onClick={() => setActiveVoltCard(index)}
                className={`text-left p-6 rounded-2xl border transition-all cursor-pointer ${
                  isActive
                    ? 'bg-white border-[#15803D] shadow-lg ring-2 ring-emerald-500/20 scale-[1.02]'
                    : 'bg-zinc-50/80 border-zinc-200 hover:border-zinc-300 hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-2xl font-heading ${item.iconBg}`}>
                    {item.letter}
                  </div>
                  <span className="text-[11px] font-mono font-bold bg-zinc-100 text-zinc-700 px-2 py-0.5 rounded">
                    {item.metric}
                  </span>
                </div>

                <h3 className="text-lg font-black font-heading text-zinc-900">
                  {item.word} <span className="text-xs font-normal text-zinc-500 font-sans">({item.wordBn})</span>
                </h3>
                <p className="text-xs text-zinc-600 mt-1 line-clamp-2 leading-relaxed">
                  {item.tagline}
                </p>
              </button>
            );
          })}
        </div>

        {/* Expanded Active Card Deep Dive */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-zinc-200 shadow-lg space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-100 pb-5">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-xl ${voltFramework[activeVoltCard].iconBg}`}>
                {voltFramework[activeVoltCard].letter}
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-black font-heading text-zinc-900">
                  {voltFramework[activeVoltCard].word}: {voltFramework[activeVoltCard].title}
                </h3>
                <p className="text-xs text-zinc-500">{voltFramework[activeVoltCard].tagline}</p>
              </div>
            </div>
            <span className="px-3 py-1 bg-emerald-100 text-[#15803D] text-xs font-bold rounded-full">
              Pillar 0{activeVoltCard + 1} of 04
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {voltFramework[activeVoltCard].details.map((detail, dIdx) => (
              <div key={dIdx} className="bg-zinc-50 rounded-xl p-4.5 border border-zinc-200 text-xs text-zinc-700 space-y-2">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-[#15803D] flex items-center justify-center font-bold text-xs">
                  {dIdx + 1}
                </div>
                <p className="leading-relaxed">{detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INTERACTIVE DHAKA HUB-AND-SPOKE ZONE MAP */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 border border-zinc-200 shadow-lg space-y-8">
        <div className="max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-[#15803D] text-xs font-bold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'Metropolitan Infrastructure' : 'ঢাকা মেট্রো কালেকশন নেটওয়ার্ক'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-heading text-zinc-900">
            {language === 'en' ? 'Hub-and-Spoke Greater Dhaka Collection Map' : 'গ্রেটার ঢাকা কালেকশন হাব ও ডিপো'}
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600">
            {language === 'en'
              ? 'Our decentralized sorting hubs ensure that no garage in Dhaka, Tongi, or Narayanganj is further than 20 minutes away from an active VoltLoop collection unit.'
              : 'ঢাকার প্রতিটি প্রান্তে দ্রুত পিকআপ নিশ্চিত করতে আমাদের ৬টি সার্বক্ষণিক সর্টিং হাব ও ই-ফ্লিট ডিপো সক্রিয় রয়েছে।'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Interactive SVG Schematic Map */}
          <div className="lg:col-span-7 bg-[#0B150F] rounded-2xl p-6 border border-emerald-950 relative overflow-hidden min-h-[380px] flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-emerald-400 font-mono border-b border-emerald-900/60 pb-2">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                Live Metro Dispatch Active
              </span>
              <span>Grid: Dhaka Metro v2.6</span>
            </div>

            {/* SVG Schematic Canvas */}
            <div className="relative w-full h-64 my-auto">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {/* River paths (Buriganga & Turag outline schematics) */}
                <path
                  d="M 20,20 Q 30,50 35,70 T 70,88"
                  fill="none"
                  stroke="#164e33"
                  strokeWidth="2.5"
                  strokeDasharray="2 2"
                />
                <path
                  d="M 60,10 Q 65,40 50,70 T 85,95"
                  fill="none"
                  stroke="#164e33"
                  strokeWidth="2.5"
                  strokeDasharray="2 2"
                />

                {/* Connecting transit spokes between hubs */}
                {DHAKA_HUBS.map((hub, idx) => {
                  if (idx === 0) return null;
                  const central = DHAKA_HUBS[0];
                  return (
                    <line
                      key={hub.id}
                      x1={central.coordinates.xPercent}
                      y1={central.coordinates.yPercent}
                      x2={hub.coordinates.xPercent}
                      y2={hub.coordinates.yPercent}
                      stroke="#15803D"
                      strokeWidth="1.2"
                      strokeDasharray="3 3"
                      opacity="0.6"
                    />
                  );
                })}

                {/* Hub Pin Points */}
                {DHAKA_HUBS.map((hub) => {
                  const isSelected = selectedHub.id === hub.id;
                  const isCentral = hub.id === 'hub-tejgaon';

                  return (
                    <g
                      key={hub.id}
                      onClick={() => setSelectedHub(hub)}
                      className="cursor-pointer transition-transform hover:scale-125"
                    >
                      {/* Outer pulse ring */}
                      {isSelected && (
                        <circle
                          cx={hub.coordinates.xPercent}
                          cy={hub.coordinates.yPercent}
                          r="6"
                          fill="none"
                          stroke="#22C55E"
                          strokeWidth="1"
                          className="animate-ping"
                        />
                      )}

                      {/* Main Node */}
                      <circle
                        cx={hub.coordinates.xPercent}
                        cy={hub.coordinates.yPercent}
                        r={isCentral ? '4.5' : '3.5'}
                        fill={isSelected ? '#22C55E' : isCentral ? '#15803D' : '#34D399'}
                        stroke="#0B150F"
                        strokeWidth="1.5"
                      />

                      {/* Label */}
                      <text
                        x={hub.coordinates.xPercent}
                        y={hub.coordinates.yPercent - 5}
                        fontSize="3"
                        fill={isSelected ? '#FFFFFF' : '#9CA3AF'}
                        fontWeight={isSelected ? 'bold' : 'normal'}
                        textAnchor="middle"
                        fontFamily="sans-serif"
                      >
                        {hub.name.split(' ')[0]}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            <div className="text-[10px] text-zinc-400 font-mono text-center pt-2 border-t border-emerald-900/60 flex items-center justify-between">
              <span>● Tap any node to inspect depot capacity & logistics</span>
              <span className="text-emerald-400">Total Vans: 36 EV Flatbeds</span>
            </div>
          </div>

          {/* Selected Hub Details Panel */}
          <div className="lg:col-span-5 bg-zinc-50 rounded-2xl p-6 border border-zinc-200 space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold font-mono bg-emerald-100 text-[#15803D]">
                {selectedHub.status === 'active' ? 'Active Sorting Depot' : 'Expanding'}
              </span>
              <span className="text-xs text-zinc-500 font-mono">{selectedHub.district}</span>
            </div>

            <div>
              <h3 className="text-xl font-bold font-heading text-zinc-900">{selectedHub.name}</h3>
              <p className="text-xs text-[#15803D] font-medium">{selectedHub.zoneNameBn}</p>
            </div>

            <p className="text-xs text-zinc-600 flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#15803D] shrink-0 mt-0.5" />
              <span>{selectedHub.address}</span>
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-zinc-200">
              <div className="bg-white p-3 rounded-xl border border-zinc-200 text-xs">
                <span className="text-zinc-400 block text-[11px]">Active EV Fleet:</span>
                <span className="font-mono font-bold text-zinc-900 text-base">{selectedHub.activeVans} EV Trucks</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-zinc-200 text-xs">
                <span className="text-zinc-400 block text-[11px]">Daily Intake:</span>
                <span className="font-mono font-bold text-[#15803D] text-base">{selectedHub.dailyCapacityUnits} Units/Day</span>
              </div>
            </div>

            <div className="bg-white p-3.5 rounded-xl border border-zinc-200 text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-zinc-500">Depot Manager:</span>
                <span className="font-semibold text-zinc-900">{selectedHub.managerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Dispatch Hotline:</span>
                <a href={`tel:${selectedHub.contactPhone}`} className="font-mono font-bold text-[#15803D] hover:underline">
                  {selectedHub.contactPhone}
                </a>
              </div>
            </div>

            <button
              onClick={onOpenSellModal}
              className="w-full py-3 rounded-xl bg-[#15803D] hover:bg-[#166534] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 fill-white" />
              <span>{language === 'en' ? `Dispatch Pickup from ${selectedHub.name.split(' ')[0]}` : 'এই হাব থেকে পিকআপ বুক করুন'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* RECHARTS DATA VISUALIZATIONS: HUB THROUGHPUT */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-[#15803D]" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800">
                Logistics Telemetry
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black font-heading text-zinc-900 mt-1">
              Dhaka Depots Daily Throughput vs Processing Capacity
            </h3>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-mono font-bold self-start sm:self-auto">
            88% Average Network Utilization
          </span>
        </div>
        <p className="text-xs sm:text-sm text-zinc-500">
          Real-time daily battery units handling capacity vs active daily collections across Dhaka operational clusters.
        </p>

        <div className="h-64 w-full pt-3">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={HUB_CAPACITY_DATA}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis 
                dataKey="hub" 
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
                cursor={{ fill: 'rgba(21, 128, 61, 0.05)' }}
              />
              <Bar 
                dataKey="capacity" 
                name="Daily Design Capacity (Units)" 
                fill="#cbd5e1" 
                radius={[4, 4, 0, 0]} 
              />
              <Bar 
                dataKey="currentIntake" 
                name="Current Daily Intake (Units)" 
                fill="#15803D" 
                radius={[4, 4, 0, 0]} 
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* COMPREHENSIVE TECHNICAL BENCHMARK: VOLTLOOP HYDROMETALLURGY VS INFORMAL SMELTING */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 border border-zinc-200 shadow-xl space-y-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-zinc-200 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-[#15803D] text-xs font-bold font-mono uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" />
              <span>Laboratory Validated Assay & Technical Standards</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black font-heading text-zinc-900 tracking-tight">
              VoltLoop Hydrometallurgy vs Informal Smelting
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 max-w-3xl">
              Laboratory validated lead recovery, emission capture, and chemical containment standards comparing engineered closed-loop hydrometallurgy against open-air backyard smelting.
            </p>
          </div>

          {/* View Mode Toggle Buttons */}
          <div className="flex items-center bg-zinc-100 p-1.5 rounded-2xl border border-zinc-200 shrink-0 self-start lg:self-auto">
            <button
              onClick={() => setBenchmarkViewMode('all')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                benchmarkViewMode === 'all'
                  ? 'bg-white text-zinc-900 shadow-xs'
                  : 'text-zinc-500 hover:text-zinc-900'
              }`}
            >
              <Activity className="w-3.5 h-3.5 text-[#15803D]" />
              <span>Overview</span>
            </button>
            <button
              onClick={() => setBenchmarkViewMode('chart')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                benchmarkViewMode === 'chart'
                  ? 'bg-white text-zinc-900 shadow-xs'
                  : 'text-zinc-500 hover:text-zinc-900'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5 text-[#15803D]" />
              <span>Bar Graph Chart</span>
            </button>
            <button
              onClick={() => setBenchmarkViewMode('table')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                benchmarkViewMode === 'table'
                  ? 'bg-white text-zinc-900 shadow-xs'
                  : 'text-zinc-500 hover:text-zinc-900'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5 text-[#15803D]" />
              <span>Analytics Table</span>
            </button>
          </div>
        </div>

        {/* 4 CORE HIGHLIGHT KPI CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Secondary Lead Purity */}
          <div className="p-5 rounded-2xl bg-linear-to-b from-emerald-50/80 to-white border border-emerald-300 shadow-xs space-y-3 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-800">
                Purity Benchmark
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-bold font-mono">
                +11.47% Higher
              </span>
            </div>
            <div>
              <h4 className="font-heading font-black text-zinc-900 text-base">Secondary Lead Purity</h4>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-black font-mono text-[#15803D]">99.97%</span>
                <span className="text-xs text-zinc-400 font-mono">vs 88.50%</span>
              </div>
            </div>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between text-[11px]">
                <span className="text-emerald-800 font-semibold">VoltLoop: LME Certified</span>
                <span className="text-rose-600 line-through">Informal: Contaminated</span>
              </div>
              <div className="w-full bg-zinc-200 h-2 rounded-full overflow-hidden flex">
                <div className="bg-[#15803D] h-full" style={{ width: '99.97%' }} />
              </div>
            </div>
            <p className="text-[11px] text-zinc-500 pt-1 border-t border-emerald-100 font-medium">
              Meets Tier-1 OEM battery specifications without virgin lead blending.
            </p>
          </div>

          {/* Card 2: Baghouse Particulate Capture */}
          <div className="p-5 rounded-2xl bg-linear-to-b from-blue-50/80 to-white border border-blue-300 shadow-xs space-y-3 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-blue-800">
                Emission Standard
              </span>
              <span className="px-2 py-0.5 rounded-full bg-blue-600 text-white text-[10px] font-bold font-mono">
                Zero Toxic Smoke
              </span>
            </div>
            <div>
              <h4 className="font-heading font-black text-zinc-900 text-base">Baghouse Dust Capture</h4>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-black font-mono text-blue-700">99.90%</span>
                <span className="text-xs text-zinc-400 font-mono">vs 0.00%</span>
              </div>
            </div>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between text-[11px]">
                <span className="text-blue-800 font-semibold">VoltLoop: Filtered</span>
                <span className="text-rose-600 line-through">Informal: Open Air</span>
              </div>
              <div className="w-full bg-zinc-200 h-2 rounded-full overflow-hidden flex">
                <div className="bg-blue-600 h-full" style={{ width: '99.90%' }} />
              </div>
            </div>
            <p className="text-[11px] text-zinc-500 pt-1 border-t border-blue-100 font-medium">
              Eliminates airborne toxic lead dust and acid fumes in urban residential areas.
            </p>
          </div>

          {/* Card 3: Hazardous Acid Containment */}
          <div className="p-5 rounded-2xl bg-linear-to-b from-amber-50/80 to-white border border-amber-300 shadow-xs space-y-3 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-800">
                Chemical Safety
              </span>
              <span className="px-2 py-0.5 rounded-full bg-amber-600 text-white text-[10px] font-bold font-mono">
                100% Protected
              </span>
            </div>
            <div>
              <h4 className="font-heading font-black text-zinc-900 text-base">Hazardous Acid Containment</h4>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-black font-mono text-amber-700">100%</span>
                <span className="text-xs text-zinc-400 font-mono">vs 0% Dumped</span>
              </div>
            </div>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between text-[11px]">
                <span className="text-amber-800 font-semibold">VoltLoop: Neutralized</span>
                <span className="text-rose-600 line-through">Informal: Drains Dump</span>
              </div>
              <div className="w-full bg-zinc-200 h-2 rounded-full overflow-hidden flex">
                <div className="bg-amber-500 h-full" style={{ width: '100%' }} />
              </div>
            </div>
            <p className="text-[11px] text-zinc-500 pt-1 border-t border-amber-100 font-medium">
              Neutralized into inert gypsum slurry, fully safeguarding Dhaka groundwater.
            </p>
          </div>

          {/* Card 4: Polypropylene Plastic Recycling */}
          <div className="p-5 rounded-2xl bg-linear-to-b from-purple-50/80 to-white border border-purple-300 shadow-xs space-y-3 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-purple-800">
                Polymer Loop
              </span>
              <span className="px-2 py-0.5 rounded-full bg-purple-600 text-white text-[10px] font-bold font-mono">
                Zero Dioxin
              </span>
            </div>
            <div>
              <h4 className="font-heading font-black text-zinc-900 text-base">PP Plastic Recycling</h4>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-black font-mono text-purple-700">100%</span>
                <span className="text-xs text-zinc-400 font-mono">vs Burned</span>
              </div>
            </div>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between text-[11px]">
                <span className="text-purple-800 font-semibold">VoltLoop: Resin Pellets</span>
                <span className="text-rose-600 line-through">Informal: Smelter Fuel</span>
              </div>
              <div className="w-full bg-zinc-200 h-2 rounded-full overflow-hidden flex">
                <div className="bg-purple-600 h-full" style={{ width: '100%' }} />
              </div>
            </div>
            <p className="text-[11px] text-zinc-500 pt-1 border-t border-purple-100 font-medium">
              Re-extruded into impact-resistant casing plastic without burning dioxins.
            </p>
          </div>
        </div>

        {/* COMPARATIVE RECHARTS BAR GRAPH (RENDERED IN 'all' OR 'chart' MODE) */}
        {(benchmarkViewMode === 'all' || benchmarkViewMode === 'chart') && (
          <div className="bg-zinc-50 rounded-3xl p-6 sm:p-8 border border-zinc-200 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800">
                  Quantitative Comparison
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-zinc-900">
                  Performance Metric (%) Comparison by Parameter
                </h3>
              </div>
              <div className="flex items-center gap-4 text-xs font-mono">
                <span className="flex items-center gap-1.5 font-bold text-[#15803D]">
                  <span className="w-3 h-3 rounded-sm bg-[#15803D]" />
                  <span>VoltLoop Hydrometallurgy</span>
                </span>
                <span className="flex items-center gap-1.5 font-bold text-rose-700">
                  <span className="w-3 h-3 rounded-sm bg-rose-600" />
                  <span>Informal Backyard Smelting</span>
                </span>
              </div>
            </div>

            <div className="h-80 w-full pt-3">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={BENCHMARK_CHART_METRICS}
                  margin={{ top: 20, right: 20, left: -15, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    stroke="#64748b" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={{ stroke: '#cbd5e1' }}
                  />
                  <YAxis 
                    stroke="#64748b" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false}
                    domain={[0, 105]}
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
                    formatter={(val: any) => [`${val}%`, '']}
                  />
                  <Legend 
                    wrapperStyle={{ paddingTop: '10px', fontSize: '12px' }}
                  />
                  <Bar 
                    dataKey="VoltLoop" 
                    name="VoltLoop Certified Yield (%)" 
                    fill="#15803D" 
                    radius={[6, 6, 0, 0]} 
                  />
                  <Bar 
                    dataKey="Informal" 
                    name="Informal Backyard Smelter (%)" 
                    fill="#e11d48" 
                    radius={[6, 6, 0, 0]} 
                  />
                  <Bar 
                    dataKey="Benchmark" 
                    name="Minimum Regulatory Standard (%)" 
                    fill="#94a3b8" 
                    radius={[6, 6, 0, 0]} 
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* ANALYTICAL DATA TABLE (RENDERED IN 'all' OR 'table' MODE) */}
        {(benchmarkViewMode === 'all' || benchmarkViewMode === 'table') && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800">
                  Full Laboratory Assay Data
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-zinc-900">
                  Hydrometallurgical Parameters & Certification Table
                </h3>
              </div>
              <span className="text-xs text-zinc-500 font-mono">
                Verified under ASTM B29-19 & ISO 14001 Standards
              </span>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-zinc-200 shadow-sm">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-zinc-900 text-white font-mono uppercase text-[11px]">
                  <tr>
                    <th className="py-3.5 px-4 font-bold tracking-wider">Technical Metric</th>
                    <th className="py-3.5 px-4 font-bold tracking-wider text-emerald-400">VoltLoop Process</th>
                    <th className="py-3.5 px-4 font-bold tracking-wider text-rose-400">Informal Smelting</th>
                    <th className="py-3.5 px-4 font-bold tracking-wider">Environmental & Market Gain</th>
                    <th className="py-3.5 px-4 font-bold tracking-wider">Standard / Test Method</th>
                    <th className="py-3.5 px-4 font-bold tracking-wider text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 bg-white">
                  {PURITY_BENCHMARK_DATA.map((row, index) => (
                    <tr key={index} className="hover:bg-emerald-50/40 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-zinc-900">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#15803D]" />
                          <span>{row.parameter}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold text-[#15803D] bg-emerald-50/30">
                        <div className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                          <span>{row.voltDesc}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-zinc-600">
                        <div className="flex items-center gap-1.5">
                          <X className="w-3.5 h-3.5 text-rose-600 stroke-[3]" />
                          <span className="text-rose-700 font-medium">{row.informalDesc}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-900 font-bold font-mono text-[10px]">
                          {row.gain}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-zinc-500 text-[11px]">
                        {row.testStandard}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono font-bold text-[10px]">
                          <FileCheck2 className="w-3 h-3 text-emerald-600" />
                          <span>PASSED</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

