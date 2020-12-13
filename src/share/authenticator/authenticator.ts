import { Response, Request } from 'express';
import config from 'config';
import { HTTP_CODE_UNAUTHORIZED } from '../../../config/constant';
import { createErrorHandler } from '../error-handler/error.handler';
import jwt from 'jwt-simple';
// TOKEN V1
/**
 * IsAuthenticated
 * authenticate check
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
export function isAuthenticated(req: Request, res: Response, next: any) {
  try {
    const token = req.headers.authorization.split(' ')[1];
    decode(token);

    next();
  } catch (error) {
    createErrorHandler(HTTP_CODE_UNAUTHORIZED, error.message).throwIt();
  }
}

/**
 * decode
 * decode token
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
export async function decode(token: string) {
  const payload = jwt.decode(token, process.env.TOKEN_SECRET);

  const userId = payload.sub;

  if (!userId === config.get('owner')) {
    createErrorHandler(HTTP_CODE_UNAUTHORIZED, 'User not Authorized').throwIt();
  }
}
