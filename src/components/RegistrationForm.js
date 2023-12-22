// RegistrationForm.js
import React, { useState } from 'react';
import '../index.css';

const RegistrationForm = ({ onToggleForm, setUser }) => {
  const [registrationData, setRegistrationData] = useState({
    username: '',
    password: '',
    // Другие поля для регистрации
  });

  const handleRegistration = async () => {
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Registration successful:', data);

        // Сохраните информацию о вошедшем пользователе в состояние
        // Например, если у вас есть функция setUser в вашем компоненте
        setUser(data.user);
      } else {
        console.error('Registration failed:', data.message);
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  const handleChange = (e) => {
    setRegistrationData({
      ...registrationData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="registration-form">
      <h2>Регистрация</h2>
      <label>
        Логин:
        <input type="text" name="username" value={registrationData.username} onChange={handleChange} />
      </label>
      <label>
        Пароль:
        <input type="password" name="password" value={registrationData.password} onChange={handleChange} />
      </label>
      {/* Добавьте другие поля для регистрации */}
      <button onClick={handleRegistration}>Зарегистрироваться</button>
      <p>
        Уже есть аккаунт?{' '}
        <span onClick={onToggleForm} style={{ cursor: 'pointer', color: 'blue' }}>
          Войдите
        </span>
      </p>
    </div>
  );
};

export default RegistrationForm;
