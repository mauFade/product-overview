import { bCryptAdapterFactory } from "@infra/bcrypt/factory/bcrypt-factory";
import { userRepositoryFactory } from "../repository/user-repository-factory";
import { CreateUserUsecase } from "../usecase/create-user-use-case";

export function createUserUsecaseFactory(): CreateUserUsecase {
  return CreateUserUsecase.getInstance(
    userRepositoryFactory(),
    bCryptAdapterFactory()
  );
}
