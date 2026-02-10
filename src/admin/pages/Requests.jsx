import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Added for redirecting on auth failure
import { Filter, Loader2 } from 'lucide-react';
import ConfirmationModal from '../components/ConfirmationModal';
import EmailModal from '../components/EmailModal';
import DetailsModal from '../components/DetailsModal';
import RequestsTable from '../components/RequestsTable';

const API_BASE_URL = 'https://mkh-debtors-backend.onrender.com/api/admin';

const Requests = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [serviceFilter, setServiceFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [activeImgUrl, setActiveImgUrl] = useState(null);
  const [updatingStatus, setUpdatingStatus] = useState(null);
  const [sendingEmail, setSendingEmail] = useState(false);

  const [emailModal, setEmailModal] = useState({ isOpen: false, data: null, message: '', file: null });
  const [confirmConfig, setConfirmConfig] = useState({ 
    isOpen: false, title: '', message: '', onConfirm: () => {}, type: 'danger' 
  });

  // Helper to get headers with token
  const getAuthHeaders = () => {
    const token = localStorage.getItem('adminToken');
    return {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  };

  // Helper to handle 401 Unauthorized
  const handleAuthError = (err) => {
    if (err.response && err.response.status === 401) {
      localStorage.removeItem('adminToken');
      navigate('/login');
    }
    console.error("API Error:", err);
  };

  useEffect(() => { fetchRequests(); }, []);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE_URL}/whatsapp-requests`, getAuthHeaders());
      setRequests(res.data.data || []);
    } catch (err) { 
      handleAuthError(err);
    } finally { 
      setLoading(false); 
    }
  };

  const executeDelete = async (id) => {
    setConfirmConfig(prev => ({ ...prev, isOpen: false }));
    try {
      setLoading(true);
      await axios.delete(`${API_BASE_URL}/delete-request/${id}`, getAuthHeaders());
      setRequests(prev => prev.filter(req => req._id !== id));
      alert("Request deleted successfully");
    } catch (err) {
      handleAuthError(err);
      alert("Failed to delete request");
    } finally {
      setLoading(false);
    }
  };

  const executeStatusUpdate = async (id, newStatus) => {
    setConfirmConfig(prev => ({ ...prev, isOpen: false }));
    try {
      setUpdatingStatus(id);
      await axios.patch(
        `${API_BASE_URL}/update-request-status/${id}`, 
        { status: newStatus }, 
        getAuthHeaders()
      );
      setRequests(prev => prev.map(req => req._id === id ? { ...req, status: newStatus } : req ));
    } catch (err) { 
      handleAuthError(err);
      alert("Status update failed"); 
    } finally { 
      setUpdatingStatus(null); 
    }
  };

  const handleSendEmail = async () => {
    const recipientEmail = emailModal.data?.clientEmail || emailModal.data?.details?.email;
    if (!recipientEmail) return alert("No email found.");
    
    setSendingEmail(true);
    try {
      const formData = new FormData();
      formData.append('to', recipientEmail);
      formData.append('subject', `Update: ${emailModal.data.serviceType || 'Request'}`);
      formData.append('message', emailModal.message);
      if (emailModal.file) formData.append('attachment', emailModal.file);

      // Note: Axios automatically sets multipart/form-data when sending FormData
      await axios.post(`${API_BASE_URL}/send-client-email`, formData, getAuthHeaders());
      
      alert("Email sent!");
      setEmailModal({ isOpen: false, data: null, message: '', file: null });
    } catch (err) { 
      handleAuthError(err);
      alert("Failed to send email"); 
    } finally { 
      setSendingEmail(false); 
    }
  };

  // --- REST OF COMPONENT LOGIC (Filtering/Pagination) REMAINS THE SAME ---
  const filterMap = {
    "Credit Report": "CREDIT_REPORT",
    "Paid Up": "PAID_UP_LETTER",
    "Prescription": "PRESCRIPTION",
    "Debt Review": "DEBT_REVIEW_REMOVAL",
    "Defaults": "DEFAULT_CLEARING",
    "Car Application": "CAR_APPLICATION",
    "Judgment Removal": "JUDGMENT_REMOVAL"
  };

  const filteredRequests = requests.filter(req => {
    const type = req.serviceType || "";
    const creditor = req.details?.creditorName || "";
    const matchesSearch = 
      req.clientName?.toLowerCase().includes(searchTerm.toLowerCase()) || 
      req.clientPhone?.includes(searchTerm) ||
      creditor.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = serviceFilter === 'All' || type === filterMap[serviceFilter];
    return matchesSearch && matchesFilter;
  });

  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
  const currentRequests = filteredRequests.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleDelete = (id) => {
    setConfirmConfig({
      isOpen: true,
      title: 'Delete Request',
      message: 'Are you sure you want to permanently delete this request? This action cannot be undone.',
      type: 'danger',
      onConfirm: () => executeDelete(id)
    });
  };

  const handleUpdateStatus = (id, newStatus) => {
    setConfirmConfig({
      isOpen: true,
      title: 'Update Status',
      message: `Change request status to ${newStatus}?`,
      type: 'primary',
      onConfirm: () => executeStatusUpdate(id, newStatus)
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <EmailModal 
        {...emailModal} sendingEmail={sendingEmail} onSend={handleSendEmail}
        onClose={() => setEmailModal({...emailModal, isOpen: false})}
        onMessageChange={(msg) => setEmailModal({...emailModal, message: msg})}
        onFileChange={(file) => setEmailModal({...emailModal, file})}
        onRemoveFile={() => setEmailModal({...emailModal, file: null})}
      />

      <DetailsModal 
        selectedRequest={selectedRequest} activeImgUrl={activeImgUrl}
        onBack={() => setActiveImgUrl(null)}
        onClose={() => { setSelectedRequest(null); setActiveImgUrl(null); }}
        onSetActiveImg={(url) => setActiveImgUrl(url)}
        onDownload={(url) => url.replace('/upload/', '/upload/fl_attachment/')}
      />

      <ConfirmationModal 
        isOpen={confirmConfig.isOpen} title={confirmConfig.title} message={confirmConfig.message}
        type={confirmConfig.type} onConfirm={confirmConfig.onConfirm}
        onCancel={() => setConfirmConfig(prev => ({ ...prev, isOpen: false }))}
      />

      <div className="bg-white p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-xl">
        <div className="relative flex-1">
          <input 
            type="text" placeholder="Search name, phone or creditor..." 
            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-[#00B4D8] outline-none rounded-lg text-sm font-medium"
            value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
          />
          <div className="absolute left-3 top-3.5 text-gray-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Filter size={18} className="text-gray-400" />
          <select 
            className="bg-[#111827] text-white px-4 py-3 text-xs font-bold uppercase tracking-widest rounded-lg outline-none"
            value={serviceFilter} onChange={(e) => { setServiceFilter(e.target.value); setCurrentPage(1); }}
          >
            <option value="All">All Services</option>
            {Object.keys(filterMap).map(label => <option key={label} value={label}>{label}</option>)}
          </select>
        </div>
      </div>

      <div className="bg-white shadow-xl overflow-hidden border border-gray-100 rounded-xl">
        {loading ? (
          <div className="py-20 text-center">
            <Loader2 className="animate-spin mx-auto text-[#00B4D8]" size={32} />
          </div>
        ) : (
          <>
            <RequestsTable 
              requests={currentRequests} updatingStatus={updatingStatus}
              onUpdateStatus={handleUpdateStatus} 
              onView={setSelectedRequest}
              onDelete={handleDelete}
              onEmail={(req) => setEmailModal({ isOpen: true, data: req, message: `Hi ${req.clientName},`, file: null })}
            />
            
            <div className="p-6 bg-gray-50 flex justify-between items-center border-t border-gray-100">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                Page {currentPage} of {totalPages || 1}
              </p>
              <div className="flex gap-2">
                <button 
                  disabled={currentPage === 1} 
                  onClick={() => setCurrentPage(p => p - 1)} 
                  className="px-4 py-2 border border-gray-300 text-xs font-bold uppercase tracking-widest disabled:opacity-30 hover:bg-white transition-colors"
                >
                  Prev
                </button>
                <button 
                  disabled={currentPage === totalPages || totalPages === 0} 
                  onClick={() => setCurrentPage(p => p + 1)} 
                  className="px-4 py-2 bg-[#111827] text-[#00B4D8] text-xs font-bold uppercase tracking-widest disabled:opacity-30 hover:bg-black transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Requests;