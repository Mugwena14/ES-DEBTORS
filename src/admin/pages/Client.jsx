import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import SearchHeader from '../components/SearchHeader';
import ClientRow from '../components/ClientRow';
import ClientModal from '../components/ClientModal';
import ConfirmationModal from '../components/ConfirmationModal';

const API_URL = 'https://mkh-debtors-backend.onrender.com/api/clients';

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedId, setExpandedId] = useState(null);
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', idNumber: '', phoneNumber: '', accountStatus: 'Active' });

  // --- NEW: Confirmation Modal State ---
  const [confirmConfig, setConfirmConfig] = useState({ 
    isOpen: false, 
    title: '', 
    message: '', 
    onConfirm: () => {}, 
    type: 'danger' 
  });

  const clientsPerPage = 10;

  useEffect(() => { fetchClients(); }, []);

  const fetchClients = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setClients(Array.isArray(res.data) ? res.data : res.data.data || []);
    } catch (err) { console.error("Fetch error:", err); } 
    finally { setLoading(false); }
  };

  // --- NEW: Confirmation Trigger for Form (Update/Create) ---
  const triggerSubmitConfirm = (e) => {
    e.preventDefault();
    setConfirmConfig({
      isOpen: true,
      title: isEditMode ? 'Confirm Update' : 'Confirm New Client',
      message: `Are you sure you want to ${isEditMode ? 'save changes to' : 'create'} this client profile?`,
      type: 'primary',
      onConfirm: () => handleFormSubmit()
    });
  };

  const handleFormSubmit = async () => {
    setConfirmConfig(prev => ({ ...prev, isOpen: false }));
    setIsSubmitting(true);
    try {
      if (isEditMode) await axios.put(`${API_URL}/${selectedClientId}`, formData);
      else await axios.post(API_URL, formData);
      setIsModalOpen(false);
      resetForm();
      fetchClients();
    } catch (err) { 
      console.error(err.response?.data?.message || "Operation failed"); 
    } finally { setIsSubmitting(false); }
  };

  // --- NEW: Confirmation Trigger for Delete ---
  const triggerDeleteConfirm = (id) => {
    setConfirmConfig({
      isOpen: true,
      title: 'Delete Client',
      message: 'Are you sure? This action is permanent and all associated data will be removed.',
      type: 'danger',
      onConfirm: () => executeDelete(id)
    });
  };

  const executeDelete = async (id) => {
    setConfirmConfig(prev => ({ ...prev, isOpen: false }));
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchClients();
      setActiveMenuId(null);
    } catch (err) { console.error("Delete failed"); }
  };

  const openEditModal = (client) => {
    setIsEditMode(true);
    setSelectedClientId(client._id);
    setFormData({ name: client.name || '', email: client.email || '', idNumber: client.idNumber || '', phoneNumber: client.phoneNumber || '', accountStatus: client.accountStatus || 'Active' });
    setIsModalOpen(true);
    setActiveMenuId(null);
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', idNumber: '', phoneNumber: '', accountStatus: 'Active' });
    setIsEditMode(false);
    setSelectedClientId(null);
  };

  const filteredClients = clients.filter(c => c.idNumber?.includes(searchTerm) || c.name?.toLowerCase().includes(searchTerm.toLowerCase()));
  const currentClients = filteredClients.slice((currentPage - 1) * clientsPerPage, currentPage * clientsPerPage);
  const totalPages = Math.ceil(filteredClients.length / clientsPerPage);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* ADD/EDIT FORM MODAL */}
      <ClientModal 
        isOpen={isModalOpen} isEditMode={isEditMode} formData={formData} 
        setFormData={setFormData} onSubmit={triggerSubmitConfirm} 
        onClose={() => { setIsModalOpen(false); resetForm(); }} isSubmitting={isSubmitting} 
      />

      {/* REUSABLE CONFIRMATION MODAL */}
      <ConfirmationModal 
        isOpen={confirmConfig.isOpen}
        title={confirmConfig.title}
        message={confirmConfig.message}
        type={confirmConfig.type}
        onConfirm={confirmConfig.onConfirm}
        onCancel={() => setConfirmConfig(prev => ({ ...prev, isOpen: false }))}
      />

      <SearchHeader searchTerm={searchTerm} setSearchTerm={setSearchTerm} onAddClick={() => { resetForm(); setIsModalOpen(true); }} />

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
                <td colSpan="3" className="py-20 text-center"><Loader2 className="animate-spin mx-auto text-[#00B4D8]" size={32} /></td>
              </tr>
            ) : currentClients.map(client => (
              <ClientRow 
                key={client._id} client={client} isExpanded={expandedId === client._id} 
                onToggleExpand={(id) => setExpandedId(expandedId === id ? null : id)}
                activeMenuId={activeMenuId} setActiveMenuId={setActiveMenuId}
                onEdit={openEditModal} onDelete={triggerDeleteConfirm}
              />
            ))}
          </tbody>
        </table>
        
        <div className="p-6 bg-gray-50 flex justify-between items-center border-t border-gray-100">
          <p className="text-xs font-bold text-gray-400 uppercase">Page {currentPage} of {totalPages || 1}</p>
          <div className="flex gap-2">
            <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} className="px-4 py-2 border border-gray-300 text-xs font-bold uppercase disabled:opacity-30">Prev</button>
            <button disabled={currentPage === totalPages || totalPages === 0} onClick={() => setCurrentPage(p => p + 1)} className="px-4 py-2 bg-[#111827] text-[#00B4D8] text-xs font-bold uppercase disabled:opacity-30">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Clients;