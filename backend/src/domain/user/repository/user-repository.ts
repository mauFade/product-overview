import { CreateUserResponseDTO, IUser } from "../dto";
import {
  IUserRepository,
  User,
  UserModel,
} from "../model/user-repository-interface";

export class UserRepository implements IUserRepository {
  private readonly userModel: typeof UserModel;

  private constructor(userModel: typeof UserModel) {
    this.userModel = userModel;
  }

  public static getInstance(): UserRepository {
    return new UserRepository(UserModel);
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.userModel.findById(id);
    if (!user) return undefined;

    return User.newUser({
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.userModel.findOne({ email });
    if (!user) return undefined;

    return User.newUser({
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  }

  public async create(data: IUser): Promise<CreateUserResponseDTO> {
    const user = await this.userModel.create(data);

    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
