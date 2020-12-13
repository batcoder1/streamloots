import { logger } from './share/util/logger';
import * as server from './server';

(async () => {
  try {
    await server.start();
    logger.info('Streamloot cards started...');
  } catch (error) {
    logger.debug('Streamloot cards starting error:', error);
  }
})();
