import { SaleModel } from "./../database/models/SaleModel";
import { Request, Response } from "express";

class saleController {
  async getSales(req: Request, res: Response) {
    const products = await SaleModel.findAll();

    try {
      res.send(products).status(200);
    } catch (err) {
      res.send(err);
    }
  }

  async getSaleById(req: Request, res: Response) {
    const product = await SaleModel.findByPk(req.params.id);

    try {
      res.json(product).status(200);
    } catch (err) {
      res.send(err);
    }
  }

  async addSale(req: Request, res: Response) {
    const { products, quantity, total } = req.body;

    const newSale = SaleModel.create({
      products: products,
      quantity: quantity,
      total: total,
    });

    try {
      res.json(newSale);
    } catch (err) {
      res.send(err);
    }
  }
}

export default new saleController();
