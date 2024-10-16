'use client';
import React, { createContext, useContext, useState } from 'react';

interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
}

interface UserContextType {
    users: User[];
    addUser: (user: User) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [users, setUsers] = useState<User[]>([]);

    const addUser = (newUser: User) => {
        setUsers((prevUsers) => [...prevUsers, newUser]);
    };

    return (
        <UserContext.Provider value={{ users, addUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUserContext must be used within a UserProvider');
    }
    return context;
};
