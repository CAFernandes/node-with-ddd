import { logger } from '@/utils/logger';
import { Active } from '@active/infra/schema/Active';
import { Company } from '@company/infra/schema/Company';
import { Unit } from '@unit/infra/schema/Unit';
import { User } from '@user/infra/schema/User';
import { DataSource } from 'typeorm';

const AppDataSource = new DataSource({
  type: 'mongodb',
  url: `mongodb://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE}?authSource=admin`,

  entities: [Company, Unit, User, Active],
  subscribers: [],
});

AppDataSource.initialize()
  .then(async () => {
    logger.info('Connection with database already initialized');
  })
  .catch(error => logger.fatal(error));

export const getDataSource = (delay = 200): Promise<DataSource> => {
  if (AppDataSource.isInitialized) {
    return Promise.resolve(AppDataSource);
  }
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (AppDataSource.isInitialized) resolve(AppDataSource);
      else reject('Failed to create connection with database');
    }, delay);
  });
};
