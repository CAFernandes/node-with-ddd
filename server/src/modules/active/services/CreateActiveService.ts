import { getDataSource } from '@/connection/AppDataSource';
import { BadRequest } from '@/errors/BadRequest';
import { ICreateActiveDTO } from '@active/infra/dtos/ICreateActiveDTO';
import { Active } from '@active/infra/schema/Active';
import { Company } from '@company/infra/schema/Company';
import { Unit } from '@unit/infra/schema/Unit';
import { ObjectId, Repository } from 'typeorm';

export class CreateActiveService {
  constructor(readonly activeRepository: Repository<Active>) {}
  async execute({
    image,
    name,
    description,
    model,
    proprietary,
    status,
    health_level,
    company_id,
    unit_id,
  }: ICreateActiveDTO) {
    if (
      !name ||
      !description ||
      !model ||
      !proprietary ||
      !status ||
      !health_level ||
      !unit_id ||
      !company_id ||
      !image
    ) {
      throw new BadRequest('Dados inválidos');
    }
    await this.checkIfUnitExists(unit_id);
    await this.checkIfCompanyExist(company_id);
    await this.checkIfActiveExists(name, unit_id, company_id);

    return this.activeRepository.manager.insert(Active, {
      image,
      name,
      description,
      model,
      proprietary,
      status,
      health_level,
      company_id,
      unit_id,
    });
  }
  private async checkIfActiveExists(
    name: string,
    unit_id: string,
    company_id: string
  ) {
    const active = await this.activeRepository.findOne({
      where: {
        name,
        unit_id,
        company_id,
      },
    });
    if (active) {
      throw new BadRequest('Ativo já cadastrado');
    }
  }
  private async checkIfUnitExists(unit_id: string) {
    const unitsRepository = await getDataSource().then(dataSource =>
      dataSource.getMongoRepository(Unit)
    );
    const unit = await unitsRepository.findOne({ where: { unit_id } });
    if (!unit) {
      throw new BadRequest('Unidade não encontrada');
    }
  }
  private async checkIfCompanyExist(company_id: string) {
    const companiesRepository = await getDataSource().then(dataSource =>
      dataSource.getMongoRepository(Company)
    );
    const searchedCompany = await companiesRepository.findOne({
      where: {
        _id: new ObjectId(company_id),
      },
    });
    if (!searchedCompany) {
      throw new BadRequest('Empresa não encontrada');
    }
  }
}
