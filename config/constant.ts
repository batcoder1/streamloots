export const BASE_URL = 'http://localhost:9091';

export const allowedMethods = ['GET', 'PUT', 'POST', 'PATCH', 'DELETE'];

// stats
export const PUBLISHED_STAT = 'published';
export const CREATED_STAT = 'created';

export enum Path {
  cards = '/cards',
  card = '/card',
  publish = '/publish',
  unpublish = '/unpublish',
  user = '/user',
}
export enum raretyCardEnum {
  common = 'common',
  special = 'special',
  legendary = 'legendary',
}

export enum Collections {
  cards = 'cards',
}

// interfaces- types
export const CARD = 'Card';

export const interfaceTypes = new Set([CARD]);

export const NOT_CARD_OWNER = 'The user is not owner of the card';
export const NOT_AUTHORIZED = 'Not authorized to perform this operation';
export const BAD_REQUEST = 'Bad Request';
export const NOT_FOUND = 'Not Found';
export const USER_NOT_FOUND = 'User not found';
export const METHOD_NOT_IMPLEMENTED = 'Method is not implemented';
export const METHOD_NOT_ALLOWED = 'Method is not allowed';
export const CONTENT_TYPE_VALID = [
  'application/x-www-form-urlencoded;charset=utf-8',
  'application/x-www-form-urlencoded;',
  'application/x-www-form-urlencoded',
];

// HTTP Response codes
export const HTTP_CODE_NOT_FOUND = 404;
export const HTTP_CODE_OK = 200;
export const HTTP_CODE_BAD_REQUEST = 400;
export const HTTP_CODE_UNAUTHORIZED = 401;
export const HTTP_CODE_METHOD_IS_NOT_ALLOWED = 405;
export const HTTP_CODE_METHOD_IS_NOT_IMPLEMENTED = 501;
