import { ObjectID } from 'mongodb';
import { cardTypeEnum, raretyCardEnum } from '../../../config/constant';
export default interface Card {
  id?: string;
  name: string;
  type: cardTypeEnum;
  image: string;
  published: boolean;
  rarity: raretyCardEnum;
  userId: string;
}
