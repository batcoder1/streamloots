import { MainDatasource } from './main.datasource';
import UserModel, { IUserDoc } from './schema/user.schema';

export class UserDatasource extends MainDatasource<IUserDoc> {
  private static instance: UserDatasource;

  constructor() {
    super(UserModel);
  }

  public static getInstance(): UserDatasource {
    if (!UserDatasource.instance) {
      UserDatasource.instance = new UserDatasource();
    }
    return UserDatasource.instance;
  }
}

export const createUserDatasource = (): UserDatasource => {
  return UserDatasource.getInstance();
};
