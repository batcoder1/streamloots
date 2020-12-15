import * as express from 'express';
import { Path } from '../../../config/constant';
import { isAuthenticated } from '../../share/authenticator/authenticator';

import { logger } from '../../share/util/logger';
import CardsController from './cards.controller';

export class CardRouter {
  public router: express.Router;

  constructor() {
    this.router = express.Router();
  }

  Cards() {
    this.router.get('', CardsController.getCard);
    this.router.put('', CardsController.create);
    this.router.patch('', CardsController.update);
    this.router.get(Path.user, CardsController.getUserCards);
    this.router.post(Path.publish, isAuthenticated, CardsController.publish);
    this.router.post(
      Path.unpublish,
      isAuthenticated,
      CardsController.unpublish,
    );

    this.router.delete('', CardsController.badRequest);
    this.router.options('', CardsController.badRequest);

    return this.router;
  }
}

export function CreateCardRouter(): CardRouter {
  return new CardRouter();
}