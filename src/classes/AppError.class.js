class ServerError extends Error {
  constructor(message, code, statusCode = 500, meta = {}) {
    super(message);

    this.isSuccess = false;
    this.message = message;
    this.code = code;
    this.statusCode = statusCode;
    this.meta = meta;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default ServerError;
