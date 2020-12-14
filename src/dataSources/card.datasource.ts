import CardRepository from '../core/repositories/card.repository';

import Card from '../core/entities/Card';
import config from 'config';
import { logger } from '../share/util/logger';
import CardModel from './schema/card.schema';
import mongoose from 'mongoose';
import cardSchema from './schema/card.schema';
import {
  cardTypeEnum,
  HTTP_CODE_NOT_FOUND,
  NOT_FOUND,
} from '../../config/constant';
import { createErrorHandler } from '../share/error-handler/error.handler';
import { isNil } from 'lodash';

let MONGO_CONNECTION: any;
let MONGO_USERNAME: any;
let MONGO_HOST: any;
let MONGO_PASSWORD: any;
let MONGO_DB: any;
let MONGO_PARAMS: any;
const nodeEnv = process.env.NODE_ENV;

export class CardDatasource implements CardRepository {
  constructor() {
    this.setEnv();
    this.connectToDatabase();
  }

  public async getCardByUser(userId: string): Promise<Card[]> {
    logger.info('getCardByUser...');
    const cards = await CardModel.find({ userId });
    const cardsfiltered = cards.map((card) => {
      return {
        id: card.id,
        type: card.type,
        name: card.name,
        image: card.image,
        rarity: card.rarity,
        published: card.published,
        userId: card.userId,
      };
    });
    return cardsfiltered as Card[];
  }
  public async getCardById(id: string): Promise<Card> {
    logger.info('getCardById...');
    const card = await await CardModel.findById(id);
    if (!card) {
      createErrorHandler(HTTP_CODE_NOT_FOUND, NOT_FOUND).throwIt();
    }
    return card.toJSON();
  }

  public async getCards(): Promise<Card[]> {
    logger.info('getCards...');
    const cards = await CardModel.find({});
    const cardsfiltered = cards.map((card) => {
      return {
        id: card.id,
        type: card.type,
        name: card.name,
        image: card.image,
        rarity: card.rarity,
        published: card.published,
        userId: card.userId,
      };
    });
    return cardsfiltered as Card[];
  }

  public async updateCard(card: Card): Promise<Card> {
    logger.info('updateCard...');

    const updated = await CardModel.findOneAndUpdate(
      { _id: card.id },
      { $set: card },
    );

    let cardUpdated = await await CardModel.findById(card.id);
    return !isNil(cardUpdated) ? cardUpdated.toJSON() : cardUpdated;
  }

  public async saveCard(card: Card): Promise<Card> {
    logger.info('saveCard...');
    let schemaCard = new CardModel(card);
    return await (await schemaCard.save()).toJSON();
  }

  public async publish(card: Card): Promise<Card> {
    logger.info('publish...');
    card;
    return await CardModel.updateOne({ id: card.id }, { published: true });
  }

  public async unpublish(card: Card): Promise<Card> {
    logger.info('unpublish...');
    return await CardModel.updateOne({ id: card.id }, { published: false });
  }

  /**
   * Set env
   *
   */
  private setEnv() {
    //
    // Add NODE_ENV to path if is not production
    MONGO_CONNECTION = config.get('MONGO.CONNECTION');
    MONGO_USERNAME = encodeURIComponent(config.get('MONGO.USERNAME'));
    MONGO_HOST = config.get('MONGO.HOST');
    MONGO_PASSWORD = encodeURIComponent(config.get('MONGO.PASSWORD'));
    MONGO_DB = config.get('MONGO.DB');
    MONGO_PARAMS = config.get('MONGO.PARAMS');
  }

  /**
   * Connect to mongo
   */
  private async connectToDatabase() {
    const node_env = process.env.NODE_ENV;
    const MONGO_URI = `${MONGO_CONNECTION}://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_DB}-${nodeEnv}`;
    const options = {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      useCreateIndex: true,
    };

    try {
      await mongoose.connect(MONGO_URI, options);
      logger.info('Mongo: connected succesfully!!!');
    } catch (error) {
      logger.error('Mongo: Could not connect to the database. Error: ' + error);
      process.exit(1);
    }
  }
}

export function createCardDatasource(): CardDatasource {
  return new CardDatasource();
}
