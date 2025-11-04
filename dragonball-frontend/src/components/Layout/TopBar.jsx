import { Menu, Bell, Search, User } from 'lucide-react';

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
          
          <div className="hidden md:block">
            <h1 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              Shenron's Archive
            </h1>
            <p className="text-sm text-gray-500">Centro de Control Universal</p>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-3">
          
          {/* Search */}
          <div className="hidden sm:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Buscar en el archivo de Shenron..."
                className="pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm w-72 bg-gray-50/50 transition-all duration-200"
              />
            </div>
          </div>

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
              <p className="text-sm font-semibold text-gray-900">Guardián</p>
              <p className="text-xs text-gray-500">Protector del Archivo</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;