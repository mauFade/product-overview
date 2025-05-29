import { IProduct } from "../dto";
import { IProductRepository } from "../model/product-repository-interface";

interface RequestDTO {
  id: string;
  data: Partial<IProduct>;
}

interface ResponseDTO {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

export class UpdateProductUsecase {
  private readonly productRepository: IProductRepository;

  private constructor(productRepository: IProductRepository) {
    this.productRepository = productRepository;
  }

  public static getInstance(
    productRepository: IProductRepository
  ): UpdateProductUsecase {
    return new UpdateProductUsecase(productRepository);
  }

  public async execute({ id, data }: RequestDTO): Promise<ResponseDTO> {
    const product = await this.productRepository.update(id, data);

    return {
      id: product.getId(),
      name: product.getName(),
      description: product.getDescription(),
      price: product.getPrice(),
      category: product.getCategory(),
      createdAt: product.getCreatedAt(),
      updatedAt: product.getUpdatedAt(),
    };
  }
}
