"use client";
import { useState } from "react";
import { MessageSquare, Star, TrendingUp } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../api/api";
import { RatingStars } from "@/components/rating-stars";

const ProductRatingCard = ({
  productId,
  productName,
  category,
}: {
  productId: string;
  productName: string;
  category: string;
}) => {
  const { data: ratingData, isLoading } = useQuery({
    queryKey: ["rating-data", productId],
    queryFn: () => {
      return api.getAverageRating(productId);
    },
  });

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">{productName}</CardTitle>
            <CardDescription>
              <Badge variant="secondary">{category}</Badge>
            </CardDescription>
          </div>
          {isLoading ? (
            <Skeleton className="h-6 w-16" />
          ) : ratingData ? (
            <div className="text-right">
              <div className="flex items-center gap-1">
                <RatingStars rating={ratingData.averageRating} size="sm" />
                <span className="font-bold">
                  {ratingData.averageRating.toFixed(1)}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                {ratingData.totalReviews} avaliações
              </p>
            </div>
          ) : (
            <span className="text-sm text-muted-foreground">
              Sem avaliações
            </span>
          )}
        </div>
      </CardHeader>
    </Card>
  );
};

const ReviewsDashboard = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => {
      return api.getProducts();
    },
  });

  const categories = products
    ? Array.from(new Set(products.map((p) => p.category)))
    : [];
  const filteredProducts =
    products?.filter(
      (product) =>
        selectedCategory === "all" || product.category === selectedCategory
    ) || [];

  return (
    <div className="container mx-auto py-8">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Central de Avaliações
            </h1>
            <p className="text-muted-foreground">
              Visualize e gerencie todas as avaliações dos produtos
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total de Produtos
              </CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {isLoading ? (
                  <Skeleton className="h-8 w-16" />
                ) : (
                  products?.length || 0
                )}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Categorias</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {isLoading ? (
                  <Skeleton className="h-8 w-16" />
                ) : (
                  categories.length
                )}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Avaliação Média
              </CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.2</div>
              <p className="text-xs text-muted-foreground">
                Geral dos produtos
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total de Reviews
              </CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">127</div>
              <p className="text-xs text-muted-foreground">
                Todas as avaliações
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="flex items-center gap-4">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filtrar por categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as categorias</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-32 w-full" />
              ))
            : filteredProducts.map((product) => (
                <ProductRatingCard
                  key={product.id}
                  productId={product.id}
                  productName={product.name}
                  category={product.category}
                />
              ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewsDashboard;
