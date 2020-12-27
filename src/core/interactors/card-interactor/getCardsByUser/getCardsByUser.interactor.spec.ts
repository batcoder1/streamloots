import { expect } from 'chai';
import getCardsByUser from '.';
import { raretyCardEnum } from '../../../../../config/constant';
import CardModel from '../../../../dataSources/schema/card.schema';

const cardTest = {
  name: 'test1',
  limited: 0,
  image: 'test1.jpg',
  rarity: raretyCardEnum.common,
  published: false,
  userId: '7bc74c5937b6b08419c24141',
};
const cardTest2 = {
  name: 'test2',
  limited: 0,
  image: 'test2.jpg',
  rarity: raretyCardEnum.common,
  published: false,
  userId: '1ac74c5937b6b08419c24542',
};

describe('Test cardsByUserr', () => {
  before(async () => {
    await CardModel.deleteMany({});
    const schemaCard = new CardModel(cardTest);
    await schemaCard.save();
    const schemaCard2 = new CardModel(cardTest2);
    await schemaCard2.save();
  });

  it('getCardsByUser should respond with a card ', async () => {
    const cards = await getCardsByUser(cardTest.userId);

    expect(cards.length).equals(1);
    expect(cards[0].name).equals(cardTest.name);
    expect(cards[0].limited).equals(cardTest.limited);
    expect(cards[0].image).equals(cardTest.image);
  });
});
