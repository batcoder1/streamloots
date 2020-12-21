import * as express from 'express';
import {
  allowedMethods,
  HTTP_CODE_METHOD_IS_NOT_ALLOWED,
  METHOD_NOT_ALLOWED,
  Path,
} from '../../config/constant';
import { CreateCardRouter } from '../controllers/cards.controller/card.routes';

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
    this.app.use(this.methodAllowed);
    this.app.use(Path.cards, CreateCardRouter().paths());
    this.app.route('/*').get(this.index);
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

export function createRoutes(app: express.Express) {
  return new Routes(app);
}
