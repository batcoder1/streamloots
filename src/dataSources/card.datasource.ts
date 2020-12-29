import config from 'config';
import mongoose, { Model } from 'mongoose';
import Card from '../core/entities/Card';
import { logger } from '../share/util/logger';
import { MainDatasource } from './main.datasource';
import CardModel, { ICardDoc } from './schema/card.schema';

let MONGO_CONNECTION: string;
let MONGO_USERNAME: string;
let MONGO_HOST: string;
let MONGO_PASSWORD: string;
let MONGO_DB: string;
let MONGO_PARAMS: string;
const nodeEnv = process.env.NODE_ENV;

export class CardDatasource extends MainDatasource<ICardDoc> {
  private static instance: CardDatasource;

  constructor() {
    super(CardModel);
  }

  public static getInstance(): CardDatasource {
    if (!CardDatasource.instance) {
      CardDatasource.instance = new CardDatasource();
      this.instance.setEnv();
      void this.instance.connectToDatabase();
    }
    return CardDatasource.instance;
  }

  /**
   * Get card of a user
   *
   * @param {string} userId
   * @returns {Promise<Card[]>}
   * @memberof CardDatasource
   */
  public async getByUser(userId: string): Promise<Card[]> {
    logger.info('getByUser...');
    const cards = await CardModel.find({ userId });
    return cards;
  }

  /**
   * Get the published card of a user
   *
   * @param {string} userId
   * @returns {Promise<Card[]>}
   * @memberof CardDatasource
   */
  public async getPublishedCardsOfUser(userId: string): Promise<Card[]> {
    logger.info('getCardByUser...');
    const cards = await CardModel.find({ userId, published: true });
    const cardsfiltered = cards.map((card) => {
      return {
        id: card.id,
        name: card.name,
        image: card.image,
        rarity: card.rarity,
        published: card.published,
        limited: card.limited,
        userId: card.userId,
      };
    });
    return cardsfiltered as Card[];
  }

  /**
   * Publish a car
   *
   * @param {Card} card
   * @returns {Promise<Card>}
   * @memberof CardDatasource
   */
  public async publish(card: Card): Promise<Card> {
    logger.info('publish...');
    return await CardModel.findOneAndUpdate(
      { _id: card.id },
      { published: true },
    );
  }

  /**
   * Unpublish a car
   *
   * @param {Card} card
   * @returns {Promise<Card>}
   * @memberof CardDatasource
   */
  public async unpublish(card: Card): Promise<Card> {
    logger.info('unpublish...');
    return await CardModel.findOneAndUpdate(
      { _id: card.id },
      { published: false },
    );
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
    const MONGO_URI = `${MONGO_CONNECTION}://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_DB}-${nodeEnv}${MONGO_PARAMS}`;
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
      logger.error(`Mongo: Could not connect to the database. Error: ${error}`);
      process.exit(1);
    }
  }
}

export const createCardDatasource = (): CardDatasource => {
  return CardDatasource.getInstance();
};
