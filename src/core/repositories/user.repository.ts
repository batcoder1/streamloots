import { IUserDoc } from '../../dataSources/schema/user.schema';
import MainRepository from './main.repository';
interface UserRepository extends MainRepository<IUserDoc> {}
export default UserRepository;
