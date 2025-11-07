import { PaginatedResult } from "@the-marketplace/shared";
import { Store, Product, User } from "./types";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface ApiResponse<T> {
  data: T;
}

export type StoresResponse = PaginatedResult<Store>;
export type StoreResponse = Store;

export type StoreProductsResponse = PaginatedResult<Product>;
export type ProductResponse = Product;

export interface CreateStoreDto {
  name: string;
  address: string;
  city: string;
  phone: string;
}

export interface UpdateStoreDto {
  name?: string;
  address?: string;
  city?: string;
  phone?: string;
}

export interface CreateProductDto {
  name: string;
  description?: string;
  price: number;
  sku: string;
  stock: number;
  isAvailable: boolean;
  storeId: string;
}

export interface UpdateProductDto {
  name?: string;
  description?: string;
  price?: number;
  sku?: string;
  stock?: number;
  isAvailable?: boolean;
}

export interface ApiError {
  message: string;
  statusCode: number;
  error?: string;
}
