export const BASE_URL = 'http://localhost:9091';

// stats
export const PUBLISHED_STAT = 'published';
export const CREATED_STAT = 'created';

export enum Path {
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

export enum cardTypeEnum {
  regular = 'regular',
  limited = 'limited',
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

export const owner =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdHJlYW1sb290cy5jb20iLCJ1c2VySWQiOiI1YTUwMTU5MzA4ZjVhODAwMTExZGU3NTkiLCJpYXQiOjE1MTYyMzkwMjJ9.mj8-t--lfImQGg8HoA_9XOvDlunl3YJoPttkIbOHNMU';
export const user =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdHJlYW1sb290cy5jb20iLCJ1c2VySWQiOiI1YTUwMTU5MzA4ZjVhODAwMTExZGU3NTAiLCJpYXQiOjE1MTYyMzkwMjJ9.ArXF6iD5tX0DkKiS0EG3y30Bl3g_E8iLPkk98hJw0Pc';
