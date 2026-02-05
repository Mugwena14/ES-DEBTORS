import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Public Landing Page
import LandingPage from './LandingPage';

// Admin Components
import AdminLayout from './admin/AdminLayout';
import Dashboard from './admin/pages/Dashboard';
import Clients from './admin/pages/Client';
import PaidUp from './admin/pages/PaidUp';
import Prescription from './admin/pages/Prescription'; 
import DebtReview from './admin/pages/DebtReview'; 
import InvoiceGenerator from './admin/pages/InvoiceGenerator'; 
import Defaults from './admin/pages/Defaults';
import Requests from './admin/pages/Requests';

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
          
          <Route path="requests" element={<Requests/>} />
          {/* Document Requests & Logs - Nested Routes */}
          <Route path="docs">
            <Route path="paid-up" element={<PaidUp/>} />
            <Route path="prescription" element={<Prescription/>} />
            <Route path="debt-review" element={<DebtReview/>} />
            <Route path="defaults" element={<Defaults/>} />
          </Route>
          
          {/* Billing & Invoice Generation */}
          <Route path="invoices" element={<InvoiceGenerator />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;