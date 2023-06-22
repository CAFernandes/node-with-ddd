import { User } from '@user/infra/schema/User';
import { Repository } from 'typeorm';

export class ListUserService {
  constructor(readonly userRepository: Repository<User>) {}
  async execute(company_id: string): Promise<User[]> {
    const users = await this.userRepository.find({
      where: { company_id },
    });
    return users;
  }
}
