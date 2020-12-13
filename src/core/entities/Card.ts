import { cardTypeEnum } from '../../../config/constant';
export default interface Card {
  id: string;
  name: string;
  type: cardTypeEnum;
  image: string;
  rarity: string;

  private: boolean;
}
