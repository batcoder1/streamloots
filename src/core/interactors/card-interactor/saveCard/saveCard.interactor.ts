import { CREATED_STAT } from '../../../../../config/constant';
import { ICardDoc } from '../../../../dataSources/schema/card.schema';
import { DatadogNotifier } from '../../../../notifiers/datadog.notifier';
import { GoogleNotifier } from '../../../../notifiers/google.notifier';
import cardAdapter from '../../../adapters/Card.adapter';
import Card from '../../../entities/Card';
import CardRepository from '../../../repositories/card.repository';

const saveCard = (
  cardRepository: CardRepository,
  dataDogRepository: DatadogNotifier,
  googleRepository: GoogleNotifier,
) => async (card: Card): Promise<Card> => {
  const cardDoc: ICardDoc = cardAdapter(card);

  const cardSaved = await cardRepository.create(cardDoc);

  dataDogRepository.send(card, CREATED_STAT);
  googleRepository.send(card, CREATED_STAT);
  return cardSaved;
};

export default saveCard;
