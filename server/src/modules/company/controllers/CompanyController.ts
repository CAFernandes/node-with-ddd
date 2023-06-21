import { getDataSource } from '@/connection/AppDataSource';
import { Company } from '@company/infra/schema/Company';
import { CreateCompanyService } from '@company/services/CreateCompanyService';
import { DeleteCompanyService } from '@company/services/DeleteCompanyService';
import { UpdateCompanyService } from '@company/services/UpdateCompanyService';
import { NextFunction, Request, Response } from 'express';
import { Repository } from 'typeorm';

export class CompanyController {
  private static async getRepository(): Promise<Repository<Company>> {
    return await getDataSource().then(dataSource =>
      dataSource.getMongoRepository(Company)
    );
  }
  //* GET /companys - Listar todos os companys cadastrados no sistema (apenas para usuários autenticados - ADMIN)
  public static async index(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | undefined> {
    try {
      const companyRepository = await CompanyController.getRepository();
      const companys = await companyRepository.find();
      return response.json(companys);
    } catch (error) {
      next(error);
    }
  }
  public static async create(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | undefined> {
    try {
      const { name }: { name: string } = request.body;
      const created_at = new Date();
      const createCompanyService = new CreateCompanyService(
        await CompanyController.getRepository()
      );
      const company = await createCompanyService.execute({ name, created_at });
      return response.json(company);
    } catch (error) {
      next(error);
    }
  }
  public static async show(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { name } = request.params;
    const companyRepository = await CompanyController.getRepository();
    const company = await companyRepository.find({ where: { name: name } });
    return response.json(company);
  }
  public static async update(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { name, company_id } = request.body;
    const updateCompanyService = new UpdateCompanyService(
      await CompanyController.getRepository()
    );
    const company = await updateCompanyService.execute({
      name,
      company_id: company_id,
    });
    return response.json(company);
  }
  public static async delete(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { id } = request.params;
    const deleteCompanyService = new DeleteCompanyService(
      await CompanyController.getRepository()
    );
    await deleteCompanyService.execute(id);
    return response.status(204).send();
  }
}
