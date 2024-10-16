// pages/invoice.tsx
import { FaEnvelope, FaPhone, FaGlobe } from 'react-icons/fa';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';

const Invoice = () => {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1">
         <Sidebar />
            <div className="min-h-screen bg-gray-950 ml-40 w-full">
            <div className="max-w-4xl mx-auto bg-gray-950 border border-gray-900 rounded-xl mt-20 overflow-hidden">
                <div className="flex">
                <div className="w-2/3">
                    <div className="flex justify-between items-center mb-2 ml-4">
                    <div>
                        <h1 className="text-4xl font-extrabold text-white">FACTURE</h1>
                        <p className="text-gray-400 mt-1">Numéro: #INV-2024-001</p>
                    </div>
                    <div className="text-right">
                        <img src="/images/Sans titre-1.png" alt="Logo" className="w-[150px] h-50" />
                        {/* <p className="text-sm font-semibold text-gray-700">Votre Entreprise Innovante</p> */}
                    </div>
                    </div>
                    
                    <div className="mb-8">
                    <h2 className="text-2xl ml-4 font-bold text-white mb-2">Détails du client</h2>
                    <div className="bg-gray-950 ml-4 p-4 rounded-lg">
                        <p className="font-semibold text-white">Jean Dupont</p>
                        <p className="text-gray-400">123 Rue Exemple, 75001 Paris</p>
                        <p className="text-gray-400">jean.dupont@example.com</p>
                    </div>
                    </div>

                    <table className="w-full mb-8 ml-4 ">
                    <thead className='mr-4'>
                        <tr className="bg-gray-900 text-white p-4 border border-gray-900">
                        <th className="py-2 px-4 text-left">Description</th>
                        <th className="py-2 px-4 text-right">Qté</th>
                        <th className="py-2 px-4 text-right">Prix</th>
                        <th className="py-2 px-4 text-right">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b border-gray-900 text-white">
                        <td className="py-2 px-4">Service de consultation</td>
                        <td className="py-2 px-4 text-right">10</td>
                        <td className="py-2 px-4 text-right">100 €</td>
                        <td className="py-2 px-4 text-right">1000 €</td>
                        </tr>
                        <tr className='text-white'>
                        <td className="py-2 px-4">Développement de projet</td>
                        <td className="py-2 px-4 text-right">1</td>
                        <td className="py-2 px-4 text-right">1500 €</td>
                        <td className="py-2 px-4 text-right">1500 €</td>
                        </tr>
                    </tbody>
                    </table>

                    <div className="flex justify-end mb-8">
                    <div className="w-1/2">
                        <div className="flex justify-between py-2 border-b border-gray-900">
                        <span className="font-semibold text-gray-400">Sous-total</span>
                        <span className='text-gray-400'>2500 €</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-900">
                        <span className="font-semibold text-sm text-gray-400">TVA (20%)</span>
                        <span className='text-gray-400'>500 €</span>
                        </div>
                        <div className="flex justify-between py-2 text-xl font-bold text-white">
                        <span>Total</span>
                        <span>3000 €</span>
                        </div>
                    </div>
                    </div>
                </div>
                
                <div className="w-1/3 bg-gray-900 ml-4 broder border-gray-900 rounded-lg text-white p-8">
                    <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-4">Informations</h2>
                    <div className="flex items-center mb-2">
                        <FaEnvelope className="mr-2 text-gray-300" />
                        <span className='text-gray-400'>contact@votreentreprise.com</span>
                    </div>
                    <div className="flex items-center mb-2">
                        <FaPhone className="mr-2 text-gray-300" />
                        <span className='text-gray-400'>+33 1 23 45 67 89</span>
                    </div>
                    <div className="flex items-center">
                        <FaGlobe className="mr-2 text-gray-300" />
                        <span className='text-gray-400'>www.votreentreprise.com</span>
                    </div>
                    </div>
                    
                    <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-4">Modalités de paiement</h2>
                    <p className="mb-2 text-gray-400">Virement bancaire</p>
                    <p className="mb-2 text-gray-200">IBAN: FR76 1234 5678 9012 3456 7890 123</p>
                    <p className='text-gray-200'>BIC: ABCDEFGHIJK</p>
                    </div>
                    
                    <div>
                    <h2 className="text-2xl font-bold mb-4 text-    white">Échéance</h2>
                    <p className="text-xl font-semibold text-gray-300">15 octobre 2024</p>
                    </div>
                </div>
                </div>
            </div>
            <p>Merci pour votre confiance. Pour toute question, n'hésitez pas à nous contacter.</p>
            </div>
        </div> 
    </div>       
  );
};

export default Invoice;