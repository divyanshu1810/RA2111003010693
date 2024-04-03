"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleGetProducts = void 0;
const utils_1 = require("../utils");
const handleGetProducts = async (req, res) => {
    try {
        const { companyName, categoryName } = req.params;
        const { maxPrice, minPrice, top, page } = req.query;
        const parsedMaxPrice = parseFloat(maxPrice);
        const parsedMinPrice = parseFloat(minPrice);
        const parsedTop = parseInt(top);
        const parsedPage = parseInt(page) || 1;
        (0, utils_1.checkValidInput)(parsedMaxPrice, parsedMinPrice, parsedTop);
        if (parsedTop <= 10) {
            const data = await (0, utils_1.handleAPICall)(companyName, categoryName, parsedMaxPrice, parsedMinPrice, parsedTop);
            return res.status(200).json({
                products: data,
                currentPage: 1,
                totalPages: 1
            });
        }
        else {
            const startIndex = (parsedPage - 1) * 10;
            const endIndex = parsedPage * 10;
            const data = await (0, utils_1.handleAPICall)(companyName, categoryName, parsedMaxPrice, parsedMinPrice, parsedTop);
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
//# sourceMappingURL=controller.js.map