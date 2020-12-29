import Card from '../../../entities/Card';
import CardRepository from '../../../repositories/card.repository';

const getCards = (cardRepository: CardRepository) => async (): Promise<
  Card[]
> => {
  return await cardRepository.getAll();
};

export default getCards;
