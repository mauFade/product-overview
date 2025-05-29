import { ReviewRepository } from "./review-repository";

export function reviewRepositoryFactory(): ReviewRepository {
  return ReviewRepository.getInstance();
}
