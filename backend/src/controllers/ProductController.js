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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var ProductModel_1 = require("../database/models/ProductModel");
var productController = /** @class */ (function () {
    function productController() {
    }
    productController.prototype.getProducts = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var response, products, anyProducts, i, obj;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ProductModel_1.ProductModel.findAll()];
                    case 1:
                        response = _a.sent();
                        products = [];
                        if (req.user.isAdmin) {
                            products = response;
                        }
                        else {
                            anyProducts = JSON.parse(JSON.stringify(response));
                            for (i = 0; i < anyProducts.length; i++) {
                                obj = {
                                    id: anyProducts[i].id,
                                    name: anyProducts[i].name,
                                    sellPrice: anyProducts[i].sellPrice,
                                    storage: anyProducts[i].storage
                                };
                                products.push(obj);
                            }
                        }
                        try {
                            res.status(200).json({ products: products });
                        }
                        catch (err) {
                            res
                                .status(400)
                                .json({ message: "Não foi possível acessar os produtos!" });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    productController.prototype.getProductById = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var product;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ProductModel_1.ProductModel.findByPk(req.params.id)];
                    case 1:
                        product = _a.sent();
                        try {
                            res.status(200).json({ product: product });
                        }
                        catch (err) {
                            res.status(400).json({ message: "Não foi possível acessar o produto!" });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    productController.prototype.addProduct = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, name, sellPrice, costPrice, storage, newProduct;
            return __generator(this, function (_b) {
                _a = req.body, name = _a.name, sellPrice = _a.sellPrice, costPrice = _a.costPrice, storage = _a.storage;
                newProduct = ProductModel_1.ProductModel.create({
                    name: name,
                    sellPrice: sellPrice,
                    costPrice: costPrice,
                    storage: storage
                });
                try {
                    res.status(200).json({ newProduct: newProduct, message: "Produto adicionado!" });
                }
                catch (err) {
                    res
                        .status(400)
                        .json({ message: "Não foi possível adicionar o produto!" });
                }
                return [2 /*return*/];
            });
        });
    };
    productController.prototype.updateProduct = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var updatedProduct;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ProductModel_1.ProductModel.update({
                            name: req.body.name,
                            sellPrice: req.body.sellPrice,
                            costPrice: req.body.costPrice,
                            storage: req.body.storage
                        }, {
                            where: {
                                id: req.params.id
                            }
                        })];
                    case 1:
                        updatedProduct = _a.sent();
                        try {
                            res.status(200).json({ updatedProduct: updatedProduct, message: "Produto editado!" });
                        }
                        catch (err) {
                            res.status(400).json({ message: "Não foi possível editar o produto!" });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    productController.prototype.deleteProduct = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var deletedProduct;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ProductModel_1.ProductModel.destroy({
                            where: {
                                id: req.params.id
                            }
                        })];
                    case 1:
                        deletedProduct = _a.sent();
                        try {
                            res.status(200).json({ deletedProduct: deletedProduct, message: "Produto excluído!" });
                        }
                        catch (err) {
                            res.status(400).json({ message: "Não foi possível excluir o produto!" });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return productController;
}());
exports["default"] = new productController();
