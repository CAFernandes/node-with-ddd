import { NextFunction, Request, Response } from 'express';
import { User } from '@user/infra/schema/entities/User';
import { getDataSource } from '@/connection/AppDataSource';
import { Repository } from 'typeorm';
import { CreateUserService } from '@user/services/CreateUserService';
import { UpdateUserService } from '@user/services/UpdateUserService';
import { hashPassword } from '@user/infra/middleware/hashPassword';
import { DeleteUserService } from '@user/services/DeleteUserService';
import { logger } from '@/utils/logger';
import { ObjectId } from 'mongodb';

export class UsersController {
  private static async getRepository(): Promise<Repository<User>> {
    return await getDataSource().then((dataSource) => dataSource.getMongoRepository(User));
  }
  public static async index(request: Request, response: Response, next:NextFunction): Promise<Response|undefined> {
    try {
      const { company_id } = request.params;
      const usersRepository = await UsersController.getRepository();
      const users = await usersRepository.find({
        where: {
          company_id: new ObjectId(company_id)
        }
      });
      return response.json(users);
    } catch (error) {
      next(error);
    }
  }
  public static async create(request: Request, response: Response, next: NextFunction): Promise<Response|undefined> {
    try {
      const { name, company_id, username, password } = request.body;
      const userRepository = await UsersController.getRepository()
      const createUserService = new CreateUserService(userRepository);
      const user = await createUserService.execute({
        name,
        company_id,
        username,
        password: await hashPassword(password),
        created_at: new Date()
      });
      return response.json(user);
    } catch (error) {
      next(error)
    }
  }
  public static async show(request: Request, response: Response, next: NextFunction): Promise<Response|undefined> {
    try {
      const { id } = request.params;
      const usersRepository = await UsersController.getRepository();
      const user = await usersRepository.findOne({
        where: {
          _id: new ObjectId(id)
        }
      });
      return response.json(user);
    } catch (error) {
      next(error);
    }
  }
  public static async update(request: Request, response: Response, next: NextFunction): Promise<Response|undefined> {
    try {
      const { id } = request.params;
      const { name } = request.body;
      const usersRepository = await UsersController.getRepository();
      const updateUserService = new UpdateUserService(usersRepository);
      const user = await updateUserService.execute({ name });
      return response.json(user);
    } catch (error) {
      next(error)
    }
  }
  public static async delete(request: Request, response: Response, next: NextFunction): Promise<Response|undefined> {
    try {
      const { id } = request.params;
      const usersRepository = await UsersController.getRepository();
      const deleteUserService = new DeleteUserService(usersRepository);
      await deleteUserService.execute(id);
      return response.json([]);
    } catch (error) {
      next(error)
    }
  }
}
