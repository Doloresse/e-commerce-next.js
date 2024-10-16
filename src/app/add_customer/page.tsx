'use client';

import React, { useState } from "react";
import { FaUserPlus } from "react-icons/fa";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";
import { useOrderContext } from "@/contexts/OrderContext";
// import { useOrderContext } from "@/context/OrderContext"; // Importer le contexte

interface Client {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    productName: string;
    category: string;
    quantity: number;
    amount: number;
}

export default function AddClientWithOrder() {
    const { addOrder } = useOrderContext(); // Utiliser le contexte
    const [client, setClient] = useState<Client>({
        id: Date.now(),
        name: "",
        email: "",
        phone: "",
        address: "",
        productName: "",
        category: "",
        quantity: 1,
        amount: 1,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setClient({ ...client, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addOrder(client); // Ajouter la commande au contexte
        console.log("Client ajouté avec commande :", client);
        setClient({ id: Date.now(), name: "", email: "", phone: "", address: "", productName: "", category: "", quantity: 1, amount: 1 }); // Réinitialiser le formulaire
    };

    return (
        <div className="flex flex-col h-screen w-full">
            <Navbar />
            <div className="flex flex-1 bg-gray-950 ml-60">
                <Sidebar />
                <div className="flex flex-col min-h-screen bg-gray-950 p-6">
                    <h1 className="text-4xl text-white font-bold mb-6 flex items-center">
                        <FaUserPlus className="mr-2" /> Ajouter un Client avec Commande
                    </h1>
                    <form onSubmit={handleSubmit} className="bg-gray-950 p-6 rounded-lg shadow-md">
                        <div className="mb-4">
                            <label className="block text-gray-300 mb-2">Nom</label>
                            <input
                                type="text"
                                name="name"
                                value={client.name}
                                onChange={handleChange}
                                className="border border-gray-700 rounded-lg p-2 w-full bg-gray-950 text-white"
                                placeholder="Nom du client"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-300 mb-2">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={client.email}
                                onChange={handleChange}
                                className="border border-gray-700 rounded-lg p-2 w-full bg-gray-950 text-white"
                                placeholder="Email du client"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-300 mb-2">Téléphone</label>
                            <input
                                type="tel"
                                name="phone"
                                value={client.phone}
                                onChange={handleChange}
                                className="border border-gray-700 rounded-lg p-2 w-full bg-gray-950 text-white"
                                placeholder="Téléphone du client"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-300 mb-2">Adresse</label>
                            <input
                                type="text"
                                name="address"
                                value={client.address}
                                onChange={handleChange}
                                className="border border-gray-700 rounded-lg p-2 w-full bg-gray-950 text-white"
                                placeholder="Adresse du client"
                                required
                            />
                        </div>

                        {/* Détails de la commande segmentés */}
                        <h2 className="text-gray-300 mb-4">Détails de la Commande</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-4">
                            <div>
                                <label className="block text-gray-300 mb-2">Nom du produit</label>
                                <input
                                    type="text"
                                    name="productName"
                                    value={client.productName}
                                    onChange={handleChange}
                                    className="border border-gray-700 rounded-lg p-2 w-full bg-gray-950 text-white"
                                    placeholder="Nom du produit"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-300 mb-2">Catégorie</label>
                                <input
                                    type="text"
                                    name="category"
                                    value={client.category}
                                    onChange={handleChange}
                                    className="border border-gray-700 rounded-lg p-2 w-full bg-gray-950 text-white"
                                    placeholder="Catégorie"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-300 mb-2">Quantité</label>
                                <input
                                    type="number"
                                    name="quantity"
                                    value={client.quantity}
                                    onChange={handleChange}
                                    className="border border-gray-700 rounded-lg p-2 w-full bg-gray-950 text-white"
                                    placeholder="Quantité"
                                    min={1}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-300 mb-2">Net a payer</label>
                                <input
                                    type="number"
                                    name="amount"
                                    value={client.amount}
                                    onChange={handleChange}
                                    className="border border-gray-700 rounded-lg p-2 w-full bg-gray-950 text-white"
                                    placeholder="Montant"
                                    min={1}
                                    required
                                />
                            </div>
                        </div>
                        <a href="/invoice">
                            <button
                                type="submit"
                                className="bg-blue-950 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-900 transition duration-200"
                            >
                                Ajouter Client
                            </button>
                        </a>
                        
                    </form>
                </div>
            </div>
        </div>
    );
}
