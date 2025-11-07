"use client";

import Link from "next/link";
import Image from "next/image";
import { Package, AlertCircle, ImageIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/lib/types";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link href={`/products/${product.id}`} className="block group">
      <Card className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col overflow-hidden">
        {/* Imagen del producto */}
        <div className="relative w-full h-48 bg-muted overflow-hidden">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="flex items-center justify-center h-full bg-gradient-to-br from-muted to-muted/50">
              <ImageIcon className="h-16 w-16 text-muted-foreground/30" />
            </div>
          )}
          {/* Badge de disponibilidad sobre la imagen */}
          <div className="absolute top-2 right-2">
            {product.isAvailable ? (
              <Badge className="bg-success/90 text-white border-success/20 backdrop-blur-sm">
                En Stock
              </Badge>
            ) : (
              <Badge className="bg-destructive/90 text-white border-destructive/20 backdrop-blur-sm">
                Agotado
              </Badge>
            )}
          </div>
        </div>

        <CardHeader>
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <CardTitle className="text-lg truncate group-hover:text-primary transition-colors">
                {product.name}
              </CardTitle>
              <CardDescription className="mt-1 truncate">
                SKU: {product.sku}
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-3 flex-1 flex flex-col">
          {product.description && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {product.description}
            </p>
          )}

          <div className="flex items-center justify-between pt-2 mt-auto">
            <p className="text-2xl font-bold text-primary">
              $ {parseFloat(product.price).toFixed(2)}
            </p>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              {product.isAvailable ? (
                <>
                  <Package className="h-4 w-4" />
                  <span>{product.stock} unidades</span>
                </>
              ) : (
                <>
                  <AlertCircle className="h-4 w-4 text-destructive" />
                  <span className="text-destructive">Sin stock</span>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;
