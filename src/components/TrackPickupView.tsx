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
  FileText, 
  Sparkles, 
  ArrowRight,
  RefreshCw,
  Zap,
  Download,
  AlertCircle,
  Building2,
  Calendar
} from 'lucide-react';
import { BatteryPickupRequest, BatteryStatus, Language } from '../types';

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
    }, 200);
  };

  useEffect(() => {
    if (initialTrackingCode) {
      setSearchInput(initialTrackingCode);
      handleSearch(initialTrackingCode);
    } else {
      handleSearch('VL-2026-00184');
    }
  }, [initialTrackingCode, requests]);

  const stepStatusConfig: Record<
    BatteryStatus,
    { labelEn: string; labelBn: string; color: string; stepNumber: number }
  > = {
    submitted: { labelEn: 'Request Serialized', labelBn: 'রিকোয়েস্ট তালিকাভুক্ত', color: 'bg-amber-500', stepNumber: 1 },
    partner_assigned: { labelEn: 'EV Collection Partner Assigned', labelBn: 'কালেকশন পার্টনার নিযুক্ত', color: 'bg-blue-600', stepNumber: 2 },
    collected: { labelEn: 'Collected & Gate Weighed', labelBn: 'সংগৃহীত ও ওজন সম্পন্ন', color: 'bg-emerald-600', stepNumber: 3 },
    processed: { labelEn: 'Hydrometallurgical Lead Recovered', labelBn: 'বিশুদ্ধ সিসা নিষ্কাশিত', color: 'bg-teal-600', stepNumber: 4 },
    offtake_delivered: { labelEn: 'Delivered to Manufacturer Offtake', labelBn: 'ব্যাটারি কারখানায় সরবরাহ', color: 'bg-emerald-800', stepNumber: 5 },
  };

  const getStatusBadge = (status: BatteryStatus) => {
    const conf = stepStatusConfig[status] || stepStatusConfig.submitted;
    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-white ${conf.color} shadow-xs`}>
        <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
        {language === 'en' ? conf.labelEn : conf.labelBn}
      </span>
    );
  };

  return (
    <div className="py-10 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10 animate-in fade-in duration-300">
      {/* Header section */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-300/60 text-[#15803D] text-xs font-bold uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4" />
          <span>{language === 'en' ? 'Closed-Loop Battery Traceability Portal' : 'লাইভ ব্যাটারি ট্র্যাকিং ও ট্রেসেবিলিটি পোর্টাল'}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-zinc-900 tracking-tight">
          {language === 'en' ? 'Track Your Battery Pickup & Recycling' : 'আপনার ব্যাটারি পিকআপের অবস্থান ট্র্যাক করুন'}
        </h1>

        <p className="text-base sm:text-lg text-zinc-600">
          {language === 'en'
            ? 'Enter your unique Tracking ID (e.g. VL-2026-00184) or registered mobile number to view live collection status, driver dispatch, weighing certificates, and smelter offtake logs.'
            : 'আপনার ট্র্যাকিং কোড বা মোবাইল নম্বর লিখে লাইভ কালেকশন স্ট্যাটাস, ওজন সার্টিফিকেট এবং অফটেক ডেলিভারি অগ্রগতি দেখুন।'}
        </p>
      </div>

      {/* Search Bar & Quick Demo Chips */}
      <div className="max-w-2xl mx-auto space-y-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch(searchInput);
          }}
          className="relative flex items-center shadow-lg rounded-2xl bg-white border-2 border-zinc-300 focus-within:border-[#15803D] transition-all p-1.5"
        >
          <div className="pl-3.5 pr-2 text-zinc-400">
            <Search className="w-5 h-5" />
          </div>
          <input
            id="tracking-search-input"
            type="text"
            placeholder={language === 'en' ? 'Enter Tracking ID (e.g., VL-2026-00184) or 017...' : 'ট্র্যাকিং আইডি (যেমন: VL-2026-00184) বা ফোন নম্বর লিখুন...'}
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full py-3 px-2 text-sm sm:text-base font-mono font-semibold text-zinc-900 bg-transparent outline-none uppercase placeholder:normal-case placeholder:font-sans placeholder:text-zinc-400"
          />
          <button
            type="submit"
            id="track-search-submit-btn"
            disabled={isSearching}
            className="px-6 py-3 rounded-xl bg-[#15803D] hover:bg-[#166534] text-white text-xs sm:text-sm font-bold shadow-sm transition-colors shrink-0 cursor-pointer disabled:opacity-50"
          >
            {isSearching ? (
              <span className="flex items-center gap-1.5">
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Checking...</span>
              </span>
            ) : (
              <span>{language === 'en' ? 'Track Status' : 'ট্র্যাক করুন'}</span>
            )}
          </button>
        </form>

        {/* Quick Sample IDs for rapid judge & user verification */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
          <span className="text-xs text-zinc-500 font-medium">
            {language === 'en' ? 'Try Sample Tracking IDs:' : 'নমুনা ট্র্যাকিং দেখুন:'}
          </span>
          {requests.slice(0, 3).map((req) => (
            <button
              key={req.id}
              onClick={() => {
                setSearchInput(req.trackingCode);
                handleSearch(req.trackingCode);
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-colors cursor-pointer border ${
                selectedRecord?.trackingCode === req.trackingCode
                  ? 'bg-emerald-50 text-[#15803D] border-emerald-400'
                  : 'bg-white text-zinc-700 border-zinc-200 hover:bg-zinc-100'
              }`}
            >
              {req.trackingCode} <span className="text-[10px] text-zinc-400">({req.status})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Error state */}
      {searchError && (
        <div className="max-w-xl mx-auto p-6 rounded-2xl bg-amber-50/80 border border-amber-200 text-center space-y-3">
          <AlertCircle className="w-8 h-8 text-amber-600 mx-auto" />
          <h3 className="text-base font-bold text-amber-900">
            {language === 'en' ? 'No Pickup Record Found' : 'কোনো তথ্য পাওয়া যায়নি'}
          </h3>
          <p className="text-xs text-amber-800">
            {language === 'en'
              ? `We could not locate any active collection batch for "${searchInput}". Please verify the code or phone number, or submit a new battery pickup request.`
              : `"${searchInput}" দিয়ে কোনো সক্রিয় রেকর্ড পাওয়া যায়নি। অনুগ্রহ করে কোডটি পুনরায় যাচাই করুন অথবা নতুন আবেদন করুন।`}
          </p>
          <button
            onClick={onOpenSellModal}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#15803D] text-white text-xs font-bold hover:bg-[#166534] shadow-xs cursor-pointer"
          >
            <Zap className="w-3.5 h-3.5 fill-white" />
            <span>{language === 'en' ? 'Sell Your Dead Battery Now' : 'এখনই ব্যাটারি বিক্রি করুন'}</span>
          </button>
        </div>
      )}

      {/* RESULT DETAIL VIEW */}
      {selectedRecord && (
        <div className="space-y-8 max-w-5xl mx-auto">
          {/* Status Header Card */}
          <div className="bg-white rounded-2xl border border-zinc-200/90 shadow-lg overflow-hidden">
            <div className="bg-[#0B150F] text-white p-6 sm:p-8 flex flex-wrap items-center justify-between gap-4 border-b border-emerald-950">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">
                    {language === 'en' ? 'Official Batch Tracking' : 'অফিসিয়াল ব্যাচ ট্র্যাকিং'}
                  </span>
                  <span className="text-zinc-600">•</span>
                  <span className="text-xs text-zinc-400 font-mono">{selectedRecord.createdAt}</span>
                </div>
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl sm:text-3xl font-black font-mono tracking-wider text-white">
                    {selectedRecord.trackingCode}
                  </h2>
                  {getStatusBadge(selectedRecord.status)}
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs text-zinc-400 block">{language === 'en' ? 'Guaranteed Payout' : 'মোট মূল্য'}</span>
                <span className="text-2xl sm:text-3xl font-black font-mono text-emerald-400">
                  ৳{selectedRecord.estimatedPayoutBDT.toLocaleString()} <span className="text-xs text-zinc-300">BDT</span>
                </span>
              </div>
            </div>

            {/* PROGRESS STEPPER (5 Milestones) */}
            <div className="p-6 sm:p-8 bg-zinc-50/70 border-b border-zinc-200">
              <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-6">
                {language === 'en' ? 'Chain of Custody & Recycling Stepper' : 'সম্পূর্ণ সাইকেল ও রিসাইক্লিং অগ্রগতি'}
              </h3>

              <div className="relative">
                {/* Connecting Line */}
                <div className="hidden md:block absolute top-5 left-8 right-8 h-1 bg-zinc-200 z-0">
                  <div
                    className="h-full bg-[#15803D] transition-all duration-500"
                    style={{
                      width:
                        selectedRecord.status === 'submitted'
                          ? '12%'
                          : selectedRecord.status === 'partner_assigned'
                          ? '35%'
                          : selectedRecord.status === 'collected'
                          ? '60%'
                          : selectedRecord.status === 'processed'
                          ? '85%'
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
                      titleBn: '১. রিকোয়েস্ট গৃহীত',
                      sub: 'Barcode serialized',
                    },
                    {
                      status: 'partner_assigned',
                      num: '2',
                      titleEn: '2. Fleet Dispatched',
                      titleBn: '২. গাড়ি পাঠানো হয়েছে',
                      sub: selectedRecord.driverName ? `${selectedRecord.driverName}` : 'Assigning driver',
                    },
                    {
                      status: 'collected',
                      num: '3',
                      titleEn: '3. Gate Weighed & Paid',
                      titleBn: '৩. ওজন ও পেমেন্ট সম্পন্ন',
                      sub: 'bKash/Nagad settled',
                    },
                    {
                      status: 'processed',
                      num: '4',
                      titleEn: '4. Clean Smelted',
                      titleBn: '৪. সিসা নিষ্কাশিত',
                      sub: '99.97% pure lead yield',
                    },
                    {
                      status: 'offtake_delivered',
                      num: '5',
                      titleEn: '5. Manufacturer Offtake',
                      titleBn: '৫. কারখানায় হস্তান্তর',
                      sub: selectedRecord.manufacturerOfftake || 'Partner smelter contract',
                    },
                  ].map((stepItem, idx) => {
                    const isDone = selectedRecord.timeline[idx]?.completed;
                    const isCurrent =
                      selectedRecord.status === stepItem.status ||
                      (stepItem.status === 'offtake_delivered' && selectedRecord.status === 'offtake_delivered');

                    return (
                      <div
                        key={stepItem.status}
                        className={`p-4 rounded-xl border transition-all ${
                          isDone
                            ? 'bg-white border-emerald-400 shadow-xs'
                            : isCurrent
                            ? 'bg-emerald-50/80 border-[#15803D] ring-2 ring-emerald-400/30'
                            : 'bg-zinc-100/70 border-zinc-200 text-zinc-400'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <div
                            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                              isDone
                                ? 'bg-[#15803D] text-white'
                                : isCurrent
                                ? 'bg-amber-500 text-white animate-pulse'
                                : 'bg-zinc-300 text-zinc-600'
                            }`}
                          >
                            {isDone ? <CheckCircle2 className="w-4 h-4" /> : stepItem.num}
                          </div>
                          <span
                            className={`text-xs font-bold ${
                              isDone || isCurrent ? 'text-zinc-900' : 'text-zinc-400'
                            }`}
                          >
                            {language === 'en' ? stepItem.titleEn : stepItem.titleBn}
                          </span>
                        </div>
                        <p className="text-[11px] text-zinc-500 leading-tight">{stepItem.sub}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Details Grid */}
            <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Column 1: Seller & Garage Information */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-zinc-500" />
                  <span>{language === 'en' ? 'Garage & Seller Info' : 'গ্যারেজ ও বিক্রেতা'}</span>
                </h4>

                <div className="bg-zinc-50 rounded-xl p-4 border border-zinc-200 text-xs space-y-2">
                  <div>
                    <span className="text-zinc-400 block">Garage Name:</span>
                    <span className="font-bold text-zinc-900 text-sm">{selectedRecord.garageName}</span>
                  </div>
                  <div>
                    <span className="text-zinc-400 block">Contact Person:</span>
                    <span className="font-semibold text-zinc-800">{selectedRecord.sellerName}</span>
                  </div>
                  <div>
                    <span className="text-zinc-400 block">Phone (bKash):</span>
                    <span className="font-mono font-semibold text-zinc-800">+880 {selectedRecord.phone}</span>
                  </div>
                  <div>
                    <span className="text-zinc-400 block">Location:</span>
                    <span className="font-medium text-zinc-800 flex items-start gap-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-[#15803D] shrink-0 mt-0.5" />
                      <span>{selectedRecord.address}, {selectedRecord.thana}, {selectedRecord.district}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Column 2: Battery Specs & Lead Yield */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-[#15803D]" />
                  <span>{language === 'en' ? 'Battery & Environmental Yield' : 'ব্যাটারির স্পেক ও ফলাফল'}</span>
                </h4>

                <div className="bg-zinc-50 rounded-xl p-4 border border-zinc-200 text-xs space-y-2.5">
                  <div className="flex justify-between items-center pb-2 border-b border-zinc-200">
                    <span className="text-zinc-500">Batch Quantity:</span>
                    <span className="font-mono font-bold text-zinc-900 text-sm">{selectedRecord.quantity} Units</span>
                  </div>
                  <div>
                    <span className="text-zinc-400 block">Battery Model:</span>
                    <span className="font-semibold text-zinc-800">{selectedRecord.batteryType}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-100">
                      <span className="text-[10px] text-emerald-800 block">Lead Recovered</span>
                      <span className="font-mono font-bold text-emerald-950 text-xs">
                        ~{selectedRecord.leadRecoveredKg || (selectedRecord.quantity * 23)} kg pure
                      </span>
                    </div>
                    <div className="p-2 rounded-lg bg-teal-50 border border-teal-100">
                      <span className="text-[10px] text-teal-800 block">Acid Neutralized</span>
                      <span className="font-mono font-bold text-teal-950 text-xs">
                        ~{selectedRecord.acidNeutralizedLiters || (selectedRecord.quantity * 5)} Liters
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Column 3: Logistics & Offtake Partner */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-zinc-500" />
                  <span>{language === 'en' ? 'Assigned Logistics & Partner' : 'লজিস্টিকস ও অফটেক পার্টনার'}</span>
                </h4>

                <div className="bg-zinc-50 rounded-xl p-4 border border-zinc-200 text-xs space-y-2.5">
                  <div>
                    <span className="text-zinc-400 block">Assigned Collection Partner:</span>
                    <span className="font-bold text-zinc-900">
                      {selectedRecord.driverName || 'VoltLoop Fleet Unit #04 (Tejgaon Depot)'}
                    </span>
                    {selectedRecord.driverPhone && (
                      <a
                        href={`tel:${selectedRecord.driverPhone}`}
                        className="inline-flex items-center gap-1 text-[#15803D] font-mono mt-0.5 hover:underline"
                      >
                        <Phone className="w-3 h-3" />
                        <span>{selectedRecord.driverPhone}</span>
                      </a>
                    )}
                  </div>

                  <div>
                    <span className="text-zinc-400 block">Vehicle:</span>
                    <span className="font-mono text-zinc-800">{selectedRecord.vehicleNumber || 'Dhaka Metro EV-Flatbed 14'}</span>
                  </div>

                  <div>
                    <span className="text-zinc-400 block">Offtake Destination:</span>
                    <span className="font-bold text-emerald-800 flex items-center gap-1">
                      <Factory className="w-3.5 h-3.5" />
                      <span>{selectedRecord.manufacturerOfftake || 'Certified Battery Manufacturer Offtake'}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline Detailed Audit Trail */}
            <div className="p-6 sm:p-8 bg-white border-t border-zinc-200">
              <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-4">
                {language === 'en' ? 'Detailed Timestamped Audit Trail' : 'সময় অনুযায়ী পূর্ণ অডিট ট্রেইল'}
              </h4>

              <div className="space-y-4">
                {selectedRecord.timeline.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className={`mt-0.5 w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                      item.completed ? 'bg-[#15803D] text-white' : 'bg-zinc-200 text-zinc-500'
                    }`}>
                      {item.completed ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                    </div>
                    <div className="flex-1 text-xs">
                      <div className="flex flex-wrap items-center justify-between gap-1">
                        <span className="font-bold text-zinc-900">{item.title}</span>
                        <span className="font-mono text-zinc-400">{item.timestamp}</span>
                      </div>
                      <p className="text-zinc-600 mt-0.5">{item.description}</p>
                      {item.location && (
                        <span className="inline-block mt-1 text-[11px] text-zinc-500 font-mono">
                          📍 {item.location}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
