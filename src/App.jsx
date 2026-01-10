import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Public Landing Page
import LandingPage from './LandingPage';

// Admin Components
import AdminLayout from './admin/AdminLayout';
import Dashboard from './admin/pages/Dashboard'
import Clients from './admin/pages/Client';
import Documents from './admin/pages/Documents';

function App() {
  return (
    <Router>
      <Routes>
        {/* PUBLIC WEBSITE ROUTE */}
        <Route path="/" element={<LandingPage />} />

        {/* ADMIN PORTAL ROUTES */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="clients" element={<Clients />} />
          <Route path="docs" element={<Documents />} />
          
          {/* Placeholders for future routes */}
          <Route path="docs" element={<div className="p-10 text-gray-400 uppercase font-bold">Documents Module coming soon...</div>} />
          <Route path="settings" element={<div className="p-10 text-gray-400 uppercase font-bold">Settings Module coming soon...</div>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;