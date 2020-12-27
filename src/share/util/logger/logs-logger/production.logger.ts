import { LogsLogger } from '../types';
import { createLogger, format } from 'winston';

import DailyRotateFile from 'winston-daily-rotate-file';
const { combine, timestamp, json } = format;

export const createProductionLogger = (level: string): LogsLogger => {
  const options = {
    filename: 'logs/streamloots-%DATE%.log',
    datePattern: 'YYYYMMDD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
  };

  return createLogger({
    level,
    exitOnError: false,
    format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), json()),
    transports: [new DailyRotateFile(options)],
  });
};
