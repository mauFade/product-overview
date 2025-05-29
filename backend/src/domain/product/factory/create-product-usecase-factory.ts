import { productRepositoryFactory } from "../repository/product-repository-factory";
import { CreateProductUsecase } from "../usecase/create-product-use-case";

export function createProductUsecaseFactory(): CreateProductUsecase {
  return CreateProductUsecase.getInstance(productRepositoryFactory());
}
