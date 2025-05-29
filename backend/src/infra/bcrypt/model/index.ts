export interface IBCryptRepository {
  compare(payload: string, hashCompare: string): Promise<boolean>;
  create(payload: string): Promise<string>;
}
