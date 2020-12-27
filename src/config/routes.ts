import * as express from 'express';
import {
  allowedMethods,
  HTTP_CODE_METHOD_IS_NOT_ALLOWED,
  METHOD_NOT_ALLOWED,
  Path,
} from '../../config/constant';
import { createCardRouter } from '../controllers/cards.controller/card.routes';

export class Routes {
  public router: express.Router;
  private app: express.Express;

  constructor(app: express.Express) {
    // Set router
    this.router = express.Router();

    // Set app
    this.app = app;

    // Set all routes
    this.setAllRoutes();
  }

  /**
   * Set all app routes
   */
  private setAllRoutes() {
    const app = this.app;
    app.use(this.methodAllowed);
    app.use(Path.cards, createCardRouter().paths());
    app.route('/*').get(this.index);
  }

  /**
   * Main route
   */
  private index(req: express.Request, res: express.Response) {
    res.json({
      message: 'Welcome streamloots Cards API',
    });
  }
  /**
   * Ge error if http method is not allowed
   *
   * @private
   * @param {express.Request} req
   * @param {express.Response} res
   * @returns
   * @memberof Routes
   */
  private methodAllowed(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    console.log('methodAllowed', req.method);
    if (!allowedMethods.includes(req.method)) {
      return res
        .status(HTTP_CODE_METHOD_IS_NOT_ALLOWED)
        .send(METHOD_NOT_ALLOWED);
    }
    next();
  }
}

export const createRoutes = (app: express.Express): Routes => {
  return new Routes(app);
};
