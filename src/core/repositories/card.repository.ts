import { ICardDoc } from '../../dataSources/schema/card.schema';
import Card from '../entities/Card';
import MainRepository from './main.repository';
interface CardRepository extends MainRepository<ICardDoc> {
  getByUser(userId: string): Promise<Card[]>;
  getPublishedCardsOfUser(userId: string): Promise<Card[]>;
  publish(card: Card): Promise<Card>;
  unpublish(card: Card): Promise<Card>;
}
export default CardRepository;
