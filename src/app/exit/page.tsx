'use client';

import React, { useState } from "react";
import { FaEye, FaTrash } from "react-icons/fa";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { useProducts } from "../../contexts/ProductContext";
import { useRouter } from "next/navigation";

const ProductsPage: React.FC = () => {
  const { products, deleteProduct, addProductEntry, suppliers } = useProducts();
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [supplier, setSupplier] = useState<string>('');
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const router = useRouter();

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddEntry = () => {
    if (selectedProductId && quantity > 0 && supplier) {
      addProductEntry(selectedProductId, quantity, supplier);
      resetForm();
    } else {
      alert("Veuillez remplir tous les champs.");
    }
  };

  const resetForm = () => {
    setSelectedProductId(null);
    setQuantity(1);
    setSupplier('');
    setSearchTerm('');
    setIsFormVisible(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-950">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex flex-col min-h-screen p-6 ml-60 bg-gray-950">
          <h1 className="mt-10 mb-6 text-4xl font-bold text-white">Gestion de sortie des Produits au rayon</h1>
          
          <button 
            onClick={() => setIsFormVisible(!isFormVisible)}
            className="w-full px-5 mt-4 py-2 mb-6 text-xl font-bold text-gray-100 bg-gray-950 border border-gray-900 rounded-lg hover:bg-gray-900"
          >
            {isFormVisible ? "Annuler" : "Ajouter une sortie"}
          </button>

          {isFormVisible ? (
            <div className="mb-6">
              {/* <h2 className="mb-2 text-xl text-white">Ajouter une sortie</h2> */}
              
              <input 
                type="text" 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 mb-2 mt-4 text-gray-300 bg-gray-950 border border-gray-900 rounded-lg"
                placeholder="Rechercher un produit..."
              />
              <ul className="max-h-40 mb-2 overflow-auto bg-gray-900 border border-gray-900 rounded-lg">
                {filteredProducts.map(product => (
                  <li 
                    key={product.id} 
                    onClick={() => {
                      setSelectedProductId(product.id);
                      setSearchTerm(product.name);
                    }}
                    className="p-2 cursor-pointer hover:bg-gray-800 text-gray-300"
                  >
                    {product.name}
                  </li>
                ))}
              </ul>
              <h2 className="text-white mt-4">  Quantite
                <input 
                  type="number" 
                  min="1" 
                  value={quantity} 
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full p-2 mb-2 text-gray-300 bg-gray-950 border border-gray-900 rounded-lg"
                  placeholder="Quantité à ajouter"
                />
              </h2>
              

              <button 
                onClick={handleAddEntry}
                className="w-full px-5 py-2 mt-4 text-xl font-bold text-gray-100 bg-gray-950 border border-gray-900 rounded-lg hover:bg-gray-900"
              >
                Ajouter
              </button>
            </div>
          ) : (
            <div className="mt-8 overflow-x-auto bg-gray-950 rounded-lg shadow-md">
              <table className="min-w-full divide-y divide-gray-900">
                <thead className="bg-gray-900">
                  <tr>
                    <th className="px-4 py-3 text-sm font-bold text-center text-gray-300 uppercase tracking-wider">Produit</th>
                    <th className="px-4 py-3 text-sm font-bold text-center text-gray-300 uppercase tracking-wider">Description</th>
                    <th className="px-4 py-3 text-sm font-bold text-center text-gray-300 uppercase tracking-wider">Categorie</th>
                    <th className="px-4 py-3 text-sm font-bold text-center text-gray-300 uppercase tracking-wider">Taille</th>
                    <th className="px-4 py-3 text-sm font-bold text-center text-gray-300 uppercase tracking-wider">Couleur</th>
                    <th className="px-4 py-3 text-sm font-bold text-center text-gray-300 uppercase tracking-wider">Quantite</th>
                    {/* <th className="px-4 py-3 text-sm font-bold text-center text-gray-300 uppercase tracking-wider">Fournisseur</th> */}
                    <th className="px-4 py-3 text-sm font-bold text-center text-gray-300 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-900 bg-gray-950">
                  {products.map(product => (
                    <tr key={product.id} className="">
                      <td className="px-4 py-4 text-sm text-gray-300 whitespace-nowrap">{product.name}</td>
                      <td className="px-4 py-4 text-sm text-gray-300 whitespace-nowrap">{product.description}</td>
                      <td className="px-4 py-4 text-sm text-gray-300 whitespace-nowrap">{product.category}</td>
                      <td className="px-4 py-4 text-sm text-gray-300 whitespace-nowrap">{product.size}</td>
                      <td className="px-4 py-4 text-sm text-gray-300 whitespace-nowrap">{product.color}</td>
                      <td className="px-4 py-4 text-sm text-gray-300 whitespace-nowrap">{product.currentStock}</td>
                      {/* <td className="px-4 py-4 text-sm text-gray-300 whitespace-nowrap">{supplier}</td> */}
                      <td className="px-4 py-4 text-sm text-gray-300 whitespace-nowrap">
                        <div className="flex space-x-2">
                          <button onClick={() => router.push(`/product_details?id=${product.id}`)} className="text-gray-500 hover:underline">
                            <FaEye />
                          </button>
                          <button onClick={() => deleteProduct(product.id)} className="text-gray-900 hover:underline">
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;


// 'use client';
// import React, { useState } from 'react';
// import Image from 'next/image';
// import Navbar from '@/components/Navbar';
// import Sidebar from '@/components/Sidebar';
// import { useProducts } from '@/contexts/ProductContext';
// import { FaMinus } from 'react-icons/fa';

// const StockManagement: React.FC = () => {
//   const { products, updateStockQuantity } = useProducts();
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
//       updateStockQuantity(productId, -quantity); // Soustraction de la quantité du stock
//       setQuantityToRemove(prev => ({ ...prev, [productId]: 0 })); // Réinitialiser la quantité à retirer
//     }
//   };

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-950">
//       <Navbar />
//       <div className="flex flex-1">
//         <Sidebar />
//         <div className="container ml-60 mx-auto mt-16 p-5 overflow-x-auto">
//           <h1 className="text-3xl text-white font-bold mb-5">Gestion de sortie des produits pour le rayon</h1>
//           <table className="min-w-full bg-gray-950 text-gray-200 mt-10">
//             <thead className='text-gray-100'>
//               <tr className="bg-gray-900">
//                 <th className="py-3 px-4 border-b border-gray-900">
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
//                 <th className="py-3 px-4 border-b border-gray-900">Image</th>
//                 <th className="py-3 px-4 border-b border-gray-900">Nom du Produit</th>
//                 <th className="py-3 px-4 border-b border-gray-900">Catégorie</th>
//                 <th className="py-3 px-4 border-b border-gray-900">Description</th>
//                 <th className="py-3 px-4 border-b border-gray-900">Date de fabrication</th>
//                 <th className="py-3 px-4 border-b border-gray-900">Date d'expiration</th>
//                 <th className="py-3 px-4 border-b border-gray-900">Prix</th>
//                 <th className="py-3 px-4 border-b border-gray-900">Taille</th>
//                 <th className="py-3 px-4 border-b border-gray-900">Couleur</th>
//                 <th className="py-3 px-4 border-b border-gray-900">Quantité en Stock</th>
//                 {/* <th className="py-3 px-4 border-b border-gray-900">Actions</th> */}
//               </tr>
//             </thead>
//             <tbody>
//               {products.map(product => (
//                 <tr key={product.id} className="text-gray-400">
//                   <td className="py-2 px-4 border-b border-gray-900 text-center">
//                     <input
//                       type="checkbox"
//                       checked={selectedProducts.includes(product.id)}
//                       onChange={() => handleSelect(product.id)}
//                     />
//                   </td>
//                   <td className="py-2 px-4 border-b border-gray-900 text-center">
//                     <Image src={product.images[0]} alt={product.name} width={50} height={50} className="rounded-full" />
//                   </td>
//                   <td className="py-2 px-4 border-b border-gray-900 text-center">{product.name}</td>
//                   <td className="py-2 px-4 border-b border-gray-900 text-center">{product.category}</td>
//                   <td className="py-2 px-4 border-b border-gray-900 text-center">{product.description}</td>
//                   <td className="py-2 px-4 border-b border-gray-900 text-center">{product.manufacturingDate}</td>
//                   <td className="py-2 px-4 border-b border-gray-900 text-center">{product.expirationDate}</td>
//                   <td className="py-2 px-4 border-b border-gray-900 text-center">{product.price} F</td>
//                   <td className="py-2 px-4 border-b border-gray-900 text-center">{product.size} </td>
//                   <td className="py-2 px-4 border-b border-gray-900 text-center">{product.color} </td>
//                   <td className="py-2 px-4 border-b border-gray-900 text-center">{product.stockQuantity}</td>
//                   {/* <td className="py-2 px-4 border-b border-gray-900 text-center">
//                     <div className="flex items-center justify-center">
//                       <input
//                         type="number"
//                         min="0"
//                         max={product.stockQuantity}
//                         value={quantityToRemove[product.id] || ''}
//                         onChange={(e) => setQuantityToRemove(prev => ({ ...prev, [product.id]: parseInt(e.target.value) || 0 }))}
//                         className="w-16 mr-2 p-1 bg-gray-950 border border-gray-900 rounded-lg text-gray-100"
//                       />
//                       <button
//                         onClick={() => handleRemoveStock(product.id)}
//                         className="bg-gray-900 hover:bg-gray-800 text-white p-2 rounded"
//                       >
//                         <FaMinus />
//                       </button>
//                     </div>
//                   </td> */}
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


// 'use client';
// import React, { useState } from "react";
// import { FaEdit, FaTrashAlt, FaPlus, FaCheck, FaEye } from "react-icons/fa";
// import Navbar from "@/components/Navbar";
// import Sidebar from "@/components/Sidebar";

// interface Product {
//     id: string;
//     name: string;
//     manufacturingDate: string;
//     expirationDate: string;
//     exitDate: string;
//     category: string;
//     quantity: string;
//     price: string;
// }

// export default function Entry() {
//     const [products, setProducts] = useState<Product[]>([
//         {
//             id: "000",
//             name: "Nom du Produit",
//             manufacturingDate: "01/01/2023",
//             expirationDate: "01/01/2025",
//             exitDate: "15/09/2023",
//             category: "Catégorie A",
//             quantity: "100",
//             price: "€20.00"
//         }
//     ]);
//     const [isAdding, setIsAdding] = useState(false);
//     const [newProduct, setNewProduct] = useState<Product>({
//         id: "",
//         name: "",
//         manufacturingDate: "",
//         expirationDate: "",
//         exitDate: "",
//         category: "",
//         quantity: "0",
//         price: "0.00"
//     });

//     const handleAddClick = () => {
//         setIsAdding(true);
//     };

//     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target;
//         setNewProduct(prev => ({ ...prev, [name]: value }));
//     };

//     const handleAddProduct = () => {
//         if (newProduct.name && newProduct.category && newProduct.quantity && newProduct.price) {
//             setProducts(prev => [...prev, { ...newProduct, id: (prev.length + 1).toString().padStart(3, '0') }]);
//             setIsAdding(false);
//             setNewProduct({
//                 id: "",
//                 name: "",
//                 manufacturingDate: "",
//                 expirationDate: "",
//                 exitDate: "",
//                 category: "",
//                 quantity: "0",
//                 price: "0.00"
//             });
//         } else {
//             alert("Veuillez remplir tous les champs obligatoires");
//         }
//     };

//     const handleViewDetails = (productId) => {
//         alert(`Affichage des détails pour le produit ID: ${productId}`);
//     };

//     return (
//         <div className="flex flex-col min-h-screen bg-gray-950">
//             <Navbar />
//             <div className="flex flex-1">
//                 <Sidebar />
//                 <div className="flex flex-col min-h-screen bg-gray-950 p-6 ml-60">
//                     <h1 className="text-4xl text-white font-bold mb-6 mt-10">Gestion de sortie des Produits</h1>
//                     <div className="overflow-x-auto bg-gray-950 rounded-lg shadow-md mt-8">
//                         <div className="ml-[940px] mb-4">
//                             <button onClick={handleAddClick} type="button" className="bg-blue-950 text-sm font-bold rounded-full text-white px-7 py-2 hover:bg-blue-900 transition duration-200">
//                                 <FaPlus className="inline mr-2" />
//                                 Ajouter
//                             </button>
//                         </div>
//                         <table className="min-w-full bg-gray-950 text-gray-200">
//                             <thead>
//                                 <tr className="bg-gray-900">
//                                     <th className="py-3 px-4 border-b border-gray-900 text-center">ID</th>
//                                     <th className="py-3 px-4 border-b border-gray-900 text-center">Produit_Marque</th>
//                                     <th className="py-3 px-4 border-b border-gray-900 text-center">Date_Fabrication</th>
//                                     <th className="py-3 px-4 border-b border-gray-900 text-center">Date_d'expiration</th>
//                                     <th className="py-3 px-4 border-b border-gray-900 text-center">Date_sortie</th>
//                                     <th className="py-3 px-8 border-b border-gray-900 text-center">Catégorie</th>
//                                     <th className="py-3 px-4 border-b border-gray-900 text-center">Quantité</th>
//                                     <th className="py-3 px-4 border-b border-gray-900 text-center">Prix</th>
//                                     <th className="py-3 px-4 border-b border-gray-900 text-center">Actions</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {products.map((product) => (
//                                     <tr key={product.id} className="text-gray-400">
//                                         <td className="py-2 px-4 border-b border-gray-900 text-center">{product.id}</td>
//                                         <td className="py-2 px-4 border-b border-gray-900 text-center">{product.name}</td>
//                                         <td className="py-2 px-4 border-b border-gray-900 text-center">{product.manufacturingDate}</td>
//                                         <td className="py-2 px-4 border-b border-gray-900 text-center">{product.expirationDate}</td>
//                                         <td className="py-2 px-4 border-b border-gray-900 text-center">{product.exitDate}</td>
//                                         <td className="py-2 px-4 border-b border-gray-900 text-center">{product.category}</td>
//                                         <td className="py-2 px-4 border-b border-gray-900 text-center">{product.quantity}</td>
//                                         <td className="py-2 px-4 border-b border-gray-900 text-center">{product.price}</td>
//                                         <td className="py-2 px-4 border-b border-gray-900 text-center">
//                                             <button onClick={() => handleViewDetails(product.id)} className="text-gray-300 hover:text-gray-400" aria-label={`Voir les détails de ${product.name}`}>
//                                                 <FaEye />
//                                             </button>
//                                             <button className="text-gray-300 hover:text-gray-400 ml-2 transition duration-200" aria-label={`Modifier ${product.name}`}>
//                                                 <FaEdit />
//                                             </button>
//                                             <button className="ml-2 text-gray-300 hover:text-gray-400 transition duration-200" aria-label={`Supprimer ${product.name}`}>
//                                                 <FaTrashAlt />
//                                             </button>
//                                         </td>
//                                     </tr>
//                                 ))}
//                                 {isAdding && (
//                                     <tr className="text-gray-400">
//                                         <td className="py-2 px-4 border-b border-gray-900 text-center">Nouveau</td>
//                                         <td className="py-2 px-4 border-b border-gray-900 text-center">
//                                             <input type="text" name="name" value={newProduct.name} onChange={handleInputChange} className="bg-gray-800 text-white px-2 py-1 rounded" />
//                                         </td>
//                                         <td className="py-2 px-4 border-b border-gray-900 text-center">
//                                             <input type="date" name="manufacturingDate" value={newProduct.manufacturingDate} onChange={handleInputChange} className="bg-gray-800 text-white px-2 py-1 rounded" />
//                                         </td>
//                                         <td className="py-2 px-4 border-b border-gray-900 text-center">
//                                             <input type="date" name="expirationDate" value={newProduct.expirationDate} onChange={handleInputChange} className="bg-gray-800 text-white px-2 py-1 rounded" />
//                                         </td>
//                                         <td className="py-2 px-4 border-b border-gray-900 text-center">
//                                             <input type="date" name="exitDate" value={newProduct.exitDate} onChange={handleInputChange} className="bg-gray-800 text-white px-2 py-1 rounded" />
//                                         </td>
//                                         <td className="py-2 px-4 border-b border-gray-900 text-center">
//                                             <input type="text" name="category" value={newProduct.category} onChange={handleInputChange} className="bg-gray-800 text-white px-2 py-1 rounded" />
//                                         </td>
//                                         <td className="py-2 px-4 border-b border-gray-900 text-center">
//                                             <input type="number" name="quantity" value={newProduct.quantity} onChange={handleInputChange} className="bg-gray-800 text-white px-2 py-1 rounded" />
//                                         </td>
//                                         <td className="py-2 px-4 border-b border-gray-900 text-center">
//                                             <input type="text" name="price" value={newProduct.price} onChange={handleInputChange} className="bg-gray-800 text-white px-2 py-1 rounded" />
//                                         </td>
//                                         <td className="py-2 px-4 border-b border-gray-900 text-center">
//                                             <button onClick={handleAddProduct} className="text-green-500 hover:text-green-600 transition duration-200">
//                                                 <FaCheck />
//                                             </button>
//                                         </td>
//                                     </tr>
//                                 )}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }
