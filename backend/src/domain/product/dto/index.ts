export interface IProduct {
  name: string;
  description: string;
  price: number;
  category: string;
}

export interface CreateProductResponseDTO extends IProduct {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductConstructorDTO extends IProduct {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}
