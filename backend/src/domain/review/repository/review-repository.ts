import { CreateReviewResponseDTO, IReview } from "../dto";
import {
  IReviewRepository,
  Review,
  ReviewModel,
} from "../model/review-repository-interface";

export class ReviewRepository implements IReviewRepository {
  private readonly reviewModel: typeof ReviewModel;

  private constructor(reviewModel: typeof ReviewModel) {
    this.reviewModel = reviewModel;
  }

  public static getInstance(): ReviewRepository {
    return new ReviewRepository(ReviewModel);
  }

  public async findById(id: string): Promise<Review | undefined> {
    const review = await this.reviewModel.findById(id);
    if (!review) return undefined;

    return Review.newReview({
      id: review._id.toString(),
      productId: review.productId,
      author: review.author,
      rating: review.rating,
      comment: review.comment,
      createdAt: review.createdAt,
      updatedAt: review.updatedAt,
    });
  }

  public async findByProductId(productId: string): Promise<Review[]> {
    const reviews = await this.reviewModel.find({ productId });
    return reviews.map((review) =>
      Review.newReview({
        id: review._id.toString(),
        productId: review.productId,
        author: review.author,
        rating: review.rating,
        comment: review.comment,
        createdAt: review.createdAt,
        updatedAt: review.updatedAt,
      })
    );
  }

  public async create(data: IReview): Promise<CreateReviewResponseDTO> {
    const now = new Date();
    const review = await this.reviewModel.create({
      ...data,
      createdAt: now,
      updatedAt: now,
    });

    return {
      id: review._id.toString(),
      productId: review.productId,
      author: review.author,
      rating: review.rating,
      comment: review.comment,
      createdAt: review.createdAt,
      updatedAt: review.updatedAt,
    };
  }

  public async update(id: string, data: Partial<IReview>): Promise<Review> {
    const review = await this.reviewModel.findByIdAndUpdate(
      id,
      { ...data, updatedAt: new Date() },
      { new: true }
    );

    if (!review) throw new Error("Review not found");

    return Review.newReview({
      id: review._id.toString(),
      productId: review.productId,
      author: review.author,
      rating: review.rating,
      comment: review.comment,
      createdAt: review.createdAt,
      updatedAt: review.updatedAt,
    });
  }

  public async delete(id: string): Promise<void> {
    const result = await this.reviewModel.findByIdAndDelete(id);
    if (!result) throw new Error("Review not found");
  }
}
