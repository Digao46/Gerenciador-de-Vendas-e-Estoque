import express from "express";
import productController from "./controllers/productController";

export const routes = express.Router();

// Rotas dos Produtos
routes.get("/storage", productController.getProducts);

routes.post("/newProduct", productController.addProduct);

routes.get("/storage/:id", productController.getProductById);

routes.put("/editProduct/:id", productController.updateProduct);

routes.delete("/storage/:id", productController.deleteProduct);

// Rotas das Vendas
