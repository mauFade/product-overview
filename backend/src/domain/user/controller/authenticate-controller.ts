import { Request, Response } from "express";
import { authenticateFactory } from "../factory/authenticate-factory";

export class AuthenticateController {
  static async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateService = authenticateFactory();

    const res = await authenticateService.execute({ email, password });

    return response.status(200).json(res);
  }
}
