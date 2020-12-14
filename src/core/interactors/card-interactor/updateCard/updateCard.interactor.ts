import NotifierRepository from '../../../repositories/notifier.repository';
import CardRepository from '../../../repositories/card.repository';
import Card from '../../../entities/Card';

const updateCard = (cardRepository: CardRepository) => async (
  card: Card,
): Promise<Card> => {
  const cardCreated: Card = await cardRepository.updateCard(card);
  return cardCreated;
};

export default updateCard;
