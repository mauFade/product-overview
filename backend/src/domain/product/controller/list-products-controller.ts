import { Request, Response } from "express";
import { listProductsUsecaseFactory } from "../factory/list-products-usecase-factory";

export class ListProductsController {
  static async handle(request: Request, response: Response): Promise<Response> {
    const productService = listProductsUsecaseFactory();

    const products = await productService.execute();

    return response.status(200).json(products);
  }
}
