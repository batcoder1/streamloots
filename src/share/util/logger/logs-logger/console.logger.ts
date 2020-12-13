import { LogsLogger } from '../types';
import { createLogger, format, transports } from 'winston';
const { combine, timestamp, printf, splat } = format;

export function createConsoleLogger(level: string = 'info'): LogsLogger {
  const myFormat = printf((info) => {
    return `${info.timestamp} [Streamloots] ${info.level}: ${JSON.stringify(
      info.message,
      // tslint:disable-next-line:no-nested-template-literals
    )}${info.data ? `- ${JSON.stringify(info.data)}` : ''}`;
  });

  return createLogger({
    format: combine(splat(), timestamp(), myFormat),
    transports: [
      new transports.Console({
        level,
      }),
    ],
  });
}
