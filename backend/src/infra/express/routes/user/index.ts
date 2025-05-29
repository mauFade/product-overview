import { Router } from "express";
import { CreateUserController } from "../../../../domain/user/controller/create-user-controller";
import {
  AuthenticateValidator,
  CreateUserValidator,
} from "../../../../domain/user/validator";
import { AuthenticateController } from "../../../../domain/user/controller/authenticate-controller";

const userRoutes = Router();

userRoutes.post("/", CreateUserValidator, CreateUserController.handle);
userRoutes.post(
  "/authenticate",
  AuthenticateValidator,
  AuthenticateController.handle
);

export { userRoutes };
