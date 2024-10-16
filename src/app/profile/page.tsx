'use client';

import React, { useState } from 'react';
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { FaEdit, FaEnvelope, FaPhone, FaEye, FaTrashAlt } from 'react-icons/fa';

export default function ProfilePage() {
  const [userInfo, setUserInfo] = useState({
    name: 'Jean Dupont',
    email: 'jean.dupont@example.com',
    phone: '0123456789',
    address: '123 Rue de Paris, France',
  });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setUserInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // Logique pour sauvegarder les modifications
    console.log('Informations sauvegardées:', userInfo);
  };

  function deleteMessage(id: number): void {
    throw new Error('Function not implemented.');
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8 ml-64 bg-gray-950">
          <h1 className="text-3xl font-bold mb-8 text-white mt-10">Mon Profil</h1>
          <form onSubmit={handleSubmit} className="shadow rounded-lg p-6 mb-8 bg-gray-950">
            <h2 className="text-2xl text-white font-bold mb-4">Informations personnelles</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-white">Nom</label>
                <input
                  type="text"
                  name="name"
                  value={userInfo.name}
                  onChange={handleChange}
                  className="mt-1 block w-full bg-gray-950 border p-2 py-2 text-gray-400 rounded-lg border-gray-900 shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-white">Email</label>
                <input
                  type="email"
                  name="email"
                  value={userInfo.email}
                  onChange={handleChange}
                  className="mt-1 block w-full bg-gray-950 border p-2 py-2 text-gray-400 rounded-lg border-gray-900 shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-white">Téléphone</label>
                <input
                  type="tel"
                  name="phone"
                  value={userInfo.phone}
                  onChange={handleChange}
                  className="mt-1 block w-full bg-gray-950 border p-2 py-2 text-gray-400 rounded-lg border-gray-900 shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-white">Adresse</label>
                <input
                  type="text"
                  name="address"
                  value={userInfo.address}
                  onChange={handleChange}
                  className="mt-1 block w-full bg-gray-950 border py-2 text-gray-400 rounded-lg border-gray-900 p-2 shadow-sm"
                />
              </div>
            </div>
            <button
              type="submit"
              className="mt-8 px-4 py-2 bg-blue-950 text-white rounded-md hover:bg-blue-900 transition duration-200"
            >
              Sauvegarder les modifications
            </button>
          </form>

          {/* Section des commandes récentes */}
          <section className="bg-gray-950 shadow rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-white">Commandes récentes</h2>
            <table className="min-w-full divide-y divide-gray-900">
              <thead className="bg-gray-950 rounded-lg">
                <tr className='bg-gray-900'>
                  <th className="px-6 py-3 text-left text-sm font-bold text-white uppercase tracking-wider">Commande</th>
                  <th className="px-6 py-3 text-left text-sm font-bold text-white uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-sm font-bold text-white uppercase tracking-wider">Statut</th>
                  <th className="px-6 py-3 text-left text-sm font-bold text-white uppercase tracking-wider">Montant</th>
                  <th className="px-6 py-3 text-left text-sm font-bold text-white uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-gray-950 divide-y divide-gray-900">
                {/* Exemple de lignes de commande */}
                {[
                  { id: 1, date: '2023/09/20', status: 'Expédiée', amount: '45.00€' },
                  { id: 2, date: '2023/09/18', status: 'En cours', amount: '30.00€' },
                ].map(order => (
                  <tr key={order.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-300">{`Commande #${order.id}`}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-300">{order.date}</td>
                    <td className={`px-6 py-4 whitespace-nowrap font-bold ${order.status === 'Expédiée' ? 'text-blue-950' : 'text-blue-500'}`}>{order.status}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-300">{order.amount}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                      <div className="flex space-x-2">
                        <button className="text-gray-500 hover:text-gray-400" title="Voir les détails">
                          <FaEye />
                        </button>
                        <button className="text-gray-500 hover:text-gray-400" title="Modifier la commande">
                          <FaEdit />
                        </button>
                        <button 
                          onClick={() => deleteMessage(order.id)} // Ajoutez la logique pour supprimer ici
                          className="text-gray-500 hover:text-gray-400" 
                          title="Supprimer la commande"
                        >
                          <FaTrashAlt />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </main>
      </div>
    </div>
  );
}