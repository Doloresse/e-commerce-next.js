'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { useProducts } from '@/contexts/ProductContext';
import { FaMinus } from 'react-icons/fa';

const StockManagement: React.FC = () => {
  const { products, updateStockQuantity, recordRemovedQuantity } = useProducts();
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [quantityToRemove, setQuantityToRemove] = useState<{ [key: number]: number }>({});

  const handleSelect = (id: number) => {
    setSelectedProducts(prevState =>
      prevState.includes(id) ? prevState.filter(productId => productId !== id) : [...prevState, id]
    );
  };

  const handleRemoveStock = (productId: number) => {
    const quantity = quantityToRemove[productId] || 0;
    if (quantity > 0) {
      updateStockQuantity(productId, -quantity);
      recordRemovedQuantity(productId, quantity);
      setQuantityToRemove(prev => ({ ...prev, [productId]: 0 }));
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-950">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <div className="container ml-60 mx-auto mt-16 p-5 overflow-x-auto">
          <h1 className="text-4xl text-white font-bold mb-5">Stocks de produits disponibles</h1>
          <table className="min-w-full bg-gray-950 text-gray-200 mt-10 rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-900 text-center">
                <th className="py-3 px-2 border-b border-gray-900">
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedProducts(products.map(product => product.id));
                      } else {
                        setSelectedProducts([]);
                      }
                    }}
                    checked={selectedProducts.length === products.length}
                  />
                </th>
                <th className="py-3 px-4 border-b border-gray-900">Produit</th>
                <th className="py-3 px-4 border-b border-gray-900">Catégorie</th>
                <th className="py-3 px-4 border-b border-gray-900">Date de fabrication</th>
                <th className="py-3 px-4 border-b border-gray-900">Date d'expiration</th>
                <th className="py-3 px-4 border-b border-gray-900">Taille</th>
                <th className="py-3 px-4 border-b border-gray-900">Prix</th>
                <th className="py-3 px-4 border-b border-gray-900">Couleur</th>
                <th className="py-3 px-4 border-b border-gray-900">Quantité en Stock</th>
                {/* <th className="py-3 px-4 border-b border-gray-900">Actions</th> */}
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="text-center">
                  <td className="py-2 px-4 border-b border-gray-900">
                    <input
                      type="checkbox"
                      checked={selectedProducts.includes(product.id)}
                      onChange={() => handleSelect(product.id)}
                    />
                  </td>
                  <td className="py-2 px-4 border-b border-gray-900">
                    <div className="flex items-center justify-center space-x-2">
                      <Image src={product.images[0]} alt={product.name} width={40} height={50} className="rounded-full" />
                      <span>{product.name}</span>
                    </div>
                  </td>
                  <td className="py-2 px-4 border-b border-gray-900">{product.category}</td>
                  <td className="py-2 px-4 border-b border-gray-900">{product.manufacturingDate}</td>
                  <td className="py-2 px-4 border-b border-gray-900">{product.expirationDate}</td>
                  <td className="py-2 px-4 border-b border-gray-900">{product.size}</td>
                  <td className="py-2 px-4 border-b border-gray-900">{product.price} F</td>
                  <td className="py-2 px-4 border-b border-gray-900">{product.color}</td>
                  <td className="py-2 px-4 border-b border-gray-900">{product.currentStock}</td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StockManagement;

// 'use client';

// import React, { useState } from 'react';
// import Image from 'next/image';
// import Navbar from '@/components/Navbar';
// import Sidebar from '@/components/Sidebar';
// import { useProducts } from '@/contexts/ProductContext';
// import { FaMinus } from 'react-icons/fa';

// const StockManagement: React.FC = () => {
//   const { products, updateStockQuantity, recordRemovedQuantity } = useProducts();
//   const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
//   const [quantityToRemove, setQuantityToRemove] = useState<{ [key: number]: number }>({});

//   const handleSelect = (id: number) => {
//     setSelectedProducts(prevState =>
//       prevState.includes(id) ? prevState.filter(productId => productId !== id) : [...prevState, id]
//     );
//   };

//   const handleRemoveStock = (productId: number) => {
//     const quantity = quantityToRemove[productId] || 0;
//     if (quantity > 0) {
//       updateStockQuantity(productId, -quantity);
//       recordRemovedQuantity(productId, quantity);
//       setQuantityToRemove(prev => ({ ...prev, [productId]: 0 }));
//     }
//   };

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-950">
//       <Navbar />
//       <div className="flex flex-1">
//         <Sidebar />
//         <div className="container ml-60 mx-auto mt-16 p-5 overflow-x-auto">
//           <h1 className="text-4xl text-white font-bold mb-5">Stocks de produits disponibles</h1>
//           <table className="min-w-full bg-gray-950 text-gray-200 mt-10 rounded-lg shadow-md">
//             <thead>
//               <tr className="bg-gray-900 text-center">
//                 <th className="py-3 px-2 border-b border-gray-900">
//                   <input
//                     type="checkbox"
//                     onChange={(e) => {
//                       if (e.target.checked) {
//                         setSelectedProducts(products.map(product => product.id));
//                       } else {
//                         setSelectedProducts([]);
//                       }
//                     }}
//                     checked={selectedProducts.length === products.length}
//                   />
//                 </th>
//                 <th className="py-3 px-4 border-b border-gray-900">Produit</th>
//                 <th className="py-3 px-4 border-b border-gray-900">Catégorie</th>
//                 <th className="py-3 px-4 border-b border-gray-900">Date de fabrication</th>
//                 <th className="py-3 px-4 border-b border-gray-900">Date d'expiration</th>
//                 <th className="py-3 px-4 border-b border-gray-900">Taille</th>
//                 <th className="py-3 px-4 border-b border-gray-900">Prix</th>
//                 <th className="py-3 px-4 border-b border-gray-900">Couleur</th>
//                 <th className="py-3 px-4 border-b border-gray-900">Quantité en Stock</th>
//               </tr>
//             </thead>
//             <tbody>
//               {products.map((product) => (
//                 <tr key={product.id} className="text-center">
//                   <td className="py-2 px-4 border-b border-gray-900">
//                     <input
//                       type="checkbox"
//                       checked={selectedProducts.includes(product.id)}
//                       onChange={() => handleSelect(product.id)}
//                     />
//                   </td>
//                   <td className="py-2 px-4 border-b border-gray-900">
//                     <div className="flex items-center justify-center space-x-2">
//                       <Image src={product.images[0]} alt={product.name} width={40} height={50} className="rounded-full" />
//                       <span>{product.name}</span>
//                     </div>
//                   </td>
//                   <td className="py-2 px-4 border-b border-gray-900">{product.category}</td>
//                   <td className="py-2 px-4 border-b border-gray-900">{product.manufacturingDate}</td>
//                   <td className="py-2 px-4 border-b border-gray-900">{product.expirationDate}</td>
//                   <td className="py-2 px-4 border-b border-gray-900">{product.size}</td>
//                   <td className="py-2 px-4 border-b border-gray-900">{product.price} F</td>
//                   <td className="py-2 px-4 border-b border-gray-900">{product.color}</td>
//                   <td className="py-2 px-4 border-b border-gray-900">{product.currentStock}</td>
                  
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StockManagement;



{/* <td className="py-2 px-4 border-b border-gray-900">
                    <div className="flex items-center justify-center space-x-2">
                      <input
                        type="number"
                        min="0"
                        max={product.currentStock}
                        value={quantityToRemove[product.id] || ''}
                        onChange={(e) =>
                          setQuantityToRemove((prev) => ({
                            ...prev,
                            [product.id]: parseInt(e.target.value) || 0,
                          }))
                        }
                        className="w-16 p-2 bg-gray-950 border border-gray-900 rounded-lg text-white text-center"
                      />
                      <button
                        onClick={() => handleRemoveStock(product.id)}
                        className="bg-gray-900 hover:bg-gray-800 text-white p-2 rounded ml-2"
                      >
                        <FaMinus />
                      </button>
                    </div>
                  </td> */}