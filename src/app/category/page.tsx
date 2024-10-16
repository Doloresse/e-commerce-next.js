'use client';

import React, { useState, useMemo } from 'react';
import { FaEdit, FaTrash, FaEye, FaSearch } from 'react-icons/fa';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';

const CategoryTable = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Électronique', slug: 'electronique', description: 'Gadgets et appareils électroniques', productCount: 150, image: '/images/depositphotos_52013277-stock-photo-african-woman-with-shopping-bags.jpg', selected: false },
    { id: 2, name: 'Vêtements', slug: 'vetements', description: 'Mode pour hommes et femmes', productCount: 300, image: '/images/life_perf_rosecharmeuse_10ml_3701429818692_1.webp', selected: false },
    { id: 3, name: 'Maison & Jardin', slug: 'maison-jardin', description: 'Décoration et outils de jardinage', productCount: 200, image: '/images/3081559.png', selected: false },
  ]);

  const [selectAll, setSelectAll] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleEdit = (id: any) => {
    console.log(`Éditer la catégorie ${id}`);
  };

  const handleDelete = (id: any) => {
    console.log(`Supprimer la catégorie ${id}`);
  };

  const handleView = (id: any) => {
    console.log(`Voir les produits de la catégorie ${id}`);
  };

  const toggleSelectAll = () => {
    setSelectAll(!selectAll);
    setCategories(categories.map(cat => ({ ...cat, selected: !selectAll })));
  };

  const toggleSelect = (id: any) => {
    setCategories(categories.map(cat => 
      cat.id === id ? { ...cat, selected: !cat.selected } : cat
    ));
  };

  const handleSearchChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredCategories = useMemo(() => {
    return categories.filter(category =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.slug.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [categories, searchTerm]);

  return (
    <div className="flex flex-col h-screen w-full">
      <Navbar />
      <div className="flex flex-1 bg-gray-950 ml-60">
        <Sidebar />
        <div className="container mx-auto p-6">
          <h1 className="text-3xl font-bold mb-6 text-white mt-10">Catégories de Produits</h1>
          
          {/* Barre de recherche stylisée */}
          <div className="relative w-[250px] max-w-xl mt-8">
            <div className="relative w-50 max-w-xl  mt-1">
                <div className="flex items-center bg-gray-900 bg border border-gray-300 rounded-lg overflow-hidden shadow-sm">

                    <input
                    type="text"
                    placeholder="Rechercher un produit..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="w-full py-2 px-4 text-gray-700 bg-gray-950  focus:outline-none"
                    />
                    <button className="p-2 bg-gray-950 hover:bg-blue-600 transition-colors duration-200">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    </button>
                </div>
            </div>
            </div>

          <div className="overflow-x-auto bg-gray-950 rounded-lg shadow overflow-y-auto relative mt-10">
            <table className="border-collapse table-auto w-full whitespace-no-wrap bg-gray-950 table-striped relative">
              <thead>
                <tr className="text-left">
                  <th className="bg-gray-900 sticky top-0 px-6 py-3 text-gray-600 font-bold tracking-wider uppercase text-xs">
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={toggleSelectAll}
                      className="form-checkbox h-4 w-4 text-blue-600"
                    />
                  </th>
                  <th className="bg-gray-900 sticky top-0 px-6 py-3 text-gray-400 font-bold tracking-wider uppercase text-xs">Image</th>
                  <th className="bg-gray-900 sticky top-0 px-6 py-3 text-gray-400 font-bold tracking-wider uppercase text-xs">Nom</th>
                  <th className="bg-gray-900 sticky top-0 px-6 py-3 text-gray-400 font-bold tracking-wider uppercase text-xs">Description</th>
                  <th className="bg-gray-900 sticky top-0 px-6 py-3 text-gray-400 font-bold tracking-wider uppercase text-xs">Slug</th>
                  <th className="bg-gray-900 sticky top-0 px-6 py-3 text-gray-400 font-bold tracking-wider uppercase text-xs">Produits</th>
                  <th className="bg-gray-900 sticky top-0 px-6 py-3 text-gray-400 font-bold tracking-wider uppercase text-xs">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCategories.map((category) => (
                  <tr key={category.id} className={`${category.selected ? 'bg-blue-100 bg-opacity-20' : ''}`}>
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={category.selected}
                        onChange={() => toggleSelect(category.id)}
                        className="form-checkbox h-4 w-4 text-blue-600"
                      />
                    </td>
                    <td className="px-6 py-2">
                      <img src={category.image} alt={category.name} className="h-10 w-10 object-cover rounded-full" />
                    </td>
                    <td className="px-6 py-2 text-gray-400">{category.name}</td>
                    <td className="px-6 py-2 text-gray-400">{category.description}</td>
                    <td className="px-6 py-2 text-gray-400">{category.slug}</td>
                    <td className="px-6 py-2">
                      <span className="bg-gray-900 text-gray-200 ml-10 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        {category.productCount}
                      </span>
                    </td>
                    <td className="px-6 py-2">
                      <div className="flex items-center space-x-2">
                        <button onClick={() => handleView(category.id)} className="text-gray-300 hover:text-gray-200">
                          <FaEye />
                        </button>
                        <button onClick={() => handleEdit(category.id)} className="text-gray-300 hover:text-gray-200">
                          <FaEdit />
                        </button>
                        <button onClick={() => handleDelete(category.id)} className="text-gray-300 hover:text-gray-200">
                          <FaTrash />
                        </button>
                      </div>
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

export default CategoryTable;