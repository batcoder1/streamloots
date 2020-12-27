import { LogsLogger } from './types';
type DataType = string | Record<string, unknown>;

export class Logger implements ILogger {
  protected readonly logsLogger: LogsLogger;

  constructor({ logsLogger }: CreateLoggerParams) {
    this.logsLogger = logsLogger;
  }
  public error(message: string, data?: DataType): void {
    this.logsLogger.error(message, { data });
  }

  public warn(message: string, data?: DataType): void {
    this.logsLogger.warn(message, { data });
  }

  public info(message: string, data?: DataType): void {
    this.logsLogger.info(message, { data });
  }

  public debug(message: string, data?: DataType): void {
    this.logsLogger.debug(message, { data });
  }

  public verbose(message: string, data?: DataType): void {
    this.logsLogger.verbose(message, { data });
  }
}
export const createLogger = (params: CreateLoggerParams): Logger => {
  return new Logger(params);
};

export interface CreateLoggerParams {
  logsLogger: LogsLogger;
}

export interface ILogger extends LogsLogger {}
