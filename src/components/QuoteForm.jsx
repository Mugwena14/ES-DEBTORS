import React, { useState } from 'react';
import { Upload, CheckCircle, Loader2 } from 'lucide-react';

const QuoteForm = () => {
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    whatsaap: '',
    service: '',
    message: '' 
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFileName(selectedFile.name);
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Create Multipart Form Data
    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('phone', formData.phone);
    data.append('whatsaap', formData.whatsaap);
    data.append('service', formData.service);
    data.append('message', formData.message); // Include optional message
    
    // Field name 'idCopy' must match your Multer upload.array('idCopy') in backend
    if (file) {
      data.append('idCopy', file);
    }

    try {
      // Updated to your live Render Backend URL
      const response = await fetch('https://mkh-debtors-backend.onrender.com/api/quote', {
        method: 'POST',
        body: data,
        // Fetch automatically handles multipart/form-data headers for FormData objects
      });

      const result = await response.json();

      if (result.success) {
        setSubmitted(true);
      } else {
        alert(result.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("The server is currently waking up or unreachable. Please try again in 30 seconds.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="w-full max-w-md mt-5 ml-auto bg-[#0033A1] p-12 shadow-2xl text-center animate-in fade-in zoom-in duration-300">
        <CheckCircle className="w-16 h-16 text-[#00B4D8] mx-auto mb-4" />
        <h2 className="text-white text-2xl font-bold mb-2">Request Sent!</h2>
        <p className="text-blue-100 text-sm">
          Thank you <strong>{formData.name}</strong>. We have received your request for {formData.service}. Our team will contact you shortly.
        </p>
        <button 
          onClick={() => {
            setSubmitted(false);
            setFileName("");
            setFile(null);
            setFormData({ name: '', email: '', phone: '', whatsaap: '', service: '', message: '' });
          }}
          className="mt-6 text-[#00B4D8] text-xs uppercase font-bold tracking-widest hover:underline"
        >
          Send another request
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mt-5 ml-auto">
      <div className="bg-[#0033A1] p-6 md:p-8 shadow-2xl relative">
        <div className="text-center mb-8">
          <h2 className="text-white text-3xl font-bold leading-tight">Get A Free Quote</h2>
          <p className="text-cyan-400 text-xs uppercase tracking-[0.2em] mt-2 font-medium">
            Start your journey to debt freedom
          </p>
        </div>

        <form className="space-y-3" onSubmit={handleSubmit}>
          {/* 1. Full Name */}
          <input 
            type="text" 
            name="name"
            required
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Full Name" 
            className="w-full p-3 text-[13px] text-gray-800 bg-white rounded-sm outline-none focus:ring-2 focus:ring-[#00B4D8]"
          />

          {/* 2. Grid for ID Upload and Service */}
          <div className="grid grid-cols-2 gap-3">
            <div className="relative">
              <label className="flex items-center justify-between w-full p-3 bg-white rounded-sm cursor-pointer hover:bg-gray-50 transition-colors">
                <span className={`text-[11px] truncate ${fileName ? 'text-[#00B4D8] font-bold' : 'text-gray-400'}`}>
                  {fileName || "Upload ID Copy"}
                </span>
                <Upload size={14} className="text-gray-400 shrink-0 ml-1" />
                <input 
                  type="file" 
                  className="hidden" 
                  accept="image/*,.pdf"
                  onChange={handleFileChange}
                />
              </label>
            </div>

            <select 
              name="service"
              required
              value={formData.service}
              onChange={handleInputChange}
              className="w-full p-3 text-[13px] text-gray-800 bg-white rounded-sm outline-none focus:ring-2 focus:ring-[#00B4D8] appearance-none cursor-pointer"
            >
              <option value="" disabled>Select Service</option>
              <option value="Debt Review Removal">Debt Review Removal</option>
              <option value="Car Application">Car application</option>
              <option value="Credit Report">Credit report</option>
              <option value="Judgement Removal">Judgement Removal</option>
              <option value="Prescription Letter">Prescription Letter</option>
              <option value="Settlement Letter">Settlement Letter</option>
              <option value="Defaults on Accounts">Defaults on Accounts</option>
              <option value="Payment Arrangements">Payment Arrangements</option>
            </select>
          </div>

          {/* 3. Mobile and WhatsApp */}
          <div className="grid grid-cols-2 gap-3">
            <input 
              type="tel" 
              name="phone"
              required
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Mobile No." 
              className="w-full p-3 text-[13px] text-gray-800 bg-white rounded-sm outline-none focus:ring-2 focus:ring-[#00B4D8]"
            />
            <input 
              type="tel" 
              name="whatsaap"
              value={formData.whatsaap}
              onChange={handleInputChange}
              placeholder="WhatsApp" 
              className="w-full p-3 text-[13px] text-gray-800 bg-white rounded-sm outline-none focus:ring-2 focus:ring-[#00B4D8]"
            />
          </div>

          {/* 4. Email */}
          <input 
            type="email" 
            name="email"
            required
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email Address" 
            className="w-full p-3 text-[13px] text-gray-800 bg-white rounded-sm outline-none focus:ring-2 focus:ring-[#00B4D8]"
          />

          {/* Submit Button */}
          <div className="pt-2">
            <button 
              type="submit"
              disabled={loading}
              className="bg-[#00B4D8] text-white font-bold text-sm tracking-widest uppercase w-full py-4 px-6 hover:bg-[#00a0c0] transition-colors text-center flex items-center justify-center gap-2 disabled:opacity-70 active:scale-[0.98]"
              style={{ clipPath: 'polygon(0 0, 100% 0, 95% 100%, 0% 100%)' }}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin w-4 h-4" /> Processing...
                </>
              ) : (
                "Submit Request"
              )}
            </button>
          </div>
        </form>
      </div>
      <div className="h-2 w-full bg-[#00B4D8]/30"></div>
    </div>
  );
};

export default QuoteForm;
