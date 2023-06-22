import { Company } from '@company/infra/schema/Company';
import { Repository } from 'typeorm';

export class ListCompanyService {
  constructor(readonly companyRepository: Repository<Company>) {}
  async execute() {
    const company = await this.companyRepository.find();
    return company;
  }
}
