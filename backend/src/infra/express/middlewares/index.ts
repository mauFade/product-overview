import { CelebrateError, Joi } from "celebrate";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AuthenticateError } from "@domain/errors";

interface TokenDecodeProps {
  iat: number;
  exp: number;
  tokenValidator: string;
  user: {
    id: string;
    email: string;
  };
}

export async function verifyAuth(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  try {
    const { authorization } = req.headers;

    const { error } = Joi.object()
      .keys({
        authorization: Joi.string().required(),
      })
      .validate({ authorization });

    const [bearer, token] = authorization?.split(" ") as string[];

    if (
      bearer.toLowerCase() !== "bearer" ||
      !token ||
      token.split(".").length !== 3
    ) {
      throw new AuthenticateError("The custom token format is incorrect.");
    }

    if (error) {
      throw new CelebrateError(error.message, {
        celebrated: true,
      });
    }

    const tokenDecoded = jwt.verify(token, "user-auth") as TokenDecodeProps;

    req.user = {
      id: tokenDecoded.user.id,
      email: tokenDecoded.user.email,
    };

    return next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      throw new AuthenticateError("This token is expired, login again");
    }

    throw error;
  }
}
