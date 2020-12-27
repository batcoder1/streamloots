import { Request } from 'express';
import {
  HTTP_CODE_UNAUTHORIZED,
  NOT_AUTHORIZED,
} from '../../../config/constant';
import { createErrorHandler } from '../error-handler/error.handler';
interface Payload {
  userId: string;
}
/**
 * decode request token
 *
 * @param {Request} req
 * @returns {string}
 */
export const decodeToken = (req: Request): string => {
  const token = req.headers.authorization.split(' ')[1];
  const data = token.split('.')[1];
  if (!data) {
    createErrorHandler(HTTP_CODE_UNAUTHORIZED, NOT_AUTHORIZED).throwIt();
  }
  const buff: Buffer = Buffer.from(data, 'base64');
  const requestPayload: Payload = JSON.parse(buff.toString('ascii'));
  return requestPayload.userId;
};
