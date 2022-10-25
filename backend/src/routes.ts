import express from "express";
import ProductController from "./controllers/ProductController";
import SaleController from "./controllers/SaleController";
import SignInController from "./controllers/SignInController";
import UserController from "./controllers/UserController";

import { authMiddleware } from "./middlewares/authMiddleware";

export const routes = express.Router();

// Rotas dos Produtos
routes.get("/storage", authMiddleware, ProductController.getProducts);

routes.post("/newProduct", authMiddleware, ProductController.addProduct);

routes.get("/storage/:id", authMiddleware, ProductController.getProductById);

routes.put("/editProduct/:id", authMiddleware, ProductController.updateProduct);

routes.delete("/storage/:id", authMiddleware, ProductController.deleteProduct);

// Rotas das Vendas
routes.get("/sales", authMiddleware, SaleController.getSales);

routes.post("/newSale", authMiddleware, SaleController.addSale);

routes.get("/sales/:id", authMiddleware, SaleController.getSaleById);

routes.get("/newSale", authMiddleware, ProductController.getProducts);

// Rotas dos Usuários
routes.get("/users", authMiddleware, UserController.getUsers);

routes.post("/newUser", authMiddleware, UserController.addUser);

routes.get("/users/:id", authMiddleware, UserController.getUserById);

routes.put("/editUser/:id", authMiddleware, UserController.updateUser);

routes.delete("/users/:id", authMiddleware, UserController.deleteUser);

// Rotas de Login
routes.post("/login", SignInController.signIn);
