import { Router } from "express";
import { CreateReviewController } from "@domain/review/controller/create-review-controller";
import { ListReviewsController } from "@domain/review/controller/list-reviews-controller";
import { UpdateReviewController } from "@domain/review/controller/update-review-controller";
import { DeleteReviewController } from "@domain/review/controller/delete-review-controller";
import { GetProductAverageRatingController } from "@domain/review/controller/get-product-average-rating-controller";
import {
  CreateReviewValidator,
  UpdateReviewValidator,
  DeleteReviewValidator,
  ListReviewsValidator,
} from "@domain/review/validator";

const reviewRoutes = Router();

reviewRoutes.post("/", CreateReviewValidator, CreateReviewController.handle);
reviewRoutes.get(
  "/product/:productId",
  ListReviewsValidator,
  ListReviewsController.handle
);
reviewRoutes.get(
  "/product/:productId/average",
  ListReviewsValidator,
  GetProductAverageRatingController.handle
);
reviewRoutes.put("/:id", UpdateReviewValidator, UpdateReviewController.handle);
reviewRoutes.delete(
  "/:id",
  DeleteReviewValidator,
  DeleteReviewController.handle
);

export { reviewRoutes };
