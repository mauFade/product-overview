export interface IUser {
  name: string;
  email: string;
  password: string;
}

export interface CreateUserResponseDTO {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserConstructorDTO extends IUser {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}
