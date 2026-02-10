import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, AlertTriangle, X, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

import ConfirmationModal from '../components/ConfirmationModal';
import RequestForm from '../components/RequestForm';
import DocumentTable from '../components/DocumentTable';
import FilterBar from '../components/FilterBar';

const DebtReview = () => {
  const navigate = useNavigate();
  const [clientId, setClientId] = useState('');
  const [emails, setEmails] = useState(['']); 
  const [attachments, setAttachments] = useState({ idFile: null, poaFile: null });

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorDetails, setErrorDetails] = useState('');
  
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  
  const menuRef = useRef(null);
  const [modalConfig, setModalConfig] = useState({ 
    isOpen: false, title: '', message: '', type: 'danger', onConfirm: () => {} 
  });

  const API_BASE_URL = 'https://mkh-debtors-backend.onrender.com/api/admin';

  // --- AUTH HELPERS ---
  const getAuthHeaders = () => {
    const token = localStorage.getItem('adminToken');
    return {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  };

  const handleAuthError = (err) => {
    if (err.response && err.response.status === 401) {
      localStorage.removeItem('adminToken');
      navigate('/login');
    }
    console.error("API Error:", err);
  };

  const filteredRequests = requests.filter((req) => {
    const isDebtReviewType = req.requestType === 'Debt Review';
    const matchesSearch = 
      req.idNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (req.client?.name || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || req.status === statusFilter;
    return isDebtReviewType && matchesSearch && matchesStatus;
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
      const res = await axios.get(`${API_BASE_URL}/logs`, getAuthHeaders());
      if (res.data.success) setRequests(res.data.data);
    } catch (err) { 
      handleAuthError(err);
    }
  };

  useEffect(() => { fetchLogs(); }, []);

  const closeModal = () => setModalConfig({ ...modalConfig, isOpen: false });

  const handleRequest = async () => {
    const recipientList = emails.filter(email => email.trim() !== '');

    if (!clientId || recipientList.length === 0 || !attachments.idFile || !attachments.poaFile) {
      setModalConfig({ 
        isOpen: true, 
        title: "Incomplete Form", 
        message: "Please enter a Client ID, at least one Debt Review email, and upload both ID and POA documents.", 
        type: "danger", 
        onConfirm: closeModal 
      });
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append('idNumber', clientId);
    formData.append('requestType', 'Debt Review');
    formData.append('creditorEmails', JSON.stringify(recipientList));
    formData.append('idFile', attachments.idFile);
    formData.append('poaFile', attachments.poaFile);

    try {
      const res = await axios.post(`${API_BASE_URL}/request-document`, formData, getAuthHeaders());
      if (res.data.success) { 
        setSubmitted(true); 
        fetchLogs(); 
      }
    } catch (err) {
      if (err.response?.status === 404) { 
        setErrorDetails(clientId); 
        setShowErrorModal(true); 
      } else {
        handleAuthError(err);
      }
    } finally { setLoading(false); }
  };

  const confirmMarkReceived = (requestId) => {
    setModalConfig({
      isOpen: true, title: "Confirm Status Change", message: "Mark Clearance Certificate as Received?", type: "info",
      onConfirm: async () => {
        try {
          await axios.patch(`${API_BASE_URL}/update-request-status/${requestId}`, { status: 'Received' }, getAuthHeaders());
          fetchLogs(); 
          setActiveMenuId(null); 
          closeModal();
        } catch (err) {
          handleAuthError(err);
        }
      }
    });
  };

  const confirmDelete = (requestId) => {
    setModalConfig({
      isOpen: true, title: "Delete Record", message: "This action cannot be undone.", type: "danger",
      onConfirm: async () => {
        try {
          await axios.delete(`${API_BASE_URL}/delete-request/${requestId}`, getAuthHeaders());
          fetchLogs(); 
          setActiveMenuId(null); 
          closeModal();
        } catch (err) {
          handleAuthError(err);
        }
      }
    });
  };

  if (submitted) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="w-full max-w-md bg-[#111827] p-12 shadow-2xl text-center border-b-4 border-[#8B5CF6]">
        <ShieldCheck className="w-16 h-16 text-[#8B5CF6] mx-auto mb-4" />
        <h2 className="text-white text-2xl font-black uppercase tracking-tighter mb-2">Clearance Request Sent</h2>
        <p className="text-gray-400 text-sm">Form 19 request dispatched with verification attachments.</p>
        <button 
          onClick={() => { 
            setSubmitted(false); 
            setClientId(''); 
            setEmails(['']);
            setAttachments({ idFile: null, poaFile: null });
          }} 
          className="mt-8 bg-[#8B5CF6] text-white px-8 py-3 text-xs font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all"
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
              <h2 className="text-2xl font-black uppercase tracking-tighter text-gray-900 mb-2">Client Not Found</h2>
              <p className="text-gray-600 mb-6">The ID <span className="font-mono font-bold text-red-600">{errorDetails}</span> is not registered.</p>
              <Link to="/admin/clients" className="block bg-gray-900 text-white font-bold py-4 px-6 uppercase tracking-widest text-xs">View Clients</Link>
            </div>
          </div>
        </div>
      )}

      <RequestForm 
        clientId={clientId} 
        setClientId={setClientId} 
        emails={emails} 
        setEmails={setEmails}
        attachments={attachments}
        setAttachments={setAttachments}
        handleRequest={handleRequest} 
        loading={loading} 
        fetchLogs={fetchLogs} 
        title="Request Clearance Certificate"
        buttonLabel="Send Clearance Inquiry"
        accentColor="#8B5CF6"
      />

      <div>
        <FilterBar 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
          statusFilter={statusFilter} 
          setStatusFilter={setStatusFilter} 
        />
        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest pl-2 mt-2">
          Showing {filteredRequests.length} Debt Review Records
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

export default DebtReview;