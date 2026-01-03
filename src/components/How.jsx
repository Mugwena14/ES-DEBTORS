import React, { useState } from 'react';
import { ClipboardList, Search, MessageSquare, ShieldCheck, X } from 'lucide-react';
import QuoteForm from './QuoteForm'; 

const How = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const steps = [
    {
      title: "Step 1: Secure Application",
      desc: "Fill out our digital assessment form. Your data is encrypted and handled with 100% confidentiality.",
      icon: <ClipboardList className="w-8 h-8 text-[#00B4D8]" />,
    },
    {
      title: "Step 2: Credit Audit",
      desc: "Our specialists perform a deep-dive audit of your credit profile to identify removable flags and legal loopholes.",
      icon: <Search className="w-8 h-8 text-[#00B4D8]" />,
    },
    {
      title: "Step 3: Consultation",
      desc: "Receive a personalized roadmap via email. We'll call you to discuss the legal strategy and timeline.",
      icon: <MessageSquare className="w-8 h-8 text-[#00B4D8]" />,
    },
    {
      title: "Step 4: Legal Clearance",
      desc: "Our legal team executes the strategy, clearing your name and opening doors for your finances.",
      icon: <ShieldCheck className="w-8 h-8 text-[#00B4D8]" />,
    }
  ];

  return (
    <section className="py-12 md:py-24 bg-white overflow-hidden relative">
      <div className="container mx-auto px-10 lg:px-24">
        
        {/* Mobile-Only Tag (Centered) */}
        <div className="flex md:hidden justify-center mb-8">
          <span className="text-[#00B4D8] font-bold text-xs uppercase tracking-[0.3em] border-b-2 border-[#00B4D8]/20 pb-2">
            How It Works
          </span>
        </div>

        {/* Desktop Header */}
        <div className="hidden md:flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <span className="text-[#00B4D8] font-bold text-sm uppercase tracking-[0.3em]">How It Works</span>
            <h2 className="text-[#11013d] text-4xl font-bold mt-4">Your Path to <span className="text-[#00B4D8]">Financial Recovery</span></h2>
          </div>
          <p className="text-gray-500 max-w-sm text-sm leading-relaxed">
            We've streamlined the legal removal process into four simple steps to get you back in the driver's seat of your finances.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 relative">
          <div className="hidden lg:block absolute top-12 left-0 w-full h-[1px] bg-gray-100 z-0"></div>

          {steps.map((step, index) => (
            <div key={index} className="relative z-10 flex flex-col items-center md:items-start group text-center md:text-left">
              <div className="w-20 h-20 bg-white border-2 border-gray-100 rounded-none flex items-center justify-center mb-6 transition-all duration-300 group-hover:border-[#00B4D8] group-hover:shadow-xl relative overflow-hidden">
                {step.icon}
                <div className="absolute bottom-0 right-0 w-4 h-4 bg-[#00B4D8]/10 -skew-x-12 translate-x-2 translate-y-2"></div>
              </div>

              <span className="text-[#00B4D8] font-black text-5xl opacity-20 md:opacity-30 absolute top-0 right-0 lg:right-4 group-hover:opacity-70 transition-opacity">
                0{index + 1}
              </span>

              <h3 className="text-[#11013d] text-lg font-bold mb-3">{step.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Action Call Section */}
        <div className="mt-16 p-8 bg-gray-50 border-l-4 border-[#00B4D8] flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[#11013d] font-medium italic text-center md:text-left">
            "Ready to start? The initial assessment takes less than 2 minutes."
          </p>
          <button 
            onClick={() => setIsFormOpen(true)}
            className="bg-[#11013d] text-white w-full md:w-auto px-8 py-4 font-bold uppercase text-xs tracking-widest hover:bg-[#00B4D8] transition-colors shadow-lg"
          >
            Start Free Assessment
          </button>
        </div>
      </div>

      {/* CENTERED TRANSPARENT MODAL OVERLAY */}
      {isFormOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center">
          {/* Background overlay */}
          <div 
            className="absolute inset-0 bg-[#11013d]/95 backdrop-blur-xl transition-opacity"
            onClick={() => setIsFormOpen(false)}
          ></div>
          
          {/* Form Container - Perfectly Centered */}
          <div className="relative w-full max-w-2xl max-h-screen overflow-y-auto px-6 py-12 flex flex-col items-center animate-in fade-in zoom-in duration-300 no-scrollbar">
            
            {/* Close Button - Positioned relative to the form container width */}
            <button 
              onClick={() => setIsFormOpen(false)}
              className="absolute top-4 right-6 z-[210] p-2 text-white/50 hover:text-[#00B4D8] transition-colors bg-[#11013d]/50 rounded-full"
            >
              <X size={28} />
            </button>
            
            {/* The Quote Form */}
            <div className="w-full">
              <QuoteForm />
            </div>
            
          </div>
        </div>
      )}
    </section>
  );
};

export default How;