class GeneralError extends Error {
  details: object | undefined;
  constructor(message: string, details: object | undefined = undefined) {
    super();
    this.message = message;
    this.details = details;
  }
  getCode() {
    return 500;
  }
}

class BadRequest extends GeneralError {
  getCode() {
    return 400;
  }
}
class NotFound extends GeneralError {
  getCode() {
    return 404;
  }
}

class UnAuthorised extends GeneralError {
  getCode() {
    return 401;
  }
}

export { GeneralError, BadRequest, NotFound, UnAuthorised };
