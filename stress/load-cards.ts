import axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios';
import config from 'config';
import { Path } from '../config/constant';
import { CARDS } from './cards';
import fs from 'fs';

const cardIds: string[] = [];
const BASE_URL = 'http://localhost:9091';
const ownerToken = config.get('ownerToken');

const load = async () => {
  console.log('load.......');
  for (const card of CARDS) {
    const postDataApi = card;

    const endpoint = `${Path.cards}${Path.card}`;
    const method: Method = 'put';
    try {
      const resp = await apiCall(postDataApi, endpoint, method);
      console.log(resp.data.id);
      cardIds.push(resp.data.id);
    } catch (error) {
      console.log(error);
    }
  }
  writeCardsIdsInFile(cardIds);
};
const writeCardsIdsInFile = (ids: string[]) => {
  const file = fs.createWriteStream(__dirname + `/cards-ids-loaded.ts`, {
    flags: 'w',
  });

  file.write(`export const cardsIdsLoaded =[`);
  ids.forEach((id) => file.write(`"${id}",`));
  file.write(`];`);
};
const apiCall = async (
  dataRequest: any,
  endpoint: string,
  method: Method,
): Promise<AxiosResponse> => {
  try {
    const configRequest: AxiosRequestConfig = {
      url: endpoint,
      method,
      baseURL: BASE_URL,
      headers: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Content-Type': 'application/json; charset=utf-8',
        authorization: `token ${ownerToken}`,
      },
      data: dataRequest,
    };
    const response = await axios(configRequest);

    return response;
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return error.response;
  }
};

void load();
