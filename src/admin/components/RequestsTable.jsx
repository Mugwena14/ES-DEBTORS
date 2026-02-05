import React, { useState, useEffect, useRef } from 'react';
import { Loader2, Eye, Mail, Trash2, MoreVertical, CheckCircle, Clock, AlertCircle, PlayCircle, Inbox } from 'lucide-react';

const RequestsTable = ({ requests, loading, updatingStatus, onUpdateStatus, onView, onEmail, onDelete }) => {
  const [openMenuId, setOpenMenuId] = useState(null);
  const menuRef = useRef(null);

  const statuses = [
    { label: 'Pending', color: 'bg-amber-500', text: 'text-amber-600', icon: Clock },
    { label: 'Received', color: 'bg-blue-500', text: 'text-blue-600', icon: Inbox },
    { label: 'In Progress', color: 'bg-purple-500', text: 'text-purple-600', icon: PlayCircle },
    { label: 'COMPLETED', color: 'bg-green-500', text: 'text-green-600', icon: CheckCircle },
    { label: 'Rejected', color: 'bg-red-500', text: 'text-red-600', icon: AlertCircle },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenuId(null);
      }
    };
    if (openMenuId) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openMenuId]);

  const formatPhone = (phone) => phone?.replace('whatsapp:', '') || 'No Phone';

  const getStatusInfo = (currentStatus) => {
    return statuses.find(s => s.label === currentStatus) || statuses[0];
  };

  return (
    <div className="bg-white shadow-xl border border-gray-100 rounded-2xl">
      {/* Container needs careful overflow management for the dropdowns */}
      <div className="overflow-x-auto rounded-2xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#111827] text-white uppercase text-[10px] tracking-[0.2em] font-bold">
              <th className="px-6 py-5">Client Information</th>
              <th className="px-6 py-5">Service Type</th>
              <th className="px-6 py-5">Creditor</th>
              <th className="px-6 py-5">Status</th>
              <th className="px-6 py-5 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td colSpan="5" className="py-24 text-center">
                  <Loader2 className="animate-spin mx-auto text-[#00B4D8]" size={40} />
                </td>
              </tr>
            ) : requests.length > 0 ? (
              requests.map((req, index) => {
                const currentStatusInfo = getStatusInfo(req.status);
                // Decide if menu should open upwards or downwards based on row index
                const isLastRow = index > requests.length - 3 && requests.length > 3;

                return (
                  <tr key={req._id} className="hover:bg-blue-50/30 transition-colors group">
                    <td className="px-6 py-6">
                      <p className="font-bold text-gray-900">{req.clientName}</p>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">
                        {formatPhone(req.clientPhone)}
                      </p>
                    </td>
                    <td className="px-6 py-6">
                      <span className="px-3 py-1 bg-blue-100/50 text-[#1976d2] text-[10px] font-black uppercase tracking-widest rounded-md">
                        {req.requestType}
                      </span>
                    </td>
                    <td className="px-6 py-6">
                      <p className="text-sm font-semibold text-gray-600">{req.creditorName || '---'}</p>
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${currentStatusInfo.color} ${req.status !== 'COMPLETED' && req.status !== 'Rejected' ? 'animate-pulse' : ''}`}></div>
                        <span className={`text-[10px] font-black uppercase ${currentStatusInfo.text}`}>
                          {req.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex justify-center gap-1">
                        
                        {/* MOREVERTICAL STATUS DROPDOWN */}
                        <div className="relative">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenMenuId(openMenuId === req._id ? null : req._id);
                            }} 
                            disabled={updatingStatus === req._id}
                            className={`p-2.5 rounded-lg transition-all ${
                              openMenuId === req._id ? 'bg-[#111827] text-white' : 'text-gray-400 hover:text-[#00B4D8] hover:bg-gray-50'
                            }`}
                          >
                            {updatingStatus === req._id ? (
                              <Loader2 size={18} className="animate-spin" />
                            ) : (
                              <MoreVertical size={18} />
                            )}
                          </button>

                          {openMenuId === req._id && (
                            <div 
                              ref={menuRef}
                              className={`absolute right-0 z-[100] w-48 bg-white border border-gray-100 shadow-2xl rounded-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 ${
                                isLastRow ? 'bottom-full mb-2' : 'top-full mt-2'
                              }`}
                            >
                              <div className="p-2 bg-gray-50 border-b border-gray-100">
                                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest px-2">Set Status To:</p>
                              </div>
                              <div className="p-1">
                                {statuses.map((s) => (
                                  <button
                                    key={s.label}
                                    onClick={() => {
                                      onUpdateStatus(req._id, s.label);
                                      setOpenMenuId(null);
                                    }}
                                    className={`w-full flex items-center gap-3 px-3 py-2 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all ${
                                      req.status === s.label 
                                        ? 'bg-blue-50 text-[#00B4D8]' 
                                        : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                                  >
                                    <s.icon size={14} className={req.status === s.label ? 'text-[#00B4D8]' : 'text-gray-400'} />
                                    {s.label}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        <button onClick={() => onView(req)} className="p-2.5 text-gray-400 hover:text-[#00B4D8] rounded-lg transition-all" title="View Details"><Eye size={18} /></button>
                        <button onClick={() => onEmail(req)} className="p-2.5 text-gray-400 hover:text-blue-500 rounded-lg transition-all" title="Send Email"><Mail size={18} /></button>
                        <button onClick={() => onDelete(req._id)} className="p-2.5 text-gray-400 hover:text-red-500 rounded-lg transition-all" title="Delete Request"><Trash2 size={18} /></button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="5" className="py-24 text-center text-gray-400 font-black uppercase tracking-[0.3em] text-xs">
                  No entries found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RequestsTable;