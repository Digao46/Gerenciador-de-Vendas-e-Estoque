import { UserModel } from "./../database/models/UserModel";
import { NextFunction, Request, Response } from "express";
import jwt from "jwt-simple";

class userController {
  async getUsers(req: Request, res: Response) {
    const users = await UserModel.findAll();

    try {
      res.status(200).send(users);
    } catch (err) {
      res.send(err);
    }
  }

  async logIn(req: Request, res: Response) {
    const getUser = await UserModel.findOne({
      where: { username: req.body.username },
    });

    if (!getUser) return res.status(203).send("Usuário não encontrado!");

    const user = JSON.parse(JSON.stringify(getUser));

    const isMatch = req.body.password === user.password ? true : false;

    if (!isMatch) return res.status(204).send("Usuário/Senha Incorreta");

    const now = Math.floor(Date.now() / 1000);

    const payload = {
      username: user.username,
      admin: user.isAdmin,
      iat: now,
      exp: now + 60 * 60 * 6,
    };

    return res.status(200).json({
      username: payload.username,
      isAdmin: payload.admin,
      token: jwt.encode(payload, process.env.SECRET!),
    });
  }

  async validateToken(req: Request, res: Response, next: NextFunction) {
    const userData = req.body;

    console.log(userData);

    // try {
    //   if (userData) {
    //     const token = jwt.decode(userData.token, process.env.SECRET!);
    //     if (new Date(token.exp * 1000) > new Date()) {
    //       return res.send(true);
    //     }
    //   }
    // } catch (e) {
    //   // problema com o token
    //   console.log(e);
    // }

    // res.send(false);

    next();
  }
}
export default new userController();
