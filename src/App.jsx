import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/homePage';

// You can create a simple placeholder for other pages to test the routing
const PlaceholderPage = ({ title }) => (
  <div className="flex items-center justify-center h-screen bg-gray-100">
    <h1 className="text-3xl font-bold">{title} Page Coming Soon!</h1>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        {/* Main Landing Page */}
        <Route path="/" element={<HomePage />} />
        
        {/* Example additional routes */}
        <Route path="/features" element={<PlaceholderPage title="Features" />} />
        <Route path="/pricing" element={<PlaceholderPage title="Pricing" />} />
        <Route path="/support" element={<PlaceholderPage title="Support" />} />
      </Routes>
    </Router>
  );
}

export default App;