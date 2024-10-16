import React from 'react';
import Image from 'next/image';

interface InvoiceProps {
  invoiceNumber: string;
  date: string;
  dueDate: string;
  companyName: string;
  companyAddress: string;
  clientName: string;
  clientAddress: string;
  items: Array<{
    description: string;
    quantity: number;
    unitPrice: number;
  }>;
  taxRate: number;
}

const InvoiceTemplate: React.FC<InvoiceProps> = ({
  invoiceNumber,
  date,
  dueDate,
  companyName,
  companyAddress,
  clientName,
  clientAddress,
  items,
  taxRate,
}) => {
  const subtotal = items.reduce((acc, item) => acc + item.quantity * item.unitPrice, 0);
  const taxAmount = subtotal * (taxRate / 100);
  const total = subtotal + taxAmount;

  return (
    <div className='bg-gray-200 w-full h-screen'>
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
            <div className="flex justify-between items-start">
                <div className=''>
                    <Image src="/images/logo.PNG" alt="Company Logo" width={100} height={50} />
                    <h1 className="text-xl text-gray-950 font-bold mt-4">{companyName}</h1>
                    <p className="text-gray-900">{companyAddress}</p>
                    </div>
                    <div className="text-right">
                    <h2 className="text-2xl text-gray-950 font-bold">FACTURE</h2>
                    <p className="text-gray-900 mt-4">N° {invoiceNumber}</p>
                    <p className="text-gray-900">Date : {date}</p>
                    <p className="text-gray-900">Échéance : {dueDate}</p>
                </div>
            </div>

            <div className="mt-2">
                <h3 className="text-lg text-gray-950 font-semibold">Facturé à :</h3>
                <p className="text-gray-900">{clientName}</p>
                <p className="text-gray-900">{clientAddress}</p>
            </div>

            <table className="w-full mt-10">
                <thead>
                <tr className="bg-gray-900 text-white">
                    <th className="text-left p-2">Description</th>
                    <th className="text-right p-2">Quantité</th>
                    <th className="text-right p-2">Prix unitaire</th>
                    <th className="text-right p-2">Total</th>
                </tr>
                </thead>
                <tbody>
                {items.map((item, index) => (
                    <tr key={index} className='text-gray-900'>
                    <td className="p-2">{item.description}</td>
                    <td className="text-right p-2">{item.quantity}</td>
                    <td className="text-right p-2">{item.unitPrice.toFixed(2)} €</td>
                    <td className="text-right p-2">{(item.quantity * item.unitPrice).toFixed(2)} €</td>
                    </tr>
                ))}
                </tbody>
            </table>

            <div className="mt-8 text-right">
                <p className="text-gray-900">Sous-total : {subtotal.toFixed(2)} €</p>
                <p className="text-gray-900">TVA ({taxRate}%) : {taxAmount.toFixed(2)} €</p>
                <p className="text-xl text-gray-900 font-bold mt-2">Total : {total.toFixed(2)} €</p>
            </div>

            <div className="mt-8 text-gray-950">
                <p>Conditions de paiement : Paiement à 30 jours</p>
                <p>Coordonnées bancaires : FR76 1234 5678 9012 3456 7890 123</p>
            </div>
        </div>
    </div>    
  );
};

export default InvoiceTemplate;
