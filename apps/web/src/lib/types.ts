export interface User {
  id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface Store {
  id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: string;
  sku: string;
  stock: number;
  isAvailable: boolean;
  image?: string | null;
  storeId: string;
  createdAt: string;
  updatedAt: string;
}

export interface StoreWithProducts extends Store {
  products: Product[];
}
