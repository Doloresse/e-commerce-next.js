// 'use client';
// import React, { useState } from "react";
// import Navbar from "@/components/Navbar";
// import Link from "next/link";
// import Sidebar from "@/components/Sidebar";
// import { FaEye, FaTrash } from "react-icons/fa";
// import { useProducts } from "../../contexts/ProductContext";
// import { useRouter } from "next/navigation";

// const ProductsPage: React.FC = () => {
//   const { products, deleteProduct } = useProducts();
//   const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
//   const [searchTerm, setSearchTerm] = useState<string>(""); 
//   const router = useRouter();

//   const toggleProductSelection = (productId: number) => {
//     setSelectedProducts((prevSelected) =>
//       prevSelected.includes(productId)
//         ? prevSelected.filter((id) => id !== productId)
//         : [...prevSelected, productId]
//     );
//   };

//   const colorNames = {
//     "#FF0000": "Rouge",
//     "#00FF00": "Vert",
//     "#0000FF": "Bleu",
//     "#FFFF00": "Jaune",
//     "#FF00FF": "Magenta",
//     "#00FFFF": "Cyan",
//   };

//   const handleViewProduct = (productId: number) => {
//     router.push(`/product_details?id=${productId}`);
//   };

//   const handleDeleteProduct = (productId: number) => {
//     deleteProduct(productId);
//     setSelectedProducts(selectedProducts.filter((id) => id !== productId));
//   };

//   const filteredProducts = products.filter((product) =>
//     product.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-950">
//       <Navbar />
//       <div className="flex flex-1">
//         <Sidebar />
//         <div className="flex-1 p-6 ml-60 overflow-auto">
//           <div className="flex justify-between mb-6">
//             <h1 className="text-3xl font-bold text-white">Produits</h1>
//             <Link href="/create_products">
//               <button className="bg-gray-900 text-white text-xl font-bold rounded-lg p-2 hover:bg-gray-700">
//                 Ajouter un produit
//               </button>
//             </Link>
//           </div>

//           <div className="mb-4">
//             <input
//               type="text"
//               placeholder="Rechercher un produit..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-[300px] p-2 rounded-lg border border-gray-900 bg-gray-950 text-white"
//             />
//           </div>

//           <table className="min-w-full divide-y divide-gray-900">
//             <thead className="bg-gray-900">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"></th>
//                 <th className="px-6 py-3 text-left text-sm font-bold text-gray-300 uppercase tracking-wider">
//                   Produit
//                 </th>
//                 <th className="px-6 py-3 text-left text-sm font-bold text-gray-300 uppercase tracking-wider">
//                   Description
//                 </th>
//                 <th className="px-6 py-3 text-left text-sm font-bold text-gray-300 uppercase tracking-wider">
//                   Taille
//                 </th>
//                 <th className="px-6 py-3 text-left text-sm font-bold text-gray-300 uppercase tracking-wider">
//                   Couleur
//                 </th>
//                 <th className="px-6 py-3 text-left text-sm font-bold text-gray-300 uppercase tracking-wider">
//                   Stock
//                 </th>
//                 <th className="px-6 py-3 text-left text-sm font-bold text-gray-300 uppercase tracking-wider">
//                   Prix
//                 </th>
//                 <th className="px-6 py-3 text-left text-sm font-bold text-gray-300 uppercase tracking-wider">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-gray-950 divide-y divide-gray-900">
//               {filteredProducts
//                 .filter((product) => product.removedStock > 0)
//                 .map(
//                   (product) =>
//                     product.currentStock > 0 && (
//                       <tr key={product.id} className="">
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <input
//                             type="checkbox"
//                             checked={selectedProducts.includes(product.id)}
//                             onChange={() => toggleProductSelection(product.id)}
//                             className="form-checkbox h-3 w-3 text-blue-600"
//                           />
//                         </td>

//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="flex items-center">
//                             <img
//                               className="h-10 w-10 rounded-full mr-3"
//                               src={product.images[0]}
//                               alt={product.name}
//                             />
//                             <span className="text-sm font-medium text-gray-300">
//                               {product.name}
//                             </span>
//                           </div>
//                         </td>

//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
//                           {product.description}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
//                           {product.size}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
//                           {colorNames[product.color] || product.color}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
//                           {product.currentStock}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
//                           {product.price} F
//                         </td>

//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
//                           <button
//                             onClick={() => handleViewProduct(product.id)}
//                             className="text-gray500 hover:underline"
//                           >
//                             <FaEye />
//                           </button>
//                           <button
//                             onClick={() => handleDeleteProduct(product.id)}
//                             className="text-gray900 hover:underline ml2"
//                           >
//                             <FaTrash />
//                           </button>
//                         </td>
//                       </tr>
//                     )
//                 )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductsPage;


'use client';
import React, { useState } from 'react';
import Navbar from "@/components/Navbar";
import Link from 'next/link';
import Sidebar from "@/components/Sidebar";
import { FaEye, FaTrash } from 'react-icons/fa';
import { useProducts } from '../../contexts/ProductContext';
import { useRouter } from 'next/navigation';

const ProductsPage: React.FC = () => {
  const { products, deleteProduct } = useProducts();
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const router = useRouter();

  const toggleProductSelection = (productId: number) => {
    setSelectedProducts(prevSelected =>
      prevSelected.includes(productId)
        ? prevSelected.filter(id => id !== productId)
        : [...prevSelected, productId]
    );
  };

  const colorNames = {
    '#FF0000': 'Rouge',
    '#00FF00': 'Vert',
    '#0000FF': 'Bleu',
    '#FFFF00': 'Jaune',
    '#FF00FF': 'Magenta',
    '#00FFFF': 'Cyan',
  };

  const handleViewProduct = (productId: number) => {
    router.push(`/product_details?id=${productId}`);
  };

  const handleDeleteProduct = (productId: number) => {
    deleteProduct(productId);
    setSelectedProducts(selectedProducts.filter(id => id !== productId));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-950">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <div className='flex-1 p-6 ml-60 overflow-auto'>
          <div className='flex space-x-[500px]'>
            <h1 className="text-3xl font-bold mb-6 text-white">Produits</h1>
            <Link href="/create_products">
              <button className='bg-gray-900 text-white text-xl ml-64 font-bold rounded-lg p-2 hover:bg-gray-700'>
                Ajouter un produit
              </button>
            </Link>
          </div>
          <table className="min-w-full divide-y divide-gray-900">
            <thead className="bg-gray-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"></th>
                <th className="px-6 py-3 text-left text-sm font-bold text-gray-300 uppercase tracking-wider">Produit</th>
                <th className="px-6 py-3 text-left text-sm font-bold text-gray-300 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-sm font-bold text-gray-300 uppercase tracking-wider">Taille</th>
                <th className="px-6 py-3 text-left text-sm font-bold text-gray-300 uppercase tracking-wider">Couleur</th>
                {/* <th className="px-6 py-3 text-left text-sm font-bold text-gray-300 uppercase tracking-wider">Stock</th> */}
                <th className="px-6 py-3 text-left text-sm font-bold text-gray-300 uppercase tracking-wider">Prix</th>
                <th className="px-6 py-3 text-left text-sm font-bold text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-gray-950 divide-y divide-gray-900">
              {products.map(product => (
                <tr key={product.id} className="">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedProducts.includes(product.id)}
                      onChange={() => toggleProductSelection(product.id)}
                      className="form-checkbox h-3 w-3 text-blue-600"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img className="h-10 w-10 rounded-full mr-3" src={product.images[0]} alt={product.name} />
                      <span className="text-sm font-medium text-gray-300">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{product.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{product.size}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{colorNames[product.color] || product.color}</td>
                  {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{product.currentStock}</td> */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{product.price} F</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    <button onClick={() => handleViewProduct(product.id)} className="text-gray500 hover:underline">
                      <FaEye />
                    </button>
                    <button onClick={() => handleDeleteProduct(product.id)} className="text-gray900 hover:underline ml2">
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
  );
};

export default ProductsPage;
