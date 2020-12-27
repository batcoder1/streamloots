import { LogsLogger } from '../types';
import { createConsoleLogger } from './console.logger';
import { createProductionLogger } from './production.logger';

export const createLogsLogger = ({
  type = 'console',
  level = 'info',
}: {
  type: string;
  level: string;
}): LogsLogger => {
  switch (type) {
    case 'console': {
      return createConsoleLogger(level);
    }
    case 'production': {
      return createProductionLogger(level);
    }
    default: {
      throw Error(`Unknown Type: ${type}`);
    }
  }
};
