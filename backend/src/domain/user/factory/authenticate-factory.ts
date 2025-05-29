import { AuthenticateUseCase } from "../usecase/authenticate-use-case";
import { userRepositoryFactory } from "../repository/user-repository-factory";
import { bCryptAdapterFactory } from "@infra/bcrypt/factory/bcrypt-factory";

export function authenticateFactory(): AuthenticateUseCase {
  return AuthenticateUseCase.getInstance(
    userRepositoryFactory(),
    bCryptAdapterFactory()
  );
}
