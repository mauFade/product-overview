import { Request, Response } from "express";
import { createProductUsecaseFactory } from "../factory/create-product-usecase-factory";

export class CreateProductController {
  static async handle(request: Request, response: Response): Promise<Response> {
    const { name, description, price, category } = request.body;

    const productService = createProductUsecaseFactory();

    const product = await productService.execute({
      name,
      description,
      price,
      category,
    });

    return response.status(201).json(product);
  }
}
