import { createCardDatasource } from '../../../../dataSources/card.datasource';
import { CreateDatadogNotifier } from '../../../../notifiers/datadog.notifier';
import { CreateGoogleNotifier } from '../../../../notifiers/google.notifier';
import saveCard from './saveCard.interactor';

const cardRepository = createCardDatasource();
const datadogRepository = CreateDatadogNotifier();
const googleRepository = CreateGoogleNotifier();

export default saveCard(cardRepository, datadogRepository, googleRepository);
