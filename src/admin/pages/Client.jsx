import React, { useState, useEffect } from 'react';
import { Search, ChevronDown, ChevronUp, MoreVertical, FileText, Mail, Fingerprint } from 'lucide-react';

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedId, setExpandedId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const clientsPerPage = 10;

  // Mock Data (Replace with your useEffect API fetch from /api/clients)
  const allClients = [
    { _id: '1', name: 'Sipho Zulu', idNumber: '9201015000081', email: 'sipho@example.com', docUrl: '#' },
    { _id: '2', name: 'Lerato Mokoena', idNumber: '8805125000082', email: 'lerato@example.com', docUrl: '#' },
    // ... add more to test pagination
  ];

  useEffect(() => {
    // In production: fetch('/api/clients').then(res => res.json()).then(data => setClients(data))
    setClients(allClients);
  }, []);

  // Search Logic
  const filteredClients = clients.filter(client => 
    client.idNumber.includes(searchTerm) || client.name.toLowerCase().includes(searchTerm.toLowerCase())
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
    <div className="space-y-6">
      {/* SEARCH BAR SECTION */}
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
        <button className="bg-[#111827] text-[#00B4D8] px-8 py-3 font-bold text-xs uppercase tracking-widest hover:bg-[#00B4D8] hover:text-white transition-all">
          Search Database
        </button>
      </div>

      {/* CLIENTS TABLE */}
      <div className="bg-white shadow-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#111827] text-white uppercase text-[10px] tracking-[0.2em] font-bold">
              <th className="px-6 py-4">Full Name</th>
              <th className="px-6 py-4">ID Number</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {currentClients.map((client) => (
              <React.Fragment key={client._id}>
                {/* Main Row */}
                <tr className="hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => toggleExpand(client._id)}>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#00B4D8]/10 text-[#00B4D8] flex items-center justify-center font-bold text-xs">
                        {client.name.charAt(0)}
                      </div>
                      <span className="font-bold text-gray-900">{client.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-gray-600 font-mono text-sm">{client.idNumber}</td>
                  <td className="px-6 py-5 text-center">
                    <div className="flex justify-center gap-4">
                      <button className="text-gray-400 hover:text-[#00B4D8]">{expandedId === client._id ? <ChevronUp size={20}/> : <ChevronDown size={20}/>}</button>
                      <button className="text-gray-400 hover:text-gray-900"><MoreVertical size={20}/></button>
                    </div>
                  </td>
                </tr>

                {/* Expanded Section (Dropdown) */}
                {expandedId === client._id && (
                  <tr className="bg-gray-50/50">
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
                            <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Verification</p>
                            <p className="text-sm font-semibold text-gray-800">ID Confirmed via WhatsApp</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <FileText className="text-[#00B4D8]" size={18}/>
                          <div>
                            <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Documents</p>
                            <a href={client.docUrl} className="text-sm font-bold text-blue-600 hover:underline">View ID Copy.pdf</a>
                          </div>
                        </div>
                      </div>
                      <div className="mt-6 pt-6 border-t border-gray-200 flex gap-4">
                        <button className="bg-[#111827] text-white text-[10px] font-bold uppercase px-4 py-2 hover:bg-[#00B4D8] transition-colors">Generate Statement</button>
                        <button className="border border-gray-300 text-gray-600 text-[10px] font-bold uppercase px-4 py-2 hover:bg-gray-100">Edit Profile</button>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>

        {/* PAGINATION CONTROLS */}
        <div className="p-6 bg-gray-50 flex justify-between items-center border-t border-gray-100">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
            Showing {indexOfFirstClient + 1} to {Math.min(indexOfLastClient, filteredClients.length)} of {filteredClients.length}
          </p>
          <div className="flex gap-2">
            <button 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
              className="px-4 py-2 border border-gray-300 text-xs font-bold uppercase disabled:opacity-30"
            >
              Prev
            </button>
            <button 
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => prev + 1)}
              className="px-4 py-2 bg-[#111827] text-[#00B4D8] text-xs font-bold uppercase disabled:opacity-30"
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