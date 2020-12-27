import { createCardDatasource } from '../../../../dataSources/card.datasource';
import { createDatadogNotifier } from '../../../../notifiers/datadog.notifier';
import { createGoogleNotifier } from '../../../../notifiers/google.notifier';
import saveCard from './saveCard.interactor';

const cardRepository = createCardDatasource();
const datadogRepository = createDatadogNotifier();
const googleRepository = createGoogleNotifier();

export default saveCard(cardRepository, datadogRepository, googleRepository);
