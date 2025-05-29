import { IProductRepository } from "../model/product-repository-interface";

export class DeleteProductUsecase {
  private readonly productRepository: IProductRepository;

  private constructor(productRepository: IProductRepository) {
    this.productRepository = productRepository;
  }

  public static getInstance(
    productRepository: IProductRepository
  ): DeleteProductUsecase {
    return new DeleteProductUsecase(productRepository);
  }

  public async execute(id: string): Promise<void> {
    await this.productRepository.delete(id);
  }
}
