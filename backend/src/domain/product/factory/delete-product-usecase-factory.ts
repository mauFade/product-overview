import { productRepositoryFactory } from "../repository/product-repository-factory";
import { DeleteProductUsecase } from "../usecase/delete-product-use-case";

export function deleteProductUsecaseFactory(): DeleteProductUsecase {
  return DeleteProductUsecase.getInstance(productRepositoryFactory());
}
