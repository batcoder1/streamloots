import axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios';
import { expect } from 'chai';
import config from 'config';
import {
  BASE_URL,
  HTTP_CODE_BAD_REQUEST,
  HTTP_CODE_OK,
  HTTP_CODE_UNAUTHORIZED,
  NOT_CARD_OWNER,
  Path,
  raretyCardEnum,
} from '../../../config/constant';
import CardModel from '../../dataSources/schema/card.schema';
import * as server from '../../server';

const ownerToken: string = config.get('ownerToken');
const cardTest = {
  name: 'test1',
  limited: 0,
  image: 'test1.jpg',
  rarity: raretyCardEnum.common,
  published: false,
  //ownerId
  userId: '5a50159308f5a800111de759',
};
const cardTest2 = {
  name: 'test2',
  limited: 0,
  image: 'test2.jpg',
  rarity: raretyCardEnum.common,
  published: false,
  userId: '7bc74c5937b6b08419c24141',
};
const cardTest3 = {
  name: 'test3',
  limited: 0,
  image: 'test3.jpg',
  rarity: raretyCardEnum.common,
  published: true,
  userId: '7bc74c5937b6b08419c24141',
};
const baseUrl = BASE_URL;
let cardCreateId;

let cardTestId: string;
let cardTestId2: string;
describe('Test cards controller', () => {
  before(async () => {
    await server.start();
    await CardModel.deleteMany({});
    let schemaCard = new CardModel(cardTest);
    const card = await schemaCard.save();
    cardTestId = card.id;
    let schemaCard2 = new CardModel(cardTest2);
    const card2 = await schemaCard2.save();
    cardTestId2 = card2.id;
    let schemaCard3 = new CardModel(cardTest3);
    const card3 = await schemaCard3.save();
  });
  after(async () => {
    server.stopServer();
  });

  it('PUT cards should respond 200 ', async () => {
    const postDataApi = {
      name: 'Asgully',
      limited: 0,
      image: 'asgully.jpg',
      rarity: raretyCardEnum.common,
      published: false,
    };

    const endpoint = `${Path.cards}${Path.card}`;
    const method: Method = 'put';
    const resp = await apiCall(postDataApi, endpoint, method, ownerToken);
    cardCreateId = resp.data.id;
    expect(resp.status).equals(HTTP_CODE_OK);
    expect(resp.data.name).equals(postDataApi.name);
  });

  it('PUT cards should respond 401 ', async () => {
    const postDataApi = {
      name: 'Asgully',
      limited: 0,
      image: 'asgully.jpg',
      rarity: raretyCardEnum.common,
      published: false,
    };

    const endpoint = `${Path.cards}${Path.card}`;
    const method: Method = 'put';
    const resp = await apiCall(postDataApi, endpoint, method);
    cardCreateId = resp.data.id;
    expect(resp.status).equals(HTTP_CODE_UNAUTHORIZED);
  });

  it('GET user cards method in cards should  respond 200 and get all user (=owner) cards ', async () => {
    const postDataApi = {};

    const endpoint = `${Path.cards}?userId=${cardTest.userId}`;
    const method: Method = 'get';
    const resp = await apiCall(postDataApi, endpoint, method, ownerToken);

    expect(resp.status).equals(HTTP_CODE_OK);
    expect(resp.data[0].name).eq(cardTest.name);
    expect(resp.data[0].limited).eq(cardTest.limited);
    expect(resp.data[0].image).eq(cardTest.image);
    expect(resp.data[0].published).eq(cardTest.published);
    expect(resp.data[0].userId).eq(cardTest.userId);
  });

  it('GET user cards method in cards should respond 200 and get published car of user ', async () => {
    const postDataApi = {};

    const endpoint = `${Path.cards}?userId=${cardTest2.userId}`;
    const method: Method = 'get';
    const resp = await apiCall(postDataApi, endpoint, method, ownerToken);
    expect(resp.status).equals(HTTP_CODE_OK);
    expect(resp.data[0].name).eq(cardTest3.name);
    expect(resp.data[0].limited).eq(cardTest3.limited);
    expect(resp.data[0].image).eq(cardTest3.image);
    expect(resp.data[0].published).eq(cardTest3.published);
    expect(resp.data[0].userId).eq(cardTest3.userId);
  });

  it('GET card should respod 200 and return a card ', async () => {
    const postDataApi = {};

    const endpoint = `${Path.cards}${Path.card}?id=${cardTestId}`;
    const method: Method = 'get';
    const resp = await apiCall(postDataApi, endpoint, method, ownerToken);
    expect(resp.status).equals(HTTP_CODE_OK);
    expect(resp.data.name).eq(cardTest.name);
    expect(resp.data.limited).eq(cardTest.limited);
    expect(resp.data.image).eq(cardTest.image);
    expect(resp.data.published).eq(cardTest.published);
    expect(resp.data.userId).eq(cardTest.userId);
  });

  it('GET card without id should respond 400  ', async () => {
    const postDataApi = {};

    const endpoint = `${Path.cards}${Path.card}?id=`;
    const method: Method = 'get';
    const resp = await apiCall(postDataApi, endpoint, method);
    expect(resp.status).equals(HTTP_CODE_BAD_REQUEST);
  });

  it('delete method in cards should respond 400 ', async () => {
    const postDataApi = {};

    const endpoint = Path.cards;
    const method: Method = 'delete';
    const resp = await apiCall(postDataApi, endpoint, method);
    expect(HTTP_CODE_BAD_REQUEST).equals(resp.status);
  });
  it('options method in cards should respond 400 ', async () => {
    const postDataApi = {};

    const endpoint = Path.cards;
    const method: Method = 'options';
    const resp = await apiCall(postDataApi, endpoint, method);
    expect(HTTP_CODE_BAD_REQUEST).equals(resp.status);
  });

  it('PATCH card should respond 200 and card updated ', async () => {
    const postDataApi = {
      id: cardTestId,
      name: 'TestUpdate',
    };

    const endpoint = `${Path.cards}${Path.card}`;
    const method: Method = 'patch';
    const resp = await apiCall(postDataApi, endpoint, method, ownerToken);
    expect(resp.status).equals(HTTP_CODE_OK);
    expect(resp.data.name).equals(postDataApi.name);
    expect(resp.data.id).equals(cardTestId);
    expect(resp.data.limited).equals(cardTest.limited);
    expect(resp.data.image).equals(cardTest.image);
  });
  it('PATCH card should respond 401, user not ownerToken of card ', async () => {
    const postDataApi = {
      id: cardTestId2,
      name: 'TestUpdate',
    };

    const endpoint = `${Path.cards}${Path.card}?id=`;
    const method: Method = 'patch';
    const resp = await apiCall(postDataApi, endpoint, method, ownerToken);

    expect(resp.status).equals(HTTP_CODE_UNAUTHORIZED);
    expect(resp.data.error.description).equals(NOT_CARD_OWNER);
  });
  it('Published cards should respond 200', async () => {
    const postDataApi = [cardTestId];

    const endpoint = `${Path.cards}${Path.publish}`;
    const method: Method = 'post';
    const resp = await apiCall(postDataApi, endpoint, method, ownerToken);

    expect(resp.status).equals(HTTP_CODE_OK);
  });
  it('Published cards should respond 401', async () => {
    const postDataApi = [cardTestId];

    const endpoint = `${Path.cards}${Path.publish}`;
    const method: Method = 'post';
    const resp = await apiCall(postDataApi, endpoint, method);

    expect(resp.status).equals(HTTP_CODE_UNAUTHORIZED);
  });
});

async function apiCall(
  dataRequest: any,
  endpoint: string,
  method: Method,
  user?: string,
): Promise<AxiosResponse> {
  try {
    const config: AxiosRequestConfig = {
      url: endpoint,
      method,
      baseURL: baseUrl,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        authorization: `token ${user}`,
      },
      data: dataRequest,
    };
    const response = await axios(config);

    return response;
  } catch (error) {
    return error.response;
  }
}
