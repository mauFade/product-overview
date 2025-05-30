import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { RatingStars } from "../rating-stars";
import ReviewForm from "../reviews-form";
import { useState } from "react";
import { api } from "../../app/api/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Edit, MessageSquare, MoreHorizontal, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface ReviewsListProps {
  productId: string;
}

interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

const ReviewsList = ({ productId }: ReviewsListProps) => {
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [deletingReview, setDeletingReview] = useState<Review | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const {
    data: reviews,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["reviews", productId],
    queryFn: () => {
      return api.getReviewsByProduct(productId);
    },
  });
  const deleteReview = useMutation({
    mutationFn: (id: string) => {
      return api.deleteReview(id);
    },
  });

  const handleDelete = async () => {
    if (deletingReview) {
      deleteReview.mutate(deletingReview.id);
      setDeletingReview(null);
    }
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "dd/MM/yyyy 'às' HH:mm", {
      locale: ptBR,
    });
  };

  if (error) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center text-red-600">
            Erro ao carregar avaliações: {error.message}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Avaliações</h3>
        <Button onClick={() => setShowCreateForm(true)}>
          <MessageSquare className="mr-2 h-4 w-4" />
          Escrever Avaliação
        </Button>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-20" />
                </div>
                <Skeleton className="h-4 w-24" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-16 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : reviews && reviews.length > 0 ? (
        <div className="space-y-4">
          {reviews.map((review) => (
            <Card key={review.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{review.author}</span>
                    <RatingStars rating={review.rating} size="sm" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      {formatDate(review.createdAt)}
                    </span>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Abrir menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => setEditingReview(review)}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => setDeletingReview(review)}
                          className="text-red-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {review.comment}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-4">
                Ainda não há avaliações para este produto.
              </p>
              <Button onClick={() => setShowCreateForm(true)}>
                Seja o primeiro a avaliar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <ReviewForm
        open={showCreateForm}
        onOpenChange={setShowCreateForm}
        productId={productId}
      />

      <ReviewForm
        open={!!editingReview}
        onOpenChange={(open) => !open && setEditingReview(null)}
        productId={productId}
        review={editingReview || undefined}
      />

      <AlertDialog
        open={!!deletingReview}
        onOpenChange={(open) => !open && setDeletingReview(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir esta avaliação? Esta ação não pode
              ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
              disabled={deleteReview.isPending}
            >
              {deleteReview.isPending ? "Excluindo..." : "Excluir"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ReviewsList;
