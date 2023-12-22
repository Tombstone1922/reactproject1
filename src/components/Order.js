import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Order({ item, onDelete, onClearAll }) {
  const handleDelete = () => {
    onDelete(item.id);
    toast.error(`Товар '${item.title}' Стоимостью: '${item.price}$' удален из корзины`, {
      position: 'bottom-right',
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
    });
  };

  const handleClearAll = () => {
    onClearAll();
    toast.success('Все товары из корзины удалены', {
      position: 'bottom-right',
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
    });
  };

  return (
    <div className="item">
      <FaTimes onClick={handleDelete} className="delete-icon" />
      <img src={`./img/${item.img}`} alt={item.title} className="img" />
      <h2>{item.title}</h2>
      <p>{item.desc}</p>
      <p>Price: {item.price}$</p>
      
    </div>
  );
}
