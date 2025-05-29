export class NotFoundError extends Error {
  public type: string;
  public status: number;
  constructor(message: string) {
    super(message);

    this.name = "NotFoundError";
    this.type = "NOT_FOUND";
    this.status = 404;
  }
}

export class BadRequestError extends Error {
  public type: string;
  public status: number;
  constructor(message: string) {
    super(message);

    this.name = "BadRequestError";
    this.type = "BAD_REQUEST";
    this.status = 400;
  }
}

export class AlreadyExistError extends Error {
  public type: string;
  public status: number;
  constructor(message: string) {
    super(message);

    this.name = "UserAlreadyExist";
    this.type = "ALREADY_EXIST";
    this.status = 409;
  }
}

export class ValidationError extends Error {
  public type: string;
  constructor(message: string) {
    super(message);

    this.name = "ValidationError";
    this.type = "validation";
  }
}

export class AuthenticateError extends Error {
  public type: string;
  public status: number;
  constructor(message: string) {
    super(message);

    this.name = "AuthenticateError";
    this.type = "INVALID_CREDENTIAL";
    this.status = 401;
  }
}

export class InternalServerError extends Error {
  public type: string;
  public status: number;
  constructor(message: string) {
    super(message);

    this.name = "InternalServerError";
    this.type = "INTERNAL";
    this.status = 500;
  }
}
