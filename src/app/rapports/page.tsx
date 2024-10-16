'use client';

import React, { useState } from 'react';
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { FaChartBar, FaChartPie, FaChartLine, FaDownload, FaCalendar } from 'react-icons/fa';
import { Line, Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, BarElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, BarElement);

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState('last30days');

  const salesData = {
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
    datasets: [
      {
        label: 'Ventes',
        data: [12, 19, 3, 5, 2, 3],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      }
    ]
  };

  const salesOptions = {
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: { color: 'white' },
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: { color: 'white' },
      },
    },
    plugins: {
      legend: {
        labels: { color: 'white' },
      },
    },
  };

  const categoryData = {
    labels: ['Livres', 'Électronique', 'Vêtements', 'Maison'],
    datasets: [
      {
        data: [300, 50, 100, 80],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
      }
    ]
  };

  const categoryOptions = {
    plugins: {
      legend: {
        labels: { color: 'white' },
      },
    },
  };

  const customerData = {
    labels: ['Nouveaux', 'Récurrents'],
    datasets: [
      {
        label: 'Clients',
        data: [12, 19],
        backgroundColor: ['rgba(54, 162, 235, 0.6)', 'rgba(255, 99, 132, 0.6)'],
        borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const customerOptions = {
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: { color: 'white' },
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: { color: 'white' },
      },
    },
    plugins: {
      legend: {
        labels: { color: 'white' },
      },
    },
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8 ml-64 bg-gray-950">
          <h1 className="text-3xl font-bold mb-8 text-white">Rapports</h1>
          
          <div className="mb-6 flex justify-between items-center ">
            <select 
              value={dateRange} 
              onChange={(e) => setDateRange(e.target.value)}
              className="p-2 border border-gray-900 rounded-md bg-gray-950 text-white"
            >
              <option value="last7days">7 derniers jours</option>
              <option value="last30days">30 derniers jours</option>
              <option value="lastYear">Dernière année</option>
            </select>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center">
              <FaDownload className="mr-2" /> Télécharger le rapport
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-950 border border-gray-900 p-6 rounded-lg shadow-md">
              <h2 className="text-xl text-white font-bold mb-4 flex items-center">
                <FaChartLine className="mr-2 text-blue-500" /> Ventes
              </h2>
              <Line data={salesData} options={salesOptions} />
            </div>
            <div className="bg-gray-950 border border-gray-900 p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4 flex items-center text-white">
                <FaChartPie className="mr-2 text-green-500" /> Catégories
              </h2>
              <Pie data={categoryData} options={categoryOptions} />
            </div>
            <div className="bg-gray-950 border border-gray-900 p-6 rounded-lg shadow-md">
              <h2 className="text-xl text-white font-bold mb-4 flex items-center">
                <FaChartBar className="mr-2 text-purple-500" /> Clients
              </h2>
              <Bar data={customerData} options={customerOptions} />
            </div>
          </div>

          <div className="bg-gray-950 border border-gray-900 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-white">Résumé des ventes</h2>
            <table className="min-w-full divide-y divide-gray-900">
              <thead className="bg-gray-50 ">
                <tr className=' bg-gray-950'>
                  <th className="px-6 py-3 text-left text-sm font-bold text-white uppercase tracking-wider">Produit</th>
                  <th className="px-6 py-3 text-left text-sm font-bold text-white uppercase tracking-wider">Ventes</th>
                  <th className="px-6 py-3 text-left text-sm font-bold text-white uppercase tracking-wider">Revenus</th>
                </tr>
              </thead>
              <tbody className="bg-gray-950 divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 text-gray-200 whitespace-nowrap">Produit Book</td>
                  <td className="px-6 py-4 text-gray-200 whitespace-nowrap">50</td>
                  <td className="px-6 py-4 text-gray-200 whitespace-nowrap">750.000F</td>
                </tr>
                {/* Ajoutez d'autres lignes de produits ici */}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}