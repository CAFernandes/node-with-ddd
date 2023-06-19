import { logger } from '@utils/logger';
import { NextFunction, Request, Response } from 'express';


const url = process.env.REDIS_URL || 'redis://localhost:6379';


/**
 * If the request has a parameter called idUser, then we get the data from the cache, otherwise we just call next() to continue the
 * request
 * @param {Request} req - Request - the request object
 * @param {Response} res - Response - the response object
 * @param {NextFunction} next - This is a function that we call when we want to move on to the next middleware.
 */
export const isCached = (req: Request, res: Response, next: NextFunction) => {
  logger.debug('Middleware applied')

  // if (!req.params.idUser) {
  //   next();
  //   return;
  // }
  // const { idUser } = req.params;

  // // getting our data by key (id)
  // const cacheKey: string = idUser;
  // const client:redis.RedisClientType = redis.createClient({ url });
  next();
  // client.get(cacheKey, (err: string, result:string) => {
  //   if (err) {
  //     console.error(err)
  //   }
  //   res.json(result)
  // })
};
