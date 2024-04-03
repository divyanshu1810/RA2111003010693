"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkValidInput = exports.productsSchema = exports.handleAPICall = void 0;
const config_1 = __importDefault(require("../config"));
const zod_1 = require("zod");
const baseURL = config_1.default.baseUrl;
const authToken = config_1.default.token.secret;
const handleAPICall = async (companyName, categoryName, maxPrice, minPrice, top) => {
    const apiUrl = `${baseURL}/test/companies/${companyName}/categories/${categoryName}/products?top=${top}&minPrice=${minPrice}&maxPrice=${maxPrice}`;
    const headers = {
        Authorization: `Bearer ${authToken}`
    };
    const response = await fetch(apiUrl, {
        method: 'GET',
        headers: headers
    });
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
};
exports.handleAPICall = handleAPICall;
exports.productsSchema = zod_1.z.object({
    companyName: zod_1.z.enum(['AMZ', 'FLP', 'SNP', 'MYN', 'AZO']),
    categoryName: zod_1.z.enum(['Phone', 'Computer', 'TV', 'Earphone', 'Tablet', 'Charger', 'Mouse', 'Keypad', 'Bluetooth', 'Pendrive', 'Remote', 'Speaker', 'Headset', 'Laptop', 'PC']),
});
const checkValidInput = (parsedMaxPrice, parsedMinPrice, parsedTop) => {
    if (isNaN(parsedMaxPrice) || isNaN(parsedMinPrice) || isNaN(parsedTop)) {
        throw new Error('User input is not a number');
    }
    if (parsedMaxPrice < 0 || parsedMinPrice < 0 || parsedTop < 0) {
        throw new Error('User input cannot be negative');
    }
    if (parsedMaxPrice < parsedMinPrice) {
        throw new Error('Max price cannot be less than min price');
    }
};
exports.checkValidInput = checkValidInput;
//# sourceMappingURL=index.js.map