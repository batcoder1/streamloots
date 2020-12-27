import { logger } from '../util/logger';

export class ErrorHandler extends Error {
  code: number;
  message: string;
  stack?: string;

  constructor(code: number, message: string, stack?: string) {
    super();
    this.code = code;
    this.message = message;
    this.stack = stack;
  }
  public throwIt(): ErrorHandler {
    const status = {
      code: this.code,
      message: this.message,
      stack: this.stack,
    };

    logger.debug('Error', status);
    throw status;
  }
}

export const createErrorHandler = (
  code: number,
  message: string,
  stack?: string,
): ErrorHandler => {
  return new ErrorHandler(code, message, stack);
};
