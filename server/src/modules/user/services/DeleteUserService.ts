import { User } from '@user/infra/schema/User';
import { IUserService } from './IUserService';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';

export class DeleteUserService implements IUserService {
  readonly userRepository: Repository<User>;
  constructor(userRepository: Repository<User>) {
    this.userRepository = userRepository;
  }
  async execute(user: string): Promise<void> {
    await this.userRepository.delete({ _id: new ObjectId(user) });
  }
}
