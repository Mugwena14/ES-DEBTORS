import React from 'react';
import { Mail, RefreshCw, Send } from 'lucide-react';

const RequestForm = ({ clientId, setClientId, selectedCreditor, setSelectedCreditor, creditors, handleRequest, loading, fetchLogs }) => {
  return (
    <div className="bg-[#111827] p-8 shadow-2xl border-b-4 border-[#00B4D8]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-white font-black uppercase tracking-widest flex items-center gap-2">
          <Mail className="text-[#00B4D8]" size={20} /> Request Paid-Up Letter
        </h2>
        <button onClick={fetchLogs} className="text-gray-500 hover:text-white transition-colors">
          <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <label className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Client ID Number</label>
          <input
            type="text"
            className="w-full bg-white/5 border border-gray-700 p-3 text-white focus:border-[#00B4D8] outline-none font-mono"
            placeholder="e.g. 9201015000081"
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Select Creditor</label>
          <select
            className="w-full bg-white/5 border border-gray-700 p-3 text-white focus:border-[#00B4D8] outline-none appearance-none"
            value={selectedCreditor}
            onChange={(e) => setSelectedCreditor(e.target.value)}
          >
            <option value="" className="text-black">-- Select Creditor --</option>
            {creditors.map(c => <option key={c} value={c} className="text-black">{c}</option>)}
          </select>
        </div>
        <div className="flex items-end">
          <button
            disabled={loading}
            onClick={handleRequest}
            className="w-full bg-[#00B4D8] text-white font-black py-3 uppercase tracking-tighter hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2 disabled:bg-gray-800 disabled:text-gray-600"
            style={{ clipPath: 'polygon(0 0, 100% 0, 95% 100%, 0% 100%)' }}
          >
            {loading ? "Processing..." : <><Send size={18} /> Send Request</>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestForm;