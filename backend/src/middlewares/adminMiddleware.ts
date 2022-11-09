import { NextFunction, Response } from "express";
import { RequestApp } from "../interfaces/Request";

export function adminMiddleware(
  req: RequestApp,
  res: Response,
  next: NextFunction
) {
  if (!req.user.isAdmin)
    return res.status(403).send({
      message: "O Usuário precisa ser administrador para realizar a operação!",
    });

  next();
}
