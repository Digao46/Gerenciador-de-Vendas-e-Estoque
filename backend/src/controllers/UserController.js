"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserModel_1 = require("./../database/models/UserModel");
class userController {
    getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield UserModel_1.UserModel.findAll();
            try {
                res.status(200).json({ users });
            }
            catch (err) {
                res
                    .status(400)
                    .json({ message: "Não foi possível acessar os usuários!" });
            }
        });
    }
    getUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield UserModel_1.UserModel.findByPk(req.params.id);
            try {
                res.status(200).json({ user });
            }
            catch (err) {
                res.status(400).json({ message: "Não foi possível acessar o usuário!" });
            }
        });
    }
    addUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, username, password, isAdmin } = req.body;
            const newUser = UserModel_1.UserModel.create({
                name: name,
                username: username,
                password: password,
                isAdmin: isAdmin,
            });
            try {
                res.status(200).json({ newUser, message: "Pessoa adicionada!" });
            }
            catch (err) {
                res
                    .status(400)
                    .json({ message: "Não foi possível adicionar essa pessoa!" });
            }
        });
    }
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedUser = yield UserModel_1.UserModel.update({
                name: req.body.name,
                username: req.body.username,
                password: req.body.password,
                isAdmin: req.body.isAdmin,
            }, {
                where: {
                    id: req.params.id,
                },
            });
            try {
                res.status(200).json({ updatedUser, message: "Usuário atualizado!" });
            }
            catch (err) {
                res
                    .status(400)
                    .json({ message: "Não foi possível atualizar o usuário!" });
            }
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedUser = yield UserModel_1.UserModel.destroy({
                where: {
                    id: req.params.id,
                },
            });
            try {
                res.status(200).json({ deletedUser, message: "Usuário removido!" });
            }
            catch (err) {
                res.status(400).json({ message: "Não foi possível excluir o usuário!" });
            }
        });
    }
}
exports.default = new userController();
