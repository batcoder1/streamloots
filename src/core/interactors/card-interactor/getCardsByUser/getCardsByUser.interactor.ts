import CardRepository from '../../../repositories/card.repository';
import Card from '../../../entities/Card';
import { logger } from '../../../../share/util/logger';

const getCardsByUser = (cardRepository: CardRepository) => async (
  user: string,
): Promise<Card[]> => {
  return await cardRepository.getCardByUser(user);
};

export default getCardsByUser;
