// src/app/login/page.tsx
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUserContext } from '../../contexts/UserContext';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { users } = useUserContext();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const user = users.find(user => user.email === email);

    if (user) {
      // Rediriger vers la page de la liste des utilisateurs
      router.push('/customer');
    } else {
      setError('Identifiants invalides. Veuillez réessayer.');
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Email" 
          required 
        />
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Mot de passe" 
          required 
        />
        <button type="submit">Se connecter</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default LoginPage;
