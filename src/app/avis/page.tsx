'use client';

import React, { useState } from 'react';
import { FaStar, FaCheck, FaClock, FaTimes, FaEdit, FaTrash } from 'react-icons/fa';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';

const CustomerReviews = () => {
  const [reviews, setReviews] = useState([
    { id: 1, customerName: 'John Doe', review: 'Excellent produit, je le recommande !', rating: 5, product: 'Smartphone X', createdAt: '2023-09-15', status: 'approved' },
    { id: 2, customerName: 'Jane Smith', review: 'Bon rapport qualité-prix.', rating: 4, product: 'Laptop Y', createdAt: '2023-09-14', status: 'pending' },
    { id: 3, customerName: 'Mike Johnson', review: 'Déçu par la qualité.', rating: 2, product: 'Tablette Z', createdAt: '2023-09-13', status: 'rejected' },
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <FaCheck className="text-gray-500" />;
      case 'pending': return <FaClock className="text-gray-500" />;
      case 'rejected': return <FaTimes className="text-gray-500" />;
      default: return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved': return 'Approuvé';
      case 'pending': return 'En attente';
      case 'rejected': return 'Rejeté';
      default: return '';
    }
  };

  return (
    <div className="flex flex-col h-screen w-full">
      <Navbar />
      <div className="flex flex-1 bg-gray-950">
        <Sidebar />
        <div className="flex-1 p-8 ml-60">
          <h1 className="text-3xl font-bold mb-6 text-white">Avis Clients</h1>
          <div className="bg-gray-950 rounded-lg shadow-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-900 text-gray-300 text-left">
                  <th className="p-3">ID</th>
                  <th className="p-3">Client</th>
                  <th className="p-3">Avis</th>
                  <th className="p-3">Note</th>
                  <th className="p-3">Produit</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Statut</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {reviews.map((review) => (
                  <tr key={review.id} className="border-b border-gray-800 text-gray-300">
                    <td className="p-3">{review.id}</td>
                    <td className="p-3">{review.customerName}</td>
                    <td className="p-3">{review.review}</td>
                    <td className="p-3 flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className={i < review.rating ? "text-yellow-500" : "text-gray-500"} />
                      ))}
                      <span className="ml-2">{review.rating}</span>
                    </td>
                    <td className="p-3">{review.product}</td>
                    <td className="p-3">{review.createdAt}</td>
                    <td className="p-3">
                      <span className="flex items-center">
                        {getStatusIcon(review.status)}
                        <span className="ml-2">{getStatusText(review.status)}</span>
                      </span>
                    </td>
                    <td className="p-3">
                      <button className="text-gray-500 hover:text-blue-600 mr-2">
                        <FaEdit />
                      </button>
                      <button className="text-gray-500 hover:text-red-600">
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerReviews;