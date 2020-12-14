import { createCardDatasource } from '../../../../dataSources/card.datasource';
import getCardById from './getCardById.interactor';

const cardRepository = createCardDatasource();

export default getCardById(cardRepository);
