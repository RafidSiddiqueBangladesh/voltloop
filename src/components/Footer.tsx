import React, { useState } from 'react';
import { VoltLogo } from './VoltLogo';
import { PageView, Language } from '../types';
import { 
  Zap, 
  Mail, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  ArrowRight, 
  Check, 
  Heart,
  Globe2
} from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageView) => void;
  onOpenSellModal: () => void;
  language: Language;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenSellModal,
  language,
}) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-[#0B150F] text-zinc-300 border-t border-emerald-950/80 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Col 1: Brand & Tagline */}
          <div className="lg:col-span-4 space-y-4">
            <VoltLogo theme="dark" size="md" showTagline={true} />
            <p className="text-xs text-emerald-400 font-mono font-semibold">
              "VoltLoop: Turning Toxic Strains into Economic Gains."
            </p>
            <p className="text-xs text-zinc-400 leading-relaxed pr-4">
              {language === 'en'
                ? "Bangladesh's certified closed-loop lead-acid battery collection network. Safely recovering pure secondary lead for battery manufacturers and ending toxic backyard smelting."
                : 'বাংলাদেশের প্রথম প্রত্যয়িত ক্লোজড-লুপ ব্যাটারি কালেকশন ও রিসাইক্লিং নেটওয়ার্ক। গ্যারেজের সর্বোচ্চ মূল্য ও বিশুদ্ধ সিসা সরবরাহের নিশ্চয়তা।'}
            </p>

            <div className="pt-2">
              <button
                onClick={onOpenSellModal}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#15803D] hover:bg-[#166534] text-white text-xs font-bold transition-colors cursor-pointer"
              >
                <Zap className="w-3.5 h-3.5 fill-white" />
                <span>{language === 'en' ? 'Sell Dead Battery' : 'মৃত ব্যাটারি বিক্রি করুন'}</span>
              </button>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-heading">
              {language === 'en' ? 'Navigation' : 'নেভিগেশন'}
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  {language === 'en' ? 'Home' : 'হোম'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('problem')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  {language === 'en' ? 'The Crisis Data' : 'সংকট ডাটা'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('model')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  {language === 'en' ? 'The VOLT Model' : 'ভোল্ট মডেল'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('track')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  {language === 'en' ? 'Track Pickup' : 'পিকআপ ট্র্যাকিং'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('impact')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  {language === 'en' ? 'Impact & Ledger' : 'ইমপ্যাক্ট ও লেজার'}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Institutional Verticals */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-heading">
              {language === 'en' ? 'Stakeholders' : 'অংশীদার'}
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li>
                <button
                  onClick={() => onNavigate('partners')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  {language === 'en' ? 'For Garages & Fleets' : 'গ্যারেজ মালিকদের জন্য'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('partners')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  {language === 'en' ? 'Manufacturer Offtake' : 'কারখানা অফটেক চুক্তি'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('partners')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  {language === 'en' ? 'Investors & ESG' : 'ইনভেস্টর ও ইএসজি'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  {language === 'en' ? 'Leadership Team' : 'টিম পরিচিতি'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  {language === 'en' ? 'Dhaka Hub Locations' : 'ঢাকা ডিপো ও যোগাযোগ'}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter & Dispatch Bulletin */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-heading">
              {language === 'en' ? 'Cleantech & Scrap Index Bulletin' : 'ক্লিনটেক ও লেজার বুলেটিন'}
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Subscribe for monthly updates on secondary lead LME index rates, EPR compliance rules, and Dhaka fleet metrics.
            </p>

            {subscribed ? (
              <div className="p-3 rounded-lg bg-emerald-950 border border-emerald-800 text-xs text-emerald-300 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Thank you! You are subscribed to VoltLoop Bulletin.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter email address"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg bg-zinc-900 border border-zinc-700 text-white outline-none focus:border-[#15803D]"
                />
                <button
                  type="submit"
                  className="px-3.5 py-2 bg-[#15803D] hover:bg-[#166534] text-white rounded-lg text-xs font-bold shrink-0 transition-colors cursor-pointer"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}

            <div className="pt-2 text-[11px] text-zinc-500 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Department of Environment (DoE) & Basel Convention Certified</span>
            </div>
          </div>
        </div>

        {/* Bottom Micro bar */}
        <div className="pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div>
            © {new Date().getFullYear()} VoltLoop Technologies Ltd. All rights reserved. Dhaka, Bangladesh.
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span>Privacy Policy</span>
            <span>•</span>
            <span>EPR Compliance Terms</span>
            <span>•</span>
            <span>Chain-of-Custody Certification</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
