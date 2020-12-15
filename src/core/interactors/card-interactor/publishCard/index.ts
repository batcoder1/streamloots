import { createCardDatasource } from '../../../../dataSources/card.datasource';
import { CreateDatadogNotifier } from '../../../../dataSources/datadog.datasource';
import { CreateEmailNotifier } from '../../../../dataSources/emailNotifier.datasource';
import { CreateGoogleNotifier } from '../../../../dataSources/google.datasource';
import publishCard from './publishCard.interactor';

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
