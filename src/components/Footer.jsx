import React, { useState } from 'react';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, ChevronDown } from 'lucide-react';

const TikTokIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const Footer = () => {
  // State to track which branch is expanded
  const [openBranch, setOpenBranch] = useState('pretoria');

  const socialLinks = [
    { Icon: Facebook, href: "https://www.facebook.com/p/Mkhdebtors-associates-61576150184827/" }, 
    { Icon: TikTokIcon, href: "http://tiktok.com/@mkhdebtorsassociates" }, 
    { Icon: Instagram, href: "https://www.instagram.com/mkh_debtors/" },
    { Icon: Twitter, href: "https://x.com/DebtorsS" }
  ];

  return (
    <footer className="bg-[#11013d] pt-20 pb-5 border-t border-white/5">
      <div className="container mx-auto px-6 lg:px-24 -mt-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1: Branding */}
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-3 -mt-3 mb-6">
              <img 
                src="https://res.cloudinary.com/dkmzveqce/image/upload/v1767100727/ChatGPT_Image_Dec_30_2025_03_08_48_PM_jppkez.png" 
                alt="MKH Logo" 
                className="w-12 h-12 md:w-14 md:h-14 object-contain" 
              />
              <div className="flex flex-col leading-none -ml-3 md:-ml-4">
                <span className="text-white font-bold text-lg md:text-[18px] tracking-tight">
                  MKH <span className="text-[#2ED8D4]">DEBTORS</span>
                </span>
                <span className="text-white text-[8px] md:text-[10px] font-bold tracking-[0.25em] uppercase mt-1">
                  Associates
                </span>
              </div>
            </div>
            <p className="text-blue-100/60 text-[13px] -mt-5 leading-relaxed mb-8">
              Fix your credit, reduce debt & Achieve your financial freedom today!!
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, i) => (
                <a key={i} href={social.href} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 flex items-center justify-center hover:bg-[#00B4D8] transition-all text-white border border-white/10">
                  <social.Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Interactive Branches Dropdown */}
          <div className="lg:pl-0">
            <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest border-b border-[#00B4D8]/30 pb-2 w-fit">Our Branches</h4>
            
            <div className="flex flex-col gap-2">
              
              {/* PRETORIA DROPDOWN */}
              <div className={`border border-white/5 rounded-sm transition-all duration-300 ${openBranch === 'pretoria' ? 'bg-white/5' : ''}`}>
                <button 
                  onClick={() => setOpenBranch(openBranch === 'pretoria' ? '' : 'pretoria')}
                  className="w-full flex items-center justify-between p-3 text-left"
                >
                  <span className={`text-[10px] font-bold uppercase tracking-widest ${openBranch === 'pretoria' ? 'text-[#00B4D8]' : 'text-blue-100/60'}`}>
                    Pretoria Branch
                  </span>
                  <ChevronDown size={14} className={`text-[#00B4D8] transition-transform duration-300 ${openBranch === 'pretoria' ? 'rotate-180' : ''}`} />
                </button>
                
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openBranch === 'pretoria' ? 'max-h-40 opacity-100 p-3 pt-0' : 'max-h-0 opacity-0'}`}>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 text-blue-100/60">
                      <MapPin size={14} className="text-[#00B4D8] shrink-0 mt-1" />
                      <span className="text-[12px]">Office No 326 Bank Towers, 190 Thabo Sehume St</span>
                    </div>
                    <div className="flex items-center gap-3 text-blue-100/60">
                      <Phone size={14} className="text-[#00B4D8] shrink-0" />
                      <a href="tel:+27120234324" className="hover:text-white transition-colors text-[12px]">+27 12 023 4324</a>
                    </div>
                  </div>
                </div>
              </div>

              {/* BURGERSFORT DROPDOWN */}
              <div className={`border border-white/5 rounded-sm transition-all duration-300 ${openBranch === 'burgersfort' ? 'bg-white/5' : ''}`}>
                <button 
                  onClick={() => setOpenBranch(openBranch === 'burgersfort' ? '' : 'burgersfort')}
                  className="w-full flex items-center justify-between p-3 text-left"
                >
                  <span className={`text-[10px] font-bold uppercase tracking-widest ${openBranch === 'burgersfort' ? 'text-[#00B4D8]' : 'text-blue-100/60'}`}>
                    Burgersfort Branch
                  </span>
                  <ChevronDown size={14} className={`text-[#00B4D8] transition-transform duration-300 ${openBranch === 'burgersfort' ? 'rotate-180' : ''}`} />
                </button>
                
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openBranch === 'burgersfort' ? 'max-h-40 opacity-100 p-3 pt-0' : 'max-h-0 opacity-0'}`}>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 text-blue-100/60">
                      <MapPin size={14} className="text-[#00B4D8] shrink-0 mt-1" />
                      <span className="text-[12px]">10 Tambotie, Aloe Ridge, Burgersfort, 1150</span>
                    </div>
                    <div className="flex items-center gap-3 text-blue-100/60">
                      <Phone size={14} className="text-[#00B4D8] shrink-0" />
                      <a href="tel:+27131706148" className="hover:text-white transition-colors text-[12px]">+27 13 170 6148</a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 text-blue-100/60 group pt-4 pl-3">
                <Mail size={14} className="text-[#00B4D8] shrink-0" />
                <a href="mailto:info@mkhdebtors.co.za" className="hover:text-white transition-colors text-[12px]">info@mkhdebtors.co.za</a>
              </div>
            </div>
          </div>

          {/* Column 3: Quick Links */}
          <div className="lg:pl-10">
            <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest border-b border-[#00B4D8]/30 pb-2 w-fit">Our Services</h4>
            <ul className="space-y-3">
              {['Debt Review Removal', 'Judgement Rescission', 'Prescription Letters', 'View All Services'].map((item) => (
                <li key={item}>
                  <a href={item === 'View All Services' ? '#services' : '#services'} className="text-blue-100/60 text-[13px] hover:text-[#00B4D8] transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-[1px] bg-[#00B4D8]"></span> {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Hours */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest border-b border-[#00B4D8]/30 pb-2 w-fit">Working Hours</h4>
            <ul className="space-y-3 mb-8 text-blue-100/60 text-sm">
              <li className="flex justify-between"><span>Mon - Fri:</span> <span className="text-white">09:00 - 17:00</span></li>
              <li className="flex justify-between"><span>Sat:</span> <span className="text-white">09:00 - 13:00</span></li>
              <li className="flex justify-between font-bold text-[#00B4D8]"><span>Sun:</span> <span>Closed</span></li>
            </ul>
            <p className="text-[10px] text-blue-100/30 uppercase tracking-tighter leading-tight border-l border-white/10 pl-3">
              Regulated by the National Credit Act & POPI Act compliant.
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-blue-100/40 text-[10px] uppercase tracking-widest text-center md:text-left">
            © 2026 MKH Debtors Associates. All Rights Reserved. 
          </p>
          <div className="flex gap-6 text-[10px] uppercase tracking-widest text-blue-100/40">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;