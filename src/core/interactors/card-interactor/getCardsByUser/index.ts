import { createCardDatasource } from '../../../../dataSources/card.datasource';
import getCardsByUser from './getCardsByUser.interactor';

const cardRepository = createCardDatasource();

export default getCardsByUser(cardRepository);
