import { CreateUserDTO } from '@user/infra/dtos/CreateUserDTO';
import { UpdateUserDTO } from '@user/infra/dtos/UpdateUserDTO';
import { User } from '@user/infra/schema/entities/User';
import { Repository } from 'typeorm';
export interface IUserService {
  readonly userRepository: Repository<User>;

  execute(user: User|CreateUserDTO|UpdateUserDTO|string): Promise<any>;
}
