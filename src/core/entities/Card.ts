import { raretyCardEnum } from '../../../config/constant';
export default interface Card {
  id?: string;
  name: string;
  image: string;
  published: boolean;
  rarity: raretyCardEnum;
  limited: number;
  userId: string;
}
