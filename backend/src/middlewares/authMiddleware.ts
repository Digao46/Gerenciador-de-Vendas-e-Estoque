import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { RequestApp } from "../interfaces/Request";
import { UserModel } from "../database/models/UserModel";

export function authMiddleware(
  req: RequestApp,
  res: Response,
  next: NextFunction
) {
  const bearerToken = req.headers["authorization"];

  const [, token]: string[] = bearerToken?.split(" ") as string[];

  if (!token)
    return res
      .status(401)
      .json({ message: "Não foi possível realizar a autenticação do usuário" });

  jwt.verify(token, process.env.SECRET!, async (err, decoded) => {
    if (err)
      return res.status(401).json({
        message: "Não foi possível realizar a autenticação do usuário",
      });

    const payload = JSON.parse(JSON.stringify(decoded));

    const gotUser = await UserModel.findOne({
      where: { id: payload.id },
    });

    req.user = gotUser;

    next();
  });
}
