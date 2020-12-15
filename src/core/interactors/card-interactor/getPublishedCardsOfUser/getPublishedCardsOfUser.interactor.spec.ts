import { expect } from 'chai';
import getCardsByUser from '.';
import getPublishCardsOfUser from '.';
import getCardById from '.';
import { raretyCardEnum } from '../../../../../config/constant';
import CardModel from '../../../../dataSources/schema/card.schema';

const cardTest = {
  name: 'test1',
  limited: 0,
  image: 'test1.jpg',
  rarity: raretyCardEnum.common,
  published: true,
  userId: '7bc74c5937b6b08419c24141',
};
const cardTest2 = {
  name: 'test2',
  limited: 0,
  image: 'test2.jpg',
  rarity: raretyCardEnum.common,
  published: false,
  userId: '7bc74c5937b6b08419c24141',
};

describe('Test getPublishCardsOfUser', () => {
  before(async () => {
    await CardModel.deleteMany({});
    let schemaCard = new CardModel(cardTest);
    await schemaCard.save();
    let schemaCard2 = new CardModel(cardTest2);
    await schemaCard2.save();
  });

  it('getPublishCardsOfUser should respond with the published cards', async () => {
    const cards = await getPublishCardsOfUser(cardTest.userId);

    expect(cards.length).equals(1);
    expect(cards[0].name).equals(cardTest.name);
    expect(cards[0].limited).equals(cardTest.limited);
    expect(cards[0].image).equals(cardTest.image);
  });
});
