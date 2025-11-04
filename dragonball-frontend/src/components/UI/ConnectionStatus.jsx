import { useState, useEffect } from 'react';
import { Wifi, WifiOff, AlertTriangle } from 'lucide-react';
import api from '../../services/api';

const ConnectionStatus = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [apiStatus, setApiStatus] = useState('checking');
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const checkApiConnection = async () => {
      try {
        await api.get('/personajes');
        setApiStatus('connected');
        setShowAlert(false);
      } catch (error) {
        setApiStatus('disconnected');
        setShowAlert(true);
        
        // Hide alert after 5 seconds
        setTimeout(() => {
          setShowAlert(false);
        }, 5000);
      }
    };

    // Check initial connection
    checkApiConnection();

    // Check connection every 30 seconds
    const interval = setInterval(checkApiConnection, 30000);

    // Listen for online/offline events
    const handleOnline = () => {
      setIsOnline(true);
      checkApiConnection();
    };
    
    const handleOffline = () => {
      setIsOnline(false);
      setApiStatus('disconnected');
      setShowAlert(true);
      
      // Hide alert after 5 seconds
      setTimeout(() => {
        setShowAlert(false);
      }, 5000);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      clearInterval(interval);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if ((isOnline && apiStatus === 'connected') || !showAlert) {
    return null; // Don't show anything when everything is working or alert is hidden
  }

  const getStatusInfo = () => {
    if (!isOnline) {
      return {
        icon: WifiOff,
        message: 'Sin conexión a internet',
        color: 'bg-red-500'
      };
    }
    
    if (apiStatus === 'disconnected') {
      return {
        icon: AlertTriangle,
        message: 'No se puede conectar con la API del backend',
        color: 'bg-yellow-500'
      };
    }
    
    return {
      icon: Wifi,
      message: 'Verificando conexión...',
      color: 'bg-blue-500'
    };
  };

  const { icon: Icon, message, color } = getStatusInfo();

  return (
    <div className={`fixed top-16 left-0 right-0 z-40 ${color} text-white px-4 py-2`}>
      <div className="flex items-center justify-center space-x-2">
        <Icon className="w-4 h-4" />
        <span className="text-sm font-medium">{message}</span>
      </div>
    </div>
  );
};

export default ConnectionStatus;