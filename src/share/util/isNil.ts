// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const isNil = (property: any): boolean => {
  return !property || property === undefined || property === null;
};
export default isNil;
