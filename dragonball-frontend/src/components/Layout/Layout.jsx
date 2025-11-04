import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import MobileSidebar from './MobileSidebar';
import TopBar from './TopBar';
import ConnectionStatus from '../UI/ConnectionStatus';
import Breadcrumbs from '../UI/Breadcrumbs';

const Layout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar 
          isCollapsed={sidebarCollapsed} 
          setIsCollapsed={setSidebarCollapsed}
        />
      </div>
      
      {/* Mobile Sidebar */}
      <MobileSidebar 
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      {/* Top Bar */}
      <TopBar 
        onMenuClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        sidebarCollapsed={sidebarCollapsed}
      />
      
      {/* Connection Status */}
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'md:ml-16' : 'md:ml-64'}`}>
        <ConnectionStatus />
      </div>

      {/* Main Content */}
      <main className={`transition-all duration-300 ${
        sidebarCollapsed ? 'md:ml-16' : 'md:ml-64'
      } pt-20 min-h-screen`}>
        <div className="px-4 sm:px-8 py-8 max-w-7xl mx-auto">
          <Breadcrumbs />
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;