import { expect } from 'chai';
import getUsers from '.';
import { raretyCardEnum } from '../../../../../config/constant';
import UserModel from '../../../../dataSources/schema/user.schema';

const userTest = {
  name: 'test1',
  limited: 0,
  image: 'test1.jpg',
  rarity: raretyCardEnum.common,
  published: false,
  userId: '7bc74c5937b6b08419c24141',
};
const userTest2 = {
  name: 'test2',
  limited: 0,
  image: 'test2.jpg',
  rarity: raretyCardEnum.common,
  published: false,
  userId: '7bc74c5937b6b08419c24141',
};

describe('Test getCards', () => {
  before(async () => {
    await UserModel.deleteMany({});
    const schemaUser = new UserModel(userTest);
    await schemaUser.save();
    const schemaUser2 = new UserModel(userTest2);
    await schemaUser2.save();
  });

  it('getCards should respond a array of cards ', async () => {
    const cards = await getUsers();

    expect(cards.length).equals(2);
  });
});
