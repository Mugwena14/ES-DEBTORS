import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { CheckCircle, AlertTriangle, X, FileSearch } from 'lucide-react';
import { Link } from 'react-router-dom';

import ConfirmationModal from '../components/ConfirmationModal';
import RequestForm from '../components/RequestForm';
import DocumentTable from '../components/DocumentTable';
import FilterBar from '../components/FilterBar';

const Prescription = () => {
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
    "ABSA Legal": "legal@absa.co.za",
    "Capitec Legal": "legal@capitecbank.co.za",
    "Standard Bank Legal": "prescriptions@standardbank.co.za",
    "Nedbank Legal": "nedbanklegal@nedbank.co.za",
    "FNB Legal": "fnbprescriptions@fnb.co.za"
  };
  const creditors = Object.keys(creditorEmails);

  // Filter Logic - Specific to Prescription
  const filteredRequests = requests.filter((req) => {
    const isPrescriptionType = req.requestType === 'Prescription';
    const matchesSearch = 
      req.idNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (req.client?.name || '').toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = 
      statusFilter === 'All' || req.status === statusFilter;

    return isPrescriptionType && matchesSearch && matchesStatus;
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
      setModalConfig({ 
        isOpen: true, 
        title: "Incomplete Form", 
        message: "Please enter a Client ID and select a Creditor for Prescription check.", 
        type: "danger", 
        onConfirm: closeModal 
      });
      return;
    }
    setLoading(true);
    try {
      const payload = { 
        idNumber: clientId, 
        creditorName: selectedCreditor, 
        creditorEmail: creditorEmails[selectedCreditor],
        requestType: 'Prescription' 
      };
      const res = await axios.post(`${API_BASE_URL}/request-document`, payload);
      if (res.data.success) { setSubmitted(true); fetchLogs(); }
    } catch (err) {
      if (err.response?.status === 404) { setErrorDetails(clientId); setShowErrorModal(true); }
    } finally { setLoading(false); }
  };

  const confirmMarkReceived = (requestId) => {
    setModalConfig({
      isOpen: true, title: "Confirm Status Change", message: "Mark Prescription Status as Received?", type: "info",
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
      <div className="w-full max-w-md bg-[#111827] p-12 shadow-2xl text-center border-b-4 border-amber-500">
        <FileSearch className="w-16 h-16 text-amber-500 mx-auto mb-4" />
        <h2 className="text-white text-2xl font-black uppercase tracking-tighter mb-2">Prescription Inquiry Sent</h2>
        <button 
          onClick={() => { setSubmitted(false); setClientId(''); setSelectedCreditor(''); }} 
          className="mt-8 bg-amber-500 text-white px-8 py-3 text-xs font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all"
        >
          Done
        </button>
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
              <Link to="/admin/clients" className="block bg-gray-900 text-white font-bold py-4 px-6 uppercase tracking-widest text-xs">Register Client</Link>
            </div>
          </div>
        </div>
      )}

      {/* Hero Header */}
      <div className="bg-white p-6 border-l-4 border-amber-500 shadow-sm">
        <h1 className="text-sm font-black text-gray-400 uppercase tracking-[0.2em]">Compliance Module</h1>
        <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">Prescription Check</h2>
      </div>

      {/* NEW REUSABLE FORM CALL */}
      <RequestForm 
        clientId={clientId} 
        setClientId={setClientId} 
        selectedCreditor={selectedCreditor} 
        setSelectedCreditor={setSelectedCreditor} 
        creditors={creditors} 
        handleRequest={handleRequest} 
        loading={loading} 
        fetchLogs={fetchLogs} 
        title="Inquire Prescription Status"
        buttonLabel="Send Legal Inquiry"
        accentColor="#F59E0B" // Amber-500
      />

      {/* FILTER BAR SECTION */}
      <div>
        <FilterBar 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
          statusFilter={statusFilter} 
          setStatusFilter={setStatusFilter} 
        />
        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest pl-2 mt-2">
          Showing {filteredRequests.length} Prescription Requests
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

export default Prescription;