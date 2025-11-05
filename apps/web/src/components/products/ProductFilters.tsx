"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface ProductFiltersProps {
  showOnlyInStock: boolean;
}

export default function ProductFilters({ showOnlyInStock }: ProductFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleToggleInStock = (checked: boolean) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    if (checked) {
      current.set("inStock", "true");
    } else {
      current.delete("inStock");
    }

    // Reset page to 1 when filters change
    current.delete("page");

    const search = current.toString();
    const query = search ? `?${search}` : "";

    router.replace(`${pathname}${query}`);
  };

  return (
    <div className="flex items-center gap-3 p-4 bg-card border border-border rounded-lg">
      <Switch
        id="in-stock"
        checked={showOnlyInStock}
        onCheckedChange={handleToggleInStock}
      />
      <Label htmlFor="in-stock" className="cursor-pointer font-medium">
        Mostrar solo productos en stock
      </Label>
    </div>
  );
}
