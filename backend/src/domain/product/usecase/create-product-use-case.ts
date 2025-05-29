import { IProduct } from "../dto";
import { IProductRepository } from "../model/product-repository-interface";

interface ResponseInterface {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

export class CreateProductUsecase {
  private readonly productRepository: IProductRepository;

  private constructor(productRepository: IProductRepository) {
    this.productRepository = productRepository;
  }

  public static getInstance(
    productRepository: IProductRepository
  ): CreateProductUsecase {
    return new CreateProductUsecase(productRepository);
  }

  public async execute(data: IProduct): Promise<ResponseInterface> {
    const product = await this.productRepository.create(data);

    return {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  }
}
