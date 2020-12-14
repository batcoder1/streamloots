import NotifierRepository from '../../../repositories/notifier.repository';
import CardRepository from '../../../repositories/card.repository';
import Card from '../../../entities/Card';

const publishCard = (
  cardRepository: CardRepository,
  notifierRepository: NotifierRepository,
) => async (cardIds: string[]) => {
  let card: Card;
  for (const cardId of cardIds) {
    card = await cardRepository.getCardById(cardId);
    card = await cardRepository.publish(card);

    // we could send a notification when a card is publish or unpublish
    //  notifierRepository.notify(card, 'user@email');
  }
};
export default publishCard;
