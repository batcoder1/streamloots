import CardRepository from '../../../repositories/card.repository';
import Card from '../../../entities/Card';
import { createErrorHandler } from '../../../../share/error-handler/error.handler';
import {
  HTTP_CODE_UNAUTHORIZED,
  NOT_AUTHORIZED,
  NOT_CARD_OWNER,
} from '../../../../../config/constant';

const updateCard = (cardRepository: CardRepository) => async (
  card: Card,
  userId: string,
): Promise<Card> => {
  const cardDB = await cardRepository.getCardById(card.id);
  if (cardDB.userId != userId) {
    createErrorHandler(HTTP_CODE_UNAUTHORIZED, NOT_CARD_OWNER).throwIt();
  }
  const cardUpdated: Card = await cardRepository.updateCard(card);
  return cardUpdated;
};

export default updateCard;
