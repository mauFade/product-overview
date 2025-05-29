import { Router } from "express";
import { userRoutes } from "./user";
import { productRoutes } from "./product";
import { reviewRoutes } from "./review";

const routes = Router();

routes.use("/users", userRoutes);
routes.use("/products", productRoutes);
routes.use("/reviews", reviewRoutes);

export { routes };
