import { reviewRepositoryFactory } from "../repository/review-repository-factory";
import { ListReviewsUsecase } from "../usecase/list-reviews-use-case";

export function listReviewsUsecaseFactory(): ListReviewsUsecase {
  return ListReviewsUsecase.getInstance(reviewRepositoryFactory());
}
