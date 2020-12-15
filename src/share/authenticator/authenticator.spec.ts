import { expect } from 'chai';
import { request } from 'express';
import { BASE_URL, owner, raretyCardEnum } from '../../../config/constant';
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
const baseUrl = BASE_URL;
let cardCreateId;

let cardTestId: string;
describe('Test auh', () => {
  before(async () => {
    await server.start();
    await CardModel.deleteMany({});
    let schemaCard = new CardModel(cardTest);
    const card = await schemaCard.save();
    cardTestId = card.id;
  });
  after(async () => {
    server.stopServer();
  });

  it('getUserIdFromToken should return error if the user is not authorized ', async () => {
    const req = request;
    const userIdExpected = '5a50159308f5a800111de759';
    req.headers = {
      authorization: `token ${owner}`,
    };

    const userId = decodeToken(req);
    expect(userId).eq(userIdExpected);
  });
});
