import React, { useRef } from 'react';
import { Mail, RefreshCw, Send, Plus, Trash2, Paperclip, FileText, Check } from 'lucide-react';

const RequestForm = ({ 
  clientId, setClientId, 
  emails = [''], setEmails,
  attachments, setAttachments,
  handleRequest, loading, fetchLogs,
  title = "Request Document", buttonLabel = "Send Request",
  accentColor = "#00B4D8" 
}) => {

  const idInputRef = useRef(null);
  const poaInputRef = useRef(null);

  const addEmailField = () => emails.length < 6 && setEmails([...emails, '']);
  const removeEmailField = (index) => setEmails(emails.filter((_, i) => i !== index));
  const updateEmail = (index, value) => {
    const newEmails = [...emails];
    newEmails[index] = value;
    setEmails(newEmails);
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      setAttachments(prev => ({ ...prev, [type]: file }));
    }
  };

  return (
    <div className="bg-[#111827] p-8 shadow-2xl border-b-4 rounded-xl overflow-hidden" style={{ borderBottomColor: accentColor }}>
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
              placeholder="e.g. 850101..."
              className="w-full bg-white/5 border border-gray-700 p-4 text-white outline-none font-mono focus:border-[var(--focus-color)] transition-all"
              style={{ "--focus-color": accentColor }}
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
            />
          </div>

          {/* PRIMARY EMAIL */}
          <div className="space-y-2">
            <label className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Creditor's Email</label>
            <input
              type="email"
              placeholder="legal@bank.co.za"
              className="w-full bg-white/10 border border-gray-700 p-4 text-white outline-none focus:border-[var(--focus-color)] transition-all"
              style={{ "--focus-color": accentColor }}
              value={emails[0]}
              onChange={(e) => updateEmail(0, e.target.value)}
            />
          </div>
        </div>

        {/* ATTACHMENT SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-white/5 border border-dashed border-gray-700 rounded-lg">
          <div className="flex flex-col gap-2 col-span-full">
             <label className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">Legal Verification Attachments</label>
             <div className="flex flex-col md:flex-row gap-3">
                {/* ID FILE BUTTON */}
                <button 
                  onClick={() => idInputRef.current.click()}
                  className={`flex-1 flex items-center justify-between p-3 text-[10px] font-bold uppercase transition-all border ${attachments?.idFile ? 'border-green-500 bg-green-500/10 text-green-500' : 'border-gray-700 text-gray-400 hover:border-white'}`}
                >
                  <div className="flex items-center gap-2">
                    <FileText size={14} /> {attachments?.idFile ? attachments.idFile.name.substring(0, 15) + '...' : 'Upload ID Copy'}
                  </div>
                  {attachments?.idFile && <Check size={14} />}
                </button>
                
                {/* POWER OF ATTORNEY BUTTON */}
                <button 
                  onClick={() => poaInputRef.current.click()}
                  className={`flex-1 flex items-center justify-between p-3 text-[10px] font-bold uppercase transition-all border ${attachments?.poaFile ? 'border-green-500 bg-green-500/10 text-green-500' : 'border-gray-700 text-gray-400 hover:border-white'}`}
                >
                  <div className="flex items-center gap-2">
                    <Paperclip size={14} /> {attachments?.poaFile ? attachments.poaFile.name.substring(0, 15) + '...' : 'Upload Power of Attorney'}
                  </div>
                  {attachments?.poaFile && <Check size={14} />}
                </button>
             </div>
             
             {/* Hidden Inputs */}
             <input type="file" ref={idInputRef} hidden onChange={(e) => handleFileChange(e, 'idFile')} accept=".pdf,.jpg,.jpeg,.png" />
             <input type="file" ref={poaInputRef} hidden onChange={(e) => handleFileChange(e, 'poaFile')} accept=".pdf,.jpg,.jpeg,.png" />
          </div>
        </div>

        {/* ADDITIONAL EMAILS */}
        {emails.slice(1).map((email, idx) => {
          const actualIndex = idx + 1;
          return (
            <div key={actualIndex} className="flex gap-2 items-center animate-in slide-in-from-left-2 duration-200">
              <div className="flex-1 space-y-1">
                 <input
                  type="email"
                  placeholder={`Recipient ${actualIndex + 1}`}
                  className="w-full bg-white/5 border border-gray-700 p-3 text-white outline-none focus:border-[var(--focus-color)] transition-all text-sm"
                  style={{ "--focus-color": accentColor }}
                  value={email}
                  onChange={(e) => updateEmail(actualIndex, e.target.value)}
                />
              </div>
              <button onClick={() => removeEmailField(actualIndex)} className="p-3 text-gray-500 hover:text-red-500 transition-colors">
                <Trash2 size={18} />
              </button>
            </div>
          );
        })}

        {/* CONTROLS */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-4 border-t border-gray-800">
          <button onClick={addEmailField} disabled={emails.length >= 6} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-white disabled:opacity-30 transition-all">
            <Plus size={16} style={{ color: accentColor }} /> Add Recipient
          </button>

          <button
            disabled={loading || !clientId || !emails[0] || !attachments?.idFile || !attachments?.poaFile}
            onClick={handleRequest}
            className="w-full md:w-64 text-white font-black py-4 uppercase tracking-tighter hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2 disabled:bg-gray-800 disabled:text-gray-600 shadow-xl"
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