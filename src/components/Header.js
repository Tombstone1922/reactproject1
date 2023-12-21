import React, { useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import Order from './Order';
import { Link } from 'react-router-dom';

export default function Header(props) {
  const [cartOpen, setCartOpen] = useState(false);

  function showOrders(props) {
    let summa = 0;
    props.orders.forEach(el => (summa += Number.parseFloat(el.price)));

    return (
      <div>
        {props.orders.map(el => (
          <Order onDelete={props.onDelete} key={el.id} item={el} />
        ))}
        <p className='summa'> Сумма: {new Intl.NumberFormat().format(summa)}$ </p>
        <button
          onClick={() => {
            props.onClearCart();
            props.onPlaceOrder(); // Добавляем вызов метода оформления заказа
          }}
          className='clear-cart-button'
        >
          Оформить заказ
        </button>
      </div>
    );
  }

  function showNothing() {
    return (
      <div className='empty'>
        <h2>Товаров нет</h2>
      </div>
    );
  }

  return (
    <header>
      <div>
        <Link to='/'>
          <span className='logo'>Shoes</span>
        </Link>

        <ul className='nav'>
          <li>
            <Link to='/profile'>
              <span>{props.user ? `Welcome, ${props.user.username}!` : 'Profile'}</span>
            </Link>
          </li>
          <li>
            <Link to='/aboutus'>about us</Link>
          </li>
          <li>
            <Link to='/contacts'>contacts</Link>
          </li>
        </ul>

        <input
          type='text'
          placeholder='Поиск...'
          value={props.searchQuery}
          onChange={e => props.onUpdateSearchQuery(e.target.value)}
          className='search-input'
        />

        <FaShoppingCart
          onClick={() => setCartOpen(!cartOpen)}
          className={`shop-cart-button ${cartOpen && 'active'}`}
        />

        {cartOpen && (props.orders.length > 0 ? showOrders(props) : showNothing())}
      </div>
      <div className='presentation'></div>
    </header>
  );
}
