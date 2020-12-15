import NotifierRepository from '../../../repositories/analytic.repository';
import CardRepository from '../../../repositories/card.repository';
import Card from '../../../entities/Card';

const getCards = (cardRepository: CardRepository) => async (): Promise<
  Card[]
> => {
  return await cardRepository.getCards();
};

export default getCards;
