import { hash, compare } from "bcryptjs";

import { IBCryptRepository } from "./model";

export class BCryptAdapter implements IBCryptRepository {
  private constructor() {}

  public static getInstance(): BCryptAdapter {
    return new BCryptAdapter();
  }

  public async create(payload: string): Promise<string> {
    const hashed = await hash(payload, 8);

    return hashed;
  }

  public async compare(payload: string, hashCompare: string): Promise<boolean> {
    const isEqual = await compare(payload, hashCompare);

    return isEqual;
  }
}
