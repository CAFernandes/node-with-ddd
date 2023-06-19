import { CreateUserDTO } from '@user/infra/dtos/CreateUserDTO';
import { IUserService } from './IUserService';
import { User } from '@user/infra/schema/entities/User';
import { InsertResult, Repository } from 'typeorm';
import { BadRequest } from '@/errors/BadRequest';

export class CreateUserService implements IUserService {
  readonly userRepository: Repository<User>;
  constructor(userRepository: Repository<User>) {
    this.userRepository = userRepository;
  }
  async execute({ name, company_id, username, password, created_at }: CreateUserDTO): Promise<InsertResult> {
    if (!name) {
      throw new BadRequest('Name is required');
    }
    if (!company_id) {
      throw new BadRequest('Company is required');
    }
    if (!username) {
      throw new BadRequest('Username is required');
    }
    if (!password) {
      throw new BadRequest('Password is required');
    }
    if (!created_at) {
      throw new BadRequest('Created_at is required');
    }

    return this.userRepository.manager.insert(User, { name, company_id, username, password, created_at });
  }

}
