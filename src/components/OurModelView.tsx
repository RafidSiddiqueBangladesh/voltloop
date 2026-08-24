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
  Maximize2
} from 'lucide-react';
import { DHAKA_HUBS } from '../data/mockData';
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
    </div>
  );
};
