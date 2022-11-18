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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserModel_1 = require("./../database/models/UserModel");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class SignInController {
    signIn(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const getUser = yield UserModel_1.UserModel.findOne({
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
            let token = jsonwebtoken_1.default.sign(payload, process.env.SECRET);
            res.status(200).json({
                username: payload.username,
                isAdmin: payload.admin,
                userId: payload.id,
                token: token,
            });
            return;
        });
    }
}
exports.default = new SignInController();
