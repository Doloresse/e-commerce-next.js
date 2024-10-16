// app/commandes/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import Link from 'next/link';
import { useOrderContext } from '@/contexts/OrderContext';

export default function OrdersPage() {
    const { orders } = useOrderContext();
    const [filteredOrders, setFilteredOrders] = useState(orders);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [sortOrder, setSortOrder] = useState('date');

    useEffect(() => {
        let updatedOrders = orders.filter((order) =>
            order.productName.toLowerCase().includes(searchQuery.toLowerCase())
        );

        if (statusFilter !== 'All') {
            updatedOrders = updatedOrders.filter(
                (order) => order.category === statusFilter 
            );
        }

        updatedOrders.sort((a, b) =>
            sortOrder === 'date'
                ? new Date(b.id).getTime() - new Date(a.id).getTime()
                : b.quantity - a.quantity
        );

        setFilteredOrders(updatedOrders);
    }, [searchQuery, statusFilter, sortOrder, orders]);

    return (
        <div className="flex flex-col min-h-screen bg-gray-950">
            <Navbar />
            <div className="flex flex-1">
                <Sidebar />
                <div className="container mx-auto p-10 ml-60">
                    <h1 className="text-2xl font-bold mb-6 text-white">Historique des Commandes</h1>

                    <div className="flex flex-wrap justify-between items-center mb-4">
                        <input
                            type="text"
                            placeholder="Rechercher par nom de produit..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full sm:w-1/3 border border-white rounded-lg p-2 bg-gray-950 text-white"
                        />
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="mt-2 sm:mt-0 w-full sm:w-auto border border-white rounded-lg p-2 bg-gray-950 text-white"
                        >
                            <option value="All">Toutes les catégories</option>
                            <option value="Electronics">Électronique</option>
                            <option value="Clothing">Vêtements</option>
                            <option value="Books">Livres</option>
                        </select>
                        <select
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                            className="mt-2 sm:mt-0 w-full sm:w-auto border border-white rounded-lg p-2 bg-gray-950 text-white"
                        >
                            <option value="date">Trier par date</option>
                            <option value="amount">Trier par montant</option>
                        </select>
                    </div>

                    <table className="min-w-full divide-y divide-gray-900 bg-gray-950 shadow-md rounded-lg mt-10">
                        <thead>
                            <tr className="bg-gray-900 text-white text-left divide-y divide-gray-900">
                                <th className="py-3 px-6">Nom du produit</th>
                                <th className="py-3 px-6">Nom du client</th>
                                <th className="py-3 px-6">Quantité</th>
                                <th className="py-3 px-6">Montant</th>
                                <th className="py-3 px-6"></th>
                            </tr>
                        </thead>
                        <tbody className='bg-gray-950 divide-y divide-gray-900'>
                            {filteredOrders.length > 0 ? (
                                filteredOrders.map((order) => (
                                    <tr key={order.id} className="text-gray-100">
                                        <td className="py-3 px-6">{order.productName}</td>
                                        <td className="py-3 px-6">{order.name}</td>
                                        <td className="py-3 px-6">{order.quantity}</td>
                                        <td className="py-3 px-6">{order.amount}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <Link href={`/delivery`}>
                                                <button className="text-gray-300 hover:text-blue-500">Suivi</button>
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="py-3 px-6 text-center text-gray-500">
                                        Aucune commande trouvée.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}