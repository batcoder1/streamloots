import CardRepository from '../../../repositories/card.repository';
import Card from '../../../entities/Card';

const getPublishedCardsOfUser = (cardRepository: CardRepository) => async (
  user: string,
): Promise<Card[]> => {
  return await cardRepository.getPublishedCardsOfUser(user);
};

export default getPublishedCardsOfUser;
