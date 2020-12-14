import { createCardDatasource } from '../../../../dataSources/card.datasource';
import getCardsByUser from '../getCardsByUser/getCardsByUser.interactor';

const cardRepository = createCardDatasource();

export default getCardsByUser(cardRepository);
