"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { FaUpload, FaPlus } from "react-icons/fa"; 
import { useProducts } from "../../contexts/ProductContext";

const CreateProduct = () => {
  const { addProduct } = useProducts();
  const router = useRouter();
  
  const [product, setProduct] = useState({
    name: "",
    size: "",
    color: "",
    category: "",
    price: "",
    description: "",
    images: [] as string[],
  });

  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImage(e.target.files ? e.target.files[0] : null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!product.name || !product.size || !product.color || !product.category || !product.description) {
        setError("Veuillez remplir tous les champs obligatoires.");
        return;
      }

      const newProduct = {
        id: Date.now(),
        ...product,
        images: image ? [URL.createObjectURL(image)] : [],
      };

      await addProduct(newProduct);
      router.push("/boutique"); 
    } catch (error) {
      console.error("Erreur lors de la création du produit :", error);
      setError("Une erreur est survenue lors de la création du produit.");
    }
  };

  const handleAddAnotherProduct = () => {
    setProduct({
      name: "",
      size: "",
      color: "",
      category: "",
      price: "",
      description: "",
      images: [],
    });
    setImage(null); 
  };

  return (
    <div className="flex flex-col h-screen w-full">
      <Navbar />
      <div className="flex flex-1 bg-gray-950">
        <Sidebar />
        <div className="flex-1 p-8 ml-60">
          <h1 className="text-3xl font-bold mb-6 text-white">Créer un nouveau produit</h1>
          <div className="bg-gray-950 rounded-lg shadow-lg p-7">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-7">
                <div>
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-300">Nom du produit</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={product.name}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-900 rounded-lg bg-gray-950 text-white"
                  />
                </div>
                <div>
                  <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-300">Prix</label>
                  <input 
                    type="number" 
                    id="price" 
                    name="price"
                    value={product.price} 
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-900 rounded-lg bg-gray-950 text-gray-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-300">Catégorie</label>
                  <select
                    id="category"
                    name="category"
                    value={product.category}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-900 rounded-lg bg-gray-950 text-gray-500"
                  >
                    <option value="">Sélectionner une catégorie</option>
                    <option value="electronics">Électronique</option>
                    <option value="clothing">Vêtements</option>
                    <option value="home">Maison</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="size" className="block mb-2 text-sm font-medium text-gray-300">Taille</label>
                  <select
                    id="size"
                    name="size"
                    value={product.size}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-900 rounded-lg bg-gray-950 text-gray-500"
                  >
                    <option value="">Sélectionner une taille</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="color" className="block mb-2 text-sm font-medium text-gray-300">Couleur</label>
                  <input
                    type="text"
                    id="color"
                    name="color"
                    value={product.color}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-900 rounded-lg bg-gray-950 text-white"
                  />
                </div>
              </div>  
              <div className="flex space-x-7">
                <div className="flex-1">
                  <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-300">Description</label>
                  <textarea
                    id="description"
                    name="description"
                    value={product.description}
                    onChange={handleChange}
                    rows={4}
                    className="w-full h-48 p-2 border border-gray-900 rounded-lg bg-gray-950 text-white"
                  ></textarea>
                </div>
                <div className="flex-1 relative">
                  <label className="block mb-2 text-sm font-medium text-gray-300">Image du produit</label>
                  <div className="relative w-full h-48 border-2 border-gray-300 border-dashed rounded-lg bg-gray-950">
                    {image ? (
                      <img
                        src={URL.createObjectURL(image)}
                        alt="Aperçu"
                        className="absolute inset-0 w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <label
                        htmlFor="dropzone-file"
                        className="flex flex-col items-center justify-center h-full cursor-pointer"
                      >
                        <FaUpload className="w-10 h-10 mb-3 text-gray-400" />
                        <p className="mb-2 text-sm text-gray-400">
                          <span className="font-semibold">Cliquez pour uploader</span> ou glissez et déposez
                        </p>
                        <p className="text-xs text-gray-400">SVG, PNG, JPG ou GIF (MAX. 800x400px)</p>
                        <input
                          id="dropzone-file"
                          type="file"
                          className="hidden"
                          onChange={handleImageChange}
                          accept="image/*"
                        />
                      </label>
                    )}
                  </div>
                 
                  <button
                    onClick={handleAddAnotherProduct}
                    className="absolute bottom-2 right-2 p-1 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition"
                    title="Ajouter un autre produit"
                  >
                    <FaPlus className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <button
                  type="submit"
                  className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
                >
                  Créer le produit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
