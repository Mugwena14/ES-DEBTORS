import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

const ConfirmationModal = ({ isOpen, title, message, onConfirm, onCancel, type = 'danger' }) => {
  if (!isOpen) return null;

  const isDanger = type === 'danger';

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md shadow-2xl border-t-8 border-[#111827] animate-in zoom-in duration-200">
        <div className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className={`p-3 ${isDanger ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-[#00B4D8]'}`}>
              <AlertTriangle size={24} />
            </div>
            <div>
              <h3 className="font-black uppercase tracking-widest text-gray-900">{title}</h3>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-tight mt-1">{message}</p>
            </div>
          </div>
          
          <div className="flex gap-3 mt-8">
            <button 
              onClick={onCancel}
              className="flex-1 px-4 py-3 border border-gray-200 text-[10px] font-black uppercase tracking-widest hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={onConfirm}
              className={`flex-1 px-4 py-3 text-white text-[10px] font-black uppercase tracking-widest transition-all ${
                isDanger ? 'bg-red-500 hover:bg-red-600' : 'bg-[#111827] hover:bg-[#00B4D8]'
              }`}
            >
              Confirm action
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;