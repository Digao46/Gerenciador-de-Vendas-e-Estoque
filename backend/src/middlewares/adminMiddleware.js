"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminMiddleware = void 0;
function adminMiddleware(req, res, next) {
    if (!req.user.isAdmin)
        return res.status(403).send({
            message: "O Usuário precisa ser administrador para realizar a operação!",
        });
    next();
}
exports.adminMiddleware = adminMiddleware;
