import { reviewRepositoryFactory } from "../repository/review-repository-factory";
import { UpdateReviewUsecase } from "../usecase/update-review-use-case";

export function updateReviewUsecaseFactory(): UpdateReviewUsecase {
  return UpdateReviewUsecase.getInstance(reviewRepositoryFactory());
}
