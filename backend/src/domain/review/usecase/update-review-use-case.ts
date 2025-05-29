import { IReview } from "../dto";
import { IReviewRepository } from "../model/review-repository-interface";

interface RequestDTO {
  id: string;
  data: Partial<IReview>;
}

interface ResponseDTO {
  id: string;
  productId: string;
  author: string;
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}

export class UpdateReviewUsecase {
  private readonly reviewRepository: IReviewRepository;

  private constructor(reviewRepository: IReviewRepository) {
    this.reviewRepository = reviewRepository;
  }

  public static getInstance(
    reviewRepository: IReviewRepository
  ): UpdateReviewUsecase {
    return new UpdateReviewUsecase(reviewRepository);
  }

  public async execute({ id, data }: RequestDTO): Promise<ResponseDTO> {
    const review = await this.reviewRepository.update(id, data);

    return {
      id: review.getId(),
      productId: review.getProductId(),
      author: review.getAuthor(),
      rating: review.getRating(),
      comment: review.getComment(),
      createdAt: review.getCreatedAt(),
      updatedAt: review.getUpdatedAt(),
    };
  }
}
