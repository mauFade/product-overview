import { IReview } from "../dto";
import { IReviewRepository } from "../model/review-repository-interface";

interface ResponseInterface {
  id: string;
  productId: string;
  author: string;
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}

export class CreateReviewUsecase {
  private readonly reviewRepository: IReviewRepository;

  private constructor(reviewRepository: IReviewRepository) {
    this.reviewRepository = reviewRepository;
  }

  public static getInstance(
    reviewRepository: IReviewRepository
  ): CreateReviewUsecase {
    return new CreateReviewUsecase(reviewRepository);
  }

  public async execute(data: IReview): Promise<ResponseInterface> {
    const review = await this.reviewRepository.create(data);

    return {
      id: review.id,
      productId: review.productId,
      author: review.author,
      rating: review.rating,
      comment: review.comment,
      createdAt: review.createdAt,
      updatedAt: review.updatedAt,
    };
  }
}
