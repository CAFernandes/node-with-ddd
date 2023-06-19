import { verify } from 'jsonwebtoken';
import { UnauthorizedError } from '@/errors/UnauthorizedError';

type AuthenticateProps = {
  token: string;
}

export const authenticate = ({ token }: AuthenticateProps) => {
  if (!token || token.length === 0) {
    throw new UnauthorizedError('Token not provided');
  }
  const decoded = verify(token, process.env.JWT_SECRET||'');
  return decoded;
}
