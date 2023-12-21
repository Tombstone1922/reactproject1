// LoginForm.js
import React, { useState } from 'react';
import '../index.css';

const LoginForm = ({ onToggleForm, setUser }) => {
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Login successful:', data);

        // Сохраните информацию о вошедшем пользователе в состояние
        // Например, если у вас есть функция setUser в вашем компоненте
        setUser(data.user);
      } else {
        console.error('Login failed:', data.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="login-form">
      <h2>Вход в аккаунт</h2>
      <label>
        Логин:
        <input type="text" name="username" value={loginData.username} onChange={handleChange} />
      </label>
      <label>
        Пароль:
        <input type="password" name="password" value={loginData.password} onChange={handleChange} />
      </label>
      <button onClick={handleLogin}>Войти</button>
      <p>
        Нет аккаунта?{' '}
        <span onClick={onToggleForm} style={{ cursor: 'pointer', color: 'blue' }}>
          Зарегистрируйтесь
        </span>
      </p>
    </div>
  );
};

export default LoginForm;