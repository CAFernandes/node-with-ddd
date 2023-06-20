import { getDataSource } from '@/connection/AppDataSource';
import { Unit } from '@unit/infra/schema/Unit';
import { CreateUnitService } from '@unit/services/CreateUnitService';
import { UpdateUnitService } from '@unit/services/UpdateUnitService';
import { NextFunction, Request, Response } from 'express';
import { ObjectId, Repository } from 'typeorm';

export class UnitsController {
  private static async getRepository(): Promise<Repository<Unit>> {
    return await getDataSource().then(dataSource =>
      dataSource.getMongoRepository(Unit)
    );
  }
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const createUnitService = new CreateUnitService(
        await UnitsController.getRepository()
      );
      const unit = await createUnitService.execute({
        ...req.body,
      });
      return res.status(201).json(unit);
    } catch (error) {
      next(error);
    }
  }
  static async index(req: Request, res: Response, next: NextFunction) {
    try {
      const unitRepository = await UnitsController.getRepository();
      const units = await unitRepository.find({
        where: { company_id: req?.user?.companyId || '' },
      });
      return res.status(200).json(units);
    } catch (error) {
      next(error);
    }
  }
  static async show(req: Request, res: Response, next: NextFunction) {
    try {
      const unitRepository = await UnitsController.getRepository();
      const unit = await unitRepository.findOne({
        where: {
          _id: new ObjectId(req.params.id),
          company_id: req?.user?.companyId || '',
        },
      });
      res.status(200).json(unit);
    } catch (error) {
      next(error);
    }
  }
  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const updateUnitService = new UpdateUnitService(
        await UnitsController.getRepository()
      );
      const unit = await updateUnitService.execute({
        unit_id: id,
        ...req.body,
      });
      return res.status(200).json(unit);
    } catch (error) {
      next(error);
    }
  }
}
