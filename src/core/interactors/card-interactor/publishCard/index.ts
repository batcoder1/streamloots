import { createCardDatasource } from '../../../../dataSources/card.datasource';
import { createDatadogNotifier } from '../../../../notifiers/datadog.notifier';
import publishCard from './publishCard.interactor';
import { createEmailNotifier } from '../../../../notifiers/email.notifier';
import { createGoogleNotifier } from '../../../../notifiers/google.notifier';

const cardRepository = createCardDatasource();
const notifierRepository = createEmailNotifier();
const dataDogRepository = createDatadogNotifier();
const googleRepository = createGoogleNotifier();

export default publishCard(
  cardRepository,
  dataDogRepository,
  googleRepository,
  notifierRepository,
);
