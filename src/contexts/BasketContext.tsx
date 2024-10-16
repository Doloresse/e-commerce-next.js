'use client';
import React, { createContext, useContext, useState } from 'react';

const BasketContext = createContext();

export const useBasket = () => {
    return useContext(BasketContext);
};

export const BasketProvider = ({ children }) => {
    const [basketItems, setBasketItems] = useState([]);

    const addToBasket = (item) => {
        setBasketItems((prevItems) => [...prevItems, item]);
    };

    const clearBasket = () => {
        setBasketItems([]);
    };

    const updateItem = (index, updatedItem) => {
        const newItems = [...basketItems];
        newItems[index] = updatedItem;
        setBasketItems(newItems);
    };

    return (
        <BasketContext.Provider value={{ basketItems, addToBasket, clearBasket, updateItem }}>
            {children}
        </BasketContext.Provider>
    );
};
