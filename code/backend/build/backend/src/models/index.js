"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productGetSchema = exports.productSchema = exports.productsSchema = void 0;
const zod_1 = require("zod");
exports.productsSchema = zod_1.z.object({
    categoryName: zod_1.z.enum(['Phone', 'Computer', 'TV', 'Earphone', 'Tablet', 'Charger', 'Mouse', 'Keypad', 'Bluetooth', 'Pendrive', 'Remote', 'Speaker', 'Headset', 'Laptop', 'PC']),
});
exports.productSchema = zod_1.z.object({
    productName: zod_1.z.string(),
    price: zod_1.z.number(),
    rating: zod_1.z.number(),
    discount: zod_1.z.number(),
    availability: zod_1.z.string(),
    companyName: zod_1.z.string(),
    categoryName: zod_1.z.string(),
});
exports.productGetSchema = zod_1.z.object({
    categoryName: zod_1.z.string(),
    productId: zod_1.z.string(),
});
//# sourceMappingURL=index.js.map