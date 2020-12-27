import { createCardDatasource } from '../../../../dataSources/card.datasource';
import { createEmailNotifier } from '../../../../notifiers/email.notifier';
import unpublishCard from './unpublishCard.interactor';

const cardRepository = createCardDatasource();
const notifierRepository = createEmailNotifier();

export default unpublishCard(cardRepository, notifierRepository);
