// Notification.js
import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Notification({ message, type }) {
  useEffect(() => {
    if (message) {
      // Используем разные методы в зависимости от типа уведомления (success или error)
      toast[type](message, {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
      });
    }
  }, [message, type]);

  return <ToastContainer position="bottom-right" />;
}
