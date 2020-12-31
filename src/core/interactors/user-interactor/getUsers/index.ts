import { createUserDatasource } from '../../../../dataSources/user.datasource';
import getUsers from './getUsers.interactor';

const userRepository = createUserDatasource();

export default getUsers(userRepository);
