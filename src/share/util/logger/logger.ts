import { LogsLogger } from './types';

export class Logger implements ILogger {
  protected readonly logsLogger: LogsLogger;

  constructor({ logsLogger }: CreateLoggerParams) {
    this.logsLogger = logsLogger;
  }

  public error(message: string, data?: object): void {
    this.logsLogger.error(message, { data });
  }

  public warn(message: string, data?: object): void {
    this.logsLogger.warn(message, { data });
  }

  public info(message: string, data?: object): void {
    this.logsLogger.info(message, { data });
  }

  public debug(message: string, data?: object): void {
    this.logsLogger.debug(message, { data });
  }

  public verbose(message: string, data?: object): void {
    this.logsLogger.verbose(message, { data });
  }

}
export function createLogger(params: CreateLoggerParams): Logger {
  return new Logger(params);
}

export interface CreateLoggerParams {
  logsLogger: LogsLogger;
}

export interface ILogger extends LogsLogger {}
