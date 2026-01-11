import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Users, Clock, FileCheck, ArrowUpRight, Loader2 } from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState({ activeClients: 0, pendingDocs: 0, completedDocs: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get('https://debtors-backend.onrender.com/api/admin/stats');
        if (res.data.success) {
          setStats(res.data.stats);
        }
      } catch (err) {
        console.error("Error loading stats", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const cards = [
    { label: 'Active Clients', val: stats.activeClients, icon: <Users className="text-[#00B4D8]" />, trend: 'Steady', color: 'border-[#00B4D8]' },
    { label: 'Pending Requests', val: stats.pendingDocs, icon: <Clock className="text-orange-500" />, trend: 'Needs Action', color: 'border-orange-500' },
    { label: 'Completed Letters', val: stats.completedDocs, icon: <FileCheck className="text-green-500" />, trend: 'Recent Wins', color: 'border-green-500' },
  ];

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <Loader2 className="animate-spin text-[#00B4D8]" size={32} />
    </div>
  );

  return (
    <div className="space-y-10">
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
      
      {/* Activity Table Placeholder */}
      <div className="bg-white shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-[#111827] flex justify-between items-center">
          <h3 className="text-white font-black uppercase tracking-widest text-xs flex items-center gap-2">
            <ArrowUpRight size={16} className="text-[#00B4D8]" /> Recent System Logs
          </h3>
        </div>
        <div className="p-20 text-center bg-gray-50/30">
          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Monitoring Database Events...</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;