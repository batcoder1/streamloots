import CardRepository from '../../../repositories/card.repository';
import Card from '../../../entities/Card';

const getCardsByUser = (cardRepository: CardRepository) => async (
  user: string,
): Promise<any[]> => {
  const cards: Card[] = await cardRepository.getCardByUser(user);
  const totalCards: Card[] = await cardRepository.getCards();
  const cardsFormatted = cards.map((card) => {
    return {
      card,
      userCardsAmount: cards.length,
      totalCardsAmount: totalCards.length,
    };
  });

  return cardsFormatted;
};

export default getCardsByUser;
