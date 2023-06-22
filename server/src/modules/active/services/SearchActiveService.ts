import { Active } from '@active/infra/schema/Active';
import { ObjectId, Repository } from 'typeorm';

export class SearchActiveService {
  constructor(readonly activeRepository: Repository<Active>) {}
  async execute(id: string): Promise<Active | null> {
    const active = await this.activeRepository.findOne({
      where: { _id: new ObjectId(id) },
    });
    return active;
  }
}
