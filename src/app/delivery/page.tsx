'use client';

import React from 'react';
import { FaTruck, FaMapMarkerAlt, FaClipboardCheck, FaClock, FaBoxOpen } from 'react-icons/fa';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';

const DeliveryTracking: React.FC = () => {
  const deliveryData = {
    status: 'En cours',
    estimatedDelivery: '2023-10-10',
    currentLocation: 'Centre de distribution',
    history: [
      { date: '2023-10-01', status: 'Commande passée' },
      { date: '2023-10-02', status: 'En préparation' },
      { date: '2023-10-03', status: 'Prise en charge' },
      { date: '2023-10-04', status: 'En transit' },
      { date: '2023-10-05', status: 'Arrivée au centre de distribution' },
    ],
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-950">
        <Navbar />
            <div className="flex flex-1">
                <Sidebar />
                    <div className="bg-gray-950 min-h-screen p-8 ml-60 w-full">
                        <div className="w-full mx-auto bg-gray-950 border border-gray-900 rounded-lg shadow-md p-6 flex">
                            <div className='relative h-[300px] flex-1 rounded-lg mt-4 overflow-hidden'>
                            {/* <img src="/images/358-r-scaled.webp" alt="" className='w-full h-full object-cover opacity-80' /> */}
                            <div className="absolute inset-0 flex flex-col justify-center items-start p-4">
                                <h1 className="text-5xl font-bold text-white mb-4">Suivi de Livraison</h1>
                                <div className='bg-white bg-opacity-70 mt-20 p-4 rounded-lg shadow w-full'>
                                <h2 className='text-gray-950 text-xl font-bold'>Informations concernant votre envoi</h2>
                                <h2 className='text-gray-950 text-sm mt-2'>Livraison prévue le <strong>{deliveryData.estimatedDelivery}</strong></h2>
                                <h3 className="text-lg font-semibold">État actuel : {deliveryData.status}</h3>
                                <p className="text-gray-900">Localisation actuelle : {deliveryData.currentLocation}</p>
                                </div>
                            </div>
                            </div>
                        </div>
                        <div>
                            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                                <div className="bg-gray-950 p-4 h-40 border border-gray-900 rounded-lg shadow flex flex-col items-center justify-center">
                                <FaClipboardCheck className="text-green-500 text-6xl mb-2" />
                                <span className="font-semibold text-white">Commande passée</span>
                                </div>
                                <div className="bg-gray-950 p-4 h-40 border border-gray-900 rounded-lg shadow flex flex-col items-center justify-center">
                                <FaClock className="text-yellow-500 text-6xl mb-2" />
                                <span className="font-semibold text-white">En préparation</span>
                                </div>
                                <div className="bg-gray-950 p-4 h-40 border border-gray-900 rounded-lg shadow flex flex-col items-center justify-center">
                                <FaTruck className="text-blue-500 text-6xl mb-2" />
                                <span className="font-semibold text-white">Prise en charge</span>
                                </div>
                                <div className="bg-gray-950 p-4 h-40 border border-gray-900 rounded-lg shadow flex flex-col items-center justify-center">
                                <FaBoxOpen className="text-orange-500 text-6xl mb-2" />
                                <span className="font-semibold text-white">En transit</span>
                                </div>
                                <div className="bg-gray-950 p-4 h-40 border border-gray-900 rounded-lg shadow flex flex-col items-center justify-center">
                                <FaMapMarkerAlt className="text-red-500 text-6xl mb-2" />
                                <span className="font-semibold text-white">Livré</span>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        
    </div>            
  );
};

export default DeliveryTracking;
