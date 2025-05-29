export interface IReview {
  productId: string;
  author: string;
  rating: number;
  comment: string;
}

export interface CreateReviewResponseDTO extends IReview {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ReviewConstructorDTO extends IReview {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}
