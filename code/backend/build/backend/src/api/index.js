"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("./controller");
const middlwares_1 = require("../middlwares");
const models_1 = require("../models");
exports.default = () => {
    const app = (0, express_1.Router)();
    //TODO: add routes here...
    app.get('/categories/:categoryName/products', (0, middlwares_1.validateRequest)('params', models_1.productsSchema), controller_1.handleGetProducts);
    app.get('/categories/:categoryName/products/:productId', (0, middlwares_1.validateRequest)('params', models_1.productGetSchema), controller_1.handleGetProductById);
    return app;
};
//# sourceMappingURL=index.js.map