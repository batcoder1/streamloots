import { createCardDatasource } from '../../../../dataSources/card.datasource';
import getCards from '../getCardsByUser/getCardsByUser.interactor';

const cardRepository = createCardDatasource();

export default getCards(cardRepository);
