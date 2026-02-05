import React from 'react';
import { CheckCircle, Clock } from 'lucide-react';
import StatusMenu from './StatusMenu';

const DocumentTable = ({ requests, activeMenuId, setActiveMenuId, menuRef, onMarkReceived, onDelete }) => {
  return (
    <div className="bg-white shadow-sm overflow-hidden border border-gray-100">
      <div className="p-6 border-b border-gray-100 bg-gray-50/50 text-gray-900 font-black uppercase tracking-widest text-xs">
        Recent Document Activity
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 border-b bg-gray-50/30">
              <th className="px-8 py-4">Client Record</th>
              <th className="px-8 py-4">Creditor</th>
              <th className="px-8 py-4">Status</th>
              <th className="px-8 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {requests.length > 0 ? requests.map((req) => (
              <tr key={req._id} className="hover:bg-gray-50/80 transition-colors">
                <td className="px-8 py-4">
                  <p className="font-bold text-gray-900">{req.clientName}</p>
                  <p className="text-[10px] text-gray-400 uppercase font-mono">{req.idNumber}</p>
                </td>
                <td className="px-8 py-4 text-gray-600 font-semibold">{req.creditorName}</td>
                <td className="px-8 py-4">
                  <span className={`flex items-center gap-1 text-[10px] font-black uppercase ${req.status === 'Received' ? 'text-green-600' : 'text-orange-500'}`}>
                    {req.status === 'Received' ? <CheckCircle size={14} /> : <Clock size={14} />}
                    {req.status}
                  </span>
                </td>
                <td className="px-8 py-4 text-center">
                  <StatusMenu 
                    req={req} 
                    activeMenuId={activeMenuId} 
                    setActiveMenuId={setActiveMenuId} 
                    menuRef={menuRef} 
                    onMarkReceived={onMarkReceived} 
                    onDelete={onDelete} 
                  />
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="4" className="px-8 py-12 text-center text-gray-400 text-xs font-bold uppercase tracking-widest">
                  No requests found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DocumentTable;