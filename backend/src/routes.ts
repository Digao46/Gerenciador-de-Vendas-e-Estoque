import express from "express";
import productController from "./controllers/productController";
import saleController from "./controllers/saleController";
import UserController from "./controllers/UserController";

export const routes = express.Router();

// Rotas dos Produtos
routes.get(
  "/storage",
  UserController.validateToken,
  productController.getProducts
);

routes.post("/newProduct", productController.addProduct);

routes.get("/storage/:id", productController.getProductById);

routes.put("/editProduct/:id", productController.updateProduct);

routes.delete("/storage/:id", productController.deleteProduct);

// Rotas das Vendas
routes.get("/sales", saleController.getSales);

routes.post("/newSale", saleController.addSale);

routes.get("/sales/:id", saleController.getSaleById);

routes.get("/newSale", productController.getProducts);

// Rotas dos Usuários
routes.get("/users", UserController.getUsers);

// Rotas de Login
routes.post("/login", UserController.logIn);
