import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { AuthPayload } from '@user/infra/types/AuthPayload';

const JWT_SECRET = process.env.JWT_SECRET || 'default';

export const authenticateToken = async (
  request: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  const authHeader = request.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];
    try {
      let decoded = await new Promise((resolve, reject) => {
        verify(token, JWT_SECRET, (err: any, decoded: any) => {
          if (err) {
            return reject(err);
          }
          resolve(decoded);
        });
      });
      const payload = decoded as AuthPayload;
      request.user = payload; // Armazena o payload do token na requisição
      next();
    } catch (error) {
      return res.sendStatus(403); // Token inválido
    }
  } else {
    return res.sendStatus(401); // Token não fornecido
  }
};
