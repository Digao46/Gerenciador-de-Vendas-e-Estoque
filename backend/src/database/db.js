"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const sequelize_1 = require("sequelize");
require("dotenv").config();
const dbName = process.env.DATABASE_NAME;
const dbUser = process.env.DATABASE_USER;
const dbPassword = process.env.DATABASE_PASSWORD;
const dbHost = process.env.DATABASE_HOST;
const dbPort = process.env.DATABASE_PORT;
exports.db = new sequelize_1.Sequelize("sales", "root", "59772136Dig@o", {
    dialect: "mysql",
    host: "localhost",
    port: 3306,
    timezone: "-03:00",
});
