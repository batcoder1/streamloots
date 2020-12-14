import { createCardDatasource } from '../../../../dataSources/card.datasource';
import { CreateEmailNotifier } from '../../../../dataSources/emailNotifier.datasource';
import saveCard from './saveCard.interactor';

const cardRepository = createCardDatasource();

export default saveCard(cardRepository);
