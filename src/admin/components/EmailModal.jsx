import React from 'react';
import { X, Mail, Upload, Paperclip, Trash2, Send, Loader2 } from 'lucide-react';

const EmailModal = ({ isOpen, data, message, file, sendingEmail, onClose, onMessageChange, onFileChange, onRemoveFile, onSend }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="bg-[#111827] p-5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Mail size={20} className="text-[#00B4D8]" />
            </div>
            <div>
              <h3 className="text-white font-black uppercase tracking-widest text-xs">Send Email Reply</h3>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">
                {data?.clientEmail || data?.details?.email || 'No email provided'}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] block mb-2">Message Body</label>
            <textarea 
              rows="6"
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#00B4D8] transition-all text-sm font-medium text-gray-700 resize-none"
              placeholder="Type your message to the client here..."
              value={message}
              onChange={(e) => onMessageChange(e.target.value)}
            ></textarea>
          </div>

          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] block mb-2">Attachments</label>
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50 hover:bg-gray-100 cursor-pointer transition-all group">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload size={24} className="text-gray-400 group-hover:text-[#00B4D8] mb-2 transition-colors" />
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Click to upload document</p>
                <p className="text-[9px] text-gray-400 font-bold mt-1">PDF, JPG, PNG (Max 5MB)</p>
              </div>
              <input type="file" className="hidden" onChange={(e) => onFileChange(e.target.files[0])} />
            </label>
            {file && (
              <div className="mt-3 flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-100">
                <div className="flex items-center gap-2">
                  <Paperclip size={14} className="text-[#00B4D8]" />
                  <span className="text-[11px] font-bold text-blue-700 truncate max-w-[200px]">{file.name}</span>
                </div>
                <button onClick={onRemoveFile} className="text-blue-400 hover:text-red-500 transition-colors">
                  <Trash2 size={14} />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="p-6 bg-gray-50 border-t border-gray-100 flex gap-3">
          <button disabled={sendingEmail} onClick={onClose} className="flex-1 px-6 py-3 border border-gray-300 text-xs font-black uppercase rounded-xl hover:bg-white transition-all text-gray-600 disabled:opacity-50">
            Cancel
          </button>
          <button 
            disabled={sendingEmail} 
            onClick={onSend}
            className="flex-[2] px-6 py-3 bg-[#111827] text-[#00B4D8] text-xs font-black uppercase rounded-xl hover:bg-black transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/10 disabled:opacity-50"
          >
            {sendingEmail ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />} 
            {sendingEmail ? 'Sending...' : 'Send Email'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailModal;