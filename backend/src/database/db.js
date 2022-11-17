"use strict";
exports.__esModule = true;
exports.db = void 0;
var sequelize_1 = require("sequelize");
var dbName = process.env.DATABASE_NAME;
var dbUser = process.env.DATABASE_USER;
var dbPassword = process.env.DATABASE_PASSWORD;
var dbHost = process.env.DATABASE_HOST;
var dbPort = process.env.DATABASE_PORT;
exports.db = new sequelize_1.Sequelize(dbName, dbUser, dbPassword, {
    dialect: "mysql",
    host: dbHost,
    port: +dbPort,
    timezone: "-03:00"
});
