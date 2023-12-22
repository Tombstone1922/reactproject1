import React, { useState } from 'react';



// ...

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

// ...

const Registration = ({ onRegistrationSubmit }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Передаем данные наружу для обработки в компоненте App
    onRegistrationSubmit(username, password);
    // Очищаем поля формы после отправки
    setUsername('');
    setPassword('');
  };

  return (
    <div>
      <h2>Registration</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={handleUsernameChange} required />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={handlePasswordChange} required />
        </label>
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Registration;
