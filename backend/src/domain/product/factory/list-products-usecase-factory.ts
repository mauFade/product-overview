import { productRepositoryFactory } from "../repository/product-repository-factory";
import { ListProductsUsecase } from "../usecase/list-products-use-case";

export function listProductsUsecaseFactory(): ListProductsUsecase {
  return ListProductsUsecase.getInstance(productRepositoryFactory());
}
