import React, { useState } from 'react';
import { 
  Building2, 
  Factory, 
  TrendingUp, 
  ShieldCheck, 
  Send, 
  CheckCircle2, 
  Zap, 
  Coins, 
  Award, 
  Handshake, 
  FileCheck
} from 'lucide-react';
import { Language, PartnerInquiry } from '../types';

interface PartnersViewProps {
  onOpenSellModal: () => void;
  language: Language;
}

export const PartnersView: React.FC<PartnersViewProps> = ({
  onOpenSellModal,
  language,
}) => {
  const [partnerType, setPartnerType] = useState<'garage' | 'manufacturer' | 'investor' | 'regulator'>('manufacturer');
  const [name, setName] = useState('');
  const [organization, setOrganization] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [interestArea, setInterestArea] = useState('Annual Offtake Lead Supply (500+ MT)');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    const newInquiry: PartnerInquiry = {
      id: `inq-${Date.now()}`,
      name,
      organization,
      partnerType,
      email,
      phone,
      interestArea,
      message,
      timestamp: new Date().toISOString(),
    };

    // Save to localStorage for demo persistence
    const existing = JSON.parse(localStorage.getItem('voltloop_inquiries') || '[]');
    existing.push(newInquiry);
    localStorage.setItem('voltloop_inquiries', JSON.stringify(existing));

    setIsSubmitted(true);
  };

  return (
    <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16 animate-in fade-in duration-300">
      {/* Header Section */}
      <div className="max-w-3xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-300 text-[#15803D] text-xs font-bold uppercase tracking-wider">
          <Handshake className="w-4 h-4" />
          <span>{language === 'en' ? 'Institutional & Commercial Partnerships' : 'প্রাতিষ্ঠানিক ও বাণিজ্যিক অংশীদারিত্ব'}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-zinc-900 tracking-tight">
          {language === 'en' ? 'Building Bangladesh’s Clean Battery Ecosystem' : 'বাংলাদেশের সার্কুলার ব্যাটারি ইকোসিস্টেম গড়ে তুলুন'}
        </h1>

        <p className="text-base sm:text-lg text-zinc-600 leading-relaxed">
          {language === 'en'
            ? 'Whether you operate a 50-rickshaw charging depot, run a tier-1 battery manufacturing plant, or deploy climate capital — VoltLoop offers high-trust, audited partnerships.'
            : 'গ্যারেজ মালিক, ব্যাটারি প্রস্তুতকারক কোম্পানি বা জলবায়ু বিনিয়োগকারী — সবার জন্য ভোল্টলুপ প্রদান করে উচ্চমূল্য ও নির্ভরযোগ্য অংশীদারিত্ব।'}
        </p>
      </div>

      {/* THREE VALUE PROPOSITION PILLARS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* For Garages */}
        <div className="bg-white rounded-2xl p-7 border border-zinc-200 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-[#15803D] flex items-center justify-center">
              <Coins className="w-6 h-6" />
            </div>
            <span className="text-xs font-mono font-bold text-[#15803D] uppercase tracking-wider block">
              For Garage Owners & Fleets
            </span>
            <h3 className="text-xl font-bold font-heading text-zinc-900">
              {language === 'en' ? 'Maximize Garage Scrap Revenue' : 'গ্যারেজের সর্বোচ্চ আয় নিশ্চিত করুন'}
            </h3>
            <ul className="space-y-2 text-xs text-zinc-600">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#15803D] shrink-0 mt-0.5" />
                <span>15-20% higher payout than local informal scrap dealers.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#15803D] shrink-0 mt-0.5" />
                <span>Instant digital scale weighing & on-spot bKash transfer.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#15803D] shrink-0 mt-0.5" />
                <span>Free safety gloves, acid containers, and partner certification banner.</span>
              </li>
            </ul>
          </div>

          <button
            onClick={onOpenSellModal}
            className="w-full py-2.5 rounded-xl bg-[#15803D] hover:bg-[#166534] text-white text-xs font-bold transition-colors cursor-pointer"
          >
            {language === 'en' ? 'Register Your Garage' : 'গ্যারেজ নিবন্ধন করুন'}
          </button>
        </div>

        {/* For Battery Manufacturers */}
        <div className="bg-white rounded-2xl p-7 border-2 border-emerald-600/60 shadow-md space-y-4 flex flex-col justify-between relative">
          <div className="absolute -top-3 right-6 bg-[#15803D] text-white px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider">
            Offtake Contracts
          </div>

          <div className="space-y-3">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
              <Factory className="w-6 h-6" />
            </div>
            <span className="text-xs font-mono font-bold text-blue-700 uppercase tracking-wider block">
              For Battery Manufacturers
            </span>
            <h3 className="text-xl font-bold font-heading text-zinc-900">
              {language === 'en' ? 'Secured 99.97% Pure Secondary Lead' : 'খাঁটি সিসা অফটেক সাপ্লাই চুক্তি'}
            </h3>
            <ul className="space-y-2 text-xs text-zinc-600">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                <span>Certified LME-grade secondary lead ingots (99.97% purity).</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                <span>Binding volume contracts hedging against international import volatility.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                <span>Verifiable Scope 3 carbon reduction and national EPR compliance credits.</span>
              </li>
            </ul>
          </div>

          <a
            href="#inquiry-form"
            onClick={() => setPartnerType('manufacturer')}
            className="w-full py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold text-center block transition-colors cursor-pointer"
          >
            {language === 'en' ? 'Request Offtake Term Sheet' : 'অফটেক টার্ম শিট রিকোয়েস্ট করুন'}
          </a>
        </div>

        {/* For Climate Investors */}
        <div className="bg-white rounded-2xl p-7 border border-zinc-200 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <TrendingUp className="w-6 h-6" />
            </div>
            <span className="text-xs font-mono font-bold text-amber-800 uppercase tracking-wider block">
              For Climate Funds & Regulators
            </span>
            <h3 className="text-xl font-bold font-heading text-zinc-900">
              {language === 'en' ? 'Profitable Circular Infrastructure' : 'পরিবেশবান্ধব সার্কুলার অর্থনীতি'}
            </h3>
            <ul className="space-y-2 text-xs text-zinc-600">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
                <span>High capital efficiency backed by immediate industrial commodity sales.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
                <span>Tangible toxic lead elimination and heavy metal remediation metrics.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
                <span>Scalable hub blueprint for expanding across South Asian e-mobility hubs.</span>
              </li>
            </ul>
          </div>

          <a
            href="#inquiry-form"
            onClick={() => setPartnerType('investor')}
            className="w-full py-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-900 text-xs font-bold text-center block transition-colors cursor-pointer"
          >
            {language === 'en' ? 'Access Data Room' : 'ইনভেস্টর ডাটায় প্রবেশ করুন'}
          </a>
        </div>
      </div>

      {/* PARTNER INQUIRY FORM */}
      <section id="inquiry-form" className="bg-white rounded-3xl p-6 sm:p-10 border border-zinc-200 shadow-lg space-y-8 max-w-4xl mx-auto">
        <div className="text-center space-y-2">
          <span className="text-xs font-mono font-bold text-[#15803D] uppercase tracking-wider">
            Direct Commercial Inquiries
          </span>
          <h2 className="text-2xl sm:text-3xl font-black font-heading text-zinc-900">
            {language === 'en' ? 'Initiate a Partnership with VoltLoop' : 'ভোল্টলুপ পার্টনারশিপ শুরু করুন'}
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600">
            Our corporate development and logistics team will respond within 24 hours.
          </p>
        </div>

        {isSubmitted ? (
          <div className="p-8 text-center bg-emerald-50 rounded-2xl border border-emerald-200 space-y-3 animate-in zoom-in-95 duration-200">
            <CheckCircle2 className="w-12 h-12 text-[#15803D] mx-auto" />
            <h3 className="text-lg font-bold text-emerald-950">
              {language === 'en' ? 'Partnership Inquiry Received' : 'আপনার বার্তা গৃহীত হয়েছে'}
            </h3>
            <p className="text-xs text-emerald-800 max-w-md mx-auto">
              Thank you for contacting VoltLoop. A senior offtake director has been assigned to your organization profile ({organization || name}).
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="mt-2 text-xs text-[#15803D] font-bold underline"
            >
              Submit another inquiry
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmitInquiry} className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'manufacturer', label: 'Battery Manufacturer' },
                { id: 'garage', label: 'Garage Fleet Owner' },
                { id: 'investor', label: 'Impact Investor' },
                { id: 'regulator', label: 'Government / DoE' },
              ].map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setPartnerType(p.id as any)}
                  className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                    partnerType === p.id
                      ? 'border-[#15803D] bg-emerald-50 text-[#15803D] ring-1 ring-emerald-500'
                      : 'border-zinc-200 text-zinc-700 bg-white hover:bg-zinc-50'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                  Contact Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Engr. Tanvir Ahmed"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 focus:border-[#15803D] outline-none text-xs text-zinc-900 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                  Organization / Company *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahimafrooz / E-Fleet Corp"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 focus:border-[#15803D] outline-none text-xs text-zinc-900 bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 focus:border-[#15803D] outline-none text-xs text-zinc-900 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                  Mobile / Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+880 17XXXXXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 focus:border-[#15803D] outline-none text-xs font-mono text-zinc-900 bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                Area of Interest / Requirement
              </label>
              <input
                type="text"
                value={interestArea}
                onChange={(e) => setInterestArea(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 focus:border-[#15803D] outline-none text-xs text-zinc-900 bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                Message / Specifications
              </label>
              <textarea
                rows={3}
                placeholder="Detail your monthly volume requirement, facility location, or partnership scope..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 focus:border-[#15803D] outline-none text-xs text-zinc-900 bg-white resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#15803D] hover:bg-[#166534] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Submit Commercial Inquiry</span>
            </button>
          </form>
        )}
      </section>
    </div>
  );
};
