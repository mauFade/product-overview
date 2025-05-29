import { ProductRepository } from "./product-repository";

export function productRepositoryFactory(): ProductRepository {
  return ProductRepository.getInstance();
}
