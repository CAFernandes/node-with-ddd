import { DataSource } from "typeorm";
import { Company } from "@company/infra/schema/entities/Company";
import { Unit } from "@unit/infra/schema/entities/Unit";
import { User } from "@user/infra/schema/entities/User";
import { Active } from "@active/infra/schema/entities/Active";
import { logger } from "@/utils/logger";

const AppDataSource = new DataSource({
  type: "mongodb",
  url: `mongodb://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@localhost:27017/${process.env.DATABASE}?authSource=admin`,

  entities: [Company, Unit, User, Active],
  subscribers: []
})

AppDataSource.initialize()
  .then(async () => {
    logger.info("getDataSource() - Connection with database already initialized");
  })
  .catch((error) => console.log(error));

export const getDataSource = (delay = 200): Promise<DataSource> => {
  if (AppDataSource.isInitialized) {
    return Promise.resolve(AppDataSource);
  }
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (AppDataSource.isInitialized) resolve(AppDataSource);
      else reject("Failed to create connection with database");
    }, delay);
  });
};
