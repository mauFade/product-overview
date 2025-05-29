import { IUserRepository } from "../model/user-repository-interface";
import { IBCryptRepository } from "../../../infra/bcrypt/model";
import { AuthenticateError } from "../../errors";
import jwt from "jsonwebtoken";

interface RequestDTO {
  email: string;
  password: string;
}

interface ResponseDTO {
  id: string;
  name: string;
  token: string;
}

export class AuthenticateUseCase {
  private readonly userRepository: IUserRepository;
  private readonly bCryptAdapter: IBCryptRepository;

  private constructor(
    userRepository: IUserRepository,
    bCryptAdapter: IBCryptRepository
  ) {
    this.userRepository = userRepository;
    this.bCryptAdapter = bCryptAdapter;
  }

  public static getInstance(
    userRepository: IUserRepository,
    bCryptAdapter: IBCryptRepository
  ): AuthenticateUseCase {
    return new AuthenticateUseCase(userRepository, bCryptAdapter);
  }

  public async execute(data: RequestDTO): Promise<ResponseDTO> {
    const user = await this.userRepository.findByEmail(data.email);

    if (!user) throw new AuthenticateError("Email not found");

    const isValidPassword = await this.bCryptAdapter.compare(
      data.password,
      user.getPassword()
    );

    if (!isValidPassword) throw new AuthenticateError("Invalid password");

    const tokenValidator = await this.bCryptAdapter.create("authentication");

    const token = jwt.sign(
      {
        user: {
          id: user.getId(),
          email: user.getEmail(),
        },
        tokenValidator,
      },
      "user-auth",
      {
        expiresIn: "1d",
      }
    );

    return {
      id: user.getId(),
      name: user.getName(),
      token,
    };
  }
}
