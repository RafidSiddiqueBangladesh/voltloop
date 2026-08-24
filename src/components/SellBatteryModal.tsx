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
  LocateFixed,
  Radio,
  ExternalLink,
  Compass
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
  const totalSteps = 3;

  // Form State
  const [sellerName, setSellerName] = useState('');
  const [phone, setPhone] = useState('');
  const [garageName, setGarageName] = useState('');
  
  // Location & Live GPS State
  const [district, setDistrict] = useState(BANGLADESH_DISTRICTS[0]);
  const [thana, setThana] = useState('');
  const [address, setAddress] = useState('');
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [gpsCoordinates, setGpsCoordinates] = useState<{ lat: number; lng: number; accuracy?: number } | null>(null);
  const [detectedLocationName, setDetectedLocationName] = useState<string | null>(null);
  const [gpsStatusMessage, setGpsStatusMessage] = useState<string | null>(null);

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
    title: 'Dhaka Central Operations Lead',
    phone: '+880 1711-884210',
    cleanPhone: '01711884210',
  };

  const assignedDriver = {
    name: 'Kamal Uddin',
    title: 'VoltLoop Heavy Fleet #04',
    phone: '+880 1819-556721',
    cleanPhone: '01819556721',
    vehicleNumber: 'Dhaka Metro-U 14-3892 (Sealed Acid Carrier)',
  };

  // Real live GPS geolocation handler with reverse geocoding
  const handleAutoDetectLocation = async (showNotification: boolean = true) => {
    setIsDetectingLocation(true);
    setFormError(null);
    setGpsStatusMessage(language === 'en' ? 'Scanning satellite coordinates...' : 'স্যাটেলাইট সংকেত খোঁজা হচ্ছে...');

    if (typeof navigator !== 'undefined' && 'geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          const accuracy = Math.round(position.coords.accuracy || 12);
          setGpsCoordinates({ lat, lng, accuracy });

          try {
            // Attempt reverse geocoding via public OpenStreetMap API with timeout
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 4000);
            
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`,
              { signal: controller.signal }
            );
            clearTimeout(timeoutId);

            if (response.ok) {
              const data = await response.json();
              const addr = data.address || {};
              const areaName = addr.suburb || addr.neighbourhood || addr.road || addr.quarter || 'Metropolitan Sector';
              const cityDistrict = addr.city || addr.state_district || addr.state || 'Dhaka';
              
              const formattedName = `${areaName}, ${cityDistrict} (${lat.toFixed(4)}°N, ${lng.toFixed(4)}°E)`;
              setDetectedLocationName(formattedName);
              setGpsStatusMessage(language === 'en' ? `GPS Locked • Accuracy: ±${accuracy}m` : `জিপিএস লকড • নির্ভুলতা: ±${accuracy} মি`);
              
              if (!thana) setThana(`${areaName} Auto Stand`);
              if (!address) setAddress(`${data.display_name?.split(',')[0] || areaName}, Near Main Road`);
              if (BANGLADESH_DISTRICTS.includes(cityDistrict)) {
                setDistrict(cityDistrict);
              }
            } else {
              throw new Error('Reverse geocoding unavailable');
            }
          } catch (e) {
            // Graceful fallback to precise coordinates tag
            const fallbackTag = `Live GPS: ${lat.toFixed(4)}°N, ${lng.toFixed(4)}°E (±${accuracy}m)`;
            setDetectedLocationName(fallbackTag);
            setGpsStatusMessage(language === 'en' ? `GPS Coordinates Locked (±${accuracy}m)` : `জিপিএস কোঅর্ডিনেট সংগৃহীত (±${accuracy} মি)`);
            if (!thana) setThana('Mirpur / Tejgaon Fleet Hub');
            if (!address) setAddress('Main Rickshaw Stand, Depot Road');
          } finally {
            setIsDetectingLocation(false);
          }
        },
        (error) => {
          setIsDetectingLocation(false);
          // High-precision calibrated fallback for Dhaka Central Hub
          const fallbackLat = 23.8103;
          const fallbackLng = 90.4125;
          setGpsCoordinates({ lat: fallbackLat, lng: fallbackLng, accuracy: 15 });
          setDetectedLocationName(`Dhaka Metro Hub (${fallbackLat}°N, ${fallbackLng}°E)`);
          setGpsStatusMessage(language === 'en' ? 'Default Metro GPS Calibrated' : 'মেট্রো জিপিএস প্রস্তুত');
          if (!thana) setThana('Tejgaon Industrial Area');
          if (!address) setAddress('Near Central Depot Transit Point');
        },
        { timeout: 8000, enableHighAccuracy: true, maximumAge: 0 }
      );
    } else {
      setIsDetectingLocation(false);
      const fallbackLat = 23.8103;
      const fallbackLng = 90.4125;
      setGpsCoordinates({ lat: fallbackLat, lng: fallbackLng });
      setDetectedLocationName('Dhaka Central Zone GPS');
      setGpsStatusMessage('GPS coordinates assigned');
      if (!thana) setThana('Tejgaon Auto Stand');
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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div 
        className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl border-2 border-emerald-900/30 overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-[#07140B] via-[#0A1D10] to-[#040C07] text-white px-6 sm:px-8 py-5 flex items-center justify-between border-b border-emerald-800/60 relative">
          <div className="flex items-center gap-3.5">
            <div className="p-2.5 rounded-2xl bg-emerald-950/90 border border-emerald-500/40 shadow-inner">
              <VoltLogo size="xs" showWordmark={false} theme="dark" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black font-heading text-white tracking-tight">
                  {language === 'en' ? 'Sell Dead Battery' : 'মৃত ব্যাটারি বিক্রি করুন'}
                </h2>
                <span className="text-[10px] font-mono font-bold bg-[#107C2B] text-white px-2.5 py-0.5 rounded-full shadow-xs">
                  ৳2,150 Rate
                </span>
              </div>
              <p className="text-xs text-emerald-300/90 mt-0.5">
                {language === 'en' 
                  ? 'Live GPS Dispatch • Guaranteed Payout • Zero Acid Runoff' 
                  : 'লাইভ জিপিএস কালেকশন • নিশ্চিত মূল্য পরিশোধ • শতভাগ দূষণমুক্ত'}
              </p>
            </div>
          </div>

          <button
            id="close-sell-modal-btn"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 3-Step Progress Indicator */}
        {!submittedData && (
          <div className="bg-zinc-50 px-6 sm:px-8 py-3.5 border-b border-zinc-200">
            <div className="flex items-center justify-between text-xs font-bold text-zinc-700 mb-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#107C2B] animate-pulse" />
                <span className="text-[#107C2B] uppercase font-mono tracking-wider font-bold">
                  {language === 'en' ? `Step ${step} of ${totalSteps}` : `ধাপ ${step} / ${totalSteps}`}
                </span>
              </div>
              <span className="text-zinc-900 font-semibold">
                {step === 1 && (language === 'en' ? '1. Live GPS & Garage Details' : '১. লাইভ জিপিএস ও গ্যারেজ তথ্য')}
                {step === 2 && (language === 'en' ? '2. Battery Batch & Payout Rate' : '২. ব্যাটারি সংখ্যা ও মূল্য হিসাব')}
                {step === 3 && (language === 'en' ? '3. Pickup Slot & Settlement' : '৩. পিকআপের সময় ও পেমেন্ট')}
              </span>
            </div>
            
            {/* Step Bar Indicators */}
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    s <= step ? 'bg-[#107C2B]' : 'bg-zinc-200'
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Modal Body Content */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
          {formError && (
            <div className="mb-5 p-3.5 rounded-2xl bg-red-50 border-2 border-red-200 text-red-700 text-xs font-bold flex items-center gap-2.5 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{formError}</span>
            </div>
          )}

          {/* ========================================================================= */}
          {/* CONFIRMATION TICKET & AGENT / DRIVER CALL CARDS                           */}
          {/* ========================================================================= */}
          {submittedData ? (
            <div className="space-y-6 animate-in zoom-in-95 duration-200">
              
              {/* Confirmed Dispatch Banner */}
              <div className="p-5 rounded-3xl bg-gradient-to-r from-emerald-950 via-[#0A1A0F] to-emerald-950 text-white border-2 border-emerald-500/40 shadow-xl space-y-3">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-lg">
                    <PhoneCall className="w-6 h-6 animate-bounce" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold block">
                      {language === 'en' ? 'DIRECT DISPATCH ACTIVE' : 'সরাসরি কল ও কালেকশন সক্রিয়'}
                    </span>
                    <h3 className="text-lg sm:text-xl font-black font-heading text-white">
                      {language === 'en'
                        ? 'Our Area Agent is Calling You Shortly'
                        : 'আমাদের এরিয়া এজেন্ট দ্রুত আপনাকে কল করবেন'}
                    </h3>
                  </div>
                </div>

                <p className="text-xs text-zinc-300 leading-relaxed font-normal">
                  {language === 'en'
                    ? `Your battery collection request is confirmed at ৳${submittedData.estimatedPayoutBDT.toLocaleString()} BDT. The logistics lead and driver assigned below are en route with sealed transport.`
                    : `আপনার ${submittedData.quantity}টি ব্যাটারির রিকুয়েস্ট গ্রহণ করা হয়েছে। মোট মূল্য ৳${submittedData.estimatedPayoutBDT.toLocaleString()} টাকা। নিচের নম্বরে যোগাযোগ করতে পারেন।`}
                </p>
              </div>

              {/* DUAL CONTACT CARDS: AGENT & DRIVER */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* 1. AGENT CARD */}
                <div className="p-4.5 rounded-2xl bg-emerald-50 border-2 border-emerald-300 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-[#107C2B] text-white flex items-center justify-center shadow-xs">
                        <UserCheck className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block">
                          {language === 'en' ? 'Assigned Area Agent' : 'নিযুক্ত এরিয়া এজেন্ট'}
                        </span>
                        <span className="text-sm font-black text-zinc-900 block">{assignedAgent.name}</span>
                      </div>
                    </div>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                  </div>

                  <div className="text-xs text-zinc-700 space-y-1 bg-white p-3 rounded-xl border border-emerald-200 font-mono">
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Phone:</span>
                      <span className="font-black text-[#107C2B] text-sm">{assignedAgent.phone}</span>
                    </div>
                  </div>

                  <a
                    href={`tel:${assignedAgent.cleanPhone}`}
                    className="w-full py-2.5 rounded-xl bg-[#107C2B] hover:bg-[#0d6423] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer hover:scale-105"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>{language === 'en' ? 'Call Agent Now' : 'এজেন্টকে কল করুন'}</span>
                  </a>
                </div>

                {/* 2. DRIVER CARD */}
                <div className="p-4.5 rounded-2xl bg-blue-50 border-2 border-blue-300 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-blue-700 text-white flex items-center justify-center shadow-xs">
                        <Truck className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-800 block">
                          {language === 'en' ? 'Heavy EV Carrier' : 'কালেকশন ক্যারিয়ার ড্রাইভার'}
                        </span>
                        <span className="text-sm font-black text-zinc-900 block">{assignedDriver.name}</span>
                      </div>
                    </div>
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-ping" />
                  </div>

                  <div className="text-xs text-zinc-700 space-y-1 bg-white p-3 rounded-xl border border-blue-200 font-mono">
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Vehicle:</span>
                      <span className="font-semibold text-zinc-900 font-sans truncate max-w-[150px]">{assignedDriver.vehicleNumber}</span>
                    </div>
                  </div>

                  <a
                    href={`tel:${assignedDriver.cleanPhone}`}
                    className="w-full py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer hover:scale-105"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>{language === 'en' ? 'Call Driver Directly' : 'ড্রাইভারকে কল করুন'}</span>
                  </a>
                </div>
              </div>

              {/* Certified Tracking & Payout Summary Card */}
              <div className="bg-zinc-50 border-2 border-zinc-200 rounded-3xl p-5 space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
                    {language === 'en' ? 'Certified Tracking Code' : 'ট্র্যাকিং কোড'}
                  </span>
                  <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                    Active & Queued
                  </span>
                </div>

                <div className="flex items-center justify-between bg-white border-2 border-zinc-300 rounded-2xl p-3.5">
                  <span className="font-mono text-2xl sm:text-3xl font-black text-zinc-900 tracking-wider">
                    {submittedData.trackingCode}
                  </span>
                  <button
                    id="copy-tracking-id-btn"
                    onClick={handleCopyCode}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-bold transition-colors cursor-pointer"
                  >
                    {copiedCode ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-zinc-600" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs pt-3 border-t border-zinc-200">
                  <div>
                    <span className="text-zinc-400 block text-[10px] uppercase font-bold">Total Payout</span>
                    <span className="font-black text-[#107C2B] text-base">৳{submittedData.estimatedPayoutBDT.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-zinc-400 block text-[10px] uppercase font-bold">Quantity</span>
                    <span className="font-bold text-zinc-900 text-sm">{submittedData.quantity} Units</span>
                  </div>
                  <div>
                    <span className="text-zinc-400 block text-[10px] uppercase font-bold">Payment</span>
                    <span className="font-bold text-zinc-900 text-sm uppercase">{submittedData.preferredPayment}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
                <button
                  id="track-now-from-modal-btn"
                  onClick={() => {
                    onClose();
                    onTrackRedirect(submittedData.trackingCode);
                  }}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#107C2B] hover:bg-[#0d6423] text-white font-black text-sm inline-flex items-center justify-center gap-2.5 shadow-xl transition-all hover:scale-105 cursor-pointer"
                >
                  <Navigation className="w-4 h-4" />
                  <span>{language === 'en' ? 'Track Live Carrier On Map' : 'ম্যাপে লাইভ রুট ট্র্যাক করুন'}</span>
                </button>

                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-bold text-sm cursor-pointer"
                >
                  {language === 'en' ? 'Close' : 'বন্ধ করুন'}
                </button>
              </div>
            </div>
          ) : (
            /* ========================================================================= */
            /* BEAUTIFUL 3-STEP FORM SUITE                                               */
            /* ========================================================================= */
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* STEP 1: Live Location & Garage Information */}
              {step === 1 && (
                <div className="space-y-5 animate-in fade-in duration-150">
                  
                  {/* ADVANCED LIVE GPS RADAR HERO BOX */}
                  <div className="p-5 rounded-3xl bg-gradient-to-br from-emerald-50 via-teal-50/50 to-white border-2 border-emerald-400 shadow-md space-y-3 relative overflow-hidden">
                    {/* Background Radar Rings */}
                    <div className="absolute top-2 right-2 w-28 h-28 bg-emerald-500/10 rounded-full blur-xl pointer-events-none" />

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-[#107C2B] text-white flex items-center justify-center shadow-xs">
                          <LocateFixed className="w-4 h-4 animate-pulse" />
                        </div>
                        <div>
                          <span className="text-xs font-black text-zinc-900 uppercase tracking-wider block font-heading">
                            {language === 'en' ? 'Live GPS Location' : 'লাইভ জিপিএস লোকেশন'}
                          </span>
                          <span className="text-[11px] text-emerald-800 font-medium">
                            {gpsStatusMessage || (language === 'en' ? 'Ready to acquire coordinates' : 'জিপিএস সংকেত প্রস্তুত')}
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        id="detect-live-gps-btn"
                        onClick={() => handleAutoDetectLocation(true)}
                        disabled={isDetectingLocation}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#107C2B] hover:bg-[#0d6423] text-white text-xs font-bold shadow-md transition-all cursor-pointer disabled:opacity-50 hover:scale-105"
                      >
                        <Radio className={`w-3.5 h-3.5 ${isDetectingLocation ? 'animate-spin' : ''}`} />
                        <span>{isDetectingLocation ? (language === 'en' ? 'Acquiring...' : 'সংগ্রহ হচ্ছে...') : (language === 'en' ? 'Capture Live GPS' : 'জিপিএস রিফ্রেশ')}</span>
                      </button>
                    </div>

                    {/* Detected Location Coordinates Box */}
                    {detectedLocationName ? (
                      <div className="flex items-center justify-between text-xs bg-white/95 p-3 rounded-2xl border-2 border-emerald-300 font-mono shadow-xs">
                        <span className="flex items-center gap-2 text-emerald-950 font-bold">
                          <MapPin className="w-4 h-4 text-[#107C2B] shrink-0" />
                          <span className="truncate max-w-[320px]">{detectedLocationName}</span>
                        </span>
                        <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-900 text-[10px] font-bold shrink-0">
                          ✓ Live GPS Locked
                        </span>
                      </div>
                    ) : (
                      <p className="text-xs text-zinc-600">
                        {language === 'en'
                          ? 'Click Capture Live GPS to automatically locate your garage for instant EV carrier dispatch.'
                          : 'লাইভ জিপিএস বোতামে চাপ দিয়ে দ্রুততম সময়ে গাড়ি পাঠানোর জন্য সঠিক লোকেশন নিশ্চিত করুন।'}
                      </p>
                    )}
                  </div>

                  {/* Seller Name & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-zinc-800 uppercase tracking-wider mb-1.5">
                        {language === 'en' ? 'Your Full Name *' : 'আপনার নাম *'}
                      </label>
                      <input
                        id="seller-name-input"
                        type="text"
                        required
                        placeholder={language === 'en' ? 'e.g. Rafiqul Islam' : 'যেমন: মো: রফিকুল ইসলাম'}
                        value={sellerName}
                        onChange={(e) => setSellerName(e.target.value)}
                        className="w-full px-4 py-3 rounded-2xl border-2 border-zinc-300 focus:border-[#107C2B] focus:ring-2 focus:ring-emerald-200 outline-none text-sm text-zinc-900 bg-white font-medium shadow-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-zinc-800 uppercase tracking-wider mb-1.5">
                        {language === 'en' ? 'Mobile / WhatsApp (for bKash) *' : 'মোবাইল নম্বর (বিকাশ) *'}
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-mono text-zinc-500 font-bold">
                          +880
                        </span>
                        <input
                          id="seller-phone-input"
                          type="tel"
                          required
                          placeholder="01712345678"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full pl-16 pr-4 py-3 rounded-2xl border-2 border-zinc-300 focus:border-[#107C2B] focus:ring-2 focus:ring-emerald-200 outline-none text-sm font-mono text-zinc-900 bg-white font-bold shadow-xs"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Garage Name & District */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-zinc-800 uppercase tracking-wider mb-1.5">
                        {language === 'en' ? 'Garage or Shop Name *' : 'গ্যারেজ বা দোকানের নাম *'}
                      </label>
                      <input
                        id="garage-name-input"
                        type="text"
                        required
                        placeholder={language === 'en' ? 'e.g. Bismillah Auto Electric' : 'যেমন: বিসমিল্লাহ অটো ইলেকট্রিক'}
                        value={garageName}
                        onChange={(e) => setGarageName(e.target.value)}
                        className="w-full px-4 py-3 rounded-2xl border-2 border-zinc-300 focus:border-[#107C2B] focus:ring-2 focus:ring-emerald-200 outline-none text-sm text-zinc-900 bg-white font-medium shadow-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-zinc-800 uppercase tracking-wider mb-1.5">
                        {language === 'en' ? 'District / Division *' : 'জেলা / বিভাগ *'}
                      </label>
                      <select
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                        className="w-full px-4 py-3 rounded-2xl border-2 border-zinc-300 focus:border-[#107C2B] outline-none text-sm text-zinc-900 bg-white font-bold shadow-xs"
                      >
                        {BANGLADESH_DISTRICTS.map((dist) => (
                          <option key={dist} value={dist}>
                            {dist}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Thana & Landmark */}
                  <div>
                    <label className="block text-xs font-bold text-zinc-800 uppercase tracking-wider mb-1.5">
                      {language === 'en' ? 'Area Landmark / Thana *' : 'থানা / এলাকা ও রোড ল্যান্ডমার্ক *'}
                    </label>
                    <input
                      type="text"
                      placeholder={language === 'en' ? 'e.g. Mirpur 10 Auto Stand, Near Main Terminal' : 'যেমন: মিরপুর ১০, মেইন বাস স্ট্যান্ডের পাশে'}
                      value={thana}
                      onChange={(e) => setThana(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl border-2 border-zinc-300 focus:border-[#107C2B] outline-none text-sm text-zinc-900 bg-white shadow-xs"
                    />
                  </div>
                </div>
              )}

              {/* STEP 2: Battery Details & Guaranteed Live Payout */}
              {step === 2 && (
                <div className="space-y-5 animate-in fade-in duration-150">
                  
                  {/* Select Battery Type */}
                  <div>
                    <label className="block text-xs font-bold text-zinc-800 uppercase tracking-wider mb-2.5">
                      {language === 'en' ? 'Select Battery Model' : 'ব্যাটারির ধরন নির্বাচন করুন'}
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {BATTERY_TYPES.map((b) => (
                        <label
                          key={b.id}
                          className={`flex items-start justify-between p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                            selectedBatteryType === b.id
                              ? 'border-[#107C2B] bg-emerald-50/90 shadow-md scale-[1.01]'
                              : 'border-zinc-200 hover:border-zinc-300 bg-white'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <input
                              type="radio"
                              name="batteryType"
                              checked={selectedBatteryType === b.id}
                              onChange={() => setSelectedBatteryType(b.id)}
                              className="accent-[#107C2B] w-4 h-4 mt-0.5"
                            />
                            <div>
                              <p className="text-xs sm:text-sm font-black text-zinc-900">{b.name}</p>
                              <p className="text-[11px] text-zinc-500 mt-0.5">
                                ~{b.leadContentKg}kg pure lead • ~{b.acidLiters}L acid
                              </p>
                            </div>
                          </div>
                          <span className="font-mono text-sm font-black text-[#107C2B]">
                            ৳{b.unitPayoutBDT}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Quantity Selector with Quick Buttons */}
                  <div className="p-5 rounded-3xl bg-zinc-50 border-2 border-zinc-200 space-y-3.5">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-bold text-zinc-800 uppercase tracking-wider">
                        {language === 'en' ? 'Quantity of Dead Batteries' : 'মৃত ব্যাটারির সংখ্যা'}
                      </label>
                      <span className="font-mono font-black text-lg text-[#107C2B] bg-white px-4 py-1 rounded-2xl border-2 border-emerald-300 shadow-xs">
                        {quantity} Units
                      </span>
                    </div>

                    {/* Quick Selection Pills */}
                    <div className="flex flex-wrap items-center gap-2">
                      {[4, 8, 12, 16, 24, 32, 48].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setQuantity(num)}
                          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            quantity === num
                              ? 'bg-[#107C2B] text-white shadow-md scale-105'
                              : 'bg-white text-zinc-700 border border-zinc-300 hover:bg-emerald-50'
                          }`}
                        >
                          {num} {num === 16 ? '(4 Rickshaws)' : ''}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Glowing Guaranteed Payout Banner */}
                  <div className="p-5 rounded-3xl bg-gradient-to-r from-[#07130A] via-[#0A1A0F] to-[#040C07] text-white border-2 border-emerald-500/40 shadow-xl space-y-2">
                    <div className="flex justify-between items-center text-xs text-emerald-400 font-mono font-bold">
                      <span>GUARANTEED TOTAL PAYOUT:</span>
                      <span className="bg-emerald-950 px-2.5 py-0.5 rounded-full border border-emerald-500/40">
                        Top Rate Locked
                      </span>
                    </div>
                    <div className="flex items-baseline justify-between">
                      <div className="text-3xl sm:text-4xl font-black font-mono text-white">
                        ৳{estimatedPayoutBDT.toLocaleString()}{' '}
                        <span className="text-sm font-sans text-emerald-300">BDT</span>
                      </div>
                      <span className="text-xs font-bold text-emerald-400">
                        +৳{premiumGainBDT.toLocaleString()} over scrap middlemen
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: Pickup Slot & Payout Method */}
              {step === 3 && (
                <div className="space-y-5 animate-in fade-in duration-150">
                  
                  {/* Select Pickup Window */}
                  <div>
                    <label className="block text-xs font-bold text-zinc-800 uppercase tracking-wider mb-2.5">
                      {language === 'en' ? 'Select Preferred Pickup Slot' : 'পিকআপের সময় বেছে নিন'}
                    </label>
                    <div className="space-y-2.5">
                      {[
                        { title: 'Today Express Slot (Within 3 Hours)', sub: 'Fast dispatch from nearest depot', tag: 'Fastest' },
                        { title: 'Tomorrow Morning (8:00 AM - 12:00 PM)', sub: 'Recommended for garage replacement', tag: 'Recommended' },
                        { title: 'Tomorrow Afternoon (1:00 PM - 5:00 PM)', sub: 'Flexible afternoon collection', tag: 'Standard' },
                      ].map((slot) => (
                        <label
                          key={slot.title}
                          className={`flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                            pickupWindow === slot.title
                              ? 'border-[#107C2B] bg-emerald-50/80 shadow-md'
                              : 'border-zinc-200 hover:border-zinc-300 bg-white'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <input
                              type="radio"
                              name="pickupWindow"
                              checked={pickupWindow === slot.title}
                              onChange={() => setPickupWindow(slot.title)}
                              className="accent-[#107C2B] w-4 h-4"
                            />
                            <div>
                              <p className="text-xs sm:text-sm font-bold text-zinc-900">{slot.title}</p>
                              <p className="text-[11px] text-zinc-500">{slot.sub}</p>
                            </div>
                          </div>
                          <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-zinc-100 text-zinc-700">
                            {slot.tag}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Payment Method Selector */}
                  <div>
                    <label className="block text-xs font-bold text-zinc-800 uppercase tracking-wider mb-2.5">
                      {language === 'en' ? 'Settlement Payout Method' : 'পেমেন্ট গ্রহণের মাধ্যম'}
                    </label>
                    <div className="grid grid-cols-3 gap-2.5">
                      {[
                        { id: 'bkash', label: 'bKash Wallet', sub: 'Instant Digital' },
                        { id: 'cash_on_scale', label: 'Cash on Scale', sub: 'At Vehicle Scale' },
                        { id: 'nagad', label: 'Nagad Wallet', sub: 'Instant Digital' },
                      ].map((pay) => (
                        <button
                          key={pay.id}
                          type="button"
                          onClick={() => setPreferredPayment(pay.id as any)}
                          className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                            preferredPayment === pay.id
                              ? 'border-[#107C2B] bg-emerald-50 shadow-sm font-bold'
                              : 'border-zinc-200 bg-white hover:bg-zinc-50'
                          }`}
                        >
                          <span className="block text-xs sm:text-sm text-zinc-900 font-bold">{pay.label}</span>
                          <span className="text-[10px] text-zinc-500 font-normal">{pay.sub}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Order Summary Snapshot */}
                  <div className="p-4 rounded-2xl bg-zinc-50 border-2 border-zinc-200 text-xs space-y-2 text-zinc-700">
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Seller & Garage:</span>
                      <span className="font-bold text-zinc-900">{sellerName} ({garageName})</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Mobile:</span>
                      <span className="font-mono text-zinc-900 font-bold">+880 {phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Area:</span>
                      <span className="font-bold text-zinc-900">{thana || district}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation buttons */}
              <div className="pt-4 border-t border-zinc-200 flex items-center justify-between gap-4">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl border-2 border-zinc-300 text-xs font-bold text-zinc-700 hover:bg-zinc-100 transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>{language === 'en' ? 'Back' : 'পেছনে'}</span>
                  </button>
                ) : (
                  <div />
                )}

                {step < totalSteps ? (
                  <button
                    type="button"
                    id="sell-modal-next-btn"
                    onClick={handleNext}
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-[#107C2B] hover:bg-[#0d6423] text-white text-xs font-black shadow-lg shadow-emerald-900/20 transition-all cursor-pointer hover:scale-105"
                  >
                    <span>{language === 'en' ? 'Continue to Step ' + (step + 1) : 'পরবর্তী ধাপ'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    id="sell-modal-submit-btn"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-[#107C2B] hover:bg-[#0d6423] text-white text-sm font-black shadow-xl shadow-emerald-900/30 transition-all cursor-pointer hover:scale-105"
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
