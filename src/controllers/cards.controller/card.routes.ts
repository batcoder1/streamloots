import * as express from 'express';
import { Path } from '../../../config/constant';

import { logger } from '../../share/util/logger';
import CardsController from './cards.controller';

export class CardRouter {
  public router: express.Router;

  constructor() {
    this.router = express.Router();
  }

  Cards() {
    this.router.get(Path.card, CardsController.getCard);
    this.router.put(Path.card, CardsController.create);
    this.router.patch(Path.card, CardsController.update);
    this.router.get('', CardsController.getUserCards);
    this.router.post(Path.publish, CardsController.publish);
    this.router.post(Path.unpublish, CardsController.unpublish);

    this.router.delete('', CardsController.badRequest);
    this.router.options('', CardsController.badRequest);

    return this.router;
  }
}

export function CreateCardRouter(): CardRouter {
  return new CardRouter();
}
