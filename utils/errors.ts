class GeneralError extends Error {
  details: string;
  constructor(message: string, details: string | null = null) {
    super();
    this.message = message;
    this.details = details as string;
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

module.exports = {
  GeneralError,
  BadRequest,
  NotFound,
  UnAuthorised,
};
