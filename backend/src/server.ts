import * as dotenv from "dotenv";

dotenv.config();

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
