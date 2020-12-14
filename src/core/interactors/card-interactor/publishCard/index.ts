import { createCardDatasource } from '../../../../dataSources/card.datasource';
import { CreateEmailNotifier } from '../../../../dataSources/emailNotifier.datasource';
import publishCard from './publishCard.interactor';

const cardRepository = createCardDatasource();
const notifierRepository = CreateEmailNotifier();

export default publishCard(cardRepository, notifierRepository);
