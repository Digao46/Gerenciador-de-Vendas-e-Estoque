import { Sequelize } from "sequelize";

require('dotenv').config();

const dbName = process.env.DATABASE_NAME!;
const dbUser = process.env.DATABASE_USER!;
const dbPassword = process.env.DATABASE_PASSWORD!;
const dbHost = process.env.DATABASE_HOST!;
const dbPort = process.env.DATABASE_PORT!;

export const db = new Sequelize(dbName, dbUser, dbPassword, {
  dialect: "mysql",
  host: dbHost,
  port: +dbPort,
  timezone: "-03:00",
});
