import { expect } from 'chai';
import getCardById from '.';
import { cardTypeEnum, raretyCardEnum } from '../../../../..//config/constant';
import CardModel from '../../../../dataSources/schema/card.schema';

const cardTest = {
  name: 'test1',
  type: cardTypeEnum.regular,
  image: 'test1.jpg',
  rarity: raretyCardEnum.common,
  published: false,
  userId: '7bc74c5937b6b08419c24141',
};

let cardTestId: string;
describe('Test getCardById', () => {
  before(async () => {
    await CardModel.deleteMany({});
    let schemaCard = new CardModel(cardTest);
    const card = await schemaCard.save();
    cardTestId = card.id;
  });

  it('getCardById should respond with a card ', async () => {
    const card = await getCardById(cardTestId);

    expect(card.name).equals(cardTest.name);
    expect(card.type).equals(cardTest.type);
    expect(card.image).equals(cardTest.image);
  });
});
