import { BadRequest } from '@/errors/BadRequest';
import { IUpdateActiveDTO } from '@active/infra/dtos/IUpdateActiveDTO';
import { Active } from '@active/infra/schema/Active';
import { ObjectId, Repository, UpdateResult } from 'typeorm';

export class UpdateActiveService {
  constructor(readonly activeRepository: Repository<Active>) {}
  async execute({
    id,
    status,
    health_level,
  }: IUpdateActiveDTO): Promise<Active> {
    const active = await this.findActive(id);
    const updated_at = new Date();
    this.activeRepository.merge(active, { status, health_level, updated_at });
    return await this.activeRepository.save(active);
  }
  private async findActive(id: string): Promise<Active> {
    const active = await this.activeRepository.findOneBy({
      _id: new ObjectId(id),
    });
    if (!active) {
      throw new BadRequest('Active not found');
    }
    return active;
  }
}
