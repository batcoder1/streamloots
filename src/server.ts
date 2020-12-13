import * as http from "http";
import { logger } from "./share/util/logger";
import { createMyExpress } from "./config/express";
let server: http.Server;
const port = process.env.PORT || 9091;
export async function start() {
  try {
    const myExpress = createMyExpress();
    const app = myExpress.getApp();
    app.set("port", port);
    server = http.createServer(app);
    server.listen(port);
    logger.debug(`API Server Listening on ${port}`);
  } catch (error) {
    onError(error);
  }
}
/**
 * On error
 * callback event for createServer error
 * @param {*} error
 */
function onError(error: NodeJS.ErrnoException): void {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;
  switch (error.code) {
    case "EACCES":
      logger.debug(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      logger.debug(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

export function stopServer() {
  server.close();
}
