'use client';

import React, { useState } from 'react';
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { FaSave, FaStore, FaShippingFast, FaCreditCard, FaBell, FaLock, FaPaintBrush } from 'react-icons/fa';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    storeName: 'Ma Boutique en Ligne',
    email: 'contact@maboutique.com',
    currency: 'EUR',
    language: 'Français',
    shippingMethods: ['Standard', 'Express'],
    paymentMethods: ['Carte de crédit', 'PayPal'],
    notifications: true,
    twoFactorAuth: false,
    themeColor: '#4F46E5', // Couleur par défaut
    brightness: 100 // Luminosité par défaut
  });

  const handleChange = (e: { target: { name: any; value: any; type: any; checked: any; }; }) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // Logique pour sauvegarder les paramètres
    console.log('Paramètres sauvegardés:', settings);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-950">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8 ml-64">
          <h1 className="text-3xl font-bold mb-8 text-white">Paramètres de la boutique</h1>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Informations générales */}
            <section className="bg-gray-950 shadow p-6">
              <h2 className="text-xl text-gray-100 font-semibold mb-4 flex items-center">
                <FaStore className="mr-2" /> Informations générales
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mt-5 text-sm font-bold text-gray-100">Nom de la boutique</label>
                  <input
                    type="text"
                    name="storeName"
                    value={settings.storeName}
                    onChange={handleChange}
                    className=" block w-full mt-4 p-2 border rounded-lg py-2 text-gray-400 border-gray-900 shadow-sm bg-gray-950"
                  />
                </div>
                <div>
                  <label className="block text-sm mt-4 p-2 font-bold text-gray-100">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={settings.email}
                    onChange={handleChange}
                    className="mt-1 block w-full p-2 rounded-lg border py-2 text-gray-400 border-gray-900 shadow-sm bg-gray-950"
                  />
                </div>
              </div>
            </section>

            {/* Options de couleur et luminosité */}
            <section className="bg-gray-950  p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center text-gray-100">
                <FaPaintBrush className="mr-2" /> Apparence
              </h2>
              <div>
                <label className="block text-sm font-bold text-gray-100">Couleur du thème</label>
                <input
                  type="color"
                  name="themeColor"
                  value={settings.themeColor}
                  onChange={handleChange}
                  className="mt-1 w-full h-10 rounded-lg cursor-pointer"
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-bold text-gray-100">Luminosité</label>
                <input
                  type="range"
                  name="brightness"
                  min="0"
                  max="200"
                  value={settings.brightness}
                  onChange={handleChange}
                  className="mt-1 w-full h-2 bg-gray-200 rounded-lg cursor-pointer"
                />
                <span className='text-gray-100'>{settings.brightness}%</span>
              </div>
            </section>

            {/* Notifications */}
            <section className="bg-gray-950 p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center text-white">
                <FaBell className="mr-2 text-gray-100" /> Notifications
              </h2>
              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="notifications"
                    checked={settings.notifications}
                    onChange={handleChange}
                    className="rounded border-gray-900  shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                  <span className="ml-2 text-gray-100">Activer les notifications par email</span>
                </label>
              </div>
            </section>

            {/* Sécurité */}
            <section className="bg-gray-950 shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center text-white">
                <FaLock className="mr-2 text-gray-100" /> Sécurité
              </h2>
              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="twoFactorAuth"
                    checked={settings.twoFactorAuth}
                    onChange={handleChange}
                    className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                  <span className="ml-2 text-gray-100">Activer l'authentification à deux facteurs</span>
                </label>
              </div>
            </section>

            {/* Bouton de sauvegarde */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-gray-950 border border-white text-gray-100 rounded-md hover:bg-blue-950  flex items-center"
              >
                <FaSave className="mr-2" /> Sauvegarder les modifications
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}