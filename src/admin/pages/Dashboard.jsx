import React from 'react';
import { TrendingUp, Users, MessageSquare } from 'lucide-react';

const Dashboard = () => {
  const cards = [
    { label: 'Total WhatsApp Leads', val: '158', icon: <MessageSquare className="text-[#00B4D8]" />, trend: '+12% this week' },
    { label: 'Active Clients', val: '64', icon: <Users className="text-[#00B4D8]" />, trend: 'Steady' },
    { label: 'Pending Docs', val: '09', icon: <TrendingUp className="text-[#00B4D8]" />, trend: 'Needs Action' },
  ];

  return (
    <div className="space-y-10">
      {/* STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {cards.map((c) => (
          <div key={c.label} className="bg-white p-8 shadow-sm border-l-4 border-[#00B4D8] group hover:shadow-xl transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-gray-50 group-hover:bg-[#00B4D8]/10 transition-colors">
                {c.icon}
              </div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{c.trend}</span>
            </div>
            <p className="text-gray-500 text-xs font-bold uppercase tracking-[0.2em] mb-1">{c.label}</p>
            <h2 className="text-4xl font-black text-gray-900">{c.val}</h2>
          </div>
        ))}
      </div>

      {/* RECENT ACTIVITY TABLE */}
      <div className="bg-white shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-900">
          <h3 className="text-white font-bold uppercase tracking-widest text-sm">Recent Interactions</h3>
          <button className="text-[#00B4D8] text-xs font-bold uppercase hover:underline">View All</button>
        </div>
        <div className="p-10 text-center py-20">
          <p className="text-gray-400 text-sm italic">Connection to MongoDB active. Listening for new WhatsApp events...</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;