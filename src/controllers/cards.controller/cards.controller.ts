import { Request, Response } from 'express';
import {
  BAD_REQUEST,
  HTTP_CODE_BAD_REQUEST,
  HTTP_CODE_NOT_FOUND,
  HTTP_CODE_UNAUTHORIZED,
  NOT_FOUND,
  NOT_AUTHORIZED,
  HTTP_CODE_METHOD_IS_NOT_IMPLEMENTED,
  METHOD_NOT_IMPLEMENTED,
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
import isNil from '../../share/util/isNil';
import { logger } from '../../share/util/logger';

class CardsController {
  public static create = async (req: Request, res: Response): Promise<void> => {
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
  public static update = async (req: Request, res: Response): Promise<void> => {
    try {
      logger.info('update...');

      const { id } = req.body;
      const userId = decodeToken(req);
      if (isNil(userId)) {
        createErrorHandler(HTTP_CODE_UNAUTHORIZED, NOT_AUTHORIZED).throwIt();
      }
      if (isNil(id)) {
        createErrorHandler(HTTP_CODE_BAD_REQUEST, BAD_REQUEST).throwIt();
      }
      const cardSaved = await updateCard(req.body, userId);
      res.send(cardSaved);
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
  public static publish = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      logger.info('publish...');

      const cardIds: string[] = req.body;
      const userId = decodeToken(req);
      console.log(userId);
      if (isNil(userId)) {
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
  public static unpublish = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      logger.info('unpublish...');

      const cardIds: string[] = req.body;
      const userId = decodeToken(req);
      if (isNil(userId)) {
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
  public static getCard = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      logger.info('getCard...');
      const { id } = req.query;

      let card: Card;
      logger.info('id', { id });
      if (!isNil(id) && id) {
        card = await getCardById(id.toString());
        if (!card) {
          createErrorHandler(HTTP_CODE_NOT_FOUND, NOT_FOUND).throwIt();
        }
      } else {
        createErrorHandler(HTTP_CODE_BAD_REQUEST, BAD_REQUEST).throwIt();
      }

      logger.info(card.id);
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
  public static getUserCards = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    logger.info('getUserCards...');
    try {
      const { userId } = req.query;
      const userIdToken = decodeToken(req);
      let cards: Card[];

      if (isNil(userId)) {
        createErrorHandler(HTTP_CODE_BAD_REQUEST, BAD_REQUEST);
      }
      if (userId === userIdToken) {
        cards = await getCardsByUser(userId.toString());
      } else {
        cards = await getPublishedCardsOfUser(userId.toString());
      }

      res.send(cards);
    } catch (error) {
      res.status(error.code).send({ error });
    }
  };

  /**
   * Mehod is not implemented
   *
   * @static
   * @param {Request} req
   * @param {Response} res
   * @memberof CardsController
   */
  public static methodNotImplemented = (req: Request, res: Response): void => {
    logger.info('Method not implemented...:');
    res
      .status(HTTP_CODE_METHOD_IS_NOT_IMPLEMENTED)
      .send(METHOD_NOT_IMPLEMENTED);
  };
}

export default CardsController;
