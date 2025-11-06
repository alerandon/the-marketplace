import { Store, Product, User } from "./types";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  user: User;
}

export interface ApiResponse<T> {
  data: T;
}

export type StoresResponse = Store[];
export type StoreResponse = Store;
export type StoreProductsResponse = Product[];

export type ProductResponse = Product;

export interface ApiError {
  message: string;
  statusCode: number;
  error?: string;
}
