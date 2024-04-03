"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleGetProductById = exports.handleGetProducts = void 0;
const utils_1 = require("../utils");
const middlwares_1 = require("../middlwares");
const handleGetProducts = async (req, res) => {
    try {
        const { companyName, categoryName } = req.params;
        const { maxPrice, minPrice, top, page, sortBy } = req.query;
        const parsedMaxPrice = parseFloat(maxPrice);
        const parsedMinPrice = parseFloat(minPrice);
        const parsedTop = parseInt(top);
        const parsedPage = parseInt(page) || 1;
        (0, middlwares_1.checkValidInput)(parsedMaxPrice, parsedMinPrice, parsedTop, sortBy);
        if (parsedTop <= 10) {
            const data = await (0, utils_1.getProducts)(categoryName, parsedMaxPrice, parsedMinPrice, parsedTop, sortBy);
            return res.status(200).json({
                products: data,
                currentPage: 1,
                totalPages: 1
            });
        }
        else {
            const startIndex = (parsedPage - 1) * 10;
            const endIndex = parsedPage * 10;
            const data = await (0, utils_1.getProducts)(categoryName, parsedMaxPrice, parsedMinPrice, parsedTop, sortBy);
            const paginatedData = data.slice(startIndex, endIndex);
            const totalPages = Math.ceil(data.length / 10);
            return res.status(200).json({
                products: paginatedData,
                currentPage: parsedPage,
                totalPages: totalPages
            });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.handleGetProducts = handleGetProducts;
const handleGetProductById = async (req, res) => {
    try {
        const { productId, categoryName } = req.params;
        const data = await (0, utils_1.getProductsById)(productId, categoryName);
        if (!data) {
            return res.status(404).json({
                error: 'Product not found'
            });
        }
        return res.status(200).json({
            product: data
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.handleGetProductById = handleGetProductById;
//# sourceMappingURL=controller.js.map