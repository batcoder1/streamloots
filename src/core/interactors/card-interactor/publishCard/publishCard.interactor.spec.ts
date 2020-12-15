import { expect } from 'chai';
import publishCard from '.';
import { cardTypeEnum, raretyCardEnum } from '../../../../../config/constant';
import CardModel from '../../../../dataSources/schema/card.schema';
import getCardById from '../getCardById';

const cardTest1 = {
  name: 'test1',
  type: cardTypeEnum.regular,
  image: 'test1.jpg',
  rarity: raretyCardEnum.common,
  published: false,
  userId: '7bc74c5937b6b08419c24141',
};

const cardTest2 = {
  name: 'test1',
  type: cardTypeEnum.regular,
  image: 'test1.jpg',
  rarity: raretyCardEnum.common,
  published: false,
  userId: 'abc74c5937b6b08419c24141',
};

const cardsId: string[] = [];
const cardsId2: string[] = [];
describe('Test published', () => {
  before(async () => {
    await CardModel.deleteMany({});
    let schemaCard1 = new CardModel(cardTest1);
    const card1 = await schemaCard1.save();
    cardsId.push(card1.id);
    let schemaCard2 = new CardModel(cardTest2);
    const card2 = await schemaCard2.save();
    cardsId2.push(card2.id);
  });

  it('published should change published property to true', async () => {
    const publishedExpected = true;

    const res = await publishCard(cardsId, cardTest1.userId);
    console.log(res);
    const card = await getCardById(cardsId[0]);
    expect(card.published).equals(publishedExpected);
  });
  it('published should not allow to publish a card of another user', async () => {
    const publishedExpected = false;

    const res = await publishCard(cardsId2, cardTest1.userId);
    console.log(res);
    const card = await getCardById(cardsId2[0]);
    expect(card.published).equals(publishedExpected);
  });
});
