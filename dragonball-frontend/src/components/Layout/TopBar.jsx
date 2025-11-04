import { Menu, Bell, User } from 'lucide-react';

const TopBar = ({ onMenuClick, sidebarCollapsed }) => {
  return (
    <header className={`bg-white/95 backdrop-blur-sm shadow-lg border-b border-gray-200/50 transition-all duration-300 ${
      sidebarCollapsed ? 'md:ml-16' : 'md:ml-64'
    } fixed top-0 right-0 left-0 z-20`}>
      <div className="flex items-center justify-between px-6 py-4">
        
        {/* Left side */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuClick}
            className="p-2 rounded-xl hover:bg-gray-100 transition-all duration-200 md:hidden"
          >
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
          
          <div className="hidden md:flex md:items-center md:space-x-3">
            <h1 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              Las Aventuras de Dragon Ball
            </h1>
            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg animate-pulse">
              <span className="text-lg">🐉</span>
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-3">
          


          {/* Notifications */}
          <button className="relative p-2.5 rounded-xl hover:bg-gray-100 transition-all duration-200 group">
            <Bell className="w-5 h-5 text-gray-600 group-hover:text-gray-800" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-red-500 to-red-600 rounded-full animate-pulse shadow-lg shadow-red-500/50"></span>
          </button>

          {/* User menu */}
          <div className="flex items-center space-x-3 pl-3 border-l border-gray-200">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-gray-900">Jossue</p>
              <p className="text-xs text-gray-500">Analista de Sistemas</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;