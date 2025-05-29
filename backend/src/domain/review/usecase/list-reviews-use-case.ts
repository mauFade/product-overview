import { IReviewRepository } from "../model/review-repository-interface";

interface ReviewResponse {
  id: string;
  productId: string;
  author: string;
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}

export class ListReviewsUsecase {
  private readonly reviewRepository: IReviewRepository;

  private constructor(reviewRepository: IReviewRepository) {
    this.reviewRepository = reviewRepository;
  }

  public static getInstance(
    reviewRepository: IReviewRepository
  ): ListReviewsUsecase {
    return new ListReviewsUsecase(reviewRepository);
  }

  public async execute(productId: string): Promise<ReviewResponse[]> {
    const reviews = await this.reviewRepository.findByProductId(productId);

    return reviews.map((review) => ({
      id: review.getId(),
      productId: review.getProductId(),
      author: review.getAuthor(),
      rating: review.getRating(),
      comment: review.getComment(),
      createdAt: review.getCreatedAt(),
      updatedAt: review.getUpdatedAt(),
    }));
  }
}
