import { Request, Response } from "express";
import { deleteProductUsecaseFactory } from "../factory/delete-product-usecase-factory";

export class DeleteProductController {
  static async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const productService = deleteProductUsecaseFactory();

    await productService.execute(id);

    return response.status(204).send();
  }
}
