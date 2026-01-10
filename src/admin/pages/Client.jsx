import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, ChevronDown, ChevronUp, MoreVertical, FileText, Mail, Fingerprint, UserPlus, Loader2, X, Phone, User } from 'lucide-react';

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedId, setExpandedId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const handleAddUser = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await axios.post(API_URL, formData);
      if (res.data.success) {
        setIsModalOpen(false);
        setFormData({ name: '', email: '', idNumber: '', phoneNumber: '', accountStatus: 'Active' });
        fetchClients(); // Refresh list
      }
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add client");
    } finally {
      setIsSubmitting(false);
    }
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
      
      {/* ADD USER MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-lg shadow-2xl border-t-8 border-[#00B4D8] animate-in zoom-in duration-200">
            <div className="p-6 border-b flex justify-between items-center">
              <h3 className="font-black uppercase tracking-widest text-gray-900">Add New Client</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-black"><X size={20}/></button>
            </div>
            <form onSubmit={handleAddUser} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-gray-400">Full Name</label>
                  <input required type="text" className="w-full p-3 bg-gray-50 border text-sm outline-none focus:border-[#00B4D8]" 
                    value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-gray-400">Phone Number (Required)</label>
                  <input required type="text" placeholder="e.g. +27..." className="w-full p-3 bg-gray-50 border text-sm outline-none focus:border-[#00B4D8]" 
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
                {isSubmitting ? "Saving to Database..." : "Create Client Profile"}
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
          onClick={() => setIsModalOpen(true)}
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
                        <button className="text-gray-400 hover:text-gray-900 p-2"><MoreVertical size={20}/></button>
                      </div>
                    </td>
                  </tr>

                  {expandedId === client._id && (
                    <tr className="bg-gray-50/50">
                      <td colSpan="3" className="px-10 py-8 border-l-4 border-[#00B4D8]">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                          <div className="flex items-start gap-3">
                            <Mail className="text-[#00B4D8]" size={18}/>
                            <div>
                              <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Email</p>
                              <p className="text-sm font-semibold text-gray-800">{client.email || 'No email provided'}</p>
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
                                <a href={`https://debtors-backend.onrender.com/${client.documents[0].url}`} target="_blank" rel="noreferrer" className="text-sm font-bold text-blue-600 hover:underline">View Document</a>
                              ) : (
                                <p className="text-sm text-gray-400 italic">No document uploaded</p>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="mt-6 pt-6 border-t border-gray-200">
                          <button className="bg-[#111827] text-white text-[10px] font-bold uppercase px-4 py-2 hover:bg-[#00B4D8] transition-colors">Generate Statement</button>
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