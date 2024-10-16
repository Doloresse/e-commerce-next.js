'use client';
import React, { createContext, useContext, useState } from 'react';
import { TProduct } from "@/types"; 

const ProductContext = createContext();

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState<TProduct[]>([]);

  const addProduct = (newProduct: TProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  return (
    <ProductContext.Provider value={{ products, addProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
