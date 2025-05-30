"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { RatingStars } from "../rating-stars";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/app/api/api";

interface ProductRatingSummaryProps {
  productId: string;
}

export function ProductRatingSummary({ productId }: ProductRatingSummaryProps) {
  const {
    data: ratingData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["rating-data", productId],
    queryFn: () => {
      return api.getAverageRating(productId);
    },
  });

  if (error) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Avaliação Geral</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-24" />
          </div>
        ) : ratingData ? (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <RatingStars rating={ratingData.averageRating} size="lg" />
              <span className="text-2xl font-bold">
                {ratingData.averageRating.toFixed(1)}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Baseado em {ratingData.totalReviews}{" "}
              {ratingData.totalReviews === 1 ? "avaliação" : "avaliações"}
            </p>
          </div>
        ) : (
          <div className="text-center text-muted-foreground">
            <p>Nenhuma avaliação ainda</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
