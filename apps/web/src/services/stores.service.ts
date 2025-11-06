import { ApiService } from "./api.service";
import {
  StoresResponse,
  StoreResponse,
  StoreProductsResponse,
  ApiResponse,
} from "@/lib/api-types";

export const storesService = {
  async getStores(): Promise<StoresResponse> {
    const response = await ApiService.get<ApiResponse<StoresResponse>>("/stores");
    return response.data;
  },

  async getStoreById(id: string): Promise<StoreResponse> {
    const response = await ApiService.get<ApiResponse<StoreResponse>>(`/stores/${id}`);
    return response.data;
  },

  async getStoreProducts(id: string): Promise<StoreProductsResponse> {
    const response = await ApiService.get<ApiResponse<StoreProductsResponse>>(
      `/stores/${id}/products`
    );
    return response.data;
  },
};
