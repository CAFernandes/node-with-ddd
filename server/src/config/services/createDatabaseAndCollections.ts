import { Db, MongoClient } from 'mongodb';
import { logger } from '@/utils/logger';
import { createIndexesUsers } from './createIndexesUsers';
import { createIndexesCompanies } from './createIndexesCompanies';

export const createDatabaseAndCollections = async () => {
  const dbName = process.env.DATABASE; // Nome do seu banco de dados
  logger.info(`Creating database ${dbName} and collections...`);
  console.log(dbName)
  const mongoUrl = `mongodb://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@localhost:27017`; // URL de conexão com o MongoDB
  // Crie uma conexão com o MongoDB
  const client = await MongoClient.connect(mongoUrl);

  // Acesse o banco de dados
  const listDatabases = await client.db().admin().listDatabases();
  if (listDatabases.databases.find(db => db.name === dbName)) {
    logger.info(`Database ${dbName} already exists`);
    // Feche a conexão com o MongoDB
    await client.close();
    return;
  }

  createCollections(client.db(dbName))
  logger.info(`Database ${dbName} and collections created!`);
  // Feche a conexão com o MongoDB
  await client.close();
}

async function createCollections(db: Db) {
  await db.createCollection('companies');
  await db.createCollection('units');
  await db.createCollection('actives');
  await db.createCollection('users');

  return await createIndexes(db);
}
async function createIndexes(db: Db) {
  await createIndexesUsers(db.collection('users'))
  await createIndexesCompanies(db.collection('companies'))
}
