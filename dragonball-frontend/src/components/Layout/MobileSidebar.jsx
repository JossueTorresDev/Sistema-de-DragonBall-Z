import { Link, useLocation } from 'react-router-dom';
import { 
  Users, 
  Zap, 
  Globe, 
  Sword, 
  Sparkles, 
  BookOpen, 
  Home,
  X,
  Activity
} from 'lucide-react';

const MobileSidebar = ({ isOpen, onClose }) => {
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

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className="fixed top-0 left-0 w-64 h-full bg-white shadow-xl z-50 md:hidden transform transition-transform duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <Link to="/" className="flex items-center space-x-2" onClick={onClose}>
            <div className="w-8 h-8 bg-gradient-to-r from-dragon-orange to-dragon-gold rounded-full flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-gray-900">Shenron's Archive</span>
          </Link>
          
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="px-3 py-4 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            
            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={onClose}
                className={`flex items-center px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? 'bg-dragon-orange text-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Icon className={`w-5 h-5 mr-3 ${
                  active ? 'text-white' : 'text-gray-500'
                }`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <div className="text-center">
            <p className="text-xs text-gray-500 mb-1">Shenron's Archive</p>
            <p className="text-xs text-gray-400">v1.0.0</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileSidebar;