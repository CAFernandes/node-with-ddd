import { Request, Response, NextFunction } from 'express';
import { Repository } from 'typeorm';

import { AuthenticateUserService } from '@user/services/AuthenticateUserService';
import { getDataSource } from '@/connection/AppDataSource';
import { User } from '@user/infra/schema/User';
import { RefreshJwtToken } from '@user/services/RefreshJwtService';

export class SessionController {
  private static async getRepository(): Promise<Repository<User>> {
    return await getDataSource().then(dataSource =>
      dataSource.getMongoRepository(User)
    );
  }
  public static async create(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | undefined> {
    try {
      const { username, password } = request.body;
      const authenticateService = new AuthenticateUserService(
        await SessionController.getRepository()
      );
      const { accessToken, refreshToken } = await authenticateService.execute({
        username,
        password,
      });
      return response.json({ accessToken, refreshToken });
    } catch (error) {
      next(error);
    }
  }
  public static async refresh(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | undefined> {
    try {
      const { refreshToken } = request.body;
      const refreshService = new RefreshJwtToken(
        await SessionController.getRepository()
      );
      const accessToken = await refreshService.execute(refreshToken);
      return response.json({ accessToken });
    } catch (error) {
      next(error);
    }
  }
}
