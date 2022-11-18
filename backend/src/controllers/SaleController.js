"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const SaleModel_1 = require("../database/models/SaleModel");
class SaleController {
    getSales(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield SaleModel_1.SaleModel.findAll();
            let sales;
            if (req.user.isAdmin) {
                sales = response;
            }
            else {
                let anySales = JSON.parse(JSON.stringify(response));
                const salesFiltered = anySales.filter((sale) => sale.idSeller === req.user.id);
                sales = salesFiltered;
            }
            try {
                res.status(200).json({ sales });
            }
            catch (err) {
                res.status(400).json({ message: "Não foi possível acessar as vendas!" });
            }
        });
    }
    getSaleById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const sale = yield SaleModel_1.SaleModel.findByPk(req.params.id);
            try {
                res.status(200).json(sale);
            }
            catch (err) {
                res.status(400).json({ message: "Não foi possível acessar a venda!" });
            }
        });
    }
    addSale(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { products, quantity, total, idSeller } = req.body;
            const newSale = SaleModel_1.SaleModel.create({
                products: products,
                quantity: quantity,
                total: total,
                idSeller: idSeller,
            });
            try {
                res.status(200).json({ newSale, message: "Venda concluída!" });
            }
            catch (err) {
                res.status(400).json({ message: "Não foi possível concluir a venda!" });
            }
        });
    }
}
exports.default = new SaleController();
