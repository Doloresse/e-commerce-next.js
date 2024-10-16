'use client';
import React, { useState, useEffect } from 'react';
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { motion } from "framer-motion";
import { FaSearch, FaFilter, FaEye, FaEdit, FaTrash, FaClock } from "react-icons/fa";

// Simulons des données de commandes en attente
const pendingOrdersData = Array.from({ length: 10 }, (_, i) => ({
  id: `ORD-${1000 + i}`,
  customerName: `Client ${i + 1}`,
  date: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toLocaleDateString(),
  total: (Math.random() * 500 + 50).toFixed(2),
  status: "En attente de paiement",
  items: Math.floor(Math.random() * 5) + 1
}));

export default function PendingOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date");

  useEffect(() => {
    // Simuler un chargement de données
    setTimeout(() => {
      setOrders(pendingOrdersData);
    }, 1000);
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filtered = pendingOrdersData.filter(order => 
      order.customerName.toLowerCase().includes(e.target.value.toLowerCase()) ||
      order.id.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setOrders(filtered);
  };

  const handleSort = (e) => {
    setSortBy(e.target.value);
    const sorted = [...orders].sort((a, b) => {
      if (e.target.value === "total") {
        return parseFloat(b.total) - parseFloat(a.total);
      }
      return new Date(b.date) - new Date(a.date);
    });
    setOrders(sorted);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-950">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 p-6 ml-60 overflow-auto">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold mb-10 mt-20 text-white flex items-center"
          >
            <FaClock className="mr-4 text-gray-500" /> Commandes en attente
          </motion.h1>

          <div className="flex justify-between items-center mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher une commande..."
                className="pl-10 pr-4 px-8 py-2 border border-gray-900 rounded-lg bg-gray-950 text-white focus:outline-none focus:ring-2 focus:ring-white"
                value={searchTerm}
                onChange={handleSearch}
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <div className="flex items-center space-x-4">
              <select
                className="bg-gray-950 text-white border border-gray-900 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white"
                value={sortBy}
                onChange={handleSort}
              >
                <option value="date">Trier par date</option>
                <option value="total">Trier par montant</option>
              </select>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gray-950 border border-gray-900 rounded-lg shadow-lg overflow-hidden"
          >
            <table className="min-w-full divide-y divide-gray-900">
              <thead className="bg-gray-900">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Client</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Total</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Articles</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Statut</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-gray-950 divide-y divide-gray-900">
                {orders.map((order) => (
                  <tr key={order.id} className="">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{order.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{order.customerName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{order.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{order.total} €</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{order.items}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-900 text-gray-200">
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-gray-300 hover:text-blue-300 mr-3" title="Voir les détails">
                        <FaEye />
                      </button>
                      <button className="text-gray-300 hover:text-green-300 mr-3" title="Modifier">
                        <FaEdit />
                      </button>
                      <button className="text-gray-300 hover:text-red-300" title="Supprimer">
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </div>
    </div>
  );
}