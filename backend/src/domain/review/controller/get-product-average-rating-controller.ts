import { Request, Response } from "express";
import { getProductAverageRatingUsecaseFactory } from "../factory/get-product-average-rating-usecase-factory";

export class GetProductAverageRatingController {
  static async handle(request: Request, response: Response): Promise<Response> {
    const { productId } = request.params;

    const reviewService = getProductAverageRatingUsecaseFactory();

    const result = await reviewService.execute(productId);

    return response.status(200).json(result);
  }
}
