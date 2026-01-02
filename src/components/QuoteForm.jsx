import React from 'react';

const QuoteForm = () => {
  return (
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
        <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
          
          {/* 1. Full Name - Full Width */}
          <div>
            <input 
              type="text" 
              placeholder="Full Name" 
              className="w-full p-3 text-[13px] text-gray-800 bg-white rounded-sm border-none outline-none focus:ring-2 focus:ring-[#00B4D8]"
            />
          </div>

          {/* 2. Grid for ID Number and Service Selection */}
          <div className="grid grid-cols-2 gap-3">
            <input 
              type="text" 
              placeholder="ID Number" 
              className="w-full p-3 text-[13px] text-gray-800 bg-white rounded-sm border-none outline-none focus:ring-2 focus:ring-[#00B4D8]"
            />
            <select 
              className="w-full p-3 text-[13px] text-gray-800 bg-white rounded-sm border-none outline-none focus:ring-2 focus:ring-[#00B4D8] appearance-none cursor-pointer"
              defaultValue=""
            >
              <option value="" disabled>Select Service</option>
              <option value="debt-review-removal">Debt Review Removal</option>
              <option value="car-applications">Car application</option>
              <option value="credit-report">Credit report</option>
              <option value="judgement-removal">Judgement Removal</option>
              <option value="prescription-letters">Prescription Letter</option>
              <option value="settlement-letters">Settlement Letter</option>
              <option value="defaults-on-accounts">Defaults on Accounts</option>
              <option value="payment-arrangements">Payment Arrangements</option>
            </select>
          </div>

          {/* 3. Grid for Mobile and WhatsApp */}
          <div className="grid grid-cols-2 gap-3">
            <input 
              type="tel" 
              placeholder="Mobile No." 
              className="w-full p-3 text-[13px] text-gray-800 bg-white rounded-sm border-none outline-none focus:ring-2 focus:ring-[#00B4D8]"
            />
            <input 
              type="tel" 
              placeholder="WhatsApp" 
              className="w-full p-3 text-[13px] text-gray-800 bg-white rounded-sm border-none outline-none focus:ring-2 focus:ring-[#00B4D8]"
            />
          </div>

          {/* 4. Email - Full Width */}
          <div>
            <input 
              type="email" 
              placeholder="Email Address" 
              className="w-full p-3 text-[13px] text-gray-800 bg-white rounded-sm border-none outline-none focus:ring-2 focus:ring-[#00B4D8]"
            />
          </div>

          {/* Cyan Submit Button with Slant */}
          <div className="pt-2">
            <button 
              type="submit"
              className="bg-[#00B4D8] text-white font-bold text-sm tracking-widest uppercase w-full py-4 px-6 hover:bg-[#00a0c0] transition-colors text-center"
              style={{ clipPath: 'polygon(0 0, 100% 0, 95% 100%, 0% 100%)' }}
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>

      {/* Bottom decorative bar */}
      <div className="h-2 w-full bg-[#00B4D8]/30"></div>
    </div>
  );
};

export default QuoteForm;