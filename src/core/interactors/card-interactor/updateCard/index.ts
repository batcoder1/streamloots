import { createCardDatasource } from '../../../../dataSources/card.datasource';
import updateCard from './updateCard.interactor';

const cardRepository = createCardDatasource();

export default updateCard(cardRepository);
