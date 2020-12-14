import NotifierRepository from '../../../repositories/notifier.repository';
import CardRepository from '../../../repositories/card.repository';
import Card from '../../../entities/Card';

const getCards = (cardRepository: CardRepository) => async (
  user: string,
): Promise<Card[]> => {
  return await cardRepository.getCards(user);
};

export default getCards;
