import React from 'react';
import LogoLoop from './Loop'; 

const creditorNetwork = [
  // { src: "https://res.cloudinary.com/dkmzveqce/image/upload/v1736034107/TFG_Logo_mkh.png", alt: "TFG", href: "#" },
  // { src: "https://res.cloudinary.com/dkmzveqce/image/upload/v1736034107/DMC_Logo_mkh.png", alt: "DMC", href: "#" },
  // { src: "https://res.cloudinary.com/dkmzveqce/image/upload/v1736034107/Nimble_Logo_mkh.png", alt: "NIMBLE GROUP", href: "#" },
  // { src: "https://res.cloudinary.com/dkmzveqce/image/upload/v1736034107/VVM_Logo_mkh.png", alt: "VVM", href: "#" },
  // { src: "https://res.cloudinary.com/dkmzveqce/image/upload/v1736034107/Rage_Logo_mkh.png", alt: "RAGE", href: "#" },
  { src: "https://res.cloudinary.com/dkmzveqce/image/upload/v1767613614/ChatGPT_Image_Jan_5_2026_02_01_30_AM_coz1rj.png", alt: "CAPITEC", href: "#" },
  { src: "https://res.cloudinary.com/dkmzveqce/image/upload/v1767613547/ChatGPT_Image_Jan_5_2026_02_08_28_AM_gkidf7.png", alt: "FNB", href: "#" },
  { src: "https://res.cloudinary.com/dkmzveqce/image/upload/v1767613533/nedbank_no_bg_mdrf2e.png", alt: "NEDBANK", href: "#" },
  { src: "https://res.cloudinary.com/dkmzveqce/image/upload/v1767613534/ChatGPT_Image_Jan_5_2026_10_28_10_AM_udbmmp.png", alt: "WESBANK", href: "#" },
  // { src: "https://res.cloudinary.com/dkmzveqce/image/upload/v1736034107/Barko_Logo_mkh.png", alt: "BARKO", href: "#" },
  // { src: "https://res.cloudinary.com/dkmzveqce/image/upload/v1736034107/Atlas_Logo_mkh.png", alt: "ATLAS", href: "#" },
  // { src: "https://res.cloudinary.com/dkmzveqce/image/upload/v1736034107/Unifi_Logo_mkh.png", alt: "UNIFI", href: "#" },
  // { src: "https://res.cloudinary.com/dkmzveqce/image/upload/v1736034107/Letsatsi_Logo_mkh.png", alt: "LETSATSI FINANCE", href: "#" },
  // { src: "https://res.cloudinary.com/dkmzveqce/image/upload/v1736034107/Mpowa_Logo_mkh.png", alt: "MPOWA FINANCE", href: "#" },
  // { src: "https://res.cloudinary.com/dkmzveqce/image/upload/v1736034107/Vodacom_Logo_mkh.png", alt: "VODACOM", href: "#" },
  { src: "https://res.cloudinary.com/dkmzveqce/image/upload/v1767613532/mtn_yn0lom.png", alt: "MTN", href: "#" },
  // { src: "https://res.cloudinary.com/dkmzveqce/image/upload/v1736034107/Telkom_Logo_mkh.png", alt: "TELKOM", href: "#" },
  // { src: "https://res.cloudinary.com/dkmzveqce/image/upload/v1736034107/CellC_Logo_mkh.png", alt: "CELL C", href: "#" },
];

function CreditorLoop() {
  return (
    <section className="py-1 -mt-20 -mb-3 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* ================= LOGO LOOP CONTAINER ================= */}
        <div className="relative py-6 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
          <LogoLoop
            logos={creditorNetwork}
            speed={150} 
            direction="right" 
            logoHeight={40} 
            gap={80} 
            scaleOnHover
            fadeOut
            fadeOutColor="#ffffff"
            ariaLabel="Creditor Network"
          />
        </div>
        
      </div>
    </section>
  );
}

export default CreditorLoop;