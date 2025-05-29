import { IProductRepository } from "../model/product-repository-interface";

interface ProductResponse {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

export class ListProductsUsecase {
  private readonly productRepository: IProductRepository;

  private constructor(productRepository: IProductRepository) {
    this.productRepository = productRepository;
  }

  public static getInstance(
    productRepository: IProductRepository
  ): ListProductsUsecase {
    return new ListProductsUsecase(productRepository);
  }

  public async execute(): Promise<ProductResponse[]> {
    const products = await this.productRepository.findAll();

    return products.map((product) => ({
      id: product.getId(),
      name: product.getName(),
      description: product.getDescription(),
      price: product.getPrice(),
      category: product.getCategory(),
      createdAt: product.getCreatedAt(),
      updatedAt: product.getUpdatedAt(),
    }));
  }
}
