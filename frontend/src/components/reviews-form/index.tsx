"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RatingStars } from "../rating-stars";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/app/api/api";
import { toast } from "sonner";

interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

const reviewSchema = z.object({
  author: z.string().min(1, "Nome é obrigatório"),
  rating: z
    .number()
    .min(1, "Avaliação é obrigatória")
    .max(5, "Avaliação máxima é 5"),
  comment: z.string().min(1, "Comentário é obrigatório"),
});

type ReviewFormData = z.infer<typeof reviewSchema>;

interface ReviewFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productId: string;
  review?: Review;
}

const ReviewForm = ({
  onOpenChange,
  open,
  productId,
  review,
}: ReviewFormProps) => {
  const form = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      author: review?.author || "",
      rating: review?.rating || 0,
      comment: review?.comment || "",
    },
  });

  const updateReview = useMutation({
    mutationFn: (data: {
      id: string;
      author?: string;
      rating?: number;
      comment?: string;
    }) => {
      return api.updateReview(data.id, data);
    },
    onSuccess: () => {
      toast.success("Review autalizado com sucesso");
    },
    onError: (err) => {
      console.error(err);
      toast.error("Erro ao autalizar review");
    },
  });

  const createReview = useMutation({
    mutationFn: (data: {
      productId: string;
      author: string;
      rating: number;
      comment: string;
    }) => {
      return api.createReview(data);
    },
    onSuccess: () => {
      toast.success("Review criado com sucesso");
    },
    onError: (err) => {
      console.error(err);
      toast.error("Erro ao criar review");
    },
  });

  const onSubmit = (data: ReviewFormData) => {
    if (review) {
      updateReview.mutate({ id: review.id, ...data });
    } else {
      createReview.mutate({ ...data, productId });
    }
    onOpenChange(false);
    form.reset();
  };

  const isLoading = createReview.isPending || updateReview.isPending;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {review ? "Editar Avaliação" : "Nova Avaliação"}
          </DialogTitle>
          <DialogDescription>
            {review
              ? "Edite sua avaliação do produto."
              : "Compartilhe sua experiência com este produto."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Seu nome" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Avaliação</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <RatingStars
                        rating={field.value}
                        interactive
                        onRatingChange={field.onChange}
                        size="lg"
                      />
                      <span className="text-sm text-muted-foreground">
                        {field.value > 0
                          ? `${field.value}/5`
                          : "Clique para avaliar"}
                      </span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Comentário</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Conte sobre sua experiência com o produto..."
                      className="resize-none"
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Salvando..." : review ? "Atualizar" : "Publicar"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewForm;
