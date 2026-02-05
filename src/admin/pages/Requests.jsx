import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Filter } from 'lucide-react';
import ConfirmationModal from '../components/ConfirmationModal';
import EmailModal from '../components/EmailModal';
import DetailsModal from '../components/DetailsModal';
import RequestsTable from '../components/RequestsTable';

const API_BASE_URL = 'https://mkh-debtors-backend.onrender.com/api/admin';

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [serviceFilter, setServiceFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [sendingEmail, setSendingEmail] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(null);
  
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [activeImgUrl, setActiveImgUrl] = useState(null);
  const [emailModal, setEmailModal] = useState({ isOpen: false, data: null, message: '', file: null });
  const [confirmConfig, setConfirmConfig] = useState({ isOpen: false, title: '', message: '', onConfirm: () => {}, type: 'danger' });

  useEffect(() => { fetchRequests(); }, []);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE_URL}/whatsapp-requests`);
      setRequests(res.data.data || []);
    } catch (err) { 
      console.error("Fetch Error:", err); 
    } finally { 
      setLoading(false); 
    }
  };

  /**
   * UPDATED: Now accepts the specific status string from the dropdown
   */
  const updateStatus = async (id, newStatus) => {
    try {
      setUpdatingStatus(id);
      
      // Sending PATCH to match your backend CORS update
      // Using the dynamic status passed from RequestsTable
      await axios.patch(`${API_BASE_URL}/update-request-status/${id}`, { 
        status: newStatus 
      });

      // Update local state with the new specific status
      setRequests(prev => prev.map(req => 
        req._id === id ? { ...req, status: newStatus } : req 
      ));
    } catch (err) { 
      console.error("Status Update Error:", err);
      alert("Failed to update status. Check backend connection."); 
    } finally { 
      setUpdatingStatus(null); 
    }
  };

  const handleSendEmail = async () => {
    const recipientEmail = emailModal.data?.clientEmail || emailModal.data?.details?.email;
    if (!recipientEmail) return alert("No recipient email found.");
    
    try {
      setSendingEmail(true);
      const formData = new FormData();
      formData.append('to', recipientEmail);
      formData.append('subject', `Update: ${emailModal.data.requestType} - MKH Debtors`);
      formData.append('message', emailModal.message);
      if (emailModal.file) formData.append('attachment', emailModal.file);

      await axios.post(`${API_BASE_URL}/send-client-email`, formData, { 
        headers: { 'Content-Type': 'multipart/form-data' } 
      });
      alert("Email sent successfully!");
      setEmailModal({ isOpen: false, data: null, message: '', file: null });
    } catch (err) { 
      alert("Failed to send email."); 
    } finally { 
      setSendingEmail(false); 
    }
  };

  const filteredRequests = requests.filter(req => {
    const matchesSearch = 
      req.clientName?.toLowerCase().includes(searchTerm.toLowerCase()) || 
      req.clientPhone?.includes(searchTerm) ||
      req.creditorName?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = serviceFilter === 'All' || req.requestType === serviceFilter;
    return matchesSearch && matchesFilter;
  });

  const itemsPerPage = 10;
  const currentRequests = filteredRequests.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      <EmailModal 
        {...emailModal} 
        sendingEmail={sendingEmail}
        onClose={() => setEmailModal({...emailModal, isOpen: false})}
        onMessageChange={(msg) => setEmailModal({...emailModal, message: msg})}
        onFileChange={(file) => setEmailModal({...emailModal, file})}
        onRemoveFile={() => setEmailModal({...emailModal, file: null})}
        onSend={handleSendEmail}
      />

      <DetailsModal 
        selectedRequest={selectedRequest}
        activeImgUrl={activeImgUrl}
        onBack={() => setActiveImgUrl(null)}
        onClose={() => { setSelectedRequest(null); setActiveImgUrl(null); }}
        onSetActiveImg={(url) => setActiveImgUrl(url)}
        onDownload={(url) => url.replace('/upload/', '/upload/fl_attachment/')}
      />

      <div className="bg-white p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-xl">
        {/* SEARCH INPUT */}
        <div className="relative flex-1 max-md:max-w-md">
          <input 
            type="text" 
            placeholder="Search name, phone or creditor..." 
            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-[#00B4D8] outline-none transition-all font-medium text-sm rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="absolute left-3 top-3.5 text-gray-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </div>
        </div>

        {/* FILTER SELECT */}
        <div className="flex items-center gap-3">
          <Filter size={18} className="text-gray-400" />
          <select 
            className="bg-[#111827] text-white px-4 py-3 text-xs font-bold uppercase tracking-widest outline-none rounded-lg cursor-pointer hover:bg-black transition-colors"
            value={serviceFilter}
            onChange={(e) => setServiceFilter(e.target.value)}
          >
            <option value="All">All Services</option>
            <option value="Credit Report">Credit Report</option>
            <option value="Paid Up">Paid Up</option>
            <option value="Prescription">Prescription</option>
            <option value="Debt Review">Debt Review</option>
            <option value="Defaults">Defaults</option>
            <option value="Car Application">Car Application</option>
            <option value="Judgment Removal">Judgment Removal</option>
          </select>
        </div>
      </div>

      <RequestsTable 
        requests={currentRequests}
        loading={loading}
        updatingStatus={updatingStatus}
        onUpdateStatus={updateStatus} // This now passes (id, label)
        onView={setSelectedRequest}
        onEmail={(req) => setEmailModal({ isOpen: true, data: req, message: `Hi ${req.clientName},`, file: null })}
        onDelete={(id) => setConfirmConfig({ isOpen: true, title: 'Delete', message: 'Confirm delete?', onConfirm: () => {} })}
      />

      {/* Pagination component logic would go here */}
    </div>
  );
};

export default Requests;