import React, { useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp, MoreVertical, Mail, Phone, FileText, Edit3, Trash2 } from 'lucide-react';

const ClientRow = ({ client, isExpanded, onToggleExpand, activeMenuId, setActiveMenuId, onEdit, onDelete }) => {
  const menuRef = useRef(null);
  const isMenuOpen = activeMenuId === client._id;

  // Click outside logic specific to this row's menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActiveMenuId(null);
      }
    };
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen, setActiveMenuId]);

  return (
    <React.Fragment>
      <tr className="hover:bg-gray-50 transition-colors">
        <td className="px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#00B4D8]/10 text-[#00B4D8] flex items-center justify-center font-bold text-xs">
              {client.name ? client.name.charAt(0) : '?'}
            </div>
            <span className="font-bold text-gray-900">{client.name || 'Unnamed Client'}</span>
          </div>
        </td>
        <td className="px-6 py-5 text-gray-600 font-mono text-sm">{client.idNumber || 'N/A'}</td>
        <td className="px-6 py-5 text-center">
          <div className="flex justify-center gap-4">
            <button onClick={() => onToggleExpand(client._id)} className={`p-2 transition-all ${isExpanded ? 'text-[#00B4D8] bg-blue-50' : 'text-gray-400 hover:text-[#00B4D8]'}`}>
              {isExpanded ? <ChevronUp size={20}/> : <ChevronDown size={20}/>}
            </button>
            
            <div className="relative">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveMenuId(isMenuOpen ? null : client._id);
                }}
                className="text-gray-400 hover:text-gray-900 p-2"
              >
                <MoreVertical size={20}/>
              </button>
              
              {isMenuOpen && (
                <div 
                  ref={menuRef}
                  className="absolute right-0 bottom-full -mb-2 w-32 bg-white shadow-2xl border border-gray-100 z-[70] flex flex-col items-start overflow-hidden animate-in fade-in slide-in-from-bottom-2"
                >
                  <button 
                    onClick={() => onEdit(client)}
                    className="w-full flex items-center gap-2 px-4 py-3 text-[10px] font-bold uppercase text-gray-600 hover:bg-gray-50 hover:text-[#00B4D8] transition-colors"
                  >
                    <Edit3 size={14}/> Edit
                  </button>
                  <button 
                    onClick={() => onDelete(client._id)}
                    className="w-full flex items-center gap-2 px-4 py-3 text-[10px] font-bold uppercase text-red-500 hover:bg-red-50 transition-colors border-t border-gray-50"
                  >
                    <Trash2 size={14}/> Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        </td>
      </tr>

      {isExpanded && (
        <tr className="bg-gray-50/50">
          <td colSpan="3" className="px-10 py-8 border-l-4 border-[#00B4D8]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex items-start gap-3">
                <Mail className="text-[#00B4D8]" size={18}/>
                <div>
                  <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Email</p>
                  <p className="text-sm font-semibold text-gray-800">{client.email || 'No email'}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="text-[#00B4D8]" size={18}/>
                <div>
                  <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">WhatsApp</p>
                  <p className="text-sm font-semibold text-gray-800">{client.phoneNumber}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FileText className="text-[#00B4D8]" size={18}/>
                <div>
                  <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">ID Document</p>
                  {client.documents?.length > 0 ? (
                    <a href={`https://debtors-backend.onrender.com/${client.documents[0].url}`} target="_blank" rel="noreferrer" className="text-sm font-bold text-blue-600 hover:underline">View</a>
                  ) : (
                    <p className="text-sm text-gray-400 italic">None</p>
                  )}
                </div>
              </div>
            </div>
          </td>
        </tr>
      )}
    </React.Fragment>
  );
};

export default ClientRow;