"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../db");
exports.UserModel = db_1.db.define("user", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name: {
        type: sequelize_1.DataTypes.CHAR,
        allowNull: false,
    },
    username: {
        type: sequelize_1.DataTypes.CHAR,
        unique: true,
        allowNull: false,
    },
    password: {
        type: sequelize_1.DataTypes.CHAR,
        allowNull: false,
    },
    isAdmin: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
    },
});
