import * as bodyParser from 'body-parser';
import express from 'express';
import helmet from 'helmet';
import { Routes, createRoutes } from './routes';
import cookieParser from 'cookie-parser';

export class MyExpress {
  private app: express.Express;
  private routes: Routes;
  constructor() {
    // Start App
    this.app = express();

    // Middleware
    this.setMiddlewares();

    // Routes
    this.routes = createRoutes(this.app);
  }

  getApp() {
    return this.app;
  }
  /**
   * Set middleware
   */
  private setMiddlewares() {
    this.app.use(bodyParser.json({ limit: '200mb' }));
    this.app.use(bodyParser.urlencoded({ limit: '200mb', extended: true }));
    this.app.use(helmet());
    this.app.disable('x-powered-by');
    this.app.use(cookieParser());
  }
}
export function createMyExpress() {
  return new MyExpress();
}
