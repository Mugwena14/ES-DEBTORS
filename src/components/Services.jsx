import React from 'react';
import { 
  UserMinus, 
  FileText, 
  AlertCircle, 
  Gavel, 
  CalendarCheck, 
  MailCheck, 
  BarChart3, 
  Car,
  Phone
} from 'lucide-react';

const Services = () => {
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
    <section className="py-24 bg-[#11013d]">
      <div className="container mx-auto px-12 lg:px-24">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 -mt-10">
          <h2 className="text-white text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-blue-100 text-[14px] -mb-10 leading-relaxed opacity-90">
            We provide specialized legal and financial <br className="hidden md:block" />
            interventions to help you clean your record and regain your financial standing.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center mb-20">
          {serviceList.map((service, index) => (
            /* Card with Light Border and Hover Effect */
            <div 
              key={index} 
              className="flex flex-col items-start p-6 w-full max-w-[260px] transition-all duration-300 border border-white/10 hover:border-[#00B4D8] hover:bg-white/5 group"
            >
              {/* Icon container - static shadow, no hover lift here */}
              <div className="bg-white p-2.5 rounded-full mb-4 shadow-lg">
                {service.icon}
              </div>
              
              <h3 className="text-white text-[15px] font-bold mb-2 leading-tight transition-colors group-hover:text-[#00B4D8]">
                {service.title}
              </h3>
              
              <p className="text-blue-100/70 text-[13px] leading-relaxed">
                {service.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Wide CTA Banner */}
        <div className="bg-[#00B4D8] -mt-15 p-8 md:p-12 shadow-2xl relative overflow-hidden group w-full flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="relative z-10 text-center md:text-left">
                <h3 className="text-white text-2xl font-bold mb-2">Need a Custom Solution?</h3>
                <p className="text-white/90 text-sm max-w-md">
                Every financial journey is unique. Contact us today for a personalized assessment 
                of your credit profile and a custom roadmap to freedom.
                </p>
            </div>
            
            {/* Updated Button with Darker Blue Hover */}
            <button className="bg-white text-[#00B4D8] font-bold py-4 px-10 rounded-none text-sm flex items-center justify-center gap-3 hover:bg-[#11013d] hover:text-white transition-all duration-300 z-10 uppercase tracking-widest shadow-lg shrink-0 border border-transparent hover:border-white/20">
                <Phone size={18} />
                Speak to an Expert
            </button>

            <div className="absolute top-0 right-0 w-1/3 h-full bg-white/20 -skew-x-12 translate-x-16 pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
};

export default Services;