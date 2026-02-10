import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Public Pages
import LandingPage from './LandingPage';
import Login from './admin/pages/Login';

// Auth Guard
import ProtectedRoute from './admin/components/ProtectedRoute';

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

        {/* LOGIN ROUTE - Accessible to everyone */}
        <Route path="/login" element={<Login />} />

        {/* PROTECTED ADMIN ROUTES */}
        {/* Everything inside this Route requires a token to be present */}
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="clients" element={<Clients />} />
            <Route path="requests" element={<Requests />} />

            <Route path="docs">
              <Route path="paid-up" element={<PaidUp />} />
              <Route path="prescription" element={<Prescription />} />
              <Route path="debt-review" element={<DebtReview />} />
              <Route path="defaults" element={<Defaults />} />
            </Route>
            
            <Route path="invoices" element={<InvoiceGenerator />} />
          </Route>
        </Route>

        {/* CATCH-ALL: Redirect any unknown paths back to landing */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;