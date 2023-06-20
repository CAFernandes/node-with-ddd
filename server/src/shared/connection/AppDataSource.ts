import { DataSource } from 'typeorm';
import { logger } from '@/utils/logger';
import { Unit } from '@unit/infra/schema/Unit';
import { User } from '@user/infra/schema/User';
import { Company } from '@company/infra/schema/Company';
import { Active } from '@active/infra/schema/Active';

const AppDataSource = new DataSource({
  type: 'mongodb',
  url: `mongodb://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@localhost:27017/${process.env.DATABASE}?authSource=admin`,

  entities: [Company, Unit, User, Active],
  subscribers: [],
});

AppDataSource.initialize()
  .then(async () => {
    logger.info(
      'getDataSource() - Connection with database already initialized'
    );
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
