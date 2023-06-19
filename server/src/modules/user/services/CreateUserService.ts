import { IUserService } from './IUserService';
import { User } from '@user/infra/schema/entities/User';
import { InsertResult, Repository } from 'typeorm';
import { BadRequest } from '@/errors/BadRequest';
import { ObjectId } from 'mongodb';
import { Company } from '@company/infra/schema/entities/Company';
import { getDataSource } from '@/connection/AppDataSource';
import { CreateUserDTO } from '@user/infra/dtos/CreateUserDTO';
import { logger } from '@/utils/logger';

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

    const usernameExists = await this.checkIfUsernameExists(username, company_id);
    if (usernameExists) {
      throw new BadRequest('Username already exists');
    }
    const companyExists = await this.checkIfCompanyExists(company_id);
    if (!companyExists) {
      throw new BadRequest('Company does not exists');
    }

    return this.userRepository.manager.insert(User, { name, company_id, username, password, created_at });
  }

  private async checkIfUsernameExists(username: string, company_id: string): Promise<boolean> {
    const searchedUser = await this.userRepository.findOne({
      where: {
        username: username,
        company_id: company_id
      }
    })
    if (searchedUser) {
      return true;
    }
    return false;
  }

  private async checkIfCompanyExists(company_id: string): Promise<boolean> {
    const companiesRepository = await getDataSource().then((dataSource) => dataSource.getMongoRepository(Company));
    const searchedCompany = await companiesRepository.findOne({
      where: {
        _id: new ObjectId(company_id)
      }
    })
    if (searchedCompany) {
      return true;
    }
    return false;
  }

}
