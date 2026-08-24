import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  MessageSquare, 
  ShieldAlert, 
  Building2,
  ExternalLink,
  Zap
} from 'lucide-react';
import { Language } from '../types';
import { DHAKA_HUBS } from '../data/mockData';

interface ContactViewProps {
  onOpenSellModal: () => void;
  language: Language;
}

export const ContactView: React.FC<ContactViewProps> = ({
  onOpenSellModal,
  language,
}) => {
  const [department, setDepartment] = useState('garage');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16 animate-in fade-in duration-300">
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-300 text-[#15803D] text-xs font-bold uppercase tracking-wider">
          <Mail className="w-4 h-4" />
          <span>{language === 'en' ? 'Get In Touch' : 'যোগাযোগ করুন'}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-zinc-900 tracking-tight">
          {language === 'en' ? 'Connect with Dhaka Central Operations' : 'ভোল্টলুপ ঢাকা প্রধান কার্যালয় ও হাব'}
        </h1>

        <p className="text-base sm:text-lg text-zinc-600 leading-relaxed">
          {language === 'en'
            ? 'Whether scheduling a high-volume garage collection, discussing manufacturer offtake, or reporting an acid containment hazard, our teams are available 24/7.'
            : 'গ্যারেজ কালেকশন, কারখানা অফটেক বা জরুরি অ্যাসিড নিঃসরণ ঝুঁকি রিপোর্ট করতে আমাদের টিম সার্বক্ষণিক প্রস্তুত।'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Direct Info & Emergency Hotline */}
        <div className="lg:col-span-5 space-y-6">
          {/* Main Headquarters Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-zinc-200 shadow-sm space-y-5">
            <h3 className="text-lg font-bold font-heading text-zinc-900 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-[#15803D]" />
              <span>{language === 'en' ? 'Tejgaon Central Sorting Facility' : 'তেজগাঁও কেন্দ্রীয় ডিপো ও ল্যাব'}</span>
            </h3>

            <div className="space-y-4 text-xs text-zinc-700">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#15803D] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-zinc-900 block">Dhaka Operational Hub:</span>
                  <span>Plot 42/B, Shahid Tajuddin Ahmed Sharani, Tejgaon Industrial Area, Dhaka 1208, Bangladesh</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#15803D] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-zinc-900 block">Toll-Free Dispatch Hotline:</span>
                  <a href="tel:09612865857" className="font-mono text-[#15803D] font-bold hover:underline">
                    09612-VOLT-LP (09612-865857)
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#15803D] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-zinc-900 block">Offtake & Business Inquiries:</span>
                  <span className="font-mono">offtake@voltloop.org • operations@voltloop.org</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#15803D] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-zinc-900 block">Operating Hours:</span>
                  <span>Fleet Dispatch: 24/7 • Office: Sat - Thu (8:00 AM - 7:00 PM)</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-zinc-200">
              <a
                href="https://wa.me/8801700000000"
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{language === 'en' ? 'Direct WhatsApp Dispatch Chat' : 'হোয়াটসঅ্যাপে সরাসরি মেসেজ দিন'}</span>
              </a>
            </div>
          </div>

          {/* Emergency Acid Hazard Hotline Box */}
          <div className="bg-amber-50 rounded-2xl p-5 border border-amber-200 space-y-2">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-xs">
              <ShieldAlert className="w-4 h-4 text-amber-700" />
              <span>{language === 'en' ? 'Garage Emergency Acid Spill Response' : 'জরুরি অ্যাসিড স্পিল সাপোর্ট'}</span>
            </div>
            <p className="text-[11px] text-amber-800 leading-relaxed">
              If a battery has ruptured or leaking acid in your garage, contact our rapid containment team immediately for free neutralizing polymer application.
            </p>
            <div className="font-mono font-bold text-xs text-amber-950">
              Hotline: +880 1711-209341
            </div>
          </div>
        </div>

        {/* Right Column: Direct Contact Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200 shadow-sm space-y-6">
          <div className="space-y-1">
            <h3 className="text-xl font-bold font-heading text-zinc-900">
              {language === 'en' ? 'Send a Message' : 'আমাদের বার্তা পাঠান'}
            </h3>
            <p className="text-xs text-zinc-500">
              Fill in your details and our Dhaka operations coordinator will reply promptly.
            </p>
          </div>

          {submitted ? (
            <div className="p-8 text-center bg-emerald-50 rounded-2xl border border-emerald-200 space-y-3 animate-in zoom-in-95 duration-200">
              <CheckCircle2 className="w-12 h-12 text-[#15803D] mx-auto" />
              <h4 className="text-base font-bold text-emerald-950">
                {language === 'en' ? 'Message Dispatched Successfully' : 'বার্তা সফলভাবে পাঠানো হয়েছে'}
              </h4>
              <p className="text-xs text-emerald-800 max-w-sm mx-auto">
                Thank you for contacting VoltLoop. An operational specialist will reach you at {email || phone}.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="text-xs text-[#15803D] font-bold underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                  Department
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                  {[
                    { id: 'garage', label: 'Garage Collection' },
                    { id: 'offtake', label: 'Manufacturer Offtake' },
                    { id: 'general', label: 'General / Press' },
                  ].map((dept) => (
                    <button
                      key={dept.id}
                      type="button"
                      onClick={() => setDepartment(dept.id)}
                      className={`p-2 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                        department === dept.id
                          ? 'border-[#15803D] bg-emerald-50 text-[#15803D]'
                          : 'border-zinc-200 text-zinc-700 hover:bg-zinc-50'
                      }`}
                    >
                      {dept.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 focus:border-[#15803D] outline-none text-xs text-zinc-900 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                    Mobile Number *
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
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 focus:border-[#15803D] outline-none text-xs text-zinc-900 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                  Your Message / Inquiries *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="How can we assist you with battery collection, pure lead supply, or partnerships?"
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
                <span>Send Message</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
