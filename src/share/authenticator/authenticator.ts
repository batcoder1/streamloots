import { Request } from 'express';
import {
  HTTP_CODE_UNAUTHORIZED,
  NOT_AUTHORIZED,
} from '../../../config/constant';
import { createErrorHandler } from '../error-handler/error.handler';
/**
 * decodeToken
 * @param {*} req
 * @returns userId
 */
export function decodeToken(req: Request) {
  const token = req.headers.authorization.split(' ')[1];
  const data = token.split('.')[1];
  if (!data) {
    createErrorHandler(HTTP_CODE_UNAUTHORIZED, NOT_AUTHORIZED).throwIt();
  }
  const buff = Buffer.from(data, 'base64');
  const payload = JSON.parse(buff.toString('ascii'));
  return payload.userId;
}
