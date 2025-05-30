"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import ReviewsList from "@/components/reviews-list";
import { ProductRatingSummary } from "@/components/product-rating-summary";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/app/api/api";

interface ProductPageDetailProps {
  id: string;
}

const ProductPageDetail = ({ id }: ProductPageDetailProps) => {
  const router = useRouter();

  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => {
      return api.getProducts();
    },
  });

  const product = products?.find((p) => p.id === id);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <div className="space-y-6">
          <Skeleton className="h-8 w-64" />
          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2 space-y-6">
              <Skeleton className="h-64 w-full" />
              <Skeleton className="h-32 w-full" />
            </div>
            <Skeleton className="h-48 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto py-8">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-muted-foreground mb-4">
                Produto não encontrado.
              </p>
              <Button onClick={() => router.push("/")}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar ao Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => router.push("/dashboard")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{product.name}</CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-2">
                      <Badge variant="secondary">{product.category}</Badge>
                      <span className="text-2xl font-bold text-green-600">
                        {formatPrice(product.price)}
                      </span>
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Edit className="mr-2 h-4 w-4" />
                    Editar
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{product.description}</p>
              </CardContent>
            </Card>

            <ReviewsList productId={id} />
          </div>

          <div className="space-y-6">
            <ProductRatingSummary productId={id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPageDetail;
