import { UserModel } from "./../database/models/UserModel";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

let secret = "kbcademel159";

class SignInController {
  async signIn(req: Request, res: Response) {
    const getUser = await UserModel.findOne({
      where: { username: req.body.username },
    });

    if (!getUser)
      return res.status(404).json({ message: "Usuário não encontrado!" });

    const user = getUser.toJSON();

    const isMatch = req.body.password === user.password ? true : false;

    if (!isMatch)
      return res.status(401).json({ message: "Usuário/Senha Incorreta" });

    const now = Math.floor(Date.now() / 1000);

    const payload = {
      username: user.username,
      admin: user.isAdmin,
      id: user.id,
      iat: now,
      exp: now + 60 * 60 * 6,
    };

    let token = jwt.sign(payload, secret);

    res.status(200).json({
      username: payload.username,
      isAdmin: payload.admin,
      userId: payload.id,
      token: token,
    });

    return;
  }
}

export default new SignInController();
