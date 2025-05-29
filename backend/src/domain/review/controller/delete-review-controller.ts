import { Request, Response } from "express";
import { deleteReviewUsecaseFactory } from "../factory/delete-review-usecase-factory";

export class DeleteReviewController {
  static async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const reviewService = deleteReviewUsecaseFactory();

    await reviewService.execute(id);

    return response.status(204).send();
  }
}
