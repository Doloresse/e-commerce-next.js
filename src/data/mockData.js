// src/data/mockData.js
export const mockClients = [
    {
        id: 1,
        name: "Jean Dupont",
        email: "jean.dupont@example.com",
        phone: "0123456789",
        address: "10 Rue de Paris, Paris",
        orders: [
            { productId: 1, quantity: 2 },
            { productId: 2, quantity: 1 }
        ]
    },
    {
        id: 2,
        name: "Marie Curie",
        email: "marie.curie@example.com",
        phone: "0987654321",
        address: "20 Avenue des Champs-Élysées, Paris",
        orders: [
            { productId: 3, quantity: 1 }
        ]
    }
];

export const mockProducts = [
    {
        id: 1,
        name: "Produit A",
        description: "Description du Produit A",
        price: 100,
        imageUrl: "https://via.placeholder.com/150" // Remplacez par une vraie URL d'image
    },
    {
        id: 2,
        name: "Produit B",
        description: "Description du Produit B",
        price: 150,
        imageUrl: "https://via.placeholder.com/150"
    },
    {
        id: 3,
        name: "Produit C",
        description: "Description du Produit C",
        price: 200,
        imageUrl: "https://via.placeholder.com/150"
    }
];
