export type LogMethod = (message: string, data?: any) => void;

export interface LogsLogger {
  error: LogMethod;
  warn: LogMethod;
  info: LogMethod;
  debug: LogMethod;
  verbose: LogMethod;
}
