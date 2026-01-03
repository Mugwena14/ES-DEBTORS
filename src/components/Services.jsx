import React, { useState } from 'react';
import { 
  UserMinus, 
  FileText, 
  AlertCircle, 
  Gavel, 
  CalendarCheck, 
  MailCheck, 
  BarChart3, 
  Car,
  Phone,
  X
} from 'lucide-react';

const Services = () => {
  const [activeService, setActiveService] = useState(null);

  const serviceList = [
    {
      title: "Debt Review Removal",
      desc: "Legal process to remove debt review flags from your credit profile.",
      icon: <UserMinus className="w-5 h-5 text-[#0033A1]" />
    },
    {
      title: "Prescription Letters",
      desc: "Drafting legal notices for debts that are no longer legally enforceable.",
      icon: <FileText className="w-5 h-5 text-[#0033A1]" />
    },
    {
      title: "Defaults on Accounts",
      desc: "Challenging and removing unfair default listings from your record.",
      icon: <AlertCircle className="w-5 h-5 text-[#0033A1]" />
    },
    {
      title: "Judgement Removal",
      desc: "Legal rescission of court judgements once debts are settled.",
      icon: <Gavel className="w-5 h-5 text-[#0033A1]" />
    },
    {
      title: "Payment Arrangements",
      desc: "Negotiating sustainable monthly installments with your creditors.",
      icon: <CalendarCheck className="w-5 h-5 text-[#0033A1]" />
    },
    {
      title: "Settlement Letters",
      desc: "Negotiating discount settlements to close accounts for less.",
      icon: <MailCheck className="w-5 h-5 text-[#0033A1]" />
    },
    {
      title: "Credit Report",
      desc: "Comprehensive analysis of your current credit standing and health.",
      icon: <BarChart3 className="w-5 h-5 text-[#0033A1]" />
    },
    {
      title: "Car Applications",
      desc: "Assisting rehabilitated clients with successful vehicle finance.",
      icon: <Car className="w-5 h-5 text-[#0033A1]" />
    }
  ];

  return (
    <section className="py-24 bg-[#11013d] relative">
      <div className="container mx-auto px-6 lg:px-24">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 -mt-10">
          <h2 className="text-white text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-blue-100 text-[14px] leading-relaxed opacity-90">
            We provide specialized legal and financial <br className="hidden md:block" />
            interventions to help you clean your record and regain your financial standing.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center mb-20">
          {serviceList.map((service, index) => (
            <div 
              key={index} 
              onClick={() => {
                if (window.innerWidth < 768) setActiveService(service);
              }}
              className="flex flex-col items-center md:items-start p-6 w-full max-w-[280px] transition-all duration-300 border border-white/10 hover:border-[#00B4D8] hover:bg-white/5 group text-center md:text-left cursor-pointer md:cursor-default"
            >
              <div className="bg-white p-2.5 rounded-full mb-4 shadow-lg group-hover:scale-110 transition-transform">
                {service.icon}
              </div>
              
              <h3 className="text-white text-[15px] font-bold mb-2 leading-tight transition-colors group-hover:text-[#00B4D8]">
                {service.title}
              </h3>
              
              <p className="hidden md:block text-blue-100/70 text-[13px] leading-relaxed">
                {service.desc}
              </p>

              <span className="md:hidden text-[#00B4D8] text-[10px] uppercase font-bold tracking-widest mt-2 opacity-60">
                Tap for Details
              </span>
            </div>
          ))}
        </div>

        {/* SERVICE MODAL (Mobile Only) */}
        {activeService && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-6 md:hidden">
            <div 
              className="absolute inset-0 bg-[#11013d]/95 backdrop-blur-md"
              onClick={() => setActiveService(null)}
            ></div>
            
            <div className="relative bg-white w-full max-w-sm p-8 shadow-2xl border-t-4 border-[#00B4D8] animate-in fade-in zoom-in duration-200">
              <button 
                onClick={() => setActiveService(null)}
                className="absolute top-4 right-4 text-[#11013d]/40 hover:text-[#00B4D8]"
              >
                <X size={24} />
              </button>

              <div className="flex flex-col items-center text-center">
                <div className="bg-[#11013d] p-4 rounded-full mb-6">
                  {React.cloneElement(activeService.icon, { className: "w-8 h-8 text-white" })}
                </div>
                <h3 className="text-[#11013d] text-2xl font-bold mb-4">
                  {activeService.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-base">
                  {activeService.desc}
                </p>
                
                <button 
                  onClick={() => setActiveService(null)}
                  className="mt-8 bg-[#00B4D8] text-white w-full py-4 font-bold uppercase text-xs tracking-widest"
                >
                  Close Details
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Wide CTA Banner */}
        <div className="bg-[#00B4D8] p-8 md:p-12 shadow-2xl relative overflow-hidden group w-full flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="relative z-10 text-center md:text-left">
                <h3 className="text-white text-2xl md:text-3xl font-bold mb-2">
                    Need a Custom Solution?
                </h3>
                <p className="hidden md:block text-white/90 text-sm max-w-md">
                    Every financial journey is unique. Contact us today for a personalized assessment 
                    of your credit profile and a custom roadmap to freedom.
                </p>
            </div>
            
            {/* LINK REPLACED HERE */}
            <a 
              href="tel:0120234324" 
              className="bg-white text-[#00B4D8] font-bold py-4 px-10 rounded-none text-sm flex items-center justify-center gap-3 hover:bg-[#11013d] hover:text-white transition-all duration-300 z-10 uppercase tracking-widest shadow-lg shrink-0 border border-transparent no-underline"
            >
                <Phone size={18} />
                Speak to an Expert
            </a>

            <div className="absolute top-0 right-0 w-1/3 h-full bg-white/20 -skew-x-12 translate-x-16 pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
};

export default Services;