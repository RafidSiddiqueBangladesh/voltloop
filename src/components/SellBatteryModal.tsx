import React, { useState } from 'react';
import { 
  X, 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  MapPin, 
  Upload, 
  Trash2, 
  ShieldCheck, 
  Clock, 
  Banknote, 
  Phone, 
  Building2, 
  Zap, 
  CheckCircle2, 
  Copy, 
  Share2, 
  Navigation, 
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { BatteryPickupRequest, Language } from '../types';
import { BATTERY_TYPES, BANGLADESH_DISTRICTS } from '../data/mockData';

interface SellBatteryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess: (newRequest: BatteryPickupRequest) => void;
  language: Language;
  onTrackRedirect: (code: string) => void;
}

export const SellBatteryModal: React.FC<SellBatteryModalProps> = ({
  isOpen,
  onClose,
  onSubmitSuccess,
  language,
  onTrackRedirect,
}) => {
  const [step, setStep] = useState<number>(1);
  const totalSteps = 5;

  // Form State
  const [sellerName, setSellerName] = useState('');
  const [phone, setPhone] = useState('');
  const [garageName, setGarageName] = useState('');
  const [garageType, setGarageType] = useState<'fleet_depot' | 'workshop' | 'cooperative' | 'individual'>('fleet_depot');
  
  // Step 2: Location
  const [district, setDistrict] = useState(BANGLADESH_DISTRICTS[0]);
  const [thana, setThana] = useState('');
  const [address, setAddress] = useState('');
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [detectedLocationName, setDetectedLocationName] = useState<string | null>(null);

  // Step 3: Battery Details
  const [selectedBatteryType, setSelectedBatteryType] = useState(BATTERY_TYPES[0].id);
  const [quantity, setQuantity] = useState<number>(8);
  const [condition, setCondition] = useState<'intact' | 'swollen' | 'cracked' | 'mixed'>('intact');
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [photoName, setPhotoName] = useState<string | null>(null);

  // Step 4: Pickup Window
  const [pickupWindow, setPickupWindow] = useState('Tomorrow Morning (8:00 AM - 12:00 PM)');
  const [notes, setNotes] = useState('');

  // Step 5: Payment Preference
  const [preferredPayment, setPreferredPayment] = useState<'bkash' | 'nagad' | 'bank' | 'cash_on_scale'>('bkash');

  // Confirmation State
  const [submittedData, setSubmittedData] = useState<BatteryPickupRequest | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentTypeObj = BATTERY_TYPES.find((b) => b.id === selectedBatteryType) || BATTERY_TYPES[0];
  const estimatedPayoutBDT = currentTypeObj.unitPayoutBDT * quantity;
  const informalRatePayout = currentTypeObj.informalScrapRateBDT * quantity;
  const premiumGainBDT = estimatedPayoutBDT - informalRatePayout;

  // Auto-detect geolocation simulation with browser API
  const handleAutoDetectLocation = () => {
    setIsDetectingLocation(true);
    setFormError(null);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setIsDetectingLocation(false);
          setDetectedLocationName('Mirpur Section 10 (Auto-Detected GPS)');
          setThana('Mirpur 10 Auto Stand');
          if (!address) {
            setAddress('Near Main Rickshaw Terminal, Plot 12/B');
          }
        },
        (error) => {
          setIsDetectingLocation(false);
          // Fallback simulation
          setDetectedLocationName('Tejgaon Central Hub (Simulated GPS)');
          setThana('Tejgaon I/A');
          if (!address) {
            setAddress('Industrial Zone, Near Central Depot');
          }
        },
        { timeout: 5000 }
      );
    } else {
      setIsDetectingLocation(false);
      setDetectedLocationName('Dhaka Central Zone');
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateStep = (currentStep: number): boolean => {
    setFormError(null);
    if (currentStep === 1) {
      if (!sellerName.trim()) {
        setFormError(language === 'en' ? 'Please enter your name' : 'অনুগ্রহ করে আপনার নাম লিখুন');
        return false;
      }
      if (!phone.trim() || phone.length < 10) {
        setFormError(language === 'en' ? 'Please enter a valid 11-digit mobile number' : 'সঠিক ১১-সংখ্যার মোবাইল নম্বর লিখুন');
        return false;
      }
      if (!garageName.trim()) {
        setFormError(language === 'en' ? 'Please enter your garage or shop name' : 'গ্যারেজ বা দোকানের নাম লিখুন');
        return false;
      }
    }
    if (currentStep === 2) {
      if (!address.trim() && !thana.trim()) {
        setFormError(language === 'en' ? 'Please provide an address or pickup landmark' : 'ঠিকানা বা ল্যান্ডমার্ক উল্লেখ করুন');
        return false;
      }
    }
    if (currentStep === 3) {
      if (quantity < 1) {
        setFormError(language === 'en' ? 'Quantity must be at least 1 battery' : 'কমপক্ষে ১টি ব্যাটারি নির্বাচন করুন');
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((prev) => Math.min(prev + 1, totalSteps));
    }
  };

  const handlePrev = () => {
    setFormError(null);
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(step)) return;

    // Generate unique tracking code e.g. VL-2026-00412
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const trackingCode = `VL-2026-${randomNum}`;

    const newRequest: BatteryPickupRequest = {
      id: `req-${Date.now()}`,
      trackingCode,
      sellerName,
      phone,
      garageName,
      garageType,
      district,
      thana: thana || district.split('(')[1]?.replace(')', '') || 'Dhaka Metropolitan',
      address: address || 'Main Road Entry Point',
      lat: 23.8103,
      lng: 90.4125,
      batteryType: currentTypeObj.name,
      batteryVoltage: currentTypeObj.voltage,
      quantity,
      condition,
      photoUrl: photoUrl || undefined,
      pickupWindow,
      preferredPayment,
      estimatedPayoutBDT,
      notes: notes || undefined,
      createdAt: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'submitted',
      timeline: [
        {
          status: 'submitted',
          title: 'Pickup Request Logged & Serialized',
          description: `Logged for ${quantity} units with guaranteed payout estimate of ৳${estimatedPayoutBDT.toLocaleString()} BDT.`,
          timestamp: 'Just now',
          completed: true,
          location: district,
        },
        {
          status: 'partner_assigned',
          title: 'Collection Partner Allocation',
          description: 'Our Dhaka dispatch team is allocating the nearest EV flatbed logistics van.',
          timestamp: 'Expected within 30-45 mins',
          completed: false,
        },
        {
          status: 'collected',
          title: 'Digital Scale Weighing & Instant Payment',
          description: 'On-site verification with instant bKash/Nagad settlement.',
          timestamp: pickupWindow,
          completed: false,
        },
        {
          status: 'processed',
          title: 'Hydrometallurgical Lead Recovery',
          description: 'Closed-loop 99.97% pure secondary lead smelting and acid neutralization.',
          timestamp: 'Scheduled post-collection',
          completed: false,
        },
        {
          status: 'offtake_delivered',
          title: 'Delivered to Tier-1 Battery Manufacturer',
          description: 'Delivered under EPR circular offtake agreement.',
          timestamp: 'Pending',
          completed: false,
        },
      ],
    };

    setSubmittedData(newRequest);
    onSubmitSuccess(newRequest);
  };

  const handleCopyCode = () => {
    if (submittedData) {
      navigator.clipboard.writeText(submittedData.trackingCode);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div 
        className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-zinc-200 overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-[#0B150F] text-white px-5 sm:px-7 py-4.5 flex items-center justify-between border-b border-emerald-950">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-700/40 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Zap className="w-5 h-5 fill-emerald-400" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold font-heading text-white">
                {language === 'en' ? 'Sell Your Dead Battery' : 'মৃত ব্যাটারি বিক্রির আবেদন'}
              </h2>
              <p className="text-xs text-emerald-300/90">
                {language === 'en' ? 'Top rate guarantee • Scheduled EV pickup • Instant bKash payout' : 'সর্বোচ্চ মূল্য নিশ্চয়তা • নিজস্ব পরিবহন • তাৎক্ষণিক বিকাশ পেমেন্ট'}
              </p>
            </div>
          </div>

          <button
            id="close-sell-modal-btn"
            onClick={onClose}
            className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar (if not submitted) */}
        {!submittedData && (
          <div className="bg-zinc-100 px-5 sm:px-7 py-3 border-b border-zinc-200">
            <div className="flex items-center justify-between text-xs font-semibold text-zinc-600 mb-2">
              <span className="text-[#15803D]">
                {language === 'en' ? `Step ${step} of ${totalSteps}` : `ধাপ ${step} / ${totalSteps}`}
              </span>
              <span>
                {step === 1 && (language === 'en' ? 'Seller & Garage' : 'গ্যারেজ তথ্য')}
                {step === 2 && (language === 'en' ? 'Pickup Location' : 'পিকআপের অবস্থান')}
                {step === 3 && (language === 'en' ? 'Battery Details' : 'ব্যাটারির বিবরণ')}
                {step === 4 && (language === 'en' ? 'Pickup Schedule' : 'পিকআপের সময়')}
                {step === 5 && (language === 'en' ? 'Review & Payout' : 'মূল্য পর্যালোচনা')}
              </span>
            </div>
            <div className="w-full bg-zinc-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-[#15803D] h-full transition-all duration-300 rounded-full"
                style={{ width: `${(step / totalSteps) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Trust Highlight Strip */}
        {!submittedData && (
          <div className="bg-emerald-50/70 border-b border-emerald-100 px-5 sm:px-7 py-2 flex items-center justify-between text-xs text-emerald-900">
            <span className="flex items-center gap-1.5 font-medium">
              <ShieldCheck className="w-4 h-4 text-[#15803D]" />
              {language === 'en' ? 'Guaranteed 15-20% higher payout than informal middlemen' : 'অনানুষ্ঠানিক ভাঙারি ব্যবসায়ীর চেয়ে ১৫-২০% বেশি দাম'}
            </span>
            <span className="font-mono font-bold text-emerald-800 hidden sm:inline-block">
              {language === 'en' ? 'Estimated: ৳3,400 - ৳4,100 / unit' : 'আনুমানিক: ৳৩,৪০০ - ৳৪,১০০ / ইউনিট'}
            </span>
          </div>
        )}

        {/* Form Body */}
        <div className="p-5 sm:p-7 max-h-[75vh] overflow-y-auto">
          {formError && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{formError}</span>
            </div>
          )}

          {submittedData ? (
            /* SUBMISSION CONFIRMATION VIEW */
            <div className="text-center py-4 space-y-6 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 bg-emerald-100 text-[#15803D] rounded-full mx-auto flex items-center justify-center ring-8 ring-emerald-50">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="inline-block px-3 py-1 bg-emerald-100 text-[#15803D] text-xs font-bold rounded-full mb-2 uppercase tracking-wide">
                  {language === 'en' ? 'Pickup Request Confirmed' : 'পিকআপ রিকোয়েস্ট নিশ্চিত'}
                </span>
                <h3 className="text-2xl font-bold font-heading text-zinc-900">
                  {language === 'en' ? 'Your Battery is Queued for Safe Collection' : 'আপনার ব্যাটারি সংগ্রহের জন্য তালিকাভুক্ত হয়েছে'}
                </h3>
                <p className="text-sm text-zinc-600 mt-2 max-w-md mx-auto">
                  {language === 'en'
                    ? 'A VoltLoop Collection Partner will contact your mobile within 30-45 minutes to coordinate on-site digital weighing & payout.'
                    : 'ভোল্টলুপ কালেকশন পার্টনার ৩০-৪৫ মিনিটের মধ্যে আপনার মোবাইলে যোগাযোগ করে ডিজিটাল ওজন ও তাৎক্ষণিক পেমেন্ট সম্পন্ন করবে।'}
                </p>
              </div>

              {/* Unique Tracking Box */}
              <div className="bg-zinc-50 border-2 border-dashed border-emerald-600/40 rounded-xl p-5 max-w-md mx-auto text-left space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-zinc-500 font-medium uppercase tracking-wider">
                    {language === 'en' ? 'Unique Tracking ID' : 'অনন্য ট্র্যাকিং আইডি'}
                  </span>
                  <span className="text-xs font-mono bg-emerald-600 text-white px-2 py-0.5 rounded">
                    Active
                  </span>
                </div>

                <div className="flex items-center justify-between bg-white border border-zinc-200 rounded-lg p-2.5">
                  <span className="font-mono text-xl sm:text-2xl font-black text-zinc-900 tracking-wider">
                    {submittedData.trackingCode}
                  </span>
                  <button
                    id="copy-tracking-id-btn"
                    onClick={handleCopyCode}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    {copiedCode ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-zinc-500" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-zinc-200">
                  <div>
                    <span className="text-zinc-500 block">Garage:</span>
                    <span className="font-semibold text-zinc-800">{submittedData.garageName}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block">Estimated Payout:</span>
                    <span className="font-bold text-[#15803D]">৳{submittedData.estimatedPayoutBDT.toLocaleString()} BDT</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block">Quantity:</span>
                    <span className="font-semibold text-zinc-800">{submittedData.quantity} Units</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block">Pickup Slot:</span>
                    <span className="font-semibold text-zinc-800">{submittedData.pickupWindow.split('(')[0]}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  id="track-now-from-modal-btn"
                  onClick={() => {
                    onClose();
                    onTrackRedirect(submittedData.trackingCode);
                  }}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#15803D] hover:bg-[#166534] text-white font-bold text-sm inline-flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                >
                  <Navigation className="w-4 h-4" />
                  <span>{language === 'en' ? 'Track Pickup Progress Live' : 'পিকআপের অগ্রগতি লাইভ ট্র্যাক করুন'}</span>
                </button>

                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-semibold text-sm cursor-pointer"
                >
                  {language === 'en' ? 'Close & Return' : 'বন্ধ করুন'}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* STEP 1: Seller & Garage */}
              {step === 1 && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <div>
                    <label className="block text-xs font-bold text-zinc-800 uppercase tracking-wider mb-1.5">
                      {language === 'en' ? 'Seller Full Name *' : 'বিক্রেতার পুরো নাম *'}
                    </label>
                    <input
                      id="seller-name-input"
                      type="text"
                      required
                      placeholder={language === 'en' ? 'e.g. Rafiqul Islam' : 'যেমন: মো: রফিকুল ইসলাম'}
                      value={sellerName}
                      onChange={(e) => setSellerName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 focus:border-[#15803D] focus:ring-2 focus:ring-emerald-200 outline-none text-sm text-zinc-900 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-800 uppercase tracking-wider mb-1.5">
                      {language === 'en' ? 'Mobile / WhatsApp Number (for bKash) *' : 'মোবাইল / হোয়াটসঅ্যাপ নম্বর (বিকাশের জন্য) *'}
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-mono text-zinc-500 font-bold">
                        +880
                      </span>
                      <input
                        id="seller-phone-input"
                        type="tel"
                        required
                        placeholder="01712345678"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full pl-16 pr-4 py-2.5 rounded-lg border border-zinc-300 focus:border-[#15803D] focus:ring-2 focus:ring-emerald-200 outline-none text-sm font-mono text-zinc-900 bg-white"
                      />
                    </div>
                    <p className="text-[11px] text-zinc-500 mt-1">
                      {language === 'en' ? 'Our collection driver will call this number before arrival.' : 'আমাদের ড্রাইভার পৌঁছানোর আগে এই নম্বরে কল করবে।'}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-zinc-800 uppercase tracking-wider mb-1.5">
                        {language === 'en' ? 'Garage / Shop Name *' : 'গ্যারেজ বা দোকানের নাম *'}
                      </label>
                      <input
                        id="garage-name-input"
                        type="text"
                        required
                        placeholder={language === 'en' ? 'e.g. Bismillah Auto Hub' : 'যেমন: বিসমিল্লাহ অটো গ্যারেজ'}
                        value={garageName}
                        onChange={(e) => setGarageName(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 focus:border-[#15803D] focus:ring-2 focus:ring-emerald-200 outline-none text-sm text-zinc-900 bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-zinc-800 uppercase tracking-wider mb-1.5">
                        {language === 'en' ? 'Garage Type' : 'গ্যারেজের ধরন'}
                      </label>
                      <select
                        value={garageType}
                        onChange={(e) => setGarageType(e.target.value as any)}
                        className="w-full px-3 py-2.5 rounded-lg border border-zinc-300 focus:border-[#15803D] focus:ring-2 focus:ring-emerald-200 outline-none text-sm text-zinc-900 bg-white"
                      >
                        <option value="fleet_depot">{language === 'en' ? 'Commercial E-Fleet Charging Depot (10+ vehicles)' : 'বাণিজ্যিক চার্জিং ডিপো'}</option>
                        <option value="workshop">{language === 'en' ? 'Auto Repair & Battery Workshop' : 'মেরামত ও পার্টস ওয়ার্কশপ'}</option>
                        <option value="cooperative">{language === 'en' ? 'Rickshaw Drivers Cooperative / Samity' : 'রিকশা চালক সমবায় সমিতি'}</option>
                        <option value="individual">{language === 'en' ? 'Individual Rickshaw Owner / Small Shop' : 'একক মালিক / ছোট দোকান'}</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Location */}
              {step === 2 && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-zinc-800 uppercase tracking-wider">
                      {language === 'en' ? 'District / Division *' : 'জেলা / অঞ্চল *'}
                    </label>

                    <button
                      type="button"
                      onClick={handleAutoDetectLocation}
                      disabled={isDetectingLocation}
                      className="inline-flex items-center gap-1.5 text-xs text-[#15803D] hover:text-[#166534] font-bold cursor-pointer disabled:opacity-50"
                    >
                      <Navigation className={`w-3.5 h-3.5 ${isDetectingLocation ? 'animate-spin' : ''}`} />
                      <span>{isDetectingLocation ? 'Detecting GPS...' : (language === 'en' ? 'Auto-Detect GPS' : 'জিপিএস লোকেশন নিন')}</span>
                    </button>
                  </div>

                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg border border-zinc-300 focus:border-[#15803D] focus:ring-2 focus:ring-emerald-200 outline-none text-sm text-zinc-900 bg-white"
                  >
                    {BANGLADESH_DISTRICTS.map((dist) => (
                      <option key={dist} value={dist}>
                        {dist}
                      </option>
                    ))}
                  </select>

                  {detectedLocationName && (
                    <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#15803D]" />
                        {detectedLocationName}
                      </span>
                      <span className="font-semibold text-emerald-700">GPS Locked</span>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold text-zinc-800 uppercase tracking-wider mb-1.5">
                      {language === 'en' ? 'Thana / Area & Road Landmark *' : 'থানা / এলাকা ও ল্যান্ডমার্ক *'}
                    </label>
                    <input
                      type="text"
                      placeholder={language === 'en' ? 'e.g. Mirpur 10, Near Section 10 Rickshaw Stand' : 'যেমন: মিরপুর ১০, মেইন বাস স্ট্যান্ডের পাশে'}
                      value={thana}
                      onChange={(e) => setThana(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 focus:border-[#15803D] focus:ring-2 focus:ring-emerald-200 outline-none text-sm text-zinc-900 bg-white mb-2"
                    />
                    <textarea
                      rows={2}
                      placeholder={language === 'en' ? 'Full garage address (House/Road/Lane number for heavy EV truck access)' : 'পূর্ণ গ্যারেজ ঠিকানা (ট্রাক সহজে ঢোকার নির্দেশিকা)'}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 focus:border-[#15803D] focus:ring-2 focus:ring-emerald-200 outline-none text-sm text-zinc-900 bg-white resize-none"
                    />
                  </div>
                </div>
              )}

              {/* STEP 3: Battery Details */}
              {step === 3 && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <div>
                    <label className="block text-xs font-bold text-zinc-800 uppercase tracking-wider mb-1.5">
                      {language === 'en' ? 'Battery Specification' : 'ব্যাটারির ধরন'}
                    </label>
                    <div className="space-y-2">
                      {BATTERY_TYPES.map((b) => (
                        <label
                          key={b.id}
                          className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                            selectedBatteryType === b.id
                              ? 'border-[#15803D] bg-emerald-50/60 ring-1 ring-emerald-500'
                              : 'border-zinc-200 hover:border-zinc-300 bg-white'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <input
                              type="radio"
                              name="batteryType"
                              checked={selectedBatteryType === b.id}
                              onChange={() => setSelectedBatteryType(b.id)}
                              className="accent-[#15803D] w-4 h-4"
                            />
                            <div>
                              <p className="text-xs sm:text-sm font-bold text-zinc-900">{b.name}</p>
                              <p className="text-[11px] text-zinc-500">
                                ~{b.leadContentKg}kg pure lead • ~{b.acidLiters}L electrolyte
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="font-mono text-xs sm:text-sm font-bold text-[#15803D]">
                              ৳{b.unitPayoutBDT.toLocaleString()}
                            </span>
                            <span className="block text-[10px] text-zinc-400">per unit</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Quantity selector */}
                  <div>
                    <label className="block text-xs font-bold text-zinc-800 uppercase tracking-wider mb-1.5">
                      {language === 'en' ? 'Quantity of Dead Batteries' : 'মৃত ব্যাটারির সংখ্যা'}
                    </label>
                    <div className="flex items-center gap-2 mb-2">
                      {[4, 8, 12, 16, 24, 32].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setQuantity(num)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            quantity === num
                              ? 'bg-[#15803D] text-white shadow-xs'
                              : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
                          }`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                    <div className="flex items-center gap-3">
                      <input
                        type="number"
                        min="1"
                        max="500"
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-32 px-4 py-2 rounded-lg border border-zinc-300 focus:border-[#15803D] font-mono font-bold text-base text-zinc-900 outline-none"
                      />
                      <span className="text-xs text-zinc-500">
                        {language === 'en' ? 'units (Total weight approx: ' + (quantity * currentTypeObj.leadContentKg * 1.5).toFixed(0) + ' kg)' : 'টি ব্যাটারি'}
                      </span>
                    </div>
                  </div>

                  {/* Condition & Photo */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div>
                      <label className="block text-xs font-bold text-zinc-800 uppercase tracking-wider mb-1.5">
                        {language === 'en' ? 'Condition' : 'ব্যাটারির অবস্থা'}
                      </label>
                      <select
                        value={condition}
                        onChange={(e) => setCondition(e.target.value as any)}
                        className="w-full px-3 py-2 rounded-lg border border-zinc-300 focus:border-[#15803D] text-xs text-zinc-900 bg-white"
                      >
                        <option value="intact">{language === 'en' ? 'Intact Casing (Acid Contained)' : 'অক্ষত বডি (অ্যাসিড সুরক্ষিত)'}</option>
                        <option value="swollen">{language === 'en' ? 'Swollen / Overcharged Pack' : 'ফোলা / অতিরিক্ত চার্জিত'}</option>
                        <option value="cracked">{language === 'en' ? 'Cracked / Leaking (Hazard Pack)' : 'ফাটা / তরল চুইয়ে পড়া'}</option>
                        <option value="mixed">{language === 'en' ? 'Mixed Lot of Scrap Batteries' : 'মিশ্রিত বিভিন্ন ধরনের'}</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-zinc-800 uppercase tracking-wider mb-1.5">
                        {language === 'en' ? 'Photo (Optional)' : 'ছবি তুলুন / আপলোড (ঐচ্ছিক)'}
                      </label>
                      <div className="relative">
                        <label className="flex items-center justify-center gap-2 px-3 py-2 border border-dashed border-zinc-300 hover:border-emerald-500 rounded-lg cursor-pointer bg-zinc-50 hover:bg-emerald-50/50 transition-colors text-xs text-zinc-600">
                          <Upload className="w-3.5 h-3.5 text-zinc-500" />
                          <span className="truncate max-w-[150px]">
                            {photoName || (language === 'en' ? 'Snap/Upload' : 'ছবি যোগ করুন')}
                          </span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoUpload}
                            className="hidden"
                          />
                        </label>
                        {photoUrl && (
                          <button
                            type="button"
                            onClick={() => {
                              setPhotoUrl(null);
                              setPhotoName(null);
                            }}
                            className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 shadow-xs"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: Preferred Pickup Time */}
              {step === 4 && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <div>
                    <label className="block text-xs font-bold text-zinc-800 uppercase tracking-wider mb-2">
                      {language === 'en' ? 'Select Preferred Pickup Window' : 'পিকআপের সুবিধাজনক সময় বেছে নিন'}
                    </label>
                    <div className="space-y-2">
                      {[
                        { title: 'Today Express Slot (Within 3 Hours)', sub: 'Fast dispatch from nearest Dhaka depot', tag: 'Fastest' },
                        { title: 'Tomorrow Morning (8:00 AM - 12:00 PM)', sub: 'Ideal for fleet battery replacements', tag: 'Recommended' },
                        { title: 'Tomorrow Afternoon (1:00 PM - 5:00 PM)', sub: 'Standard scheduled collection window', tag: 'Flexible' },
                        { title: 'Weekend Special Batch (Friday/Saturday)', sub: 'Bulk collection for 20+ batteries', tag: 'Bulk' },
                      ].map((slot) => (
                        <label
                          key={slot.title}
                          className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                            pickupWindow === slot.title
                              ? 'border-[#15803D] bg-emerald-50/70 ring-1 ring-emerald-500'
                              : 'border-zinc-200 hover:border-zinc-300 bg-white'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <input
                              type="radio"
                              name="pickupWindow"
                              checked={pickupWindow === slot.title}
                              onChange={() => setPickupWindow(slot.title)}
                              className="accent-[#15803D] w-4 h-4"
                            />
                            <div>
                              <p className="text-xs sm:text-sm font-bold text-zinc-900">{slot.title}</p>
                              <p className="text-[11px] text-zinc-500">{slot.sub}</p>
                            </div>
                          </div>
                          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-zinc-100 text-zinc-700">
                            {slot.tag}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-800 uppercase tracking-wider mb-1.5">
                      {language === 'en' ? 'Special Instructions for Collection Driver' : 'ড্রাইভারের জন্য বিশেষ নির্দেশনা (ঐচ্ছিক)'}
                    </label>
                    <input
                      type="text"
                      placeholder={language === 'en' ? 'e.g. Call 10 mins before arrival; narrow alley entrance' : 'যেমন: আসার ১০ মিনিট আগে ফোন দিন; সরু গলি'}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 focus:border-[#15803D] outline-none text-xs text-zinc-900 bg-white"
                    />
                  </div>
                </div>
              )}

              {/* STEP 5: Review & Payout */}
              {step === 5 && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  {/* Payout Calculation Card */}
                  <div className="bg-gradient-to-br from-[#0B150F] to-[#122B1C] text-white rounded-2xl p-5 shadow-lg border border-emerald-900/60 space-y-3">
                    <div className="flex items-center justify-between text-xs text-emerald-300">
                      <span>{language === 'en' ? 'Guaranteed Payout Estimate' : 'নিশ্চিত আনুমানিক মোট মূল্য'}</span>
                      <span className="font-mono bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30">
                        Live Rate Locked
                      </span>
                    </div>

                    <div className="flex items-baseline justify-between">
                      <div className="text-3xl sm:text-4xl font-black font-mono text-white tracking-tight">
                        ৳{estimatedPayoutBDT.toLocaleString()} <span className="text-sm font-sans font-medium text-emerald-300">BDT</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[11px] text-zinc-400 block">{quantity} units @ ৳{currentTypeObj.unitPayoutBDT}</span>
                        <span className="text-xs font-bold text-emerald-400">
                          +৳{premiumGainBDT.toLocaleString()} vs scrap middleman
                        </span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-emerald-800/60 grid grid-cols-2 gap-2 text-xs text-zinc-300">
                      <div>
                        <span className="text-zinc-400 block text-[11px]">Lead Recovered:</span>
                        <span className="font-bold text-white">~{(quantity * currentTypeObj.leadContentKg).toFixed(0)} kg Pure Lead</span>
                      </div>
                      <div>
                        <span className="text-zinc-400 block text-[11px]">Hazard Neutralization:</span>
                        <span className="font-bold text-white">~{(quantity * currentTypeObj.acidLiters).toFixed(1)} L Acid Neutralized</span>
                      </div>
                    </div>
                  </div>

                  {/* Payment Method Selector */}
                  <div>
                    <label className="block text-xs font-bold text-zinc-800 uppercase tracking-wider mb-2">
                      {language === 'en' ? 'Select Preferred Payout Method' : 'পেমেন্ট গ্রহণের মাধ্যম নির্বাচন করুন'}
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { id: 'bkash', label: 'bKash', sub: 'Instant Transfer' },
                        { id: 'nagad', label: 'Nagad', sub: 'Instant Transfer' },
                        { id: 'cash_on_scale', label: 'Cash', sub: 'On Gate Scale' },
                        { id: 'bank', label: 'Bank EFT', sub: 'Commercial Invoice' },
                      ].map((pay) => (
                        <button
                          key={pay.id}
                          type="button"
                          onClick={() => setPreferredPayment(pay.id as any)}
                          className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                            preferredPayment === pay.id
                              ? 'border-[#15803D] bg-emerald-50 ring-1 ring-emerald-500'
                              : 'border-zinc-200 bg-white hover:bg-zinc-50'
                          }`}
                        >
                          <span className="block text-xs font-bold text-zinc-900">{pay.label}</span>
                          <span className="text-[10px] text-zinc-500">{pay.sub}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Order Summary Snapshot */}
                  <div className="bg-zinc-50 rounded-xl p-3.5 border border-zinc-200 text-xs space-y-1.5 text-zinc-700">
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Seller & Garage:</span>
                      <span className="font-semibold text-zinc-900">{sellerName} • {garageName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Contact:</span>
                      <span className="font-mono text-zinc-900">+880 {phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Location:</span>
                      <span className="font-semibold text-zinc-900 truncate max-w-[240px]">{thana}, {district.split('(')[0]}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Schedule:</span>
                      <span className="font-semibold text-emerald-800">{pickupWindow.split('(')[0]}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Form Navigation Controls */}
              <div className="pt-3 border-t border-zinc-200 flex items-center justify-between gap-3">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-zinc-300 text-xs font-bold text-zinc-700 hover:bg-zinc-100 transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>{language === 'en' ? 'Back' : 'পেছনে'}</span>
                  </button>
                ) : (
                  <div></div>
                )}

                {step < totalSteps ? (
                  <button
                    type="button"
                    id="sell-modal-next-btn"
                    onClick={handleNext}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#15803D] hover:bg-[#166534] text-white text-xs font-bold shadow-sm transition-all cursor-pointer"
                  >
                    <span>{language === 'en' ? 'Next Step' : 'পরবর্তী ধাপ'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    id="sell-modal-submit-btn"
                    className="inline-flex items-center gap-2 px-7 py-3 rounded-lg bg-[#15803D] hover:bg-[#166534] text-white text-sm font-extrabold shadow-md transition-all cursor-pointer"
                  >
                    <Zap className="w-4 h-4 fill-white" />
                    <span>{language === 'en' ? 'Submit & Lock Rate' : 'নিশ্চিত করুন ও রেট লক করুন'}</span>
                  </button>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
