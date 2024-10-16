'use client';
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { useBasket } from '../../contexts/BasketContext';

const CreateOrder: React.FC = () => {
    const { basketItems } = useBasket();
    const [size, setSize] = useState('');
    const [address, setAddress] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Commande soumise:', { size, address, basketItems });
        alert('Commande créée avec succès !');
        // Logique d'envoi de la commande...
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-950">
            <Navbar />
            <div className="flex flex-1">
                <Sidebar />
                <div className="bg-gray-950 ml-60 min-h-screen p-8">
                    <h1 className="text-4xl font-bold text-white">Créer une Commande</h1>
                    <form onSubmit={handleSubmit} className="mt-4">
                        <div className="mb-4">
                            <label className="block text-gray-300">Taille du produit:</label>
                            <input 
                                type="text" 
                                value={size} 
                                onChange={(e) => setSize(e.target.value)} 
                                className="w-full p-2 border border-gray-900 rounded-lg bg-gray-950 text-white" 
                                required 
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-300">Adresse de livraison:</label>
                            <input 
                                type="text" 
                                value={address} 
                                onChange={(e) => setAddress(e.target.value)} 
                                className="w-full p-2 border border-gray-900 rounded-lg bg-gray-950 text-white" 
                                required 
                            />
                        </div>
                        <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-lg">Soumettre la commande</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateOrder;
