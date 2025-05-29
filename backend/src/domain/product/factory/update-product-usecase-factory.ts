import { productRepositoryFactory } from "../repository/product-repository-factory";
import { UpdateProductUsecase } from "../usecase/update-product-use-case";

export function updateProductUsecaseFactory(): UpdateProductUsecase {
  return UpdateProductUsecase.getInstance(productRepositoryFactory());
}
