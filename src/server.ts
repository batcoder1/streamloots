import * as http from 'http';
import { logger } from './share/util/logger';
import { createMyExpress } from './config/express';
let server: http.Server;
const port = process.env.PORT || 9091;
export const start = (): void => {
  try {
    const app = createMyExpress().getApp();
    app.set('port', port);
    server = http.createServer(app);
    server.listen(port);
    logger.info(
      `Worker ${process.pid} started: API Server Listening on ${port} env: ${process.env.NODE_ENV}`,
    );
  } catch (error) {
    onError(error);
  }
};

/**
 * On Error
 *
 * @param {NodeJS.ErrnoException} error
 */
const onError = (error: NodeJS.ErrnoException): void => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const bind = `Port ${port}`;
  switch (error.code) {
    case 'EACCES':
      logger.debug(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      logger.debug(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
};

export const stopServer = (): void => {
  server.close();
};
