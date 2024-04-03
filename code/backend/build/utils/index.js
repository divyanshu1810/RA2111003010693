"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductsById = exports.getProducts = void 0;
const database_1 = __importDefault(require("../loaders/database"));
const mongodb_1 = require("mongodb");
const getProducts = async (categoryName, maxPrice, minPrice, top, sortBy) => {
    const data_collection = await (await (0, database_1.default)()).collection('products');
    const data = await data_collection.find({
        categoryName,
        price: { $gte: minPrice, $lte: maxPrice }
    }).limit(top).toArray();
    if (sortBy) {
        data.sort((a, b) => {
            if (sortBy === 'price') {
                return b.price - a.price;
            }
            else if (sortBy === 'rating') {
                return b.rating - a.rating;
            }
            else if (sortBy === 'discount') {
                return b.discount - a.discount;
            }
        });
    }
    return data;
};
exports.getProducts = getProducts;
const getProductsById = async (productId, categoryName) => {
    const data_collection = await (await (0, database_1.default)()).collection('products');
    const data = await data_collection.findOne({ _id: new mongodb_1.ObjectId(productId), categoryName });
    return data;
};
exports.getProductsById = getProductsById;
//# sourceMappingURL=index.js.map