import React, { useState, useEffect, useRef } from 'react'; // Added useRef
import axios from 'axios';
import { Search, ChevronDown, ChevronUp, MoreVertical, FileText, Mail, UserPlus, Loader2, X, Phone, Edit3, Trash2 } from 'lucide-react';

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedId, setExpandedId] = useState(null);
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  
  // Ref for click-outside logic
  const menuRef = useRef(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    idNumber: '',
    phoneNumber: '',
    accountStatus: 'Active'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const clientsPerPage = 10;
  const API_URL = 'https://debtors-backend.onrender.com/api/clients';

  // --- NEW: Click Outside Logic ---
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActiveMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchClients = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setClients(Array.isArray(res.data) ? res.data : res.data.data || []);
    } catch (err) {
      console.error("Error fetching clients:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (isEditMode) {
        await axios.put(`${API_URL}/${selectedClientId}`, formData);
      } else {
        await axios.post(API_URL, formData);
      }
      setIsModalOpen(false);
      resetForm();
      fetchClients();
    } catch (err) {
      alert(err.response?.data?.message || "Operation failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this client?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchClients();
        setActiveMenuId(null);
      } catch (err) {
        alert("Failed to delete client. Please check backend route.");
      }
    }
  };

  const openEditModal = (client) => {
    setIsEditMode(true);
    setSelectedClientId(client._id);
    setFormData({
      name: client.name || '',
      email: client.email || '',
      idNumber: client.idNumber || '',
      phoneNumber: client.phoneNumber || '',
      accountStatus: client.accountStatus || 'Active'
    });
    setIsModalOpen(true);
    setActiveMenuId(null);
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', idNumber: '', phoneNumber: '', accountStatus: 'Active' });
    setIsEditMode(false);
    setSelectedClientId(null);
  };

  const filteredClients = clients.filter(client => 
    client.idNumber?.includes(searchTerm) || 
    client.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastClient = currentPage * clientsPerPage;
  const indexOfFirstClient = indexOfLastClient - clientsPerPage;
  const currentClients = filteredClients.slice(indexOfFirstClient, indexOfLastClient);
  const totalPages = Math.ceil(filteredClients.length / clientsPerPage);

  const toggleExpand = (id) => setExpandedId(expandedId === id ? null : id);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-lg shadow-2xl border-t-8 border-[#00B4D8] animate-in zoom-in duration-200">
            <div className="p-6 border-b flex justify-between items-center">
              <h3 className="font-black uppercase tracking-widest text-gray-900">
                {isEditMode ? 'Edit Client' : 'Add New Client'}
              </h3>
              <button onClick={() => { setIsModalOpen(false); resetForm(); }} className="text-gray-400 hover:text-black"><X size={20}/></button>
            </div>
            <form onSubmit={handleFormSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-gray-400">Full Name</label>
                  <input required type="text" className="w-full p-3 bg-gray-50 border text-sm outline-none focus:border-[#00B4D8]" 
                    value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-gray-400">Phone Number</label>
                  <input required type="text" className="w-full p-3 bg-gray-50 border text-sm outline-none focus:border-[#00B4D8]" 
                    value={formData.phoneNumber} onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})} />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-gray-400">ID Number</label>
                <input type="text" className="w-full p-3 bg-gray-50 border text-sm outline-none focus:border-[#00B4D8]" 
                  value={formData.idNumber} onChange={(e) => setFormData({...formData, idNumber: e.target.value})} />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-gray-400">Email Address</label>
                <input type="email" className="w-full p-3 bg-gray-50 border text-sm outline-none focus:border-[#00B4D8]" 
                  value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
              </div>
              <button disabled={isSubmitting} type="submit" className="w-full bg-[#111827] text-[#00B4D8] font-black py-4 uppercase tracking-[0.2em] text-xs hover:bg-[#00B4D8] hover:text-white transition-all">
                {isSubmitting ? "Processing..." : isEditMode ? "Update Client Profile" : "Create Client Profile"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-6 shadow-sm border-b-4 border-[#00B4D8]">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text"
            placeholder="Search by ID or Name..."
            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 focus:outline-none focus:border-[#00B4D8] font-medium text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button 
          onClick={() => { resetForm(); setIsModalOpen(true); }}
          className="w-full md:w-auto flex items-center justify-center gap-2 bg-[#111827] text-[#00B4D8] px-8 py-3 font-bold text-xs uppercase tracking-widest hover:bg-[#00B4D8] hover:text-white transition-all"
        >
          <UserPlus size={16} /> Add Client
        </button>
      </div>

      {/* TABLE SECTION */}
      <div className="bg-white shadow-xl overflow-hidden border border-gray-100">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#111827] text-white uppercase text-[10px] tracking-[0.2em] font-bold">
              <th className="px-6 py-4">Full Name</th>
              <th className="px-6 py-4">ID Number</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td colSpan="3" className="py-20 text-center text-gray-400">
                  <Loader2 className="animate-spin mx-auto mb-2" size={32} />
                  <p className="text-[10px] font-black uppercase tracking-widest">Accessing Ledger...</p>
                </td>
              </tr>
            ) : currentClients.length > 0 ? (
              currentClients.map((client) => (
                <React.Fragment key={client._id}>
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
                        <button onClick={() => toggleExpand(client._id)} className={`p-2 transition-all ${expandedId === client._id ? 'text-[#00B4D8] bg-blue-50' : 'text-gray-400 hover:text-[#00B4D8]'}`}>
                          {expandedId === client._id ? <ChevronUp size={20}/> : <ChevronDown size={20}/>}
                        </button>
                        
                        <div className="relative">
                          <button 
                            onClick={(e) => {
                                e.stopPropagation(); // Prevents immediate close from handleClickOutside
                                setActiveMenuId(activeMenuId === client._id ? null : client._id);
                            }}
                            className="text-gray-400 hover:text-gray-900 p-2"
                          >
                            <MoreVertical size={20}/>
                          </button>
                          
                          {/* UPDATED ACTION POPOVER */}
                          {activeMenuId === client._id && (
                            <div 
                              ref={menuRef}
                              className="absolute right-0 bottom-full mb-2 w-32 bg-white shadow-2xl border border-gray-100 z-[70] flex flex-col items-start overflow-hidden animate-in fade-in slide-in-from-bottom-2"
                            >
                              <button 
                                onClick={() => openEditModal(client)}
                                className="w-full flex items-center gap-2 px-4 py-3 text-[10px] font-bold uppercase text-gray-600 hover:bg-gray-50 hover:text-[#00B4D8] transition-colors"
                              >
                                <Edit3 size={14}/> Edit
                              </button>
                              <button 
                                onClick={() => handleDelete(client._id)}
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
                  {/* Expanded Section (Email, WhatsApp, etc) */}
                  {expandedId === client._id && (
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
              ))
            ) : (
              <tr><td colSpan="3" className="py-12 text-center text-gray-400 text-xs font-bold uppercase">No records found</td></tr>
            )}
          </tbody>
        </table>
        
        {/* PAGINATION */}
        <div className="p-6 bg-gray-50 flex justify-between items-center border-t border-gray-100">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Page {currentPage} of {totalPages || 1}</p>
          <div className="flex gap-2">
            <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)} className="px-4 py-2 border border-gray-300 text-xs font-bold uppercase disabled:opacity-30">Prev</button>
            <button disabled={currentPage === totalPages || totalPages === 0} onClick={() => setCurrentPage(prev => prev + 1)} className="px-4 py-2 bg-[#111827] text-[#00B4D8] text-xs font-bold uppercase disabled:opacity-30">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Clients;