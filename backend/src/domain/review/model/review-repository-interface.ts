import { CreateReviewResponseDTO, IReview, ReviewConstructorDTO } from "../dto";
import mongoose, { Schema } from "mongoose";

const ReviewSchema = new Schema({
  productId: { type: String, required: true },
  author: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const ReviewModel = mongoose.model("Review", ReviewSchema);

export class Review {
  private id: string;
  private productId: string;
  private author: string;
  private rating: number;
  private comment: string;
  private createdAt: Date;
  private updatedAt: Date;

  private constructor(data: ReviewConstructorDTO) {
    this.id = data.id;
    this.productId = data.productId;
    this.author = data.author;
    this.rating = data.rating;
    this.comment = data.comment;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  public static newReview(data: ReviewConstructorDTO): Review {
    return new Review(data);
  }

  public getId(): string {
    return this.id;
  }

  public getProductId(): string {
    return this.productId;
  }

  public getAuthor(): string {
    return this.author;
  }

  public getRating(): number {
    return this.rating;
  }

  public getComment(): string {
    return this.comment;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getUpdatedAt(): Date {
    return this.updatedAt;
  }
}

export interface IReviewRepository {
  create(data: IReview): Promise<CreateReviewResponseDTO>;
  findById(id: string): Promise<Review | undefined>;
  findByProductId(productId: string): Promise<Review[]>;
  update(id: string, data: Partial<IReview>): Promise<Review>;
  delete(id: string): Promise<void>;
  getAverageRatingByProduct(productId: string): Promise<{
    productId: string;
    averageRating: number;
    totalReviews: number;
  }>;
}
