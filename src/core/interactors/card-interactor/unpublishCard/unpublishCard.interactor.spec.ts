import { expect } from 'chai';
import unpublishCard from '.';
import publishCard from '.';
import { raretyCardEnum } from '../../../../../config/constant';
import CardModel from '../../../../dataSources/schema/card.schema';
import getCardById from '../getCardById';

const cardTest1 = {
  name: 'test1',
  limited: 0,
  image: 'test1.jpg',
  rarity: raretyCardEnum.common,
  published: true,
  userId: '7bc74c5937b6b08419c24141',
};

const cardTest2 = {
  name: 'test1',
  limited: 0,
  image: 'test1.jpg',
  rarity: raretyCardEnum.common,
  published: true,
  userId: '7bc74c5937b6b08419c24141',
};

const cardsId: string[] = [];
const cardsId2: string[] = [];
describe('Test unpublished', () => {
  before(async () => {
    await CardModel.deleteMany({});
    const schemaCard1 = new CardModel(cardTest1);
    const card1 = await schemaCard1.save();
    cardsId.push(card1.id);
    const schemaCard2 = new CardModel(cardTest2);
    const card2 = await schemaCard2.save();
    cardsId2.push(card2.id);
  });

  it('unpublished should change property published to false ', async () => {
    const publishedExpected = false;
    await unpublishCard(cardsId, cardTest1.userId);
    const card = await getCardById(cardsId[0]);
    expect(card.published).equals(publishedExpected);
  });

  it('published should not allow to publish a card of another user', async () => {
    const publishedExpected = false;

    await publishCard(cardsId2, cardTest1.userId);
    const card = await getCardById(cardsId2[0]);
    expect(card.published).equals(publishedExpected);
  });
});
