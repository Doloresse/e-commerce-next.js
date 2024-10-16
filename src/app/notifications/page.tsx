'use client';

import React, { useState } from 'react';
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { FaBell, FaShoppingCart, FaUser, FaExclamationTriangle, FaCheckCircle, FaInfoCircle, FaTrashAlt, FaEye } from 'react-icons/fa';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'order', message: 'Nouvelle commande #1234 reçue', date: '2023-09-26 10:30', read: false },
    { id: 2, type: 'stock', message: 'Stock faible pour "Produit Book"', date: '2023-09-25 15:45', read: false },
    { id: 3, type: 'user', message: 'Nouveau client inscrit : John Doe', date: '2023-09-24 09:15', read: true },
    { id: 4, type: 'system', message: 'Mise à jour du système disponible', date: '2023-09-23 18:00', read: true },
    { id: 5, type: 'order', message: 'Commande #1233 expédiée', date: '2023-09-22 11:20', read: true },
  ]);

  const getIcon = (type: string) => {
    switch(type) {
      case 'order': return <FaShoppingCart className="text-gray-500" />;
      case 'stock': return <FaExclamationTriangle className="text-gray-500" />;
      case 'user': return <FaUser className="text-gray-500" />;
      case 'system': return <FaInfoCircle className="text-gray-500" />;
      default: return <FaBell className="text-gray-500" />;
    }
  };

  const getNotificationStyle = (type: string, read: boolean, index: number) => {
    let baseStyle = "flex items-center p-4 border-b border-gray-800 ";
    
    if (index < 2) {
      return baseStyle + "bg-gray-900";
    }
    
    if (!read) {
      baseStyle += "bg-opacity-20 ";
    }
    switch(type) {
      case 'order': return baseStyle + (read ? "bg-gray-950" : "bg-gray-950");
      case 'stock': return baseStyle + (read ? "bg-gray-200" : "bg-gray-950");
      case 'user': return baseStyle + (read ? "bg-gray-950" : "bg-gray-950");
      case 'system': return baseStyle + (read ? "bg-gray-950" : "bg-gray-950");
      default: return baseStyle + (read ? "bg-gray-50" : "bg-gray-100");
    }
  };

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8 ml-64 bg-gray-950">
          <h1 className="text-3xl text-white font-bold mb-8 flex items-center">
            <FaBell className="mr-4 text-gray-300" /> Notifications
          </h1>
          <div className="border bg-gray-950 border-gray-900 rounded-lg overflow-hidden">
            {notifications.length > 0 ? (
              notifications.map((notif, index) => (
                <div key={notif.id} className={getNotificationStyle(notif.type, notif.read, index)}>
                  <div className="flex-shrink-0 mr-4">
                    {getIcon(notif.type)}
                  </div>
                  <div className="flex-grow">
                    <p className={`text-sm ${notif.read ? 'text-gray-100' : 'text-gray-300 font-bold'}`}>{notif.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{notif.date}</p>
                  </div>
                  <div className="flex-shrink-0 ml-4 flex items-center">
                    {!notif.read && (
                      <button 
                        onClick={() => markAsRead(notif.id)}
                        className="text-gray-600 hover:text-gray-500 mr-3"
                        title="Marquer comme lu"
                      >
                        <FaEye size={18} />
                      </button>
                    )}
                    <button 
                      onClick={() => deleteNotification(notif.id)}
                      className="text-gray-600 hover:text-gray-500"
                      title="Supprimer"
                    >
                      <FaTrashAlt size={18} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-gray-500">
                Aucune notification pour le moment.
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}