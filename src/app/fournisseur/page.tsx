// src/pages/suppliers-management.tsx
'use client';
import React, { useState } from 'react';
import { FaEdit, FaTrashAlt, FaPlus, FaCheck } from "react-icons/fa";
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';

interface Product {
  name: string;
  category: string;
  unitPrice: number;
}

interface Supplier {
  id: number;
  name: string;
  contact: string;
  products: Product[];
}

const initialSuppliers: Supplier[] = [
  { 
    id: 1, 
    name: 'Fournisseur A', 
    contact: 'contact@fournisseurA.com', 
    products: [
      { name: 'Produit A', category: 'Électronique', unitPrice: 100 },
      { name: 'Produit B', category: 'Vêtements', unitPrice: 50 }
    ]
  },
  { 
    id: 2, 
    name: 'Fournisseur B', 
    contact: 'contact@fournisseurB.com', 
    products: [
      { name: 'Produit C', category: 'Alimentation', unitPrice: 25 }
    ]
  },
];

const SuppliersManagement: React.FC = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>(initialSuppliers);
  const [isAdding, setIsAdding] = useState(false);
  const [newSupplier, setNewSupplier] = useState<Supplier>({
    id: 0,
    name: '',
    contact: '',
    products: [{ name: '', category: '', unitPrice: 0 }]
  });

  const handleAddClick = () => {
    setIsAdding(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewSupplier(prev => ({ ...prev, [name]: value }));
  };

  const handleProductChange = (index: number, field: keyof Product, value: string) => {
    setNewSupplier(prev => {
      const updatedProducts = [...prev.products];
      updatedProducts[index] = { 
        ...updatedProducts[index], 
        [field]: field === 'unitPrice' ? parseFloat(value) || 0 : value 
      };
      return { ...prev, products: updatedProducts };
    });
  };

  const addProductField = () => {
    setNewSupplier(prev => ({
      ...prev,
      products: [...prev.products, { name: '', category: '', unitPrice: 0 }]
    }));
  };

  const handleAddSupplier = () => {
    if (newSupplier.name && newSupplier.contact && newSupplier.products.some(p => p.name)) {
      setSuppliers(prev => [...prev, { ...newSupplier, id: prev.length + 1 }]);
      setIsAdding(false);
      setNewSupplier({
        id: 0,
        name: '',
        contact: '',
        products: [{ name: '', category: '', unitPrice: 0 }]
      });
    } else {
      alert("Veuillez remplir au moins le nom, le contact et un produit du fournisseur");
    }
  };

  const handleDeleteSupplier = (id: number) => {
    setSuppliers(suppliers.filter(s => s.id !== id));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-950">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <div className="bg-gray-950 w-full container mx-auto mt-10 p-5 ml-60">
          <h1 className="text-3xl text-white font-bold mb-5">Gestion des Fournisseurs</h1>

          <div className="mb-5">
            <button onClick={handleAddClick} className="bg-blue-950 text-white rounded px-3 py-1 hover:bg-blue-900 transition duration-200">
              <FaPlus className="inline mr-2" />
              Ajouter un fournisseur
            </button>
          </div>

          <div className='overflow-x-auto bg-gray-950 rounded-lg shadow-md mt-20'>
            <table className="min-w-full bg-gray-950 text-gray-200">
              <thead>
                <tr className="bg-gray-900 text-white font-bold text-xl">
                  <th className="py-3 px-4 border-b text-center border-gray-900">Nom</th>
                  <th className="py-3 px-4 border-b text-center border-gray-900">Contact</th>
                  {/* <th className="py-3 px-4 border-b text-center border-gray-900">Produits Fournis</th> */}
                  <th className="py-3 px-4 border-b text-center border-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {suppliers.map(supplier => (
                  <tr key={supplier.id} className="text-gray-400">
                    <td className="py-2 px-4 text-center border-b border-gray-900">{supplier.name}</td>
                    <td className="py-2 px-4 text-center border-b border-gray-900">{supplier.contact}</td>
                    {/* <td className="py-2 px-4 text-center border-b border-gray-900">
                      {supplier.products.map((product, index) => (
                        <div key={index}>
                          {product.name} ({product.category}) - {product.unitPrice}€
                        </div>
                      ))}
                    </td> */}
                    <td className="py-2 px-4 border-b border-gray-900 text-center">
                      <button className="text-gray-300 hover:text-gray-400 transition duration-200">
                        <FaEdit />
                      </button>
                      <button onClick={() => handleDeleteSupplier(supplier.id)} className="ml-2 text-gray-300 hover:text-gray-400 transition duration-200">
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))}
                {isAdding && (
                  <tr className="text-gray-400">
                    <td className="py-2 px-4 border-b border-gray-900 text-center">
                      <input
                        type="text"
                        name="name"
                        value={newSupplier.name}
                        onChange={handleInputChange}
                        placeholder="Nom du fournisseur"
                        className="bg-gray-800 text-white px-2 py-1 rounded w-full"
                      />
                    </td>
                    <td className="py-2 px-4 border-b border-gray-900 text-center">
                      <input
                        type="text"
                        name="contact"
                        value={newSupplier.contact}
                        onChange={handleInputChange}
                        placeholder="Contact"
                        className="bg-gray-800 text-white px-2 py-1 rounded w-full"
                      />
                    </td>
                    {/* <td className="py-2 px-4 border-b border-gray-900 text-center">
                      {newSupplier.products.map((product, index) => (
                        <div key={index} className="mb-2">
                          <input
                            type="text"
                            value={product.name}
                            onChange={(e) => handleProductChange(index, 'name', e.target.value)}
                            placeholder="Nom du produit"
                            className="bg-gray-800 text-white px-2 py-1 rounded w-full mb-1"
                          />
                          <input
                            type="text"
                            value={product.category}
                            onChange={(e) => handleProductChange(index, 'category', e.target.value)}
                            placeholder="Catégorie"
                            className="bg-gray-800 text-white px-2 py-1 rounded w-full mb-1"
                          />
                          <input
                            type="number"
                            value={product.unitPrice}
                            onChange={(e) => handleProductChange(index, 'unitPrice', e.target.value)}
                            placeholder="Prix unitaire"
                            className="bg-gray-800 text-white px-2 py-1 rounded w-full"
                          />
                        </div>
                      ))}
                      <button onClick={addProductField} className="bg-gray-700 text-white rounded px-2 py-1 mt-2">
                        + Ajouter un produit
                      </button>
                    </td> */}
                    <td className="py-2 px-4 border-b border-gray-900 text-center">
                      <button onClick={handleAddSupplier} className="text-green-500 hover:text-green-600 transition duration-200">
                        <FaCheck />
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>    
        </div>
      </div>
    </div>        
  );
};

export default SuppliersManagement;