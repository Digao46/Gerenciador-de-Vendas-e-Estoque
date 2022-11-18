"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../db");
exports.ProductModel = db_1.db.define("products", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    sellPrice: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: false,
    },
    costPrice: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: false,
    },
    storage: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: false,
    },
});
