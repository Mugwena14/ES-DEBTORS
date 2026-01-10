import React from 'react';
import { X } from 'lucide-react';

const ClientModal = ({ isOpen, isEditMode, formData, setFormData, onSubmit, onClose, isSubmitting }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg shadow-2xl border-t-8 border-[#00B4D8] animate-in zoom-in duration-200">
        <div className="p-6 border-b flex justify-between items-center">
          <h3 className="font-black uppercase tracking-widest text-gray-900">
            {isEditMode ? 'Edit Client' : 'Add New Client'}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-black">
            <X size={20}/>
          </button>
        </div>
        <form onSubmit={onSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase text-gray-400">Full Name</label>
              <input 
                required 
                type="text" 
                className="w-full p-3 bg-gray-50 border text-sm outline-none focus:border-[#00B4D8]" 
                value={formData.name} 
                onChange={(e) => setFormData({...formData, name: e.target.value})} 
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase text-gray-400">Phone Number</label>
              <input 
                required 
                type="text" 
                className="w-full p-3 bg-gray-50 border text-sm outline-none focus:border-[#00B4D8]" 
                value={formData.phoneNumber} 
                onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})} 
              />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase text-gray-400">ID Number</label>
            <input 
              type="text" 
              className="w-full p-3 bg-gray-50 border text-sm outline-none focus:border-[#00B4D8]" 
              value={formData.idNumber} 
              onChange={(e) => setFormData({...formData, idNumber: e.target.value})} 
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase text-gray-400">Email Address</label>
            <input 
              type="email" 
              className="w-full p-3 bg-gray-50 border text-sm outline-none focus:border-[#00B4D8]" 
              value={formData.email} 
              onChange={(e) => setFormData({...formData, email: e.target.value})} 
            />
          </div>
          <button 
            disabled={isSubmitting} 
            type="submit" 
            className="w-full bg-[#111827] text-[#00B4D8] font-black py-4 uppercase tracking-[0.2em] text-xs hover:bg-[#00B4D8] hover:text-white transition-all disabled:opacity-50"
          >
            {isSubmitting ? "Processing..." : isEditMode ? "Update Client Profile" : "Create Client Profile"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ClientModal;