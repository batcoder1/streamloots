import CardRepository from '../../../repositories/card.repository';
import Card from '../../../entities/Card';
import NotifierRepository from '../../../repositories/notifier.repository';

const unpublishCard = (
  cardRepository: CardRepository,
  notifierRepository: NotifierRepository,
) => async (cardIds: string[], userId: string): Promise<void> => {
  for (const cardId of cardIds) {
    let card: Card = await cardRepository.getCardById(cardId);
    if (card.userId === userId) {
      card = await cardRepository.unpublish(card);
      // we could send a notification when a card is publish or unpublish
      notifierRepository.notify(card, 'user@email');
    }
  }
};

export default unpublishCard;
