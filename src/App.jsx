import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Public Landing Page
import LandingPage from './LandingPage';

// Admin Components
import AdminLayout from './admin/AdminLayout';
import Dashboard from './admin/pages/Dashboard';
import Clients from './admin/pages/Client';
import Documents from './admin/pages/Documents';
import InvoiceGenerator from './admin/pages/InvoiceGenerator'; // Ensure path is correct

function App() {
  return (
    <Router>
      <Routes>
        {/* PUBLIC WEBSITE ROUTE */}
        <Route path="/" element={<LandingPage />} />

        {/* ADMIN PORTAL ROUTES */}
        <Route path="/admin" element={<AdminLayout />}>
          {/* Dashboard is the default view for /admin */}
          <Route index element={<Dashboard />} />
          
          {/* Client Management */}
          <Route path="clients" element={<Clients />} />
          
          {/* Document Requests & Logs */}
          <Route path="docs" element={<Documents />} />
          
          {/* Billing & Invoice Generation */}
          <Route path="invoices" element={<InvoiceGenerator />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;