import { createLogger } from './logger';
import { createLogsLogger } from './logs-logger/logs-logger.creator';
import config = require('config');

const logsLogger = createLogsLogger({
  type: config.get('logger.logs.type'),
  level: config.get('logger.logs.level'),
});

export const logger = createLogger({ logsLogger });

