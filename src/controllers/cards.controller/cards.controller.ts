import { Request, Response } from 'express';
import { isNil } from 'lodash';
import {
  BAD_REQUEST,
  HTTP_CODE_BAD_REQUEST,
  HTTP_CODE_NOT_FOUND,
  HTTP_CODE_UNAUTHORIZED,
  NOT_FOUND,
  NOT_AUTHORIZED,
} from '../../../config/constant';
import Card from '../../core/entities/Card';
import getCardById from '../../core/interactors/card-interactor/getCardById';
import getCardsByUser from '../../core/interactors/card-interactor/getCardsByUser';
import getPublishedCardsOfUser from '../../core/interactors/card-interactor/getPublishedCardsOfUser';
import publishCard from '../../core/interactors/card-interactor/publishCard';
import saveCard from '../../core/interactors/card-interactor/saveCard';
import unpublishCard from '../../core/interactors/card-interactor/unpublishCard';
import updateCard from '../../core/interactors/card-interactor/updateCard';
import { decodeToken } from '../../share/authenticator/authenticator';
import { createErrorHandler } from '../../share/error-handler/error.handler';
import { logger } from '../../share/util/logger';

class CardsController {
  public static create = async (req: Request, res: Response) => {
    try {
      logger.info('create...');
      const userId = decodeToken(req);
      if (!userId) {
        createErrorHandler(HTTP_CODE_UNAUTHORIZED, NOT_AUTHORIZED).throwIt();
      }
      const { image, limited, name, rarity, published } = req.body;
      const card: Card = {
        image,
        limited,
        name,
        userId,
        rarity,
        published,
      };
      const cardSaved = await saveCard(card);
      res.send(cardSaved);
    } catch (error) {
      logger.error(error);
      res.status(error.code).send({ error });
    }
  };
  /**
   * Update a car
   *
   * @static
   * @memberof CardsController
   */
  public static update = async (req: Request, res: Response) => {
    try {
      logger.info('update...');
      const { id } = req.body;
      const userId = decodeToken(req);
      if (!userId) {
        createErrorHandler(HTTP_CODE_UNAUTHORIZED, NOT_AUTHORIZED).throwIt();
      }
      if (!isNil(id) && id) {
        const cardSaved = await updateCard(req.body, userId);
        res.send(cardSaved);
      } else {
        createErrorHandler(HTTP_CODE_BAD_REQUEST, BAD_REQUEST).throwIt();
      }
    } catch (error) {
      res.status(error.code).send({ error });
    }
  };
  /**
   * Publish a card
   *
   * @static
   * @memberof CardsController
   */
  public static publish = async (req: Request, res: Response) => {
    try {
      const cardIds: string[] = req.body;
      const userId = decodeToken(req);
      console.log(userId);
      if (!userId) {
        createErrorHandler(HTTP_CODE_UNAUTHORIZED, NOT_AUTHORIZED).throwIt();
      }
      await publishCard(cardIds, userId);
      res.send();
    } catch (error) {
      res.status(error.code).send({ error });
    }
  };
  /**
   * Unpublish a card
   *
   * @static
   * @memberof CardsController
   */
  public static unpublish = async (req: Request, res: Response) => {
    try {
      const cardIds: string[] = req.body;
      const userId = decodeToken(req);
      if (!userId) {
        createErrorHandler(HTTP_CODE_UNAUTHORIZED, NOT_AUTHORIZED).throwIt();
      }
      await unpublishCard(cardIds, userId);
      res.send();
    } catch (error) {
      res.status(error.code).send({ error });
    }
  };
  /**
   * Get a card
   *
   * @static
   * @memberof CardsController
   */
  public static getCard = async (req: Request, res: Response) => {
    try {
      const { id } = req.query;
      console.log(' getCard id:', id);
      let card: Card;
      if (!isNil(id) && id) {
        card = await getCardById(id.toString());
        if (!card) {
          createErrorHandler(HTTP_CODE_NOT_FOUND, NOT_FOUND).throwIt();
        }
      } else {
        createErrorHandler(HTTP_CODE_BAD_REQUEST, BAD_REQUEST).throwIt();
      }

      res.send(card);
    } catch (error) {
      res.status(error.code).send({ error });
    }
  };
  /**
   * Get user cards
   *
   * @static
   * @memberof CardsController
   */
  public static getUserCards = async (req: Request, res: Response) => {
    logger.info('getUserCards...');
    const { userId } = req.query;
    console.log('userId:', userId);
    const userIdToken = decodeToken(req);
    let cards: Card[];
    if (!isNil(userId) && userId) {
      if (userId == userIdToken) {
        cards = await getCardsByUser(userId.toString());
      } else {
        cards = await getPublishedCardsOfUser(userId.toString());
      }
    } else {
      createErrorHandler(HTTP_CODE_BAD_REQUEST, BAD_REQUEST);
    }

    res.send(cards);
  };

  /**
   * Bad request handler
   *
   * @static
   * @param {Request} req
   * @param {Response} res
   * @memberof CardsController
   */
  public static badRequest(req: Request, res: Response) {
    logger.debug('badRequest...:');
    res.status(400).send();
  }
}

export default CardsController;
