'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import Image from 'next/image';
import { FaWarehouse, FaStore, FaCheckCircle, FaExclamationCircle, FaTimesCircle } from 'react-icons/fa'; // Import des icônes
import { useProducts } from '@/contexts/ProductContext';

const ProductStatusPage: React.FC = () => {
  const { products } = useProducts();

  return (
    <div className="flex flex-col min-h-screen bg-gray-950 text-white">
      <Navbar />

      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 p-8 ml-60">
          <h1 className="text-4xl font-bold mb-6 text-white">Suivi des Produits</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-gray-950 border border-gray-900 rounded-lg shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <img
                    src={product.images}
                    alt={product.name}
                    className="h-16 w-16 rounded-full mr-4 border border-gray-900"
                  />
                  <div>
                    <h2 className="text-xl font-semibold">{product.name}</h2>
                    <p className="text-gray-400">{product.category}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-gray-400">
                      <FaWarehouse className="mr-2" />
                      <span>Quantité en stock :</span>
                    </div>
                    <span className="font-bold text-lg">{product.currentStock}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-gray-400">
                      <FaStore className="mr-2" />
                      <span>Quantité en boutique :</span>
                    </div>
                    <span className="font-bold text-lg">{product.boutiqueStock}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="flex items-center text-gray-400">
                      Statut du produit :
                    </span>
                    {product.currentStock <= 0 ? (
                      <span className="flex items-center text-red-500">
                        <FaTimesCircle className="mr-2" /> Rupture de stock
                      </span>
                    ) : product.currentStock < product.minStock ? (
                      <span className="flex items-center text-yellow-500">
                        <FaExclamationCircle className="mr-2" /> Stock faible
                      </span>
                    ) : (
                      <span className="flex items-center text-yellow-500">
                        <FaCheckCircle className="mr-2" /> En stock
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    className="w-full py-2 px-4 bg-gray-900 text-white rounded hover:bg-gray-800 transition"
                    onClick={() => alert(`Gérer le produit: ${product.name}`)}
                  >
                    Gérer le produit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductStatusPage;
