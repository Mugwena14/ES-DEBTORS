import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Users, Clock, FileCheck, ArrowUpRight, Loader2, Calendar, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [stats, setStats] = useState({ activeClients: 0, pendingDocs: 0, completedDocs: 0 });
  const [recentRequests, setRecentRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = 'https://mkh-debtors-backend.onrender.com/api/admin';

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Parallel fetch: Stats, Clients, and WhatsApp (Chatbot) Requests
        const [statsRes, clientsRes, whatsappRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/stats`),
          axios.get('https://mkh-debtors-backend.onrender.com/api/clients'),
          axios.get(`${API_BASE_URL}/whatsapp-requests`)
        ]);

        if (statsRes.data.success) {
          const allClients = clientsRes.data.data || [];
          const activeCount = allClients.filter(c => c.accountStatus === 'Active').length;

          setStats({
            ...statsRes.data.stats,
            activeClients: activeCount 
          });
          
          // Show the 5 most recent Chatbot requests instead of manual doc logs
          const latestChatRequests = (whatsappRes.data.data || []).slice(0, 5);
          setRecentRequests(latestChatRequests);
        }
      } catch (err) {
        console.error("Error loading dashboard data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  const formatMongoDate = (dateField) => {
    if (!dateField) return 'N/A';
    const dateObj = new Date(dateField);
    return isNaN(dateObj.getTime()) ? 'Invalid Date' : dateObj.toLocaleDateString('en-ZA');
  };

  const cards = [
    { label: 'Active Clients', val: stats.activeClients, icon: <Users className="text-[#00B4D8]" />, trend: 'Live Data', color: 'border-[#00B4D8]' },
    { label: 'Pending Requests', val: stats.pendingDocs, icon: <Clock className="text-orange-500" />, trend: 'Needs Action', color: 'border-orange-500' },
    { label: 'Completed Letters', val: stats.completedDocs, icon: <FileCheck className="text-green-500" />, trend: 'Recent Wins', color: 'border-green-500' },
  ];

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <Loader2 className="animate-spin text-[#00B4D8]" size={32} />
    </div>
  );

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {cards.map((c) => (
          <div key={c.label} className={`bg-white p-8 shadow-sm border-l-4 ${c.color} group hover:shadow-xl transition-all`}>
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-gray-50 group-hover:bg-gray-100 transition-colors">{c.icon}</div>
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{c.trend}</span>
            </div>
            <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-1">{c.label}</p>
            <h2 className="text-4xl font-black text-gray-900">{c.val}</h2>
          </div>
        ))}
      </div>
      
      {/* CHATBOT ACTIVITY TABLE */}
      <div className="bg-white shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-[#111827] flex justify-between items-center">
          <h3 className="text-white font-black uppercase tracking-widest text-xs flex items-center gap-2">
            <MessageSquare size={16} className="text-[#00B4D8]" /> Recent Chatbot Requests
          </h3>
          <Link to="/admin/requests" className="text-[#00B4D8] text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors">
            View Requests
          </Link>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Client / Phone</th>
                <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Inquiry Type</th>
                <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Status</th>
                <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentRequests.length > 0 ? (
                recentRequests.map((req) => (
                  <tr key={req._id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-8 py-4">
                      <p className="font-bold text-gray-900 text-sm">{req.clientName}</p>
                      <p className="text-[10px] font-mono text-[#00B4D8]">{req.clientPhone}</p>
                    </td>
                    <td className="px-8 py-4 text-xs font-bold text-gray-600">
                      <span className="bg-gray-100 px-2 py-1 rounded text-gray-500">{req.requestType}</span>
                    </td>
                    <td className="px-8 py-4">
                      <span className={`text-[9px] font-black px-2 py-1 uppercase tracking-tighter rounded ${
                        req.status === 'COMPLETED' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {req.status}
                      </span>
                    </td>
                    <td className="px-8 py-4 text-gray-400">
                      <div className="flex items-center gap-1 text-[10px] font-bold uppercase">
                        <Calendar size={12} />
                        {formatMongoDate(req.createdAt)}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-8 py-10 text-center text-gray-400 text-xs font-bold uppercase tracking-[0.2em]">
                    No recent chatbot activity
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

export default Dashboard;