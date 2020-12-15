import { createCardDatasource } from '../../../../dataSources/card.datasource';
import { CreateDatadogNotifier } from '../../../../notifiers/datadog.notifier';
import publishCard from './publishCard.interactor';
import { CreateEmailNotifier } from '../../../../notifiers/email.notifier';
import { CreateGoogleNotifier } from '../../../../notifiers/google.notifier';

const cardRepository = createCardDatasource();
const notifierRepository = CreateEmailNotifier();
const dataDogRepository = CreateDatadogNotifier();
const googleRepository = CreateGoogleNotifier();

export default publishCard(
  cardRepository,
  dataDogRepository,
  googleRepository,
  notifierRepository,
);
