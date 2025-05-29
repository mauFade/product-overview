import {
  CreateProductResponseDTO,
  IProduct,
  ProductConstructorDTO,
} from "../dto";
import mongoose, { Schema } from "mongoose";

const ProductSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const ProductModel = mongoose.model("Product", ProductSchema);

export class Product {
  private id: string;
  private name: string;
  private description: string;
  private price: number;
  private category: string;
  private createdAt: Date;
  private updatedAt: Date;

  private constructor(data: ProductConstructorDTO) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.price = data.price;
    this.category = data.category;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  public static newProduct(data: ProductConstructorDTO): Product {
    return new Product(data);
  }

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getDescription(): string {
    return this.description;
  }

  public getPrice(): number {
    return this.price;
  }

  public getCategory(): string {
    return this.category;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getUpdatedAt(): Date {
    return this.updatedAt;
  }
}

export interface IProductRepository {
  create(data: IProduct): Promise<CreateProductResponseDTO>;
  findById(id: string): Promise<Product | undefined>;
  findAll(): Promise<Product[]>;
  update(id: string, data: Partial<IProduct>): Promise<Product>;
  delete(id: string): Promise<void>;
}
