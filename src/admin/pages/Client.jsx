import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, ChevronDown, ChevronUp, MoreVertical, FileText, Mail, Fingerprint, UserPlus, Loader2 } from 'lucide-react';

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedId, setExpandedId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const clientsPerPage = 10;

  // Backend URL
  const API_URL = 'https://debtors-backend.onrender.com/api/clients';

  // 1. Real API Fetch from Backend
  useEffect(() => {
    const fetchClients = async () => {
      try {
        setLoading(true);
        const res = await axios.get(API_URL);
        // Assuming your backend returns { success: true, data: [...] }
        setClients(Array.isArray(res.data) ? res.data : res.data.data || []);
      } catch (err) {
        console.error("Error fetching clients:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchClients();
  }, []);

  // Search Logic
  const filteredClients = clients.filter(client => 
    client.idNumber?.includes(searchTerm) || 
    client.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination Logic
  const indexOfLastClient = currentPage * clientsPerPage;
  const indexOfFirstClient = indexOfLastClient - clientsPerPage;
  const currentClients = filteredClients.slice(indexOfFirstClient, indexOfLastClient);
  const totalPages = Math.ceil(filteredClients.length / clientsPerPage);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* HEADER & SEARCH BAR SECTION */}
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
        
        <div className="flex gap-3 w-full md:w-auto">
            {/* Placeholder Add User Button */}
            <button 
                onClick={() => alert("Add User Manually functionality coming soon!")}
                className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-6 py-3 font-bold text-xs uppercase tracking-widest hover:bg-gray-200 transition-all border border-gray-300"
            >
                <UserPlus size={16} /> Add User
            </button>
            <button className="flex-1 md:flex-none bg-[#111827] text-[#00B4D8] px-8 py-3 font-bold text-xs uppercase tracking-widest hover:bg-[#00B4D8] hover:text-white transition-all">
                Search DB
            </button>
        </div>
      </div>

      {/* CLIENTS TABLE */}
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
                <td colSpan="3" className="py-20 text-center">
                   <div className="flex flex-col items-center gap-2 text-gray-400">
                      <Loader2 className="animate-spin" size={32} />
                      <p className="text-[10px] font-black uppercase tracking-widest">Loading Database...</p>
                   </div>
                </td>
              </tr>
            ) : currentClients.length > 0 ? (
              currentClients.map((client) => (
                <React.Fragment key={client._id}>
                  {/* Main Row - REMOVED onClick from here */}
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-[#00B4D8]/10 text-[#00B4D8] flex items-center justify-center font-bold text-xs">
                          {client.name ? client.name.charAt(0) : '?'}
                        </div>
                        <span className="font-bold text-gray-900">{client.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-gray-600 font-mono text-sm">{client.idNumber}</td>
                    <td className="px-6 py-5 text-center">
                      <div className="flex justify-center gap-4">
                        {/* Dropdown Logic only on this specific button */}
                        <button 
                            onClick={() => toggleExpand(client._id)}
                            className={`p-2 transition-all ${expandedId === client._id ? 'text-[#00B4D8] bg-blue-50' : 'text-gray-400 hover:text-[#00B4D8]'}`}
                        >
                            {expandedId === client._id ? <ChevronUp size={20}/> : <ChevronDown size={20}/>}
                        </button>
                        <button className="text-gray-400 hover:text-gray-900 p-2"><MoreVertical size={20}/></button>
                      </div>
                    </td>
                  </tr>

                  {/* Expanded Section (Dropdown) */}
                  {expandedId === client._id && (
                    <tr className="bg-gray-50/50 animate-in slide-in-from-top-2 duration-300">
                      <td colSpan="3" className="px-10 py-8 border-l-4 border-[#00B4D8]">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                          <div className="flex items-start gap-3">
                            <Mail className="text-[#00B4D8]" size={18}/>
                            <div>
                              <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Email Address</p>
                              <p className="text-sm font-semibold text-gray-800">{client.email || 'N/A'}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <Fingerprint className="text-[#00B4D8]" size={18}/>
                            <div>
                              <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Verification Status</p>
                              <p className="text-sm font-semibold text-gray-800">Account Active</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <FileText className="text-[#00B4D8]" size={18}/>
                            <div>
                              <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Stored ID Copy</p>
                              <button className="text-sm font-bold text-blue-600 hover:underline">Download file.pdf</button>
                            </div>
                          </div>
                        </div>
                        <div className="mt-6 pt-6 border-t border-gray-200 flex gap-4">
                          {/* Button with no functionality as requested */}
                          <button className="bg-[#111827] text-white text-[10px] font-bold uppercase px-4 py-2 hover:bg-[#00B4D8] transition-colors">
                             Generate Statement
                          </button>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="py-12 text-center text-gray-400 text-xs font-bold uppercase tracking-widest">
                  No clients found in database
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* PAGINATION CONTROLS */}
        <div className="p-6 bg-gray-50 flex justify-between items-center border-t border-gray-100">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
            Page {currentPage} of {totalPages || 1}
          </p>
          <div className="flex gap-2">
            <button 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
              className="px-4 py-2 border border-gray-300 text-xs font-bold uppercase disabled:opacity-30 hover:bg-white transition-all"
            >
              Prev
            </button>
            <button 
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage(prev => prev + 1)}
              className="px-4 py-2 bg-[#111827] text-[#00B4D8] text-xs font-bold uppercase disabled:opacity-30 hover:bg-[#1a253a] transition-all"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Clients;