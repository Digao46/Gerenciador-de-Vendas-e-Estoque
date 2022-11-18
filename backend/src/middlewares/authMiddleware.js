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
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserModel_1 = require("../database/models/UserModel");
function authMiddleware(req, res, next) {
    const bearerToken = req.headers["authorization"];
    const [, token] = bearerToken === null || bearerToken === void 0 ? void 0 : bearerToken.split(" ");
    if (!token)
        return res
            .status(401)
            .json({ message: "Não foi possível realizar a autenticação do usuário" });
    jsonwebtoken_1.default.verify(token, process.env.SECRET, (err, decoded) => __awaiter(this, void 0, void 0, function* () {
        if (err)
            return res.status(401).json({
                message: "Não foi possível realizar a autenticação do usuário",
            });
        const payload = JSON.parse(JSON.stringify(decoded));
        const gotUser = yield UserModel_1.UserModel.findOne({
            where: { id: payload.id },
        });
        req.user = gotUser;
        next();
    }));
}
exports.authMiddleware = authMiddleware;
