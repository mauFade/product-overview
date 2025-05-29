import { reviewRepositoryFactory } from "../repository/review-repository-factory";
import { DeleteReviewUsecase } from "../usecase/delete-review-use-case";

export function deleteReviewUsecaseFactory(): DeleteReviewUsecase {
  return DeleteReviewUsecase.getInstance(reviewRepositoryFactory());
}
