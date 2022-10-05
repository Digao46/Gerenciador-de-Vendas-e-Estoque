import { Sequelize } from "sequelize";

export const db = new Sequelize("sales", "root", "59772136Dig@o", {
  dialect: "mysql",
  host: "localhost",
  port: 3306,
  timezone: "-03:00",
});
