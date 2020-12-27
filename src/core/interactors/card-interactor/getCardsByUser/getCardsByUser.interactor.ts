import CardRepository from '../../../repositories/card.repository';
import Card from '../../../entities/Card';

const getCardsByUser = (cardRepository: CardRepository) => async (
  user: string,
): Promise<Card[]> => {
  return await cardRepository.getCardByUser(user);
};

export default getCardsByUser;
