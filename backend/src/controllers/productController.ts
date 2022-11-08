import { Response } from "express";
import { ProductModel } from "../database/models/ProductModel";

import { RequestApp } from "../interfaces/Request";

class productController {
  async getProducts(req: RequestApp, res: Response) {

    let response = await ProductModel.findAll();
    let products: any[] = [];

    if (req.user.isAdmin) {
      products = response;
    } else {
      let anyProducts = JSON.parse(JSON.stringify(response));

      for (let i = 0; i < anyProducts.length; i++) {
        let obj = {
          id: anyProducts[i].id,
          name: anyProducts[i].name,
          sellPrice: anyProducts[i].sellPrice,
          storage: anyProducts[i].storage,
        };

        products.push(obj);
      }
    }

    try {
      res.status(200).json({ products });
    } catch (err) {
      res
        .status(400)
        .json({ message: "Não foi possível acessar os produtos!" });
    }
  }

  async getProductById(req: RequestApp, res: Response) {
    const product = await ProductModel.findByPk(req.params.id);

    try {
      res.status(200).json({ product });
    } catch (err) {
      res.status(400).json({ message: "Não foi possível acessar o produto!" });
    }
  }

  async addProduct(req: RequestApp, res: Response) {
    const { name, sellPrice, costPrice, storage } = req.body;

    const newProduct = ProductModel.create({
      name: name,
      sellPrice: sellPrice,
      costPrice: costPrice,
      storage: storage,
    });

    try {
      res.status(200).json({ newProduct, message: "Produto adicionado!" });
    } catch (err) {
      res
        .status(400)
        .json({ message: "Não foi possível adicionar o produto!" });
    }
  }

  async updateProduct(req: RequestApp, res: Response) {
    const updatedProduct = await ProductModel.update(
      {
        name: req.body.name,
        sellPrice: req.body.sellPrice,
        costPrice: req.body.costPrice,
        storage: req.body.storage,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    try {
      res.status(200).json({ updatedProduct, message: "Produto editado!" });
    } catch (err) {
      res.status(400).json({ message: "Não foi possível editar o produto!" });
    }
  }

  async deleteProduct(req: RequestApp, res: Response) {
    const deletedProduct = await ProductModel.destroy({
      where: {
        id: req.params.id,
      },
    });
    try {
      res.status(200).json({ deletedProduct, message: "Produto excluído!" });
    } catch (err) {
      res.status(400).json({ message: "Não foi possível excluir o produto!" });
    }
  }
}

export default new productController();
