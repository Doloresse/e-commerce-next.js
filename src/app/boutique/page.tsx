'use client';

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaSearch, FaPlus } from "react-icons/fa";
import { useProducts, Product } from '../../contexts/ProductContext';
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProductsPage() {
  const { products } = useProducts();
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const router = useRouter();

  useEffect(() => {
    setDisplayedProducts(products);
  }, [products]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    const filtered = products.filter(product => 
      product.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setDisplayedProducts(filtered);
  };

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
    const sorted = [...displayedProducts].sort((a, b) => {
      if (e.target.value === "price") {
        return a.price - b.price;
      }
      return a.name.localeCompare(b.name);
    });
    setDisplayedProducts(sorted);
  };

  const handleViewProduct = (productId: number) => {
    router.push(`/product_details?id=${productId}`);
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
            className="text-3xl font-bold mb-10 mt-20 text-white ml-4"
          >
            Produits
          </motion.h1>

          <div className="flex justify-between items-center ml-4 mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher un produit..."
                className="pl-10 pr-4 py-2 rounded-lg bg-gray-950 border-gray-900 border text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={handleSearch}
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <div className="flex items-center space-x-4">
              <select
                className="bg-gray-950 text-gray-400 rounded-lg border border-gray-900 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={sortBy}
                onChange={handleSort}
              >
                <option value="name">Trier par nom</option>
                <option value="price">Trier par prix</option>
              </select>
              <Link href="/create_products">
                <button className="bg-blue-950 hover:bg-blue-900 text-white px-4 py-2 rounded-lg flex items-center transition duration-300">
                  <FaPlus className="mr-2" /> Ajouter un produit
                </button>
              </Link>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ml-4 mt-20"
          >
            {displayedProducts.map((product) => (
              <motion.div
                key={product.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gray-950 border border-gray-800 rounded-lg shadow-lg overflow-hidden transition duration-300 hover:shadow-2xl"
              >
                <div onClick={() => handleViewProduct(product.id)} className="cursor-pointer">
                  <Image 
                    src={product.images[0]} 
                    alt={product.name} 
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-white">{product.name}</h3>
                  <p className="text-sm text-gray-300 mb-4">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-white">{product.price}€</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}


// 'use client';
// import { useState, useEffect } from "react";
// import Navbar from "@/components/Navbar";
// import Sidebar from "@/components/Sidebar";
// import { motion } from "framer-motion";
// import Image from "next/image";
// import { FaSearch, FaFilter, FaPlus, FaEdit, FaTrash, FaStar } from "react-icons/fa";

// // Simulons des données de produits
// const productData = Array.from({ length: 12 }, (_, i) => ({
//   id: i + 1,
//   name: `Produit ${i + 1}`,
//   description: "Description rapide du produit ici...",
//   price: Math.floor(Math.random() * 100) + 50,
//   discountPrice: Math.floor(Math.random() * 50) + 30,
//   rating: (Math.random() * 2 + 3).toFixed(1),
//   images: [
//     `/images/jeune-fille-brune-beret-rouge-rit-assis-chaise-dossier-dans-ses-mains-dame-rouge-levres-posant-fond-rose-support-robes-brillantes_197531-17618.jpg`, // Remplacez par vos propres images
//     `/images/life_perf_rosecharmeuse_10ml_3701429818692_1.webp`,
//     `/images/3081559.png`,
//     `/images/depositphotos_52013277-stock-photo-african-woman-with-shopping-bags.jpg`,
//     `/images/depositphotos_502375418-stock-photo-happy-black-female-standing-near.jpg`,
//     `/images/jeune-fille-brune-beret-rouge-rit-assis-chaise-dossier-dans-ses-mains-dame-rouge-levres-posant-fond-rose-support-robes-brillantes_197531-17618.jpg`,
//     `/images/depositphotos_52013277-stock-photo-african-woman-with-shopping-bags.jpg`,
//     `/images/life_perf_rosecharmeuse_10ml_3701429818692_1.webp`,
//     `/images/Captur.PNG`,
//     `/images/3081559.png`,
//     `/images/depositphotos_502375418-stock-photo-happy-black-female-standing-near.jpg`,
//     `/images/life_perf_rosecharmeuse_10ml_3701429818692_1.webp`,
//   ],
// }));

// export default function ProductsPage() {
//   const [products, setProducts] = useState(productData);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [sortBy, setSortBy] = useState("name");
//   const [isAddModalOpen, setIsAddModalOpen] = useState(false);

//   useEffect(() => {
//     // Simuler un chargement de données
//     const timer = setTimeout(() => {
//       setProducts(productData);
//     }, 1000);

//     return () => clearTimeout(timer);
//   }, []);

//   const handleSearch = (e: any) => {
//     setSearchTerm(e.target.value);
//     const filtered = productData.filter(product => 
//       product.name.toLowerCase().includes(e.target.value.toLowerCase())
//     );
//     setProducts(filtered);
//   };

//   const handleSort = (e: any) => {
//     setSortBy(e.target.value);
//     const sorted = [...products].sort((a, b) => {
//       if (e.target.value === "price") {
//         return a.price - b.price;
//       }
//       return a.name.localeCompare(b.name);
//     });
//     setProducts(sorted);
//   };

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-950">
//       <Navbar />
//       <div className="flex flex-1">
//         <Sidebar />
//         <div className="flex-1 p-6 ml-60 overflow-auto">
//           <motion.h1 
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="text-3xl font-bold mb-10 mt-20 text-white ml-4"
//           >
//             Produits
//           </motion.h1>

//           <div className="flex justify-between items-center ml-4 mb-6">
//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="Rechercher un produit..."
//                 className="pl-10 pr-4 py-2 rounded-lg bg-gray-950 border-gray-900 border text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 value={searchTerm}
//                 onChange={handleSearch}
//               />
//               <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//             </div>
//             <div className="flex items-center space-x-4">
//               <select
//                 className="bg-gray-950 text-gray-400 rounded-lg border border-gray-900 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 value={sortBy}
//                 onChange={handleSort}
//               >
//                 <option value="name">Trier par nom</option>
//                 <option value="price">Trier par prix</option>
//               </select>
//               <button
//                 onClick={() => setIsAddModalOpen(true)}
//                 className="bg-blue-950 hover:bg-blue-900 text-white px-4 py-2 rounded-lg flex items-center transition duration-300"
//               >
//                 <FaPlus className="mr-2" /> Ajouter un produit
//               </button>
//             </div>
//           </div>

//           <motion.div 
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//             className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ml-4 mt-20"
//           >
//             {products.map((product) => (
//               <motion.div
//                 key={product.id}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="bg-gray-950 border border-gray-800 rounded-lg shadow-lg overflow-hidden transition duration-300 hover:shadow-2xl"
//               >
//                 <img 
//                   src={product.images[Math.floor(Math.random() * product.images.length)]} 
//                   alt={product.name} 
//                   className="w-full h-48 object-cover"
//                 />
//                 <div className="p-6">
//                   <div className="flex justify-between items-center mb-4">
//                     <h3 className="text-lg font-bold text-white">{product.name}</h3>
//                     <div className="flex items-center space-x-2">
//                       <span className="line-through text-gray-400">{product.price}€</span>
//                       <span className="text-yellow-400 font-bold">{product.discountPrice}€</span>
//                     </div>
//                   </div>
//                   <p className="text-sm text-gray-300 mb-4">{product.description}</p>
//                   <div className="flex justify-between items-center">
//                     <div className="flex items-center">
//                       <FaStar className="text-yellow-400 mr-1" />
//                       <span className="text-white">{product.rating}</span>
//                     </div>
//                     <div className="space-x-2">
//                       <button className="text-gray-300 hover:text-blue-300"><FaEdit /></button>
//                       <button className="text-gray-400 hover:text-red-300"><FaTrash /></button>
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}

//           </motion.div>
//         </div>
//       </div>

//       {/* Modal pour ajouter un produit (à implémenter) */}
//       {isAddModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="bg-gray-900 p-8 rounded-lg">
//             <h2 className="text-2xl font-bold text-white mb-4">Ajouter un nouveau produit</h2>
//             {/* Formulaire d'ajout de produit à implémenter */}
//             <button onClick={() => setIsAddModalOpen(false)} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
//               Fermer
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }