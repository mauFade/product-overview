import axios, { AxiosInstance } from "axios";
import { getCookie } from "cookies-next";

class Api {
  private axios: AxiosInstance;

  constructor() {
    this.axios = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    this.axios.interceptors.request.use((config) => {
      const token = getCookie("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

  public async signup(data: {
    name: string;
    email: string;
    password: string;
  }): Promise<{
    id: string;
    email: string;
    name: string;
    token: string;
  }> {
    const response = await this.axios.post(`/users`, data);
    return response.data;
  }

  public async login(data: { email: string; password: string }): Promise<{
    id: string;
    name: string;
    token: string;
  }> {
    const response = await this.axios.post(`/users/authenticate`, data);
    return response.data;
  }

  public async createReview(data: {
    productId: string;
    author: string;
    rating: number;
    comment: string;
  }): Promise<{
    id: string;
    productId: string;
    author: string;
    rating: number;
    comment: string;
    createdAt: string;
    updatedAt: string;
  }> {
    const response = await this.axios.post(`/reviews`, data);
    return response.data;
  }

  public async getReviewsByProduct(productId: string): Promise<
    {
      id: string;
      productId: string;
      author: string;
      rating: number;
      comment: string;
      createdAt: string;
      updatedAt: string;
    }[]
  > {
    const response = await this.axios.get(`/reviews/product/${productId}`);
    return response.data;
  }

  public async updateReview(
    id: string,
    data: {
      author?: string;
      rating?: number;
      comment?: string;
    }
  ): Promise<{
    id: string;
    productId: string;
    author: string;
    rating: number;
    comment: string;
    createdAt: string;
    updatedAt: string;
  }> {
    const response = await this.axios.put(`/reviews/${id}`, data);
    return response.data;
  }

  public async deleteReview(id: string): Promise<void> {
    await this.axios.delete(`/reviews/${id}`);
  }

  public async getAverageRating(productId: string): Promise<{
    productId: string;
    averageRating: number;
    totalReviews: number;
  }> {
    const response = await this.axios.get<{
      productId: string;
      averageRating: number;
      totalReviews: number;
    }>(`/reviews/product/${productId}/average`);
    return response.data;
  }

  public async createProduct(data: {
    name: string;
    description: string;
    price: number;
    category: string;
  }): Promise<{
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    createdAt: string;
    updatedAt: string;
  }> {
    const response = await this.axios.post(`/products`, data);
    return response.data;
  }

  public async getProducts(): Promise<
    {
      id: string;
      name: string;
      description: string;
      price: number;
      category: string;
      createdAt: string;
      updatedAt: string;
    }[]
  > {
    const response = await this.axios.get(`/products`);
    return response.data;
  }

  public async updateProduct(
    id: string,
    data: {
      name?: string;
      description?: string;
      price?: number;
      category?: string;
    }
  ): Promise<{
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    createdAt: string;
    updatedAt: string;
  }> {
    const response = await this.axios.put(`/products/${id}`, data);
    return response.data;
  }

  public async deleteProduct(id: string): Promise<void> {
    await this.axios.delete(`/products/${id}`);
  }
}

export const api = new Api();
