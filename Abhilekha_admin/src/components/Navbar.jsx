import React from 'react';
import { Search, Bell, User, Menu } from 'lucide-react';

const Navbar = ({ onMenuClick }) => {
  return (
    <header className="h-20 bg-white border-b border-slate-200 sticky top-0 z-40 px-4 md:px-8 flex items-center justify-between">

      <div className="flex items-center space-x-4">
        {/* Mobile Menu Button */}
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-xl transition-all"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Search Bar - Hidden on small mobile, shown on tablet/desktop */}
        <div className="relative w-64 md:w-96 group hidden sm:block">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-orange-500 transition-colors" />
          <input 
            type="text" 
            placeholder="Quick search..." 
            className="w-full bg-slate-50 border border-slate-200 rounded-full py-2.5 pl-11 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10 transition-all outline-none"
          />
        </div>
      </div>


      {/* Right Side Actions */}
      <div className="flex items-center space-x-6">
        <button className="relative p-2 text-slate-400 hover:text-orange-500 hover:bg-orange-50 rounded-xl transition-all group">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-orange-500 rounded-full border-2 border-white"></span>
        </button>
        
        <div className="h-8 w-px bg-slate-200"></div>

        <button className="flex items-center space-x-3 p-1.5 pr-3 hover:bg-slate-50 rounded-xl transition-all group border border-transparent hover:border-slate-200">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-orange-600 to-orange-400 flex items-center justify-center text-white font-bold text-sm">
            AD
          </div>
          <div className="text-left hidden lg:block">
            <p className="text-sm font-semibold text-slate-900 leading-none">Admin User</p>
            <p className="text-[11px] text-slate-500 font-medium mt-1">Super Admin</p>
          </div>
        </button>
      </div>
    </header>

  );
};

export default Navbar;
