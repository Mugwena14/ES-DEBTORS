import React from 'react';
import { ArrowRight, CheckCircle2, Star } from 'lucide-react';

const About = () => {
  const highlights = [
    "Debt Review Removal",
    "Judgement Removal",
    "Prescription Letters",
    "Credit Report Clearance",
    "Settlement Negotiations",
    "Car Application Support"
  ];

  return (
    <section className="py-10 bg-white overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* LEFT SIDE: IMAGE COMPOSITION */}
          <div className="w-full lg:w-1/2 relative">
            <div 
              className="absolute -top-6 -left-6 w-32 h-32 bg-[#00B4D8]/10 z-0 hidden md:block"
              style={{ clipPath: 'polygon(0 0, 100% 0, 100% 70%, 30% 100%, 0% 100%)' }}
            ></div>
            
            <div className="relative z-10">
              <img 
                src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800" 
                alt="Financial Credit Solutions" 
                className="rounded-none shadow-2xl w-full object-cover h-[500px]"
                style={{ clipPath: 'polygon(0 0, 100% 0, 100% 90%, 90% 100%, 0% 100%)' }}
              />
              
              {/* COMPACT STATS CONTAINERS */}
              <div className="absolute -bottom-6 -right-6 flex hidden md:flex items-stretch shadow-xl">
                
                {/* Compact Google Rating */}
                <div className="bg-white p-5 border-l-2 border-[#00B4D8] min-w-[120px]">
                  <div className="flex items-center gap-0.5 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={10} className={i < 4 ? "fill-yellow-400 text-yellow-400" : "fill-yellow-400/30 text-yellow-400/30"} />
                    ))}
                  </div>
                  <span className="block text-[#11013d] text-2xl font-bold leading-none">4.6</span>
                  <span className="text-gray-400 text-[9px] font-bold uppercase tracking-wider">
                    Google Rating
                  </span>
                </div>

                {/* Compact Legal Compliance */}
                <div className="bg-[#0033A1] p-5 min-w-[120px]">
                  <div className="text-white">
                    <span className="block text-2xl font-bold leading-none">100%</span>
                    <span className="text-[#2ED8D4] text-[9px] font-bold uppercase tracking-wider">
                      Legal Compliance
                    </span>
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
            
            <h2 className="text-[#0033A1] text-4xl font-bold leading-tight mb-6">
              Restore Your Credit & Reclaim Your <span className="text-[#00B4D8]">Financial</span> Freedom
            </h2>
            
            <p className="text-gray-600 text-[16px] mb-8 leading-relaxed">
              At MKH Debtors Associates, we specialize in cleaning your financial record. From <strong>removing debt review flags</strong> and <strong>judgements</strong> to handling <strong>prescription letters</strong> and account defaults, we provide the legal pathway to a clear credit report.
            </p>

            {/* Highlights Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3 mb-10">
              {highlights.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="text-[#2ED8D4] w-4 h-4 flex-shrink-0" />
                  <span className="text-[#0033A1] font-semibold text-sm">{item}</span>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-6 items-center">
              <button 
                className="bg-[#00B4D8] text-white font-bold text-xs tracking-widest uppercase py-4 px-8 pr-10 hover:bg-[#0033A1] transition-all flex items-center gap-3 shadow-lg group relative"
                style={{ clipPath: 'polygon(0 0, 100% 0, 90% 100%, 0% 100%)' }}
              >
                Requirements
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <div className="flex flex-col">
                <span className="text-gray-400 text-[10px] uppercase font-bold tracking-widest">Free Credit Check</span>
                <span className="text-[#0033A1] font-bold text-lg">+012 023 4324</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;