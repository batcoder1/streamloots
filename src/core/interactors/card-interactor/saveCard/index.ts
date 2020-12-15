import { createCardDatasource } from '../../../../dataSources/card.datasource';
import { CreateDatadogNotifier } from '../../../../dataSources/datadog.datasource';
import { CreateGoogleNotifier } from '../../../../dataSources/google.datasource';
import saveCard from './saveCard.interactor';

const cardRepository = createCardDatasource();
const datadogRepository = CreateDatadogNotifier();
const googleRepository = CreateGoogleNotifier();

export default saveCard(cardRepository, datadogRepository, googleRepository);
