import { Repository } from 'typeorm';

import { CreateUserDTO } from '@user/infra/dtos/CreateUserDTO';
import { UpdateUserDTO } from '@user/infra/dtos/UpdateUserDTO';
import { User } from '@user/infra/schema/User';

export interface IUserService {
  readonly userRepository: Repository<User>;

  execute(user: User | CreateUserDTO | UpdateUserDTO | string): Promise<any>;
}
