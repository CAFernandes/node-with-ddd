import { Request, Response } from 'express';

export class SessionController {
  async store(request: Request, response: Response) {
    const { email, password } = request.body;

    const authenticateUser = new AuthenticateUserService();

    const { user, token } = await authenticateUser.execute({
      email,
      password
    });

    delete user.password;

    return response.json({ user, token });
  }
}
