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
  MessageSquare,
  MapPin
} from 'lucide-react';
import QuoteForm from './QuoteForm'; 

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);

  const openQuoteModal = () => {
    setIsQuoteModalOpen(true);
    setIsMenuOpen(false);
    setIsCallModalOpen(false);
  };

  const openCallModal = (e) => {
    e.preventDefault();
    setIsCallModalOpen(true);
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
            
            {/* Call Us Trigger */}
            <button 
              onClick={openCallModal}
              className="flex text-[14px] items-center gap-1.5 text-white hover:text-[#00B4D8] transition-colors font-bold ml-2 uppercase tracking-widest"
            >
              <Phone className="w-4 h-4 text-[#00B4D8] fill-[#00B4D8]" />
              <span>Call Us</span>
            </button>
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
      <div className={`fixed top-0 right-0 h-full w-[75%] bg-[#0033A1] shadow-2xl transform transition-transform duration-300 ease-in-out lg:hidden z-[55] ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
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
            <button onClick={openCallModal} className="text-white font-bold text-[14px] flex items-center gap-2 uppercase tracking-widest">
              <Phone className="w-4 h-4 text-[#00B4D8]" /> Call Us
            </button>
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

      {/* 5. QUOTE MODAL */}
      {isQuoteModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/85 backdrop-blur-md" onClick={() => setIsQuoteModalOpen(false)} />
          <div className="relative z-[110] w-full max-w-xl animate-in fade-in zoom-in duration-300">
            <button onClick={() => setIsQuoteModalOpen(false)} className="absolute -top-10 right-0 text-white/70 hover:text-white transition-colors z-20 flex items-center gap-2 text-xs uppercase tracking-widest font-bold">
              Close <X size={20} />
            </button>
            <QuoteForm />
          </div>
        </div>
      )}

      {/* 6. CALL MODAL (BRANCHES) */}
      {isCallModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/85 backdrop-blur-md" onClick={() => setIsCallModalOpen(false)} />
          <div className="relative z-[110] w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="bg-[#11013d] border-t-4 border-[#00B4D8] p-8 shadow-2xl">
              <button onClick={() => setIsCallModalOpen(false)} className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors">
                <X size={24} />
              </button>
              
              <div className="text-center mb-8">
                <h3 className="text-white text-xl font-bold uppercase tracking-widest mb-2">Contact Our Offices</h3>
                <p className="text-blue-100/60 text-sm">Select a branch to call us directly</p>
              </div>

              <div className="space-y-4">
                {/* Pretoria Branch */}
                <a 
                  href="tel:+27120234324" 
                  className="group flex items-center gap-4 p-4 bg-white/5 border border-white/10 hover:border-[#00B4D8]/50 hover:bg-white/10 transition-all"
                >
                  <div className="w-12 h-12 bg-[#00B4D8]/20 flex items-center justify-center text-[#00B4D8] group-hover:bg-[#00B4D8] group-hover:text-white transition-colors">
                    <Phone size={20} />
                  </div>
                  <div className="text-left">
                    <p className="text-[#2ED8D4] text-[10px] font-bold uppercase tracking-widest mb-1">Pretoria Branch</p>
                    <p className="text-white font-bold text-lg">+27 12 023 4324</p>
                  </div>
                </a>

                {/* Burgersfort Branch */}
                <a 
                  href="tel:+27131706148" 
                  className="group flex items-center gap-4 p-4 bg-white/5 border border-white/10 hover:border-[#00B4D8]/50 hover:bg-white/10 transition-all"
                >
                  <div className="w-12 h-12 bg-[#00B4D8]/20 flex items-center justify-center text-[#00B4D8] group-hover:bg-[#00B4D8] group-hover:text-white transition-colors">
                    <Phone size={20} />
                  </div>
                  <div className="text-left">
                    <p className="text-[#2ED8D4] text-[10px] font-bold uppercase tracking-widest mb-1">Burgersfort Branch</p>
                    <p className="text-white font-bold text-lg">+27 13 170 6148</p>
                  </div>
                </a>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 text-center">
                <div className="flex items-center justify-center gap-2 text-blue-100/40 text-[11px] uppercase tracking-widest">
                  <Mail size={14} className="text-[#00B4D8]" />
                  <span>info@mkhdebtors.co.za</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;