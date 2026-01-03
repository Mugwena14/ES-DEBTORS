import React from 'react';
import { MapPin, Navigation } from 'lucide-react';

const Location = () => {
  const mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3594.123456789!2d28.1907189!3d-25.7451267!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDQ0JzQyLjUiUyAyOMKwMTEnMjYuNiJF!5e0!3m2!1sen!2sza!4v1234567890";

  // Exact coordinates for directions
  const lat = -25.745126711339125;
  const lng = 28.19071890870454;

  return (
    <section className="bg-white py-16 md:py-24 border-t border-gray-100 relative overflow-hidden">
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-[#00B4D8]/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

      <div className="container mx-auto px-6 lg:px-24 relative z-10">
        
        {/* MOBILE ONLY TAG (Centered) */}
        <div className="flex md:hidden justify-center mb-10">
          <span className="text-[#00B4D8] font-bold text-xs uppercase tracking-[0.3em] border-b border-[#00B4D8]/30 pb-2">
            Find Us
          </span>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          
          {/* Left Side: Address Info */}
          <div className="w-full lg:w-1/3">
            {/* DESKTOP HEADER - Hidden on Mobile */}
            <div className="hidden md:block">
              <div className="flex items-center gap-2 mb-4">
                 <span className="w-8 h-[2px] bg-[#00B4D8]"></span>
                 <span className="text-[#00B4D8] font-bold text-sm uppercase tracking-[0.3em]">Find Us</span>
              </div>
              <h2 className="text-[#11013d] text-4xl font-bold mb-8">Visit Bank Towers</h2>
            </div>
            
            {/* Address Card */}
            <div className="p-8 bg-gray-50 border-l-4 border-[#00B4D8] shadow-sm">
              <div className="flex gap-4 items-start">
                <div className="relative">
                  <MapPin className="text-[#00B4D8] animate-bounce" size={28} />
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-1 bg-[#00B4D8]/20 rounded-full blur-sm"></span>
                </div>
                <div>
                  <h4 className="text-[#11013d] font-bold text-lg mb-2">Pretoria Central</h4>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    Office No 326, 3rd Floor<br />
                    Bank Towers Building<br />
                    190 Thabo Sehume St<br />
                    Pretoria, 0002
                  </p>
                  
                  <a 
                    href={`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`}
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center justify-center lg:justify-start gap-3 bg-[#00B4D8] text-white px-6 py-4 text-xs font-bold uppercase tracking-widest hover:bg-[#11013d] transition-all duration-300 w-full lg:w-fit shadow-md"
                  >
                    <Navigation size={14} /> Get Directions
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Map Frame */}
          <div className="w-full lg:w-2/3 h-[350px] md:h-[500px] relative">
            {/* Border accent hidden on mobile for cleaner look */}
            <div className="hidden md:block absolute inset-0 border border-gray-200 translate-x-4 translate-y-4 pointer-events-none"></div>
            
            <div className="w-full h-full relative z-10 shadow-xl overflow-hidden border border-gray-100 rounded-sm">
              <iframe
                title="MKH Office Location"
                src={mapUrl}
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

            {/* Accent Slant hidden on mobile to avoid overlap */}
            <div className="hidden md:block absolute top-0 right-0 w-24 h-24 bg-[#00B4D8] -skew-x-12 translate-x-8 -translate-y-8 z-0"></div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Location;