import { Request, Response } from "express";
import { updateReviewUsecaseFactory } from "../factory/update-review-usecase-factory";

export class UpdateReviewController {
  static async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { author, rating, comment } = request.body;

    const reviewService = updateReviewUsecaseFactory();

    const review = await reviewService.execute({
      id,
      data: { author, rating, comment },
    });

    return response.status(200).json(review);
  }
}
