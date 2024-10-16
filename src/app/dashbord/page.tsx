"use client";

import { Line } from 'react-chartjs-2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faEye } from '@fortawesome/free-solid-svg-icons';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
} from 'chart.js';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import React from 'react';
import { FaGift } from 'react-icons/fa';
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa';

// Enregistrement des composants Chart.js
ChartJS.register(LinearScale, PointElement, LineElement, Title, Tooltip, Legend, CategoryScale);

const salesData = [
  { country: "USA", sales: 300 },
  { country: "Canada", sales: 150 },
  { country: "Germany", sales: 200 },
  { country: "France", sales: 180 },
  { country: "Brazil", sales: 100 },
  // Ajoutez d'autres pays si nécessaire
];

// Fonction pour obtenir le pourcentage de ventes
const getSalesPercentage = (country) => {
  const totalSales = salesData.reduce((acc, data) => acc + data.sales, 0);
  const countryData = salesData.find(data => data.country === country);
  return countryData ? (countryData.sales / totalSales) * 100 : 0;
};


const MapChart = () => {
  return (
    <div className="bg-gray-950 p-5 rounded-lg border-2 border-white shadow mb-6">
      <h2 className="text-4xl text-white mb-4">Ventes par Pays</h2>
      <ComposableMap projection="geoMercator" projectionConfig={{ scale: 150 }}>
        <Geographies geography="/path/to/your/world-110m.json">
          {({ geographies }) =>
            geographies.map(geo => {
              const salesPercentage = getSalesPercentage(geo.properties.NAME);
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={salesPercentage > 0 ? `rgba(255, 0, 0, ${salesPercentage / 100})` : '#EAEAEA'}
                  stroke="#FFFFFF"
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
};

const products = [
  {
    id: 1,
    name: 'Produit',
    image: '/images/depositphotos_502375418-stock-photo-happy-black-female-standing-near.jpg',
    price: 29.99,
    rating: 4.5,
    reviews: 120,
  },
  {
    id: 2,
    name: 'Produit',
    image: '/images/depositphotos_467407316-stock-photo-african-woman-making-selfie-on.jpg',
    price: 19.99,
    rating: 3.0,
    reviews: 50,
  },
  {
    id: 3,
    name: 'Produit ',
    image: '/images/two-happy-women-friends-shoppers-260nw-2036624549.webp',
    price: 39.99,
    rating: 5.0,
    reviews: 200,
  },
];

const ProductCard = ({ product }) => {
  const stars = Array.from({ length: 5 }, (_, index) => (
    <span key={index} className={index < Math.floor(product.rating) ? 'text-yellow-500 mt-7' : 'text-gray-300 mt-7'}>
      ★
    </span>
  ));

  return (
    <div className=" w-full flex space-x-4">
      <img src={product.image} alt={product.name} className="w-20 h-12 object-cover mt-4 rounded-md" />
      <div className='flex space-x-8'>
        <h3 className="text-lg font-semibold mt-2 text-white mt-6  ">{product.name}</h3>
        <p className="text-white font-bold mt-6 ">${product.price.toFixed(2)}</p>
      
      </div>
      {stars}
        <span className="ml-2 text-sm text-white mt-6">({product.reviews} )</span>
     
    </div>
  );
};

const CustomerLoyaltyChart = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Anciens clients',
        data: [100, 150, 200, 250, 300],
        fill: true,
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.4,
      },
      {
        label: 'Nouveaux clients',
        data: [50, 80, 150, 200, 250],
        fill: false,
        borderColor: 'rgba(255, 99, 132, 1)',
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        type: 'category',
        title: {
          display: true,
          text: 'Mois',
        },
      },
      y: {
        type: 'linear',
        title: {
          display: true,
          text: 'Nombre de clients',
        },
        grid: {
          drawBorder: true,
          color: 'white',
          lineWidth: 1,
          borderDash: [5, 5],
        },
      },
    },
  };

  return (
    <div>
      <h2 className='text-xl font-bold text-white'>Taux de fidélité des clients</h2>
      <div className='flex space-x-8 text-gray-400'>
        <h2 className='ml-4'>Nouveaux clients</h2>
        <h2>Anciens clients</h2>
      </div>
      <Line data={data} options={options} />
    </div>
  );
};

const OrdersTable = () => {
  const sortedProducts = [...products].sort((a, b) => b.rating - a.rating);

  const orders = [
    {
      id: 1,
      clientName: 'Jean Dupont',
      avatar: 'avatars/femme.png',
      email: 'jean.dupont@example.com',
      itemsCount: 3,
      totalPrice: 150.00,
      createdAt: '2024-09-20',
      updatedAt: '2024-09-21',
      status: 'Annulé',
    },
    {
      id: 2,
      clientName: 'Marie Curie',
      avatar: 'avatars/homme.png',
      email: 'marie.curie@example.com',
      itemsCount: 5,
      totalPrice: 250.00,
      createdAt: '2024-09-19',
      updatedAt: '2024-09-20',
      status: 'Remboursé',
    },
  ];

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 bg-gray-950 p-5 ml-64">
          <h1 className="text-3xl text-white font-bold mb-6 mt-10"></h1>
          <div className='bg-gray-950 p-5 rounded shadow   flex'>
            <div className="">
              <h2 className="text-4xl text-white">Bonjour, <br />À vous</h2>
              <p className="text-sm text-white mt-4">Voici ce qui se passe dans votre magasin aujourd'hui. Consultez les statistiques <br /> immédiatement</p>
              <button className='bg-blue-950 text-white rounded-lg px-5 py-2 mt-4 font-bold hover:opacity-80'>Ajouter un produit</button>
            </div>  
            <div>
              <img src="/images/3081559.png" alt="Produit" className= "h-[200px] w-[255px] ml-60" />
            </div>
          </div>
          {/* Détails du tableau de bord */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 mt-8">
            {/* Informations sur le stock */}
            <div className="bg-gray-950 p-5 rounded shadow border border-gray-900">
              <div className="flex items-center">
                <FaGift className="text-yellow-500 mr-2" /> {/* Icône de cadeau */}
                <h2 className="text-sm text-gray-500">Nouvelles commandes</h2>
              </div>
              <p className="text-2xl text-white">1,250</p>
              <div className="border-t border-dashed border-gray-600 mt-2" /> {/* Trait en pointillé */}
              <div className='flex mt-4'>
              <h2 className='text-blue-600 text-sm font-bold'>32,40% </h2>
              <h2 className='text-gray-500 text-sm ml-2'>Augmente mois derniers</h2>
              </div>
            </div>
            <div className="bg-gray-950 p-5 rounded shadow border border-gray-900">
              <div className="flex items-center">
                <FaGift className="text-yellow-500 mr-2" /> {/* Icône de cadeau */}
                <h2 className="text-sm text-gray-500">Ventes</h2>
              </div>
              <p className="text-2xl text-white">15</p>
              <div className="border-t border-dashed border-gray-600 mt-2" /> {/* Trait en pointillé */}
              <div className='flex mt-4'>
              <h2 className='text-blue-600 text-sm font-bold'>32,40% </h2>
              <h2 className='text-gray-500 text-sm ml-2'>Augmente mois derniers</h2>
              </div>
            </div>
            <div className="bg-gray-950 p-5 rounded shadow border border-gray-900">
              <div className="flex items-center">
                <FaGift className="text-yellow-500 mr-2" /> {/* Icône de cadeau */}
                <h2 className="text-sm text-gray-500">Revenu</h2>
              </div>
              <p className="text-2xl text-white">300</p>
              <div className="border-t border-dashed border-gray-600 mt-2" /> {/* Trait en pointillé */}
              <div className='flex mt-4'>
              <h2 className='text-blue-600 text-sm font-bold'>32,40% </h2>
              <h2 className='text-gray-500 text-sm ml-2'>Augmente mois derniers</h2>
              </div>
            </div>
          </div>  
          <div className="mb-6 mt-8 flex flex-col md:flex-row gap-4 w-full">
            <div className="bg-gray-950 p-5 border rounded-lg border-gray-900 w-full">
              <div className='flex justify-between items-center'>
                <h2 className='text-white text-sm'>Bénéfice total</h2>
                <button className="text-gray-600 bg-gray-950 p-1 border rounded-lg border-gray-900 hover: text-white">Détails</button>
              </div>
              <h2 className='text-white font-bold text-2xl'>8950,00 $</h2>
              <div>
                <ul className="flex space-x-20 bg-gray-950 p-3 rounded shadow border border-gray-900 mt-4">
                  <li>
                    <Link href="/" className="text-gray-300 hover:text-white ml-4 bg-gray-900 px-2 py-1 border border-gray-900  rounded-lg">5D</Link>
                  </li>
                  <li>
                    <Link href="/produits" className="text-gray-300 hover:text-white ">2W</Link>
                  </li>
                  <li>
                    <Link href="/ventes" className="text-gray-300 hover:text-white ">1M</Link>
                  </li>
                  <li>
                    <Link href="/alertes" className="text-gray-300 hover:text-white ">6M</Link>
                  </li>
                  <li>
                    <Link href="/alertes" className="text-gray-300 hover:text-white ">1Y</Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-950 p-5 rounded shadow border border-gray-900 text-white text-xl font-bold w-full">
              <h2>Promotions sales</h2>
            </div>
          </div>

          {/* Tableau des commandes */}
          <div className="bg-gray-950 p-5 rounded-lg shadow mb-6">
            <h2 className='text-xl font-bold text-white mb-4'>Commandes récentes</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-gray-950 shadow">
                <thead>
                  <tr className='text-white border-b border-gray-800 font-bold text-sm bg-gray-900'>
                    <th className="px-4 py-3 text-left">ID DE COMMANDE</th>
                    <th className="px-4 py-3 text-left">CLIENT</th>
                    <th className="px-4 py-3 text-left">ARTICLES</th>
                    <th className="px-4 py-3 text-left">PRIX</th>
                    <th className="px-4 py-3 text-left">CRÉÉ</th>
                    <th className="px-4 py-3 text-left">MODIFIÉ</th>
                    <th className="px-4 py-3 text-left">STATUT</th>
                    <th className="px-4 py-3 text-left">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order.id} className='text-white text-sm border-b border-gray-800'>
                      <td className="px-4 py-3">{order.id}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center">
                          <img 
                            src={order.avatar} 
                            alt={order.clientName} 
                            className="rounded-full mr-3 w-10 h-10"
                          />
                          <div>
                            <div className="font-medium">{order.clientName}</div>
                            <div className="text-gray-400 text-xs">{order.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">{order.itemsCount}</td>
                      <td className="px-4 py-3">${order.totalPrice.toFixed(2)}</td>
                      <td className="px-4 py-3">{order.createdAt}</td>
                      <td className="px-4 py-3">{order.updatedAt}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium
                          ${order.status === 'Completed' ? 'bg-gray-900 text-gray-800' :
                            order.status === 'Pending' ? 'bg-gray-900 text-gray-800' :
                            'bg-gray-900 text-white'}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex space-x-2">
                          <button className="text-blue-500 hover:text-blue-700">
                            <FaEye />
                          </button>
                          <button className="text-yellow-500 hover:text-yellow-700">
                            <FaEdit />
                          </button>
                          <button className="text-red-500 hover:text-red-700">
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="bg-gray-950 p-5 rounded-lg border border-gray-900 shadow mb-6">
            <CustomerLoyaltyChart />
          </div>
          <div className=" mb-6 mt-8 flex space-x-5 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 ">
            {/* <div className="bg-gray-950 p-5 rounded shadow  text-white text-xl font-bold p-4 shadow-md w-full">
              <h2 className="text-xl font-bold text-white mt-4 mb-4">Produits phares
                <button className='bg-gray-950 border border-white px-2 py-1 rounded-lg ml-60 text-sm text-gray-500'>Tout voir</button>
              </h2>
              <div className="w-full  ">
                {sortedProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div> */}
            {/* <div className="bg-gray-950 p-5 rounded shadow border border-gray-900 text-white text-xl font-bold p-4 shadow-md w-full py-20">
              <h2>Localisation utilisateur</h2>
            </div> */}
          </div>  

        </main>
      </div>
    </div>
  );
};

export default OrdersTable;
