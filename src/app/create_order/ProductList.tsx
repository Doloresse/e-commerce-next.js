// // src/app/add_order/ProductList.tsx
// import React from 'react';

// const ProductList = ({ products, onSelectProduct }) => {
//     if (!Array.isArray(products) || products.length === 0) {
//         return <div className="p-2 text-gray-500">Aucun produit disponible.</div>;
//     }

//     return (
//         <div className="absolute bg-white border rounded shadow-lg">
//             <h3 className="text-lg font-bold p-2">Liste des Produits</h3>
//             <ul>
//                 {products.map((product) => (
//                     <li key={product.id} onClick={() => onSelectProduct(product)} className="p-2 hover:bg-gray-200 cursor-pointer">
//                         <div className="flex justify-between">
//                             <span>{product.name}</span>
//                             <span>{product.price} F</span>
//                         </div>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default ProductList;
