import * as express from 'express';
import { Path } from '../../config/constant';
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

  /**locate
   * Set all app routes
   */
  private setAllRoutes() {
    this.app.use(Path.card, CreateCardRouter().Cards());
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
}

export function createRoutes(app: express.Express) {
  return new Routes(app);
}
