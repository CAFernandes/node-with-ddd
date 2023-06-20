import { BadRequest } from '@/errors/BadRequest';
import { UnauthorizedError } from '@/errors/UnauthorizedError';
import { AuthenticateUserDTO } from '@user/infra/dtos/AuthenticateDTO';
import { User } from '@user/infra/schema/User';
import { sign } from 'jsonwebtoken';
import { Repository } from 'typeorm';
import { IUserService } from './IUserService';
import { comparePasswords } from '@user/infra/middleware/comparePasswords';

const JWT_SECRET = process.env.JWT_SECRET || 'default';
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'default';

export class AuthenticateUserService implements IUserService {
  constructor(readonly userRepository: Repository<User>) {}
  async execute({ username, password }: AuthenticateUserDTO) {
    if (!username || !password) {
      throw new BadRequest('Credenciais inválidas');
    }

    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) {
      throw new UnauthorizedError('Credenciais inválidas');
    }
    if (!(await comparePasswords(password, user.password))) {
      throw new UnauthorizedError('Credenciais inválidas');
    }
    const payload = {
      userId: user._id,
      companyId: user.company_id,
      name: user.name,
    };
    const accessToken = sign(payload, JWT_SECRET, {
      expiresIn: '15m',
    });
    const refreshToken = sign(payload, REFRESH_TOKEN_SECRET, {
      expiresIn: '7d',
    });

    user.refresh_token = refreshToken;
    await this.userRepository.save(user);

    return { accessToken, refreshToken };
  }
}
