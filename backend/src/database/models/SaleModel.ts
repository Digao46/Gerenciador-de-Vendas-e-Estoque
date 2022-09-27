import { DataTypes } from "sequelize";
import { db } from "../db";

export const SaleModel = db.define("sales", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  products: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  total: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
});
