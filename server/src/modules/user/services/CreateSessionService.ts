import { sign } from 'jsonwebtoken';
import { Repository } from 'typeorm';

import { UnauthorizedError } from '@/errors/UnauthorizedError';
import { BadRequest } from '@/errors/BadRequest';

import { User } from '@user/infra/schema/User';
import { comparePasswords } from '@user/infra/middleware/comparePasswords';
import { AuthenticateUserDTO } from '@user/infra/dtos/AuthenticateDTO';
import { getAdminPermissions } from '@user/infra/middleware/getAdminPermissions';
import { getUserPermissions } from '@user/infra/middleware/getUserPermissions';

const JWT_SECRET = process.env.JWT_SECRET || 'default';
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'default';

export class CreateSessionService {
  constructor(readonly userRepository: Repository<User>) {}
  async execute({ username, password }: AuthenticateUserDTO) {
    if (!username || !password) {
      throw new BadRequest('Credenciais inválidas');
    }

    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) {
      throw new UnauthorizedError('Credenciais inválidas');
    }
    if (!user.password) {
      throw new UnauthorizedError('Credenciais inválidas');
    }
    if (!(await comparePasswords(password, user.password))) {
      throw new UnauthorizedError('Credenciais inválidas');
    }
    const payload = {
      id: user._id,
      company: user.company_id,
    };
    const accessToken = sign(payload, JWT_SECRET, {
      expiresIn: '15m',
    });
    const refreshToken = sign(payload, REFRESH_TOKEN_SECRET, {
      expiresIn: '7d',
    });

    user.refresh_token = refreshToken;
    await this.userRepository.save(user);

    const permissions = user.is_admin
      ? await getAdminPermissions()
      : await getUserPermissions();

    const userResponse = {
      name: user.name,
      username: user.username,
      company: user.company_id,
    };
    return { accessToken, refreshToken, user: userResponse, permissions };
  }
}
