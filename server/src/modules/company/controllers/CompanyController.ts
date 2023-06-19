import { NextFunction, Request, Response } from 'express';
import { Company } from '@company/infra/schema/entities/Company';
import { getDataSource } from '@/connection/AppDataSource';
import { Repository } from 'typeorm';
import { CreateCompanyService } from '@company/services/CreateCompanyService';
import { UpdateCompanyService } from '@company/services/UpdateCompanyService';
import { DeleteCompanyService } from '@company/services/DeleteCompanyService';

export class CompanyController {
  private static async getRepository(): Promise<Repository<Company>> {
    return await getDataSource().then((dataSource) => dataSource.getMongoRepository(Company));
  }
  //* GET /companys - Listar todos os companys cadastrados no sistema (apenas para usuários autenticados - ADMIN)
  public static async index(request: Request, response: Response, next: NextFunction): Promise<Response|undefined> {
    try {
      const companyRepository = await CompanyController.getRepository();
      const companys = await companyRepository.find();
      return response.json(companys);
    } catch (error) {
      next(error);
    }
  }
  public static async store(request: Request, response: Response, next: NextFunction): Promise<Response|undefined> {
    try {
      const { name } = request.body;
      const created_at = new Date();
      const createCompanyService = new CreateCompanyService(await CompanyController.getRepository());
      const company = await createCompanyService.execute({ name, created_at });
      return response.json(company);
    } catch (error) {
      next(error)
    }
  }
  public static async show(request: Request, response: Response): Promise<Response> {
    const { name } = request.params;
    const companyRepository = await CompanyController.getRepository();
    const company = await companyRepository.find({ where: { name: name } });
    return response.json(company);
  }
  public static async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name } = request.body;
    const updateCompanyService = new UpdateCompanyService();
    // const company = await updateCompanyService.execute({ name });
    return response.json({});
  }
  public static async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteCompanyService = new DeleteCompanyService();
    // await deleteCompanyService.execute(id);
    return response.json([]);
  }

}
