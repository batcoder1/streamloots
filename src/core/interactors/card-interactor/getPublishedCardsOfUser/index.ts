import { createCardDatasource } from '../../../../dataSources/card.datasource';
import getPublishedCardsOfUser from './getPublishedCardsOfUser.interactor';

const cardRepository = createCardDatasource();

export default getPublishedCardsOfUser(cardRepository);
