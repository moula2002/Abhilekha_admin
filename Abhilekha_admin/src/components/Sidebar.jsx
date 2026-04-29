import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  Settings, 
  LogOut,
  ChevronRight,
  Shield,
  X
} from 'lucide-react';

import { useNavigate } from 'react-router-dom';


const Sidebar = ({ onClose }) => {
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { name: 'Clients', icon: Users, path: '/clients' },
    { name: 'Jobs', icon: Briefcase, path: '/jobs' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('adminInfo');
    navigate('/login');
    window.location.reload();
  };


  return (
    <div className="w-full h-full bg-black border-r border-white/10 flex flex-col p-6 overflow-y-auto">
      {/* Brand Logo & Close Button */}
      <div className="flex items-center justify-between mb-10 px-2">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-600/30">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight leading-tight">Abhilekha</h2>
            <p className="text-[10px] text-orange-500 font-bold uppercase tracking-widest">Admin Portal</p>
          </div>
        </div>
        
        {/* Mobile Close Button */}
        <button 
          onClick={onClose}
          className="lg:hidden p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            onClick={() => {
              if (window.innerWidth < 1024) onClose();
            }}
            className={({ isActive }) => `
              flex items-center justify-between px-4 py-3.5 rounded-xl transition-all group
              ${isActive 
                ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/20' 
                : 'text-slate-400 hover:bg-white/5 hover:text-white border border-transparent'}
            `}
          >
            <div className="flex items-center space-x-3">
              <item.icon className="w-5 h-5 transition-transform group-hover:scale-110" />
              <span className="font-medium">{item.name}</span>
            </div>
            <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
          </NavLink>
        ))}
      </nav>

      {/* Footer / User Profile */}
      <div className="mt-auto pt-6 border-t border-white/10">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-4 py-3.5 text-white/60 hover:text-orange-500 hover:bg-orange-500/5 rounded-xl transition-colors group"
        >
          <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Logout</span>
        </button>

      </div>
    </div>
  );
};


export default Sidebar;
