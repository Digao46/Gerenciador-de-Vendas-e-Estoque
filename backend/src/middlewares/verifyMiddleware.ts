import { NextFunction, Request, Response } from "express";
import { RequestApp } from "../interfaces/Request";

export function adminMiddleware(
  req: RequestApp,
  res: Response,
  next: NextFunction
) {}
