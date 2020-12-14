import { createCardDatasource } from '../../../../dataSources/card.datasource';
import getCards from './getCardsByUser.interactor';

const cardRepository = createCardDatasource();

export default getCards(cardRepository);
