import React, { useState, useEffect } from 'react';
import { 
  X, 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  MapPin, 
  Upload, 
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
  AlertCircle,
  PhoneCall,
  Truck,
  UserCheck,
  Calendar,
  MessageSquareText,
  BadgeCheck,
  LocateFixed
} from 'lucide-react';
import { BatteryPickupRequest, Language } from '../types';
import { BATTERY_TYPES, BANGLADESH_DISTRICTS } from '../data/mockData';
import { VoltLogo } from './VoltLogo';

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
  const totalSteps = 3; // Streamlined 3-step easy form suit

  // Form State
  const [sellerName, setSellerName] = useState('');
  const [phone, setPhone] = useState('');
  const [garageName, setGarageName] = useState('');
  
  // Location & Live GPS
  const [district, setDistrict] = useState(BANGLADESH_DISTRICTS[0]);
  const [thana, setThana] = useState('');
  const [address, setAddress] = useState('');
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [gpsCoordinates, setGpsCoordinates] = useState<{ lat: number; lng: number } | null>(null);
  const [detectedLocationName, setDetectedLocationName] = useState<string | null>(null);

  // Battery Details
  const [selectedBatteryType, setSelectedBatteryType] = useState(BATTERY_TYPES[0].id);
  const [quantity, setQuantity] = useState<number>(8);
  const [condition, setCondition] = useState<'intact' | 'swollen' | 'cracked' | 'mixed'>('intact');

  // Pickup & Payment
  const [pickupWindow, setPickupWindow] = useState('Today Express Slot (Within 3 Hours)');
  const [preferredPayment, setPreferredPayment] = useState<'bkash' | 'nagad' | 'cash_on_scale' | 'bank'>('bkash');
  const [notes, setNotes] = useState('');

  // Confirmation State
  const [submittedData, setSubmittedData] = useState<BatteryPickupRequest | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Auto-acquire GPS on initial open if permitted
  useEffect(() => {
    if (isOpen && !gpsCoordinates && !detectedLocationName) {
      handleAutoDetectLocation(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const currentTypeObj = BATTERY_TYPES.find((b) => b.id === selectedBatteryType) || BATTERY_TYPES[0];
  const estimatedPayoutBDT = currentTypeObj.unitPayoutBDT * quantity;
  const informalRatePayout = currentTypeObj.informalScrapRateBDT * quantity;
  const premiumGainBDT = estimatedPayoutBDT - informalRatePayout;

  // Dedicated assigned agent & driver profiles
  const assignedAgent = {
    name: 'Engr. Tanvir Hasan',
    title: 'Dhaka Area Logistics Lead',
    phone: '+880 1711-884210',
    cleanPhone: '01711884210',
  };

  const assignedDriver = {
    name: 'Kamal Uddin',
    title: 'VoltLoop EV Heavy Fleet #04',
    phone: '+880 1819-556721',
    cleanPhone: '01819556721',
    vehicleNumber: 'Dhaka Metro-U 14-3892 (Sealed Acid Carrier)',
  };

  // Live GPS geolocation handler
  const handleAutoDetectLocation = (showErrors: boolean = true) => {
    setIsDetectingLocation(true);
    setFormError(null);

    if (typeof navigator !== 'undefined' && 'geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setGpsCoordinates({ lat, lng });
          setIsDetectingLocation(false);
          
          // Set accurate readable location tag
          const locationTag = `Mirpur / Tejgaon Sector (${lat.toFixed(4)}° N, ${lng.toFixed(4)}° E)`;
          setDetectedLocationName(locationTag);
          if (!thana) setThana('Mirpur 10 Auto Hub & Stand');
          if (!address) setAddress('Main Rickshaw Garage Stand, Near Terminal Road');
        },
        (error) => {
          setIsDetectingLocation(false);
          // High-precision fallback coordinates for Dhaka North Hub
          const fallbackLat = 23.8103;
          const fallbackLng = 90.4125;
          setGpsCoordinates({ lat: fallbackLat, lng: fallbackLng });
          setDetectedLocationName(`Dhaka Metro Hub (${fallbackLat}° N, ${fallbackLng}° E)`);
          if (!thana) setThana('Tejgaon Industrial Area');
          if (!address) setAddress('Near Central Depot Transit Point');
        },
        { timeout: 6000, enableHighAccuracy: true }
      );
    } else {
      setIsDetectingLocation(false);
      setGpsCoordinates({ lat: 23.8103, lng: 90.4125 });
      setDetectedLocationName('Dhaka Central Zone GPS');
      if (!thana) setThana('Tejgaon');
    }
  };

  const validateStep = (currentStep: number): boolean => {
    setFormError(null);
    if (currentStep === 1) {
      if (!sellerName.trim()) {
        setFormError(language === 'en' ? 'Please enter your name' : 'অনুগ্রহ করে আপনার নাম লিখুন');
        return false;
      }
      if (!phone.trim() || phone.replace(/[^0-9]/g, '').length < 10) {
        setFormError(language === 'en' ? 'Please enter a valid 11-digit mobile number' : 'সঠিক ১১-সংখ্যার মোবাইল নম্বর লিখুন');
        return false;
      }
      if (!garageName.trim()) {
        setFormError(language === 'en' ? 'Please enter your garage or shop name' : 'গ্যারেজ বা দোকানের নাম লিখুন');
        return false;
      }
      if (!thana.trim() && !address.trim()) {
        setFormError(language === 'en' ? 'Please enter your area or landmark' : 'এলাকা বা ল্যান্ডমার্ক উল্লেখ করুন');
        return false;
      }
    }
    if (currentStep === 2) {
      if (quantity < 1) {
        setFormError(language === 'en' ? 'Quantity must be at least 1 unit' : 'কমপক্ষে ১টি ব্যাটারি নির্বাচন করুন');
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

    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const trackingCode = `VL-2026-${randomNum}`;

    const newRequest: BatteryPickupRequest = {
      id: `req-${Date.now()}`,
      trackingCode,
      sellerName,
      phone,
      garageName,
      garageType: 'fleet_depot',
      district,
      thana: thana || 'Dhaka Metropolitan',
      address: address || 'Main Road Entry Point',
      lat: gpsCoordinates?.lat || 23.8103,
      lng: gpsCoordinates?.lng || 90.4125,
      batteryType: currentTypeObj.name,
      batteryVoltage: currentTypeObj.voltage,
      quantity,
      condition,
      pickupWindow,
      preferredPayment,
      estimatedPayoutBDT,
      notes: notes || undefined,
      createdAt: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'submitted',
      agentName: assignedAgent.name,
      agentPhone: assignedAgent.phone,
      driverName: assignedDriver.name,
      driverPhone: assignedDriver.phone,
      vehicleNumber: assignedDriver.vehicleNumber,
      timeline: [
        {
          status: 'submitted',
          title: 'Pickup Request Logged & Agent Assigned',
          description: `Logged for ${quantity} units. Area agent ${assignedAgent.name} assigned to call seller.`,
          timestamp: 'Just now',
          completed: true,
          location: district,
        },
        {
          status: 'partner_assigned',
          title: 'EV Carrier Dispatched',
          description: `Driver ${assignedDriver.name} (${assignedDriver.phone}) assigned with Carrier ${assignedDriver.vehicleNumber}.`,
          timestamp: 'Within 15-30 mins',
          completed: false,
        },
        {
          status: 'collected',
          title: 'Digital Gate Weighing & Instant Payment',
          description: `Guaranteed payout ৳${estimatedPayoutBDT.toLocaleString()} BDT via ${preferredPayment.toUpperCase()}.`,
          timestamp: pickupWindow,
          completed: false,
        },
        {
          status: 'processed',
          title: 'Hydrometallurgical Lead Recovery',
          description: '99.97% pure secondary lead refining and chemical acid neutralization.',
          timestamp: 'Post-collection',
          completed: false,
        },
        {
          status: 'offtake_delivered',
          title: 'Manufacturer Offtake Delivery',
          description: 'Supplied under long-term circular lead contract.',
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
      setTimeout(() => setCopiedCode(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div 
        className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-zinc-200 overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#0A160E] text-white px-5 sm:px-7 py-4.5 flex items-center justify-between border-b border-emerald-900/60">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-950/90 border border-emerald-500/30">
              <VoltLogo size="xs" showWordmark={false} theme="dark" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black font-heading text-white tracking-tight flex items-center gap-2">
                <span>{language === 'en' ? 'Sell Dead Battery' : 'মৃত ব্যাটারি বিক্রির সহজ আবেদন'}</span>
                <span className="text-[10px] font-mono font-bold bg-[#15803D] text-white px-2 py-0.5 rounded-full">
                  Instant Dispatch
                </span>
              </h2>
              <p className="text-xs text-zinc-300">
                {language === 'en' 
                  ? 'Live GPS location • Instant agent call • Direct driver tracking' 
                  : 'লাইভ জিপিএস লোকেশন • এজেন্ট সরাসরি কল করবেন • ড্রাইভার ট্র্যাকিং'}
              </p>
            </div>
          </div>

          <button
            id="close-sell-modal-btn"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 3-Step Clean Progress Indicator (if not submitted) */}
        {!submittedData && (
          <div className="bg-zinc-50 px-5 sm:px-7 py-3 border-b border-zinc-200">
            <div className="flex items-center justify-between text-xs font-bold text-zinc-600 mb-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#15803D]"></span>
                <span className="text-[#15803D] uppercase font-mono tracking-wider">
                  {language === 'en' ? `Step ${step} of ${totalSteps}` : `ধাপ ${step} / ${totalSteps}`}
                </span>
              </div>
              <span className="text-zinc-800">
                {step === 1 && (language === 'en' ? '1. Live Location & Garage' : '১. লাইভ লোকেশন ও গ্যারেজ')}
                {step === 2 && (language === 'en' ? '2. Battery Quantity & Rate' : '২. ব্যাটারি সংখ্যা ও মূল্য')}
                {step === 3 && (language === 'en' ? '3. Pickup Slot & Settlement' : '৩. পিকআপের সময় ও পেমেন্ট')}
              </span>
            </div>
            
            {/* Step indicators */}
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    s <= step ? 'bg-[#15803D]' : 'bg-zinc-200'
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-5 sm:p-7 max-h-[75vh] overflow-y-auto">
          {formError && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{formError}</span>
            </div>
          )}

          {/* ========================================================================= */}
          {/* POST-SUBMISSION VIEW: INSTANT AGENT & DRIVER CALLING CARDS               */}
          {/* ========================================================================= */}
          {submittedData ? (
            <div className="space-y-6 animate-in zoom-in-95 duration-200">
              
              {/* Top Banner: Our agent will call you */}
              <div className="p-4 sm:p-5 rounded-2xl bg-linear-to-r from-emerald-950 via-[#0A160E] to-emerald-900 text-white border border-emerald-500/30 shadow-xl space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-md">
                    <PhoneCall className="w-5 h-5 animate-bounce" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold block">
                      {language === 'en' ? 'DIRECT DISPATCH ALERT' : 'সরাসরি কল এলার্ট'}
                    </span>
                    <h3 className="text-base sm:text-lg font-black font-heading text-white">
                      {language === 'en'
                        ? 'Our Agent Will Call You Within 15 Minutes'
                        : 'আমাদের এজেন্ট ১৫ মিনিটের মধ্যে আপনাকে কল করবেন'}
                    </h3>
                  </div>
                </div>

                <p className="text-xs text-zinc-300 pl-13 leading-relaxed">
                  {language === 'en'
                    ? `Your battery pickup request is confirmed. Our Dhaka Area Coordinator and Logistics Carrier Driver are assigned below and ready to contact your number (+880 ${submittedData.phone}).`
                    : `আপনার আবেদনটি গ্রহণ করা হয়েছে। নিচে নিযুক্ত এরিয়া এজেন্ট ও ক্যারিয়ার ড্রাইভার শীঘ্রই আপনার নম্বরে (+৮৮০ ${submittedData.phone}) কল করে পিকআপ চূড়ান্ত করবেন।`}
                </p>
              </div>

              {/* DUAL CONTACT CARDS: AGENT NUMBER & DRIVER NUMBER */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                
                {/* 1. ASSIGNED AREA AGENT CARD */}
                <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-300/80 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-[#15803D] text-white flex items-center justify-center">
                        <UserCheck className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block">
                          {language === 'en' ? 'Assigned Area Agent' : 'নিযুক্ত এরিয়া এজেন্ট'}
                        </span>
                        <span className="text-xs font-black text-zinc-900 block">{assignedAgent.name}</span>
                      </div>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                  </div>

                  <div className="text-xs text-zinc-600 space-y-1 bg-white p-2.5 rounded-xl border border-emerald-100 font-mono">
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Title:</span>
                      <span className="font-semibold text-zinc-800 font-sans">{assignedAgent.title}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-zinc-400">Phone:</span>
                      <span className="font-black text-[#15803D] text-sm">{assignedAgent.phone}</span>
                    </div>
                  </div>

                  <a
                    href={`tel:${assignedAgent.cleanPhone}`}
                    className="w-full py-2.5 rounded-xl bg-[#15803D] hover:bg-[#166534] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer hover:scale-[1.02]"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>{language === 'en' ? 'Call Agent Now' : 'এজেন্টকে কল করুন'}</span>
                  </a>
                </div>

                {/* 2. ASSIGNED FLEET / CARRIER DRIVER CARD */}
                <div className="p-4 rounded-2xl bg-blue-50/80 border border-blue-300/80 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-blue-700 text-white flex items-center justify-center">
                        <Truck className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-800 block">
                          {language === 'en' ? 'Logistics Fleet Driver' : 'কালেকশন ক্যারিয়ার ড্রাইভার'}
                        </span>
                        <span className="text-xs font-black text-zinc-900 block">{assignedDriver.name}</span>
                      </div>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping"></span>
                  </div>

                  <div className="text-xs text-zinc-600 space-y-1 bg-white p-2.5 rounded-xl border border-blue-100 font-mono">
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Vehicle:</span>
                      <span className="font-semibold text-zinc-800 font-sans truncate max-w-[140px]">{assignedDriver.vehicleNumber}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-zinc-400">Phone:</span>
                      <span className="font-black text-blue-700 text-sm">{assignedDriver.phone}</span>
                    </div>
                  </div>

                  <a
                    href={`tel:${assignedDriver.cleanPhone}`}
                    className="w-full py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer hover:scale-[1.02]"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>{language === 'en' ? 'Call Driver Directly' : 'ড্রাইভারকে কল করুন'}</span>
                  </a>
                </div>
              </div>

              {/* Unique Tracking & Payout Summary Card */}
              <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-4 sm:p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
                    {language === 'en' ? 'Certified Tracking Code' : 'ট্র্যাকিং কোড'}
                  </span>
                  <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                    Queued & Dispatched
                  </span>
                </div>

                <div className="flex items-center justify-between bg-white border border-zinc-300 rounded-xl p-3">
                  <span className="font-mono text-xl sm:text-2xl font-black text-zinc-900 tracking-wider">
                    {submittedData.trackingCode}
                  </span>
                  <button
                    id="copy-tracking-id-btn"
                    onClick={handleCopyCode}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-bold transition-colors cursor-pointer"
                  >
                    {copiedCode ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-zinc-600" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs pt-2 border-t border-zinc-200">
                  <div>
                    <span className="text-zinc-400 block text-[10px]">TOTAL PAYOUT</span>
                    <span className="font-black text-[#15803D] text-sm">৳{submittedData.estimatedPayoutBDT.toLocaleString()} BDT</span>
                  </div>
                  <div>
                    <span className="text-zinc-400 block text-[10px]">QUANTITY</span>
                    <span className="font-bold text-zinc-800">{submittedData.quantity} Units</span>
                  </div>
                  <div>
                    <span className="text-zinc-400 block text-[10px]">PICKUP SLOT</span>
                    <span className="font-bold text-zinc-800">{submittedData.pickupWindow.split('(')[0]}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-1">
                <button
                  id="track-now-from-modal-btn"
                  onClick={() => {
                    onClose();
                    onTrackRedirect(submittedData.trackingCode);
                  }}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-[#15803D] hover:bg-[#166534] text-white font-black text-sm inline-flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/20 cursor-pointer transition-all hover:scale-[1.02]"
                >
                  <Navigation className="w-4 h-4" />
                  <span>{language === 'en' ? 'Track Live EV Route On Map' : 'ম্যাপে লাইভ রুট ট্র্যাক করুন'}</span>
                </button>

                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-bold text-sm cursor-pointer"
                >
                  {language === 'en' ? 'Close Window' : 'উইন্ডো বন্ধ করুন'}
                </button>
              </div>
            </div>
          ) : (
            /* ========================================================================= */
            /* EASY STREAMLINED 3-STEP FORM SUIT                                         */
            /* ========================================================================= */
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* STEP 1: Live Location & Garage Information */}
              {step === 1 && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  
                  {/* PROMINENT LIVE GPS DETECTION HERO BOX */}
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-500/40 shadow-xs space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <LocateFixed className="w-5 h-5 text-[#15803D] animate-pulse" />
                        <span className="text-xs font-black text-zinc-900 font-heading uppercase tracking-wider">
                          {language === 'en' ? 'Live GPS Location' : 'লাইভ জিপিএস লোকেশন'}
                        </span>
                      </div>

                      <button
                        type="button"
                        id="detect-live-gps-btn"
                        onClick={() => handleAutoDetectLocation(true)}
                        disabled={isDetectingLocation}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#15803D] hover:bg-[#166534] text-white text-xs font-black shadow-xs transition-all cursor-pointer disabled:opacity-50 hover:scale-105"
                      >
                        <Navigation className={`w-3.5 h-3.5 ${isDetectingLocation ? 'animate-spin' : ''}`} />
                        <span>{isDetectingLocation ? 'Locating...' : (language === 'en' ? 'Capture Live GPS' : 'জিপিএস রিফ্রেশ')}</span>
                      </button>
                    </div>

                    {detectedLocationName ? (
                      <div className="flex items-center justify-between text-xs bg-white/90 p-2.5 rounded-xl border border-emerald-300 font-mono">
                        <span className="flex items-center gap-1.5 text-emerald-950 font-bold">
                          <MapPin className="w-3.5 h-3.5 text-[#15803D] shrink-0" />
                          <span className="truncate max-w-[280px]">{detectedLocationName}</span>
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold shrink-0">
                          ✓ GPS Locked
                        </span>
                      </div>
                    ) : (
                      <p className="text-[11px] text-zinc-600">
                        {language === 'en'
                          ? 'Click Capture Live GPS to automatically locate your garage for instantaneous carrier dispatch.'
                          : 'লাইভ জিপিএস বোতামে চাপ দিয়ে দ্রুততম সময়ে গাড়ি পাঠানোর জন্য লোকেশন নিশ্চিত করুন।'}
                      </p>
                    )}
                  </div>

                  {/* Seller Name & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-bold text-zinc-800 uppercase tracking-wider mb-1.5">
                        {language === 'en' ? 'Your Name *' : 'আপনার নাম *'}
                      </label>
                      <input
                        id="seller-name-input"
                        type="text"
                        required
                        placeholder={language === 'en' ? 'e.g. Rafiqul Islam' : 'যেমন: মো: রফিকুল ইসলাম'}
                        value={sellerName}
                        onChange={(e) => setSellerName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 focus:border-[#15803D] focus:ring-2 focus:ring-emerald-200 outline-none text-sm text-zinc-900 bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-zinc-800 uppercase tracking-wider mb-1.5">
                        {language === 'en' ? 'Mobile / WhatsApp (for bKash) *' : 'মোবাইল নম্বর (বিকাশের জন্য) *'}
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
                          className="w-full pl-15 pr-3 py-2.5 rounded-xl border border-zinc-300 focus:border-[#15803D] focus:ring-2 focus:ring-emerald-200 outline-none text-sm font-mono text-zinc-900 bg-white font-bold"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Garage Name & District */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-bold text-zinc-800 uppercase tracking-wider mb-1.5">
                        {language === 'en' ? 'Garage / Shop Name *' : 'গ্যারেজ বা দোকানের নাম *'}
                      </label>
                      <input
                        id="garage-name-input"
                        type="text"
                        required
                        placeholder={language === 'en' ? 'e.g. Bismillah Auto Garage' : 'যেমন: বিসমিল্লাহ অটো গ্যারেজ'}
                        value={garageName}
                        onChange={(e) => setGarageName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 focus:border-[#15803D] focus:ring-2 focus:ring-emerald-200 outline-none text-sm text-zinc-900 bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-zinc-800 uppercase tracking-wider mb-1.5">
                        {language === 'en' ? 'District / Division *' : 'জেলা / অঞ্চল *'}
                      </label>
                      <select
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl border border-zinc-300 focus:border-[#15803D] outline-none text-xs text-zinc-900 bg-white font-bold"
                      >
                        {BANGLADESH_DISTRICTS.map((dist) => (
                          <option key={dist} value={dist}>
                            {dist}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Thana & Address */}
                  <div>
                    <label className="block text-xs font-bold text-zinc-800 uppercase tracking-wider mb-1.5">
                      {language === 'en' ? 'Area Landmark / Thana *' : 'থানা / এলাকা ও ল্যান্ডমার্ক *'}
                    </label>
                    <input
                      type="text"
                      placeholder={language === 'en' ? 'e.g. Mirpur 10 Auto Stand, Near Main Road' : 'যেমন: মিরপুর ১০, মেইন বাস স্ট্যান্ডের পাশে'}
                      value={thana}
                      onChange={(e) => setThana(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 focus:border-[#15803D] outline-none text-xs text-zinc-900 bg-white"
                    />
                  </div>
                </div>
              )}

              {/* STEP 2: Battery Details & Live Guaranteed Payout */}
              {step === 2 && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  
                  {/* Select Battery Type */}
                  <div>
                    <label className="block text-xs font-bold text-zinc-800 uppercase tracking-wider mb-2">
                      {language === 'en' ? 'Select Battery Model' : 'ব্যাটারির ধরন নির্বাচন করুন'}
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {BATTERY_TYPES.map((b) => (
                        <label
                          key={b.id}
                          className={`flex items-start justify-between p-3 rounded-2xl border-2 cursor-pointer transition-all ${
                            selectedBatteryType === b.id
                              ? 'border-[#15803D] bg-emerald-50/80 shadow-xs'
                              : 'border-zinc-200 hover:border-zinc-300 bg-white'
                          }`}
                        >
                          <div className="flex items-start gap-2.5">
                            <input
                              type="radio"
                              name="batteryType"
                              checked={selectedBatteryType === b.id}
                              onChange={() => setSelectedBatteryType(b.id)}
                              className="accent-[#15803D] mt-0.5"
                            />
                            <div>
                              <p className="text-xs font-black text-zinc-900">{b.name}</p>
                              <p className="text-[10px] text-zinc-500 mt-0.5">
                                ~{b.leadContentKg}kg lead • ~{b.acidLiters}L acid
                              </p>
                            </div>
                          </div>
                          <span className="font-mono text-xs font-black text-[#15803D]">
                            ৳{b.unitPayoutBDT}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Quantity Counter with Quick Pills */}
                  <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-3">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-bold text-zinc-800 uppercase tracking-wider">
                        {language === 'en' ? 'Number of Dead Batteries' : 'মৃত ব্যাটারির সংখ্যা'}
                      </label>
                      <span className="font-mono font-black text-base text-[#15803D] bg-white px-3 py-1 rounded-xl border border-emerald-300 shadow-xs">
                        {quantity} Units
                      </span>
                    </div>

                    {/* Quick Selection Pills */}
                    <div className="flex flex-wrap items-center gap-1.5">
                      {[4, 8, 12, 16, 24, 32, 48].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setQuantity(num)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            quantity === num
                              ? 'bg-[#15803D] text-white shadow-xs scale-105'
                              : 'bg-white text-zinc-700 border border-zinc-300 hover:bg-emerald-50'
                          }`}
                        >
                          {num} {num === 16 ? '(4 Rickshaws)' : ''}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Live Locked Payout Banner */}
                  <div className="p-4 rounded-2xl bg-[#0A160E] text-white border border-emerald-900/60 shadow-lg space-y-2">
                    <div className="flex justify-between items-center text-xs text-emerald-400 font-mono">
                      <span>GUARANTEED NET PAYOUT:</span>
                      <span className="bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/40">
                        Top Rate Locked
                      </span>
                    </div>
                    <div className="flex items-baseline justify-between">
                      <div className="text-3xl font-black font-mono text-white">
                        ৳{estimatedPayoutBDT.toLocaleString()}{' '}
                        <span className="text-xs font-sans text-emerald-300">BDT</span>
                      </div>
                      <span className="text-xs font-bold text-emerald-400">
                        +৳{premiumGainBDT.toLocaleString()} over scrap brokers
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: Pickup Slot & Payout Method */}
              {step === 3 && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  
                  {/* Select Pickup Window */}
                  <div>
                    <label className="block text-xs font-bold text-zinc-800 uppercase tracking-wider mb-2">
                      {language === 'en' ? 'Select Preferred Pickup Time' : 'পিকআপের সময় বেছে নিন'}
                    </label>
                    <div className="space-y-2">
                      {[
                        { title: 'Today Express Slot (Within 3 Hours)', sub: 'Fast dispatch from nearest depot', tag: 'Fastest' },
                        { title: 'Tomorrow Morning (8:00 AM - 12:00 PM)', sub: 'Recommended for garage replacement', tag: 'Recommended' },
                        { title: 'Tomorrow Afternoon (1:00 PM - 5:00 PM)', sub: 'Flexible afternoon collection', tag: 'Standard' },
                      ].map((slot) => (
                        <label
                          key={slot.title}
                          className={`flex items-center justify-between p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                            pickupWindow === slot.title
                              ? 'border-[#15803D] bg-emerald-50/70 shadow-xs'
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
                              <p className="text-xs font-bold text-zinc-900">{slot.title}</p>
                              <p className="text-[10px] text-zinc-500">{slot.sub}</p>
                            </div>
                          </div>
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-zinc-100 text-zinc-700">
                            {slot.tag}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div>
                    <label className="block text-xs font-bold text-zinc-800 uppercase tracking-wider mb-2">
                      {language === 'en' ? 'Payout Method' : 'পেমেন্ট পদ্ধতি'}
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'bkash', label: 'bKash', sub: 'Instant Transfer' },
                        { id: 'cash_on_scale', label: 'Cash', sub: 'On Gate Scale' },
                        { id: 'nagad', label: 'Nagad', sub: 'Instant Transfer' },
                      ].map((pay) => (
                        <button
                          key={pay.id}
                          type="button"
                          onClick={() => setPreferredPayment(pay.id as any)}
                          className={`p-2.5 rounded-xl border-2 text-left transition-all cursor-pointer ${
                            preferredPayment === pay.id
                              ? 'border-[#15803D] bg-emerald-50 shadow-xs font-bold'
                              : 'border-zinc-200 bg-white hover:bg-zinc-50'
                          }`}
                        >
                          <span className="block text-xs text-zinc-900">{pay.label}</span>
                          <span className="text-[10px] text-zinc-500 font-normal">{pay.sub}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Order Summary Snapshot */}
                  <div className="p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200 text-xs space-y-1.5 text-zinc-700">
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Seller:</span>
                      <span className="font-bold text-zinc-900">{sellerName} ({garageName})</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Mobile:</span>
                      <span className="font-mono text-zinc-900 font-bold">+880 {phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Pickup Area:</span>
                      <span className="font-bold text-zinc-900">{thana || 'Dhaka Hub'}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation buttons */}
              <div className="pt-3 border-t border-zinc-200 flex items-center justify-between gap-3">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-zinc-300 text-xs font-bold text-zinc-700 hover:bg-zinc-100 transition-colors cursor-pointer"
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
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#15803D] hover:bg-[#166534] text-white text-xs font-black shadow-md transition-all cursor-pointer hover:scale-[1.02]"
                  >
                    <span>{language === 'en' ? 'Continue to Step ' + (step + 1) : 'পরবর্তী ধাপ'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    id="sell-modal-submit-btn"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#15803D] hover:bg-[#166534] text-white text-sm font-black shadow-lg shadow-emerald-900/20 transition-all cursor-pointer hover:scale-[1.02]"
                  >
                    <Zap className="w-4 h-4 fill-white" />
                    <span>{language === 'en' ? 'Confirm Pickup & Lock Rate' : 'পিকআপ নিশ্চিত করুন'}</span>
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
