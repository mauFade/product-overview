import { reviewRepositoryFactory } from "../repository/review-repository-factory";
import { GetProductAverageRatingUsecase } from "../usecase/get-product-average-rating-use-case";

export function getProductAverageRatingUsecaseFactory(): GetProductAverageRatingUsecase {
  return GetProductAverageRatingUsecase.getInstance(reviewRepositoryFactory());
}
