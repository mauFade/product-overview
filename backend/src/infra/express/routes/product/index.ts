import { Router } from "express";
import { CreateProductController } from "@domain/product/controller/create-product-controller";
import { ListProductsController } from "@domain/product/controller/list-products-controller";
import { UpdateProductController } from "@domain/product/controller/update-product-controller";
import { DeleteProductController } from "@domain/product/controller/delete-product-controller";
import {
  CreateProductValidator,
  UpdateProductValidator,
  DeleteProductValidator,
} from "@domain/product/validator";

const productRoutes = Router();

productRoutes.post("/", CreateProductValidator, CreateProductController.handle);
productRoutes.get("/", ListProductsController.handle);
productRoutes.put(
  "/:id",
  UpdateProductValidator,
  UpdateProductController.handle
);
productRoutes.delete(
  "/:id",
  DeleteProductValidator,
  DeleteProductController.handle
);

export { productRoutes };
