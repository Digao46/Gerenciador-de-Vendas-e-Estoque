import { UserModel } from "./../database/models/UserModel";
import { Request, Response } from "express";

class userController {
  async getUsers(req: Request, res: Response) {
    const users = await UserModel.findAll();

    try {
      res.status(200).json({ users });
    } catch (err) {
      res.status(400).json({ message: "Não foi possível acessar os usuários!" });
    }
  }
}

export default new userController();
