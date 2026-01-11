import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, FileText, CreditCard, LogOut, ChevronRight } from 'lucide-react';

const AdminLayout = () => {
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={20} /> },
    { name: 'Clients', path: '/admin/clients', icon: <Users size={20} /> },
    { name: 'Documents', path: '/admin/docs', icon: <FileText size={20} /> },
    { name: 'Invoices', path: '/admin/invoices', icon: <CreditCard size={20} /> },
  ];

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      {/* SIDEBAR */}
      <aside className="w-68 bg-[#111827] text-white flex flex-col shadow-2xl">
        <div className="p-8">
          <div 
            className="bg-[#00B4D8] text-white px-4 py-2 font-black text-lg tracking-tighter"
            style={{ clipPath: 'polygon(0 0, 100% 0, 90% 100%, 0% 100%)' }}
          >
            MKH ADMIN
          </div>
        </div>
        
        <nav className="flex-1 px-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center justify-between px-4 py-3 transition-all duration-300 group ${
                  isActive 
                  ? 'bg-[#00B4D8] text-white' 
                  : 'hover:bg-white/10 text-gray-400 hover:text-[#00B4D8]'
                }`}
                style={isActive ? { clipPath: 'polygon(0 0, 100% 0, 95% 100%, 0% 100%)' } : {}}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span className="font-bold text-sm uppercase tracking-widest">{item.name}</span>
                </div>
                {isActive && <ChevronRight size={16} />}
              </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t border-gray-800">
          <button className="flex items-center gap-3 text-gray-500 hover:text-red-400 transition-colors text-xs uppercase tracking-[0.2em] font-bold">
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 h-20 flex items-center justify-between px-10">
          <div className="flex items-center gap-4">
            <div className="h-1 w-12 bg-[#00B4D8]"></div>
            <h1 className="text-xl font-black text-gray-900 uppercase tracking-tighter">
              {menuItems.find(m => m.path === location.pathname)?.name || 'Control Panel'}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Admin Access</p>
              <p className="text-sm font-bold text-gray-900">ES MAKOFANE</p>
            </div>
            <div className="w-12 h-12 bg-gray-900 border-2 border-[#00B4D8] flex items-center justify-center text-[#00B4D8] font-black">
              MK
            </div>
          </div>
        </header>

        <section className="flex-1 overflow-y-auto p-10 bg-gray-50">
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default AdminLayout;