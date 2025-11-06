"use client";

import { useQuery } from "@tanstack/react-query";
import { productsService } from "@/services/products.service";

export function useProduct(id: string) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => productsService.getProductById(id),
    enabled: !!id,
  });
}
