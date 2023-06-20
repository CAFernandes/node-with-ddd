import { BadRequest } from '@/errors/BadRequest';
import { IUpdateUnitDTO } from '@unit/infra/dtos/IUpdateUnitDTO';
import { Unit } from '@unit/infra/schema/Unit';
import { ObjectId, Repository, UpdateResult } from 'typeorm';

export class UpdateUnitService {
  constructor(readonly unitRepository: Repository<Unit>) {}
  async execute({
    name,
    unit_id,
    company_id,
    updated_at,
  }: IUpdateUnitDTO): Promise<UpdateResult> {
    if (!updated_at) updated_at = new Date();
    if (!name) throw new BadRequest('Name is required');
    if (!unit_id) throw new BadRequest('Unit is required');
    if (!company_id) throw new BadRequest('Company is required');

    const unit = await this.findUnit(unit_id, company_id);
    return await this.unitRepository.update(unit, {
      name,
      updated_at,
    });
  }
  private async findUnit(unit_id: string, company_id: string): Promise<Unit> {
    const unit = await this.unitRepository.findOne({
      where: { _id: new ObjectId(unit_id), company_id },
    });
    if (!unit) {
      throw new BadRequest('Unit not found');
    }
    return unit;
  }
}
