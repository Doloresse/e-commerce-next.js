// src/app/signup/page.tsx
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUserContext } from '../../contexts/UserContext';

const SignupPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { addUser } = useUserContext();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    addUser({ email });
    router.push('/login'); // Redirection vers la page de connexion
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Inscription</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Entrez votre email"
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-700">Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Entrez votre mot de passe"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white rounded py-2 hover:bg-blue-600 transition duration-200"
          >
            S'inscrire
          </button>
        </form>
        <p className="mt-4 text-center">
          Déjà un compte ? 
          <a href="/login" className="text-blue-500 hover:underline"> Connectez-vous</a>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
