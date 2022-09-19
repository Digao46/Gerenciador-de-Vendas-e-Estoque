import { Request, Response } from "express";
import { ProductModel } from "../database/models/ProductModel";

class productController {
  async getProducts(req: Request, res: Response) {
    const products = await ProductModel.findAll();

    try {
      res.send(products).status(200);
    } catch (err) {
      res.send(err);
    }
  }

  async getProductById(req: Request, res: Response) {
    const product = await ProductModel.findByPk(req.params.id);

    try {
      res.json(product).status(200);
    } catch (err) {
      res.send(err);
    }
  }

  async addProduct(req: Request, res: Response) {

    const { name, sellPrice, costPrice, storage } = req.body;

    const newProduct = ProductModel.create({
      name: name,
      sellPrice: sellPrice,
      costPrice: costPrice,
      storage: storage,
    });

    try {
      res.json(newProduct);
    } catch (err) {
      res.send(err);
    }
  }

  async updateProduct(req: Request, res: Response) {
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
      res.json(updatedProduct);
    } catch (err) {
      res.send(err);
    }
  }

  async deleteProduct(req: Request, res: Response) {
    const deletedProduct = await ProductModel.destroy({
      where: {
        id: req.params.id,
      },
    });
    try {
      res.json(deletedProduct).status(200);
      return;
    } catch (err) {
      res.send(err);
      return;
    }
  }
}

export default new productController();
