"use client";

import { useQuery } from "@tanstack/react-query";
import { storesService } from "@/services/stores.service";

interface UseStoreProductsParams {
  page?: number;
  limit?: number;
  q?: string;
  inStock?: boolean;
}

export function useStoreProducts(
  storeId: string,
  params?: UseStoreProductsParams
) {
  return useQuery({
    queryKey: ["store-products", storeId, params?.page, params?.limit, params?.q, params?.inStock],
    queryFn: () => storesService.getStoreProducts(storeId, params),
    enabled: !!storeId,
  });
}
