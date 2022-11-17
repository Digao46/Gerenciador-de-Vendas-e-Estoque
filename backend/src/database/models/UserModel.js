"use strict";
exports.__esModule = true;
exports.UserModel = void 0;
var sequelize_1 = require("sequelize");
var db_1 = require("../db");
exports.UserModel = db_1.db.define("user", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: sequelize_1.DataTypes.CHAR,
        allowNull: false
    },
    username: {
        type: sequelize_1.DataTypes.CHAR,
        unique: true,
        allowNull: false
    },
    password: {
        type: sequelize_1.DataTypes.CHAR,
        allowNull: false
    },
    isAdmin: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false
    }
});
