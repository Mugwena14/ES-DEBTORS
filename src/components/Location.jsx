import React, { useState } from 'react';
import { MapPin, Navigation, Building2 } from 'lucide-react';

const Location = () => {
  const [activeBranch, setActiveBranch] = useState('pretoria');

  const branches = {
    pretoria: {
      name: "Pretoria Central",
      title: "Bank Towers Office",
      address: "Office No 326, 3rd Floor, Bank Towers Building, 190 Thabo Sehume St, Pretoria, 0002",
      lat: -25.745126711339125,
      lng: 28.19071890870454,
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3593.81577742138!2d28.18814397624108!3d-25.7451267!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e981326462f4477%3A0xc3f98299839659b9!2s190%20Thabo%20Sehume%20St%2C%20Pretoria%20Central%2C%20Pretoria%2C%200002!5e0!3m2!1sen!2sza!4v1710000000000!5m2!1sen!2sza"
    },
    burgersfort: {
      name: "Burgersfort",
      title: "Aloe Ridge Branch",
      address: "10 Tambotie St, Aloe Ridge, Burgersfort, 1150",
      lat: -24.6738, 
      lng: 30.3275,
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3621.571439266395!2d30.32531137620601!3d-24.6738000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1ec252062534c0fb%3A0x644265432654321!2s10%20Tambotie%20St%2C%20Aloe%20Ridge%2C%20Burgersfort%2C%201150!5e0!3m2!1sen!2sza!4v1710000000000!5m2!1sen!2sza"
    }
  };

  const current = branches[activeBranch];

  return (
    <section className="bg-white py-16 md:py-24 border-t border-gray-100 relative overflow-hidden">
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-[#00B4D8]/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

      <div className="container mx-auto px-6 lg:px-24 relative z-10">
        
        {/* HEADER SECTION */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
             <span className="w-8 h-[2px] bg-[#00B4D8]"></span>
             <span className="text-[#00B4D8] font-bold text-sm uppercase tracking-[0.3em]">Our Locations</span>
             <span className="w-8 h-[2px] bg-[#00B4D8]"></span>
          </div>
          <h2 className="text-[#11013d] text-4xl font-bold mb-4">Visit Our Offices</h2>
          <p className="text-gray-500 max-w-lg mx-auto text-sm">Choose a branch below to view details and get directions to our nearest office.</p>
        </div>

        {/* BRANCH TOGGLE BUTTONS */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {Object.keys(branches).map((key) => (
            <button
              key={key}
              onClick={() => setActiveBranch(key)}
              className={`flex items-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-widest transition-all duration-300 border ${
                activeBranch === key 
                ? 'bg-[#11013d] text-white border-[#11013d] shadow-lg scale-105' 
                : 'bg-white text-gray-500 border-gray-200 hover:border-[#00B4D8] hover:text-[#00B4D8]'
              }`}
            >
              <Building2 size={16} />
              {branches[key].name}
            </button>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-stretch">
          
          {/* Left Side: Address Info */}
          <div className="w-full lg:w-1/3 flex flex-col justify-center">
            <div className="p-8 bg-gray-50 border-l-4 border-[#00B4D8] shadow-sm animate-in fade-in slide-in-from-left-4 duration-500">
              <div className="flex gap-4 items-start">
                <div className="relative">
                  <MapPin className="text-[#00B4D8] animate-bounce" size={28} />
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-1 bg-[#00B4D8]/20 rounded-full blur-sm"></span>
                </div>
                <div>
                  <h4 className="text-[#11013d] font-bold text-xl mb-2">{current.title}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed mb-8">
                    {current.address.split(',').map((part, i) => (
                      <React.Fragment key={i}>
                        {part.trim()}<br />
                      </React.Fragment>
                    ))}
                  </p>
                  
                  <a 
                    href={`https://www.google.com/maps/dir/?api=1&destination=${current.lat},${current.lng}`}
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center justify-center gap-3 bg-[#00B4D8] text-white px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-[#11013d] transition-all duration-300 w-full shadow-md"
                  >
                    <Navigation size={14} /> Get Directions
                  </a>
                </div>
              </div>
            </div>

            {/* Branch Meta (Optional creative touch) */}
            <div className="mt-6 grid grid-cols-2 gap-4">
               <div className="bg-blue-50/50 p-4 rounded-sm text-center">
                  <span className="block text-[#11013d] font-bold text-sm">Walk-ins</span>
                  <span className="text-gray-500 text-[10px] uppercase">Welcome</span>
               </div>
               <div className="bg-blue-50/50 p-4 rounded-sm text-center">
                  <span className="block text-[#11013d] font-bold text-sm">Consultation</span>
                  <span className="text-gray-500 text-[10px] uppercase">In Sessions</span>
               </div>
            </div>
          </div>

          {/* Right Side: Map Frame */}
          <div className="w-full lg:w-2/3 h-[400px] md:h-[550px] relative">
            <div className="hidden md:block absolute inset-0 border border-gray-200 translate-x-4 translate-y-4 pointer-events-none"></div>
            
            <div className="w-full h-full relative z-10 shadow-xl overflow-hidden border border-gray-100 rounded-sm">
              <iframe
                key={activeBranch} 
                title={`MKH ${current.name} Location`}
                src={current.mapUrl}
                width="100%"
                height="100%"
                style={{ 
                  border: 0, 
                  filter: 'grayscale(0.1) contrast(1.1)',
                }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            {/* Decorative Accent */}
            <div className="hidden md:block absolute top-0 right-0 w-24 h-24 bg-[#00B4D8] -skew-x-12 translate-x-8 -translate-y-8 z-0"></div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Location;