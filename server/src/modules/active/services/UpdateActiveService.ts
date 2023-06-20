import { BadRequest } from '@/errors/BadRequest';
import { IUpdateActiveDTO } from '@active/infra/dtos/IUpdateActiveDTO';
import { Active } from '@active/infra/schema/Active';
import { ObjectId, Repository, UpdateResult } from 'typeorm';

export class UpdateActiveService {
  constructor(readonly activeRepository: Repository<Active>) {}
  async execute({
    id,
    unit_id,
    company_id,
    status,
    health_level,
  }: IUpdateActiveDTO): Promise<UpdateResult> {
    const active = await this.findActive(id, unit_id, company_id);
    const updated_at = new Date();
    return await this.activeRepository.update(active, {
      status,
      health_level,
      updated_at,
    });
  }
  private async findActive(
    id: string,
    unit_id: string,
    company_id: string
  ): Promise<Active> {
    const active = await this.activeRepository.findOne({
      where: { _id: new ObjectId(id), unit_id, company_id },
    });
    if (!active) {
      throw new BadRequest('Active not found');
    }
    return active;
  }
}
