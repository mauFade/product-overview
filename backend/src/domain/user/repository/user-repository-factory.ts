import { UserRepository } from "./user-repository";

export function userRepositoryFactory(): UserRepository {
  return UserRepository.getInstance();
}
