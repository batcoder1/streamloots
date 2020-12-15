import CardRepository from '../../../repositories/card.repository';
import Card from '../../../entities/Card';
import AnalyticRepository from '../../../repositories/analytic.repository';
import NotifierRepository from '../../../repositories/notifier.repository';
import { PUBLISHED_STAT } from '../../../../../config/constant';

const publishCard = (
  cardRepository: CardRepository,
  dataDogRepository: AnalyticRepository,
  googleRepository: AnalyticRepository,
  notifierRepository: NotifierRepository,
) => async (cardIds: string[], userId: string) => {
  let card: Card;

  for (const cardId of cardIds) {
    card = await cardRepository.getCardById(cardId);
    console.log(card);
    console.log(userId);
    if (card.userId == userId) {
      await cardRepository.publish(card);
      dataDogRepository.send(card, PUBLISHED_STAT);
      googleRepository.send(card, PUBLISHED_STAT);
      // we could send a notification when a card is publish or unpublish
      //  notifierRepository.notify(card, 'user@email');
    }
  }
};
export default publishCard;
