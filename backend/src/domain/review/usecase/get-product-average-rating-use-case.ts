import { IReviewRepository } from "../model/review-repository-interface";

interface ResponseDTO {
  productId: string;
  averageRating: number;
  totalReviews: number;
}

export class GetProductAverageRatingUsecase {
  private readonly reviewRepository: IReviewRepository;

  private constructor(reviewRepository: IReviewRepository) {
    this.reviewRepository = reviewRepository;
  }

  public static getInstance(
    reviewRepository: IReviewRepository
  ): GetProductAverageRatingUsecase {
    return new GetProductAverageRatingUsecase(reviewRepository);
  }

  public async execute(productId: string): Promise<ResponseDTO> {
    const result = await this.reviewRepository.getAverageRatingByProduct(
      productId
    );
    return result;
  }
}
