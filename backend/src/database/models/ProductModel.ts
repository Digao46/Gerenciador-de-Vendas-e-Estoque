import { DataTypes } from "sequelize";
import { db } from "../db";

export const ProductModel = db.define("products", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sellPrice: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  costPrice: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  storage: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
});
