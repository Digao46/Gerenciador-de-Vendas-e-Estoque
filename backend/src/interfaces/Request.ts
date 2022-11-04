import { Request } from "express";

export interface RequestApp extends Request<any, any> {
  user?: any;
}
