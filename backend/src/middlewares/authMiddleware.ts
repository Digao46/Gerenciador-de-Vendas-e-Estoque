import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const bearerToken = req.headers["authorization"];

  const [, token]: string[] = bearerToken?.split(" ") as string[];

  if (!token)
    return res
      .status(401)
      .json({ message: "Não foi possível realizar a autenticação do usuário" });

  jwt.verify(token, process.env.SECRET!, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Não foi possível realizar a autenticação do usuário" });

    next();
  });
}
