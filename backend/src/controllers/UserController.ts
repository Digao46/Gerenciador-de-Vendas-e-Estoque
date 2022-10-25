import { UserModel } from "./../database/models/UserModel";
import { Request, Response } from "express";

class userController {
  async getUsers(req: Request, res: Response) {
    const users = await UserModel.findAll();

    try {
      res.status(200).json({ users });
    } catch (err) {
      res
        .status(400)
        .json({ message: "Não foi possível acessar os usuários!" });
    }
  }

  async getUserById(req: Request, res: Response) {
    const user = await UserModel.findByPk(req.params.id);

    try {
      res.status(200).json({ user });
    } catch (err) {
      res.status(400).json({ message: "Não foi possível acessar o usuário!" });
    }
  }

  async addUser(req: Request, res: Response) {
    const { name, username, password, isAdmin } = req.body;

    const newUser = UserModel.create({
      name: name,
      username: username,
      password: password,
      isAdmin: isAdmin,
    });

    try {
      res.status(200).json({ newUser, message: "Pessoa adicionada!" });
    } catch (err) {
      res
        .status(400)
        .json({ message: "Não foi possível adicionar essa pessoa!" });
    }
  }

  async updateUser(req: Request, res: Response) {
    const updatedUser = await UserModel.update(
      {
        name: req.body.name,
        username: req.body.username,
        password: req.body.password,
        isAdmin: req.body.isAdmin,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    try {
      res.status(200).json({ updatedUser, message: "Usuário atualizado!" });
    } catch (err) {
      res
        .status(400)
        .json({ message: "Não foi possível atualizar o usuário!" });
    }
  }

  async deleteUser(req: Request, res: Response) {
    const deletedUser = await UserModel.destroy({
      where: {
        id: req.params.id,
      },
    });
    try {
      res.status(200).json({ deletedUser, message: "Usuário removido!" });
    } catch (err) {
      res.status(400).json({ message: "Não foi possível excluir o usuário!" });
    }
  }
}
export default new userController();
