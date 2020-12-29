import CardRepository from '../../../repositories/card.repository';
import Card from '../../../entities/Card';
import { createErrorHandler } from '../../../../share/error-handler/error.handler';
import {
  HTTP_CODE_UNAUTHORIZED,
  NOT_CARD_OWNER,
} from '../../../../../config/constant';
import { ICardDoc } from '../../../../dataSources/schema/card.schema';
import cardAdapter from '../../../adapters/Card.adapter';

const updateCard = (cardRepository: CardRepository) => async (
  card: Card,
  userId: string,
): Promise<Card> => {
  const cardDB = await cardRepository.getById(card.id);
  if (cardDB.userId !== userId) {
    createErrorHandler(HTTP_CODE_UNAUTHORIZED, NOT_CARD_OWNER).throwIt();
  }
  const cardDoc: ICardDoc = cardAdapter(card);
  const cardUpdated: Card = await cardRepository.update(card.id, cardDoc);
  return cardUpdated;
};

export default updateCard;
