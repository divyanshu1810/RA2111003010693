"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("./controller");
const middlwares_1 = require("../middlwares");
const utils_1 = require("../utils");
exports.default = () => {
    const app = (0, express_1.Router)();
    //TODO: add routes here...
    app.get('/test/companies/:companyName/categories/:categoryName/products', (0, middlwares_1.validateRequest)('body', utils_1.productsSchema), controller_1.handleGetProducts);
    return app;
};
//# sourceMappingURL=index.js.map