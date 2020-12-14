import NotifierRepository from '../../../repositories/notifier.repository';
import CardRepository from '../../../repositories/card.repository';
import Card from '../../../entities/Card';

const saveCard = (cardRepository: CardRepository) => async (
  card: Card,
): Promise<Card> => {
  return await cardRepository.saveCard(card);
};

export default saveCard;
