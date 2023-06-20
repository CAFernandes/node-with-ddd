import { getDataSource } from '@/connection/AppDataSource';
import { Active } from '@active/infra/schema/Active';
import { CreateActiveService } from '@active/services/CreateActiveService';
import { NextFunction, Request, Response } from 'express';
import { Repository } from 'typeorm';

export class ActiveController {
  private static async getRepository(): Promise<Repository<Active>> {
    return await getDataSource().then(dataSource =>
      dataSource.getMongoRepository(Active)
    );
  }
  static async create(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const createActiveService = new CreateActiveService(
        await ActiveController.getRepository()
      );
      const active = await createActiveService.execute(request.body);
      return response.json(active);
    } catch (error) {
      next(error);
    }
  }
}
