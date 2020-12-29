import Card from '../entities/Card';

/**
 * Adapt Card object to ICardDoc
 *
 * @param {Card} card
 * @returns {ICardDoc}
 */
const cardAdapter = (card: Card): any => {
  const cardDoc = {
    name: card.name,
    image: card.image,
    rarity: card.rarity,
    published: card.published,
    limited: card.limited,
    userId: card.userId,
  };
  return cardDoc;
};

export default cardAdapter;
