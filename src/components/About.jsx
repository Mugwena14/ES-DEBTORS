import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Star, X, Info } from 'lucide-react';

const About = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const highlights = [
    "Debt Review Removal",
    "Judgement Removal",
    "Prescription Letters",
    "Credit Report Clearance",
    "Settlement Negotiations",
    "Car Application Support"
  ];

  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden relative">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          
          {/* LEFT SIDE: IMAGE COMPOSITION */}
          <div className="hidden lg:block w-full lg:w-1/2 relative">
            <div 
              className="absolute -top-6 -left-6 w-32 h-32 bg-[#00B4D8]/10 z-0"
              style={{ clipPath: 'polygon(0 0, 100% 0, 100% 70%, 30% 100%, 0% 100%)' }}
            ></div>
            
            <div className="relative z-10">
              <img 
                src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800" 
                alt="Financial Credit Solutions" 
                className="rounded-none shadow-2xl w-full object-cover h-[500px]"
                style={{ clipPath: 'polygon(0 0, 100% 0, 100% 90%, 90% 100%, 0% 100%)' }}
              />
              
              <div className="absolute -bottom-6 -right-6 flex items-stretch shadow-xl">
                <div className="bg-white p-5 border-l-2 border-[#00B4D8] min-w-[120px]">
                  <div className="flex items-center gap-0.5 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={10} className={i < 4 ? "fill-yellow-400 text-yellow-400" : "fill-yellow-400/30 text-yellow-400/30"} />
                    ))}
                  </div>
                  <span className="block text-[#11013d] text-2xl font-bold leading-none">4.6</span>
                  <span className="text-gray-400 text-[9px] font-bold uppercase tracking-wider">Google Rating</span>
                </div>

                <div className="bg-[#0033A1] p-5 min-w-[120px]">
                  <div className="text-white">
                    <span className="block text-2xl font-bold leading-none">100%</span>
                    <span className="text-[#2ED8D4] text-[9px] font-bold uppercase tracking-wider">Legal Compliance</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: CONTENT */}
          <div className="w-full lg:w-1/2">
            <div className="inline-block mb-4">
              <span className="text-[#00B4D8] font-bold text-sm uppercase tracking-[0.3em] flex items-center gap-3">
                <span className="w-8 h-[2px] bg-[#00B4D8]"></span>
                About Us
              </span>
            </div>
            
            <h2 className="text-[#0033A1] text-3xl md:text-4xl font-bold leading-tight mb-6">
              Restore Your Credit & Reclaim Your <span className="text-[#00B4D8]">Financial</span> Freedom
            </h2>
            
            <p className="text-gray-600 text-base md:text-[16px] mb-8 leading-relaxed">
              At MKH Debtors Associates, we specialize in cleaning your financial record. From <strong>removing debt review flags</strong> and <strong>judgements</strong> to handling <strong>prescription letters</strong>, we provide the legal pathway to a clear credit report.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4 mb-10">
              {highlights.map((item, index) => (
                <div key={index} className="flex items-center gap-3 group">
                  <CheckCircle2 className="text-[#2ED8D4] w-5 h-5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="text-[#0033A1] font-semibold text-sm">{item}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-8 items-start sm:items-center">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-[#00B4D8] text-white font-bold text-xs tracking-widest uppercase py-4 px-8 pr-10 hover:bg-[#0033A1] transition-all flex items-center gap-3 shadow-lg group relative"
                style={{ clipPath: 'polygon(0 0, 100% 0, 90% 100%, 0% 100%)' }}
              >
                Requirements
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <div className="flex flex-col border-l-2 border-[#2ED8D4]/20 pl-4 sm:border-0 sm:pl-0">
                <span className="text-gray-400 text-[10px] uppercase font-bold tracking-widest">Free Credit Check</span>
                <span className="text-[#0033A1] font-bold text-lg md:text-xl">+012 023 4324</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* REQUIREMENTS MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-[#11013d]/80 backdrop-blur-sm transition-opacity"
            onClick={() => setIsModalOpen(false)}
          ></div>
          
          {/* Modal Content */}
          <div className="relative bg-white w-full max-w-md shadow-2xl transform transition-all border-t-4 border-[#00B4D8]">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-[#0033A1] transition-colors"
            >
              <X size={24} />
            </button>
            
            <div className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-[#00B4D8]/10 p-2 text-[#00B4D8]">
                  <Info size={20} />
                </div>
                <h3 className="text-[#11013d] text-xl font-bold uppercase tracking-tight">Application Requirements</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-gray-50 border border-gray-100 group hover:border-[#00B4D8]/30 transition-colors">
                  <div className="w-10 h-10 bg-[#00B4D8] flex items-center justify-center text-white shrink-0" style={{ clipPath: 'polygon(0 0, 100% 0, 80% 100%, 0% 100%)' }}>
                    <span className="font-bold">01</span>
                  </div>
                  <div>
                    <p className="text-gray-400 text-[10px] uppercase font-bold tracking-widest leading-none mb-1">Service Fee</p>
                    <p className="text-[#11013d] font-bold">Consultation Fee of R350</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-gray-50 border border-gray-100 group hover:border-[#00B4D8]/30 transition-colors">
                  <div className="w-10 h-10 bg-[#0033A1] flex items-center justify-center text-white shrink-0" style={{ clipPath: 'polygon(0 0, 100% 0, 80% 100%, 0% 100%)' }}>
                    <span className="font-bold">02</span>
                  </div>
                  <div>
                    <p className="text-gray-400 text-[10px] uppercase font-bold tracking-widest leading-none mb-1">Documentation</p>
                    <p className="text-[#11013d] font-bold">Valid ID Copy</p>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setIsModalOpen(false)}
                className="w-full mt-8 bg-[#11013d] text-white font-bold py-4 text-xs uppercase tracking-[0.2em] hover:bg-[#00B4D8] transition-all"
              >
                I Understand
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default About;