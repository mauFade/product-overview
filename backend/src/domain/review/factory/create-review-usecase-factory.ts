import { reviewRepositoryFactory } from "../repository/review-repository-factory";
import { CreateReviewUsecase } from "../usecase/create-review-use-case";

export function createReviewUsecaseFactory(): CreateReviewUsecase {
  return CreateReviewUsecase.getInstance(reviewRepositoryFactory());
}
