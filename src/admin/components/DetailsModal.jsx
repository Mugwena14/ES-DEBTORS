import React from 'react';
import { X, ChevronLeft, Download, FileText, Briefcase, Car, FileImage, Eye } from 'lucide-react';

const DetailsModal = ({ selectedRequest, activeImgUrl, onBack, onDownload, onClose, onSetActiveImg }) => {
  if (!selectedRequest) return null;

  const formatPhone = (phone) => phone?.replace('whatsapp:', '') || 'No Phone';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className={`bg-white w-full transition-all duration-300 shadow-2xl border border-gray-100 overflow-hidden rounded-2xl ${activeImgUrl ? 'max-w-4xl' : 'max-w-lg'}`}>
        <div className="bg-[#111827] p-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            {activeImgUrl && (
              <button onClick={onBack} className="text-[#00B4D8] hover:text-white flex items-center gap-1 text-xs font-black uppercase tracking-widest transition-colors">
                <ChevronLeft size={18} /> Back
              </button>
            )}
            <h3 className="text-white font-black uppercase tracking-widest text-sm">
              {activeImgUrl ? 'Document Preview' : 'Request Overview'}
            </h3>
          </div>
          <div className="flex items-center gap-4">
             {activeImgUrl && (
                <a href={onDownload(activeImgUrl)} download target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-[#00B4D8] text-white px-3 py-1.5 rounded-lg text-[10px] font-black hover:bg-white hover:text-[#00B4D8] transition-all">
                    <Download size={16} /> DOWNLOAD
                </a>
             )}
            <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                <X size={22} />
            </button>
          </div>
        </div>
        
        <div className="max-h-[85vh] overflow-y-auto">
          {!activeImgUrl ? (
            <div className="p-8 space-y-8">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] block mb-1">Client Name</label>
                  <p className="font-bold text-lg text-gray-900">{selectedRequest.clientName}</p>
                </div>
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] block mb-1">Phone Number</label>
                  <p className="font-bold text-lg text-gray-900">{formatPhone(selectedRequest.clientPhone)}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-y-6 gap-x-12 pt-6 border-t border-gray-50">
                {/* Information blocks... */}
                {selectedRequest.clientEmail && (
                    <div>
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] block mb-1">Email Address</label>
                        <p className="font-bold text-gray-700">{selectedRequest.clientEmail}</p>
                    </div>
                )}
              </div>

              <div className="pt-6 border-t border-gray-100">
                <label className="text-[10px] font-black text-[#00B4D8] uppercase tracking-[0.3em] block mb-4">Required Documents</label>
                <div className="space-y-3">
                   {/* Documents logic here... map through labels and urls */}
                   {[
                    { label: 'Power of Attorney', url: selectedRequest.details?.poaUrl, color: 'text-blue-500', bg: 'bg-blue-50' },
                    { label: 'Proof of Residence', url: selectedRequest.details?.porUrl, color: 'text-green-500', bg: 'bg-green-50' },
                    { label: 'Proof of Payment (R350)', url: selectedRequest.details?.popUrl, color: 'text-amber-500', bg: 'bg-amber-50' }
                  ].map((doc, i) => doc.url && (
                    <button key={i} onClick={() => onSetActiveImg(doc.url)} className={`w-full flex items-center justify-between p-4 ${doc.bg} border border-transparent hover:border-gray-200 transition-all rounded-xl group`}>
                        <div className="flex items-center gap-4">
                            <FileImage className={doc.color} size={24} />
                            <span className="text-xs font-black uppercase text-gray-700">{doc.label}</span>
                        </div>
                        <Eye size={18} className="text-gray-400 group-hover:text-gray-900" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full bg-[#0a0a0a] flex items-center justify-center min-h-[500px] p-6 relative">
                <img src={activeImgUrl} alt="Preview" className="max-w-full max-h-[70vh] rounded shadow-2xl object-contain animate-in zoom-in-95 duration-300" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailsModal;