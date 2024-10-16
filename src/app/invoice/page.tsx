"use client";
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { FaPrint, FaEnvelope } from 'react-icons/fa';

const colorNames = {
  '#FF0000': 'Rouge',
  '#00FF00': 'Vert',
  '#0000FF': 'Bleu',
  '#FFFF00': 'Jaune',
  '#FF00FF': 'Magenta',
  '#00FFFF': 'Cyan',
};

interface InvoiceItem {
  product: string;
  quantity: number;
  price: number;
  color: string; 
}

interface InvoiceData {
  basketItems: InvoiceItem[];
  total: number;
  color: string;
}

const Invoice: React.FC = () => {
  const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null);

  useEffect(() => {
    const storedData = localStorage.getItem('invoiceData');
    if (storedData) {
      setInvoiceData(JSON.parse(storedData));
      localStorage.removeItem('invoiceData');
    }
  }, []);

  if (!invoiceData) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-950 text-white">
        Chargement de la facture...
      </div>
    );
  }

  const currentDate = new Date().toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="flex flex-col min-h-screen bg-gray-950">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 p-8">
          <div className="max-w-4xl ml-64 mx-auto bg-gray-950 border border-gray-900 rounded-lg shadow-xl overflow-hidden">
            <div className="px-8 py-6 bg-gray-900 text-white flex justify-between">
              <div className="mt-10">
                <h2 className="text-3xl font-bold">Facture</h2>
                <p className="mt-2">Date: {currentDate}</p>
              </div>
              <img src="/images/Sans titre-1.png" alt="" className="w-[150px]" />
            </div>
            <div className="p-8">
              <div className="mb-8 pb-8 border-b border-gray-900">
                <h3 className="text-2xl font-bold mb-4 text-gray-200">Détails de la commande</h3>
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-gray-200 text-sm uppercase">
                      <th className="py-2">Produit</th>
                      <th className="py-2">Quantité</th>
                      <th className="py-2">Couleur</th>
                      <th className="py-2">Prix unitaire</th>
                      <th className="py-2">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoiceData.basketItems.map((item, index) => (
                      <tr key={index} className="border-b border-gray-900 text-gray-200">
                        <td className="py-4">{item.product}</td>
                        <td className="py-4">{item.quantity}</td>
                        <td className="py-4">{item.color}</td>
                        <td className="py-4">{item.price ? Number(item.price).toFixed(2) : '0.00'} F</td>
                        <td className="py-4">{(item.quantity * item.price).toFixed(2)} F</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-end">
                <div className="text-right">
                  <p className="text-xl text-white font-bold">
                    Total: {invoiceData.total.toFixed(2)} F
                  </p>
                </div>
              </div>
              <div className="mt-8 flex justify-end space-x-4">
                <button
                  onClick={() => window.print()}
                  className="flex items-center px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800 transition"
                >
                  <FaPrint className="mr-2" />
                  Imprimer
                </button>
                <button
                  onClick={() => alert('Facture envoyée')}
                  className="flex items-center px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition"
                >
                  <FaEnvelope className="mr-2" />
                  Envoyer par email
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
