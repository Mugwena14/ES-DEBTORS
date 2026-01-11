import React from 'react';
import { MoreVertical, Upload, Check, Trash2 } from 'lucide-react';

const StatusMenu = ({ req, activeMenuId, setActiveMenuId, menuRef, onMarkReceived, onDelete }) => {
  const isOpen = activeMenuId === req._id;

  return (
    <div className="relative" ref={isOpen ? menuRef : null}>
      <button
        onClick={() => setActiveMenuId(isOpen ? null : req._id)}
        className="p-2 text-gray-400 hover:text-black transition-colors rounded-full hover:bg-gray-100"
      >
        <MoreVertical size={20} />
      </button>

      {isOpen && (
        <div className="absolute right-full top-0 mr-2 w-44 bg-white border border-gray-100 shadow-xl z-50 animate-in fade-in slide-in-from-right-2 duration-200">
          {req.status === 'Received' ? (
            <a
              href={`mailto:${req.client?.email}?subject=Your Paid-up Letter from ${req.creditorName}&body=Hello ${req.client?.name}, please find your document attached.`}
              className="w-full flex items-center gap-3 px-4 py-3 text-[10px] font-black uppercase text-[#00B4D8] hover:bg-blue-50 transition-colors border-b border-gray-50"
            >
              <Upload size={16} /> Upload Document
            </a>
          ) : (
            <button
              onClick={() => onMarkReceived(req._id)}
              className="w-full flex items-center gap-3 px-4 py-3 text-[10px] font-black uppercase text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors border-b border-gray-50"
            >
              <Check size={16} /> Mark Received
            </button>
          )}

          <button
            onClick={() => onDelete(req._id)}
            className="w-full flex items-center gap-3 px-4 py-3 text-[10px] font-black uppercase text-red-500 hover:bg-red-50 transition-colors"
          >
            <Trash2 size={16} /> Delete Record
          </button>
        </div>
      )}
    </div>
  );
};

export default StatusMenu;