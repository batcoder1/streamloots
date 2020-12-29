import CardRepository from '../../../repositories/card.repository';
import Card from '../../../entities/Card';

const getCardById = (cardRepository: CardRepository) => async (
  id: string,
): Promise<Card> => {
  return await cardRepository.getById(id);
};

export default getCardById;
