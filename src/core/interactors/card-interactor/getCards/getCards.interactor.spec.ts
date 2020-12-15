import { expect } from 'chai';
import getCards from '.';
import getCardById from '.';
import { cardTypeEnum, raretyCardEnum } from '../../../../../config/constant';
import CardModel from '../../../../dataSources/schema/card.schema';

const cardTest = {
  name: 'test1',
  type: cardTypeEnum.regular,
  image: 'test1.jpg',
  rarity: raretyCardEnum.common,
  published: false,
  userId: '7bc74c5937b6b08419c24141',
};
const cardTest2 = {
  name: 'test2',
  type: cardTypeEnum.regular,
  image: 'test2.jpg',
  rarity: raretyCardEnum.common,
  published: false,
  userId: '7bc74c5937b6b08419c24141',
};

describe('Test getCards', () => {
  before(async () => {
    await CardModel.deleteMany({});
    let schemaCard = new CardModel(cardTest);
    await schemaCard.save();
    let schemaCard2 = new CardModel(cardTest2);
    await schemaCard2.save();
  });

  it('getCards should respond a array of cards ', async () => {
    const cards = await getCards(cardTest.userId);

    expect(cards.length).equals(2);
  });
});
