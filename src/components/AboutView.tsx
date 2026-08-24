import React from 'react';
import { 
  ShieldCheck, 
  Award, 
  Target, 
  Eye, 
  Users, 
  CheckCircle2, 
  Building2, 
  GraduationCap, 
  Zap,
  Globe2
} from 'lucide-react';
import { Language } from '../types';

interface AboutViewProps {
  onOpenSellModal: () => void;
  language: Language;
}

export const AboutView: React.FC<AboutViewProps> = ({
  onOpenSellModal,
  language,
}) => {
  const teamMembers = [
    {
      name: 'Tanvir Siddiqui',
      role: 'Founder & Chief Executive Officer',
      bio: 'Former cleantech logistics lead with 9+ years experience scaling urban reverse-supply chains across South Asia.',
      focus: 'Strategy, Offtake Contracts & Regulatory Affairs',
      avatarBg: 'bg-emerald-900 text-emerald-100',
    },
    {
      name: 'Dr. Shahriar Hossain',
      role: 'Head of Circular Metallurgy & Smelting',
      bio: 'PhD in Hydrometallurgical Extraction from BUET with 14 patents on closed-loop hazardous lead refinement and emission scrubbers.',
      focus: 'Smelter Tech & 99.97% LME Ingot Quality',
      avatarBg: 'bg-blue-900 text-blue-100',
    },
    {
      name: 'Nusrat Jahan, PMP',
      role: 'Chief Operations & Fleet Officer',
      bio: 'Built and scaled electric urban fleet operations handling 200+ EV commercial flatbeds across Greater Dhaka.',
      focus: 'Dhaka Hubs Dispatch & Zero-Spill Logistics',
      avatarBg: 'bg-zinc-800 text-zinc-100',
    },
    {
      name: 'Kazi Mashiur Rahman',
      role: 'Director of Garage Relations & Community',
      bio: 'Over 12 years working directly with Dhaka & Gazipur rickshaw garage cooperatives, mechanics unions, and fleet owners.',
      focus: 'Garage Trust, bKash Settlements & Field Training',
      avatarBg: 'bg-teal-900 text-teal-100',
    },
  ];

  const certifications = [
    { title: 'ISO 14001:2015', desc: 'Certified Environmental Management System for hazardous material containment.' },
    { title: 'Basel Convention Alignment', desc: 'Full adherence to international guidelines on environmentally sound lead-acid battery recycling.' },
    { title: 'DoE Bangladesh Clearance', desc: 'Department of Environment Category Red industrial recycling & clean smelting operating license.' },
    { title: 'BUET Metallurgy Certified', desc: 'Independent laboratory validation for 99.97% secondary pure lead ingots.' },
  ];

  return (
    <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16 animate-in fade-in duration-300">
      {/* Header Section */}
      <div className="max-w-3xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-300 text-[#15803D] text-xs font-bold uppercase tracking-wider">
          <Target className="w-4 h-4" />
          <span>{language === 'en' ? 'Our Mission & Story' : 'আমাদের লক্ষ্য ও পরিচিতি'}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-zinc-900 tracking-tight">
          {language === 'en' ? 'Pioneering Circular Lead for South Asia' : 'দক্ষিণ এশিয়ার টেকসই সার্কুলার অর্থনীতি'}
        </h1>

        <p className="text-base sm:text-lg text-zinc-600 leading-relaxed">
          {language === 'en'
            ? 'VoltLoop was founded with a singular purpose: to permanently close the toxic loop of Bangladesh’s e-rickshaw batteries by creating the country’s first fully audited, zero-spill collection and offtake ecosystem.'
            : 'ভোল্টলুপের লক্ষ্য একটাই: বাংলাদেশের লাখ লাখ ই-রিকশার ব্যাটারি বর্জ্যকে উন্মুক্ত পরিবেশ দূষণ থেকে রক্ষা করে দেশীয় কারখানায় খাঁটি কাঁচামাল হিসেবে ফিরিয়ে দেওয়া।'}
        </p>
      </div>

      {/* MISSION & VISION DUAL CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl p-8 border border-zinc-200 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-[#15803D] flex items-center justify-center">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold font-heading text-zinc-900">
            {language === 'en' ? 'Our Mission' : 'আমাদের মিশন'}
          </h3>
          <p className="text-sm text-zinc-600 leading-relaxed">
            {language === 'en'
              ? 'To safely intercept 100% of dead lead-acid batteries from Bangladesh’s urban transport fleet before they reach informal open-air smelters, guaranteeing garage owners premium pricing and supplying manufacturers with certified secondary lead ingots.'
              : 'অনানুষ্ঠানিক ভাট্টিতে পৌঁছানোর আগেই প্রতিটি মৃত ব্যাটারি নিরাপদ নেটওয়ার্কে সংগ্রহ করা, গ্যারেজ মালিকদের ন্যায্য মূল্য নিশ্চিত করা এবং প্রস্তুতকারকদের খাঁটি সিসা সরবরাহ করা।'}
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-zinc-200 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center">
            <Eye className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold font-heading text-zinc-900">
            {language === 'en' ? 'Our Vision' : 'আমাদের ভিশন'}
          </h3>
          <p className="text-sm text-zinc-600 leading-relaxed">
            {language === 'en'
              ? 'A Bangladesh where zero toxic lead or acid ever touches agricultural soil, and where 100% of domestic battery production is powered by locally recycled, low-carbon circular materials.'
              : 'একটি দূষণমুক্ত বাংলাদেশ যেখানে এক ফোঁটা অ্যাসিডও মাটিতে পড়বে না এবং দেশের শতভাগ ব্যাটারি স্থানীয় সার্কুলার উপাদানে তৈরি হবে।'}
          </p>
        </div>
      </div>

      {/* LEADERSHIP TEAM */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-mono font-bold text-[#15803D] uppercase tracking-wider">
            Industrial Leadership
          </span>
          <h2 className="text-2xl sm:text-3xl font-black font-heading text-zinc-900">
            {language === 'en' ? 'The Team Driving the Loop' : 'ভোল্টলুপের নেতৃত্ব'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member) => (
            <div key={member.name} className="bg-white rounded-2xl p-6 border border-zinc-200 shadow-sm space-y-4 text-left">
              <div className={`w-14 h-14 rounded-2xl ${member.avatarBg} flex items-center justify-center font-bold text-xl font-heading shadow-xs`}>
                {member.name.split(' ').map((n) => n[0]).join('')}
              </div>

              <div>
                <h3 className="text-base font-bold text-zinc-900">{member.name}</h3>
                <p className="text-xs font-semibold text-[#15803D] mt-0.5">{member.role}</p>
              </div>

              <p className="text-xs text-zinc-600 leading-relaxed">
                {member.bio}
              </p>

              <div className="pt-3 border-t border-zinc-100 text-[11px] text-zinc-500">
                <span className="font-semibold text-zinc-700 block mb-0.5">Focus:</span>
                {member.focus}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CERTIFICATIONS & REGULATORY ALIGNMENT */}
      <section className="bg-zinc-900 text-white rounded-3xl p-8 sm:p-12 border border-zinc-800 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
            Audited Standards
          </span>
          <h2 className="text-2xl sm:text-3xl font-black font-heading text-white">
            {language === 'en' ? 'Certifications & Safety Governance' : 'সার্টিফিকেশন ও নিরাপত্তা মানদণ্ড'}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {certifications.map((cert) => (
            <div key={cert.title} className="bg-zinc-800/80 p-5 rounded-2xl border border-zinc-700 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400">
                <ShieldCheck className="w-5 h-5" />
                <h4 className="text-sm font-bold text-white">{cert.title}</h4>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                {cert.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
