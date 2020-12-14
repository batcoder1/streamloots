import NotifierRepository from '../../../repositories/notifier.repository';
import CardRepository from '../../../repositories/card.repository';
import Card from '../../../entities/Card';

const unpublishCard = (
  cardRepository: CardRepository,
  notifierRepository: NotifierRepository,
) => async (cardIds: string[]) => {
  for (const cardId of cardIds) {
    let card: Card = await cardRepository.getCardById(cardId);
    card = await cardRepository.unpublish(card);

    // we could send a notification when a card is publish or unpublish
    notifierRepository.notify(card, 'user@email');
  }
};

export default unpublishCard;
