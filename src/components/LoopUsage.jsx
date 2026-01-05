import React from 'react';
import LogoLoop from './Loop'; 
import { Briefcase } from 'lucide-react';

const companiesWorkedWith = [
  { 
    src: "https://res.cloudinary.com/dkmzveqce/image/upload/v1767567262/ChatGPT_Image_Jan_5_2026_12_41_05_AM_j80cdb.png", 
    alt: "Toyota", 
    href: "https://toyota.com" 
  },
  { 
    src: "https://res.cloudinary.com/dkmzveqce/image/upload/v1767567262/ChatGPT_Image_Jan_5_2026_12_32_38_AM_bgoovf.png", 
    alt: "Jetour", 
    href: "https://jetour.com" 
  },
  { 
    src: "https://res.cloudinary.com/dkmzveqce/image/upload/v1767567262/ChatGPT_Image_Jan_5_2026_12_35_01_AM_mwl3ad.png", 
    alt: "Ford", 
    href: "https://ford.com" 
  },
  { 
    src: "https://res.cloudinary.com/dkmzveqce/image/upload/v1767567258/ChatGPT_Image_Jan_5_2026_12_43_03_AM_dpgu16.png", 
    alt: "Mit Mak Motors", 
    href: "https://mitmak.com" 
  },
  { 
    src: "https://res.cloudinary.com/dkmzveqce/image/upload/v1767567251/ChatGPT_Image_Jan_5_2026_12_37_09_AM_ao0le7.png", 
    alt: "VW", 
    href: "https://vw.com" 
  },
];

function IconLoop() {
  return (
    <section className="py-1 -mt-20 -mb-3 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        

        {/* ================= LOGO LOOP CONTAINER ================= */}
        <div className="relative py-6 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
          <LogoLoop
            logos={companiesWorkedWith}
            speed={120} 
            direction="left"
            logoHeight={48} 
            gap={60}
            hoverSpeed={0}
            scaleOnHover
            fadeOut
            fadeOutColor="#ffffff"
            ariaLabel="Partner companies"
          />
        </div>
        
      </div>
    </section>
  );
}

export default IconLoop;