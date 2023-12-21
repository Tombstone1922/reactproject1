import React, { useState } from 'react';
import Modal from 'react-modal';
import '../index.css';
;

const Item = ({ item, onAdd }) => {
    const [modalOpen, setModalOpen] = useState(false);
  
    const handleAdd = () => {
      onAdd(item);
    };
  
    const openModal = () => {
      setModalOpen(true);
    };
  
    const closeModal = () => {
      setModalOpen(false);
    };
  
    return (
      <div className="item">
        <img src={`./img/${item.img}`} alt={item.title} onClick={openModal} />
        <h2>{item.title}</h2>
        <p>{item.desc}</p>
        <b>{item.price}$</b>
        <div className="add-to-cart" onClick={handleAdd}>
          +
        </div>
        {modalOpen && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={closeModal}>
                &times;
              </span>
              <img src={`./img/${item.img}`} alt={item.title} />
            </div>
          </div>
        )}
      </div>
    );
  };

  export default Item;