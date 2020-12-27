import * as express from 'express';
import { Path } from '../../../config/constant';

import CardsController from './cards.controller';

export class CardRouter {
  public router: express.Router;

  constructor() {
    this.router = express.Router();
  }

  paths(): express.Router {
    this.router.get(Path.card, CardsController.getCard);
    this.router.put(Path.card, CardsController.create);
    this.router.patch(Path.card, CardsController.update);
    this.router.get('', CardsController.getUserCards);
    this.router.post(Path.publish, CardsController.publish);
    this.router.post(Path.unpublish, CardsController.unpublish);

    this.router.delete('', CardsController.methodNotImplemented);

    return this.router;
  }
}

export const createCardRouter = (): CardRouter => {
  return new CardRouter();
};
