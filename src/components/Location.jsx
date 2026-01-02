import React from 'react';
import { MapPin, Navigation } from 'lucide-react';

const Location = () => {
  const mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3593.5936!2d28.1885!3d-25.7451!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e981211d7183a97%3A0xf2fbe328f476c511!2sBank%20Towers!5e0!3m2!1sen!2sza!4v1700000000000";

  // Exact coordinates for directions
  const lat = -25.745126711339125;
  const lng = 28.19071890870454;

  return (
    // Background changed to white, border color adjusted for light mode
    <section className="bg-white py-24 border-t border-gray-100 relative overflow-hidden">
      {/* Glow adjusted to be very subtle against the white background */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-[#00B4D8]/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

      <div className="container mx-auto px-12 lg:px-24 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Left Side: Text colors updated for visibility on white */}
          <div className="w-full lg:w-1/3">
            <div className="flex items-center gap-2 mb-4">
               <span className="w-8 h-[2px] bg-[#00B4D8]"></span>
               <span className="text-[#00B4D8] font-bold text-sm uppercase tracking-[0.3em]">Find Us</span>
            </div>
            
            {/* Title changed to brand navy */}
            <h2 className="text-[#11013d] text-4xl font-bold mb-8">Visit Bank Towers</h2>
            
            {/* Box background changed to a very light gray/brand-tint */}
            <div className="p-8 bg-gray-50 border-l-4 border-[#00B4D8]">
              <div className="flex gap-4 items-start">
                <div className="relative">
                  <MapPin className="text-[#00B4D8] animate-bounce" size={28} />
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-1 bg-[#00B4D8]/20 rounded-full blur-sm"></span>
                </div>
                <div>
                  {/* Text changed to brand navy and dark grays */}
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
                    className="flex items-center gap-3 bg-[#00B4D8] text-white px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-[#11013d] transition-all duration-300 w-fit shadow-md hover:shadow-lg"
                  >
                    <Navigation size={14} /> Get Directions
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Map Frame */}
          <div className="w-full lg:w-2/3 h-[500px] relative">
            {/* Frame border color adjusted for light background */}
            <div className="absolute inset-0 border border-gray-200 translate-x-4 translate-y-4 pointer-events-none"></div>
            
            <div className="w-full h-full relative z-10 shadow-xl overflow-hidden border border-gray-100 rounded-sm">
              <iframe
                title="MKH Office Location"
                src={mapUrl}
                width="100%"
                height="100%"
                style={{ 
                  border: 0, 
                  /* Kept the clean "Silver" filter you liked */
                  filter: 'grayscale(0.2) contrast(1.1) brightness(1.1) saturate(0.9)',
                }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            {/* Accent Slant remains brand blue */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#00B4D8] -skew-x-12 translate-x-8 -translate-y-8 z-0"></div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Location;