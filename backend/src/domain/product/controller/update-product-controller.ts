import { Request, Response } from "express";
import { updateProductUsecaseFactory } from "../factory/update-product-usecase-factory";

export class UpdateProductController {
  static async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, description, price, category } = request.body;

    const productService = updateProductUsecaseFactory();

    const product = await productService.execute({
      id,
      data: { name, description, price, category },
    });

    return response.status(200).json(product);
  }
}
