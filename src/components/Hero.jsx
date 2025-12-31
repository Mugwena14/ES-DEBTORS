import React from 'react';
import { Play } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative w-full min-h-screen flex items-center bg-gray-900 font-sans">
      
      {/* 1. Background Image with Overlay */}
      {/* Replace 'bg-office.jpg' with your actual background image (debt.jpg or similar) */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')" 
        }}
      >
        {/* Dark Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* 2. Main Container */}
      <div className="container mx-auto px-6 lg:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20">
        
        {/* LEFT COLUMN: Hero Text */}
        <div className="text-white max-w-2xl">
            <h1 className="text-4xl md:text-4xl lg:text-[3.7rem] font-bold leading-[1.1] mb-8 drop-shadow-xl">
                <span className="text-[#00B4D8]">Financial Advice</span><br />
                to get you back where<br />
                you <span className="text-[#00B4D8]">belong.</span>
            </h1>

          {/* Slanted 'WATCH VIDEO' Button */}
          {/* We use clip-path to create the angled right edge */}
          <button 
            className="bg-white text-black font-bold text-sm tracking-widest uppercase py-4 px-8 pr-12 hover:bg-gray-100 transition-colors flex items-center gap-3 drop-shadow-md group"
            style={{ clipPath: 'polygon(0 0, 100% 0, 92% 100%, 0% 100%)' }}
          >
            Our Services
            <Play className="w-4 h-4 fill-black group-hover:scale-110 transition-transform" />
          </button>
        </div>

        {/* RIGHT COLUMN: The Form Card */}
        <div className="w-full max-w-md mt-5 ml-auto">
        {/* Blue Box Container */}
        <div className="bg-[#0033A1] p-6 md:p-8 shadow-2xl relative">
            
            {/* Centered Form Header */}
            <div className="text-center mb-8">
            <h2 className="text-white text-3xl font-bold leading-tight">
                Get A Free Quote
            </h2>
            <p className="text-cyan-400 text-xs uppercase tracking-[0.2em] mt-2 font-medium">
                Start your journey to debt freedom
            </p>
            </div>

            {/* Input Fields */}
            <form className="space-y-3">
            {/* 1. Full Name */}
            <div>
                <input 
                type="text" 
                placeholder="Full Name" 
                className="w-full p-3 text-gray-800 bg-white rounded-sm border-none outline-none focus:ring-2 focus:ring-[#00B4D8]"
                />
            </div>

            {/* 2. Services Select (New) */}
            <div>
                <select 
                className="w-full p-3 text-gray-800 bg-white rounded-sm border-none outline-none focus:ring-2 focus:ring-[#00B4D8] appearance-none cursor-pointer"
                defaultValue=""
                >
                <option value="" disabled>Select a Service</option>
                <option value="debt-review-removal">Debt review removal</option>
                <option value="car-applications">Car applications</option>
                <option value="credit-report">Credit report</option>
                <option value="settlement-letters">Settlement letters</option>
                <option value="payment-arrangements">Payment arrangements</option>
                <option value="judgement-removal">Judgement removal</option>
                <option value="defaults-on-accounts">Defaults on accounts</option>
                <option value="prescription-letters">Prescription letters</option>
                </select>
            </div>
            
            {/* 3. Mobile Number */}
            <div>
                <input 
                type="tel" 
                placeholder="Mobile Number" 
                className="w-full p-3 text-gray-800 bg-white rounded-sm border-none outline-none focus:ring-2 focus:ring-[#00B4D8]"
                />
            </div>

            {/* 4. WhatsApp */}
            <div>
                <input 
                type="tel" 
                placeholder="WhatsApp Number" 
                className="w-full p-3 text-gray-800 bg-white rounded-sm border-none outline-none focus:ring-2 focus:ring-[#00B4D8]"
                />
            </div>

            {/* 5. Email */}
            <div>
                <input 
                type="email" 
                placeholder="Email" 
                className="w-full p-3 text-gray-800 bg-white rounded-sm border-none outline-none focus:ring-2 focus:ring-[#00B4D8]"
                />
            </div>

            {/* Cyan Submit Button with Slant */}
            <div className="pt-2">
                <button 
                type="button"
                className="bg-[#00B4D8] text-white font-bold text-sm tracking-widest uppercase w-full py-4 px-6 hover:bg-[#00a0c0] transition-colors text-center"
                style={{ clipPath: 'polygon(0 0, 100% 0, 95% 100%, 0% 100%)' }}
                >
                Submit
                </button>
            </div>
            </form>
        </div>

        {/* Bottom decorative bar */}
        <div className="h-2 w-full bg-[#00B4D8]/30"></div>
        </div>

      </div>
    </div>
  );
};

export default Hero;