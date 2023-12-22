// ProfilePage.js
import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';

export default function ProfilePage() {
  const [isLoginFormVisible, setLoginFormVisible] = useState(true);

  const toggleForm = () => {
    setLoginFormVisible(!isLoginFormVisible);
  };

  return (
    <div className="profile-page">
      {isLoginFormVisible ? (
        <LoginForm onToggleForm={toggleForm} />
      ) : (
        <RegistrationForm onToggleForm={toggleForm} />
      )}
    </div>
  );
}
