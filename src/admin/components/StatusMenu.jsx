import React from 'react';
import { MoreVertical, Check, Trash2 } from 'lucide-react';

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
          
          {/* Only show Mark Received if the current status is NOT 'Received' */}
          {req.status !== 'Received' && (
            <button
              onClick={() => onMarkReceived(req._id)}
              className="w-full flex items-center gap-3 px-4 py-3 text-[10px] font-black uppercase text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors border-b border-gray-50"
            >
              <Check size={16} /> Mark Received
            </button>
          )}

          {/* Delete action is always available once the menu is open */}
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