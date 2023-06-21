import { getDataSource } from '@/connection/AppDataSource';
import { Active } from '@active/infra/schema/Active';
import { CreateActiveService } from '@active/services/CreateActiveService';
import { DeleteActiveService } from '@active/services/DeleteActiveService';
import { UpdateActiveService } from '@active/services/UpdateActiveService';
import { NextFunction, Request, Response } from 'express';
import { ObjectId, Repository } from 'typeorm';

export class ActiveController {
  private static async getRepository(): Promise<Repository<Active>> {
    return await getDataSource().then(dataSource =>
      dataSource.getMongoRepository(Active)
    );
  }
  static async index(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | undefined> {
    try {
      const activeRepository = await ActiveController.getRepository();
      const actives = await activeRepository.find({
        where: { company_id: request?.user?.companyId || '' },
      });
      return response.json(actives);
    } catch (error) {
      next(error);
    }
  }
  static async show(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | undefined> {
    try {
      const activeRepository = await ActiveController.getRepository();
      const active = await activeRepository.findOne({
        where: {
          _id: new ObjectId(request.params.id),
          unit_id: request.params.unit_id,
          company_id: request?.user?.companyId || '',
        },
      });
      return response.json(active);
    } catch (error) {
      next(error);
    }
  }
  static async create(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | undefined> {
    try {
      const createActiveService = new CreateActiveService(
        await ActiveController.getRepository()
      );
      const active = await createActiveService.execute({
        ...request.body,
        company_id: request?.user?.companyId || '',
      });
      return response.json(active);
    } catch (error) {
      next(error);
    }
  }
  static async update(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | undefined> {
    try {
      const { id } = request.params;
      const activeRepository = await ActiveController.getRepository();
      const updateActiveService = new UpdateActiveService(activeRepository);
      const active = await updateActiveService.execute({
        ...request.body,
        id,
      });

      return response.json(active);
    } catch (error) {
      next(error);
    }
  }
  static async delete(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | undefined> {
    try {
      const { id } = request.params;
      const deleteActiveService = new DeleteActiveService(
        await ActiveController.getRepository()
      );
      await deleteActiveService.execute(id);
      return response.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
