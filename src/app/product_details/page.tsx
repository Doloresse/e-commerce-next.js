'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { FaStar } from 'react-icons/fa';
import { useProducts } from '../../contexts/ProductContext';
import { useSearchParams } from 'next/navigation';
import { useBasket } from '@/contexts/BasketContext';

const colorNames = {
  '#FF0000': 'Rouge',
  '#00FF00': 'Vert',
  '#0000FF': 'Bleu',
  '#FFFF00': 'Jaune',
  '#FF00FF': 'Magenta',
  '#00FFFF': 'Cyan',
};

const ProductDetails: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { products } = useProducts();
  const { addToBasket } = useBasket(); 

  const [product, setProduct] = useState<any>(null);
  const productId = Number(searchParams.get('id'));
  const [size, setSize] = useState('M'); 
  const [color, setColor] = useState('#FF0000'); 
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (productId) {
      const foundProduct = products.find(p => p.id === productId);
      setProduct(foundProduct || null);
    }
  }, [productId, products]);

  const handleAddToBasket = () => {
    if (product) {
        const basketItem = {
            product: product.name,
            price: product.price,
            size,
            color,
            quantity,
        };
        addToBasket(basketItem);
        alert('Produit ajouté au panier !');
        router.push('/basket'); 
    }
};

  if (!product) {
    return <div className="text-white">Produit non trouvé</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-950">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <div className="bg-gray-950 ml-60 min-h-screen p-8">
          <h1 className="text-4xl font-bold text-white">{product.name}</h1>
          <img src={product.images[0]} alt={product.name} className="mt-4 h-48 w-full object-cover" />
          <p className="mt-4 text-gray-300">{product.description}</p>
          <p className="mt-4 text-gray-300">Prix: {product.price}€</p>
          <div className="mt-4 flex items-center">
            <span className="text-gray-600 mr-2">Note :</span>
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className={i < product.rating ? "text-yellow-400" : "text-gray-400"} />
            ))}
          </div>

          <div className="mt-10 bg-gray-950  rounded-lg">
            <h2 className="text-2xl font-bold text-white mb-4">Commander</h2>
            <div className="mb-4">
              <label className="text-gray-300">Taille:</label>
              <select
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="bg-gray-950 text-white border border-gray-900 rounded-lg mx-2"
              >
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="text-gray-300">Couleur:</label>
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="ml-2"
              />
              <span className="text-white ml-2">{colorNames[color] || color}</span>
            </div>
            <div className="mb-4">
              <label className="text-gray-300">Quantité:</label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="bg-gray-950 text-white border border-gray-900 rounded-lg mx-2 w-16"
              />
            </div>
            <button
              onClick={handleAddToBasket}
              className="mt-4 w-full bg-gray-900 text-white p-2 rounded hover:bg-gray-800 transition"
            >
              Ajouter au panier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
