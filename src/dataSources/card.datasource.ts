import Card from '../core/entities/Card';
import { logger } from '../share/util/logger';
import { MainDatasource } from './main.datasource';
import CardModel, { ICardDoc } from './schema/card.schema';

export class CardDatasource extends MainDatasource<ICardDoc> {
  private static instance: CardDatasource;

  constructor() {
    super(CardModel);
  }

  public static getInstance(): CardDatasource {
    if (!CardDatasource.instance) {
      CardDatasource.instance = new CardDatasource();
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
}

export const createCardDatasource = (): CardDatasource => {
  return CardDatasource.getInstance();
};
