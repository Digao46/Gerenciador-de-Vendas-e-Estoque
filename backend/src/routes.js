"use strict";
exports.__esModule = true;
exports.routes = void 0;
var express_1 = require("express");
var ProductController_1 = require("./controllers/ProductController");
var SaleController_1 = require("./controllers/SaleController");
var SignInController_1 = require("./controllers/SignInController");
var UserController_1 = require("./controllers/UserController");
var authMiddleware_1 = require("./middlewares/authMiddleware");
var adminMiddleware_1 = require("./middlewares/adminMiddleware");
exports.routes = express_1["default"].Router();
// Rotas de Login
exports.routes.post("/login", SignInController_1["default"].signIn);
// Rotas dos Produtos
exports.routes.get("/storage", authMiddleware_1.authMiddleware, ProductController_1["default"].getProducts);
exports.routes.get("/storage/:id", authMiddleware_1.authMiddleware, ProductController_1["default"].getProductById);
exports.routes.post("/newProduct", authMiddleware_1.authMiddleware, adminMiddleware_1.adminMiddleware, ProductController_1["default"].addProduct);
exports.routes.put("/editProduct/:id", authMiddleware_1.authMiddleware, adminMiddleware_1.adminMiddleware, ProductController_1["default"].updateProduct);
exports.routes["delete"]("/storage/:id", authMiddleware_1.authMiddleware, adminMiddleware_1.adminMiddleware, ProductController_1["default"].deleteProduct);
// Rotas das Vendas
exports.routes.get("/sales", authMiddleware_1.authMiddleware, SaleController_1["default"].getSales);
exports.routes.get("/newSale", authMiddleware_1.authMiddleware, ProductController_1["default"].getProducts);
exports.routes.post("/newSale", authMiddleware_1.authMiddleware, SaleController_1["default"].addSale);
exports.routes.put("/newSale/:id", authMiddleware_1.authMiddleware, ProductController_1["default"].updateProduct); // Editar estoque ao finalizar a venda
// Rotas dos Usuários
exports.routes.get("/users", authMiddleware_1.authMiddleware, adminMiddleware_1.adminMiddleware, UserController_1["default"].getUsers);
exports.routes.get("/users/:id", authMiddleware_1.authMiddleware, adminMiddleware_1.adminMiddleware, UserController_1["default"].getUserById);
exports.routes.post("/newUser", authMiddleware_1.authMiddleware, adminMiddleware_1.adminMiddleware, UserController_1["default"].addUser);
exports.routes.put("/editUser/:id", authMiddleware_1.authMiddleware, adminMiddleware_1.adminMiddleware, UserController_1["default"].updateUser);
exports.routes["delete"]("/users/:id", authMiddleware_1.authMiddleware, adminMiddleware_1.adminMiddleware, UserController_1["default"].deleteUser);
// Caixa
exports.routes.get("/cash", authMiddleware_1.authMiddleware, adminMiddleware_1.adminMiddleware, SaleController_1["default"].getSales);
