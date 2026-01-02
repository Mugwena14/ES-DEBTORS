import React from 'react';
import { Star, Quote, CheckCircle } from 'lucide-react';

const Testimonials = () => {
  const reviews = [
    {
      name: "Thabo Mokoena",
      role: "Debt Review Removal",
      text: "MKH helped me remove my debt review flag in record time. I was finally able to apply for a home loan after 5 years of being stuck. Professional and transparent service!",
      rating: 5
    },
    {
      name: "Sarah Jenkins",
      role: "Judgement Rescission",
      text: "I had an old judgement that was ruining my life. The team at MKH handled the legal paperwork perfectly. My credit score has improved significantly. Highly recommended.",
      rating: 5
    },
    {
      name: "Lindiwe Dlamini",
      role: "Car Application Support",
      text: "After being declined everywhere, MKH analyzed my report and helped me clear prescription debt. Today I am driving my new car thanks to their guidance.",
      rating: 5
    }
  ];

  return (
    <section className="bg-[#11013d] py-24 relative overflow-hidden">
      {/* Decorative Brand Accents */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#00B4D8]/5 blur-[100px] rounded-full"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#2ED8D4]/5 blur-[100px] rounded-full"></div>

      <div className="container mx-auto px-6 lg:px-24 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block mb-4">
            <span className="text-[#00B4D8] font-bold text-sm uppercase tracking-[0.3em] flex items-center justify-center gap-3">
              <span className="w-8 h-[2px] bg-[#00B4D8]"></span>
              Success Stories
              <span className="w-8 h-[2px] bg-[#00B4D8]"></span>
            </span>
          </div>
          <h2 className="text-white text-4xl md:text-5xl font-bold mb-6">
            Trusted by Thousands of <span className="text-[#2ED8D4]">Clear Credit</span> Holders
          </h2>
          <p className="text-blue-100/60 text-lg">
            We measure our success by the financial freedom of our clients. 
            Join the many South Africans who have reclaimed their lives.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div 
              key={index} 
              className="group bg-white/5 border border-white/10 p-8 relative hover:bg-white/10 transition-all duration-500"
            >
              {/* Floating Quote Icon */}
              <div className="absolute -top-4 right-8 w-10 h-10 bg-[#00B4D8] flex items-center justify-center shadow-lg">
                <Quote size={18} className="text-[#11013d] fill-current" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-6">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={14} className="fill-[#2ED8D4] text-[#2ED8D4]" />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-blue-100/80 italic leading-relaxed mb-8 relative z-10">
                "{review.text}"
              </p>

              {/* Client Info */}
              <div className="flex items-center gap-4 border-t border-white/10 pt-6">
                <div className="w-12 h-12 bg-[#00B4D8]/20 rounded-full flex items-center justify-center">
                  <span className="text-[#00B4D8] font-bold text-lg">
                    {review.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm uppercase tracking-wider">{review.name}</h4>
                  <div className="flex items-center gap-1.5 text-[#2ED8D4] text-[10px] font-bold uppercase tracking-widest mt-1">
                    <CheckCircle size={10} />
                    Verified Client
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Footer */}
        <div className="mt-16 flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
           <span className="text-white font-black text-xl tracking-tighter italic">NCA REGULATED</span>
           <span className="text-white font-black text-xl tracking-tighter italic">POPI COMPLIANT</span>
           <span className="text-white font-black text-xl tracking-tighter italic">NCR REGISTERED</span>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;