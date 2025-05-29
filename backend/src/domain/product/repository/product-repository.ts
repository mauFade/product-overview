import { CreateProductResponseDTO, IProduct } from "../dto";
import {
  IProductRepository,
  Product,
  ProductModel,
} from "../model/product-repository-interface";

export class ProductRepository implements IProductRepository {
  private readonly productModel: typeof ProductModel;

  private constructor(productModel: typeof ProductModel) {
    this.productModel = productModel;
  }

  public static getInstance(): ProductRepository {
    return new ProductRepository(ProductModel);
  }

  public async findById(id: string): Promise<Product | undefined> {
    const product = await this.productModel.findById(id);
    if (!product) return undefined;

    return Product.newProduct({
      id: product._id.toString(),
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    });
  }

  public async findAll(): Promise<Product[]> {
    const products = await this.productModel.find();
    return products.map((product) =>
      Product.newProduct({
        id: product._id.toString(),
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
      })
    );
  }

  public async create(data: IProduct): Promise<CreateProductResponseDTO> {
    const now = new Date();
    const product = await this.productModel.create({
      ...data,
      createdAt: now,
      updatedAt: now,
    });

    return {
      id: product._id.toString(),
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  }

  public async update(id: string, data: Partial<IProduct>): Promise<Product> {
    const product = await this.productModel.findByIdAndUpdate(
      id,
      { ...data, updatedAt: new Date() },
      { new: true }
    );

    if (!product) throw new Error("Product not found");

    return Product.newProduct({
      id: product._id.toString(),
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    });
  }

  public async delete(id: string): Promise<void> {
    const result = await this.productModel.findByIdAndDelete(id);
    if (!result) throw new Error("Product not found");
  }
}
