// // src/components/Navbar.tsx
// import ThemeToggle from './ThemeToggle';

// const Navbar = () => {
//   return (
//     <nav className="flex justify-between p-4 bg-gray-900 text-white">
//       <h1>Mon Application</h1>
//       <ThemeToggle />
//     </nav>
//   );
// };

// export default Navbar;


'use client';
import React, { useState } from 'react';
import { FaBell, FaEnvelope, FaCog, FaUserPlus, FaStore, FaSearch } from 'react-icons/fa';
import { MdSearch } from 'react-icons/md';

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Simuler des notifications et des messages non lus
  const [notificationCount, setNotificationCount] = useState(3);
  const [messageCount, setMessageCount] = useState(5);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="flex items-center justify-between bg-gray-950 p-4 ml-60">
      <div className="flex ml-60 mt-8 w-full">
        <div className="relative w-full ml-60">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Rechercher..."
              className="w-full p-2 pl-12 pr-12 bg-gray-950 text-white placeholder-gray-400 border-2 border-gray-900 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition duration-300 ease-in-out shadow-lg hover:shadow-xl"
            />
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 transition duration-300 group-hover:text-blue-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 transition duration-300 group-hover:text-blue-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </span>
          </div>
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1/3 h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-full blur-sm"></div>
        </div>
      </div>

      <div className="flex space-x-4 ml-20 mt-8 bg-gray-950">
        <a href="/notifications" className="relative px-2 py-1 rounded-lg bg-gray-800 text-white hover:text-orange-400">
          <FaBell size={20} />
          {notificationCount > 0 && (
            <span className="absolute top-0 right-0 -mt-1 -mr-1 px-1.5 py-0.5 bg-red-500 text-white text-xs rounded-full">
              {notificationCount}
            </span>
          )}
        </a>
        <a href="/messages" className="relative px-2 py-1 rounded-lg bg-gray-800 text-white hover:text-pink-300">
          <FaEnvelope size={20} />
          {messageCount > 0 && (
            <span className="absolute top-0 right-0 -mt-1 -mr-1 px-1.5 py-0.5 bg-blue-500 text-white text-xs rounded-full">
              {messageCount}
            </span>
          )}
        </a>
        <a href="/settings" className="px-2 py-1 rounded-lg bg-gray-800 text-white hover:text-yellow-300">
          <FaCog size={20} />
        </a>
        <a href="/signup" className="px-2 py-1 rounded-lg bg-gray-800 text-white hover:text-green-300">
          <FaUserPlus size={20} />
        </a>
        <a href="/profile" className="flex items-center">
          <img
            src="/avatars/femme.png"
            alt="Profil"
            className="w-8 h-8 rounded-full bg-white"
          />
        </a>
      </div>
    </div>
  );
};

export default Navbar;
