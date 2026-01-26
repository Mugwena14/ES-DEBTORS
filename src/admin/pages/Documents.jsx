import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { CheckCircle, AlertTriangle, X } from 'lucide-react';
import { Link } from 'react-router-dom';

import ConfirmationModal from '../components/ConfirmationModal';
import RequestForm from '../components/RequestForm';
import DocumentTable from '../components/DocumentTable';
import FilterBar from '../components/FilterBar';

const Documents = () => {
  const [clientId, setClientId] = useState('');
  const [selectedCreditor, setSelectedCreditor] = useState('');
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorDetails, setErrorDetails] = useState('');
  
  // Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  
  const menuRef = useRef(null);
  const [modalConfig, setModalConfig] = useState({ isOpen: false, title: '', message: '', type: 'danger', onConfirm: () => {} });

  const API_BASE_URL = 'https://mkh-debtors-backend.onrender.com/api/admin';
  const creditorEmails = {
    "ABSA": "mlangaviclyde@gmail.com",
    "Capitec": "settlements@capitecbank.co.za",
    "Standard Bank": "paidup@standardbank.co.za",
    "Nedbank": "collections@nedbank.co.za",
    "FNB": "settlements@fnb.co.za"
  };
  const creditors = Object.keys(creditorEmails);

  // Filter Logic
  const filteredRequests = requests.filter((req) => {
    const matchesSearch = 
      req.idNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (req.client?.name || '').toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = 
      statusFilter === 'All' || req.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) setActiveMenuId(null);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchLogs = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/logs`);
      if (res.data.success) setRequests(res.data.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchLogs(); }, []);

  const closeModal = () => setModalConfig({ ...modalConfig, isOpen: false });

  const handleRequest = async () => {
    if (!clientId || !selectedCreditor) {
      setModalConfig({ isOpen: true, title: "Incomplete Form", message: "Please enter a Client ID and select a Creditor.", type: "danger", onConfirm: closeModal });
      return;
    }
    setLoading(true);
    try {
      const payload = { idNumber: clientId, creditorName: selectedCreditor, creditorEmail: creditorEmails[selectedCreditor] };
      const res = await axios.post(`${API_BASE_URL}/request-document`, payload);
      if (res.data.success) { setSubmitted(true); fetchLogs(); }
    } catch (err) {
      if (err.response?.status === 404) { setErrorDetails(clientId); setShowErrorModal(true); }
    } finally { setLoading(false); }
  };

  const confirmMarkReceived = (requestId) => {
    setModalConfig({
      isOpen: true, title: "Confirm Status Change", message: "Mark this document as Received?", type: "info",
      onConfirm: async () => {
        await axios.put(`${API_BASE_URL}/update-status/${requestId}`, { status: 'Received' });
        fetchLogs(); setActiveMenuId(null); closeModal();
      }
    });
  };

  const confirmDelete = (requestId) => {
    setModalConfig({
      isOpen: true, title: "Delete Record", message: "This action cannot be undone.", type: "danger",
      onConfirm: async () => {
        await axios.delete(`${API_BASE_URL}/delete-request/${requestId}`);
        fetchLogs(); setActiveMenuId(null); closeModal();
      }
    });
  };

  if (submitted) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="w-full max-w-md bg-[#111827] p-12 shadow-2xl text-center border-b-4 border-[#00B4D8]">
        <CheckCircle className="w-16 h-16 text-[#00B4D8] mx-auto mb-4" />
        <h2 className="text-white text-2xl font-black uppercase tracking-tighter mb-2">Request Sent</h2>
        <button onClick={() => { setSubmitted(false); setClientId(''); setSelectedCreditor(''); }} className="mt-8 bg-[#00B4D8] text-white px-8 py-3 text-xs font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">Done</button>
      </div>
    </div>
  );

  return (
    <div className="relative space-y-8 animate-in fade-in duration-500">
      <ConfirmationModal {...modalConfig} onCancel={closeModal} />
      
      {showErrorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md p-8 shadow-2xl relative border-t-8 border-red-500">
            <button onClick={() => setShowErrorModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-black"><X size={24} /></button>
            <div className="text-center">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"><AlertTriangle className="text-red-600" size={32} /></div>
              <h2 className="text-2xl font-black uppercase tracking-tighter text-gray-900 mb-2">ID Not Found</h2>
              <p className="text-gray-600 mb-6">ID: <span className="font-mono font-bold text-red-600">{errorDetails}</span> does not exist.</p>
              <Link to="/admin/clients" className="block bg-gray-900 text-white font-bold py-4 px-6 uppercase tracking-widest text-xs">Go to Clients</Link>
            </div>
          </div>
        </div>
      )}

      <RequestForm 
        clientId={clientId} setClientId={setClientId} 
        selectedCreditor={selectedCreditor} setSelectedCreditor={setSelectedCreditor} 
        creditors={creditors} handleRequest={handleRequest} 
        loading={loading} fetchLogs={fetchLogs} 
      />

      {/* FILTER BAR SECTION */}
      <div>
        <FilterBar 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
          statusFilter={statusFilter} 
          setStatusFilter={setStatusFilter} 
        />
        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest pl-2">
          Showing {filteredRequests.length} of {requests.length} Requests
        </p>
      </div>

      <DocumentTable 
        requests={filteredRequests} 
        activeMenuId={activeMenuId} 
        setActiveMenuId={setActiveMenuId} 
        menuRef={menuRef} 
        onMarkReceived={confirmMarkReceived} 
        onDelete={confirmDelete} 
      />
    </div>
  );
};

export default Documents;