import { logger } from '../util/logger';

export class ErrorHandler {
  protected message: any;
  protected code: number;

  constructor(code: any, message: any) {
    this.code = code;
    this.message = message;
  }
  public throwIt() {
    const status = {
      code: this.code,
      description: this.message,
    };

    logger.debug('Error', status);
    throw status;
  }
}

export function createErrorHandler(code: number, message: any) {
  logger.debug('createErrorHandler', { code, message });
  return new ErrorHandler(code, message);
}
