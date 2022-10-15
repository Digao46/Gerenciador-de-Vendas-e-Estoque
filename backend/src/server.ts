import * as dotenv from "dotenv";

dotenv.config({
  path: "C:/Users/diogo/Desktop/Gerenciador de Vendas e Estoque/backend/.env",
});

const dbName = process.env.DATABASE_NAME;
const dbUser = process.env.DATABASE_USER;
const dbPassword = process.env.DATABASE_PASSWORD;
const dbHost = process.env.DATABASE_HOST;
const dbPort = process.env.DATABASE_PORT;

export { dbName, dbUser, dbPassword, dbHost, dbPort };

import express, { json } from "express";
import { db } from "./database/db";
import { routes } from "./routes";
import cors from "cors";

const app = express();

app.use(cors());
app.use(json());
app.use(routes);

const port = 8080;

app.listen(port, async () => {
  await db.sync({ alter: true });

  console.log(`Servidor iniciado na porta ${port}`);
});
