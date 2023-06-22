import { Active } from '@active/infra/schema/Active';
import { Repository } from 'typeorm';

export class ListActiveService {
  constructor(readonly activeRepository: Repository<Active>) {}
  async execute(company_id: string, unit_id: string): Promise<Active[]> {
    const active = await this.activeRepository.find({
      where: { company_id, unit_id },
    });
    return active;
  }
}
