import axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios';
import config from 'config';
import util from 'util';
import { Path } from '../config/constant';
import { CARDS } from './cards';
const exec = util.promisify(require('child_process').exec);

const BASE_URL = 'http://localhost:9091';
const ownerToken = config.get('ownerToken');
const cardIds: string[] = [];
async function load() {
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
}

async function apiCall(
  dataRequest: any,
  endpoint: string,
  method: Method,
): Promise<AxiosResponse> {
  try {
    const config: AxiosRequestConfig = {
      url: endpoint,
      method,
      baseURL: BASE_URL,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        authorization: `token ${ownerToken}`,
      },
      data: dataRequest,
    };
    const response = await axios(config);

    return response;
  } catch (error) {
    return error.response;
  }
}

load();
