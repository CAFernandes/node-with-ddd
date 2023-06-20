import { NextFunction, Request, Response } from 'express';

export class UnitsController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(201).json({ message: 'create unit' });
    } catch (error) {
      next(error);
    }
  }
  static async index(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(200).json({ message: 'index units' });
    } catch (error) {
      next(error);
    }
  }
}
