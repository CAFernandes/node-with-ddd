import { AuthenticateUserService } from '@user/services/AuthenticateUserService';
import { Request, Response } from 'express';

export class SessionController {
  async store(request: Request, response: Response) {
    const { username, password } = request.body;

    const authenticateUser = new AuthenticateUserService();

    const { user, token } = await authenticateUser.execute({
      username,
      password
    });

    // delete user?.password;

    return response.json({ user, token });
  }
}
