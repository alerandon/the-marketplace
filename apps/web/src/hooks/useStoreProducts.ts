"use client";

import { useQuery } from "@tanstack/react-query";
import { storesService } from "@/services/stores.service";

export function useStoreProducts(storeId: string) {
  return useQuery({
    queryKey: ["store-products", storeId],
    queryFn: () => storesService.getStoreProducts(storeId),
    enabled: !!storeId,
  });
}
