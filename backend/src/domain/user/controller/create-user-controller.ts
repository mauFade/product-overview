import { Request, Response } from "express";
import { createUserUsecaseFactory } from "../factory/create-user-usecase-factory";

export class CreateUserController {
  static async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const userService = createUserUsecaseFactory();

    const user = await userService.execute({ name, email, password });

    return response.status(201).json(user);
  }
}
