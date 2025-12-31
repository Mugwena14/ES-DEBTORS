import React, { useState } from 'react';
import { 
  Home, 
  Info, 
  Briefcase, 
  Phone, 
  Mail,
  ArrowRight,
  Menu,
  X 
} from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="absolute top-0 left-0 w-full z-50 bg-transparent">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-24">
          
          {/* 1. LOGO SECTION */}
          <div className="flex items-center gap-3">
            <img 
              src="https://res.cloudinary.com/dkmzveqce/image/upload/v1767100727/ChatGPT_Image_Dec_30_2025_03_08_48_PM_jppkez.png" 
              alt="MKH Logo" 
              className="w-12 h-12 md:w-16 md:h-16 object-contain" 
            />
            
            <div className="flex flex-col leading-none -ml-3 md:-ml-5">
              <span className="text-white font-bold text-lg md:text-[16px] tracking-tight">
                MKH <span className="text-[#2ED8D4]">DEBTORS</span>
              </span>
              <span className="text-white text-[8px] md:text-xs font-bold tracking-[0.25em] uppercase mt-0.5">
                Associates
              </span>
            </div>
          </div>

          {/* 2. NAVIGATION LINKS (Desktop) */}
          <nav className="hidden lg:flex items-center gap-8">
            <a href="#" className="flex items-center gap-2 text-white hover:text-[#00B4D8] transition-colors font-medium">
              <Home className="w-4 h-4 text-[#00B4D8]" /> Home
            </a>
            <a href="#" className="flex items-center gap-2 text-white hover:text-[#00B4D8] transition-colors font-medium">
              <Info className="w-4 h-4 text-[#00B4D8]" /> About
            </a>
            <a href="#" className="flex items-center gap-2 text-white hover:text-[#00B4D8] transition-colors font-medium">
              <Briefcase className="w-4 h-4 text-[#00B4D8]" /> Services
            </a>
            <a href="#" className="flex items-center gap-2 text-white hover:text-[#00B4D8] transition-colors font-medium">
              <Mail className="w-4 h-4 text-[#00B4D8]" /> Contact
            </a>
            <a href="tel:+27123456789" className="flex text-[15px] items-center gap-2 text-white hover:text-[#00B4D8] transition-colors font-bold">
              <Phone className="w-4 h-4 text-[#00B4D8] fill-[#00B4D8]" />
              <span className="tracking-wider text-sm md:text-base">+012 023 4324</span>
            </a>
          </nav>

          {/* 3. RIGHT SIDE: MOBILE TOGGLE */}
          <div className="flex items-center gap-3 md:gap-6">
            <button 
              className="lg:hidden text-white relative z-[60]" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* 4. MOBILE SIDEBAR OVERLAY */}
      <div 
        className={`fixed inset-0 bg-black/60 transition-opacity duration-300 lg:hidden z-[50] ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Sidebar Panel */}
      <div 
        className={`fixed top-0 right-0 h-full w-[75%] bg-[#0033A1] shadow-2xl transform transition-transform duration-300 ease-in-out lg:hidden z-[55] ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Sidebar Internal Header - "Menu" text aligned with X button */}
        <div className="flex items-center justify-between h-24 px-8 border-b border-white/5">
           <span className="text-white text-sm font-bold uppercase tracking-[0.2em]">Menu</span>
           {/* Space reserved for X icon which is sitting in the main header z-60 */}
           <div className="w-7 h-7"></div> 
        </div>

        <div className="flex flex-col h-[calc(100%-6rem)] px-8 pb-10 justify-between mt-8">
          {/* Top Section: Nav Links */}
          <div className="flex flex-col space-y-6">
            <a href="#" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-4 text-white text-[14px] font-medium border-b border-white/10 pb-4">
              Home
            </a>
            <a href="#" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-4 text-white text-[14px] font-medium border-b border-white/10 pb-4">
              About
            </a>
            <a href="#" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-4 text-white text-[14px] font-medium border-b border-white/10 pb-4">
              Services
            </a>
            <a href="#" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-4 text-white text-[14px] font-medium border-b border-white/10 pb-4">
              Contact
            </a>
          </div>
          
          {/* Bottom Section: Phone and Get Quote */}
          <div className="flex flex-col space-y-6">
            <a href="tel:+0120234324" className="flex items-center gap-4 text-white font-bold text-[14px]">
              +012 023 4324
            </a>

            <button 
              className="bg-[#00B4D8] text-white font-bold text-sm tracking-widest uppercase py-4 px-6 pr-10 hover:bg-[#009ac0] transition-all flex items-center justify-between shadow-lg group"
              style={{ clipPath: 'polygon(0 0, 100% 0, 90% 100%, 0% 100%)' }}
            >
              Get Quote
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;