// "use client";

// import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// import Navbar from "@/components/Navbar";
// import Image from "next/image";
// import Sidebar from "@/components/Sidebar";
// import { FaUpload } from "react-icons/fa";
// import { useProducts } from "../../contexts/ProductContext";

// type TProduct = {
//   name: string;
//   description: string;
//   category: string;
//   price: number;
//   size: number;
//   color: string;
//   totalQuantity: number;
//   currentStock: number;
//   minQuantity: number;
//   maxQuantity: number;
//   manufacturingDate: string;
//   expirationDate: string;
//   // dateofDay: string;
//   fournisseur: string;
// };

// const CreateProduct = () => {
//   const { addProduct } = useProducts();
//   const router = useRouter();
  

//   const [product, setProduct] = useState<TProduct[]>([]);

//   const [image, setImage] = useState<File | null>(null);
//   const [error, setError] = useState<string | null>(null);

//   const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setProduct((prevState) => ({
//       ...prevState,
//       [name]: value,
//       currentStock: name === "totalQuantity" ? value : prevState.currentStock, 
//     }));
//   };

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setImage(e.target.files ? e.target.files[0] : null);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       if (
//         !product.name ||
//         !product.category ||
//         !product.price ||
//         !product.totalQuantity
//       ) {
//         setError("Veuillez remplir tous les champs obligatoires.");
//         return;
//       }

//       const newProduct = {
//         id: Date.now(), 
//         ...product,
//         currentStock: parseInt(product.totalQuantity),
//         images: image ? [URL.createObjectURL(image)] : [],
//         rating: 0,
//         removedStock: 0,
//         discountPrice: parseFloat(product.price) * 0.9,
//       };

//       await addProduct(newProduct);
//       router.push("/stockmanagments");
//     } catch (error) {
//       console.error("Erreur lors de la création du produit :", error);
//       setError("Une erreur est survenue lors de la création du produit.");
//     }
//   };

//   return (
//     <div className="flex flex-col h-screen w-full">
//       <Navbar />
//       <div className="flex flex-1 bg-gray-950">
//         <Sidebar />
//         <div className="flex-1 p-8 ml-60">
//           <h1 className="text-3xl font-bold mb-6 text-white">
//             Ajouter un nouveau produit au magasin
//           </h1>
//           <div className="bg-gray-950 rounded-lg shadow-lg p-7">
//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div className="grid grid-cols-2 gap-7">
//                 <div>
//                   <label
//                     htmlFor="name"
//                     className="block mb-2 text-sm font-medium text-gray-300"
//                   >
//                     Nom du produit
//                   </label>
//                   <input
//                     type="text"
//                     id="name"
//                     name="name"
//                     value={product.name}
//                     onChange={handleChange}
//                     required
//                     className="w-full p-2 border border-gray-900 rounded-lg bg-gray-950 text-white focus:ring-2 focus:ring-gray-500"
//                   />
//                 </div>
//                 <div>
//                   <label
//                     htmlFor="category"
//                     className="block mb-2 text-sm font-medium text-gray-300"
//                   >
//                     Catégorie
//                   </label>
//                   <select
//                     id="category"
//                     name="category"
//                     value={product.category}
//                     onChange={handleChange}
//                     className="w-full p-2 border border-gray-900 rounded-lg bg-gray-950 text-gray-500 focus:ring-2 focus:ring-gray-500"
//                   >
//                     <option value="">Sélectionner une catégorie</option>
//                     <option value="electronics">Électronique</option>
//                     <option value="clothing">Vêtements</option>
//                     <option value="home">Maison</option>
//                   </select>
//                 </div>
//                 <div>
//                   <label
//                     htmlFor="price"
//                     className="block mb-2 text-sm font-medium text-gray-300"
//                   >
//                     Prix
//                   </label>
//                   <input
//                     type="number"
//                     id="price"
//                     name="price"
//                     value={product.price}
//                     onChange={handleChange}
//                     required
//                     className="w-full p-2 border border-gray-900 rounded-lg bg-gray-950 text-white focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>
//                 <div>
//                   <label
//                     htmlFor="size"
//                     className="block mb-2 text-sm font-medium text-gray-300"
//                   >
//                     Taille
//                   </label>
//                   <select
//                     id="size"
//                     name="size"
//                     value={product.size}
//                     onChange={handleChange}
//                     className="w-full p-2 border border-gray-900 rounded-lg bg-gray-950 text-gray-500 focus:ring-2 focus:ring-gray-500"
//                   >
//                     <option value="">Sélectionner une taille</option>
//                     <option value="electronics">XL</option>
//                     <option value="clothing">L</option>
//                     <option value="home">M</option>
//                     <option value="home">10</option>
//                     <option value="home">20</option>
//                   </select>
//                 </div>
//                <div>
//                   <label
//                     htmlFor="totalQuantity"
//                     className="block mb-2 text-sm font-medium text-gray-300"
//                   >
//                     Quantité totale
//                   </label>
//                   <input
//                     type="number"
//                     id="totalQuantity"
//                     name="totalQuantity"
//                     value={product.totalQuantity}
//                     onChange={handleChange}
//                     required
//                     className="w-full p-2 border border-gray-900 rounded-lg bg-gray-950 text-white focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div> 
//                 <div>
//                   <label
//                     htmlFor="minQuantity"
//                     className="block mb-2 text-sm font-medium text-gray-300"
//                   >
//                     Quantité minimale
//                   </label>
//                   <input
//                     type="number"
//                     id="minQuantity"
//                     name="minQuantity"
//                     value={product.minQuantity}
//                     onChange={handleChange}
//                     required
//                     className="w-full p-2 border border-gray-900 rounded-lg bg-gray-950 text-white focus:ring-2 focus:ring-blue500"
//                   />
//                 </div>
//                 <div>
//                   <label
//                     htmlFor="maxQuantity"
//                     className="block mb-2 text-sm font-medium text-gray-300"
//                   >
//                     Quantité maximale
//                   </label>
//                   <input
//                     type="number"
//                     id="maxQuantity"
//                     name="maxQuantity"
//                     value={product.maxQuantity}
//                     onChange={handleChange}
//                     required
//                     className="w-full p-2 border border-gray-900 rounded-lg bg-gray-950 text-white focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>
//                 <div>
//                   <label
//                     htmlFor="manufacturingDate"
//                     className="block mb-2 text-sm font-medium text-gray-300"
//                   >
//                     Date de fabrication
//                   </label>
//                   <input
//                     type="date"
//                     id="manufacturingDate"
//                     name="manufacturingDate"
//                     value={product.manufacturingDate}
//                     onChange={handleChange}
//                     required
//                     className="w-full p-2 border border-gray-900 rounded-lg bg-gray-950 text-white focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>
              
//                   <div>
//                   <label
//                     htmlFor="expirationDate"
//                     className="block mb-2 text-sm font-medium text-gray-300"
//                   >
//                     Date d'expiration
//                   </label>
//                   <input
//                     type="date"
//                     id="expirationDate"
//                     name="expirationDate"
//                     value={product.expirationDate}
//                     onChange={handleChange}
//                     required
//                     className="w-full p-2 border border-gray-900 rounded-lg bg-gray-950 text-white focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>
//                 <div>
//                     <label
//                       htmlFor="Date"
//                       className="block mb-2 text-sm font-medium text-gray-300"
//                     >
//                       Date du jour
//                     </label>
//                     <input
//                       type="date"
//                       id="dateofDate"
//                       name="dateofDate"
//                       value={product.dateofDate}
//                       onChange={handleChange}
//                       required
//                       className="w-full p-2 border border-gray-900 rounded-lg bg-gray-950 text-white focus:ring-2 focus:ring-blue-500"
//                     />
//                 </div>
//               </div> 
//               <div className="space-x-7 flex">
//                 <div className="flex-1 w-full">
//                   <label
//                       htmlFor="fournisseur"
//                       className="block mb-2 text-sm font-medium text-gray-300 "
//                     >
//                       Fournisseur
//                     </label>
//                     <select
//                       id="fournisseur"
//                       name="fournisseur"
//                       value={product.fournisseur}
//                       onChange={handleChange}
//                       className="w-full p-2 border border-gray-900 rounded-lg bg-gray-950 text-gray-500 focus:ring-2 focus:ring-gray-500"
//                     >
//                       <option value="fournisseur1">Fournisseur1</option>
//                       <option value="fournisseur2">Fournisseur2</option>
//                       <option value="fournisseur3">Fournisseur3</option>
//                       <option value="fournisseur4">Fournisseur4</option>
//                     </select>
//                 </div>
//                   <div className="flex-1 w-full">
//                     <label
//                       htmlFor="color"
//                       className="block mb-2 text-sm font-medium text-gray-300"
//                     >
//                       Couleur
//                     </label>
//                     <input
//                       type="texte"
//                       id="color"
//                       name="color"
//                       value={product.color}
//                       onChange={handleChange}
//                       required
//                       className="w-full p-2 border border-gray-900 rounded-lg bg-gray-950 text-white focus:ring-2 focus:ring-blue-500"
//                     />
//                 </div>
//               </div>         
//               <div className="flex space-x-7">
//                 <div className="flex-1 flex flex-col">
//                   <label
//                     htmlFor="description"
//                     className="block mb-2 text-sm font-medium text-gray-300"
//                   >
//                     Description
//                   </label>
//                   <textarea
//                     id="description"
//                     name="description"
//                     value={product.description}
//                     onChange={handleChange}
//                     rows={4}
//                     className="w-full h-full p-2 border border-gray-900 rounded-lg bg-gray-950 text-white focus:ring-2 focus:ring-blue-500"
//                   ></textarea>
//                 </div>
//                 <div className="flex-1 flex flex-col">
//                   <label className="block mb-2 text-sm font-medium text-gray-300">
//                     Image du produit
//                   </label>
//                   <div className="flex items-center justify-center w-full flex-1">
//                     <label
//                       htmlFor="dropzone-file"
//                       className="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-950"
//                     >
//                       <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                         <FaUpload className="w-10 h-10 mb-3 text-gray-400" />
//                         <p className="mb-2 text-sm text-gray-400">
//                           <span className="font-semibold">
//                             Cliquez pour uploader
//                           </span>{" "}
//                           ou glissez et déposez
//                         </p>
//                         <p className="text-xs text-gray-400">
//                           SVG, PNG, JPG ou GIF (MAX. 800x400px)
//                         </p>
//                       </div>
//                       <input
//                         id="dropzone-file"
//                         type="file"
//                         className="hidden"
//                         onChange={handleImageChange}
//                         accept="images/*"
//                       />
//                     </label>
//                   </div>
//                   {image && (
//                     <div className="mt-4">
//                       <img
//                         src={URL.createObjectURL(image)}
//                         alt="Aperçu"
//                         className="rounded-lg shadow-lg"
//                       />
//                     </div>
//                   )}
//                 </div>
//               </div>
              
//                 <div className="space-x-4 ml-[590px]">
//                   <button
//                     type="button"
//                     className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800"
//                   >
//                     Enregistrer comme brouillon
//                   </button>
//                   <button
//                     onClick={() => {}}
//                     type="submit"
//                     className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
//                   >
//                     Créer le produit
//                   </button>
//                 </div>
//               {/* </div>   */}
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CreateProduct;


'use client';

import React, { useState } from "react";
import { FaEye, FaTrash, FaCalendarAlt } from "react-icons/fa";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { useProducts } from "../../contexts/ProductContext";
import { useRouter } from "next/navigation";

const ProductsPage: React.FC = () => {
  const { products, deleteProduct, addProductEntry } = useProducts();
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [supplier, setSupplier] = useState<string>('');
  const [minQuantity, setMinQuantity] = useState<number>(0);
  const [maxQuantity, setMaxQuantity] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [manufacturingDate, setManufacturingDate] = useState<string>('');
  const [expirationDate, setExpirationDate] = useState<string>('');
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const router = useRouter();

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddEntry = () => {
    if (selectedProductId && quantity > 0 && supplier) {
      addProductEntry(selectedProductId, quantity, supplier, minQuantity, maxQuantity, price, manufacturingDate, expirationDate);
      resetForm();
    } else {
      alert("Veuillez remplir tous les champs.");
    }
  };

  const resetForm = () => {
    setSelectedProductId(null);
    setQuantity(1);
    setSupplier('');
    setMinQuantity(0);
    setMaxQuantity(0);
    setPrice(0);
    setManufacturingDate('');
    setExpirationDate('');
    setSearchTerm('');
    setIsFormVisible(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-950">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex flex-col min-h-screen p-6 ml-60 bg-gray-950">
          <h1 className="mt-10 mb-6 text-4xl font-bold text-white">Gestion d'entrée des Produits au magasin</h1>
          
          <button 
            onClick={() => setIsFormVisible(!isFormVisible)}
            className="w-60 py-2 mb-6 text-xl font-bold text-gray-100 bg-gray-950 border border-gray-900 rounded-lg hover:bg-gray-900"
          >
            {isFormVisible ? "Annuler" : "Ajouter une entrée"}
          </button>

          {isFormVisible ? (
            <div className="mb-6">
              <input 
                type="text" 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 mb-2 text-gray-300 bg-gray-950 border border-gray-900 rounded-lg"
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
                    className="p-2 cursor-pointer hover:bg-gray-800"
                  >
                    {product.name}
                  </li>
                ))}
              </ul>
              <h2 className="text-white mt-4">Quantité Totale
                <input 
                  type="number" 
                  min="1" 
                  value={quantity} 
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full p-2 mb-2 text-gray-300 bg-gray-950 border border-gray-900 rounded-lg"
                  placeholder="Quantité à ajouter"
                /> 
              </h2>
              <h2 className="text-white mt-4">Quantité Minimale
                <input 
                  type="number" 
                  min="0" 
                  value={minQuantity} 
                  onChange={(e) => setMinQuantity(Number(e.target.value))}
                  className="w-full p-2 mb-2 text-gray-300 bg-gray-950 border border-gray-900 rounded-lg"
                  placeholder="Quantité minimale"
                />
              </h2>
              <h2 className="text-white mt-4">Quantité Maximale
                <input 
                  type="number" 
                  min="0" 
                  value={maxQuantity} 
                  onChange={(e) => setMaxQuantity(Number(e.target.value))}
                  className="w-full p-2 mb-2 text-gray-300 bg-gray-950 border border-gray-900 rounded-lg"
                  placeholder="Quantité maximale"
                />
              </h2>
              <h2 className="text-white mt-4">Prix
                <input 
                  type="number" 
                  min="0" 
                  value={price} 
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full p-2 mb-2 text-gray-300 bg-gray-950 border border-gray-900 rounded-lg"
                  placeholder="Prix"
                />
              </h2>
              
              <div className="text-white mt-4">
                <h2>Date de fabrication</h2>
                <input 
                  type="date" 
                  value={manufacturingDate} 
                  onChange={(e) => setManufacturingDate(e.target.value)}
                  className="w-full p-2 text-gray-300 bg-gray-950 border border-gray-900 rounded-lg"
                  placeholder="Date de fabrication"
                />
                <FaCalendarAlt className="absolute top-2 right-3 text-gray-300" />
              </div>
              <div className="text-white mt-4">
                <h2>Date d'expiration</h2>
                <input 
                  type="date" 
                  value={expirationDate} 
                  onChange={(e) => setExpirationDate(e.target.value)}
                  className="w-full p-2 text-gray-300 bg-gray-950 border border-gray-900 rounded-lg"
                  placeholder="Date d'expiration"
                />
                <FaCalendarAlt className="absolute top-2 right-3 text-gray-300" />
              </div>

              <div className="mt-4 text-white">
                  <label htmlFor="fournisseur" className="block mb-2 text-sm font-medium text-gray-300">Fournisseur</label>
                  <select
                    id="fournisseur"
                    name="fournisseur"
                    value={supplier}
                    onChange={(e) => setSupplier(e.target.value)}
                    className="w-full p-2 border border-gray-900 rounded-lg bg-gray-950 text-gray-500"
                  >
                    <option value="">Sélectionner un fournisseur</option>
                    <option value="fournisseur1">Fournisseur 1</option>
                    <option value="fournisseur2">Fournisseur 2</option>
                    <option value="fournisseur3">Fournisseur 3</option>
                  </select>
              </div>

              <button 
                onClick={handleAddEntry}
                className="w-60 py-2 mt-8 text-xl font-bold text-gray-100 bg-gray-950 border border-gray-900 rounded-lg hover:bg-gray-900"
              >
                Ajouter
              </button>
            </div>
          ) : (
            <div className="mt-8 overflow-x-auto bg-gray-950 rounded-lg shadow-md">
              <table className="min-w-full divide-y divide-gray-900">
                <thead className="bg-gray-900">
                  <tr>
                    <th className="px-4 py-3 text-[10px] font-bold text-center text-gray-300 uppercase tracking-wider">Produit</th>
                    <th className="px-4 py-3 text-[10px] font-bold text-center text-gray-300 uppercase tracking-wider">Description</th>
                    <th className="px-4 py-3 text-[10px] font-bold text-center text-gray-300 uppercase tracking-wider">Catégorie</th>
                    <th className="px-4 py-3 text-[10px] font-bold text-center text-gray-300 uppercase tracking-wider">Taille</th>
                    <th className="px-4 py-3 text-[10px] font-bold text-center text-gray-300 uppercase tracking-wider">Couleur</th>
                    <th className="px-4 py-3 text-[10px] font-bold text-center text-gray-300 uppercase tracking-wider">Quantité</th>
                    <th className="px-4 py-3 text-[10px] font-bold text-center text-gray-300 uppercase tracking-wider">Fournisseur</th>
                    <th className="px-4 py-3 text-[10px] font-bold text-center text-gray-300 uppercase tracking-wider">Date de fabrication</th>
                    <th className="px-4 py-3 text-[10px] font-bold text-center text-gray-300 uppercase tracking-wider">Date d'expiration</th>
                    <th className="px-4 py-3 text-[10px] font-bold text-center text-gray-300 uppercase tracking-wider">Prix</th>
                    <th className="px-4 py-3 text-[10px] font-bold text-center text-gray-300 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-900 bg-gray-950">
                  {products.map(product => (
                    <tr key={product.id} className="hover:bg-gray-800">
                      <td className="px-4 py-4 text-sm text-gray-300 whitespace-nowrap">{product.name}</td>
                      <td className="px-4 py-4 text-sm text-gray-300 whitespace-nowrap">{product.description}</td>
                      <td className="px-4 py-4 text-sm text-gray-300 whitespace-nowrap">{product.category}</td>
                      <td className="px-4 py-4 text-sm text-gray-300 whitespace-nowrap">{product.size}</td>
                      <td className="px-4 py-4 text-sm text-gray-300 whitespace-nowrap">{product.color}</td>
                      <td className="px-4 py-4 text-sm text-gray-300 whitespace-nowrap">{product.currentStock}</td>
                      <td className="px-4 py-4 text-sm text-gray-300 whitespace-nowrap">{product.fournisseur}</td>
                      <td className="px-4 py-4 text-sm text-gray-300 whitespace-nowrap">{product.ManufacturingDate}</td>
                      <td className="px-4 py-4 text-sm text-gray-300 whitespace-nowrap">{product.ExpirationDate}</td>
                      <td className="px-4 py-4 text-sm text-gray-300 whitespace-nowrap">{product.price}</td>
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
