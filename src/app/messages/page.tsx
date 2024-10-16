'use client';

import React, { useState } from 'react';
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { FaEnvelope, FaUserCircle, FaTrashAlt, FaEye } from 'react-icons/fa';

export default function MessagesPage() {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'John Doe', content: 'Bonjour, j\'ai une question sur le produit X.', date: '2023-09-26 10:30', read: false },
    { id: 2, sender: 'Jane Smith', content: 'Quand est-ce que vous recevrez le produit Y en stock ?', date: '2023-09-25 15:45', read: false },
    { id: 3, sender: 'Bob Johnson', content: 'Je souhaiterais annuler ma commande #1234.', date: '2023-09-24 09:15', read: true },
    { id: 4, sender: 'Alice Williams', content: 'Merci pour votre excellent service client !', date: '2023-09-23 18:00', read: true },
  ]);

  const markAsRead = (id: number) => {
    setMessages(messages.map(msg => 
      msg.id === id ? { ...msg, read: true } : msg
    ));
  };

  const deleteMessage = (id: number) => {
    setMessages(messages.filter(msg => msg.id !== id));
  };

  const getMessageStyle = (read: boolean, index: number) => {
    let baseStyle = "flex items-center p-4 border-b border-gray-800 ";
    
    if (index < 2) {
      return baseStyle + "bg-gray-900";
    }
    
    return baseStyle + (read ? "bg-gray-950" : "bg-gray-200");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-950">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8 ml-64">
          <h1 className="text-3xl text-white font-bold mb-8 flex items-center">
            <FaEnvelope className="mr-4 text-gray-300" /> Messages
          </h1>
          <div className="bg-gray-950 shadow rounded-lg overflow-hidden">
            {messages.length > 0 ? (
              messages.map((msg, index) => (
                <div key={msg.id} className={getMessageStyle(msg.read, index)}>
                  <div className="flex-shrink-0 mr-4">
                    <FaUserCircle className="text-gray-400 w-10 h-10" />
                  </div>
                  <div className="flex-grow">
                    <p className={`text-sm ${msg.read ? 'text-white font-bold' : 'text-gray-900 font-bold'}`}>{msg.sender}</p>
                    <p className={`text-sm ${msg.read ? 'text-gray-300' : 'text-gray-100'}`}>{msg.content}</p>
                    <p className="text-xs text-gray-500 mt-1">{msg.date}</p>
                  </div>
                  <div className="flex-shrink-0 ml-4 flex items-center">
                    {!msg.read && (
                      <button 
                        onClick={() => markAsRead(msg.id)}
                        className="text-gray-600 hover:text-gray-500 mr-3"
                        title="Marquer comme lu"
                      >
                        <FaEye size={18} />
                      </button>
                    )}
                    <button 
                      onClick={() => deleteMessage(msg.id)}
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
                Aucun message pour le moment.
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}