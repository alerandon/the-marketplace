import { ApiService } from "./api.service";
import {
  StoresResponse,
  StoreResponse,
  StoreProductsResponse,
  ApiResponse,
  CreateStoreDto,
  UpdateStoreDto,
} from "@/lib/api-types";

export const storesService = {
  async getStores(params?: { page?: number; limit?: number; q?: string }): Promise<StoresResponse> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.limit) queryParams.append("limit", params.limit.toString());
    if (params?.q) queryParams.append("q", params.q);

    const queryString = queryParams.toString();
    const url = `/api/stores${queryString ? `?${queryString}` : ""}`;

    const response = await ApiService.get<ApiResponse<StoresResponse>>(url);
    return response.data;
  },

  async getStoreById(id: string): Promise<StoreResponse> {
    const response = await ApiService.get<ApiResponse<StoreResponse>>(`/api/stores/${id}`);
    return response.data;
  },

  async getStoreProducts(
    id: string,
    params?: { page?: number; limit?: number; q?: string; inStock?: boolean }
  ): Promise<StoreProductsResponse> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.limit) queryParams.append("limit", params.limit.toString());
    if (params?.q) queryParams.append("q", params.q);
    if (params?.inStock !== undefined) queryParams.append("inStock", params.inStock.toString());

    const queryString = queryParams.toString();
    const url = `/api/stores/${id}/products${queryString ? `?${queryString}` : ""}`;

    const response = await ApiService.get<ApiResponse<StoreProductsResponse>>(url);
    return response.data;
  },

  async createStore(data: CreateStoreDto): Promise<StoreResponse> {
    const response = await ApiService.post<ApiResponse<StoreResponse>>(
      "/api/stores",
      data
    );
    return response.data;
  },

  async updateStore(id: string, data: UpdateStoreDto): Promise<StoreResponse> {
    const response = await ApiService.put<ApiResponse<StoreResponse>>(
      `/api/stores/${id}`,
      data
    );
    return response.data;
  },

  async deleteStore(id: string): Promise<{ message: string }> {
    const response = await ApiService.delete<ApiResponse<{ message: string; store: StoreResponse }>>(
      `/api/stores/${id}`
    );
    return response.data;
  },
};
