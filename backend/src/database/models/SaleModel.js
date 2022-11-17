"use strict";
exports.__esModule = true;
exports.SaleModel = void 0;
var sequelize_1 = require("sequelize");
var db_1 = require("../db");
exports.SaleModel = db_1.db.define("sales", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    products: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: false
    },
    quantity: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: false
    },
    total: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: false
    },
    idSeller: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }
});
