import express from "express";
import ProductController from "./controllers/ProductController";
import SaleController from "./controllers/SaleController";
import SignInController from "./controllers/SignInController";
import UserController from "./controllers/UserController";

import { authMiddleware } from "./middlewares/authMiddleware";
import { adminMiddleware } from "./middlewares/adminMiddleware";

export const routes = express.Router();

// Rotas de Login
routes.post("/login", SignInController.signIn);

// Rotas dos Produtos
routes.get("/storage", authMiddleware, ProductController.getProducts);

routes.get("/storage/:id", authMiddleware, ProductController.getProductById);

routes.post(
  "/newProduct",
  authMiddleware,
  adminMiddleware,
  ProductController.addProduct
);

routes.put(
  "/editProduct/:id",
  authMiddleware,
  adminMiddleware,
  ProductController.updateProduct
);

routes.delete(
  "/storage/:id",
  authMiddleware,
  adminMiddleware,
  ProductController.deleteProduct
);

// Rotas das Vendas
routes.get("/sales", authMiddleware, SaleController.getSales);

routes.get("/newSale", authMiddleware, ProductController.getProducts);

routes.post("/newSale", authMiddleware, SaleController.addSale);

routes.put("/newSale/:id", authMiddleware, ProductController.updateProduct); // Editar estoque ao finalizar a venda

// Rotas dos Usuários
routes.get("/users", authMiddleware, adminMiddleware, UserController.getUsers);
routes.get("/userAuth/:id", UserController.getUserById);

routes.get(
  "/users/:id",
  authMiddleware,
  adminMiddleware,
  UserController.getUserById
);

routes.post(
  "/newUser",
  authMiddleware,
  adminMiddleware,
  UserController.addUser
);

routes.put(
  "/editUser/:id",
  authMiddleware,
  adminMiddleware,
  UserController.updateUser
);

routes.delete(
  "/users/:id",
  authMiddleware,
  adminMiddleware,
  UserController.deleteUser
);

// Caixa
routes.get("/cash", authMiddleware, adminMiddleware, SaleController.getSales);