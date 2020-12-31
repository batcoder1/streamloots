import { IUserDoc } from '../../dataSources/schema/user.schema';
import MainRepository from './main.repository';
interface CardRepository extends MainRepository<IUserDoc> {}
export default CardRepository;
