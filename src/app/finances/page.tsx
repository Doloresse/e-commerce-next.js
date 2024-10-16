// pages/finance.tsx
'use client';

import React from 'react';
import { Bar } from 'react-chartjs-2';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { FaChartLine, FaMoneyBillWave, FaUsers } from 'react-icons/fa';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const FinancePage = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Chiffre d\'Affaires',
        data: [120000, 190000, 300000, 500000, 400000, 600000],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'white',
        },
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'white',
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: 'white',
        },
      },
      title: {
        display: true,
        text: 'Chiffre d\'Affaires Mensuel',
        color: 'white',
      },
    },
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1">
         <Sidebar />
            <div className="container mx-auto p-6 ml-60 bg-gray-950 text-white">
                <h1 className="text-4xl mt-10 font-bold mb-6">Rapport Financier</h1>

                <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 ml-10 mt-4">
                    <div className="bg-gray-950 p-4 border border-gray-900 rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
                    <FaMoneyBillWave className="text-gray-500 text-5xl mb-2" />
                    <h3 className="text-xl font-bold">Chiffre d'Affaires</h3>
                    <p className="text-2xl">5.2M€</p>
                    <p className="text-gray-400">+15% par rapport à l'année précédente</p>
                    </div>
                    <div className="bg-gray-950 p-4 border border-gray-900 rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
                    <FaChartLine className="text-green-500 text-5xl mb-2" />
                    <h3 className="text-xl font-bold">Croissance</h3>
                    <p className="text-2xl">20%</p>
                    <p className="text-gray-400">Croissance annuelle projetée</p>
                    </div>
                    <div className="bg-gray-950 p-4 border border-gray-900 rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
                    <FaUsers className="text-purple-500 text-5xl mb-2" />
                    <h3 className="text-xl font-bold">Clients Actifs</h3>
                    <p className="text-2xl">1,200</p>
                    <p className="text-gray-400">Clients fidèles</p>
                    </div>
                </section>

                <section className="mb-6 ">
                    <h2 className="text-3xl text-gray-100 font-bold mb-4 mt-20">Graphique du Chiffre d'Affaires</h2>
                    <Bar data={data} options={options} />
                </section>

                <section>
                    <h2 className="text-2xl text-gray-100 font-semibold mb-4">Indicateurs Financiers</h2>
                    <ul className="list-disc ml-5 text-gray-300">
                    <li>Rentabilité des Capitaux Propres : 15%</li>
                    <li>Taux d'Endettement : 35%</li>
                    <li>Délai Moyen de Paiement Clients : 45 jours</li>
                    </ul>
                </section>
            </div>
      </div>  
    </div>      
  );
};

export default FinancePage;