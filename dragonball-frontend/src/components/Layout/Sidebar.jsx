import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Users, 
  Zap, 
  Globe, 
  Sword, 
  Sparkles, 
  BookOpen, 
  Home,
  ChevronLeft,
  ChevronRight,
  Activity
} from 'lucide-react';

const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
  const location = useLocation();

  const navigation = [
    { name: 'Santuario', href: '/', icon: Home },
    { name: 'Guerreros', href: '/personajes', icon: Users },
    { name: 'Razas', href: '/razas', icon: Zap },
    { name: 'Planetas', href: '/planetas', icon: Globe },
    { name: 'Sagas', href: '/sagas', icon: BookOpen },
    { name: 'Artes Marciales', href: '/tecnicas', icon: Sword },
    { name: 'Transformaciones', href: '/transformaciones', icon: Sparkles },
    { name: 'Combates', href: '/batallas', icon: Activity },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className={`bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 shadow-2xl border-r border-slate-700 transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    } flex flex-col h-screen fixed left-0 top-0 z-30`}>
      
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-700/50">
        {!isCollapsed && (
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-lg font-bold text-white">Shenron's</span>
              <p className="text-xs text-slate-400">Archive</p>
            </div>
          </Link>
        )}
        
        {isCollapsed && (
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700 rounded-xl flex items-center justify-center mx-auto shadow-lg">
            <Zap className="w-6 h-6 text-white" />
          </div>
        )}
        
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-lg hover:bg-slate-700/50 transition-all duration-200 text-slate-400 hover:text-white"
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6 space-y-2 overflow-y-auto">
        {navigation.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`relative flex items-center px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                active
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/25'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
              title={isCollapsed ? item.name : ''}
            >
              <Icon className={`w-5 h-5 ${isCollapsed ? 'mx-auto' : 'mr-3'} ${
                active ? 'text-white' : 'text-slate-400 group-hover:text-white'
              }`} />
              {!isCollapsed && (
                <span className="truncate">{item.name}</span>
              )}
              
              {/* Active indicator for collapsed state */}
              {isCollapsed && active && (
                <div className="absolute left-0 w-1 h-10 bg-gradient-to-b from-blue-600 to-blue-700 rounded-r-full shadow-lg"></div>
              )}
              
              {/* Hover effect */}
              {!active && (
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600/10 to-blue-700/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-700/50">
        {!isCollapsed ? (
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <p className="text-xs text-slate-400">Sistema Activo</p>
            </div>
            <p className="text-xs text-slate-500">Shenron's Archive v1.0.0</p>
          </div>
        ) : (
          <div className="w-3 h-3 bg-green-400 rounded-full mx-auto animate-pulse shadow-lg shadow-green-400/50" title="Sistema activo"></div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;