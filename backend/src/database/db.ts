import { Sequelize } from "sequelize";

import { dbName, dbUser, dbPassword, dbHost, dbPort } from "../server";

const databaseName = dbName!;
const databaseUser = dbUser!;
const databasePassword = dbPassword!;
const databaseHost = dbHost!;
const databasePort = dbPort!;

export const db = new Sequelize(databaseName, databaseUser, databasePassword, {
  dialect: "mysql",
  host: databaseHost,
  port: +databasePort,
  timezone: "-03:00",
});
