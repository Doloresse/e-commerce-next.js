// 'use client';
// import React from 'react';
// import { useBasket } from '@/contexts/BasketContext';
// import Navbar from '@/components/Navbar';
// import Sidebar from '@/components/Sidebar';

// const Basket: React.FC = () => {
//     const { basketItems, clearBasket } = useBasket();

//     return (
//         <div className="flex flex-col min-h-screen bg-gray-950">
//             <Navbar />
//             <div className="flex flex-1">
//                 <Sidebar />
//                 <div className="p-4 bg-gray-950 rounded-lg shadow-md ml-[420px] mt-20 w-[700px]">
//                     <h2 className="text-4xl text-center font-bold mb-4 text-white">Panier</h2>
//                     <ul className="space-y-2">
//                         {basketItems.length === 0 ? (
//                             <li className="text-gray-200 text-xl text-center mt-10">Votre panier est vide.</li>
//                         ) : (
//                             basketItems.map((item, index) => (
//                                 <li key={index} className="flex justify-between p-2 border-b text-white">
//                                     <span>{item.product}</span>
//                                     <span>{item.size}</span>
//                                     <span>{item.color}</span>
//                                     <span>{item.quantity}</span>
//                                     <span>Prix: {item.price}€</span>
//                                 </li>
//                             ))
//                         )}
//                     </ul>
//                     <button onClick={clearBasket} className="mt-10 w-full bg-gray-900 text-white p-2 rounded-lg hover:bg-bray-800 transition">
//                         Vider le panier
//                     </button>
//                     <button
//                         type='submit'
//                         className="mt-10 w-full bg-gray-900 text-white p-2 rounded-lg hover:bg-gray-800 transition"
//                     >
//                         Créer une facture
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Basket;


'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { useBasket } from '@/contexts/BasketContext';

const colorNames = {
    '#FF0000': 'Rouge',
    '#00FF00': 'Vert',
    '#0000FF': 'Bleu',
    '#FFFF00': 'Jaune',
    '#FF00FF': 'Magenta',
    '#00FFFF': 'Cyan',
};

const Basket: React.FC = () => {
    const { basketItems, clearBasket } = useBasket();
    const router = useRouter();

    const calculateTotal = () => {
        return basketItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    };

    const handleCreateInvoice = () => {
        const total = calculateTotal();
        localStorage.setItem('invoiceData', JSON.stringify({ basketItems, total }));
        clearBasket();
        router.push('/invoice');
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-950">
            <Navbar />
            <div className="flex flex-1">
                <Sidebar />
                <div className="p-6 bg-gray-950 rounded-lg shadow-lg ml-[420px] mt-20 w-[700px]">
                    <h2 className="text-4xl text-center font-bold mb-6 text-white">Panier</h2>
                    <ul className="space-y-4">
                        {basketItems.length === 0 ? (
                            <li className="text-gray-300 text-xl text-center mt-10">Votre panier est vide.</li>
                        ) : (
                            basketItems.map((item, index) => (
                                <li key={index} className="flex justify-between items-center p-4 border-b border-gray-700 bg-gray-850 rounded-lg">
                                    <div className="flex-1">
                                        <h3 className="text-xl mt-4 font-semibold text-white">{item.product}</h3>
                                        <p className="text-gray-400 mt-4">Taille: {item.size}</p>
                                        <p className="text-gray-400 mt-4">Couleur: {colorNames[item.color] || item.color}</p>
                                    </div>
                                    <div className=''>
                                        <p className="text-gray-400 mt-4">Quantité: {item.quantity}</p>
                                        <span className="text-lg mt-10 font-bold text-white">Prix: {item.price} F</span>
                                    </div>
                                    
                                </li>
                            ))
                        )}
                    </ul>
                    <h3 className="mt-6 text-2xl text-center text-white font-bold">Total: {calculateTotal()} F</h3>
                    <div className="flex justify-center mt-6 space-x-4">
                        <button
                            onClick={handleCreateInvoice}
                            className="bg-gray-900 text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition"
                        >
                            Créer une facture
                        </button>
                        <button
                            onClick={clearBasket}
                            className="bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition"
                        >
                            Vider le panier
                        </button>
                    </div>
                </div>
            </div>        
        </div>                
    );
};

export default Basket;
