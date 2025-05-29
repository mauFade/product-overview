import { CreateUserResponseDTO, IUser, UserConstructorDTO } from "../dto";
import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const UserModel = mongoose.model("User", UserSchema);

export class User {
  private id: string;
  private name: string;
  private email: string;
  private password: string;
  private createdAt: Date;
  private updatedAt: Date;

  private constructor(data: UserConstructorDTO) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.password = data.password;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  public static newUser(data: UserConstructorDTO): User {
    return new User(data);
  }

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getEmail(): string {
    return this.email;
  }

  public getPassword(): string {
    return this.password;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getUpdatedAt(): Date {
    return this.updatedAt;
  }
}

export interface IUserRepository {
  create(data: IUser): Promise<CreateUserResponseDTO>;
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
}
