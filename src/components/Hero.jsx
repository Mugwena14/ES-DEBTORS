import React from 'react';
import { Play, Facebook, Instagram, Twitter } from 'lucide-react';
import QuoteForm from './QuoteForm'; 

// Custom TikTok Icon component
const TikTokIcon = ({ size = 18 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const Hero = () => {
  return (
    <div className="relative w-full min-h-screen flex items-center bg-gray-900 font-sans">
      
      {/* 1. Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: "url('https://res.cloudinary.com/dkmzveqce/image/upload/v1767213812/background_cz47hr.png')" 
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* 2. Main Container */}
      <div className="container mx-auto px-6 lg:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20">
        
        {/* LEFT COLUMN: Hero Text & Socials */}
        <div className="text-white max-w-2xl">
          <h1 className="text-4xl md:text-4xl lg:text-[3.7rem] font-bold leading-[1.1] mb-8 drop-shadow-xl">
            <span className="text-[#00B4D8]">Financial Advice</span><br />
            to get you back where<br />
            you <span className="text-[#00B4D8]">belong.</span>
          </h1>

          <div className="flex flex-col gap-8">
            {/* Button */}
            <a 
              href="#services"
              className="bg-white text-black font-bold text-sm tracking-widest uppercase py-4 px-8 pr-12 hover:bg-gray-100 transition-colors flex items-center gap-3 drop-shadow-md group w-fit"
              style={{ clipPath: 'polygon(0 0, 100% 0, 92% 100%, 0% 100%)' }}
            >
              Our Services
              <Play className="w-4 h-4 fill-black group-hover:scale-110 transition-transform" />
            </a>

            {/* Social Icons Section */}
            <div className="flex items-center gap-4">
              <span className="text-[#00B4D8]/90 text-[10px] uppercase tracking-[0.3em] font-bold">Follow Us</span>
              <div className="h-[3px] w-8 bg-[#00B4D8]/90"></div>
              <div className="flex gap-3">
                {[
                  { Icon: Facebook, href: "https://www.facebook.com/p/Mkhdebtors" },
                  { Icon: TikTokIcon, href: "http://tiktok.com/@mkhdebtorsassociates" },
                  { Icon: Instagram, href: "https://www.instagram.com/mkh_debtors/" },
                  { Icon: Twitter, href: "https://x.com/DebtorsS" }
                ].map((social, i) => (
                  <a 
                    key={i} 
                    href={social.href} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 text-gray-200 border border-[#00B4D8]/50 bg-white/5 flex items-center justify-center hover:bg-[#00B4D8] hover:border-[#00B4D8] hover:text-white transition-all duration-300"
                  >
                    <social.Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: The Imported Form Component */}
        <div className="relative z-20">
           <QuoteForm />
        </div>

      </div>
    </div>
  );
};

export default Hero;