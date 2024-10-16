export interface Customer {
    id: string;
    name: string;
    email: string;
    image: string;
  }
  
  export interface Order {
    id: string;
    customerId: string;
    products: string[];
    total: number;
  }

  export type TProduct = {
    id: number;
    name: string;
    description: string;
    category: string;
    price: number;
    size: number;
    color: string;
    totalQuantity: number;
    currentStock: number;
    minQuantity: number;
    maxQuantity: number;
    manufacturingDate: string;
    expirationDate: string;
    fournisseur: string;
  };
  