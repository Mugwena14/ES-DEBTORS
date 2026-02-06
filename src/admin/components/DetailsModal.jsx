import React from 'react';
import { X, ChevronLeft, Download, FileImage, Eye, Building2, CreditCard, Fingerprint } from 'lucide-react';

const DetailsModal = ({ selectedRequest, activeImgUrl, onBack, onDownload, onClose, onSetActiveImg }) => {
  if (!selectedRequest) return null;

  const formatPhone = (phone) => phone?.replace('whatsapp:', '') || 'No Phone';
  
  // Safely destructure with defaults to prevent crashes
  const { details = {}, serviceType = "N/A", clientName = "Unknown", clientPhone = "" } = selectedRequest;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className={`bg-white w-full transition-all duration-300 shadow-2xl border border-gray-100 overflow-hidden rounded-2xl ${activeImgUrl ? 'max-w-4xl' : 'max-w-lg'}`}>
        
        {/* HEADER */}
        <div className="bg-[#111827] p-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            {activeImgUrl && (
              <button onClick={onBack} className="text-[#00B4D8] hover:text-white flex items-center gap-1 text-xs font-black uppercase tracking-widest transition-colors">
                <ChevronLeft size={18} /> Back
              </button>
            )}
            <h3 className="text-white font-black uppercase tracking-widest text-sm">
              {activeImgUrl ? 'Document Preview' : `${serviceType.replace(/_/g, ' ')} Overview`}
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
              {/* CLIENT PRIMARY INFO */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] block mb-1">Client Name</label>
                  <p className="font-bold text-lg text-gray-900">{clientName}</p>
                </div>
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] block mb-1">Phone Number</label>
                  <p className="font-bold text-lg text-gray-900">{formatPhone(clientPhone)}</p>
                </div>
              </div>

              {/* SERVICE SPECIFIC DETAILS FROM YOUR JSON */}
              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-50">
                {details.requestIdNumber && (
                  <div className="col-span-2 bg-gray-50 p-3 rounded-lg border border-gray-100 flex items-center gap-3">
                    <Fingerprint size={18} className="text-[#00B4D8]" />
                    <div>
                      <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block">ID Number</label>
                      <p className="text-sm font-bold text-gray-900">{details.requestIdNumber}</p>
                    </div>
                  </div>
                )}

                {details.creditorName && (
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <div className="flex items-center gap-2 mb-1">
                      <Building2 size={14} className="text-[#00B4D8]" />
                      <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Creditor</label>
                    </div>
                    <p className="text-sm font-bold text-gray-900">{details.creditorName}</p>
                  </div>
                )}

                {details.paymentPreference && details.paymentPreference !== 'N/A' && (
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <div className="flex items-center gap-2 mb-1">
                      <CreditCard size={14} className="text-[#00B4D8]" />
                      <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Payment</label>
                    </div>
                    <p className="text-sm font-bold text-gray-900">{details.paymentPreference}</p>
                  </div>
                )}
              </div>

              {/* DOCUMENTS SECTION */}
              <div className="pt-6 border-t border-gray-100">
                <label className="text-[10px] font-black text-[#00B4D8] uppercase tracking-[0.3em] block mb-4">Required Documents</label>
                <div className="space-y-3">
                  {[
                    { label: 'Power of Attorney', url: details?.poaUrl },
                    { label: 'Proof of Residence', url: details?.porUrl },
                    { label: 'Proof of Payment (R350)', url: details?.popUrl },
                    { label: 'Standard Attachment', url: details?.mediaUrl }
                  ].map((doc, i) => (doc.url && doc.url.trim() !== "") && (
                    <button 
                      key={i} 
                      onClick={() => onSetActiveImg(doc.url)} 
                      className="w-full flex items-center justify-between p-4 bg-gray-50 border border-transparent hover:border-[#00B4D8] transition-all rounded-xl group"
                    >
                      <div className="flex items-center gap-4">
                        <FileImage className="text-gray-400 group-hover:text-[#00B4D8]" size={24} />
                        <span className="text-xs font-black uppercase text-gray-700">{doc.label}</span>
                      </div>
                      <Eye size={18} className="text-gray-400 group-hover:text-gray-900" />
                    </button>
                  ))}
                  
                  {/* Fallback if no documents exist */}
                  {(!details.poaUrl && !details.porUrl && !details.popUrl && !details.mediaUrl) && (
                    <p className="text-xs text-gray-400 italic text-center py-4">No documents uploaded for this request.</p>
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* PREVIEW MODE */
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