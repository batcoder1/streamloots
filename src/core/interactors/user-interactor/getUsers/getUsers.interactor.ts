import User from '../../../entities/User';
import UserRepository from '../../../repositories/user.repository';

const getUsers = (userRepository: UserRepository) => async (): Promise<
  User[]
> => {
  return await userRepository.getAll();
};

export default getUsers;
