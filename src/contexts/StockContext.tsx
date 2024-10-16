'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Stock {
    [key: string]: number; // key = productId, value = quantity
}

interface StockContextType {
    stock: Stock;
    addStock: (productId: string, quantity: number) => void;
    extractStock: (productId: string, quantity: number) => void;
}

const StockContext = createContext<StockContextType | undefined>(undefined);

export const StockProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [stock, setStock] = useState<Stock>({});

    const addStock = (productId: string, quantity: number) => {
        setStock((prev) => ({
            ...prev,
            [productId]: (prev[productId] || 0) + quantity,
        }));
    };

    const extractStock = (productId: string, quantity: number) => {
        setStock((prev) => ({
            ...prev,
            [productId]: Math.max((prev[productId] || 0) - quantity, 0),
        }));
    };

    return (
        <StockContext.Provider value={{ stock, addStock, extractStock }}>
            {children}
        </StockContext.Provider>
    );
};

export const useStock = (): StockContextType => {
    const context = useContext(StockContext);
    if (!context) {
        throw new Error('useStock must be used within a StockProvider');
    }
    return context;
};




// 'use client';
// import React, { createContext, useContext, useState } from 'react';

// interface StockContextProps {
//   stock: { [productId: number]: number };
//   updateStockQuantity: (productId: number, quantity: number) => void;
// }

// const StockContext = createContext<StockContextProps | undefined>(undefined);

// export const useStock = () => {
//   const context = useContext(StockContext);
//   if (!context) {
//     throw new Error("useStock must be used within a StockProvider");
//   }
//   return context;
// };

// export const StockProvider: React.FC = ({ children }) => {
//   const [stock, setStock] = useState<{ [productId: number]: number }>({});

//   const updateStockQuantity = (productId: number, quantity: number) => {
//     setStock(prev => ({
//       ...prev,
//       [productId]: (prev[productId] || 0) + quantity
//     }));
//   };

//   return (
//     <StockContext.Provider value={{ stock, updateStockQuantity }}>
//       {children}
//     </StockContext.Provider>
//   );
// };
