import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import AdminLogin from './pages/AdminLogin';
import Clients from './pages/Clients';
import Jobs from './pages/Jobs';
import { fetchClients, fetchJobs } from './api';
import { Users, Briefcase, TrendingUp, Clock, Loader2 } from 'lucide-react';


// Simple Dashboard Placeholder
// Improved Dashboard Component with Data Fetching
const Dashboard = () => {
  const [counts, setCounts] = useState({ clients: 0, jobs: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCounts = async () => {
      try {
        const [clientsRes, jobsRes] = await Promise.all([
          fetchClients(),
          fetchJobs()
        ]);
        setCounts({
          clients: clientsRes.data.length,
          jobs: jobsRes.data.length
        });
      } catch (err) {
        console.error('Failed to fetch dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };
    getCounts();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <Loader2 className="w-10 h-10 text-orange-500 animate-spin" />
        <p className="text-slate-400 font-medium">Updating dashboard...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Dashboard Overview</h1>
        <p className="text-slate-500 mt-1">Real-time statistics of your admin portal.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Clients Card */}
        <div className="bg-white p-6 rounded-[24px] border border-slate-200 shadow-sm hover:shadow-md transition-shadow group">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 group-hover:scale-110 transition-transform">
              <Users className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-emerald-500 bg-emerald-50 px-2 py-1 rounded-lg flex items-center">
              <TrendingUp className="w-3 h-3 mr-1" /> Active
            </span>
          </div>
          <p className="text-slate-500 text-sm font-medium">Total Clients</p>
          <h3 className="text-3xl font-bold text-slate-900 mt-1">{counts.clients}</h3>
          <div className="mt-4 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-orange-500 rounded-full w-[65%]"></div>
          </div>
        </div>

        {/* Jobs Card */}
        <div className="bg-white p-6 rounded-[24px] border border-slate-200 shadow-sm hover:shadow-md transition-shadow group">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
              <Briefcase className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-blue-500 bg-blue-50 px-2 py-1 rounded-lg flex items-center">
              <Clock className="w-3 h-3 mr-1" /> Open
            </span>
          </div>
          <p className="text-slate-500 text-sm font-medium">Active Jobs</p>
          <h3 className="text-3xl font-bold text-slate-900 mt-1">{counts.jobs}</h3>
          <div className="mt-4 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 rounded-full w-[45%]"></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="h-64 bg-slate-50 border border-dashed border-slate-200 rounded-3xl flex items-center justify-center text-slate-400 italic">
          Recent Activity Feed Coming Soon
        </div>
        <div className="h-64 bg-slate-50 border border-dashed border-slate-200 rounded-3xl flex items-center justify-center text-slate-400 italic">
          Quick Insights Coming Soon
        </div>
      </div>
    </div>
  );
};



function App() {
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const adminInfo = localStorage.getItem('adminInfo');
    if (adminInfo) {
      setAdmin(JSON.parse(adminInfo));
    }
  }, []);

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route 
          path="/login" 
          element={!admin ? <AdminLogin /> : <Navigate to="/" />} 
        />

        {/* Protected Routes (Wrapped in Layout) */}
        <Route 
          path="/" 
          element={
            admin ? (
              <Layout>
                <Dashboard />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          } 
        />
        
        <Route 
          path="/clients" 
          element={
            admin ? (
              <Layout>
                <Clients />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          } 
        />

        <Route 
          path="/jobs" 
          element={
            admin ? (
              <Layout>
                <Jobs />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          } 
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
