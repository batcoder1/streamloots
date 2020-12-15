import axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios';
import { expect } from 'chai';
import config from 'config';
import {
  BASE_URL,
  cardTypeEnum,
  Collections,
  HTTP_CODE_BAD_REQUEST,
  HTTP_CODE_NOT_FOUND,
  HTTP_CODE_OK,
  HTTP_CODE_UNAUTHORIZED,
  NOT_CARD_OWNER,
  owner,
  Path,
  raretyCardEnum,
} from '../../../config/constant';
import * as server from '../../server';
import CardModel from '../../dataSources/schema/card.schema';

const cardTest = {
  name: 'test1',
  type: cardTypeEnum.regular,
  image: 'test1.jpg',
  rarity: raretyCardEnum.common,
  published: false,
  //ownerId
  userId: '5a50159308f5a800111de759',
};
const cardTest2 = {
  name: 'test2',
  type: cardTypeEnum.regular,
  image: 'test2.jpg',
  rarity: raretyCardEnum.common,
  published: false,
  userId: '7bc74c5937b6b08419c24141',
};
const baseUrl = BASE_URL;
let cardCreateId;

let cardTestId: string;
let cardTestId2: string;
describe.only('Test cards controller', () => {
  before(async () => {
    await server.start();
    await CardModel.deleteMany({});
    let schemaCard = new CardModel(cardTest);
    const card = await schemaCard.save();
    cardTestId = card.id;
    let schemaCard2 = new CardModel(cardTest2);
    const card2 = await schemaCard2.save();
    cardTestId2 = card2.id;
  });
  after(async () => {
    server.stopServer();
  });

  it('PUT cards should respond 200 ', async () => {
    const postDataApi = {
      name: 'Asgully',
      type: cardTypeEnum.regular,
      image: 'asgully.jpg',
      rarity: raretyCardEnum.common,
      published: false,
    };

    const endpoint = Path.card;
    const method: Method = 'put';
    const resp = await apiCall(postDataApi, endpoint, method, owner);
    cardCreateId = resp.data.id;
    expect(resp.status).equals(HTTP_CODE_OK);
    expect(resp.data.name).equals(postDataApi.name);
  });

  it('PUT cards should respond 401 ', async () => {
    const postDataApi = {
      name: 'Asgully',
      type: cardTypeEnum.regular,
      image: 'asgully.jpg',
      rarity: raretyCardEnum.common,
      published: false,
    };

    const endpoint = Path.card;
    const method: Method = 'put';
    const resp = await apiCall(postDataApi, endpoint, method);
    cardCreateId = resp.data.id;
    expect(resp.status).equals(HTTP_CODE_UNAUTHORIZED);
  });

  it('GET user cards method in cards should respond 200 ', async () => {
    const postDataApi = {};

    const endpoint = `${Path.card}/user?userId=${cardTest.userId}`;
    const method: Method = 'get';
    const resp = await apiCall(postDataApi, endpoint, method);
    expect(resp.status).equals(HTTP_CODE_OK);
    expect(resp.data[0].name).eq(cardTest.name);
    expect(resp.data[0].type).eq(cardTest.type);
    expect(resp.data[0].image).eq(cardTest.image);
    expect(resp.data[0].published).eq(cardTest.published);
    expect(resp.data[0].userId).eq(cardTest.userId);
  });

  it('GET card should respod 200 and return a card ', async () => {
    const postDataApi = {};

    const endpoint = `${Path.card}?id=${cardTestId}`;
    const method: Method = 'get';
    const resp = await apiCall(postDataApi, endpoint, method, owner);
    expect(resp.status).equals(HTTP_CODE_OK);
    expect(resp.data.name).eq(cardTest.name);
    expect(resp.data.type).eq(cardTest.type);
    expect(resp.data.image).eq(cardTest.image);
    expect(resp.data.published).eq(cardTest.published);
    expect(resp.data.userId).eq(cardTest.userId);
  });

  it('GET card without id should respond 400  ', async () => {
    const postDataApi = {};

    const endpoint = `${Path.card}?id=`;
    const method: Method = 'get';
    const resp = await apiCall(postDataApi, endpoint, method);
    expect(resp.status).equals(HTTP_CODE_BAD_REQUEST);
  });

  it('delete method in cards should respond 400 ', async () => {
    const postDataApi = {};

    const endpoint = Path.card;
    const method: Method = 'delete';
    const resp = await apiCall(postDataApi, endpoint, method);
    expect(HTTP_CODE_BAD_REQUEST).equals(resp.status);
  });
  it('options method in cards should respond 400 ', async () => {
    const postDataApi = {};

    const endpoint = Path.card;
    const method: Method = 'options';
    const resp = await apiCall(postDataApi, endpoint, method);
    expect(HTTP_CODE_BAD_REQUEST).equals(resp.status);
  });

  it('PATCH card should respond 200 and card updated ', async () => {
    const postDataApi = {
      id: cardTestId,
      name: 'TestUpdate',
    };

    const endpoint = Path.card;
    const method: Method = 'patch';
    const resp = await apiCall(postDataApi, endpoint, method, owner);

    expect(resp.status).equals(HTTP_CODE_OK);
    expect(resp.data.name).equals(postDataApi.name);
    expect(resp.data.id).equals(cardTestId);
    expect(resp.data.type).equals(cardTest.type);
    expect(resp.data.image).equals(cardTest.image);
  });
  it('PATCH card should respond 401, user not owner of card ', async () => {
    const postDataApi = {
      id: cardTestId2,
      name: 'TestUpdate',
    };

    const endpoint = Path.card;
    const method: Method = 'patch';
    const resp = await apiCall(postDataApi, endpoint, method, owner);

    expect(resp.status).equals(HTTP_CODE_UNAUTHORIZED);
    expect(resp.data.error.description).equals(NOT_CARD_OWNER);
  });
  it('Published cards should respond 200', async () => {
    const postDataApi = [cardTestId];

    const endpoint = `${Path.card}/${Path.publish}`;
    const method: Method = 'post';
    const resp = await apiCall(postDataApi, endpoint, method, owner);

    expect(resp.status).equals(HTTP_CODE_OK);
  });
  it('Published cards should respond 401', async () => {
    const postDataApi = [cardTestId];

    const endpoint = `${Path.card}/${Path.publish}`;
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
