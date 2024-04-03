"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleGetProducts = void 0;
const utils_1 = require("../utils");
const handleGetProducts = async (req, res) => {
    try {
        const { companyName, categoryName } = req.params;
        const { maxPrice, minPrice, top } = req.query;
        console.log(companyName, categoryName, maxPrice, minPrice, top);
        const data = await (0, utils_1.handleAPICall)(companyName, categoryName, maxPrice, minPrice, top);
        res.status(200).json(data);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.handleGetProducts = handleGetProducts;
//# sourceMappingURL=controller.js.map