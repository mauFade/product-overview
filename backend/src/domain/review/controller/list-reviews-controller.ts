import { Request, Response } from "express";
import { listReviewsUsecaseFactory } from "../factory/list-reviews-usecase-factory";

export class ListReviewsController {
  static async handle(request: Request, response: Response): Promise<Response> {
    const { productId } = request.params;

    const reviewService = listReviewsUsecaseFactory();

    const reviews = await reviewService.execute(productId);

    return response.status(200).json(reviews);
  }
}
