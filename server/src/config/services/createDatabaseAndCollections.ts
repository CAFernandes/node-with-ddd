import { logger } from '@/utils/logger';
import { Db, MongoClient } from 'mongodb';
import { createIndexesCompanies } from './createIndexesCompanies';
import { createIndexesUnits } from './createIndexesUnits';
import { createIndexesUsers } from './createIndexesUsers';

export const createDatabaseAndCollections = async () => {
  const dbName = process.env.DATABASE;
  logger.info(`Creating database ${dbName} and collections...`);
  const mongoUrl = `mongodb://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}`;
  const client = await MongoClient.connect(mongoUrl);

  const listDatabases = await client.db().admin().listDatabases();
  if (listDatabases.databases.find(db => db.name === dbName)) {
    logger.info(`Database ${dbName} already exists`);
    await client.close();
    return;
  }

  createCollections(client.db(dbName));
  logger.info(`Database ${dbName} and collections created!`);
  await client.close();
};

async function createCollections(db: Db) {
  await db.createCollection('companies');
  await db.createCollection('units');
  await db.createCollection('actives');
  await db.createCollection('users');

  return await createIndexes(db);
}
async function createIndexes(db: Db) {
  await createIndexesUsers(db.collection('users'));
  await createIndexesCompanies(db.collection('companies'));
  await createIndexesUnits(db.collection('units'));
}
