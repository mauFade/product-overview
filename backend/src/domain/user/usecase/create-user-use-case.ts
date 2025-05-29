import { IBCryptRepository } from "../../../infra/bcrypt/model";
import { IUser } from "../dto";
import { IUserRepository } from "../model/user-repository-interface";
import jwt from "jsonwebtoken";

interface ResponseInterface {
  id: string;
  email: string;
  name: string;
  token: string;
}

export class CreateUserUsecase {
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
  ): CreateUserUsecase {
    return new CreateUserUsecase(userRepository, bCryptAdapter);
  }

  public async execute(data: IUser): Promise<ResponseInterface> {
    const hashedPassword = await this.bCryptAdapter.create(data.password);

    const user = await this.userRepository.create({
      ...data,
      password: hashedPassword,
    });

    const tokenValidator = await this.bCryptAdapter.create("authentication");

    const token = jwt.sign(
      {
        user: {
          id: user.id,
          email: user.email,
        },
        tokenValidator,
      },
      "user-auth",
      {
        expiresIn: "1d",
      }
    );

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      token,
    };
  }
}
