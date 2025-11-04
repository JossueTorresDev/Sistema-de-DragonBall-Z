import { useState, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const openModal = useCallback((data = null) => {
    setModalData(data);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setModalData(null);
    // Si estamos en una ruta de modal, volver a la lista
    const pathParts = location.pathname.split('/');
    if (pathParts.length > 2 && (pathParts[2] === 'nuevo' || pathParts[2] === 'nueva' || !isNaN(pathParts[2]))) {
      navigate(`/${pathParts[1]}`);
    }
  }, [navigate, location]);

  return {
    isOpen,
    modalData,
    openModal,
    closeModal
  };
};