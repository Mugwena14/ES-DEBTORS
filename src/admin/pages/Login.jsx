import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, Loader2, ShieldCheck } from 'lucide-react';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Your backend login URL
  const LOGIN_URL = 'https://mkh-debtors-backend.onrender.com/api/admin/login';

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(LOGIN_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // 1. Save the actual JWT from your Auth Controller
        localStorage.setItem('adminToken', data.token);
        
        // 2. Navigate to the protected admin dashboard
        navigate('/admin');
      } else {
        // Handle 401 or 404 from backend
        setError(data.message || 'Invalid email or password.');
      }
    } catch (err) {
      // Handle network errors
      setError('Server connection failed. Please try again later.');
      console.error("Login Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
      {/* Logo / Brand Header */}
      <div className="mb-8 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="bg-[#111827] w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
          <ShieldCheck size={32} className="text-[#00B4D8]" />
        </div>
        <h1 className="text-2xl font-bold text-[#111827] uppercase tracking-tighter">
          MKH <span className="text-[#00B4D8]">Portal</span>
        </h1>
        <p className="text-gray-500 text-sm font-medium">Administrator Access Only</p>
      </div>

      {/* Login Card */}
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="p-8">
          {error && (
            <div className="mb-6 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-xs font-bold uppercase tracking-wide animate-pulse">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                Email Address
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 text-gray-400" size={18} />
                <input
                  type="email"
                  name="email"
                  required
                  value={credentials.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#00B4D8] transition-all text-sm font-medium"
                  placeholder="admin@mkhdebtors.co.za"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
                <input
                  type="password"
                  name="password"
                  required
                  value={credentials.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#00B4D8] transition-all text-sm font-medium"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#111827] text-[#00B4D8] py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-black disabled:bg-gray-400 transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-900/10"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                "Secure Sign In"
              )}
            </button>
          </form>
        </div>
        
        <div className="bg-gray-50 p-4 text-center border-t border-gray-100">
          <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">
            Protected by MKH Security Systems
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;