import { createCardDatasource } from '../../../../dataSources/card.datasource';
import { CreateEmailNotifier } from '../../../../dataSources/emailNotifier.datasource';
import unpublishCard from './unpublishCard.interactor';

const cardRepository = createCardDatasource();
const notifierRepository = CreateEmailNotifier();

export default unpublishCard(cardRepository, notifierRepository);
