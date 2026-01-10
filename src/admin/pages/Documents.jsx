import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Send, Clock, CheckCircle, Mail, FileText, RefreshCw, AlertTriangle, X } from 'lucide-react';
import { Link } from 'react-router-dom'; // Ensure react-router-dom is installed

const Documents = () => {
  const [clientId, setClientId] = useState('');
  const [selectedCreditor, setSelectedCreditor] = useState('');
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  // Modal State for "ID Not Found"
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorDetails, setErrorDetails] = useState('');

  const API_BASE_URL = 'https://debtors-backend.onrender.com/api/admin';
  const creditorEmails = {
    "ABSA": "mlangaviclyde@gmail.com",
    "Capitec": "settlements@capitecbank.co.za",
    "Standard Bank": "paidup@standardbank.co.za",
    "Nedbank": "collections@nedbank.co.za",
    "FNB": "settlements@fnb.co.za"
  };
  const creditors = Object.keys(creditorEmails);

  const fetchLogs = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/logs`);
      if (res.data.success) setRequests(res.data.data);
    } catch (err) {
      console.error("Error fetching logs:", err);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const handleRequest = async () => {
    if (!clientId || !selectedCreditor) {
      return alert("Please enter a Client ID and select a Creditor.");
    }

    setLoading(true);
    try {
      const payload = {
        idNumber: clientId,
        creditorName: selectedCreditor,
        creditorEmail: creditorEmails[selectedCreditor]
      };

      const res = await axios.post(`${API_BASE_URL}/request-document`, payload);
      
      if (res.data.success) {
        setSubmitted(true);
        fetchLogs(); 
      }
    } catch (err) {
      // Trigger the Modal if 404 is returned
      if (err.response?.status === 404) {
        setErrorDetails(clientId);
        setShowErrorModal(true);
      } else {
        alert(err.response?.data?.message || "The server is waking up. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (requestId, file) => {
    const formData = new FormData();
    formData.append('paidUpLetter', file);

    try {
      const res = await axios.put(`${API_BASE_URL}/upload-document/${requestId}`, formData);
      if (res.data.success) {
        alert("Paid-up letter successfully linked to client record.");
        fetchLogs();
      }
    } catch (err) {
      alert("Upload failed.");
    }
  };

  // --- UI COMPONENTS ---

  const IDNotFoundModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-md p-8 shadow-2xl relative border-t-8 border-red-500">
        <button 
          onClick={() => setShowErrorModal(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-black"
        >
          <X size={24} />
        </button>
        
        <div className="text-center">
          <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="text-red-600" size={32} />
          </div>
          <h2 className="text-2xl font-black uppercase tracking-tighter text-gray-900 mb-2">ID Not Found</h2>
          <p className="text-gray-600 mb-6">
            The ID Number <span className="font-mono font-bold text-red-600">{errorDetails}</span> does not exist in our database. 
            Please add this client manually first.
          </p>
          
          <div className="flex flex-col gap-3">
            <Link 
              to="/admin/clients" 
              className="bg-gray-900 text-white font-bold py-4 px-6 uppercase tracking-widest text-xs hover:bg-[#00B4D8] transition-all"
            >
              Go to Clients Page
            </Link>
            <button 
              onClick={() => setShowErrorModal(false)}
              className="text-gray-400 font-bold uppercase tracking-widest text-[10px] hover:text-gray-600"
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  if (submitted) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-full max-w-md bg-[#111827] p-12 shadow-2xl text-center border-b-4 border-[#00B4D8] animate-in fade-in zoom-in duration-300">
          <CheckCircle className="w-16 h-16 text-[#00B4D8] mx-auto mb-4" />
          <h2 className="text-white text-2xl font-black uppercase tracking-tighter mb-2">Request Dispatched</h2>
          <p className="text-gray-400 text-sm font-medium">
            The request for <strong>{selectedCreditor}</strong> has been sent.
          </p>
          <button 
            onClick={() => { setSubmitted(false); setClientId(''); setSelectedCreditor(''); }}
            className="mt-8 bg-[#00B4D8] text-white px-8 py-3 text-xs font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all"
          >
            Create New Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative space-y-8 animate-in fade-in duration-500">
      {showErrorModal && <IDNotFoundModal />}

      {/* ACTION PANEL */}
      <div className="bg-[#111827] p-8 shadow-2xl border-b-4 border-[#00B4D8]">
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-white font-black uppercase tracking-widest flex items-center gap-2">
                <Mail className="text-[#00B4D8]" size={20} /> Request Paid-Up Letter
            </h2>
            <button onClick={fetchLogs} className="text-gray-500 hover:text-white transition-colors">
                <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
            </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Client ID Number</label>
            <input 
              type="text" 
              className="w-full bg-white/5 border border-gray-700 p-3 text-white focus:border-[#00B4D8] outline-none font-mono"
              placeholder="e.g. 9201015000081"
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Select Creditor</label>
            <select 
              className="w-full bg-white/5 border border-gray-700 p-3 text-white focus:border-[#00B4D8] outline-none appearance-none"
              value={selectedCreditor}
              onChange={(e) => setSelectedCreditor(e.target.value)}
            >
              <option value="" className="text-black">-- Select Creditor --</option>
              {creditors.map(c => (
                <option key={c} value={c} className="text-black">{c}</option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <button 
              disabled={loading}
              onClick={handleRequest}
              className="w-full bg-[#00B4D8] text-white font-black py-3 uppercase tracking-tighter hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2 disabled:bg-gray-800 disabled:text-gray-600"
              style={{ clipPath: 'polygon(0 0, 100% 0, 95% 100%, 0% 100%)' }}
            >
              {loading ? "Processing..." : <><Send size={18} /> Send Request</>}
            </button>
          </div>
        </div>
      </div>

      {/* REQUEST LOGS */}
      <div className="bg-white shadow-sm overflow-hidden border border-gray-100">
        <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center text-gray-900 font-black uppercase tracking-widest text-xs">
          Recent Document Activity
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 border-b bg-gray-50/30">
                <th className="px-8 py-4">Client Record</th>
                <th className="px-8 py-4">Creditor</th>
                <th className="px-8 py-4">Status</th>
                <th className="px-8 py-4 text-center">Admin Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {requests.length > 0 ? requests.map((req) => (
                <tr key={req._id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="px-8 py-4">
                    <p className="font-bold text-gray-900">{req.client?.name || 'In Database'}</p>
                    <p className="text-[10px] text-gray-400 uppercase font-mono">{req.idNumber}</p>
                  </td>
                  <td className="px-8 py-4 text-gray-600 font-semibold">{req.creditorName}</td>
                  <td className="px-8 py-4">
                    <span className={`flex items-center gap-1 text-[10px] font-black uppercase ${req.status === 'Received' ? 'text-green-600' : 'text-orange-500'}`}>
                      {req.status === 'Received' ? <CheckCircle size={14} /> : <Clock size={14} />}
                      {req.status}
                    </span>
                  </td>
                  <td className="px-8 py-4 text-center">
                    {req.status === 'Received' ? (
                      <a 
                        href={`https://debtors-backend.onrender.com/${req.documentUrl}`} 
                        target="_blank" 
                        rel="noreferrer"
                        className="bg-gray-900 text-[#00B4D8] text-[10px] px-4 py-2 font-black uppercase tracking-widest flex items-center justify-center gap-2 w-fit mx-auto hover:bg-[#00B4D8] hover:text-white transition-all"
                      >
                        <FileText size={14} /> View Document
                      </a>
                    ) : (
                      <div className="relative overflow-hidden group">
                        <input 
                          type="file" 
                          className="absolute inset-0 opacity-0 cursor-pointer z-10" 
                          onChange={(e) => handleFileUpload(req._id, e.target.files[0])}
                        />
                        <button className="text-[#00B4D8] border-2 border-[#00B4D8] text-[10px] px-4 py-2 font-black uppercase tracking-widest group-hover:bg-[#00B4D8] group-hover:text-white transition-all">
                          Upload Reply
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              )) : (
                <tr>
                    <td colSpan="4" className="px-8 py-12 text-center text-gray-400 text-xs font-bold uppercase tracking-widest">
                        No requests found in system
                    </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Documents;