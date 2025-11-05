"use client";

import { useState } from "react";
import Link from "next/link";
import { Package, AlertCircle, ShoppingCart } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Product } from "@/lib/types";
import { useCart } from "@/contexts/CartContext";
import { toast } from "@/components/ui/use-toast";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!product.isAvailable) {
      toast({
        title: "Producto no disponible",
        description: "Este producto está agotado",
        variant: "destructive",
      });
      return;
    }

    addToCart(product, quantity);
    toast({
      title: "Agregado al carrito",
      description: `${quantity} ${quantity === 1 ? 'unidad' : 'unidades'} de ${product.name}`,
    });
    setQuantity(1);
  };

  return (
    <Link href={`/products/${product.id}`} className="block group">
      <Card className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col">
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
            {product.isAvailable ? (
              <Badge className="bg-success/10 text-success border-success/20 flex-shrink-0">
                En Stock
              </Badge>
            ) : (
              <Badge className="bg-destructive/10 text-destructive border-destructive/20 flex-shrink-0">
                Agotado
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-3 flex-1 flex flex-col">
          {product.description && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {product.description}
            </p>
          )}

          <div className="flex items-center justify-between pt-2">
            <p className="text-2xl font-bold text-primary">
              S/ {parseFloat(product.price).toFixed(2)}
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

          <div className="mt-auto pt-4">
            <Button
              className="w-full gap-2"
              onClick={handleAddToCart}
              disabled={!product.isAvailable}
            >
              <ShoppingCart className="h-4 w-4" />
              Agregar al carrito
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;
