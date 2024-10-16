// contexts/OrderContext.tsx
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Order {
  id: string;
  productName: string;
  name: string;
  quantity: number;
  amount: number;
  category: string;
}

interface OrderContextType {
  orders: Order[];
  addOrder: (order: Order) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);

  const addOrder = (order: Order) => {
    setOrders(prevOrders => [...prevOrders, order]);
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrderContext() {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrderContext must be used within an OrderProvider');
  }
  return context;
}


// 'use client';
// import React, { createContext, useContext, useState } from 'react';

// interface Order {
//     id: number;
//     name: string;
//     email: string;
//     phone: string;
//     address: string;
//     productName: string;
//     category: string;
//     quantity: number;
//     amount: number;
// }

// interface OrderContextType {
//     orders: Order[];
//     addOrder: (order: Order) => void;
// }

// const OrderContext = createContext<OrderContextType | undefined>(undefined);

// export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//     const [orders, setOrders] = useState<Order[]>([]);

//     const addOrder = (order: Order) => {
//         setOrders((prevOrders) => [...prevOrders, order]);
//     };

//     return (
//         <OrderContext.Provider value={{ orders, addOrder }}>
//             {children}
//         </OrderContext.Provider>
//     );
// };

// export const useOrderContext = () => {
//     const context = useContext(OrderContext);
//     if (!context) {
//         throw new Error('useOrderContext must be used within an OrderProvider');
//     }
//     return context;
// };
