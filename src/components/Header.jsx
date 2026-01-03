import React, { useState } from 'react';
import { 
  Home, 
  Info, 
  Briefcase, 
  Phone, 
  Mail,
  ArrowRight,
  Menu,
  X,
  Settings,
  MessageSquare 
} from 'lucide-react';
import QuoteForm from './QuoteForm'; 

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Helper to close modal and menu
  const openQuoteModal = () => {
    setIsModalOpen(true);
    setIsMenuOpen(false);
  };

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
          <nav className="hidden lg:flex items-center gap-6">
            <a href="#home" className="flex items-center gap-1.5 text-white hover:text-[#00B4D8] transition-colors font-medium text-sm">
              <Home className="w-4 h-4 text-[#00B4D8]" /> Home
            </a>
            <a href="#about" className="flex items-center gap-1.5 text-white hover:text-[#00B4D8] transition-colors font-medium text-sm">
              <Info className="w-4 h-4 text-[#00B4D8]" /> About
            </a>
            <a href="#services" className="flex items-center gap-1.5 text-white hover:text-[#00B4D8] transition-colors font-medium text-sm">
              <Briefcase className="w-4 h-4 text-[#00B4D8]" /> Services
            </a>
            <a href="#how" className="flex items-center gap-1.5 text-white hover:text-[#00B4D8] transition-colors font-medium text-sm">
              <Settings className="w-4 h-4 text-[#00B4D8]" /> How It Works
            </a>
            <a href="#reviews" className="flex items-center gap-1.5 text-white hover:text-[#00B4D8] transition-colors font-medium text-sm">
              <MessageSquare className="w-4 h-4 text-[#00B4D8]" /> Reviews
            </a>
            <a href="#contacts" className="flex items-center gap-1.5 text-white hover:text-[#00B4D8] transition-colors font-medium text-sm">
              <Mail className="w-4 h-4 text-[#00B4D8]" /> Contacts
            </a>
            <a href="tel:+27120234324" className="flex text-[14px] items-center gap-1.5 text-white hover:text-[#00B4D8] transition-colors font-bold ml-2">
              <Phone className="w-4 h-4 text-[#00B4D8] fill-[#00B4D8]" />
              <span className="tracking-wider">+27 12 023 4324</span>
            </a>
          </nav>

          {/* 3. RIGHT SIDE: DESKTOP BUTTON + MOBILE TOGGLE */}
          <div className="flex items-center gap-3 md:gap-6">
            <button 
              onClick={openQuoteModal}
              className="hidden lg:flex bg-[#00B4D8] text-white font-bold text-[11px] tracking-widest uppercase py-3 px-5 pr-8 hover:bg-[#009ac0] transition-all items-center gap-2 shadow-lg group"
              style={{ clipPath: 'polygon(0 0, 100% 0, 90% 100%, 0% 100%)' }}
            >
              Get Quote
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>

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
        <div className="flex items-center justify-between h-24 px-8 border-b border-white/5">
           <span className="text-white text-sm font-bold uppercase tracking-[0.2em]">Menu</span>
        </div>

        <div className="flex flex-col h-[calc(100%-6rem)] px-8 pb-10 justify-between mt-8">
          <div className="flex flex-col space-y-5">
            <a href="#home" onClick={() => setIsMenuOpen(false)} className="text-white text-[14px] font-medium border-b border-white/10 pb-3">Home</a>
            <a href="#about" onClick={() => setIsMenuOpen(false)} className="text-white text-[14px] font-medium border-b border-white/10 pb-3">About</a>
            <a href="#services" onClick={() => setIsMenuOpen(false)} className="text-white text-[14px] font-medium border-b border-white/10 pb-3">Services</a>
            <a href="#how" onClick={() => setIsMenuOpen(false)} className="text-white text-[14px] font-medium border-b border-white/10 pb-3">How It Works</a>
            <a href="#reviews" onClick={() => setIsMenuOpen(false)} className="text-white text-[14px] font-medium border-b border-white/10 pb-3">Reviews</a>
            <a href="#contacts" onClick={() => setIsMenuOpen(false)} className="text-white text-[14px] font-medium border-b border-white/10 pb-3">Contact</a>
          </div>
          
          <div className="flex flex-col space-y-6">
            <a href="tel:+27120234324" className="text-white font-bold text-[14px]">+27 12 023 4324</a>
            <button 
              onClick={openQuoteModal}
              className="bg-[#00B4D8] text-white font-bold text-sm tracking-widest uppercase py-4 px-6 pr-10 hover:bg-[#009ac0] transition-all flex items-center justify-between shadow-lg group"
              style={{ clipPath: 'polygon(0 0, 100% 0, 90% 100%, 0% 100%)' }}
            >
              Get Quote
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* 5. MODAL COMPONENT (NO WHITE BACKGROUND) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
            onClick={() => setIsModalOpen(false)}
          />
          
          {/* Form Container (Transparent with no padding/rounded edge to let QuoteForm shine) */}
          <div className="relative z-[110] w-full max-w-xl animate-in fade-in zoom-in duration-300">
            {/* Close Button (White for visibility) */}
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute -top-10 right-0 text-white/70 hover:text-white transition-colors z-20 flex items-center gap-2 text-xs uppercase tracking-widest font-bold"
            >
              Close <X size={20} />
            </button>
            
            {/* Form Content */}
            <div className="w-full">
                <QuoteForm />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;