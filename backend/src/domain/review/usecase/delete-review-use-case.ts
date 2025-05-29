import { IReviewRepository } from "../model/review-repository-interface";

export class DeleteReviewUsecase {
  private readonly reviewRepository: IReviewRepository;

  private constructor(reviewRepository: IReviewRepository) {
    this.reviewRepository = reviewRepository;
  }

  public static getInstance(
    reviewRepository: IReviewRepository
  ): DeleteReviewUsecase {
    return new DeleteReviewUsecase(reviewRepository);
  }

  public async execute(id: string): Promise<void> {
    await this.reviewRepository.delete(id);
  }
}
