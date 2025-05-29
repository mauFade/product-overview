import { Request, Response } from "express";
import { createReviewUsecaseFactory } from "../factory/create-review-usecase-factory";

export class CreateReviewController {
  static async handle(request: Request, response: Response): Promise<Response> {
    const { productId, author, rating, comment } = request.body;

    const reviewService = createReviewUsecaseFactory();

    const review = await reviewService.execute({
      productId,
      author,
      rating,
      comment,
    });

    return response.status(201).json(review);
  }
}
