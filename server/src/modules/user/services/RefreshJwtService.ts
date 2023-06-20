import { ObjectId } from 'mongodb';
import { Repository } from 'typeorm';
import { sign, verify } from 'jsonwebtoken';

import { IUserService } from './IUserService';
import { User } from '@user/infra/schema/User';
import { AuthPayload } from '@user/infra/types/AuthPayload';
import { UnauthorizedError } from '@/errors/UnauthorizedError';

const JWT_SECRET = process.env.JWT_SECRET || 'default';
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'default';

export class RefreshJwtToken implements IUserService {
  constructor(readonly userRepository: Repository<User>) {}
  async execute(refreshToken: string) {
    const decoded = await new Promise((resolve, reject) => {
      verify(refreshToken, REFRESH_TOKEN_SECRET, (err: any, decoded: any) => {
        if (err) return reject(err);
        resolve(decoded);
      });
    });
    const payload = decoded as AuthPayload;
    const userId = payload.userId;
    const companyId = payload.companyId;

    const user = await this.userRepository.findOne({
      where: { _id: new ObjectId(userId) },
    });

    if (!user) {
      throw new UnauthorizedError('Credenciais inválidas');
    }

    return sign({ userId, companyId }, JWT_SECRET, { expiresIn: '15m' });
  }
}
