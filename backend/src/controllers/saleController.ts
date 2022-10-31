import { SaleModel } from "../database/models/SaleModel";
import { Request, Response } from "express";

class SaleController {
  async getSales(req: Request, res: Response) {
    const sales = await SaleModel.findAll();

    try {
      res.status(200).json({ sales });
    } catch (err) {
      res.status(400).json({ message: "Não foi possível acessar as vendas!" });
    }
  }

  async getSaleById(req: Request, res: Response) {
    const sale = await SaleModel.findByPk(req.params.id);

    try {
      res.status(200).json(sale);
    } catch (err) {
      res.status(400).json({ message: "Não foi possível acessar a venda!" });
    }
  }

  async addSale(req: Request, res: Response) {
    const { products, quantity, total, idSeller } = req.body;

    const newSale = SaleModel.create({
      products: products,
      quantity: quantity,
      total: total,
      idSeller: idSeller
    });

    try {
      res.json({ newSale, message: "Venda concluída!" });
    } catch (err) {
      res.json({ message: "Não foi possível concluir a venda!" });
    }
  }
}

export default new SaleController();
