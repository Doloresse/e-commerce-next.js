'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { FaUpload } from 'react-icons/fa';

const CreateCategory = () => {
  const [category, setCategory] = useState({
    name: '',
    slug: '',
    parentCategory: '',
    type: '',
    description: '',
  });
  const [image, setImage] = useState(null);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setCategory(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(category);
    console.log(image);
  };

  return (
    <div className="flex flex-col h-screen w-full">
      <Navbar />
      <div className="flex flex-1 bg-gray-950">
        <Sidebar />
        <div className="flex-1 p-8 ml-60">
          <h1 className="text-3xl font-bold mb-6 text-white">Ajouter une nouvelle catégorie</h1>
          <div className="bg-gray-950 rounded-lg shadow-lg p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-300">Nom de la catégorie</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={category.name}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-900 rounded-lg bg-gray-950 text-white focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="slug" className="block mb-2 text-sm font-medium text-gray-300">Slug</label>
                  <input
                    type="text"
                    id="slug"
                    name="slug"
                    value={category.slug}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-900 rounded-lg bg-gray-950 text-white focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="parentCategory" className="block mb-2 text-sm font-medium text-gray-300">Catégorie parente</label>
                  <select
                    id="parentCategory"
                    name="parentCategory"
                    value={category.parentCategory}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-900 rounded-lg bg-gray-950 text-gray-500 focus:ring-2 focus:ring-gray-800"
                  >
                    <option value="">Sélectionner une catégorie parente</option>
                    <option value="electronics">Électronique</option>
                    <option value="clothing">Vêtements</option>
                    <option value="home">Maison</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="type" className="block mb-2 text-sm font-medium text-gray-300">Type</label>
                  <input
                    type="text"
                    id="type"
                    name="type"
                    value={category.type}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-900 rounded-lg bg-gray-950 text-white focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className='parent-container flex space-x-7'>
                <div className='flex-1 flex flex-col h-full'>
                  <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-300">Description</label>
                  <textarea
                    id="description"
                    name="description"
                    value={category.description}
                    onChange={handleChange}
                    rows="4"
                    className="w-full p-2 border border-gray-900 rounded-lg bg-gray-950 text-white focus:ring-2 focus:ring-blue-500 h-full"
                  ></textarea>
                </div>
                <div className='flex-1 flex flex-col h-full'>
                  <label className="block mb-2 text-sm font-medium text-gray-300">Image de la catégorie</label>
                  <div className="flex items-center justify-center w-full flex-1">
                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-950 ">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <FaUpload className="w-10 h-10 mb-3 text-gray-400" />
                        <p className="mb-2 text-sm text-gray-400"><span className="font-semibold">Cliquez pour uploader</span> ou glissez et déposez</p>
                        <p className="text-xs text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                      </div>
                      <input id="dropzone-file" type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
                    </label>
                  </div>
                  {image && (
                    <div className="mt-4">
                      <img src={URL.createObjectURL(image)} alt="Aperçu" className="max-w-xs rounded-lg shadow-lg" />
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <button type="button" className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600">
                  Enregistrer comme brouillon
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-950 text-white rounded hover:bg-blue-900">
                  Créer la catégorie
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCategory;