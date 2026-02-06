import React from 'react';
import { Mail, RefreshCw, Send, Plus, Trash2 } from 'lucide-react';

const RequestForm = ({ 
  clientId, 
  setClientId, 
  emails = [''], // Array of emails passed from parent
  setEmails,    // Setter for the array
  handleRequest, 
  loading, 
  fetchLogs,
  title = "Request Document", 
  buttonLabel = "Send Request",
  accentColor = "#00B4D8" 
}) => {

  const addEmailField = () => {
    if (emails.length < 6) {
      setEmails([...emails, '']);
    }
  };

  const removeEmailField = (index) => {
    const newEmails = emails.filter((_, i) => i !== index);
    setEmails(newEmails);
  };

  const updateEmail = (index, value) => {
    const newEmails = [...emails];
    newEmails[index] = value;
    setEmails(newEmails);
  };

  return (
    <div 
      className="bg-[#111827] p-8 shadow-2xl border-b-4 rounded-xl overflow-hidden" 
      style={{ borderBottomColor: accentColor }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-white font-black uppercase tracking-widest flex items-center gap-2">
          <Mail style={{ color: accentColor }} size={20} /> {title}
        </h2>
        <button onClick={fetchLogs} className="text-gray-500 hover:text-white transition-colors">
          <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
        </button>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* CLIENT ID */}
          <div className="space-y-2">
            <label className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Client ID Number</label>
            <input
              type="text"
              className="w-full bg-white/5 border border-gray-700 p-4 text-white outline-none font-mono focus:border-[var(--focus-color)] transition-all"
              style={{ "--focus-color": accentColor }}
              placeholder="e.g. 9201015000081"
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
            />
          </div>

          {/* PRIMARY EMAIL */}
          <div className="space-y-2">
            <label className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Primary Email</label>
            <input
              type="email"
              placeholder="required@email.com"
              className="w-full bg-white/10 border border-gray-700 p-4 text-white outline-none focus:border-[var(--focus-color)] transition-all"
              style={{ "--focus-color": accentColor }}
              value={emails[0]}
              onChange={(e) => updateEmail(0, e.target.value)}
            />
          </div>
        </div>

        {/* ADDITIONAL EMAILS */}
        {emails.slice(1).map((email, idx) => {
          const actualIndex = idx + 1;
          return (
            <div key={actualIndex} className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in slide-in-from-left-2 duration-200">
              <div className="hidden md:block"></div> {/* Spacer for alignment */}
              <div className="flex gap-2 items-center">
                <div className="flex-1 space-y-1">
                   <label className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">Additional Recipient {actualIndex}</label>
                   <input
                    type="email"
                    placeholder="secondary@email.com"
                    className="w-full bg-white/5 border border-gray-700 p-3 text-white outline-none focus:border-[var(--focus-color)] transition-all text-sm"
                    style={{ "--focus-color": accentColor }}
                    value={email}
                    onChange={(e) => updateEmail(actualIndex, e.target.value)}
                  />
                </div>
                <button 
                  onClick={() => removeEmailField(actualIndex)}
                  className="mt-5 p-3 text-gray-500 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          );
        })}

        {/* CONTROLS */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-4 border-t border-gray-800">
          <button 
            onClick={addEmailField}
            disabled={emails.length >= 6}
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-white disabled:opacity-30 transition-all"
          >
            <Plus size={16} style={{ color: accentColor }} /> Add Recipient
          </button>

          <button
            disabled={loading || !clientId || !emails[0]}
            onClick={handleRequest}
            className="w-full md:w-64 text-white font-black py-4 uppercase tracking-tighter hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2 disabled:bg-gray-800 disabled:text-gray-600"
            style={{ 
              backgroundColor: accentColor,
              clipPath: 'polygon(0 0, 100% 0, 95% 100%, 0% 100%)' 
            }}
          >
            {loading ? "Processing..." : <><Send size={18} /> {buttonLabel}</>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestForm;