import { expect } from 'chai';
import { request } from 'express';
import config from 'config';
import { raretyCardEnum } from '../../../config/constant';
import CardModel from '../../dataSources/schema/card.schema';
import * as server from '../../server';
import { decodeToken } from './authenticator';

const cardTest = {
  name: 'test1',
  limited: 0,
  image: 'test1.jpg',
  rarity: raretyCardEnum.common,
  published: false,
  userId: '7bc74c5937b6b08419c24141',
};
const owner = config.get('ownerToken');
describe('Test auh', () => {
  before(async () => {
    server.start();
    await CardModel.deleteMany({});
    const schemaCard = new CardModel(cardTest);
    await schemaCard.save();
  });
  after(() => {
    server.stopServer();
  });

  it('getUserIdFromToken should return error if the user is not authorized ', () => {
    const req = request;
    const userIdExpected = '5a50159308f5a800111de759';
    req.headers = {
      authorization: `token ${owner}`,
    };

    const userId: string = decodeToken(req);
    expect(userId).eq(userIdExpected);
  });
});
