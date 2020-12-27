import { LogsLogger } from '../types';
import { createLogger, format, transports } from 'winston';
const { combine, timestamp, printf, splat } = format;

export interface TransformableInfo {
  level: string;
  message: string;
  [key: string]: any;
}

export const createConsoleLogger = (level: string): LogsLogger => {
  const myFormat = printf((info: TransformableInfo): string => {
    return `${info.timestamp} [Streamloots] ${info.level}: ${JSON.stringify(
      info.message,
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
};
