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
const ProductModel_1 = require("../database/models/ProductModel");
class productController {
    getProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield ProductModel_1.ProductModel.findAll();
            let products = [];
            if (req.user.isAdmin) {
                products = response;
            }
            else {
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
            }
            catch (err) {
                res
                    .status(400)
                    .json({ message: "Não foi possível acessar os produtos!" });
            }
        });
    }
    getProductById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield ProductModel_1.ProductModel.findByPk(req.params.id);
            try {
                res.status(200).json({ product });
            }
            catch (err) {
                res.status(400).json({ message: "Não foi possível acessar o produto!" });
            }
        });
    }
    addProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, sellPrice, costPrice, storage } = req.body;
            const newProduct = ProductModel_1.ProductModel.create({
                name: name,
                sellPrice: sellPrice,
                costPrice: costPrice,
                storage: storage,
            });
            try {
                res.status(200).json({ newProduct, message: "Produto adicionado!" });
            }
            catch (err) {
                res
                    .status(400)
                    .json({ message: "Não foi possível adicionar o produto!" });
            }
        });
    }
    updateProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedProduct = yield ProductModel_1.ProductModel.update({
                name: req.body.name,
                sellPrice: req.body.sellPrice,
                costPrice: req.body.costPrice,
                storage: req.body.storage,
            }, {
                where: {
                    id: req.params.id,
                },
            });
            try {
                res.status(200).json({ updatedProduct, message: "Produto editado!" });
            }
            catch (err) {
                res.status(400).json({ message: "Não foi possível editar o produto!" });
            }
        });
    }
    deleteProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedProduct = yield ProductModel_1.ProductModel.destroy({
                where: {
                    id: req.params.id,
                },
            });
            try {
                res.status(200).json({ deletedProduct, message: "Produto excluído!" });
            }
            catch (err) {
                res.status(400).json({ message: "Não foi possível excluir o produto!" });
            }
        });
    }
}
exports.default = new productController();
